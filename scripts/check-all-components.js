/**
 * Script kiểm tra tất cả components có lỗi import hay không
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/app/shared/components');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];
  
  // Check 1: Duplicate imports
  const importMatches = content.match(/import\s*{[^}]+}\s*from\s*'[^']+';/g);
  if (importMatches) {
    importMatches.forEach(imp => {
      const items = imp.match(/{\s*([^}]+)\s*}/);
      if (items) {
        const imports = items[1].split(',').map(i => i.trim()).filter(i => i);
        const unique = [...new Set(imports)];
        if (imports.length !== unique.length) {
          errors.push(`Duplicate imports: ${imp}`);
        }
      }
    });
  }
  
  // Check 2: Malformed imports
  if (content.includes("'} from '") || content.includes('} from \'} from')) {
    errors.push('Malformed import statement detected');
  }
  
  // Check 3: Missing closing braces in imports
  const brokenImports = content.match(/import[^;]*from\s*'[^']*'\s*[^;]*';[^;]*';/);
  if (brokenImports) {
    errors.push('Broken import with extra semicolon');
  }
  
  // Check 4: Unterminated strings
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const singleQuotes = (line.match(/'/g) || []).length;
    const doubleQuotes = (line.match(/"/g) || []).length;
    if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0) {
      if (!line.includes('//') && !line.includes('/*')) {
        errors.push(`Line ${idx + 1}: Possible unterminated string`);
      }
    }
  });
  
  return errors;
}

function walkDirectory(dir) {
  const folders = fs.readdirSync(dir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('idas-'))
    .map(dirent => dirent.name)
    .sort();
  
  return folders;
}

console.log('🔍 Kiểm tra tất cả IDAS components...\n');

const folders = walkDirectory(componentsDir);
let totalErrors = 0;
const componentsWithErrors = [];

folders.forEach(folder => {
  const tsFile = path.join(componentsDir, folder, `${folder}.component.ts`);
  
  if (fs.existsSync(tsFile)) {
    const errors = checkFile(tsFile);
    
    if (errors.length > 0) {
      console.log(`❌ ${folder}:`);
      errors.forEach(err => console.log(`   - ${err}`));
      totalErrors += errors.length;
      componentsWithErrors.push(folder);
    } else {
      console.log(`✅ ${folder}`);
    }
  }
});

console.log('\n' + '═'.repeat(60));
console.log('📊 KẾT QUẢ\n');
console.log(`✅ Components OK: ${folders.length - componentsWithErrors.length}/${folders.length}`);
console.log(`❌ Components có lỗi: ${componentsWithErrors.length}`);
console.log(`⚠️  Tổng số lỗi: ${totalErrors}`);
console.log('═'.repeat(60));

if (componentsWithErrors.length > 0) {
  console.log('\n❌ Components cần fix:');
  componentsWithErrors.forEach(comp => console.log(`   - ${comp}`));
  process.exit(1);
} else {
  console.log('\n✨ Tất cả components đều OK!');
}
