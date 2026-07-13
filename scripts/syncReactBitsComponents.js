import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const upstreamUrl = 'https://github.com/DavidHDev/react-bits.git';
const defaultCacheDir = path.join(os.homedir(), '.cache', 'bemoui-reactbits-upstream');
const variants = ['content', 'tailwind', 'ts-default', 'ts-tailwind'];
export const collections = ['TextAnimations', 'Animations', 'Components', 'Backgrounds'];
const allowedSourceExtensions = new Set([
  '.css', '.glb', '.jpeg', '.jpg', '.js', '.jsx', '.png', '.svg', '.ts', '.tsx', '.webp'
]);
const demoAssetPaths = [
  'src/assets/demo/cs1.webp',
  'src/assets/demo/cs2.webp',
  'src/assets/demo/cs3.webp'
];
const componentPublicAssets = [
  'public/assets/3d/bar.glb',
  'public/assets/3d/cube.glb',
  'public/assets/3d/lens.glb',
  'public/assets/demo/cs1.webp',
  'public/assets/demo/cs2.webp',
  'public/assets/demo/cs3.webp'
];

const sharedFiles = {
  'TabsLayout.jsx': `import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../../components/common/TabbedLayout';
import CliInstallation from '../../../components/code/CliInstallation';

const TabsLayout = ({ children, className }) => (
  <TabbedLayout className={className}>
    {children}
    <CliTab><CliInstallation /></CliTab>
  </TabbedLayout>
);

export { CodeTab, PreviewTab, TabsLayout };
`,
  'useComponentProps.js': `import { useCallback, useMemo, useRef, useState } from 'react';

const useComponentProps = defaultProps => {
  const defaults = useRef(defaultProps).current;
  const [props, setProps] = useState(defaults);
  const updateProp = useCallback((name, value) => setProps(current => ({ ...current, [name]: value })), []);
  const updateProps = useCallback(updates => setProps(current => ({ ...current, ...updates })), []);
  const resetProps = useCallback(() => setProps(defaults), [defaults]);
  const hasChanges = useMemo(
    () => Object.keys(defaults).some(key => props[key] !== defaults[key]),
    [defaults, props]
  );
  return { props, defaultProps: defaults, updateProp, updateProps, resetProps, hasChanges };
};

export default useComponentProps;
`,
  'ComponentPropsContext.jsx': `const ComponentPropsProvider = ({ children }) => children;

export { ComponentPropsProvider };
`,
  'Customize.jsx': `const Customize = ({ children }) => (
  <div className="preview-options reactbits-preview-options">
    <h2 className="demo-title-extra">Customize</h2>
    <div className="reactbits-controls">{children}</div>
  </div>
);

export default Customize;
`,
  'PreviewSlider.jsx': `import './preview-controls.css';

const PreviewSlider = ({ title = '', min = 0, max = 100, step = 1, value = 0, valueUnit = '', displayValue, isDisabled = false, onChange }) => (
  <label className="reactbits-control">
    <span>{title}</span>
    <input type="range" min={min} max={max} step={step} value={value} disabled={isDisabled} onChange={event => onChange?.(Number(event.target.value))} />
    <output>{displayValue ? displayValue(value) : \`${'${value}${valueUnit}'}\`}</output>
  </label>
);

export default PreviewSlider;
`,
  'PreviewSelect.jsx': `import './preview-controls.css';

const PreviewSelect = ({ title = '', options = [], value = '', isDisabled = false, onChange }) => (
  <label className="reactbits-control">
    <span>{title}</span>
    <select value={value} disabled={isDisabled} onChange={event => onChange?.(event.target.value)}>
      {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  </label>
);

export default PreviewSelect;
`,
  'PreviewSwitch.jsx': `import './preview-controls.css';

const PreviewSwitch = ({ title = '', isChecked = false, isDisabled = false, onChange }) => (
  <label className="reactbits-control reactbits-control-switch">
    <span>{title}</span>
    <input type="checkbox" checked={isChecked} disabled={isDisabled} onChange={event => onChange?.(event.target.checked)} />
  </label>
);

export default PreviewSwitch;
`,
  'PreviewInput.jsx': `import './preview-controls.css';

const PreviewInput = ({ title = '', value = '', placeholder = '', maxLength, isDisabled = false, onChange }) => (
  <label className="reactbits-control">
    <span>{title}</span>
    <input type="text" value={value} placeholder={placeholder} maxLength={maxLength} disabled={isDisabled} onChange={event => onChange?.(event.target.value)} />
  </label>
);

export default PreviewInput;
`,
  'PreviewColorPickerCustom.jsx': `import './preview-controls.css';

const PreviewColorPickerCustom = ({ title = '', color = '#1620E4', onChange }) => (
  <label className="reactbits-control reactbits-control-color">
    <span>{title}</span>
    <input type="color" value={color} onChange={event => onChange?.(event.target.value)} />
    <code>{color}</code>
  </label>
);

export default PreviewColorPickerCustom;
`,
  'OpenInStudioButton.jsx': `const OpenInStudioButton = () => null;

export default OpenInStudioButton;
`,
  'BackgroundContent.jsx': `const BackgroundContent = ({ pillText = 'BemoUI', headline = 'Build a distinctive landing page.' }) => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'grid', placeContent: 'center', gap: 12, padding: 24, textAlign: 'center', pointerEvents: 'none' }}>
    <span style={{ justifySelf: 'center', padding: '6px 12px', border: '1px solid rgba(123,233,198,.45)', borderRadius: 999, color: '#7BE9C6', background: 'rgba(8,9,13,.7)', fontSize: 12 }}>{pillText}</span>
    <strong style={{ maxWidth: 620, color: '#fff', fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', lineHeight: 1.05 }}>{headline}</strong>
  </div>
);

export default BackgroundContent;
`,
  'DemoBackdrop.jsx': `const DemoBackdrop = ({ children }) => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'radial-gradient(circle at 25% 20%, rgba(22,32,228,.42), transparent 40%), radial-gradient(circle at 75% 80%, rgba(123,233,198,.3), transparent 42%), #08090d' }}>
    {children}
  </div>
);

export default DemoBackdrop;
`,
  'preview-controls.css': `.reactbits-preview-options { margin-top: 1.5rem; }
.reactbits-controls { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: .75rem; margin-top: 1rem; }
.reactbits-control { min-height: 56px; display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: .65rem; padding: .75rem .9rem; color: #f4f4f5; background: #0b0c10; border: 1px solid #ffffff1c; border-radius: 10px; font-size: .8rem; }
.reactbits-control input[type='range'] { grid-column: 1 / -1; width: 100%; accent-color: #1620E4; }
.reactbits-control input[type='text'], .reactbits-control select { min-width: 0; max-width: 150px; color: #fff; background: #060606; border: 1px solid #ffffff26; border-radius: 7px; padding: .45rem .55rem; }
.reactbits-control input[type='checkbox'], .reactbits-control input[type='color'] { accent-color: #1620E4; }
.reactbits-control output, .reactbits-control code { color: #7BE9C6; }
`
};

