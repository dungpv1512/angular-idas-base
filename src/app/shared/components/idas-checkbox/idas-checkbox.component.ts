import { Component, ChangeDetectionStrategy, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CheckboxOption } from '@app/shared/components/types/checkbox-option.model';

/**
 * IDAS Checkbox Component
 * Single checkbox hoặc checkbox group với form control support
 */
@Component({
  selector: 'app-idas-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule, NzCheckboxModule, NzFormModule],
  templateUrl: './idas-checkbox.component.html',
  styleUrl: './idas-checkbox.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasCheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() options: CheckboxOption[] = [];
  @Input() required = false;
  @Input() disabled = false;
  @Input() errorTip = '';
  @Input() mode: 'single' | 'group' = 'single';

  value: any = false;

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
