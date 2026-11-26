import { tracks, levels, questions } from "./bank.mjs";
import {
  createSession,
  remainingMs,
  SESSION_MINUTES,
  QUESTION_MINUTES,
} from "./session.mjs";

import { readRecord, writeRecord } from "./storage.mjs";
const $ = (selector) => document.querySelector(selector);
const welcomeView = $("#welcome-view");
const sessionView = $("#session-view");
const finishView = $("#finish-view");
let releaseEditor;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const memoryRecords = new Map();
let activeTrack = tracks[0]?.slug;
let activeLevel = levels[1] ?? levels[0];
let session = null;
let timerHandle = null;

function loadRecord(key) {
  if (memoryRecords.has(key)) return memoryRecords.get(key);
  try { return readRecord(localStorage, key); }
  catch { return { nextAttempt: 0 }; }
}

function persist() {
  const key = recordKey(session.track, session.level);
  try {
    if (!navigator.locks) throw new Error("Persistent editing unavailable");
    writeRecord(localStorage, key, session);
    memoryRecords.delete(key);
    $("#save-state").textContent = "Saved on this device";
  } catch {
    memoryRecords.set(key, { session, nextAttempt: session.attempt + 1 });
    $("#save-state").textContent = "Only in this tab · copy notes before closing";
  }
}

async function editSession(resume = false) {
  const key = recordKey();
  const enter = () => {
    const record = loadRecord(key);
    if (resume) {
      if (record.session?.status !== "in-progress") return renderResumeCallout();
      openSession(record.session);
    } else startNewSession(record);
  };
  if (!navigator.locks) return enter();
  await navigator.locks.request("interview:editor:" + key, { ifAvailable: true }, async lock => {
    if (!lock) {
      $("#editor-message").textContent = "This session is open in another tab. Return to its overview to edit here.";
      return;
    }
    if (key !== recordKey() || welcomeView.hidden) return;
    $("#editor-message").textContent = "";
    const closed = new Promise(resolve => { releaseEditor = resolve; });
    try {
      enter();
      if (!sessionView.hidden) await closed;
    } finally {
      releaseEditor = null;
    }
  });
}

function recordKey(track = activeTrack, level = activeLevel) {
  return `${track}:${level}`;
}
function currentRecord() {
  return loadRecord(recordKey()).session ?? null;
}
function activeTrackObject() {
  return tracks.find((item) => item.slug === activeTrack) ?? tracks[0];
}

function renderSelectors() {
  const trackGrid = $("#track-grid");
  trackGrid.replaceChildren();
  tracks.forEach((track, index) => {
    const button = document.createElement("button");
    button.className = "track-option";
    button.type = "button";
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", String(track.slug === activeTrack));
    button.tabIndex = track.slug === activeTrack ? 0 : -1;
    button.dataset.slug = track.slug;
    const title = document.createElement("strong");
    title.textContent = track.name;
    const small = document.createElement("small");
    small.textContent =
      index < 3
        ? ["PEOPLE + DELIVERY", "PROBLEM SOLVING", "ARCHITECTURE"][index]
        : ["DATA + QUERIES", "OBJECT DESIGN", "AI WORKFLOWS"][index - 3] ||
          "PRACTICE";
    const glyph = document.createElement("span");
    glyph.className = "track-glyph";
    glyph.setAttribute("aria-hidden", "true");
    glyph.textContent = ["↗", "⌘", "◌", "▦", "◇", "✳"][index % 6];
    button.append(title, small, glyph);
    button.addEventListener("click", () => {
      activeTrack = track.slug;
      renderSelectors();
      $('#track-grid [aria-checked="true"]').focus();
    });
    button.addEventListener(
      "keydown",
      radioKeyHandler(".track-option", button),
    );
    trackGrid.append(button);
  });
  const levelPicker = $("#level-picker");
  levelPicker.replaceChildren();
  levels.forEach((level) => {
    const button = document.createElement("button");
    button.className = "level-option";
    button.type = "button";
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", String(level === activeLevel));
    button.tabIndex = level === activeLevel ? 0 : -1;
    button.textContent = level;
    button.addEventListener("click", () => {
      activeLevel = level;
      renderSelectors();
      $('#level-picker [aria-checked="true"]').focus();
    });
    button.addEventListener(
      "keydown",
      radioKeyHandler(".level-option", button),
    );
    levelPicker.append(button);
  });
  $("#track-description").textContent = activeTrackObject()?.description ?? "";
  $("#start-button").textContent = "Begin session";
  renderResumeCallout();
}

function radioKeyHandler(selector, button) {
  return (event) => {
    if (
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
    )
      return;
    event.preventDefault();
    const list = [...button.parentElement.querySelectorAll(selector)];
    const delta = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1;
    const next =
      list[(list.indexOf(button) + delta + list.length) % list.length];
    next.click();
  };
}