function kebabCase(value) {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
}

function titleCase(value) {
  return value
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}

function normalizeText(source) {
  return source.split('\n').map(line => line.trimEnd()).join('\n');
}

export function parseArgs(argv) {
  const result = { all: false, dryRun: false, repoDir: process.env.REACTBITS_REPO_DIR || defaultCacheDir };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--all') result.all = true;
    else if (arg === '--dry-run') result.dryRun = true;
    else if (arg === '--component') result.component = argv[++index];
    else if (arg === '--collection') result.collection = argv[++index];
    else if (arg === '--repo-dir') result.repoDir = path.resolve(argv[++index]);
    else throw new Error(`Unexpected argument: ${arg}`);
  }
  if (result.all === Boolean(result.component)) throw new Error('Use exactly one of --all or --component <PascalCaseName>');
  if (result.component && !/^[A-Z][A-Za-z0-9]*$/.test(result.component)) throw new Error('--component must be PascalCase');
  if (result.collection && !collections.includes(result.collection)) {
    throw new Error(`--collection must be one of: ${collections.join(', ')}`);
  }
  return result;
}

function runGit(args, cwd) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

export function ensureUpstream(repoDir) {
  if (!fs.existsSync(path.join(repoDir, '.git'))) {
    fs.mkdirSync(path.dirname(repoDir), { recursive: true });
    runGit(['clone', '--depth', '1', '--filter=blob:none', '--sparse', upstreamUrl, repoDir], repoRoot);
  } else {
    runGit(['fetch', '--depth', '1', 'origin', 'main'], repoDir);
    runGit(['reset', '--hard', 'origin/main'], repoDir);
  }
  for (const lock of [path.join(repoDir, '.git', 'index.lock'), path.join(repoDir, '.git', 'info', 'sparse-checkout.lock')]) {
    if (fs.existsSync(lock)) fs.rmSync(lock);
  }
  const collectionPaths = collections.flatMap(collection => [
    `/src/content/${collection}/`,
    `/src/tailwind/${collection}/`,
    `/src/ts-default/${collection}/`,
    `/src/ts-tailwind/${collection}/`,
    `/src/demo/${collection}/`,
    `/src/constants/code/${collection}/`
  ]);
  runGit([
    'sparse-checkout', 'set', '--no-cone',
    ...collectionPaths,
    ...demoAssetPaths.map(value => `/${value}`),
    ...componentPublicAssets.map(value => `/${value}`),
    '/package.json'
  ], repoDir);
  runGit(['checkout', 'HEAD', '--', '.'], repoDir);
  return {
    sha: runGit(['rev-parse', 'HEAD'], repoDir),
    date: runGit(['show', '-s', '--format=%cs', 'HEAD'], repoDir)
  };
}

