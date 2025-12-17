import { Component, Input, Optional, Self, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzFormModule } from 'ng-zorro-antd/form';

/**
 * IDAS Cascader Component - Wrapper cho nz-cascader với form control support
 */
@Component({
  selector: 'app-idas-cascader',
  standalone: true,
  imports: [CommonModule, NzCascaderModule, NzFormModule, ReactiveFormsModule],
  templateUrl: './idas-cascader.component.html',
  styleUrl: './idas-cascader.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasCascaderComponent implements ControlValueAccessor {
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
