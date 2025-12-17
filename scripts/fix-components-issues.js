/**
 * Script fix các vấn đề trong components:
 * - Tạo spec files thiếu
 * - Thêm OnPush change detection
 * - Thêm comments/documentation
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/app/shared/components');

// Danh sách components cần fix
const componentsToFix = [
  'idas-checkbox',
  'idas-datepicker',
  'idas-input',
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

// Helper: Convert kebab-case to PascalCase
function toPascalCase(str) {
  return str.split('-').map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('');
}

// Template cho spec file
function getSpecTemplate(name) {
  const className = `${toPascalCase(name)}Component`;
  
  return `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${className} } from './${name}.component';

describe('${className}', () => {
  let component: ${className};
  let fixture: ComponentFixture<${className}>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [${className}]
    }).compileComponents();

    fixture = TestBed.createComponent(${className});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests chi tiết
});
`;
}

console.log('🔧 Bắt đầu fix components issues...\n');

let fixed = 0;

componentsToFix.forEach(componentName => {
  const folderPath = path.join(componentsDir, componentName);
  const tsFile = path.join(folderPath, `${componentName}.component.ts`);
  const specFile = path.join(folderPath, `${componentName}.component.spec.ts`);
  
  // 1. Tạo spec file nếu thiếu
  if (!fs.existsSync(specFile)) {
    fs.writeFileSync(specFile, getSpecTemplate(componentName));
    console.log(`✅ Tạo spec file: ${componentName}.component.spec.ts`);
    fixed++;
  }
  
  // 2. Fix TypeScript file
  if (fs.existsSync(tsFile)) {
    let content = fs.readFileSync(tsFile, 'utf8');
    let changed = false;
    
    // Thêm OnPush change detection nếu chưa có
    if (!content.includes('ChangeDetectionStrategy.OnPush')) {
      // Import ChangeDetectionStrategy nếu chưa có
      if (!content.includes('ChangeDetectionStrategy')) {
        content = content.replace(
          /from '@angular\/core';/,
          `, ChangeDetectionStrategy } from '@angular/core';`
        );
        content = content.replace(
          /import { Component/,
          'import { Component, ChangeDetectionStrategy'
        );
      }
      
      // Thêm changeDetection vào decorator
      if (content.includes('styleUrl:')) {
        content = content.replace(
          /styleUrl: '\.\/[^']+\.component\.less'/,
          (match) => `${match},\n  changeDetection: ChangeDetectionStrategy.OnPush`
        );
        changed = true;
        console.log(`✅ Thêm OnPush: ${componentName}`);
      }
    }
    
    // Thêm JSDoc comment nếu chưa có
    if (!content.includes('/**') && !content.includes('* IDAS')) {
      const className = `${toPascalCase(componentName)}Component`;
      const displayName = componentName.split('-').slice(1).join(' ');
      const comment = `/**
 * IDAS ${toPascalCase(displayName)} Component
 * Wrapper cho ng-zorro-antd ${displayName} với form control support
 */
`;
      content = content.replace(
        /@Component\(/,
        `${comment}@Component(`
      );
      changed = true;
      console.log(`✅ Thêm JSDoc: ${componentName}`);
    }
    
    if (changed) {
      fs.writeFileSync(tsFile, content, 'utf8');
      fixed++;
    }
  }
});

console.log(`\n✨ Hoàn thành! Đã fix ${fixed} issues`);
console.log('\n🔍 Chạy lại validation để kiểm tra...\n');