export function applyBrandAccents(source) {
  const replacements = new Map([
    ['#5227ff', '#1620E4'],
    ['#a855f7', '#1620E4'],
    ['#8b5cf6', '#1620E4'],
    ['#4f46e5', '#1620E4'],
    ['#c084fc', '#7BE9C6'],
    ['#f472b6', '#7BE9C6']
  ]);
  return source.replace(/#[0-9a-fA-F]{6}\b/g, color => replacements.get(color.toLowerCase()) || color);
}

export function applyBemoBranding(source) {
  return source
    .replaceAll('React Bits', 'BemoUI')
    .replaceAll('react bits', 'BemoUI')
    .replace(/david@reactbits\.dev/gi, 'hello@bemoui.dev')
    .replaceAll('/src/assets/logos/reactbits-gh-white.svg', '/src/assets/logos/bemoUI-logo-white.svg')
    .replaceAll('/src/assets/logos/reactbits-gh-black.svg', '/src/assets/logos/bemoUI-logo-black.svg')
    .replaceAll('/src/assets/logos/react-bits-logo-small.svg', '/src/assets/logos/bemoUI-icon.svg')
    .replaceAll('/src/assets/logos/react-bits-logo-small-black.svg', '/src/assets/logos/bemoUI-icon.svg');
}

function adaptComponentSource(source) {
  let result = applyBemoBranding(applyBrandAccents(source))
    .replaceAll("from 'motion/react'", "from 'framer-motion'")
    .replaceAll('from "motion/react"', 'from "framer-motion"')
    .replaceAll('Timer as e,', 'Clock as e,')
    .replaceAll('this.#c.update();\n      this.#h.delta = this.#c.getDelta();', 'this.#h.delta = this.#c.getDelta();')
    .replaceAll('this.#c.reset();', 'this.#c.start();')
    .replace(/(from\s+['"][^'"]+\.glb)(['"])/g, '$1?url$2')
    .replaceAll('} catch {}', '} catch { /* Best-effort cleanup. */ }')
    .replaceAll('} catch (e) {}', '} catch { /* Optional resource was unavailable. */ }')
    .replace(
      '  }, [webGLSupported, quality]);',
      '  // Renderer initialization intentionally uses the initial visual props; later effects update uniforms.\n  // eslint-disable-next-line react-hooks/exhaustive-deps\n  }, [webGLSupported, quality]);'
    )
    .replace(
      '    setCaretU(layout.textStartU + (caretLen - next) * geom.uPerLen);\n  });',
      '    setCaretU(layout.textStartU + (caretLen - next) * geom.uPerLen);\n  }, [geom, layout, caretIndex, display.length]);'
    )
    .replace(
      '    openTlRef.current = tl;\n    return tl;\n  }, []);',
      '    openTlRef.current = tl;\n    return tl;\n  }, [position]);'
    )
    .replaceAll('[fontFamily, fontUrl, textColor, strokeColor', '[fontUrl, textColor, strokeColor');

  if (result.includes('const MAX_COLORS = 8;')) {
    result = result.replace("import React, { useEffect, useRef } from 'react';", "import { useEffect, useRef } from 'react';");
  }
  if (result.includes('rebuildRef.current?.();') && result.includes('const DotField')) {
    result = result.replace('  // eslint-disable-next-line react-hooks/exhaustive-deps\n  }, []);', '  }, []);');
  }

  const sideRaysExport = 'export default SideRays;';
  const firstSideRaysExport = result.indexOf(sideRaysExport);
  if (firstSideRaysExport !== -1 && result.indexOf(sideRaysExport, firstSideRaysExport + sideRaysExport.length) !== -1) {
    result = `${result.slice(0, firstSideRaysExport + sideRaysExport.length)}\n`;
  }
  return normalizeText(result);
}

function copyDirectory(sourceDir, targetDir, writeFile) {
  assert.ok(fs.existsSync(sourceDir), `Missing upstream directory: ${sourceDir}`);
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    if (entry.isDirectory()) copyDirectory(sourcePath, targetPath, writeFile);
    else {
      assert.ok(allowedSourceExtensions.has(path.extname(entry.name).toLowerCase()), `Unexpected component file: ${sourcePath}`);
      const buffer = fs.readFileSync(sourcePath);
      const isText = ['.css', '.js', '.jsx', '.ts', '.tsx'].includes(path.extname(entry.name).toLowerCase());
      writeFile(targetPath, isText ? `${adaptComponentSource(buffer.toString('utf8')).trimEnd()}\n` : buffer);
    }
  }
}

