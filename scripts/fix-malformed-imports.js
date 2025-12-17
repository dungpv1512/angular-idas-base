/**
 * Script fix tất cả malformed imports
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/app/shared/components');

const componentsToFix = [
  'idas-checkbox',
  'idas-datepicker',
  'idas-radio',
  'idas-search',
  'idas-select',
  'idas-switch',
  'idas-table',
  'idas-tree'
];

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Fix pattern: import { X } from '} from 'Y';
  // Thành: import { X } from 'Y';
  const pattern1 = /import\s*{\s*([^}]+)\s*}\s*from\s*'\}\s*from\s*'([^']+)';[^;]*';/g;
  if (pattern1.test(content)) {
    content = content.replace(pattern1, "import { $1 } from '$2';");
    changed = true;
  }
  
  // Fix pattern: import { X } from 'ng-zorro-antd/Y';
  // import { Z } from '} from '@app/...'; ';
  const pattern2 = /(import\s*{\s*[^}]+\s*}\s*from\s*'[^']+';)\s*import\s*{\s*([^}]+)\s*}\s*from\s*'\}\s*from\s*'([^']+)';\s*';/g;
  if (pattern2.test(content)) {
    content = content.replace(pattern2, "$1\nimport { $2 } from '$3';");
    changed = true;
  }
  
  // Fix remaining malformed imports
  content = content.replace(/'\}\s*from\s*'/g, "'");
  content = content.replace(/';[^;]*';/g, "';");
  
  // Fix broken comments after imports
  content = content.replace(/(import[^;]+;)\s*\/\*\*';[^*]*\*\*\s*\/\*\*/g, '$1\n\n/**');
  content = content.replace(/(import[^;]+;)\s*';[^']*\/\*\*/g, '$1\n\n/**');
  
  if (changed || content !== fs.readFileSync(filePath, 'utf8')) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

console.log('🔧 Bắt đầu fix malformed imports...\n');

let fixed = 0;

componentsToFix.forEach(componentName => {
  const tsFile = path.join(componentsDir, componentName, `${componentName}.component.ts`);
  
  if (fs.existsSync(tsFile)) {
    if (fixFile(tsFile)) {
      console.log(`✅ ${componentName}`);
      fixed++;
    }
  }
});

console.log(`\n✨ Hoàn thành! Đã fix ${fixed} files`);
