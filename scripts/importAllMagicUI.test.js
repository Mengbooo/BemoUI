import assert from "node:assert/strict";
import test from "node:test";
import { collisionSafeName, parseBatchArgs, slugToPascal, sourceSlug } from "./importAllMagicUI.js";

test("builds stable component names and validates batch options", () => {
  assert.equal(slugToPascal("text-3d-flip"), "Text3DFlip");
  assert.equal(slugToPascal("animated-grid-pattern"), "AnimatedGridPattern");
  assert.equal(collisionSafeName("animated-list", new Set(["AnimatedList"])), "MagicAnimatedList");
  assert.equal(sourceSlug("- Registry: https://magicui.design/r/marquee.json"), "marquee");
  assert.deepEqual(parseBatchArgs(["--limit", "3", "--retries", "1", "--concurrency", "2", "--retry-failed"]), {
    retries: 1,
    limit: 3,
    concurrency: 2,
    retryFailed: true,
  });
  assert.throws(() => parseBatchArgs(["--limit", "0"]));
});