export function adaptDemo(source, collection = 'Components') {
  const sharedReplacements = new Map([
    ['../../components/common/TabsLayout', '../_shared/TabsLayout'],
    ['../../hooks/useComponentProps', '../_shared/useComponentProps'],
    ['../../components/context/ComponentPropsContext', '../_shared/ComponentPropsContext'],
    ['../../components/common/Preview/Customize', '../_shared/Customize'],
    ['@/components/common/Preview/Customize', '../_shared/Customize'],
    ['../../components/common/Preview/PreviewColorPickerCustom', '../_shared/PreviewColorPickerCustom'],
    ['../../components/common/Preview/PreviewInput', '../_shared/PreviewInput'],
    ['@/components/common/Preview/PreviewInput', '../_shared/PreviewInput'],
    ['../../components/common/Preview/PreviewSelect', '../_shared/PreviewSelect'],
    ['../../components/common/Preview/PreviewSlider', '../_shared/PreviewSlider'],
    ['../../components/common/Preview/PreviewSwitch', '../_shared/PreviewSwitch'],
    ['@/components/common/Preview/PreviewSwitch', '../_shared/PreviewSwitch'],
    ['../../components/common/Preview/OpenInStudioButton', '../_shared/OpenInStudioButton'],
    ['../../components/common/Preview/BackgroundContent', '../_shared/BackgroundContent'],
    ['@/components/common/Preview/BackgroundContent', '../_shared/BackgroundContent'],
    ['../../components/common/Preview/PropTable', '../../../components/common/PropTable'],
    ['../../components/common/Preview/RefreshButton', '../../../components/common/RefreshButton'],
    ['@/components/common/Preview/RefreshButton', '../../../components/common/RefreshButton'],
    ['../../components/code/CodeExample', '../../../components/code/CodeExample'],
    ['@/components/code/CodeExample', '../../../components/code/CodeExample'],
    ['../../components/code/Dependencies', '../../../components/code/Dependencies'],
    ['@/components/code/Dependencies', '../../../components/code/Dependencies'],
    ['../../hooks/useForceRerender', '../../../hooks/useForceRerender'],
    ['@/hooks/useForceRerender', '../../../hooks/useForceRerender'],
    ['../../assets/logos/reactbits-gh-white.svg', '../../../assets/logos/bemoUI-logo-white.svg'],
    ['../../assets/logos/reactbits-gh-black.svg', '../../../assets/logos/bemoUI-logo-black.svg'],
    ['../../assets/logos/react-bits-logo-small.svg', '../../../assets/logos/bemoUI-icon.svg'],
    ['../../assets/logos/react-bits-logo-small-black.svg', '../../../assets/logos/bemoUI-icon.svg'],
    ['../../assets/logos/react-bits-sticker.png', '../../../assets/logos/bemoUI-icon.png']
  ]);
  let result = source.replaceAll('../../assets/demo/', '../assets/demo/');
  for (const [from, to] of sharedReplacements) result = result.split(from).join(to);

  for (const variant of variants) {
    const sourcePrefix = variant === 'content' ? 'content' : variant;
    for (const sourceCollection of collections) {
      result = result
        .replaceAll(`../../${sourcePrefix}/${sourceCollection}/`, `../../../${sourcePrefix}/ReactBits/${sourceCollection}/`)
        .replaceAll(`@/${sourcePrefix}/${sourceCollection}/`, `../../../${sourcePrefix}/ReactBits/${sourceCollection}/`)
        .replaceAll(`@${sourcePrefix}/${sourceCollection}/`, `../../../${sourcePrefix}/ReactBits/${sourceCollection}/`);
    }
  }
  for (const sourceCollection of collections) {
    result = result
      .replaceAll(`../../constants/code/${sourceCollection}/`, `../../../constants/code/ReactBits/${sourceCollection}/`)
      .replaceAll(`@/constants/code/${sourceCollection}/`, `../../../constants/code/ReactBits/${sourceCollection}/`);
  }
  result = result
    .replaceAll("from 'motion/react'", "from 'framer-motion'")
    .replaceAll('from "motion/react"', 'from "framer-motion"');

  const forbidden = [...result.matchAll(/from\s+['"]([^'"]+)['"]/g)]
    .map(match => match[1])
    .filter(specifier => specifier.startsWith('@/') || specifier.startsWith('@content/'));
  assert.deepEqual(forbidden, [], `Unadapted demo imports in ${collection}: ${forbidden.join(', ')}`);
  return normalizeText(applyBemoBranding(applyBrandAccents(result)));
}

