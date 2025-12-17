import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, ReactiveFormsModule, FormsModule, NgControl } from '@angular/forms';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TreeSelectNode } from '../types';

/**
 * IDAS Tree Select Component
 * Wrapper cho ng-zorro-antd tree select với form control support
 */
@Component({
  selector: 'app-idas-tree-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NzTreeSelectModule, NzFormModule, NzButtonModule, NzIconModule],
  templateUrl: './idas-tree-select.component.html',
  styleUrl: './idas-tree-select.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasTreeSelectComponent implements ControlValueAccessor {
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
  @Input() showAddButton = false;
  @Input() addButtonText = 'Thêm mới';
  
  @Output() addClick = new EventEmitter<void>();

  value: any = null;
  disabled = false;

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
