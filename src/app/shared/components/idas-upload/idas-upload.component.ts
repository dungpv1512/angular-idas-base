import { Component, ChangeDetectionStrategy, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzUploadModule, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * IDAS Upload Component
 * Wrapper cho ng-zorro-antd upload với form control support
 */
@Component({
  selector: 'app-idas-upload',
  standalone: true,
  imports: [CommonModule, NzUploadModule, NzFormModule, NzButtonModule, NzIconModule],
  templateUrl: './idas-upload.component.html',
  styleUrl: './idas-upload.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasUploadComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() uploadUrl = '/api/upload';
  @Input() uploadText = 'Tải lên';
  @Input() listType: 'text' | 'picture' | 'picture-card' = 'text';
  @Input() multiple = false;
  @Input() limit = 0;
  @Input() accept = '';
  @Input() hint = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() errorTip = '';
  @Input() showUploadList = true;

  fileList: NzUploadFile[] = [];

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

  handleChange(info: any): void {
    this.fileList = info.fileList;
    this.onChange(this.fileList);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.fileList = value || [];
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