function renderResumeCallout() {
  $("#editor-message").textContent = "";
  const callout = $("#resume-callout");
  const saved = currentRecord();
  if (!saved || saved.status !== "in-progress" || remainingMs(saved) <= 0) {
    callout.hidden = true;
    return;
  }
  callout.hidden = false;
  callout.replaceChildren();
  callout.append(
    document.createTextNode(`You have an unfinished ${activeLevel} session. `),
  );
  const resume = document.createElement("button");
  resume.type = "button";
  resume.textContent = "Resume where you left off";
  resume.addEventListener("click", () => editSession(true));
  callout.append(resume);
}

function showView(view) {
  if (view !== "session") releaseEditor?.();
  welcomeView.hidden = view !== "welcome";
  sessionView.hidden = view !== "session";
  finishView.hidden = view !== "finish";
  const section = document.getElementById(view + "-view");
  if (view !== "session") section.querySelector("h1").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "instant" });
  animateEntrance(section);
}

function animateEntrance(element) {
  element.getAnimations().forEach(animation => animation.cancel());
  if (reducedMotion.matches) return;
  element.animate(
    [{ opacity: 0.78, transform: "translateY(5px)" }, { opacity: 1, transform: "translateY(0)" }],
    { duration: 190, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
  );
}

function startNewSession(record) {
  const unfinished = record.session;
  if (unfinished?.status === "in-progress" && remainingMs(unfinished) > 0) {
    const confirmed = window.confirm(
      "Replace your unfinished session? Its notes and self-review will be lost.",
    );
    if (!confirmed) return;
  }
  const attempt = record.nextAttempt ?? 0;
  const cases = questions(activeTrack, activeLevel);
  session = createSession({
    track: activeTrack,
    level: activeLevel,
    cases,
    attempt,
    now: Date.now(),
  });
  openSession(session);
}

function openSession(record) {
  session = record;
  activeTrack = session.track;
  activeLevel = session.level;
  if (remainingMs(session) <= 0) {
    completeSession(true);
    return;
  }
  $("#session-track-label").textContent =
    tracks.find((t) => t.slug === session.track)?.name ?? session.track;
  $("#session-level-label").textContent = session.level;
  $("#attempt-number").textContent = String(session.attempt + 1).padStart(
    2,
    "0",
  );
  showView("session");
  persist();
  renderQuestion();
  $("#question-title").focus({ preventScroll: true });
  updateTimer();
  clearInterval(timerHandle);
  timerHandle = setInterval(updateTimer, 1000);
}

function activeQuestion() {
  return session?.questions[session.currentIndex];
}

function renderQuestion() {
  const question = activeQuestion();
  if (!question) return;
  const index = session.currentIndex;
  const total = session.questions.length;
  $("#question-number").textContent =
    `QUESTION ${String(index + 1).padStart(2, "0")}`;
  $("#question-title").textContent = question.title;
  $("#question-prompt").textContent = question.prompt;
  $("#question-category").textContent = (question.kind ?? "Practical").toUpperCase();
  $("#rubric-text").textContent = question.rubric;
  $("#notes-input").value = question.notes ?? "";
  $("#confidence-select").value = question.selfReview?.confidence ?? "";
  $("#strengths-input").value = question.selfReview?.strengths ?? "";
  $("#improve-input").value = question.selfReview?.improve ?? "";
  $("#reviewed-check").checked = Boolean(question.reviewed);
  $("#rubric-details").open = false;
  const nav = $("#question-nav");
  nav.replaceChildren();
  session.questions.forEach((item, i) => {
    const practical = (item.kind ?? "Practical") === "Practical";
    if (i === 0 || (practical && session.questions[i - 1]?.kind === "Follow-up")) {
      const heading = document.createElement("strong");
      heading.className = "agenda-section";
      heading.textContent = practical ? "Practical cases" : "Interview discussion";
      nav.append(heading);
    }
    const button = document.createElement("button");
    button.className = "question-link";
    button.type = "button";
    if (i === index) button.setAttribute("aria-current", "true");
    button.setAttribute(
      "aria-label",
      `Question ${i + 1}: ${item.title}${item.reviewed ? ", reviewed" : ""}`,
    );
    const num = document.createElement("span");
    num.className = "nav-num";
    num.textContent = String(i + 1).padStart(2, "0");
    const label = document.createElement("span");
    label.className = "nav-label";
    label.textContent = item.title;
    const check = document.createElement("span");
    check.className = "nav-check";
    check.setAttribute("aria-hidden", "true");
    check.textContent = item.reviewed ? "✓" : "";
    button.append(num, label, check);
    button.addEventListener("click", () => goToQuestion(i));
    nav.append(button);
  });
  const activeButton = nav.querySelector('[aria-current="true"]');
  if (nav.scrollWidth > nav.clientWidth) {
    const offset = activeButton.getBoundingClientRect().left - nav.getBoundingClientRect().left;
    nav.scrollLeft += offset - (nav.clientWidth - activeButton.offsetWidth) / 2;
  }
  $("#progress-count").textContent =
    `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  $("#question-progress").max = total;
  $("#question-progress").value = index + 1;
  $("#agenda-heading").textContent = "Interview agenda";
  $("#previous-button").disabled = index === 0;
  $("#next-button").textContent =
    index === total - 1 ? "Finish session" : "Next prompt";
  $("#question-time-hint").textContent =
    `${question.minutes ?? QUESTION_MINUTES} minutes for this prompt. Notes save as you type.`;
  $("#note-count").textContent =
    `${wordCount(question.notes)} ${wordCount(question.notes) === 1 ? "word" : "words"}`;
}

function wordCount(text = "") {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function saveQuestion() {
  if (!session) return;
  const question = activeQuestion();
  question.notes = $("#notes-input").value;
  question.selfReview = {
    confidence: $("#confidence-select").value,
    strengths: $("#strengths-input").value,
    improve: $("#improve-input").value,
  };
  question.reviewed = $("#reviewed-check").checked;
  persist();
  $("#note-count").textContent =
    `${wordCount(question.notes)} ${wordCount(question.notes) === 1 ? "word" : "words"}`;
}

function goToQuestion(index) {
  if (index < 0 || index >= session.questions.length) return;
  saveQuestion();
  session.currentIndex = index;
  persist();
  renderQuestion();
  const title = $("#question-title");
  title.focus({ preventScroll: true });
  const bounds = title.getBoundingClientRect();
  if (bounds.top < 0 || bounds.bottom > window.innerHeight) {
    title.scrollIntoView({ block: "center", behavior: reducedMotion.matches ? "instant" : "smooth" });
  }
  animateEntrance($(".question-content"));
}

function updateTimer() {
  if (!session) return;
  const ms = remainingMs(session);
  const seconds = Math.ceil(ms / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  $("#timer").textContent =
    `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  $("#timer").classList.toggle("urgent", ms < 10 * 60_000);
  $("#timer-progress").value = Math.max(
    0,
    Math.min(SESSION_MINUTES, ms / 60_000),
  );
  if (ms === 0) completeSession(true);
}

function completeSession(expired = false) {
  if (!session) return;
  if (!sessionView.hidden) saveQuestion();
  clearInterval(timerHandle);
  timerHandle = null;
  session.status = "complete";
  session.finishedAt = Date.now();
  session.expired = expired;
  persist();
  const reviewed = session.questions.filter((q) => q.reviewed).length;
  const notes = session.questions.filter((q) => (q.notes ?? "").trim()).length;
  $("#finish-summary").textContent = expired
    ? "Your two hours are up. Take a breath, then carry one useful insight into your next practice."
    : "You made time to think carefully and work through the hard parts. Let that count.";
  $("#finish-stats").replaceChildren();
  const minutesPracticed = Math.max(
    1,
    Math.round((session.finishedAt - session.startedAt) / 60_000),
  );
  [
    [String(reviewed).padStart(2, "0"), "PROMPTS REVIEWED"],
    [String(notes).padStart(2, "0"), "WITH NOTES"],
    [Math.min(SESSION_MINUTES, minutesPracticed), "MINUTES PRACTICED"],
  ].forEach(([value, label]) => {
    const stat = document.createElement("div");
    stat.className = "finish-stat";
    const number = document.createElement("strong");
    number.textContent = value;
    const caption = document.createElement("span");
    caption.textContent = label;
    stat.append(number, caption);
    $("#finish-stats").append(stat);
  });
  showView("finish");
}

function goHome() {
  clearInterval(timerHandle);
  timerHandle = null;
  session = null;
  renderSelectors();
  showView("welcome");
}

$("#start-button").addEventListener("click", () => editSession());
$("#back-button").addEventListener("click", () => {
  saveQuestion();
  persist();
  clearInterval(timerHandle);
  session = null;
  renderSelectors();
  showView("welcome");
});
$("#previous-button").addEventListener("click", () =>
  goToQuestion(session.currentIndex - 1),
);
$("#next-button").addEventListener("click", () =>
  session.currentIndex === session.questions.length - 1
    ? completeSession(false)
    : goToQuestion(session.currentIndex + 1),
);
$("#finish-early").addEventListener("click", () => completeSession(false));
$("#notes-input").addEventListener("input", saveQuestion);
[
  "#confidence-select",
  "#strengths-input",
  "#improve-input",
].forEach((selector) => $(selector).addEventListener("input", saveQuestion));
$("#reviewed-check").addEventListener("input", () => {
  saveQuestion();
  const current = $('#question-nav [aria-current="true"]');
  const question = activeQuestion();
  current.querySelector(".nav-check").textContent = question.reviewed ? "✓" : "";
  current.setAttribute("aria-label", `Question ${session.currentIndex + 1}: ${question.title}${question.reviewed ? ", reviewed" : ""}`);
});
$("#return-home").addEventListener("click", goHome);
$("#new-session").addEventListener("click", () => {
  goHome();
  editSession();
});

const helpDialog = $("#help-dialog");
$("#help-button").addEventListener("click", () => helpDialog.showModal());
$("#close-help").addEventListener("click", () => helpDialog.close());
$("#help-done").addEventListener("click", () => helpDialog.close());
helpDialog.addEventListener("click", (event) => {
  if (event.target === helpDialog) helpDialog.close();
});

renderSelectors();