function adaptCodeConstant(source, collection) {
  let result = source;
  for (const variant of variants) {
    const sourcePrefix = variant === 'content' ? 'content' : variant;
    result = result
      .replaceAll(`@${sourcePrefix}/${collection}/`, `@${sourcePrefix}/ReactBits/${collection}/`)
      .replaceAll(`../../../${sourcePrefix}/${collection}/`, `@${sourcePrefix}/ReactBits/${collection}/`);
  }
  return normalizeText(applyBemoBranding(result.replace(/dependencies:\s*`motion`/g, 'dependencies: `framer-motion`')));
}

function categoryBody(source, categoryName) {
  const pattern = new RegExp(`(name:\\s*['"]${categoryName}['"][\\s\\S]*?subcategories:\\s*\\[)([\\s\\S]*?)(\\s*\\])`);
  const match = source.match(pattern);
  if (!match) throw new Error(`${categoryName} category not found`);
  return { pattern, match, items: [...match[2].matchAll(/['"]([^'"]+)['"]/g)].map(value => value[1]) };
}

export function createRouteEntries(source, entries) {
  const magicItems = new Set(categoryBody(source, 'MagicUI').items);
  return entries.map(entry => {
    const title = titleCase(entry.name);
    const label = magicItems.has(title) ? `ReactBits ${title}` : title;
    return { ...entry, label, slug: label.replace(/\s+/g, '-').toLowerCase() };
  });
}

export function updateCategory(source, entries) {
  const { pattern, items: existing } = categoryBody(source, 'ReactBits');
  const additions = entries.map(entry => {
    if (typeof entry !== 'string') return entry.label;
    return entry === 'Dock' ? 'ReactBits Dock' : titleCase(entry);
  });
  const synchronizedLabels = new Set(entries.flatMap(entry => {
    if (typeof entry === 'string') return [entry, titleCase(entry), `ReactBits ${titleCase(entry)}`];
    return [entry.name, titleCase(entry.name), `ReactBits ${titleCase(entry.name)}`];
  }));
  const retained = existing.filter(item => !synchronizedLabels.has(item));
  const items = [...new Set([...retained, ...additions])];
  const body = items.map(item => `\n      '${item}',`).join('');
  return source.replace(pattern, `$1${body}$3`);
}

