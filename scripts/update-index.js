/**
 * Script cập nhật index.ts để export tất cả components
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/app/shared/components');
const indexPath = path.join(componentsDir, 'index.ts');

// Lấy danh sách tất cả folders (components)
const folders = fs.readdirSync(componentsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('idas-'))
  .map(dirent => dirent.name)
  .sort();

// Helper: Convert kebab-case to PascalCase
function toPascalCase(str) {
  return str.split('-').map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('');
}

// Tạo nội dung index.ts
let content = `/**
 * Export tất cả shared components và types
 */

// Components\n`;

folders.forEach(folder => {
  const componentName = `${toPascalCase(folder)}Component`;
  content += `export * from './${folder}/${folder}.component';\n`;
});

content += `\n// Types - Export từ barrel file\nexport * from './types';\n`;

// Ghi file
fs.writeFileSync(indexPath, content, 'utf8');

console.log('✅ Đã cập nhật index.ts');
console.log(`   - Tổng số components: ${folders.length}`);
console.log(`\n📋 Danh sách components đã export:`);
folders.forEach(folder => {
  console.log(`   - ${folder}`);
});
