// Each track and level owns one record. Legacy sessions migrate on their next save.
export function readRecord(storage, key) {
  const saved = storage.getItem("interview:session:" + key);
  if (saved) return JSON.parse(saved);
  const legacy = JSON.parse(storage.getItem("amazing-interview-prep:v1") || "{}");
  return { session: legacy.sessions?.[key], nextAttempt: legacy.attempts?.[key] ?? 0 };
}

export function writeRecord(storage, key, session) {
  storage.setItem("interview:session:" + key, JSON.stringify({
    session, nextAttempt: session.attempt + 1,
  }));
}
