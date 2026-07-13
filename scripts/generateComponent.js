import fs from "fs";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error("Usage: npm run new:component <ComponentName>");
  process.exit(1);
}

const componentName = args[0];
const componentNameLower = componentName.charAt(0).toLowerCase() + componentName.slice(1);
const componentKebabCase = componentName
  .replace(/([A-Z])/g, '-$1')
  .toLowerCase()
  .replace(/^-/, '');

// Create directories for component in each variant
const paths = {
  content: path.join(__dirname, "../src/content/Components", componentName),
  tailwind: path.join(__dirname, "../src/tailwind/Components", componentName),
  ts: path.join(__dirname, "../src/ts-default/Components", componentName),
  tsTailwind: path.join(__dirname, "../src/ts-tailwind/Components", componentName),
  demo: path.join(__dirname, "../src/demo/Components"),
  constants: path.join(__dirname, "../src/constants/code/Components"),
};

// Create all necessary directories
Object.values(paths).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Create empty files
const files = [
  path.join(paths.content, `${componentName}.jsx`),
  path.join(paths.content, `${componentName}.css`),
  path.join(paths.tailwind, `${componentName}.jsx`),
  path.join(paths.ts, `${componentName}.tsx`),
  path.join(paths.ts, `${componentName}.css`),
  path.join(paths.tsTailwind, `${componentName}.tsx`),
  path.join(paths.demo, `${componentName}Demo.jsx`),
  path.join(paths.constants, `${componentNameLower}Code.js`),
];

files.forEach((file) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "");
  }
});

// Update Categories.js to add the component
updateCategoriesFile(componentName);

// Update Components.js to add the component mapping
updateComponentsFile(componentName);

console.log(`Component "${componentName}" structure created successfully.`);

// Function to update Categories.js
function updateCategoriesFile(componentName) {
  try {
    const categoriesPath = path.join(__dirname, "../src/constants/Categories.js");
    
    if (fs.existsSync(categoriesPath)) {
      let categoriesContent = fs.readFileSync(categoriesPath, 'utf8');
      
      // Convert component name to title case for Categories.js
      // For example: "SplitText" => "Split Text"
      const componentTitleCase = componentName
        .replace(/([A-Z])/g, ' $1') // Insert a space before capital letters
        .trim() // Remove leading space if first letter is capital
        .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
      
      // Add the item before the closing bracket while preserving valid formatting.
      const componentsArrayRegex = /(subcategories:\s*\[[\s\S]*?)(\n\s*\])/;
      const match = categoriesContent.match(componentsArrayRegex);
      
      if (match) {
        const separator = match[1].trimEnd().endsWith(',') ? '' : ',';
        const updatedContent = categoriesContent.replace(
          componentsArrayRegex,
          `$1${separator}\n      '${componentTitleCase}',$2`
        );
        
        fs.writeFileSync(categoriesPath, updatedContent);
        console.log(`✅ Added component "${componentTitleCase}" to Categories.js`);
      } else {
        console.log(`⚠️ Could not find subcategories array in Categories.js`);
      }
    } else {
      console.log(`⚠️ Categories.js file does not exist`);
    }
  } catch (error) {
    console.error(`❌ Failed to update Categories.js:`, error);
  }
}

// Function to update Components.js
function updateComponentsFile(componentName) {
  try {
    const componentsPath = path.join(__dirname, "../src/constants/Components.js");
    
    if (fs.existsSync(componentsPath)) {
      let componentsContent = fs.readFileSync(componentsPath, 'utf8');
      
      // Add the route before the closing brace while preserving valid formatting.
      const componentMapRegex = /(const\s+componentMap\s*=\s*\{[\s\S]*?)(\n\};)/;
      const match = componentsContent.match(componentMapRegex);
      
      if (match) {
        const separator = match[1].trimEnd().endsWith(',') ? '' : ',';
        const newComponentEntry = `${separator}\n  '${componentKebabCase}': () => import("../demo/Components/${componentName}Demo"),`;
        const updatedContent = componentsContent.replace(
          componentMapRegex,
          `$1${newComponentEntry}$2`
        );
        
        fs.writeFileSync(componentsPath, updatedContent);
        console.log(`✅ Added component "${componentKebabCase}" mapping to Components.js`);
      } else {
        console.log(`⚠️ Could not find componentMap in Components.js`);
      }
    } else {
      console.log(`⚠️ Components.js file does not exist`);
    }
  } catch (error) {
    console.error(`❌ Failed to update Components.js:`, error);
  }
}
