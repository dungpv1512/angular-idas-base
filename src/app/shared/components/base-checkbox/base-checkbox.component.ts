import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';

export interface CheckboxOption {
  label: string;
  value: any;
  disabled?: boolean;
}

/**
 * Base Checkbox Component - Single checkbox hoặc checkbox group
 */
@Component({
  selector: 'app-base-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule, NzCheckboxModule, NzFormModule],
  template: `
    <nz-form-item>
      @if (label && mode === 'group') {
        <nz-form-label [nzRequired]="required">{{ label }}</nz-form-label>
      }
      <nz-form-control [nzErrorTip]="errorTip">
        @if (mode === 'single') {
          <label
            nz-checkbox
            [nzDisabled]="disabled"
            [(ngModel)]="value"
            (ngModelChange)="onValueChange($event)"
          >
            {{ label }}
          </label>
        } @else {
          <nz-checkbox-group
            [(ngModel)]="value"
            (ngModelChange)="onValueChange($event)"
          >
            @for (option of options; track option.value) {
              <label
                nz-checkbox
                [nzValue]="option.value"
                [nzDisabled]="option.disabled || disabled"
              >
                {{ option.label }}
              </label>
            }
          </nz-checkbox-group>
        }
      </nz-form-control>
    </nz-form-item>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseCheckboxComponent),
      multi: true
    }
  ]
})
export class BaseCheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() mode: 'single' | 'group' = 'single';
  @Input() options: CheckboxOption[] = [];
  @Input() required = false;
  @Input() disabled = false;
  @Input() errorTip = '';

  value: any = false;
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
