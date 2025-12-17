import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzFormModule } from 'ng-zorro-antd/form';

/**
 * IDAS Tree Component
 * Tree view với checkbox, expand/collapse, drag-drop support
 */
@Component({
  selector: 'app-idas-tree',
  standalone: true,
  imports: [CommonModule, FormsModule, NzTreeModule, NzFormModule],
  templateUrl: './idas-tree.component.html',
  styleUrl: './idas-tree.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasTreeComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() nodes: NzTreeNodeOptions[] = [];
  @Input() checkable = false;
  @Input() showExpand = true;
  @Input() showLine = false;
  @Input() expandAll = false;
  @Input() multiple = false;
  @Input() draggable = false;
  @Input() searchValue = '';
  @Input() required = false;
  @Input() errorTip = '';
  @Input() checkedKeys: string[] = [];
  @Input() selectedKeys: string[] = [];
  @Input() expandedKeys: string[] = [];

  @Output() nodeClick = new EventEmitter<any>();
  @Output() checkBoxChange = new EventEmitter<any>();
  @Output() expandChange = new EventEmitter<any>();
  @Output() drop = new EventEmitter<any>();

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

  onNodeClick(event: any): void {
    this.nodeClick.emit(event);
    if (!this.checkable) {
      this.value = event.node?.key;
      this.onChange(this.value);
      this.onTouched();
    }
  }

  onCheckBoxChange(event: any): void {
    this.checkBoxChange.emit(event);
    if (this.checkable) {
      this.value = event.keys;
      this.onChange(this.value);
      this.onTouched();
    }
  }

  onExpandChange(event: any): void {
    this.expandChange.emit(event);
  }

  onDrop(event: any): void {
    this.drop.emit(event);
  }

  writeValue(value: any): void {
    this.value = value;
    if (this.checkable && Array.isArray(value)) {
      this.checkedKeys = value;
    } else if (!this.checkable && value) {
      this.selectedKeys = [value];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Tree không có disabled state
  }
}
