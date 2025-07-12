import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// 需要搜索和替换的目录类型
const sourceTypes = ['TextAnimations', 'Animations', 'Components', 'Backgrounds'];
const targetType = 'Components';

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

// 更新文件中的导入路径
function updateFilePaths(filePath) {
  console.log(`Checking file: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // 更新相对路径导入
  // 例如: from '../../content/Components/Component' -> from '../../content/Components/Component'
  const relativeImportRegex = new RegExp(
    `from\\s+(['"])\\.\\.+\\/[^'"]*\\/(${sourceTypes.join('|')})\\/([^'"]+)\\1`, 
    'g'
  );
  
  content = content.replace(relativeImportRegex, (match, quote, sourceType) => {
    if (sourceType === targetType) return match; // 已经是目标类型，不需要替换
    return match.replace(`/${sourceType}/`, `/${targetType}/`);
  });
  
  // 更新别名导入
  // 例如: from '@content/Components/Component' -> from '@content/Components/Component'
  const aliasImportRegex = new RegExp(
    `from\\s+(['"])(@[a-z\\-]+)\\/(${sourceTypes.join('|')})\\/([^'"]+)\\1`, 
    'g'
  );
  
  content = content.replace(aliasImportRegex, (match, quote, alias, sourceType) => {
    if (sourceType === targetType) return match; // 已经是目标类型，不需要替换
    return match.replace(`/${sourceType}/`, `/${targetType}/`);
  });
  
  // 更新原始文本导入 (用于?raw导入)
  // 例如: import code from '@content/Components/Component?raw'
  const rawImportRegex = new RegExp(
    `(['"])(@[a-z\\-]+)\\/(${sourceTypes.join('|')})\\/([^'"]+)(\\?raw)\\1`, 
    'g'
  );
  
  content = content.replace(rawImportRegex, (match, quote, alias, sourceType) => {
    if (sourceType === targetType) return match; // 已经是目标类型，不需要替换
    return match.replace(`/${sourceType}/`, `/${targetType}/`);
  });
  
  // 更新动态导入
  // 例如: import("../demo/Components/Component")
  const dynamicImportRegex = new RegExp(
    `import\\((['"])\\.\\.+\\/[^'"]*\\/(${sourceTypes.join('|')})\\/([^'"]+)\\1\\)`, 
    'g'
  );
  
  content = content.replace(dynamicImportRegex, (match, quote, sourceType) => {
    if (sourceType === targetType) return match; // 已经是目标类型，不需要替换
    return match.replace(`/${sourceType}/`, `/${targetType}/`);
  });
  
  // 如果文件已更新，则写入新内容
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated import paths in: ${filePath}`);
    return true;
  }
  
  return false;
}

// 主函数
async function main() {
  console.log('🔍 Scanning files for component import paths...');
  
  const jsFiles = findAllJsFiles(rootDir);
  console.log(`Found ${jsFiles.length} JS/JSX/TS/TSX files to check`);
  
  let updatedCount = 0;
  
  for (const file of jsFiles) {
    const updated = updateFilePaths(file);
    if (updated) updatedCount++;
  }
  
  console.log(`\n✅ Updated import paths in ${updatedCount} files`);
  console.log('✨ All component import paths have been updated!');
}

main().catch(error => {
  console.error('❌ Update failed:', error);
  process.exit(1);
}); 