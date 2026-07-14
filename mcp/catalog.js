import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const VARIANT_ROOTS = [
  { id: "react-css", directory: "src/content", language: "jsx", styling: "css" },
  { id: "react-tailwind", directory: "src/tailwind", language: "jsx", styling: "tailwind" },
  { id: "react-ts-css", directory: "src/ts-default", language: "tsx", styling: "css" },
  { id: "react-ts-tailwind", directory: "src/ts-tailwind", language: "tsx", styling: "tailwind" },
];

const TEXT_FILE_EXTENSIONS = new Set([
  ".css",
  ".glsl",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".scss",
  ".ts",
  ".tsx",
  ".txt",
  ".vert",
  ".frag",
]);

const SLOT_RULES = [
  { pattern: /button/i, slots: ["cta"], useCases: ["call to action"] },
  { pattern: /(nav|menu|sidebar|dock)/i, slots: ["navigation"], useCases: ["page navigation"] },
  { pattern: /(marquee|logo loop)/i, slots: ["social-proof", "logo-wall"], useCases: ["customer logos", "continuous content strip"] },
  { pattern: /(tweet|testimonial)/i, slots: ["social-proof", "testimonials"], useCases: ["customer quotes", "social proof"] },
  { pattern: /(card|bento|masonry|grid)/i, slots: ["content-grid"], useCases: ["feature or content grouping"] },
  { pattern: /(gallery|carousel|stack|posters)/i, slots: ["media-gallery"], useCases: ["visual content browsing"] },
  { pattern: /(terminal|code comparison|file tree)/i, slots: ["developer-content"], useCases: ["technical product presentation"] },
  { pattern: /(iphone|android|safari|model viewer)/i, slots: ["product-showcase"], useCases: ["product or device preview"] },
  { pattern: /(globe|map)/i, slots: ["data-visualization"], useCases: ["geographic or global data"] },
  { pattern: /(cursor|hover|magnet|spark|confetti)/i, slots: ["interaction-enhancement"], useCases: ["pointer or interaction feedback"] },
  { pattern: /(text|type|word|letter|number|count|ticker)/i, slots: ["typography"], useCases: ["animated typography or metrics"] },
];

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function toWords(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function listFiles(directory) {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))
    .flatMap(entry => {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) return listFiles(absolutePath);
      if (!entry.isFile() || entry.name === "SOURCE.md" || entry.name.startsWith(".")) return [];
      return [absolutePath];
    });
}

function resolveModule(importer, specifier) {
  const base = path.resolve(path.dirname(importer), specifier);
  const candidates = [base, `${base}.js`, `${base}.jsx`, `${base}.ts`, `${base}.tsx`];
  return candidates.find(candidate => fs.existsSync(candidate)) ?? null;
}

function findCodeFile(demoFile) {
  if (!fs.existsSync(demoFile)) return null;
  const source = fs.readFileSync(demoFile, "utf8");
  const importPattern = /from\s+["']([^"']*constants\/code\/[^"']+)["']/g;
  const match = importPattern.exec(source);
  return match ? resolveModule(demoFile, match[1]) : null;
}

function extractTemplateProperty(source, property) {
  const pattern = new RegExp(`\\b${property}\\s*:\\s*([\\x60'"])([\\s\\S]*?)\\1\\s*,?`);
  return source.match(pattern)?.[2]?.trim() ?? null;
}

function packageName(specifier) {
  if (specifier.startsWith("@")) return specifier.split("/").slice(0, 2).join("/");
  return specifier.split("/")[0];
}

function extractPackageImports(files) {
  const dependencies = [];
  const importPattern = /(?:from\s*|import\s*\()\s*["']([^"']+)["']/g;

  for (const file of files) {
    if (![".js", ".jsx", ".ts", ".tsx"].includes(path.extname(file))) continue;
    const source = fs.readFileSync(file, "utf8");
    for (const match of source.matchAll(importPattern)) {
      const specifier = match[1];
      if (specifier.startsWith(".") || specifier.startsWith("@/") || specifier.startsWith("@content") || specifier.startsWith("@tailwind") || specifier.startsWith("@ts-")) continue;
      dependencies.push(packageName(specifier));
    }
  }

  return unique(dependencies).filter(dependency => !["react", "react-dom"].includes(dependency)).sort();
}

function parseProvenance(sourceFile) {
  if (!sourceFile || !fs.existsSync(sourceFile)) return null;
  const source = fs.readFileSync(sourceFile, "utf8");
  const entries = {};

  for (const line of source.split("\n")) {
    const match = line.match(/^-\s+([^:]+):\s*(.+)$/);
    if (!match) continue;
    const key = match[1]
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+(.)/g, (_, character) => character.toUpperCase());
    entries[key] = match[2].trim();
  }

  return Object.keys(entries).length > 0 ? entries : null;
}

