import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  Optional,
  Self
} from '@angular/core';
import { ControlValueAccessor, NgControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * Option cho Segmented control
 */
export interface SegmentedOption {
  value: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
}

/**
 * IDAS Segmented Component
 * Wrapper cho ng-zorro-antd segmented control
 * Dùng cho view mode toggle, tab-like selection
 */
@Component({
  selector: 'app-idas-segmented',
  standalone: true,
  imports: [CommonModule, FormsModule, NzSegmentedModule, NzIconModule],
  templateUrl: './idas-segmented.component.html',
  styleUrl: './idas-segmented.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasSegmentedComponent implements ControlValueAccessor {
  /** Danh sách options */
  @Input() options: SegmentedOption[] = [];

  /** Kích thước: small, default, large */
  @Input() size: 'small' | 'default' | 'large' = 'default';

  /** Disabled toàn bộ */
  @Input() disabled = false;

  /** Block mode - full width */
  @Input() block = false;

  /** Block mode - full width */
  @Input() shape: 'default' | 'round' = 'default';

  /** Event khi giá trị thay đổi */
  @Output() onValueChange = new EventEmitter<string | number>();

  /** Giá trị hiện tại */
  value: string | number = '';

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // ControlValueAccessor methods
  onChange: (value: string | number) => void = () => { };
  onTouched: () => void = () => { };

  valueChange(value: any): void {
    this.value = value;
    this.onChange(this.value);
    this.onTouched();
    this.onValueChange.emit(this.value);
  }

  writeValue(value: string | number): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Lấy index của option đang được chọn
   */
  get selectedIndex(): number {
    return this.options.findIndex(opt => opt.value === this.value);
  }
}
