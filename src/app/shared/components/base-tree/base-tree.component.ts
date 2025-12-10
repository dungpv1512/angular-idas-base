import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzFormModule } from 'ng-zorro-antd/form';

/**
 * Base Tree Component - Tree view với checkbox, search, drag-drop
 */
@Component({
  selector: 'app-base-tree',
  standalone: true,
  imports: [CommonModule, NzTreeModule, NzFormModule],
  template: `
    <nz-form-item>
      @if (label) {
        <nz-form-label [nzRequired]="required">{{ label }}</nz-form-label>
      }
      <nz-form-control [nzErrorTip]="errorTip">
        <nz-tree
          [nzData]="nodes"
          [nzCheckable]="checkable"
          [nzShowExpand]="showExpand"
          [nzShowLine]="showLine"
          [nzExpandAll]="expandAll"
          [nzMultiple]="multiple"
          [nzSearchValue]="searchValue"
          [nzDraggable]="draggable"
          [nzCheckedKeys]="checkedKeys"
          [nzSelectedKeys]="selectedKeys"
          [nzExpandedKeys]="expandedKeys"
          (nzClick)="onNodeClick($event)"
          (nzCheckBoxChange)="onCheckBoxChange($event)"
          (nzExpandChange)="onExpandChange($event)"
          (nzOnDrop)="onDrop($event)"
        ></nz-tree>
      </nz-form-control>
    </nz-form-item>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseTreeComponent),
      multi: true
    }
  ]
})
export class BaseTreeComponent implements ControlValueAccessor {
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