function inferSemantics(name, category) {
  const slots = [];
  const useCases = [];
  const tags = toWords(name).map(word => word.toLowerCase());

  if (category === "Backgrounds") {
    slots.push("page-background", "hero-background");
    useCases.push("decorative animated background");
    tags.push("background", "motion");
  } else if (category === "TextAnimations") {
    slots.push("typography", "heading");
    useCases.push("animated headline or text emphasis");
    tags.push("text", "motion");
  } else if (category === "Animations") {
    slots.push("interaction-enhancement");
    useCases.push("motion and interaction enhancement");
    tags.push("animation", "motion");
  } else {
    slots.push("content-section");
    useCases.push("interactive page component");
  }

  for (const rule of SLOT_RULES) {
    if (!rule.pattern.test(name)) continue;
    slots.push(...rule.slots);
    useCases.push(...rule.useCases);
  }

  const normalizedSlots = unique(slots);
  const normalizedUseCases = unique(useCases);
  return {
    pageSlots: normalizedSlots,
    useCases: normalizedUseCases,
    keywords: unique([...tags, ...normalizedSlots, ...normalizedUseCases]).sort(),
    summary: `${name}：适用于${normalizedUseCases.slice(0, 2).join("、")}。`,
  };
}

function parseRoutes(rootDir) {
  const routeFile = path.join(rootDir, "src/constants/Components.js");
  const source = fs.readFileSync(routeFile, "utf8");
  const routePattern = /["']([^"']+)["']\s*:\s*\(\)\s*=>\s*import\(\s*["']([^"']+)["']\s*\)/g;

  return [...source.matchAll(routePattern)].map(match => {
    const demoModule = path.resolve(path.dirname(routeFile), match[2]);
    const demoFile = [demoModule, `${demoModule}.jsx`, `${demoModule}.tsx`].find(candidate => fs.existsSync(candidate));
    if (!demoFile) throw new Error(`Demo module not found for component route: ${match[1]}`);

    const demoRelative = toPosix(path.relative(path.join(rootDir, "src/demo"), demoFile));
    const parts = demoRelative.split("/");
    const name = path.basename(demoFile).replace(/Demo\.(jsx|tsx)$/, "");
    const isReactBits = parts[0] === "ReactBits";
    const category = isReactBits ? parts[1] : "Components";
    const componentRelative = isReactBits
      ? path.join("ReactBits", category, name)
      : path.join("Components", name);

    return {
      id: match[1],
      name,
      collection: isReactBits ? "ReactBits" : "MagicUI",
      category,
      componentRelative,
      demoFile,
    };
  });
}

