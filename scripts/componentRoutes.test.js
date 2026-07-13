import assert from 'node:assert/strict';
import test from 'node:test';

import { CATEGORIES } from '../src/constants/Categories.js';
import { getComponentLoader } from '../src/constants/Components.js';

const toSlug = value => value.replace(/\s+/g, '-').toLowerCase();

test('every sidebar component has a lazy route loader', () => {
  const missing = CATEGORIES.flatMap(category =>
    category.subcategories
      .map(name => ({ category: category.name, name, slug: toSlug(name) }))
      .filter(item => typeof getComponentLoader(item.slug) !== 'function')
  );

  assert.deepEqual(missing, []);
});

test('sidebar component slugs are unique across categories', () => {
  const entries = CATEGORIES.flatMap(category =>
    category.subcategories.map(name => ({ category: category.name, name, slug: toSlug(name) }))
  );
  const grouped = Map.groupBy(entries, item => item.slug);
  const duplicates = [...grouped.entries()]
    .filter(([, items]) => items.length > 1)
    .map(([slug, items]) => ({ slug, entries: items.map(item => `${item.category}:${item.name}`) }));

  assert.deepEqual(duplicates, []);
});

test('unknown component routes do not produce an invalid lazy constructor', () => {
  assert.equal(getComponentLoader('not-a-real-component'), null);
});
