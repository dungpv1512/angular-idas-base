import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  BaseInputComponent,
  BaseTextareaComponent,
  BaseSelectComponent,
  BaseRadioComponent,
  BaseCheckboxComponent,
  BaseSwitchComponent,
  BaseDatepickerComponent,
  BaseTableComponent,
  BaseTreeComponent,
  BaseUploadComponent,
  SelectOption,
  RadioOption,
  CheckboxOption
} from './index';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzFormModule } from 'ng-zorro-antd/form';
import { TableAction, TableColumn } from '../types/table.types';

/**
 * Demo Component - Showcase tất cả shared components
 * Sử dụng component này để test và xem cách sử dụng
 */
@Component({
  selector: 'app-shared-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzButtonModule,
    NzTagModule,
    BaseInputComponent,
    BaseTextareaComponent,
    BaseSelectComponent,
    BaseRadioComponent,
    BaseCheckboxComponent,
    BaseSwitchComponent,
    BaseDatepickerComponent,
    BaseTableComponent,
    BaseTreeComponent,
    BaseUploadComponent
  ],
  template: `
    <div class="demo-container">
      <h1>Shared Components Demo</h1>

      <!-- Form Demo -->
      <section class="demo-section">
        <div class="section-header">
          <h2>Form Components</h2>
          <div class="layout-switcher">
            <button 
              nz-button 
              [nzType]="formLayout === 'vertical' ? 'primary' : 'default'"
              (click)="formLayout = 'vertical'"
            >
              Vertical
            </button>
            <button 
              nz-button 
              [nzType]="formLayout === 'horizontal' ? 'primary' : 'default'"
              (click)="formLayout = 'horizontal'"
            >
              Horizontal
            </button>
            <button 
              nz-button 
              [nzType]="formLayout === 'inline' ? 'primary' : 'default'"
              (click)="formLayout = 'inline'"
            >
              Inline
            </button>
          </div>
        </div>
        <form nz-form [nzLayout]="formLayout" [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="form-row">
            <app-base-input
              formControlName="username"
              label="Tên đăng nhập"
              placeholder="Nhập tên đăng nhập"
              [required]="true"
              errorTip="Vui lòng nhập tên đăng nhập"
            />

            <app-base-input
              formControlName="email"
              label="Email"
              type="email"
              placeholder="example@email.com"
              [required]="true"
              errorTip="Email không hợp lệ"
            />
          </div>

          <app-base-select
            formControlName="department"
            label="Phòng ban"
            [options]="departmentOptions"
            [required]="true"
          />

          <app-base-select
            formControlName="skills"
            label="Kỹ năng (Multiple)"
            mode="multiple"
            [options]="skillOptions"
            [maxMultipleCount]="5"
          />

          <app-base-radio
            formControlName="gender"
            label="Giới tính"
            [options]="genderOptions"
          />

          <app-base-radio
            formControlName="status"
            label="Trạng thái (Button Style)"
            [options]="statusOptions"
            buttonStyle="solid"
          />

          <app-base-checkbox
            formControlName="agree"
            label="Tôi đồng ý với điều khoản sử dụng"
            mode="single"
          />

          <app-base-checkbox
            formControlName="interests"
            label="Sở thích"
            mode="group"
            [options]="interestOptions"
          />

          <app-base-switch
            formControlName="notifications"
            label="Nhận thông báo"
            checkedText="Bật"
            uncheckedText="Tắt"
          />

          <app-base-datepicker
            formControlName="birthDate"
            label="Ngày sinh"
          />

          <app-base-datepicker
            formControlName="dateRange"
            label="Khoảng thời gian"
            mode="range"
          />

          <app-base-textarea
            formControlName="bio"
            label="Giới thiệu bản thân"
            [rows]="4"
            [maxLength]="500"
            [showCount]="true"
            [autosize]="{ minRows: 3, maxRows: 6 }"
          />

          <app-base-upload
            formControlName="avatar"
            label="Ảnh đại diện"
            listType="picture-card"
            [limit]="1"
            hint="Chỉ chấp nhận file ảnh, tối đa 2MB"
          />

          <div class="form-actions">
            <button nz-button nzType="primary" [disabled]="form.invalid">
              Lưu
            </button>
            <button nz-button type="button" (click)="onReset()">
              Reset
            </button>
            <button nz-button nzType="link" type="button" (click)="fillSampleData()">
              Fill Sample Data
            </button>
          </div>
        </form>

        <div class="form-value">
          <h3>Form Value:</h3>
          <pre>{{ form.value | json }}</pre>
        </div>
      </section>

      <!-- Table Demo -->
      <section class="demo-section">
        <h2>Table Component</h2>
        <app-base-table
          [data]="tableData"
          [columns]="tableColumns"
          [actions]="tableActions"
          [loading]="tableLoading"
          [total]="tableTotal"
          [bordered]="true"
          (pageChange)="onTablePageChange($event)"
        />
      </section>

      <!-- Tree Demo -->
      <section class="demo-section">
        <h2>Tree Component</h2>
        <form [formGroup]="form">
          <app-base-tree
            formControlName="selectedCategories"
            label="Chọn danh mục"
            [nodes]="treeData"
            [checkable]="true"
            [showLine]="true"
            (checkBoxChange)="onTreeCheckChange($event)"
          />
        </form>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #fef2f2 0%, #ffffff 50%, #fef2f2 100%);
    }

    .demo-container {
      padding: 24px;
      margin: 0 auto;
    }

    h1 {
      font-size: 28px;
      background-clip: text;
    }

    .demo-section {
      margin-bottom: 32px;
      padding: 24px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(220, 38, 38, 0.08);
    }

    .demo-section:last-child {
      margin-bottom: 0;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 12px;
      border-bottom: 2px solid #fee2e2;
      flex-wrap: wrap;
      gap: 12px;
    }

    h2 {
      font-size: 20px;
      margin: 0;
    }

    .layout-switcher {
      display: flex;
      gap: 8px;
    }

    .layout-switcher button {
      font-size: 13px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 2px solid #fee2e2;
    }

    .form-value {
      margin-top: 24px;
      padding: 16px;
      background: linear-gradient(135deg, #fef2f2 0%, #fff 100%);
      border-radius: 4px;
      border: 1px solid #fee2e2;
      max-height: 400px;
      overflow-y: auto;
    }

    .form-value h3 {
      margin-bottom: 12px;
      font-size: 16px;
    }

    .form-value pre {
      margin: 0;
      white-space: pre-wrap;
      word-wrap: break-word;
      font-size: 13px;
      line-height: 1.6;
    }
  `]
})
export class SharedDemoComponent {
  @ViewChild('statusTemplate', { static: true }) statusTemplate!: TemplateRef<any>;

