import assert from 'node:assert/strict';
import test from 'node:test';
import { TWENTY_FIRST_COMPONENTS } from './21stComponents.js';
import { parseArgs, upsertCategory, upsertRoutes, validateGenerated } from './import21stComponents.js';

test('21st.dev manifest contains 50 unique MIT upstream components', () => {
  assert.equal(TWENTY_FIRST_COMPONENTS.length, 50);
  for (const field of ['slug', 'name', 'displayTitle', 'routeSlug', 'twentyFirstUrl']) {
    assert.equal(new Set(TWENTY_FIRST_COMPONENTS.map(component => component[field])).size, 50, `${field} must be unique`);
  }
  assert.equal(new Set(TWENTY_FIRST_COMPONENTS.map(component => `${component.repo}:${component.path}`)).size, 50);
  assert.deepEqual(new Set(TWENTY_FIRST_COMPONENTS.map(component => component.repo)), new Set([
    'ibelick/motion-primitives',
    'nolly-studio/cult-ui',
  ]));
  assert.ok(TWENTY_FIRST_COMPONENTS.every(component => component.routeSlug.startsWith('21st-')));
  assert.ok(TWENTY_FIRST_COMPONENTS.every(component => component.twentyFirstUrl.startsWith('https://21st.dev/')));
});

test('parses bounded batch options', () => {
  assert.deepEqual(parseArgs(['--limit', '10', '--concurrency', '3', '--retry-failed']), {
    concurrency: 3,
    retries: 2,
    limit: 10,
    retryFailed: true,
  });
  assert.throws(() => parseArgs(['--concurrency', '20']));
  assert.throws(() => parseArgs(['--unknown']));
});

test('upserts a dedicated 21st.dev category idempotently', () => {
  const source = `export const CATEGORIES = [\n  { name: 'MagicUI', subcategories: ['Dock'] },\n];\n`;
  const components = TWENTY_FIRST_COMPONENTS.slice(0, 2);
  const once = upsertCategory(source, components);
  const twice = upsertCategory(once, components);
  assert.equal(once, twice);
  assert.match(once, /name: '21st\.dev'/);
  assert.match(once, /21st Accordion/);
});

test('upserts 21st.dev lazy routes idempotently', () => {
  const source = `const componentMap = {\n  'dock': () => import("../demo/Components/DockDemo"),\n};\n`;
  const components = TWENTY_FIRST_COMPONENTS.slice(0, 2);
  const once = upsertRoutes(source, components);
  const twice = upsertRoutes(once, components);
  assert.equal(once, twice);
  assert.match(once, /'21st-accordion'/);
});

test('rejects the framer-motion 12 motion.create API', () => {
  const component = {
    name: 'TwentyFirstExample',
    twentyFirstUrl: 'https://21st.dev/example',
  };
  const exportCode = 'export default function TwentyFirstExample() { return null; }';
  const result = {
    componentCode: `import './TwentyFirstExample.css'; import { motion } from 'framer-motion'; ${exportCode} motion.create('div');`,
    cssCode: '.bemo-21st-example { display: block; }',
    tailwindCode: exportCode,
    tsCode: `import './TwentyFirstExample.css'; ${exportCode}`,
    tsTailwindCode: exportCode,
    demoCode: `const url = 'https://21st.dev/example'; const license = 'MIT'; <TabbedLayout><PreviewTab/><CodeTab><CodeExample codeObject={twentyFirstExample} /></CodeTab><CliTab><CliInstallation /></CliTab></TabbedLayout>;`,
    usage: '<TwentyFirstExample />',
  };

  assert.throws(
    () => validateGenerated(result, component, ['framer-motion']),
    /framer-motion 11/
  );
});
