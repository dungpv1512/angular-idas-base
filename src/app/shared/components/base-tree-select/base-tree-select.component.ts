import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzFormModule } from 'ng-zorro-antd/form';

export interface TreeSelectNode {
  title: string;
  value: any;
  key: string;
  children?: TreeSelectNode[];
  isLeaf?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'app-base-tree-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NzTreeSelectModule, NzFormModule],
  template: `
    <nz-form-item>
      <nz-form-label [nzRequired]="required">{{ label }}</nz-form-label>
      <nz-form-control [nzErrorTip]="errorTip">
        <nz-tree-select
          [nzNodes]="nodes"
          [nzPlaceHolder]="placeholder"
          [nzDisabled]="disabled"
          [nzShowSearch]="showSearch"
          [nzAllowClear]="allowClear"
          [nzDropdownMatchSelectWidth]="dropdownMatchSelectWidth"
          [nzMultiple]="multiple"
          [nzCheckable]="checkable"
          [nzShowExpand]="showExpand"
          [nzShowLine]="showLine"
          [nzExpandedKeys]="expandedKeys"
          [(ngModel)]="value"
          (ngModelChange)="onChange($event)"
          (nzExpandChange)="onExpandChange($event)"
        >
        </nz-tree-select>
        <small *ngIf="hint" class="hint-text">{{ hint }}</small>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: [`
    .hint-text {
      color: #8c8c8c;
      font-size: 12px;
      margin-top: 4px;
      display: block;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseTreeSelectComponent),
      multi: true
    }
  ]
})
export class BaseTreeSelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = 'Chọn...';
  @Input() required = false;
  @Input() errorTip = 'Vui lòng chọn giá trị';
  @Input() hint = '';
  @Input() nodes: TreeSelectNode[] = [];
  @Input() showSearch = true;
  @Input() allowClear = true;
  @Input() dropdownMatchSelectWidth = true;
  @Input() multiple = false;
  @Input() checkable = false;
  @Input() showExpand = true;
  @Input() showLine = false;
  @Input() expandedKeys: string[] = [];

  value: any = null;
  disabled = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (value: any) => {};
  onTouched = () => {};

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

  onExpandChange(event: any): void {
    // Handle expand change if needed
  }
}
