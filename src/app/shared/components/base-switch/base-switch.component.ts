import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-base-switch',
  standalone: true,
  imports: [CommonModule, FormsModule, NzSwitchModule, NzFormModule],
  template: `
    <nz-form-item>
      @if (label) {
        <nz-form-label [nzRequired]="required">{{ label }}</nz-form-label>
      }
      <nz-form-control [nzErrorTip]="errorTip">
        <nz-switch
          [(ngModel)]="value"
          (ngModelChange)="onValueChange($event)"
          [nzDisabled]="disabled"
          [nzSize]="size"
          [nzCheckedChildren]="checkedText"
          [nzUnCheckedChildren]="uncheckedText"
        ></nz-switch>
      </nz-form-control>
    </nz-form-item>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseSwitchComponent),
      multi: true
    }
  ]
})
export class BaseSwitchComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() checkedText = '';
  @Input() uncheckedText = '';
  @Input() size: 'small' | 'default' = 'default';
  @Input() required = false;
  @Input() disabled = false;
  @Input() errorTip = '';

  value = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  onValueChange(value: boolean): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = !!value;
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
