import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { parseArgs, responsesEndpoint, selectSourceFiles, validateGenerated } from "./importCodePen.js";

const options = { name: "AuroraButton", url: "https://codepen.io/example/pen/abc123", author: "example", license: "MIT" };

test("validates importer arguments", () => {
  assert.equal(parseArgs([
    "--source", "pen.zip", "--name", "AuroraButton", "--url", options.url,
    "--author", options.author, "--license", options.license, "--confirm-rights",
  ]).name, "AuroraButton");
  assert.throws(() => parseArgs(["--source", "pen.zip"]), /Missing --name/);
});

test("prefers CodePen src files", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "bemoui-test-"));
  fs.mkdirSync(path.join(root, "src"));
  fs.mkdirSync(path.join(root, "dist"));
  fs.writeFileSync(path.join(root, "src/index.html"), "source");
  fs.writeFileSync(path.join(root, "dist/index.html"), "built");
  fs.writeFileSync(path.join(root, "src/style.css"), "");
  assert.ok(selectSourceFiles(root).html.endsWith("src/index.html"));
  fs.rmSync(root, { recursive: true, force: true });
});

test("rejects unsafe generated code", () => {
  const result = {
    componentCode: "import './AuroraButton.css'; export default AuroraButton;",
    cssCode: ".button {}",
    demoCode: `// ${options.url} ${options.author}\ndangerouslySetInnerHTML`,
    usage: "<AuroraButton />",
  };
  assert.throws(() => validateGenerated(result, options, ["react"]), /unsafe code/);
});


test("builds a secure Responses API endpoint", () => {
  assert.equal(responsesEndpoint("https://example.com/v1/"), "https://example.com/v1/responses");
  assert.throws(() => responsesEndpoint("http://example.com/v1"), /must use HTTPS/);
});
