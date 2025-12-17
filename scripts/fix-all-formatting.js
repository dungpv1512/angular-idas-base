/**
 * Script fix tất cả formatting issues trong components
 * - Fix duplicate imports
 * - Fix formatting bị hỏng
 * - Restore proper line breaks
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/app/shared/components');

// Danh sách components cần fix
const componentsToFix = [
  'idas-checkbox',
  'idas-datepicker',
  'idas-radio',
  'idas-search',
  'idas-select',
  'idas-switch',
  'idas-table',
  'idas-tags-input',
  'idas-textarea',
  'idas-tree',
  'idas-tree-select',
  'idas-upload'
];

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // 1. Fix duplicate ChangeDetectionStrategy trong import
  const oldImport = content.match(/import\s*{[^}]+ChangeDetectionStrategy[^}]+ChangeDetectionStrategy[^}]*}\s*from\s*'@angular\/core';/);
  if (oldImport) {
    // Extract all unique imports
    const importMatch = oldImport[0].match(/import\s*{([^}]+)}\s*from/);
    if (importMatch) {
      const imports = importMatch[1].split(',')
        .map(i => i.trim())
        .filter(i => i)
        .filter((item, index, self) => self.indexOf(item) === index); // unique
      
      const newImport = `import { ${imports.join(', ')} } from '@angular/core';`;
      content = content.replace(oldImport[0], newImport);
      changed = true;
    }
  }
  
  // 2. Fix formatting - restore line breaks after imports
  content = content.replace(/}\s*from\s*'[^']+';([^\/\n])/g, "} from '$&';\n$1");
  
  // 3. Fix comment formatting
  content = content.replace(/}\s*from\s*'[^']+';(\s*\/\*\*)/g, "} from '$&';\n\n$1");
  
  // 4. Fix @Component decorator formatting
  content = content.replace(/@Component\(\s*{\s*selector:/g, '@Component({\n  selector:');
  content = content.replace(/selector:\s*'([^']+)',\s*standalone:/g, "selector: '$1',\n  standalone:");
  content = content.replace(/standalone:\s*true,\s*imports:/g, 'standalone: true,\n  imports:');
  content = content.replace(/imports:\s*\[([^\]]+)\],\s*templateUrl:/g, 'imports: [$1],\n  templateUrl:');
  content = content.replace(/templateUrl:\s*'([^']+)',\s*styleUrl:/g, "templateUrl: '$1',\n  styleUrl:");
  content = content.replace(/styleUrl:\s*'([^']+)',\s*changeDetection:/g, "styleUrl: '$1',\n  changeDetection:");
  content = content.replace(/changeDetection:\s*ChangeDetectionStrategy\.OnPush\s*}\)/g, 'changeDetection: ChangeDetectionStrategy.OnPush\n})');
  
  // 5. Fix class declaration
  content = content.replace(/}\)\s*export\s*class/g, '})\nexport class');
  content = content.replace(/export\s*class\s*(\w+)\s*implements\s*(\w+)\s*{\s*@Input/g, 'export class $1 implements $2 {\n  @Input');
  
  // 6. Fix @Input declarations
  content = content.replace(/@Input\(\)\s*(\w+)\s*=/g, '@Input() $1 =');
  content = content.replace(/;\s*@Input/g, ';\n  @Input');
  
  // 7. Fix methods
  content = content.replace(/}\s*(constructor|get|onChange|onTouched|writeValue|registerOnChange|registerOnTouched|setDisabledState|onInput|onValueChange)/g, '}\n\n  $1');
  content = content.replace(/;\s*(constructor|get|onChange|onTouched)/g, ';\n\n  $1');
  
  if (changed || content !== fs.readFileSync(filePath, 'utf8')) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

console.log('🔧 Bắt đầu fix formatting...\n');

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
