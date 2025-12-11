import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';

/**
 * Base Textarea Component
 */
@Component({
  selector: 'app-base-textarea',
  standalone: true,
  imports: [CommonModule, NzInputModule, NzFormModule],
  template: `
    <nz-form-item>
      @if (label) {
        <nz-form-label [nzRequired]="required">{{ label }}</nz-form-label>
      }
      <nz-form-control 
        [nzErrorTip]="errorTip"
        [nzValidateStatus]="validateStatus"
      >
        <textarea
          nz-input
          [placeholder]="placeholder"
          [disabled]="disabled"
          [rows]="rows"
          [value]="value"
          [attr.maxlength]="maxLength"
          [nzAutosize]="autosize"
          (input)="onInput($event)"
          (blur)="onTouched()"
        ></textarea>
        @if (showCount && maxLength) {
          <div class="char-count">{{ value.length }} / {{ maxLength }}</div>
        }
      </nz-form-control>
    </nz-form-item>
  `,
  styles: [
    `
      .char-count {
        text-align: right;
        color: rgba(0, 0, 0, 0.45);
        font-size: 12px;
        margin-top: 4px;
      }
    `
  ]
})
export class BaseTextareaComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() rows = 4;
  @Input() maxLength?: number;
  @Input() showCount = false;
  @Input() autosize: boolean | { minRows: number; maxRows: number } = false;
  @Input() required = false;
  @Input() disabled = false;
  @Input() errorTip = '';

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
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;
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
