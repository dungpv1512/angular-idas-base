import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';

export interface RadioOption {
  label: string;
  value: any;
  disabled?: boolean;
}

@Component({
  selector: 'app-base-radio',
  standalone: true,
  imports: [CommonModule, FormsModule, NzRadioModule, NzFormModule],
  template: `
    <nz-form-item>
      @if (label) {
        <nz-form-label [nzRequired]="required">{{ label }}</nz-form-label>
      }
      <nz-form-control 
        [nzErrorTip]="errorTip"
        [nzValidateStatus]="validateStatus"
      >
        <nz-radio-group
          [(ngModel)]="value"
          (ngModelChange)="onValueChange($event)"
          [nzButtonStyle]="buttonStyle"
        >
          @for (option of options; track option.value) {
            @if (buttonStyle === 'solid') {
              <label nz-radio-button [nzValue]="option.value" [nzDisabled]="option.disabled || disabled">
                {{ option.label }}
              </label>
            } @else {
              <label nz-radio [nzValue]="option.value" [nzDisabled]="option.disabled || disabled">
                {{ option.label }}
              </label>
            }
          }
        </nz-radio-group>
      </nz-form-control>
    </nz-form-item>
  `
})
export class BaseRadioComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() options: RadioOption[] = [];
  @Input() buttonStyle: 'outline' | 'solid' = 'outline';
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
