import { Component, ChangeDetectionStrategy, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzFormModule } from 'ng-zorro-antd/form';

/**
 * IDAS Switch Component
 * Toggle switch với form control support
 */
@Component({
  selector: 'app-idas-switch',
  standalone: true,
  imports: [CommonModule, FormsModule, NzSwitchModule, NzFormModule],
  templateUrl: './idas-switch.component.html',
  styleUrl: './idas-switch.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasSwitchComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() checkedText = '';
  @Input() uncheckedText = '';
  @Input() size: 'small' | 'default' = 'default';
  @Input() required = false;
  @Input() disabled = false;
  @Input() errorTip = '';

  value = false;

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
