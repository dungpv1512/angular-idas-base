import { Component, Input, Optional, Self, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzFormModule } from 'ng-zorro-antd/form';

/**
 * IDAS TimePicker Component - Wrapper cho nz-time-picker với form control support
 */
@Component({
  selector: 'app-idas-time-picker',
  standalone: true,
  imports: [CommonModule, NzTimePickerModule, NzFormModule, ReactiveFormsModule],
  templateUrl: './idas-time-picker.component.html',
  styleUrl: './idas-time-picker.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasTimePickerComponent implements ControlValueAccessor {
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
