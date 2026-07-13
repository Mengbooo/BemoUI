import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { prepareMagicUIComponent, slugTitle, writeMagicUIComponent } from "./importMagicUI.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryUrl = "https://api.github.com/repos/magicuidesign/magicui/contents/apps/www/registry/magicui";
const statePath = path.join(repoRoot, "logs/magicui-import-state.json");

export function slugToPascal(slug) {
  return slug.split("-").map((part) => part === "3d" ? "3D" : `${part[0].toUpperCase()}${part.slice(1)}`).join("");
}

export function collisionSafeName(slug, existingNames) {
  const name = slugToPascal(slug);
  return existingNames.has(name) ? `Magic${name}` : name;
}

export function parseBatchArgs(argv) {
  const options = { retries: 2, limit: Infinity, concurrency: 4 };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--retry-failed") options.retryFailed = true;
    else if (arg === "--limit") options.limit = Number(argv[++index]);
    else if (arg === "--retries") options.retries = Number(argv[++index]);
    else if (arg === "--concurrency") options.concurrency = Number(argv[++index]);
    else throw new Error(`Unexpected argument: ${arg}`);
  }
  if (!Number.isInteger(options.retries) || options.retries < 0) throw new Error("--retries must be a non-negative integer");
  if (!(options.limit === Infinity || (Number.isInteger(options.limit) && options.limit > 0))) throw new Error("--limit must be a positive integer");
  if (!Number.isInteger(options.concurrency) || options.concurrency < 1 || options.concurrency > 8) throw new Error("--concurrency must be an integer from 1 to 8");
  return options;
}

async function registrySlugs() {
  const headers = { Accept: "application/vnd.github+json", "User-Agent": "BemoUI-MagicUI-Batch" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const response = await fetch(registryUrl, { headers });
  if (!response.ok) throw new Error(`GitHub API ${response.status}: ${await response.text()}`);
  return (await response.json()).filter((item) => item.type === "file" && item.name.endsWith(".tsx"))
    .map((item) => item.name.slice(0, -4)).sort();
}

function importedSlugs() {
  const root = path.join(repoRoot, "src/content/Components");
  return new Set(fs.readdirSync(root, { withFileTypes: true }).filter((entry) => entry.isDirectory()).flatMap((entry) => {
    const sourcePath = path.join(root, entry.name, "SOURCE.md");
    if (!fs.existsSync(sourcePath)) return [];
    const source = fs.readFileSync(sourcePath, "utf8");
    const slug = sourceSlug(source);
    return slug ? [slug] : [];
  }));
}

export function sourceSlug(source) {
  return source.match(/(?:Documentation: https:\/\/magicui\.design\/docs\/components|Registry: https:\/\/magicui\.design\/r)\/([a-z0-9-]+)(?:\.json)?/)?.[1];
}

function readState() {
  if (!fs.existsSync(statePath)) return { completed: [], failed: {} };
  return JSON.parse(fs.readFileSync(statePath, "utf8"));
}

function writeState(state) {
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);
}

export async function main(argv = process.argv.slice(2)) {
  const envFile = path.join(repoRoot, ".env.local");
  if (fs.existsSync(envFile)) process.loadEnvFile(envFile);
  const options = parseBatchArgs(argv);
  const imported = importedSlugs();
  const existingNames = new Set(fs.readdirSync(path.join(repoRoot, "src/content/Components")));
  const state = readState();
  for (const slug of imported) delete state.failed[slug];
  let pending = (await registrySlugs()).filter((slug) => !imported.has(slug));
  if (!options.retryFailed) pending = pending.filter((slug) => !state.failed[slug]);
  pending = pending.slice(0, options.limit);

  console.log(`Magic UI batch: ${imported.size} imported, ${pending.length} queued, concurrency ${options.concurrency}.`);
  let cursor = 0;
  async function importNext() {
    const index = cursor++;
    if (index >= pending.length) return;
    const slug = pending[index];
    const baseName = slugToPascal(slug);
    const name = collisionSafeName(slug, existingNames);
    const collision = name !== baseName;
    console.log(`\n[${index + 1}/${pending.length}] ${slug} -> ${name}`);
    let prepared;
    let error;
    for (let attempt = 0; attempt <= options.retries; attempt += 1) {
      try {
        prepared = await prepareMagicUIComponent({
          slug,
          name,
          displayTitle: collision ? `Magic ${slugTitle(slug)}` : undefined,
          routeSlug: collision ? `magic-${slug}` : undefined,
        });
        error = undefined;
        break;
      } catch (caught) {
        error = caught;
        console.error(`${slug}: attempt ${attempt + 1}/${options.retries + 1} failed: ${caught.message}`);
        if (attempt < options.retries) await new Promise((resolve) => setTimeout(resolve, 2000 * (attempt + 1)));
      }
    }

    if (prepared) {
      writeMagicUIComponent(prepared.result, prepared.options);
      existingNames.add(name);
      state.completed = [...new Set([...state.completed, slug])];
      delete state.failed[slug];
    } else {
      state.failed[slug] = String(error?.stack || error || "Unknown import failure").slice(-4000);
    }
    state.updatedAt = new Date().toISOString();
    writeState(state);
    await importNext();
  }

  await Promise.all(Array.from({ length: Math.min(options.concurrency, pending.length) }, () => importNext()));

  const failed = Object.keys(state.failed);
  console.log(`\nBatch complete: ${state.completed.length} completed, ${failed.length} failed.`);
  if (failed.length) {
    console.log(`Failed: ${failed.join(", ")}`);
    process.exitCode = 1;
  }
}

if (path.resolve(process.argv[1] || "") === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`Magic UI batch failed: ${error.message}`);
    process.exitCode = 1;
  });
}
