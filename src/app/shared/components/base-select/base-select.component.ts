import { Component, Input, forwardRef, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
}

/**
 * Base Select Component - Single & Multiple select
 */
@Component({
  selector: 'app-base-select',
  standalone: true,
  imports: [CommonModule, FormsModule, NzSelectModule, NzFormModule],
  template: `
    <nz-form-item>
      @if (label) {
        <nz-form-label [nzRequired]="required">{{ label }}</nz-form-label>
      }
      <nz-form-control 
        [nzErrorTip]="errorTip"
        [nzValidateStatus]="validateStatus"
      >
        <nz-select
          [nzMode]="mode"
          [nzPlaceHolder]="placeholder"
          [nzDisabled]="disabled"
          [nzSize]="size"
          [nzShowSearch]="showSearch"
          [nzAllowClear]="allowClear"
          [nzMaxMultipleCount]="maxMultipleCount"
          [(ngModel)]="value"
          (ngModelChange)="onValueChange($event)"
          (nzOnSearch)="onSearch.emit($event)"
        >
          @for (option of options; track option.value) {
            <nz-option
              [nzLabel]="option.label"
              [nzValue]="option.value"
              [nzDisabled]="option.disabled || false"
            ></nz-option>
          }
        </nz-select>
      </nz-form-control>
    </nz-form-item>
  `,
})
export class BaseSelectComponent implements ControlValueAccessor {
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
  @Input() options: SelectOption[] = [];
  @Input() mode: 'default' | 'multiple' | 'tags' = 'default';
  @Input() required = false;
  @Input() disabled = false;
  @Input() errorTip = '';
  @Input() size: 'large' | 'default' | 'small' = 'default';
  @Input() showSearch = true;
  @Input() allowClear = true;
  @Input() maxMultipleCount = Infinity;
  @Input() onSearch: any = { emit: () => {} };

  value: any = null;
  onChange: any = () => {};
  onTouched: any = () => {};

  onValueChange(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
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