  form: FormGroup;
  formLayout: 'vertical' | 'horizontal' | 'inline' = 'vertical';

  // Select options
  departmentOptions: SelectOption[] = [
    { label: 'IT', value: 'it' },
    { label: 'HR', value: 'hr' },
    { label: 'Sales', value: 'sales' },
    { label: 'Marketing', value: 'marketing' }
  ];

  skillOptions: SelectOption[] = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Node.js', value: 'nodejs' }
  ];

  // Radio options
  genderOptions: RadioOption[] = [
    { label: 'Nam', value: 'male' },
    { label: 'Nữ', value: 'female' },
    { label: 'Khác', value: 'other' }
  ];

  statusOptions: RadioOption[] = [
    { label: 'Hoạt động', value: 'active' },
    { label: 'Tạm dừng', value: 'inactive' },
    { label: 'Đã khóa', value: 'locked' }
  ];

  // Checkbox options
  interestOptions: CheckboxOption[] = [
    { label: 'Đọc sách', value: 'reading' },
    { label: 'Du lịch', value: 'travel' },
    { label: 'Thể thao', value: 'sports' },
    { label: 'Âm nhạc', value: 'music' }
  ];

  // Table data
  tableData = [
    { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', role: 'Admin', active: true },
    { id: 2, name: 'Trần Thị B', email: 'b@example.com', role: 'User', active: true },
    { id: 3, name: 'Lê Văn C', email: 'c@example.com', role: 'User', active: false }
  ];

  tableColumns: TableColumn[] = [
    { title: 'ID', key: 'id', width: '80px' },
    { title: 'Họ tên', key: 'name', sortable: true },
    { title: 'Email', key: 'email' },
    { title: 'Vai trò', key: 'role' },
    { title: 'Trạng thái', key: 'active' }
  ];

  tableActions: TableAction[] = [
    {
      label: 'Sửa',
      icon: 'edit',
      type: 'primary',
      onClick: (record) => this.message.info(`Sửa: ${record.name}`)
    },
    {
      label: 'Xóa',
      icon: 'delete',
      danger: true,
      confirm: true,
      onClick: (record) => this.message.success(`Đã xóa: ${record.name}`)
    }
  ];

  tableLoading = false;
  tableTotal = 3;

  // Tree data
  treeData: NzTreeNodeOptions[] = [
    {
      title: 'Công nghệ',
      key: 'tech',
      expanded: true,
      children: [
        { title: 'Frontend', key: 'frontend' },
        { title: 'Backend', key: 'backend' },
        { title: 'Mobile', key: 'mobile' }
      ]
    },
    {
      title: 'Kinh doanh',
      key: 'business',
      children: [
        { title: 'Marketing', key: 'marketing' },
        { title: 'Sales', key: 'sales' }
      ]
    }
  ];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: [null, Validators.required],
      skills: [[]],
      gender: ['male'],
      status: ['active'],
      agree: [false],
      interests: [[]],
      notifications: [true],
      birthDate: [null],
      dateRange: [null],
      bio: [''],
      avatar: [[]],
      selectedCategories: [[]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.message.success('Form submitted successfully!');
      console.log('Form value:', this.form.value);
    } else {
      this.message.error('Vui lòng điền đầy đủ thông tin!');
    }
  }

  onReset() {
    this.form.reset({
      gender: 'male',
      status: 'active',
      notifications: true
    });
    this.message.info('Form đã được reset');
  }

  fillSampleData() {
    this.form.patchValue({
      username: 'johndoe',
      email: 'john@example.com',
      department: 'it',
      skills: ['angular', 'typescript'],
      gender: 'male',
      status: 'active',
      agree: true,
      interests: ['reading', 'travel'],
      notifications: true,
      birthDate: new Date('1990-01-01'),
      bio: 'Đây là giới thiệu mẫu về bản thân.',
      selectedCategories: ['frontend', 'backend']
    });
    this.message.success('Đã điền dữ liệu mẫu');
  }

  onTablePageChange(page: number) {
    console.log('Table page:', page);
  }

  onTreeCheckChange(event: any) {
    console.log('Tree checked:', event.keys);
  }
}
