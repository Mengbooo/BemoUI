import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// 定义需要处理的目录
const directories = [
  { src: 'src/content', types: ['TextAnimations', 'Animations', 'Components', 'Backgrounds'] },
  { src: 'src/demo', types: ['TextAnimations', 'Animations', 'Components', 'Backgrounds'] },
  { src: 'src/tailwind', types: ['TextAnimations', 'Animations', 'Components', 'Backgrounds'] },
  { src: 'src/ts-default', types: ['TextAnimations', 'Animations', 'Components', 'Backgrounds'] },
  { src: 'src/ts-tailwind', types: ['TextAnimations', 'Animations', 'Components', 'Backgrounds'] },
  { src: 'src/constants/code', types: ['TextAnimations', 'Animations', 'Components', 'Backgrounds'] }
];

// 创建Components目录
function createComponentsDirectories() {
  directories.forEach(({ src }) => {
    const componentsDir = path.join(rootDir, src, 'Components');
    if (!fs.existsSync(componentsDir)) {
      fs.mkdirSync(componentsDir, { recursive: true });
      console.log(`✅ Created directory: ${componentsDir}`);
    }
  });
}

// 迁移所有组件
function migrateComponents() {
  directories.forEach(({ src, types }) => {
    types.forEach(type => {
      if (type === 'Components') return; // 跳过已经在Components文件夹中的内容
      
      const typeDir = path.join(rootDir, src, type);
      if (!fs.existsSync(typeDir)) return;
      
      const entries = fs.readdirSync(typeDir);
      entries.forEach(entry => {
        const srcPath = path.join(typeDir, entry);
        const destPath = path.join(rootDir, src, 'Components', entry);
        
        if (fs.lstatSync(srcPath).isDirectory()) {
          // 如果是目录，递归复制整个目录
          if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
          }
          copyDirectory(srcPath, destPath);
        } else {
          // 如果是文件，直接复制
          fs.copyFileSync(srcPath, destPath);
        }
        
        console.log(`✅ Migrated: ${srcPath} -> ${destPath}`);
      });
    });
  });
}

// 递归复制目录
function copyDirectory(src, dest) {
  const entries = fs.readdirSync(src);
  entries.forEach(entry => {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    
    if (fs.lstatSync(srcPath).isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// 更新Components.js文件中的导入路径
function updateComponentsJs() {
  const componentsJsPath = path.join(rootDir, 'src/constants/Components.js');
  if (!fs.existsSync(componentsJsPath)) {
    console.log(`⚠️ Components.js not found at: ${componentsJsPath}`);
    return;
  }
  
  let content = fs.readFileSync(componentsJsPath, 'utf8');
  
  // 更新导入路径，例如: "../demo/TextAnimations/SplitTextDemo" -> "../demo/Components/SplitTextDemo"
  const importRegex = /import\("\.\.\/demo\/(TextAnimations|Animations|Components|Backgrounds)\/([^"]+)"\)/g;
  content = content.replace(importRegex, 'import("../demo/Components/$2")');
  
  fs.writeFileSync(componentsJsPath, content);
  console.log(`✅ Updated import paths in Components.js`);
}

// 更新项目中所有JS/JSX/TS/TSX文件的导入路径
function updateImportPaths() {
  const filesToScan = findAllJsFiles(rootDir);
  let updatedCount = 0;
  
  filesToScan.forEach(filePath => {
    if (path.basename(filePath) === 'migrateToSingleFolder.js') return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // 更新导入路径
    const importRegex = /from\s+['"]\.\.+\/[^'"]*\/(TextAnimations|Animations|Components|Backgrounds)\/([^'"]+)['"]/g;
    content = content.replace(importRegex, (match, type) => {
      return match.replace(`/${type}/`, `/Components/`);
    });
    
    // 更新原始导入路径 (@content/TextAnimations/... -> @content/Components/...)
    const aliasImportRegex = /(@[a-z]+)\/(TextAnimations|Animations|Components|Backgrounds)\//g;
    content = content.replace(aliasImportRegex, '$1/Components/');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      updatedCount++;
      console.log(`✅ Updated imports in: ${filePath}`);
    }
  });
  
  console.log(`✅ Updated import paths in ${updatedCount} files`);
}

// 递归查找所有JS/JSX/TS/TSX文件
function findAllJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      // 跳过node_modules和.git目录
      if (file !== 'node_modules' && file !== '.git') {
        findAllJsFiles(filePath, fileList);
      }
    } else {
      // 只处理JS/JSX/TS/TSX文件
      const ext = path.extname(file).toLowerCase();
      if (['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

// 主函数
async function main() {
  console.log('🚀 Starting migration of components to single folder structure...');
  
  // 1. 创建Components目录
  createComponentsDirectories();
  
  // 2. 迁移所有组件
  migrateComponents();
  
  // 3. 更新Components.js文件中的导入路径
  updateComponentsJs();
  
  // 4. 更新项目中所有JS文件的导入路径
  updateImportPaths();
  
  console.log('✅ Migration completed successfully!');
  console.log('⚠️ Note: Original component folders have not been deleted. You can remove them manually after verifying everything works correctly.');
}

main().catch(error => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
}); 