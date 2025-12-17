/**
 * Script tìm và thay thế tất cả app-base-* thành app-idas-* trong toàn bộ codebase
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Tìm kiếm tất cả file chứa app-base-...\n');

// Tìm tất cả files chứa app-base-
const srcDir = path.join(__dirname, '../src');

function findAndReplaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;
  let newContent = content;
  
  // 1. Thay thế app-base- thành app-idas- trong templates
  if (newContent.includes('app-base-')) {
    newContent = newContent.replace(/app-base-/g, 'app-idas-');
    hasChanges = true;
  }
  
  // 2. Thay thế Base{Name}Component thành Idas{Name}Component
  if (newContent.match(/Base([A-Z]\w+)Component/)) {
    newContent = newContent.replace(/Base([A-Z]\w+)Component/g, 'Idas$1Component');
    hasChanges = true;
  }
  
  // 3. Thay thế import paths từ base-* sang idas-*
  if (newContent.match(/['"]@app\/shared\/components\/base-/)) {
    newContent = newContent.replace(/(['"])@app\/shared\/components\/base-/g, '$1@app/shared/components/idas-');
    hasChanges = true;
  }
  
  // 4. Thay thế relative imports
  if (newContent.match(/['"]\.\/(\.\.\/)*base-/)) {
    newContent = newContent.replace(/(['"]\.\/(\.\.\/)*)base-/g, '$1idas-');
    hasChanges = true;
  }
  
  if (hasChanges) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  }
  
  return false;
}

function walkDirectory(dir, callback) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules, dist, .angular
      if (!['node_modules', 'dist', '.angular'].includes(file)) {
        walkDirectory(filePath, callback);
      }
    } else if (stat.isFile()) {
      // Chỉ xử lý .ts và .html files
      if (file.endsWith('.ts') || file.endsWith('.html')) {
        callback(filePath);
      }
    }
  });
}

let filesUpdated = 0;
const updatedFiles = [];

walkDirectory(srcDir, (filePath) => {
  if (findAndReplaceInFile(filePath)) {
    filesUpdated++;
    const relativePath = path.relative(srcDir, filePath);
    updatedFiles.push(relativePath);
    console.log(`✅ ${relativePath}`);
  }
});

console.log(`\n✨ Hoàn thành!`);
console.log(`   - Đã cập nhật ${filesUpdated} files`);

if (updatedFiles.length > 0) {
  console.log('\n📋 Danh sách files đã cập nhật:');
  updatedFiles.forEach(file => {
    console.log(`   - ${file}`);
  });
}
