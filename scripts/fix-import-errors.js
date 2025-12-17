/**
 * Script fix các lỗi import duplicate và syntax errors
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/app/shared/components');

function fixImportErrors(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Fix 1: Duplicate ChangeDetectionStrategy trong import
  // Từ: import { Component, ChangeDetectionStrategy, Input, Optional, Self } , ChangeDetectionStrategy } from '@angular/core';
  // Thành: import { Component, ChangeDetectionStrategy, Input, Optional, Self } from '@angular/core';
  const duplicatePattern = /import\s*{\s*([^}]*?)\s*,\s*ChangeDetectionStrategy\s*}\s*,\s*ChangeDetectionStrategy\s*}\s*from\s*'@angular\/core'/g;
  if (duplicatePattern.test(content)) {
    content = content.replace(duplicatePattern, "import { $1, ChangeDetectionStrategy } from '@angular/core'");
    changed = true;
  }
  
  // Fix 2: Duplicate items trong import statement
  const importPattern = /import\s*{([^}]+)}\s*from\s*'@angular\/core'/g;
  content = content.replace(importPattern, (match, imports) => {
    const items = imports.split(',').map(item => item.trim()).filter(item => item);
    const uniqueItems = [...new Set(items)];
    if (items.length !== uniqueItems.length) {
      changed = true;
      return `import { ${uniqueItems.join(', ')} } from '@angular/core'`;
    }
    return match;
  });
  
  // Fix 3: Xóa dấu phẩy thừa trong imports
  const extraCommaPattern = /import\s*{\s*([^}]*?)\s*}\s*,\s*([A-Z]\w+)\s*}\s*from/g;
  if (extraCommaPattern.test(content)) {
    content = content.replace(extraCommaPattern, 'import { $1, $2 } from');
    changed = true;
  }
  
  // Fix 4: Clean up multiple spaces
  content = content.replace(/\s{2,}/g, ' ');
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
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
      walkDirectory(filePath, callback);
    } else if (stat.isFile() && file.endsWith('.ts')) {
      callback(filePath);
    }
  });
}

console.log('🔧 Bắt đầu fix import errors...\n');

let fixed = 0;
const fixedFiles = [];

walkDirectory(componentsDir, (filePath) => {
  if (fixImportErrors(filePath)) {
    fixed++;
    const relativePath = path.relative(componentsDir, filePath);
    fixedFiles.push(relativePath);
    console.log(`✅ ${relativePath}`);
  }
});

console.log(`\n✨ Hoàn thành! Đã fix ${fixed} files`);

if (fixedFiles.length > 0) {
  console.log('\n📋 Danh sách files đã fix:');
  fixedFiles.forEach(file => {
    console.log(`   - ${file}`);
  });
}
