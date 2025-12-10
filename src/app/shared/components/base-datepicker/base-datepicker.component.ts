import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';

/**
 * Base DatePicker Component - Date, DateTime, Range picker
 */
@Component({
  selector: 'app-base-datepicker',
  standalone: true,
  imports: [CommonModule, FormsModule, NzDatePickerModule, NzFormModule],
  template: `
    <nz-form-item>
      @if (label) {
        <nz-form-label [nzRequired]="required">{{ label }}</nz-form-label>
      }
      <nz-form-control [nzErrorTip]="errorTip">
        @if (mode === 'range') {
          <nz-range-picker
            [nzPlaceHolder]="[startPlaceholder, endPlaceholder]"
            [nzDisabled]="disabled"
            [nzSize]="size"
            [nzFormat]="format"
            [nzShowTime]="showTime"
            [nzAllowClear]="allowClear"
            [(ngModel)]="value"
            (ngModelChange)="onValueChange($event)"
          ></nz-range-picker>
        } @else {
          <nz-date-picker
            [nzPlaceHolder]="placeholder"
            [nzDisabled]="disabled"
            [nzSize]="size"
            [nzFormat]="format"
            [nzShowTime]="showTime"
            [nzAllowClear]="allowClear"
            [(ngModel)]="value"
            (ngModelChange)="onValueChange($event)"
          ></nz-date-picker>
        }
      </nz-form-control>
    </nz-form-item>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseDatepickerComponent),
      multi: true
    }
  ]
})
export class BaseDatepickerComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = 'Chọn ngày';
  @Input() startPlaceholder = 'Ngày bắt đầu';
  @Input() endPlaceholder = 'Ngày kết thúc';
  @Input() mode: 'date' | 'range' = 'date';
  @Input() format = 'dd/MM/yyyy';
  @Input() showTime = false;
  @Input() required = false;
  @Input() disabled = false;
  @Input() errorTip = '';
  @Input() size: 'large' | 'default' | 'small' = 'default';
  @Input() allowClear = true;
  @Output() dateChange = new EventEmitter<Date | Date[] | null>();

  value: Date | Date[] | null = null;
  onChange: any = () => {};
  onTouched: any = () => {};

  onValueChange(value: Date | Date[] | null): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
    this.dateChange.emit(value);
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
