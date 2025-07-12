import fs from "fs";
import path from "path";

const TEMPLATE_FILE_PATH = "./public/README.md";

const registries = [
  {
    registry: "default",
    description: `This registry contains the JavaScript variant of the default registry.`,
  },
  {
    registry: "tailwind",
    description: "This registry contains the JavaScript variant of the tailwind registry.",
  },
  {
    registry: "ts/tailwind",
    description: "This registry contains the TypeScript variant of the default registry.",
  },
  {
    registry: "ts/default",
    description: "This registry contains the TypeScript variant of the tailwind registry.",
  },
];

const templateFileContent = fs.readFileSync(TEMPLATE_FILE_PATH).toString();

// Create component directories in each registry
const registryPaths = registries.map((r) => {
  const basePath = path.join("./public", r.registry);
  const componentPath = path.join(basePath, "components");
  return { basePath, componentPath };
});

// Create all necessary directories
registryPaths.forEach(({ basePath, componentPath }) => {
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
  }
  
  if (!fs.existsSync(componentPath)) {
    fs.mkdirSync(componentPath, { recursive: true });
  }
});

// Create README files
for (const { registry, description } of registries) {
  const dest = path.join("./public", registry, "README.md");
  const newContent = `${templateFileContent}\n\n${description}\n`;
  
  console.info(`Writing ${dest}`);
  fs.writeFileSync(dest, newContent);
}

console.log("✅ Registry READMEs created successfully.");

