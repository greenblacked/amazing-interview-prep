import assert from "node:assert/strict";
import test from "node:test";
import { levels, questions, tracks } from "../public/bank.mjs";

for (const track of tracks) {
  test(`${track.name} covers all three levels with distinct assignments`, () => {
    const pools = levels.map((level) => questions(track.slug, level));
    assert.equal(pools.length, 3);
    for (const pool of pools) {
      assert.ok(pool.length >= 12);
      assert.equal(new Set(pool.map((item) => item.title)).size, pool.length);
      for (const item of pool) {
        assert.ok(item.prompt.trim() && item.rubric.trim());
        if (item.source)
          assert.equal(new URL(item.source).origin, "https://www.fastprep.io");
      }
    }
    const prompts = pools.flat().map((item) => item.prompt);
    assert.equal(new Set(prompts).size, prompts.length);
  });
}

test("each new practice case has a stable, separately revealed answer at every level", async () => {
  const { practiceAnswer } = await import("../public/bank.mjs");
  const { practiceCases } = await import("../public/practice-cases.mjs");
  for (const [track, cases] of Object.entries(practiceCases)) {
    assert.equal(new Set(cases.map(item => item.id)).size, cases.length);
    for (const level of levels) {
      const pool = questions(track, level);
      for (const item of cases) {
        const question = pool.find(entry => entry.id === item.id);
        assert.ok(question, `${track} / ${level} / ${item.id}`);
        assert.equal(Object.hasOwn(question, "answer"), false);
        assert.ok(practiceAnswer(track, item.id).every(paragraph => paragraph.trim()));
      }
    }
  }
  assert.equal(practiceAnswer("coding", "legacy-question"), undefined);
});
