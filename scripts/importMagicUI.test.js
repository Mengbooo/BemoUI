import assert from "node:assert/strict";
import test from "node:test";
import { moveComponentToCategory, parseArgs, validateGenerated } from "./importMagicUI.js";

test("validates Magic UI importer arguments", () => {
  assert.deepEqual(parseArgs(["--slug", "shimmer-button", "--name", "ShimmerButton"]), {
    slug: "shimmer-button",
    name: "ShimmerButton",
  });
  assert.throws(() => parseArgs(["--slug", "../button", "--name", "button"]));
});

test("moves generated components into the MagicUI category", () => {
  const source = `export const CATEGORIES = [\n  { name: 'ReactBits', subcategories: [\n    'New Button',\n  ] },\n  { name: 'MagicUI', subcategories: [\n    'Marquee',\n  ] },\n];\n`;
  const result = moveComponentToCategory(source, "New Button");
  assert.doesNotMatch(result.match(/name: 'ReactBits'[\s\S]*?\]/)[0], /New Button/);
  assert.match(result.match(/name: 'MagicUI'[\s\S]*?\]/)[0], /New Button/);
});

test("rejects unsafe AI output", () => {
  const base = {
    componentCode: "import './Safe.css'; const Safe = () => <button />; export default Safe;",
    cssCode: ".safe {}",
    tailwindCode: "const Safe = () => <button />; export default Safe;",
    tsCode: "import './Safe.css'; const Safe = () => <button />; export default Safe;",
    tsTailwindCode: "const Safe = () => <button />; export default Safe;",
    demoCode: `import { safe } from '../../constants/code/Components/safeCode';
// Magic UI https://magicui.design/docs/components/safe
<TabbedLayout><PreviewTab><Safe /></PreviewTab><CodeTab><CodeExample codeObject={safe} /></CodeTab><CliTab><CliInstallation {...safe} /></CliTab></TabbedLayout>`,
    usage: "<Safe />",
  };
  assert.doesNotThrow(() => validateGenerated(base, { name: "Safe", docsUrl: "https://magicui.design/docs/components/safe" }, []));
  assert.doesNotThrow(() => validateGenerated({ ...base, componentCode: "import './Safe.css'; export function Safe() { return <button />; }" }, { name: "Safe", docsUrl: "https://magicui.design/docs/components/safe" }, []));
  assert.doesNotThrow(() => validateGenerated({ ...base, componentCode: "import './Safe.css'; const Safe = () => <button />; export { Safe };" }, { name: "Safe", docsUrl: "https://magicui.design/docs/components/safe" }, []));
  assert.throws(() => validateGenerated({ ...base, componentCode: `${base.componentCode}\nfetch('/secret')` }, { name: "Safe", docsUrl: "https://magicui.design/docs/components/safe" }, []));
});
