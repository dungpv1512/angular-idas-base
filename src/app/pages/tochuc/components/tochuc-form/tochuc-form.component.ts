import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BaseInputComponent } from '@app/shared/components/base-input/base-input.component';
import { BaseSelectComponent, SelectOption } from '@app/shared/components/base-select/base-select.component';
import { BaseTextareaComponent } from '@app/shared/components/base-textarea/base-textarea.component';
import { BaseTreeSelectComponent } from '@app/shared/components/base-tree-select/base-tree-select.component';
import { ToChuc } from '@app/core/services/tochuc.service';

@Component({
  selector: 'app-tochuc-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzSpaceModule,
    NzDividerModule,
    NzGridModule,
    NzFormModule,
    NzIconModule,
    BaseInputComponent,
    BaseSelectComponent,
    BaseTextareaComponent,
    BaseTreeSelectComponent
  ],
  templateUrl: './tochuc-form.component.html',
  styleUrls: ['./tochuc-form.component.less']
})
export class ToChucFormComponent implements OnChanges {
  private fb = inject(FormBuilder);

  @Input() mode: 'create' | 'edit' = 'create';
  @Input() toChuc: ToChuc | null = null;
  @Input() treeData: any[] = [];

  @Output() submit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  loaiOptions: SelectOption[] = [
    { label: 'Trung tâm', value: 1 },
    { label: 'Phòng ban', value: 2 }
  ];

  trangThaiOptions: SelectOption[] = [
    { label: 'Nháp', value: 1 },
    { label: 'Đang hoạt động', value: 2 },
    { label: 'Tạm dừng', value: 3 },
    { label: 'Đã duyệt', value: 4 },
    { label: 'Đã hủy', value: 5 }
  ];

  constructor() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['toChuc'] && this.toChuc && this.mode === 'edit') {
      this.form.patchValue({
        Id: this.toChuc.Id,
        TenToChuc: this.toChuc.TenToChuc,
        MaToChuc: this.toChuc.MaToChuc,
        IdToChucCapTren: this.toChuc.IdToChucCapTren,
        Loai: this.toChuc.Loai,
        TrangThai: this.toChuc.TrangThai,
        NoiDungChucNangNhiemVus: this.toChuc.NoiDungChucNangNhiemVus?.join('\n') || ''
      });
    } else if (changes['mode'] && this.mode === 'create') {
      this.form.reset({ Loai: 1, TrangThai: 2 });
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      Id: [null],
      TenToChuc: ['', [Validators.required, Validators.maxLength(200)]],
      MaToChuc: ['', [Validators.required, Validators.maxLength(50)]],
      IdToChucCapTren: [null],
      Loai: [1, Validators.required],
      TrangThai: [2, Validators.required],
      NoiDungChucNangNhiemVus: ['']
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    const formData = { ...this.form.value };
    
    // Convert NoiDungChucNangNhiemVus từ string sang array
    if (formData.NoiDungChucNangNhiemVus) {
      formData.NoiDungChucNangNhiemVus = formData.NoiDungChucNangNhiemVus
        .split('\n')
        .filter((line: string) => line.trim());
    }

    this.submit.emit(formData);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
