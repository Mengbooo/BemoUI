import fs from "fs";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("Usage: npm run delete:component <ComponentType> [ComponentName1 ComponentName2 ...]");
  process.exit(1);
}

const componentType = args[0];
const componentNames = args.slice(1);

if (componentNames.length === 0) {
  console.error("Error: At least one component name must be provided");
  process.exit(1);
}

// Function to delete a single component
function deleteComponent(componentType, componentName) {
  const componentNameLower = componentName.charAt(0).toLowerCase() + componentName.slice(1);
  
  // Define paths to delete
  const paths = {
    content: path.join(__dirname, "../src/content", componentType, componentName),
    tailwind: path.join(__dirname, "../src/tailwind", componentType, componentName),
    ts: path.join(__dirname, "../src/ts-default", componentType, componentName),
    tsTailwind: path.join(__dirname, "../src/ts-tailwind", componentType, componentName),
  };

  // Define files to delete
  const files = [
    path.join(__dirname, "../src/demo", componentType, `${componentName}Demo.jsx`),
    path.join(__dirname, "../src/constants/code", componentType, `${componentNameLower}Code.js`),
  ];

  // Delete directories
  Object.entries(paths).forEach(([key, dir]) => {
    if (fs.existsSync(dir)) {
      try {
        fs.rmSync(dir, { recursive: true, force: true });
        console.log(`✅ Deleted ${key} directory: ${dir}`);
      } catch (error) {
        console.error(`❌ Failed to delete ${key} directory: ${dir}`, error);
      }
    } else {
      console.log(`⚠️ ${key} directory does not exist: ${dir}`);
    }
  });

  // Delete files
  files.forEach((file) => {
    if (fs.existsSync(file)) {
      try {
        fs.unlinkSync(file);
        console.log(`✅ Deleted file: ${file}`);
      } catch (error) {
        console.error(`❌ Failed to delete file: ${file}`, error);
      }
    } else {
      console.log(`⚠️ File does not exist: ${file}`);
    }
  });
  
  // Update Categories.js to remove the component reference
  updateCategoriesFile(componentType, componentName);
  
  // Update Components.js to remove the component mapping
  updateComponentsFile(componentType, componentName);
  
  console.log(`Component "${componentName}" has been removed from "${componentType}" type.`);
}

// Function to update Categories.js
function updateCategoriesFile(componentType, componentName) {
  try {
    const categoriesPath = path.join(__dirname, "../src/constants/Categories.js");
    
    if (fs.existsSync(categoriesPath)) {
      let categoriesContent = fs.readFileSync(categoriesPath, 'utf8');
      
      // Find the component name in title case format in Categories.js
      // For example: "Split Text", "Blur Text", etc.
      const componentTitleCase = componentName
        .replace(/([A-Z])/g, ' $1') // Insert a space before capital letters
        .trim() // Remove leading space if first letter is capital
        .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
      
      // Find and remove component references
      const regex = new RegExp(`(['"])${componentTitleCase}\\1,?\\s*`, 'g');
      const newContent = categoriesContent.replace(regex, '');
      
      // Handle potential syntax issues like consecutive commas
      const cleanContent = newContent.replace(/,\s*,/g, ',').replace(/,\s*]/g, ']');
      
      // Also remove from NEW or UPDATED arrays if present
      const newRegex = new RegExp(`(NEW\\s*=\\s*\\[.*?)(['"])${componentTitleCase}\\2,?\\s*(.*?\\];)`, 's');
      const updatedRegex = new RegExp(`(UPDATED\\s*=\\s*\\[.*?)(['"])${componentTitleCase}\\2,?\\s*(.*?\\];)`, 's');
      
      let modifiedContent = cleanContent;
      modifiedContent = modifiedContent.replace(newRegex, '$1$3');
      modifiedContent = modifiedContent.replace(updatedRegex, '$1$3');
      
      // Fix any resulting syntax issues
      modifiedContent = modifiedContent.replace(/\[\s*,/g, '[').replace(/,\s*,/g, ',').replace(/,\s*]/g, ']');
      
      fs.writeFileSync(categoriesPath, modifiedContent);
      console.log(`✅ Removed component "${componentTitleCase}" reference from Categories.js`);
    } else {
      console.log(`⚠️ Categories.js file does not exist, cannot update sidebar`);
    }
  } catch (error) {
    console.error(`❌ Failed to update Categories.js:`, error);
  }
}

// Function to update Components.js
function updateComponentsFile(componentType, componentName) {
  try {
    const componentsPath = path.join(__dirname, "../src/constants/Components.js");
    
    if (fs.existsSync(componentsPath)) {
      let componentsContent = fs.readFileSync(componentsPath, 'utf8');
      
      // Convert component name to kebab-case for the key in Components.js
      // For example: "SplitText" => "split-text"
      const componentKebabCase = componentName
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, ''); // Remove leading dash
      
      // Find and remove the component mapping line
      // This handles formats like: 'split-text': () => import("../demo/TextAnimations/SplitTextDemo"),
      const regex = new RegExp(`\\s*['"]${componentKebabCase}['"]\\s*:\\s*\\(\\)\\s*=>\\s*import\\([^)]*\\),?`, 'g');
      const newContent = componentsContent.replace(regex, '');
      
      // Handle potential syntax issues like trailing commas
      const cleanContent = newContent
        .replace(/,(\s*};)/g, '$1') // Remove trailing comma before closing brace
        .replace(/,\s*,/g, ','); // Replace consecutive commas with a single one
      
      fs.writeFileSync(componentsPath, cleanContent);
      console.log(`✅ Removed component "${componentKebabCase}" mapping from Components.js`);
    } else {
      console.log(`⚠️ Components.js file does not exist, cannot update component mappings`);
    }
  } catch (error) {
    console.error(`❌ Failed to update Components.js:`, error);
  }
}

// Process each component name
componentNames.forEach(componentName => {
  console.log(`\n--- Deleting ${componentName} from ${componentType} ---`);
  deleteComponent(componentType, componentName);
});

console.log(`\n✅ Completed deletion of ${componentNames.length} component(s) from "${componentType}" type.`); 