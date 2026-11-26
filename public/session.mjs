import { discussionRounds } from "./bank.mjs";
export const SESSION_MINUTES = 120;
export const QUESTION_MINUTES = 20; // Also used by previously saved sessions.

function hashSeed(value) {
  let h = 2166136261;
  for (const char of String(value)) {
    h ^= char.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function randomFor(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled(items, seed) {
  const result = [...items];
  const random = randomFor(seed);
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Build a complete two-hour interview session. Each attempt uses one of two
 * complementary case groups, so adjacent attempts never repeat a case.
 */
export function createSession({
  track,
  level,
  cases,
  attempt = 0,
  now = Date.now(),
}) {
  if (!track || !level || !Array.isArray(cases) || cases.length === 0) {
    throw new TypeError("track, level, and at least one case are required");
  }
  const safeAttempt = Math.max(0, Math.floor(Number(attempt) || 0));
  const groupSize = Math.ceil(cases.length / 2);
  const groupStart = (safeAttempt % 2) * groupSize;
  const group = cases.slice(
    groupStart,
    safeAttempt % 2 === 0 ? groupSize : cases.length,
  );
  const ordered = shuffled(group, hashSeed(`${track}/${level}/${safeAttempt}`));
  const oralPool = discussionRounds(track);
  const deck = shuffled(oralPool, hashSeed(`oral/${track}/${level}`));
  const offset = (safeAttempt * 4) % deck.length;
  const rounds = shuffled(deck.slice(offset, offset + 4), hashSeed(`order/${safeAttempt}`));
  const followUpDepth = {
    Junior: "Walk through one concrete example.",
    "Mid-level": "Compare two plausible answers and explain your choice.",
    Senior: "Identify the assumption that matters most and what evidence would change your decision.",
  };
  const discussion = rounds.flatMap(([title, opening, followUp, rubric]) => [
    { title, prompt: opening, rubric, kind: "Discussion", minutes: 5 },
    { title: title + " follow-up", prompt: followUp + " " + followUpDepth[level], rubric, kind: "Follow-up", minutes: 5 },
  ]);
  const practical = ordered.slice(0, 4).map(item => ({ ...item, kind: "Practical", minutes: 20 }));
  const durationMs = SESSION_MINUTES * 60_000;
  return {
    id: `${track}-${level.toLowerCase().replace(/\W+/g, "-")}-${now}-${safeAttempt}`,
    track,
    level,
    attempt: safeAttempt,
    startedAt: now,
    durationMs,
    deadlineAt: now + durationMs,
    status: "in-progress",
    currentIndex: 0,
    questions: [...discussion, ...practical].map((item, index) => ({
      ...item,
      id: item.id ?? `${track}-${level}-${index}`,
      notes: "",
      selfReview: { confidence: "", strengths: "", improve: "" },
      reviewed: false,
    })),
  };
}

export function remainingMs(session, now = Date.now()) {
  return Math.max(0, session.deadlineAt - now);
}
