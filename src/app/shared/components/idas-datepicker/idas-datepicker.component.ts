import { Component, ChangeDetectionStrategy, Input, Optional, Self, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';

/**
 * IDAS DatePicker Component
 * Date, DateTime, Range picker với form control support
 */
@Component({
  selector: 'app-idas-datepicker',
  standalone: true,
  imports: [CommonModule, FormsModule, NzDatePickerModule, NzFormModule],
  templateUrl: './idas-datepicker.component.html',
  styleUrl: './idas-datepicker.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasDatepickerComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() mode: 'date' | 'range' = 'date';
  @Input() placeholder = 'Chọn ngày';
  @Input() startPlaceholder = 'Ngày bắt đầu';
  @Input() endPlaceholder = 'Ngày kết thúc';
  @Input() format = 'dd/MM/yyyy';
  @Input() showTime = false;
  @Input() required = false;
  @Input() disabled = false;
  @Input() errorTip = '';
  @Input() allowClear = true;
  @Input() size: 'large' | 'default' | 'small' = 'default';

  @Output() dateChange = new EventEmitter<Date | Date[] | null>();

  value: Date | Date[] | null = null;

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
