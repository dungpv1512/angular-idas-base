# Shared Components

Các base components được xây dựng trên Ant Design (ng-zorro-antd) để tái sử dụng trong toàn bộ project.

## Danh sách Components

### Form Controls (với ControlValueAccessor)

1. **BaseInputComponent** - Text input
2. **BaseTextareaComponent** - Textarea với character count
3. **BaseSelectComponent** - Single & Multiple select
4. **BaseCheckboxComponent** - Single checkbox & Checkbox group
5. **BaseRadioComponent** - Radio group (normal & button style)
6. **BaseSwitchComponent** - Toggle switch
7. **BaseDatepickerComponent** - Date & Range picker
8. **BaseUploadComponent** - File upload

### Data Display

9. **BaseTableComponent** - Table với pagination, sorting, actions
10. **BaseTreeComponent** - Tree view với checkbox, search, drag-drop

---

## Tính năng chung

✅ **ControlValueAccessor** - Tích hợp với Reactive Forms & Template-driven Forms  
✅ **Validation** - Hiển thị error messages  
✅ **Disabled state** - Hỗ trợ disable/enable  
✅ **Customizable** - Nhiều options để customize  
✅ **Consistent UI** - Giao diện thống nhất theo Ant Design  
✅ **TypeScript** - Type-safe với interfaces  

---

## Cài đặt

Các components đã import sẵn ng-zorro-antd modules cần thiết. Chỉ cần import component vào nơi sử dụng:

