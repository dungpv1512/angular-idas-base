/**
 * Script tạo tất cả ng-zorro components còn thiếu
 * Tự động tạo folder, files (ts, html, less, spec.ts)
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/app/shared/components');

// Danh sách components cần tạo (theo ng-zorro-antd docs)
const componentsToCreate = [
  // General
  { name: 'button', category: 'general', module: 'button', hasFormControl: false },
  { name: 'icon', category: 'general', module: 'icon', hasFormControl: false },
  { name: 'typography', category: 'general', module: 'typography', hasFormControl: false },
  
  // Layout
  { name: 'grid', category: 'layout', module: 'grid', hasFormControl: false },
  { name: 'layout', category: 'layout', module: 'layout', hasFormControl: false },
  { name: 'space', category: 'layout', module: 'space', hasFormControl: false },
  { name: 'divider', category: 'layout', module: 'divider', hasFormControl: false },
  
  // Navigation
  { name: 'affix', category: 'navigation', module: 'affix', hasFormControl: false },
  { name: 'breadcrumb', category: 'navigation', module: 'breadcrumb', hasFormControl: false },
  { name: 'dropdown', category: 'navigation', module: 'dropdown', hasFormControl: false },
  { name: 'menu', category: 'navigation', module: 'menu', hasFormControl: false },
  { name: 'pagination', category: 'navigation', module: 'pagination', hasFormControl: false },
  { name: 'page-header', category: 'navigation', module: 'page-header', hasFormControl: false },
  { name: 'steps', category: 'navigation', module: 'steps', hasFormControl: false },
  { name: 'tabs', category: 'navigation', module: 'tabs', hasFormControl: false },
  
  // Data Entry
  { name: 'cascader', category: 'data-entry', module: 'cascader', hasFormControl: true },
  { name: 'form', category: 'data-entry', module: 'form', hasFormControl: false },
  { name: 'input-number', category: 'data-entry', module: 'input-number', hasFormControl: true },
  { name: 'mentions', category: 'data-entry', module: 'mentions', hasFormControl: true },
  { name: 'rate', category: 'data-entry', module: 'rate', hasFormControl: true },
  { name: 'slider', category: 'data-entry', module: 'slider', hasFormControl: true },
  { name: 'time-picker', category: 'data-entry', module: 'time-picker', hasFormControl: true },
  { name: 'transfer', category: 'data-entry', module: 'transfer', hasFormControl: true },
  
  // Data Display
  { name: 'avatar', category: 'data-display', module: 'avatar', hasFormControl: false },
  { name: 'badge', category: 'data-display', module: 'badge', hasFormControl: false },
  { name: 'calendar', category: 'data-display', module: 'calendar', hasFormControl: false },
  { name: 'card', category: 'data-display', module: 'card', hasFormControl: false },
  { name: 'carousel', category: 'data-display', module: 'carousel', hasFormControl: false },
  { name: 'collapse', category: 'data-display', module: 'collapse', hasFormControl: false },
  { name: 'comment', category: 'data-display', module: 'comment', hasFormControl: false },
  { name: 'descriptions', category: 'data-display', module: 'descriptions', hasFormControl: false },
  { name: 'empty', category: 'data-display', module: 'empty', hasFormControl: false },
  { name: 'image', category: 'data-display', module: 'image', hasFormControl: false },
  { name: 'list', category: 'data-display', module: 'list', hasFormControl: false },
  { name: 'popover', category: 'data-display', module: 'popover', hasFormControl: false },
  { name: 'statistic', category: 'data-display', module: 'statistic', hasFormControl: false },
  { name: 'tag', category: 'data-display', module: 'tag', hasFormControl: false },
  { name: 'timeline', category: 'data-display', module: 'timeline', hasFormControl: false },
  { name: 'tooltip', category: 'data-display', module: 'tooltip', hasFormControl: false },
  
  // Feedback
  { name: 'alert', category: 'feedback', module: 'alert', hasFormControl: false },
  { name: 'drawer', category: 'feedback', module: 'drawer', hasFormControl: false },
  { name: 'modal', category: 'feedback', module: 'modal', hasFormControl: false },
  { name: 'popconfirm', category: 'feedback', module: 'popconfirm', hasFormControl: false },
  { name: 'progress', category: 'feedback', module: 'progress', hasFormControl: false },
  { name: 'result', category: 'feedback', module: 'result', hasFormControl: false },
  { name: 'skeleton', category: 'feedback', module: 'skeleton', hasFormControl: false },
  { name: 'spin', category: 'feedback', module: 'spin', hasFormControl: false },
  
  // Other
  { name: 'anchor', category: 'other', module: 'anchor', hasFormControl: false },
  { name: 'back-top', category: 'other', module: 'back-top', hasFormControl: false },
  { name: 'qr-code', category: 'other', module: 'qr-code', hasFormControl: false },
  { name: 'watermark', category: 'other', module: 'watermark', hasFormControl: false },
];

// Helper: Convert kebab-case to PascalCase
function toPascalCase(str) {
  return str.split('-').map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('');
}

// Helper: Convert kebab-case to camelCase
function toCamelCase(str) {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

// Template cho TypeScript file (với ControlValueAccessor)
function getTsTemplateWithFormControl(name, module) {
  const className = `Idas${toPascalCase(name)}Component`;
  const moduleName = `Nz${toPascalCase(module)}Module`;
  
  return `import { Component, Input, Optional, Self, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ${moduleName} } from 'ng-zorro-antd/${module}';
import { NzFormModule } from 'ng-zorro-antd/form';

/**
 * IDAS ${toPascalCase(name)} Component - Wrapper cho nz-${name} với form control support
 */