export function updateRoutes(source, entries) {
  let result = source;
  for (const entryValue of entries) {
    const entry = typeof entryValue === 'string'
      ? { name: entryValue, collection: 'Components', slug: entryValue === 'Dock' ? 'reactbits-dock' : kebabCase(entryValue) }
      : entryValue;
    const importPath = `../demo/ReactBits/${entry.collection}/${entry.name}Demo`;
    const importPathPattern = importPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(
      new RegExp(`^\\s*['"][^'"]+['"]:\\s*\\(\\)\\s*=>\\s*import\\(['"]${importPathPattern}['"]\\),?\\n?`, 'gm'),
      ''
    );
    const line = `  '${entry.slug}': () => import("${importPath}"),`;
    const pattern = new RegExp(`^\\s*['"]${entry.slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]:\\s*\\(\\)\\s*=>\\s*import\\([^\\n]+\\),?`, 'm');
    if (pattern.test(result)) result = result.replace(pattern, line);
    else result = result.replace(/\n};/, `\n${line}\n};`);
  }
  return result;
}

export function createWriter({ dryRun = false } = {}) {
  const written = [];
  const allowedExact = new Set([
    path.join(repoRoot, 'src/constants/Categories.js'),
    path.join(repoRoot, 'src/constants/Components.js'),
    ...componentPublicAssets.map(value => path.join(repoRoot, value))
  ]);
  const allowedPrefixes = [
    'src/content/ReactBits/',
    'src/tailwind/ReactBits/',
    'src/ts-default/ReactBits/',
    'src/ts-tailwind/ReactBits/',
    'src/demo/ReactBits/',
    'src/constants/code/ReactBits/'
  ].map(value => path.join(repoRoot, value));

  const writeFile = (targetPath, content) => {
    const resolved = path.resolve(targetPath);
    const allowed = allowedExact.has(resolved) || allowedPrefixes.some(prefix => resolved.startsWith(prefix));
    if (!allowed) throw new Error(`Refusing to write outside ReactBits component allowlist: ${resolved}`);
    written.push(path.relative(repoRoot, resolved));
    if (dryRun) return;
    fs.mkdirSync(path.dirname(resolved), { recursive: true });
    const targetName = path.basename(resolved);
    const caseVariant = fs.readdirSync(path.dirname(resolved)).find(
      name => name !== targetName && name.toLowerCase() === targetName.toLowerCase()
    );
    if (caseVariant) {
      const temporaryPath = path.join(path.dirname(resolved), `${targetName}.case-normalization-tmp`);
      fs.renameSync(path.join(path.dirname(resolved), caseVariant), temporaryPath);
      fs.renameSync(temporaryPath, resolved);
    }
    fs.writeFileSync(resolved, content);
  };
  return { writeFile, written };
}

function writeShared(writeFile) {
  for (const [fileName, source] of Object.entries(sharedFiles)) {
    writeFile(path.join(repoRoot, 'src/demo/ReactBits/_shared', fileName), source);
  }
}

function writeAssets(repoDir, writeFile) {
  for (const sourceRelative of demoAssetPaths) {
    const sourcePath = path.join(repoDir, sourceRelative);
    if (!fs.existsSync(sourcePath)) continue;
    const assetRelative = path.relative('src/assets', sourceRelative);
    writeFile(path.join(repoRoot, 'src/demo/ReactBits/assets', assetRelative), fs.readFileSync(sourcePath));
  }
}

function writeComponentPublicAssets(repoDir, writeFile) {
  for (const sourceRelative of componentPublicAssets) {
    const sourcePath = path.join(repoDir, sourceRelative);
    assert.ok(fs.existsSync(sourcePath), `Missing upstream component asset: ${sourceRelative}`);
    writeFile(path.join(repoRoot, sourceRelative), fs.readFileSync(sourcePath));
  }
}

