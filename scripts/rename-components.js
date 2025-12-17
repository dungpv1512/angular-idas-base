/**
 * Script đổi tên components từ base-* sang idas-*
 * Bao gồm: folder names, file names, selectors, class names, imports
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/app/shared/components');

// Danh sách components cần đổi tên
const componentsToRename = [
  'base-checkbox',
  'base-datepicker',
  'base-input',
  'base-radio',
  'base-search',
  'base-select',
  'base-switch',
  'base-table',
  'base-tags-input',
  'base-textarea',
  'base-tree',
  'base-tree-select',
  'base-upload'
];

// Mapping từ tên cũ sang tên mới
const nameMapping = componentsToRename.reduce((acc, oldName) => {
  const newName = oldName.replace('base-', 'idas-');
  acc[oldName] = newName;
  return acc;
}, {});

console.log('🚀 Bắt đầu đổi tên components...\n');

// Hàm đổi tên folder
function renameFolder(oldName, newName) {
  const oldPath = path.join(componentsDir, oldName);
  const newPath = path.join(componentsDir, newName);
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`✅ Đổi tên folder: ${oldName} → ${newName}`);
    return true;
  }
  return false;
}

// Hàm đổi tên files trong folder
function renameFilesInFolder(folderName) {
  const folderPath = path.join(componentsDir, folderName);
  const files = fs.readdirSync(folderPath);
  
  files.forEach(file => {
    if (file.includes('base-')) {
      const newFileName = file.replace('base-', 'idas-');
      const oldFilePath = path.join(folderPath, file);
      const newFilePath = path.join(folderPath, newFileName);
      
      fs.renameSync(oldFilePath, newFilePath);
      console.log(`  ✅ Đổi tên file: ${file} → ${newFileName}`);
    }
  });
}

// Hàm thay thế nội dung trong file
function replaceContentInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Thay thế selector
  content = content.replace(/selector:\s*['"]app-base-/g, (match) => {
    changed = true;
    return match.replace('app-base-', 'app-idas-');
  });
  
  // Thay thế class name
  content = content.replace(/export class Base(\w+)Component/g, (match, p1) => {
    changed = true;
    return `export class Idas${p1}Component`;
  });
  
  // Thay thế import paths
  Object.keys(nameMapping).forEach(oldName => {
    const newName = nameMapping[oldName];
    const oldPath = `/${oldName}/`;
    const newPath = `/${newName}/`;
    
    if (content.includes(oldPath)) {
      content = content.replace(new RegExp(oldPath, 'g'), newPath);
      changed = true;
    }
    
    // Thay thế class names trong imports
    const oldClassName = oldName.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');
    const newClassName = newName.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');
    
    if (content.includes(oldClassName)) {
      content = content.replace(new RegExp(`\\b${oldClassName}`, 'g'), newClassName);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

// Hàm xử lý tất cả files trong folder
function updateFilesInFolder(folderName) {
  const folderPath = path.join(componentsDir, folderName);
  const files = fs.readdirSync(folderPath);
  
  files.forEach(file => {
    if (file.endsWith('.ts') || file.endsWith('.html') || file.endsWith('.md')) {
      const filePath = path.join(folderPath, file);
      if (replaceContentInFile(filePath)) {
        console.log(`  ✅ Cập nhật nội dung: ${file}`);
      }
    }
  });
}

// Bước 1: Đổi tên folders
console.log('📁 Bước 1: Đổi tên folders\n');
Object.keys(nameMapping).forEach(oldName => {
  const newName = nameMapping[oldName];
  renameFolder(oldName, newName);
});

console.log('\n📄 Bước 2: Đổi tên files\n');
Object.values(nameMapping).forEach(folderName => {
  renameFilesInFolder(folderName);
});

console.log('\n✏️  Bước 3: Cập nhật nội dung files\n');
Object.values(nameMapping).forEach(folderName => {
  updateFilesInFolder(folderName);
});

// Bước 4: Cập nhật index.ts
console.log('\n📦 Bước 4: Cập nhật index.ts\n');
const indexPath = path.join(componentsDir, 'index.ts');
if (replaceContentInFile(indexPath)) {
  console.log('✅ Cập nhật index.ts');
}

// Bước 5: Cập nhật README.md
const readmePath = path.join(componentsDir, 'README.md');
if (fs.existsSync(readmePath)) {
  if (replaceContentInFile(readmePath)) {
    console.log('✅ Cập nhật README.md');
  }
}

console.log('\n✨ Hoàn thành! Tất cả components đã được đổi tên từ base-* sang idas-*\n');
console.log('📋 Tóm tắt:');
console.log(`   - Đã đổi tên ${Object.keys(nameMapping).length} components`);
console.log(`   - Selector mới: app-idas-*`);
console.log(`   - Class names mới: Idas*Component`);
