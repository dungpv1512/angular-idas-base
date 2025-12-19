import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { SelectOption } from '@app/shared/components/types/select-option.model';

/**
 * IDAS Select Component
 * Single & Multiple select với form control support
 */
@Component({
  selector: 'app-idas-select',
  standalone: true,
  imports: [CommonModule, FormsModule, NzSelectModule, NzFormModule],
  templateUrl: './idas-select.component.html',
  styleUrl: './idas-select.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasSelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = 'Chọn...';
  @Input() options: SelectOption[] = [];
  @Input() mode: 'default' | 'multiple' | 'tags' = 'default';
  @Input() required = false;
  @Input() disabled = false;
  @Input() errorTip = '';
  @Input() showSearch = true;
  @Input() allowClear = true;
  @Input() maxMultipleCount = Infinity;
  @Input() size: 'large' | 'default' | 'small' = 'default';

  @Output() onSearch = new EventEmitter<string>();
  @Output() onValueChange = new EventEmitter<any>();

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

  valueChange(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
    this.onValueChange.emit(value);
  }

  handleSearch(searchText: string): void {
    this.onSearch.emit(searchText);
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
