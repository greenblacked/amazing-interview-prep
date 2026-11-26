import test from "node:test";
import assert from "node:assert/strict";
import {
  createSession,
  remainingMs,
  SESSION_MINUTES,
  SESSION_QUESTION_COUNT,
  QUESTION_MINUTES,
} from "../public/session.mjs";

const cases = Array.from({ length: 12 }, (_, index) => ({
  title: `Prompt ${index + 1}`,
  prompt: `Scenario ${index + 1}`,
  rubric: `Review ${index + 1}`,
}));

test("creates a two-hour session of six 20-minute prompts with initialized private work fields", () => {
  const session = createSession({
    track: "coding",
    level: "Senior",
    cases,
    attempt: 0,
    now: 1000,
  });
  assert.equal(session.durationMs, 120 * 60 * 1000);
  assert.equal(SESSION_MINUTES, 120);
  assert.equal(SESSION_QUESTION_COUNT, 6);
  assert.equal(QUESTION_MINUTES, 20);
  assert.equal(session.deadlineAt, 1000 + 120 * 60 * 1000);
  assert.equal(session.status, "in-progress");
  assert.equal(session.questions.length, 6);
  assert.ok(
    session.questions.every((question) =>
      cases.some((item) => item.title === question.title),
    ),
  );
  assert.ok(
    session.questions.every(
      (question) => question.notes === "" && question.reviewed === false,
    ),
  );
});

test("alternates complementary groups with no repeated cases across consecutive attempts", () => {
  for (const attempt of [0, 1, 2, 3, 10, 11, 12, 13]) {
    const current = createSession({
      track: "coding",
      level: "Senior",
      cases,
      attempt,
      now: 1000,
    });
    const next = createSession({
      track: "coding",
      level: "Senior",
      cases,
      attempt: attempt + 1,
      now: 2000,
    });
    const currentTitles = current.questions.map((item) => item.title);
    const nextTitles = next.questions.map((item) => item.title);
    assert.equal(currentTitles.length, 6);
    assert.equal(nextTitles.length, 6);
    assert.equal(
      new Set([...currentTitles, ...nextTitles]).size,
      12,
      `attempts ${attempt} and ${attempt + 1}`,
    );
  }
});

test("keeps the same attempt reproducible and uses the complementary group at the cycle boundary", () => {
  const first = createSession({
    track: "coding",
    level: "Senior",
    cases,
    attempt: 11,
    now: 1000,
  });
  const repeated = createSession({
    track: "coding",
    level: "Senior",
    cases,
    attempt: 11,
    now: 2000,
  });
  const next = createSession({
    track: "coding",
    level: "Senior",
    cases,
    attempt: 12,
    now: 3000,
  });
  assert.deepEqual(
    first.questions.map((item) => item.title),
    repeated.questions.map((item) => item.title),
  );
  assert.equal(
    new Set([...first.questions, ...next.questions].map((item) => item.title))
      .size,
    12,
  );
});

test("validates inputs and computes remaining time without going negative", () => {
  assert.throws(
    () => createSession({ track: "", level: "Junior", cases }),
    TypeError,
  );
  assert.throws(
    () => createSession({ track: "coding", level: "Junior", cases: [] }),
    TypeError,
  );
  const session = createSession({
    track: "sql",
    level: "Mid-level",
    cases,
    now: 10,
  });
  assert.equal(remainingMs(session, 10), SESSION_MINUTES * 60_000);
  assert.equal(remainingMs(session, session.deadlineAt + 500), 0);
});
