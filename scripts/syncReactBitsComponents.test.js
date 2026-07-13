import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import process from 'node:process';
import test from 'node:test';

import {
  adaptDemo,
  applyBemoBranding,
  applyBrandAccents,
  createRouteEntries,
  createWriter,
  parseArgs,
  updateCategory,
  updateRoutes
} from './syncReactBitsComponents.js';

test('requires an explicit all or component scope', () => {
  assert.equal(parseArgs(['--all']).all, true);
  assert.equal(parseArgs(['--component', 'CardNav']).component, 'CardNav');
  assert.equal(parseArgs(['--component', 'Aurora', '--collection', 'Backgrounds']).collection, 'Backgrounds');
  assert.throws(() => parseArgs([]), /exactly one/);
  assert.throws(() => parseArgs(['--all', '--component', 'CardNav']), /exactly one/);
  assert.throws(() => parseArgs(['--all', '--collection', 'SiteShell']), /must be one of/);
});

test('adapts every upstream collection and cross-collection demo import', () => {
  const source = `import Aurora from '@/content/Backgrounds/Aurora/Aurora';
import LiquidEther from '@/content/Backgrounds/LiquidEther/LiquidEther';
import { aurora } from '@/constants/code/Backgrounds/auroraCode';
import { motion } from 'motion/react';`;
  const result = adaptDemo(source, 'Backgrounds');
  assert.match(result, /content\/ReactBits\/Backgrounds\/Aurora/);
  assert.match(result, /content\/ReactBits\/Backgrounds\/LiquidEther/);
  assert.match(result, /constants\/code\/ReactBits\/Backgrounds\/auroraCode/);
  assert.match(result, /from 'framer-motion'/);
  assert.doesNotMatch(result, /@\//);
});

test('adapts demo imports without copying the React Bits site shell', () => {
  const source = `import { TabsLayout } from '../../components/common/TabsLayout';
import CardNav from '../../content/Components/CardNav/CardNav';
import { cardNav } from '../../constants/code/Components/cardNavCode';`;
  const result = adaptDemo(source);
  assert.match(result, /\.\.\/_shared\/TabsLayout/);
  assert.match(result, /content\/ReactBits\/Components\/CardNav/);
  assert.match(result, /constants\/code\/ReactBits\/Components\/cardNavCode/);
});

test('normalizes React Bits purple accents to BemoUI blue and green', () => {
  assert.equal(applyBrandAccents('color:#5227FF; border:#F472B6'), 'color:#1620E4; border:#7BE9C6');
});

test('rebrands visible React Bits content while preserving internal namespaces', () => {
  const source = `Welcome to React Bits\nplaceholder="david@reactbits.dev"\n@content/ReactBits/Components/CardNav`;
  assert.equal(
    applyBemoBranding(source),
    `Welcome to BemoUI\nplaceholder="hello@bemoui.dev"\n@content/ReactBits/Components/CardNav`
  );
});

test('replaces upstream demo logos with BemoUI assets', () => {
  const source = `import logo from '../../assets/logos/reactbits-gh-white.svg';`;
  assert.match(adaptDemo(source), /assets\/logos\/bemoUI-logo-white\.svg/);
  assert.doesNotMatch(adaptDemo(source), /reactbits-gh/);
});

test('adds component entries only to the ReactBits category', () => {
  const source = `export const CATEGORIES = [
  { name: 'ReactBits', subcategories: ['Split Text'] },
  { name: 'MagicUI', subcategories: ['Dock'] },
];`;
  const result = updateCategory(source, ['CardNav', 'Dock']);
  assert.match(result, /'Split Text'/);
  assert.match(result, /'Card Nav'/);
  assert.match(result, /'ReactBits Dock'/);
  assert.match(result, /name: 'MagicUI', subcategories: \['Dock'\]/);
});

test('uses an isolated route for the React Bits Dock', () => {
  const source = `const componentMap = {\n  'dock': () => import('../demo/Components/DockDemo'),\n};`;
  const result = updateRoutes(source, ['Dock', 'CardNav']);
  assert.match(result, /'dock': \(\) => import\('\.\.\/demo\/Components\/DockDemo'\)/);
  assert.match(result, /'reactbits-dock': \(\) => import\("\.\.\/demo\/ReactBits\/Components\/DockDemo"\)/);
  assert.match(result, /'card-nav': \(\) => import\("\.\.\/demo\/ReactBits\/Components\/CardNavDemo"\)/);
});

test('creates readable acronym labels and conflict-safe ReactBits slugs', () => {
  const source = `export const CATEGORIES = [
  { name: 'ReactBits', subcategories: [] },
  { name: 'MagicUI', subcategories: ['Dock', 'Light Rays'] },
];`;
  const entries = createRouteEntries(source, [
    { collection: 'TextAnimations', name: 'ASCIIText' },
    { collection: 'Components', name: 'Dock' },
    { collection: 'Backgrounds', name: 'LightRays' }
  ]);
  assert.deepEqual(entries.map(({ label, slug }) => ({ label, slug })), [
    { label: 'ASCII Text', slug: 'ascii-text' },
    { label: 'ReactBits Dock', slug: 'reactbits-dock' },
    { label: 'ReactBits Light Rays', slug: 'reactbits-light-rays' }
  ]);
});

test('routes synchronized components to their original upstream collection', () => {
  const source = 'const componentMap = {\n};';
  const result = updateRoutes(source, [
    { collection: 'Backgrounds', name: 'Aurora', slug: 'aurora' }
  ]);
  assert.match(result, /demo\/ReactBits\/Backgrounds\/AuroraDemo/);
});

test('writer rejects paths outside the component synchronization allowlist', () => {
  const { writeFile } = createWriter({ dryRun: true });
  assert.doesNotThrow(() => writeFile(`${process.cwd()}/public/assets/3d/lens.glb`, Buffer.from('component asset')));
  assert.throws(() => writeFile('/tmp/README.md', 'no'), /Refusing to write/);
});
