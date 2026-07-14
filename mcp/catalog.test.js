import assert from "node:assert/strict";
import test from "node:test";
import { buildCatalog, filterCatalog, readVariantSource } from "./catalog.js";

const catalog = buildCatalog();

test("builds a unique catalog from every registered component route", () => {
  assert.ok(catalog.length > 150, `expected more than 150 components, received ${catalog.length}`);
  assert.equal(new Set(catalog.map(component => component.id)).size, catalog.length);
});

test("collects variants, usage, provenance, and capabilities", () => {
  const marquee = catalog.find(component => component.id === "marquee");
  assert.ok(marquee);
  assert.deepEqual(Object.keys(marquee.variants).sort(), [
    "react-css",
    "react-tailwind",
    "react-ts-css",
    "react-ts-tailwind",
  ]);
  assert.match(marquee.documentation.usage, /<Marquee/);
  assert.equal(marquee.provenance.license, "MIT");
  assert.equal(marquee.capabilities.reducedMotion, true);
  assert.ok(marquee.pageSlots.includes("social-proof"));
});

test("filters the compact catalog with factual metadata", () => {
  const backgrounds = filterCatalog(catalog, { collection: "ReactBits", category: "Backgrounds" });
  assert.ok(backgrounds.length > 20);
  assert.ok(backgrounds.every(component => component.collection === "ReactBits" && component.category === "Backgrounds"));

  const socialProof = filterCatalog(catalog, { query: "social-proof" });
  assert.ok(socialProof.some(component => component.id === "marquee"));
});

test("reads only the requested component variant", () => {
  const marquee = catalog.find(component => component.id === "marquee");
  const files = readVariantSource(marquee, "react-css");
  assert.ok(files.some(file => file.path.endsWith("Marquee.jsx") && file.content.includes("const Marquee")));
  assert.ok(files.some(file => file.path.endsWith("Marquee.css") && file.content.includes(".bemo-marquee")));
  assert.ok(files.every(file => !file.path.endsWith("SOURCE.md")));
});
