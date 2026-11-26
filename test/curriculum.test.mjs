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