function writeSourceRecord(entry, upstream, writeFile) {
  writeFile(
    path.join(repoRoot, 'src/content/ReactBits', entry.collection, entry.name, 'SOURCE.md'),
    `# Source\n\n- Project: React Bits\n- Collection: ${entry.collection}\n- Component: ${entry.name}\n- Repository: ${upstreamUrl.replace(/\.git$/, '')}\n- Upstream path: \`src/content/${entry.collection}/${entry.name}\`\n- Upstream commit: \`${upstream.sha}\`\n- Upstream commit date: ${upstream.date}\n- Imported: ${new Date().toISOString().slice(0, 10)}\n- License: MIT\n\nComponent source and demo are synchronized only; site documentation and application shell are intentionally excluded.\n`
  );
}

export function listAvailableComponents(repoDir, selectedCollection) {
  const selected = selectedCollection ? [selectedCollection] : collections;
  return selected.flatMap(collection => {
    const sourceDir = path.join(repoDir, 'src/content', collection);
    assert.ok(fs.existsSync(sourceDir), `Missing upstream collection: ${collection}`);
    return fs.readdirSync(sourceDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => ({ collection, name: entry.name }));
  }).sort((a, b) => collections.indexOf(a.collection) - collections.indexOf(b.collection) || a.name.localeCompare(b.name));
}

export function syncComponents(options, upstream) {
  const available = listAvailableComponents(options.repoDir, options.collection);
  let entries;
  if (options.all) entries = available;
  else {
    const matches = available.filter(entry => entry.name === options.component);
    if (matches.length === 0) throw new Error(`React Bits component not found: ${options.component}`);
    if (matches.length > 1) throw new Error(`Component ${options.component} exists in multiple collections; add --collection`);
    entries = matches;
  }

  const categoriesPath = path.join(repoRoot, 'src/constants/Categories.js');
  const routesPath = path.join(repoRoot, 'src/constants/Components.js');
  const categoriesSource = fs.readFileSync(categoriesPath, 'utf8');
  const routeEntries = createRouteEntries(categoriesSource, entries);
  const { writeFile, written } = createWriter(options);
  writeShared(writeFile);
  writeAssets(options.repoDir, writeFile);
  writeComponentPublicAssets(options.repoDir, writeFile);

  for (const entry of routeEntries) {
    for (const variant of variants) {
      copyDirectory(
        path.join(options.repoDir, 'src', variant, entry.collection, entry.name),
        path.join(repoRoot, 'src', variant, 'ReactBits', entry.collection, entry.name),
        writeFile
      );
    }
    const demoPath = path.join(options.repoDir, 'src/demo', entry.collection, `${entry.name}Demo.jsx`);
    const constantDir = path.join(options.repoDir, 'src/constants/code', entry.collection);
    const constantName = fs.readdirSync(constantDir).find(
      fileName => fileName.toLowerCase() === `${entry.name.toLowerCase()}code.js`
    );
    const constantPath = constantName ? path.join(constantDir, constantName) : '';
    assert.ok(fs.existsSync(demoPath), `Missing upstream demo: ${entry.collection}/${entry.name}`);
    assert.ok(fs.existsSync(constantPath), `Missing upstream code constant: ${entry.collection}/${entry.name}`);
    writeFile(
      path.join(repoRoot, 'src/demo/ReactBits', entry.collection, `${entry.name}Demo.jsx`),
      `${adaptDemo(fs.readFileSync(demoPath, 'utf8'), entry.collection).trimEnd()}\n`
    );
    writeFile(
      path.join(repoRoot, 'src/constants/code/ReactBits', entry.collection, constantName),
      `${adaptCodeConstant(fs.readFileSync(constantPath, 'utf8'), entry.collection).trimEnd()}\n`
    );
    writeSourceRecord(entry, upstream, writeFile);
  }

  writeFile(categoriesPath, updateCategory(categoriesSource, routeEntries));
  writeFile(routesPath, updateRoutes(fs.readFileSync(routesPath, 'utf8'), routeEntries));
  return { entries: routeEntries, written };
}

export async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const upstream = ensureUpstream(options.repoDir);
  const result = syncComponents(options, upstream);
  console.log(`${options.dryRun ? 'Would sync' : 'Synced'} ${result.entries.length} React Bits components from ${upstream.sha.slice(0, 12)}.`);
  console.log(`Touched ${result.written.length} allowlisted component files.`);
}

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error(`React Bits component sync failed: ${error.message}`);
    process.exitCode = 1;
  });
}
