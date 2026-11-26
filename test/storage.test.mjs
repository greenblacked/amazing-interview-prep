import test from "node:test";
import assert from "node:assert/strict";
import { readRecord, writeRecord } from "../public/storage.mjs";

test("independent editors preserve both tracks and upgrade legacy notes on save", () => {
  const records = new Map();
  const storage = { getItem: key => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, value) };
  const original = { attempt: 3, questions: [{ notes: "original" }] };
  storage.setItem("amazing-interview-prep:v1", JSON.stringify({
    attempts: { coding: 4 }, sessions: { coding: original },
  }));
  const first = readRecord(storage, "coding");
  writeRecord(storage, "sql", { attempt: 0, questions: [{ notes: "SQL notes" }] });
  first.session.questions[0].notes = "revised";
  writeRecord(storage, "coding", first.session);
  assert.equal(readRecord(storage, "sql").session.questions[0].notes, "SQL notes");
  assert.equal(readRecord(storage, "coding").session.questions[0].notes, "revised");
  assert.equal(readRecord(storage, "coding").nextAttempt, 4);
});
