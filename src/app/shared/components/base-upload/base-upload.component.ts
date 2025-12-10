import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzUploadModule, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-base-upload',
  standalone: true,
  imports: [CommonModule, NzUploadModule, NzFormModule, NzButtonModule, NzIconModule],
  template: `
    <nz-form-item>
      @if (label) {
        <nz-form-label [nzRequired]="required">{{ label }}</nz-form-label>
      }
      <nz-form-control [nzErrorTip]="errorTip">
        <nz-upload
          [nzAction]="uploadUrl"
          [nzListType]="listType"
          [nzMultiple]="multiple"
          [nzLimit]="limit"
          [nzAccept]="accept"
          [nzFileList]="fileList"
          [nzDisabled]="disabled"
          [nzShowUploadList]="showUploadList"
          (nzChange)="handleChange($event)"
        >
          @if (listType === 'picture-card') {
            <div>
              <span nz-icon nzType="plus"></span>
              <div style="margin-top: 8px">{{ uploadText }}</div>
            </div>
          } @else {
            <button nz-button type="button" [disabled]="disabled">
              <span nz-icon nzType="upload"></span>
              {{ uploadText }}
            </button>
          }
        </nz-upload>
        @if (hint) {
          <div class="upload-hint">{{ hint }}</div>
        }
      </nz-form-control>
    </nz-form-item>
  `,
  styles: [`
    .upload-hint {
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
      margin-top: 4px;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseUploadComponent),
      multi: true
    }
  ]
})
export class BaseUploadComponent implements ControlValueAccessor {
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
