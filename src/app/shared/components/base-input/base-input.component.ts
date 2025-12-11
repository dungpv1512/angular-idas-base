import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';

/**
 * Base Input Component - Wrapper cho nz-input với form control support
 */
@Component({
  selector: 'app-base-input',
  standalone: true,
  imports: [CommonModule, NzInputModule, NzFormModule, ReactiveFormsModule],
  template: `
    <nz-form-item>
      @if (label) {
        <nz-form-label [nzRequired]="required">{{ label }}</nz-form-label>
      }
      <nz-form-control 
        [nzErrorTip]="errorTip"
        [nzValidateStatus]="validateStatus"
      >
        <input
          nz-input
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          [nzSize]="size"
          (input)="onInput($event)"
          (blur)="onTouched()"
        />
      </nz-form-control>
    </nz-form-item>
  `,
})
export class BaseInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'password' | 'email' | 'number' = 'text';
  @Input() required = false;
  @Input() disabled = false;
  @Input() errorTip = '';
  @Input() size: 'large' | 'default' | 'small' = 'default';

  value = '';

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

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    this.value = value || '';
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