\`\`\`typescript
import { BaseInputComponent } from '@shared/components';
// hoặc
import { BaseInputComponent } from '@shared/components/base-input/base-input.component';
\`\`\`

---

## Usage Examples

### 1. BaseInputComponent

\`\`\`typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BaseInputComponent } from '@shared/components';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, BaseInputComponent],
  template: \`
    <form [formGroup]="form">
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

      <app-base-input
        formControlName="password"
        label="Mật khẩu"
        type="password"
        [required]="true"
        size="large"
      />
    </form>
  \`
})
export class UserFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
\`\`\`

### 2. BaseSelectComponent

\`\`\`typescript
// Single select
<app-base-select
  formControlName="category"
  label="Danh mục"
  placeholder="Chọn danh mục"
  [options]="categoryOptions"
  [required]="true"
/>

// Multiple select
<app-base-select
  formControlName="tags"
  label="Tags"
  mode="multiple"
  [options]="tagOptions"
  [maxMultipleCount]="5"
/>

// Component
categoryOptions: SelectOption[] = [
  { label: 'Công nghệ', value: 'tech' },
  { label: 'Kinh doanh', value: 'business' },
  { label: 'Giải trí', value: 'entertainment', disabled: true }
];
\`\`\`

### 3. BaseTableComponent

\`\`\`typescript
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BaseTableComponent, TableColumn, TableAction } from '@shared/components';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [BaseTableComponent],
  template: \`
    <app-base-table
      [data]="users"
      [columns]="columns"
      [actions]="actions"
      [loading]="loading"
      [total]="total"
      [frontPagination]="false"
      (pageChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
    />

    <ng-template #statusTemplate let-record>
      <nz-tag [nzColor]="record.active ? 'green' : 'red'">
        {{ record.active ? 'Hoạt động' : 'Ngừng' }}
      </nz-tag>
    </ng-template>
  \`
})
export class UserListComponent {
  @ViewChild('statusTemplate', { static: true }) statusTemplate!: TemplateRef<any>;

  users = [
    { id: 1, name: 'User 1', email: 'user1@example.com', active: true },
    { id: 2, name: 'User 2', email: 'user2@example.com', active: false }
  ];

  columns: TableColumn[] = [
    { title: 'ID', key: 'id', width: '80px' },
    { title: 'Tên', key: 'name', sortable: true },
    { title: 'Email', key: 'email' },
    { title: 'Trạng thái', key: 'active', template: this.statusTemplate }
  ];

  actions: TableAction[] = [
    {
      label: 'Sửa',
      icon: 'edit',
      type: 'primary',
      onClick: (record) => this.editUser(record)
    },
    {
      label: 'Xóa',
      icon: 'delete',
      danger: true,
      confirm: true,
      confirmText: 'Bạn có chắc muốn xóa user này?',
      onClick: (record) => this.deleteUser(record),
      visible: (record) => !record.active // Chỉ hiện khi inactive
    }
  ];

  loading = false;
  total = 100;

  editUser(user: any) {
    console.log('Edit:', user);
  }

  deleteUser(user: any) {
    console.log('Delete:', user);
  }

  onPageChange(page: number) {
    console.log('Page:', page);
  }

  onPageSizeChange(size: number) {
    console.log('Page size:', size);
  }
}
\`\`\`

### 4. BaseDatepickerComponent

\`\`\`typescript
// Single date
<app-base-datepicker
  formControlName="birthDate"
  label="Ngày sinh"
  format="dd/MM/yyyy"
/>

// Date with time
<app-base-datepicker
  formControlName="appointmentTime"
  label="Thời gian hẹn"
  [showTime]="true"
  format="dd/MM/yyyy HH:mm"
/>

// Date range
<app-base-datepicker
  formControlName="dateRange"
  label="Khoảng thời gian"
  mode="range"
  startPlaceholder="Từ ngày"
  endPlaceholder="Đến ngày"
/>
\`\`\`

### 5. BaseTreeComponent

\`\`\`typescript
import { Component } from '@angular/core';
import { BaseTreeComponent } from '@shared/components';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-category-tree',
  standalone: true,
  imports: [BaseTreeComponent],
  template: \`
    <app-base-tree
      formControlName="selectedCategories"
      label="Danh mục"
      [nodes]="treeData"
      [checkable]="true"
      [showLine]="true"
      (checkBoxChange)="onCheckChange($event)"
    />
  \`
})
export class CategoryTreeComponent {
  treeData: NzTreeNodeOptions[] = [
    {
      title: 'Công nghệ',
      key: 'tech',
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

  onCheckChange(event: any) {
    console.log('Checked keys:', event.keys);
  }
}
\`\`\`

### 6. BaseRadioComponent

\`\`\`typescript
// Normal radio
<app-base-radio
  formControlName="gender"
  label="Giới tính"
  [options]="genderOptions"
/>

// Button style radio
<app-base-radio
  formControlName="status"
  label="Trạng thái"
  [options]="statusOptions"
  buttonStyle="solid"
/>

// Component
genderOptions: RadioOption[] = [
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' },
  { label: 'Khác', value: 'other' }
];
\`\`\`

### 7. BaseCheckboxComponent

\`\`\`typescript
// Single checkbox
<app-base-checkbox
  formControlName="agree"
  label="Tôi đồng ý với điều khoản"
  mode="single"
/>

// Checkbox group
<app-base-checkbox
  formControlName="interests"
  label="Sở thích"
  mode="group"
  [options]="interestOptions"
/>

// Component
interestOptions: CheckboxOption[] = [
  { label: 'Đọc sách', value: 'reading' },
  { label: 'Du lịch', value: 'travel' },
  { label: 'Thể thao', value: 'sports' }
];
\`\`\`

### 8. BaseUploadComponent

\`\`\`typescript
// Text upload
<app-base-upload
  formControlName="documents"
  label="Tài liệu"
  uploadUrl="/api/upload"
  [multiple]="true"
  accept=".pdf,.doc,.docx"
  hint="Chỉ chấp nhận file PDF, DOC, DOCX"
/>

// Image upload (picture-card)
<app-base-upload
  formControlName="avatar"
  label="Ảnh đại diện"
  listType="picture-card"
  uploadUrl="/api/upload/image"
  accept="image/*"
  [limit]="1"
/>
\`\`\`

---

## Complete Form Example

\`\`\`typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  BaseInputComponent,
  BaseTextareaComponent,
  BaseSelectComponent,
  BaseRadioComponent,
  BaseCheckboxComponent,
  BaseDatepickerComponent,
  BaseUploadComponent,
  SelectOption,
  RadioOption
} from '@shared/components';

@Component({
  selector: 'app-complete-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    BaseInputComponent,
    BaseTextareaComponent,
    BaseSelectComponent,
    BaseRadioComponent,
    BaseCheckboxComponent,
    BaseDatepickerComponent,
    BaseUploadComponent
  ],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <app-base-input
        formControlName="name"
        label="Họ và tên"
        placeholder="Nhập họ và tên"
        [required]="true"
        errorTip="Vui lòng nhập họ và tên"
      />

      <app-base-input
        formControlName="email"
        label="Email"
        type="email"
        [required]="true"
        errorTip="Email không hợp lệ"
      />

      <app-base-select
        formControlName="department"
        label="Phòng ban"
        [options]="departmentOptions"
        [required]="true"
      />

      <app-base-radio
        formControlName="gender"
        label="Giới tính"
        [options]="genderOptions"
      />

      <app-base-datepicker
        formControlName="birthDate"
        label="Ngày sinh"
      />

      <app-base-checkbox
        formControlName="skills"
        label="Kỹ năng"
        mode="group"
        [options]="skillOptions"
      />

      <app-base-textarea
        formControlName="bio"
        label="Giới thiệu"
        [rows]="4"
        [maxLength]="500"
        [showCount]="true"
      />

      <app-base-upload
        formControlName="avatar"
        label="Ảnh đại diện"
        listType="picture-card"
        [limit]="1"
      />

      <button nz-button nzType="primary" [disabled]="form.invalid">
        Lưu
      </button>
    </form>
  \`
})
export class CompleteFormComponent {
  form: FormGroup;

  departmentOptions: SelectOption[] = [
    { label: 'IT', value: 'it' },
    { label: 'HR', value: 'hr' },
    { label: 'Sales', value: 'sales' }
  ];

  genderOptions: RadioOption[] = [
    { label: 'Nam', value: 'male' },
    { label: 'Nữ', value: 'female' }
  ];

  skillOptions = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: [null, Validators.required],
      gender: ['male'],
      birthDate: [null],
      skills: [[]],
      bio: [''],
      avatar: [[]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form value:', this.form.value);
    }
  }
}
\`\`\`

---

## Customization

### Thay đổi default styles

Tạo file \`src/app/shared/components/styles.css\`:

\`\`\`css
/* Custom form item spacing */
nz-form-item {
  margin-bottom: 24px;
}

/* Custom label styles */
nz-form-label {
  font-weight: 500;
}

/* Custom error message */
nz-form-control .ant-form-item-explain-error {
  font-size: 12px;
}
\`\`\`

### Tạo custom component

Extend base component để thêm logic riêng:

\`\`\`typescript
import { Component } from '@angular/core';
import { BaseInputComponent } from '@shared/components';

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [BaseInputComponent],
  template: \`
    <app-base-input
      [label]="label"
      type="tel"
      placeholder="0xxx xxx xxx"
      [value]="value"
      (input)="onPhoneInput($event)"
    />
  \`
})
export class PhoneInputComponent extends BaseInputComponent {
  onPhoneInput(event: Event) {
    // Custom phone validation logic
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Chỉ giữ số
    
    // Format: 0xxx xxx xxx
    if (value.length > 4) {
      value = value.slice(0, 4) + ' ' + value.slice(4);
    }
    if (value.length > 8) {
      value = value.slice(0, 8) + ' ' + value.slice(8, 11);
    }
    
    input.value = value;
    this.value = value;
    this.onChange(value);
  }
}
\`\`\`

---

## Best Practices

1. ✅ Luôn sử dụng \`formControlName\` với Reactive Forms
2. ✅ Thêm \`[required]="true"\` cho required fields
3. ✅ Cung cấp \`errorTip\` rõ ràng cho user
4. ✅ Sử dụng \`placeholder\` để hướng dẫn input
5. ✅ Validate form trước khi submit
6. ✅ Disable submit button khi form invalid
7. ✅ Sử dụng TypeScript interfaces cho options
8. ✅ Reuse components thay vì duplicate code

---

## Troubleshooting

### Component không hiển thị
- Kiểm tra đã import component vào \`imports\` array
- Kiểm tra ng-zorro-antd modules đã được import

### Form control không hoạt động
- Kiểm tra \`formControlName\` match với form group
- Kiểm tra component có implement \`ControlValueAccessor\`

### Validation không hoạt động
- Kiểm tra validators trong form group
- Kiểm tra \`errorTip\` đã được set

### Styles không đúng
- Import ng-zorro-antd styles trong \`angular.json\`
- Kiểm tra theme.less configuration
