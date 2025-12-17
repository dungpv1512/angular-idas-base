/**
 * Script kiểm tra và validate tất cả IDAS components
 * - Kiểm tra file structure
 * - Kiểm tra naming convention
 * - Kiểm tra exports trong index.ts
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/app/shared/components');
const indexPath = path.join(componentsDir, 'index.ts');

console.log('🔍 Bắt đầu validate IDAS components...\n');

// Lấy danh sách folders
const folders = fs.readdirSync(componentsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('idas-'))
  .map(dirent => dirent.name)
  .sort();

console.log(`📦 Tìm thấy ${folders.length} components\n`);

let errors = [];
let warnings = [];
let success = 0;

// Validate từng component
folders.forEach(folder => {
  const folderPath = path.join(componentsDir, folder);
  const componentName = folder;
  
  // Kiểm tra files bắt buộc
  const requiredFiles = [
    `${componentName}.component.ts`,
    `${componentName}.component.html`,
    `${componentName}.component.less`,
    `${componentName}.component.spec.ts`
  ];
  
  let hasError = false;
  
  requiredFiles.forEach(file => {
    const filePath = path.join(folderPath, file);
    if (!fs.existsSync(filePath)) {
      errors.push(`❌ ${folder}: Thiếu file ${file}`);
      hasError = true;
    }
  });
  
  // Kiểm tra nội dung TypeScript file
  const tsFile = path.join(folderPath, `${componentName}.component.ts`);
  if (fs.existsSync(tsFile)) {
    const content = fs.readFileSync(tsFile, 'utf8');
    
    // Kiểm tra selector
    const selectorMatch = content.match(/selector:\s*['"]([^'"]+)['"]/);
    if (selectorMatch) {
      const selector = selectorMatch[1];
      const expectedSelector = `app-${componentName}`;
      if (selector !== expectedSelector) {
        warnings.push(`⚠️  ${folder}: Selector không đúng (${selector} !== ${expectedSelector})`);
      }
    } else {
      errors.push(`❌ ${folder}: Không tìm thấy selector`);
      hasError = true;
    }
    
    // Kiểm tra class name
    const pascalName = componentName.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');
    const expectedClassName = `${pascalName}Component`;
    
    if (!content.includes(`export class ${expectedClassName}`)) {
      errors.push(`❌ ${folder}: Class name không đúng (expected: ${expectedClassName})`);
      hasError = true;
    }
    
    // Kiểm tra standalone
    if (!content.includes('standalone: true')) {
      warnings.push(`⚠️  ${folder}: Component không phải standalone`);
    }
    
    // Kiểm tra ChangeDetectionStrategy.OnPush
    if (!content.includes('ChangeDetectionStrategy.OnPush')) {
      warnings.push(`⚠️  ${folder}: Chưa sử dụng OnPush change detection`);
    }
    
    // Kiểm tra comment/documentation
    if (!content.includes('/**') && !content.includes('//')) {
      warnings.push(`⚠️  ${folder}: Thiếu comments/documentation`);
    }
  }
  
  if (!hasError) {
    success++;
    console.log(`✅ ${folder}`);
  }
});

// Kiểm tra index.ts exports
console.log('\n📋 Kiểm tra exports trong index.ts...\n');

if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  folders.forEach(folder => {
    const exportLine = `export * from './${folder}/${folder}.component';`;
    if (!indexContent.includes(exportLine)) {
      errors.push(`❌ index.ts: Thiếu export cho ${folder}`);
    }
  });
  
  console.log('✅ index.ts exports OK\n');
} else {
  errors.push('❌ Không tìm thấy index.ts');
}

// Tổng kết
console.log('═'.repeat(60));
console.log('📊 KẾT QUẢ VALIDATION\n');
console.log(`✅ Success: ${success}/${folders.length} components`);
console.log(`⚠️  Warnings: ${warnings.length}`);
console.log(`❌ Errors: ${errors.length}`);
console.log('═'.repeat(60));

if (warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:\n');
  warnings.forEach(w => console.log(w));
}

if (errors.length > 0) {
  console.log('\n❌ ERRORS:\n');
  errors.forEach(e => console.log(e));
  process.exit(1);
} else {
  console.log('\n✨ Tất cả components đều hợp lệ!\n');
}