function buildComponent(rootDir, route) {
  const variants = {};
  const allSourceFiles = [];

  for (const variant of VARIANT_ROOTS) {
    const directory = path.join(rootDir, variant.directory, route.componentRelative);
    const files = listFiles(directory);
    if (files.length === 0) continue;
    allSourceFiles.push(...files);
    variants[variant.id] = {
      language: variant.language,
      styling: variant.styling,
      files: files.map(file => toPosix(path.relative(rootDir, file))),
      bytes: files.reduce((total, file) => total + fs.statSync(file).size, 0),
    };
  }

  const contentDirectory = path.join(rootDir, "src/content", route.componentRelative);
  const provenanceFile = path.join(contentDirectory, "SOURCE.md");
  const codeFile = findCodeFile(route.demoFile);
  const codeSource = codeFile ? fs.readFileSync(codeFile, "utf8") : "";
  const declaredDependencies = (extractTemplateProperty(codeSource, "dependencies") ?? "")
    .split(/[\s,]+/)
    .filter(Boolean);
  const dependencies = unique([...declaredDependencies, ...extractPackageImports(allSourceFiles)]).sort();
  const searchableSource = allSourceFiles
    .filter(file => TEXT_FILE_EXTENSIONS.has(path.extname(file)))
    .map(file => fs.readFileSync(file, "utf8"))
    .join("\n");
  const semantics = inferSemantics(route.name, route.category);
  const usesWebGL = dependencies.some(dependency => ["three", "ogl", "@react-three/fiber"].includes(dependency));

  return {
    id: route.id,
    name: route.name,
    collection: route.collection,
    category: route.category,
    ...semantics,
    variants,
    dependencies,
    capabilities: {
      reducedMotion: /prefers-reduced-motion|useReducedMotion/i.test(searchableSource),
      webgl: usesWebGL,
      browserApis: /\b(window|document|navigator)\b/.test(searchableSource),
    },
    warnings: unique([
      usesWebGL ? "Uses WebGL and may have a higher runtime cost." : null,
      !/prefers-reduced-motion|useReducedMotion/i.test(searchableSource) && /animation|gsap|framer-motion/i.test(searchableSource)
        ? "No reduced-motion handling was detected automatically."
        : null,
    ]),
    documentation: {
      demoFile: toPosix(path.relative(rootDir, route.demoFile)),
      codeFile: codeFile ? toPosix(path.relative(rootDir, codeFile)) : null,
      usage: extractTemplateProperty(codeSource, "usage"),
    },
    provenance: parseProvenance(fs.existsSync(provenanceFile) ? provenanceFile : null),
  };
}

export function buildCatalog(rootDir = DEFAULT_ROOT) {
  const resolvedRoot = path.resolve(rootDir);
  const components = parseRoutes(resolvedRoot).map(route => buildComponent(resolvedRoot, route));
  const ids = new Set();

  for (const component of components) {
    if (ids.has(component.id)) throw new Error(`Duplicate component id: ${component.id}`);
    ids.add(component.id);
  }

  return components.sort((left, right) => left.id.localeCompare(right.id));
}

export function compactComponent(component) {
  return {
    id: component.id,
    name: component.name,
    collection: component.collection,
    category: component.category,
    summary: component.summary,
    pageSlots: component.pageSlots,
    useCases: component.useCases,
    keywords: component.keywords,
    variants: Object.keys(component.variants),
    dependencies: component.dependencies,
    capabilities: component.capabilities,
    warnings: component.warnings,
  };
}

export function filterCatalog(catalog, filters = {}) {
  const query = filters.query?.trim().toLowerCase();
  const collection = filters.collection?.trim().toLowerCase();
  const category = filters.category?.trim().toLowerCase();
  const variant = filters.variant?.trim().toLowerCase();

  return catalog.filter(component => {
    if (collection && component.collection.toLowerCase() !== collection) return false;
    if (category && component.category.toLowerCase() !== category) return false;
    if (variant && !component.variants[variant]) return false;
    if (!query) return true;

    const haystack = [
      component.id,
      component.name,
      component.collection,
      component.category,
      component.summary,
      ...component.pageSlots,
      ...component.useCases,
      ...component.keywords,
    ].join(" ").toLowerCase();
    return query.split(/\s+/).every(term => haystack.includes(term));
  });
}

export function readVariantSource(component, variantId, rootDir = DEFAULT_ROOT, maxBytes = 250_000) {
  const variant = component.variants[variantId];
  if (!variant) throw new Error(`Variant "${variantId}" is not available for ${component.id}.`);
  if (variant.bytes > maxBytes) {
    throw new Error(`Variant source is ${variant.bytes} bytes, above the ${maxBytes} byte limit.`);
  }

  return variant.files.map(relativePath => {
    const absolutePath = path.resolve(rootDir, relativePath);
    const relativeToRoot = path.relative(path.resolve(rootDir), absolutePath);
    if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) {
      throw new Error(`Source path escapes the BemoUI root: ${relativePath}`);
    }
    if (!TEXT_FILE_EXTENSIONS.has(path.extname(absolutePath))) {
      return { path: relativePath, omitted: true, reason: "Binary or unsupported text format." };
    }
    return { path: relativePath, content: fs.readFileSync(absolutePath, "utf8") };
  });
}

export { DEFAULT_ROOT, VARIANT_ROOTS };
