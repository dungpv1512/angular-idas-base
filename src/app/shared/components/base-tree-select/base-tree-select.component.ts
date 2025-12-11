import { Component, Input, Output, EventEmitter, forwardRef, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule, NgControl } from '@angular/forms';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NzTreeSelectModule, NzFormModule, NzButtonModule, NzIconModule],
  template: `
    <nz-form-item>
      <nz-form-label [nzRequired]="required">{{ label }}</nz-form-label>
      <nz-form-control 
        [nzErrorTip]="errorTip"
        [nzValidateStatus]="validateStatus"
      >
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
          @if (showAddButton) {
            <ng-template #nzNotFoundContent>
              <div class="tree-select-footer">
                <button 
                  nz-button 
                  nzType="link" 
                  nzSize="small"
                  (click)="onAddClick($event)"
                  class="add-button"
                >
                  <span nz-icon nzType="plus"></span>
                  {{ addButtonText }}
                </button>
              </div>
            </ng-template>
          }
        </nz-tree-select>
        @if (showAddButton) {
          <div class="external-add-button">
            <button 
              nz-button 
              nzType="dashed" 
              nzSize="small"
              (click)="onAddClick($event)"
              [disabled]="disabled"
            >
              <span nz-icon nzType="plus"></span>
              {{ addButtonText }}
            </button>
          </div>
        }
        @if (hint) {
          <small class="hint-text">{{ hint }}</small>
        }
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

    .tree-select-footer {
      padding: 8px;
      border-top: 1px solid #f0f0f0;
      text-align: center;
    }

    .add-button {
      width: 100%;
      text-align: left;
    }

    .external-add-button {
      margin-top: 8px;
    }
  `],
})
export class BaseTreeSelectComponent implements ControlValueAccessor {
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
  @Input() showAddButton = false; // Hiển thị nút thêm
  @Input() addButtonText = 'Thêm mới'; // Text cho nút thêm

  @Output() addClick = new EventEmitter<void>(); // Event khi click nút thêm

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

  onExpandChange(_event: any): void {
    // Handle expand change if needed
  }

  onAddClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.addClick.emit();
  }
}
