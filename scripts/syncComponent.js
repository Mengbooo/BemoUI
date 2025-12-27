import fs from "fs";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 组件同步脚本
 * 用途：同步组件的多个版本，减少代码重复
 * 
 * 使用方式：
 * npm run sync:component ComponentName [--source=content|tailwind|ts-default|ts-tailwind]
 * 
 * 示例：
 * npm run sync:component ShinyText --source=content
 *   - 将 content 版本同步到 ts-default（自动添加 TS 类型）
 */

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error("Usage: npm run sync:component <ComponentName> [--source=variant]");
  console.error("Available variants: content, tailwind, ts-default, ts-tailwind");
  process.exit(1);
}

const componentName = args[0];
const sourceArg = args.find(arg => arg.startsWith('--source='));
const source = sourceArg ? sourceArg.split('=')[1] : 'content';

const variants = {  
  content: {
    dir: '../src/content/Components',
    hasTS: false,
    hasCSS: true,
    hasStyle: false,
  },
  tailwind: {
    dir: '../src/tailwind/Components',
    hasTS: false,
    hasCSS: false,
    hasStyle: true,
  },
  'ts-default': {
    dir: '../src/ts-default/Components',
    hasTS: true,
    hasCSS: true,
    hasStyle: false,
  },
  'ts-tailwind': {
    dir: '../src/ts-tailwind/Components',
    hasTS: true,
    hasCSS: false,
    hasStyle: true,
  },
};

if (!variants[source]) {
  console.error(`Invalid source: ${source}`);
  console.error(`Available options: ${Object.keys(variants).join(', ')}`);
  process.exit(1);
}

function syncComponent(componentName, sourceVariant) {
  const sourceInfo = variants[sourceVariant];
  const sourcePath = path.join(__dirname, sourceInfo.dir, componentName);
  const jsxFile = path.join(sourcePath, `${componentName}.jsx`);
  const tsxFile = path.join(sourcePath, `${componentName}.tsx`);
  const cssFile = path.join(sourcePath, `${componentName}.css`);

  // Read source files
  if (!fs.existsSync(jsxFile) && !fs.existsSync(tsxFile)) {
    console.error(`Source component not found in ${sourceVariant}`);
    process.exit(1);
  }

  const sourceComponentFile = fs.existsSync(jsxFile) ? jsxFile : tsxFile;
  let componentContent = fs.readFileSync(sourceComponentFile, 'utf8');
  let cssContent = fs.existsSync(cssFile) ? fs.readFileSync(cssFile, 'utf8') : null;

  console.log(`Source: ${sourceVariant}`);
  console.log(`Component: ${componentName}\n`);

  // Sync to all other variants
  Object.entries(variants).forEach(([variant, info]) => {
    if (variant === sourceVariant) return;

    const targetPath = path.join(__dirname, info.dir, componentName);
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }

    const targetJsxFile = path.join(targetPath, `${componentName}.${info.hasTS ? 'tsx' : 'jsx'}`);
    const targetCssFile = path.join(targetPath, `${componentName}.css`);

    // Transform component content based on target variant
    let transformedContent = transformComponent(componentContent, {
      fromVariant: sourceVariant,
      toVariant: variant,
      fromHasTS: sourceInfo.hasTS,
      toHasTS: info.hasTS,
    });

    fs.writeFileSync(targetJsxFile, transformedContent);
    console.log(`Synced to ${variant}`);

    // Handle CSS files
    if (cssContent && info.hasCSS) {
      fs.writeFileSync(targetCssFile, cssContent);
      console.log(`  - CSS synced`);
    } else if (fs.existsSync(targetCssFile) && !info.hasCSS) {
      fs.unlinkSync(targetCssFile);
      console.log(`  - CSS removed`);
    }
  });

  console.log(`\nComponent "${componentName}" synchronized successfully!`);
}

/**
 * Transform component between different variants
 */
function transformComponent(content, options) {
  const { fromHasTS, toHasTS } = options;

  let result = content;

  // If converting from JS to TS
  if (!fromHasTS && toHasTS) {
    result = addTypeScriptTypes(result);
  }

  // If converting from TS to JS
  if (fromHasTS && !toHasTS) {
    result = removeTypeScriptTypes(result);
  }

  return result;
}

/**
 * Add basic TypeScript types to JSX component
 */
function addTypeScriptTypes(content) {
  // Extract component function signature
  const componentMatch = content.match(/const\s+(\w+)\s*=\s*\(\s*\{([^}]*)\}\s*\)\s*=>/);
  
  if (!componentMatch) {
    return content;
  }

  const componentName = componentMatch[1];
  const propsString = componentMatch[2];

  // Extract props and determine types
  const props = propsString
    .split(',')
    .map(p => p.trim())
    .filter(p => p)
    .map(p => {
      const [name, defaultValue] = p.split('=').map(x => x.trim());
      let type = 'string';
      
      if (defaultValue === 'false' || defaultValue === 'true') type = 'boolean';
      if (!isNaN(defaultValue) && defaultValue) type = 'number';
      
      const optional = defaultValue ? '?' : '';
      return `    ${name}${optional}: ${type};`;
    });

  const interfaceName = `${componentName}Props`;
  const propsInterface = props.join('\n');
  const typeInterface = `interface ${interfaceName} {
${propsInterface}
}

`;

  // Find the last import line
  const lastImportMatch = content.match(/^(.*import[^\n]*\n)+/m);
  const insertPosition = lastImportMatch ? lastImportMatch[0].length : 0;

  // Add interface after imports
  const result = content.slice(0, insertPosition) + typeInterface + content.slice(insertPosition);

  // Add type annotation to component
  return result.replace(
    new RegExp(`const\\s+${componentName}\\s*=\\s*\\(`, 'g'),
    `const ${componentName}: React.FC<${interfaceName}> = (`
  );
}

/**
 * Remove TypeScript types from component
 */
function removeTypeScriptTypes(content) {
  // Remove interface definitions
  content = content.replace(/interface\s+\w+Props\s*\{[^}]*\}\n\n/g, '');

  // Remove type annotations from component declaration
  content = content.replace(/:\s*React\.FC<\w+Props>\s*=/g, ' =');

  return content;
}

// Main execution
syncComponent(componentName, source);