@Component({
  selector: 'app-idas-${name}',
  standalone: true,
  imports: [CommonModule, ${moduleName}, NzFormModule, ReactiveFormsModule],
  templateUrl: './idas-${name}.component.html',
  styleUrl: './idas-${name}.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ${className} implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() errorTip = '';

  value: any = null;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get validateStatus(): string {
    if (!this.ngControl || !this.ngControl.control) {
      return '';
    }
    const control = this.ngControl.control;
    if (control.invalid && (control.dirty || control.touched)) {
      return 'error';
    }
    return '';
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  onValueChange(value: any): void {
    this.value = value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
`;
}

// Template cho TypeScript file (không có ControlValueAccessor)
function getTsTemplateWithoutFormControl(name, module) {
  const className = `Idas${toPascalCase(name)}Component`;
  const moduleName = `Nz${toPascalCase(module)}Module`;
  
  return `import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ${moduleName} } from 'ng-zorro-antd/${module}';

/**
 * IDAS ${toPascalCase(name)} Component - Wrapper cho nz-${name}
 */
@Component({
  selector: 'app-idas-${name}',
  standalone: true,
  imports: [CommonModule, ${moduleName}],
  templateUrl: './idas-${name}.component.html',
  styleUrl: './idas-${name}.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ${className} {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
`;
}

// Template cho HTML file (với form control)
function getHtmlTemplateWithFormControl(name) {
  return `<nz-form-item>
  @if (label) {
    <nz-form-label [nzRequired]="required">{{ label }}</nz-form-label>
  }
  <nz-form-control 
    [nzErrorTip]="errorTip"
    [nzValidateStatus]="validateStatus"
  >
    <!-- TODO: Thêm nz-${name} component với bindings phù hợp -->
  </nz-form-control>
</nz-form-item>
`;
}

// Template cho HTML file (không có form control)
function getHtmlTemplateWithoutFormControl(name) {
  return `<!-- TODO: Thêm nz-${name} component với bindings phù hợp -->
`;
}

// Template cho LESS file
function getLessTemplate() {
  return `// TODO: Thêm custom styles nếu cần
`;
}

// Template cho Spec file
function getSpecTemplate(name) {
  const className = `Idas${toPascalCase(name)}Component`;
  
  return `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${className} } from './idas-${name}.component';

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

  // TODO: Thêm tests
});
`;
}

// Hàm tạo component
function createComponent(config) {
  const { name, module, hasFormControl } = config;
  const folderName = `idas-${name}`;
  const folderPath = path.join(componentsDir, folderName);
  
  // Kiểm tra folder đã tồn tại chưa
  if (fs.existsSync(folderPath)) {
    console.log(`⏭️  Bỏ qua: ${folderName} (đã tồn tại)`);
    return false;
  }
  
  // Tạo folder
  fs.mkdirSync(folderPath, { recursive: true });
  
  // Tạo files
  const tsContent = hasFormControl 
    ? getTsTemplateWithFormControl(name, module)
    : getTsTemplateWithoutFormControl(name, module);
  const htmlContent = hasFormControl
    ? getHtmlTemplateWithFormControl(name)
    : getHtmlTemplateWithoutFormControl(name);
  const lessContent = getLessTemplate();
  const specContent = getSpecTemplate(name);
  
  fs.writeFileSync(path.join(folderPath, `idas-${name}.component.ts`), tsContent);
  fs.writeFileSync(path.join(folderPath, `idas-${name}.component.html`), htmlContent);
  fs.writeFileSync(path.join(folderPath, `idas-${name}.component.less`), lessContent);
  fs.writeFileSync(path.join(folderPath, `idas-${name}.component.spec.ts`), specContent);
  
  console.log(`✅ Tạo component: ${folderName}`);
  return true;
}

// Main execution
console.log('🚀 Bắt đầu tạo components...\n');

let created = 0;
let skipped = 0;

componentsToCreate.forEach(config => {
  if (createComponent(config)) {
    created++;
  } else {
    skipped++;
  }
});

console.log(`\n✨ Hoàn thành!`);
console.log(`   - Đã tạo: ${created} components`);
console.log(`   - Đã bỏ qua: ${skipped} components (đã tồn tại)`);
console.log(`\n📝 Lưu ý: Các components đã được tạo với template cơ bản.`);
console.log(`   Cần cập nhật thêm logic và bindings cho từng component.`);
