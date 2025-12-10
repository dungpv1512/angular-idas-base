# 📋 HƯỚNG DẪN SỬ DỤNG SHARED COMPONENTS

## ⚠️ QUY TẮC BẮT BUỘC

> **QUAN TRỌNG**: Tất cả các thành viên trong dự án **BẮT BUỘC** phải sử dụng các component trong thư mục `shared/components` thay vì tự viết component riêng hoặc sử dụng trực tiếp các component của ng-zorro-antd.

### ❌ KHÔNG ĐƯỢC PHÉP
```typescript
// ❌ KHÔNG viết như thế này
<input nz-input [(ngModel)]="username" placeholder="Username" />
<nz-select [(ngModel)]="department">
  <nz-option nzValue="it" nzLabel="IT"></nz-option>
</nz-select>
```

### ✅ BẮT BUỘC
```typescript
// ✅ PHẢI viết như thế này
<app-base-input
  formControlName="username"
  label="Tên đăng nhập"
  placeholder="Username"
  [required]="true"
/>
<app-base-select
  formControlName="department"
  label="Phòng ban"
  [options]="departmentOptions"
/>
```

---

## 🎯 LÝ DO BẮT BUỘC

1. **Tính nhất quán**: Đảm bảo UI/UX đồng nhất trong toàn bộ ứng dụng
2. **Dễ bảo trì**: Chỉ cần sửa 1 nơi, tất cả các trang đều được cập nhật
3. **Validation tự động**: Các component đã tích hợp sẵn validation và error handling
4. **Styling thống nhất**: Màu sắc, kích thước, spacing đã được chuẩn hóa
5. **Giảm code duplicate**: Không phải viết lại logic validation, styling nhiều lần
6. **Dễ onboard**: Developer mới chỉ cần học 1 lần, dùng được ở mọi nơi

---

## 📦 DANH SÁCH COMPONENTS

### 1. 📝 Form Input Components

#### `<app-base-input>` - Text Input
**Sử dụng cho**: Username, Email, Phone, Password, v.v.

```typescript
<app-base-input
  formControlName="username"
  label="Tên đăng nhập"
  placeholder="Nhập tên đăng nhập"
  [required]="true"
  errorTip="Vui lòng nhập tên đăng nhập"
  [disabled]="false"
  [maxLength]="50"
/>

// Password input
<app-base-input
  formControlName="password"
  label="Mật khẩu"
  type="password"
  [required]="true"
/>

// Number input
<app-base-input
  formControlName="age"
  label="Tuổi"
  type="number"
  [min]="18"
  [max]="100"
/>
```

**Props chính**:
- `formControlName`: Tên field trong FormGroup (bắt buộc)
- `label`: Nhãn hiển thị
- `type`: 'text' | 'password' | 'email' | 'number' | 'tel'
- `placeholder`: Placeholder text
- `required`: Hiển thị dấu * đỏ
- `errorTip`: Thông báo lỗi tùy chỉnh
- `disabled`: Vô hiệu hóa input
- `maxLength`: Giới hạn ký tự

---

#### `<app-base-textarea>` - Textarea
**Sử dụng cho**: Mô tả, Ghi chú, Nội dung dài

```typescript
<app-base-textarea
  formControlName="description"
  label="Mô tả"
  placeholder="Nhập mô tả chi tiết"
  [rows]="4"
  [maxLength]="500"
  [showCount]="true"
  [autosize]="{ minRows: 3, maxRows: 8 }"
/>
```

**Props chính**:
- `rows`: Số dòng mặc định
- `maxLength`: Giới hạn ký tự
- `showCount`: Hiển thị số ký tự đã nhập
- `autosize`: Tự động điều chỉnh chiều cao

---

#### `<app-base-select>` - Dropdown Select
**Sử dụng cho**: Chọn phòng ban, vai trò, trạng thái, v.v.

```typescript
// Single select
<app-base-select
  formControlName="department"
  label="Phòng ban"
  [options]="departmentOptions"
  [required]="true"
  placeholder="Chọn phòng ban"
/>

// Multiple select
<app-base-select
  formControlName="skills"
  label="Kỹ năng"
  mode="multiple"
  [options]="skillOptions"
  [maxMultipleCount]="5"
  placeholder="Chọn tối đa 5 kỹ năng"
/>

// Tags mode
<app-base-select
  formControlName="tags"
  label="Tags"
  mode="tags"
  [options]="tagOptions"
/>
```

**Định nghĩa options**:
```typescript
departmentOptions: SelectOption[] = [
  { label: 'IT', value: 'it' },
  { label: 'HR', value: 'hr' },
  { label: 'Sales', value: 'sales', disabled: true }
];
```

**Props chính**:
- `options`: Mảng SelectOption[]
- `mode`: 'default' | 'multiple' | 'tags'
- `maxMultipleCount`: Giới hạn số lượng chọn (mode multiple)
- `showSearch`: Cho phép tìm kiếm

---

#### `<app-base-radio>` - Radio Buttons
**Sử dụng cho**: Giới tính, Trạng thái, Lựa chọn duy nhất

```typescript
// Radio buttons thông thường
<app-base-radio
  formControlName="gender"
  label="Giới tính"
  [options]="genderOptions"
/>

// Radio buttons dạng button
<app-base-radio
  formControlName="status"
  label="Trạng thái"
  [options]="statusOptions"
  buttonStyle="solid"
/>
```

**Định nghĩa options**:
```typescript
genderOptions: RadioOption[] = [
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' },
  { label: 'Khác', value: 'other' }
];
```

**Props chính**:
- `options`: Mảng RadioOption[]
- `buttonStyle`: 'outline' | 'solid' (hiển thị dạng button)

---

#### `<app-base-checkbox>` - Checkboxes
**Sử dụng cho**: Đồng ý điều khoản, Chọn nhiều tùy chọn

```typescript
// Single checkbox
<app-base-checkbox
  formControlName="agree"
  label="Tôi đồng ý với điều khoản sử dụng"
  mode="single"
/>

// Checkbox group
<app-base-checkbox
  formControlName="interests"
  label="Sở thích"
  mode="group"
  [options]="interestOptions"
/>
```

**Định nghĩa options**:
```typescript
interestOptions: CheckboxOption[] = [
  { label: 'Đọc sách', value: 'reading' },
  { label: 'Du lịch', value: 'travel' },
  { label: 'Thể thao', value: 'sports' }
];
```

---

#### `<app-base-switch>` - Toggle Switch
**Sử dụng cho**: Bật/Tắt tính năng, Active/Inactive

```typescript
<app-base-switch
  formControlName="notifications"
  label="Nhận thông báo"
  checkedText="Bật"
  uncheckedText="Tắt"
/>

<app-base-switch
  formControlName="isActive"
  label="Kích hoạt"
  [loading]="saving"
/>
```

**Props chính**:
- `checkedText`: Text khi bật
- `uncheckedText`: Text khi tắt
- `loading`: Hiển thị loading state

---

#### `<app-base-datepicker>` - Date Picker
**Sử dụng cho**: Ngày sinh, Ngày bắt đầu/kết thúc

```typescript
// Single date
<app-base-datepicker
  formControlName="birthDate"
  label="Ngày sinh"
  [required]="true"
/>

// Date range
<app-base-datepicker
  formControlName="dateRange"
  label="Khoảng thời gian"
  mode="range"
/>

// Month picker
<app-base-datepicker
  formControlName="month"
  label="Chọn tháng"
  mode="month"
/>

// Year picker
<app-base-datepicker
  formControlName="year"
  label="Chọn năm"
  mode="year"
/>
```

**Props chính**:
- `mode`: 'date' | 'range' | 'month' | 'year'
- `format`: Format hiển thị (mặc định: 'dd/MM/yyyy')
- `disabledDate`: Function để disable các ngày cụ thể

---

#### `<app-base-upload>` - File Upload
**Sử dụng cho**: Upload ảnh, tài liệu, file

```typescript
// Upload ảnh dạng card
<app-base-upload
  formControlName="avatar"
  label="Ảnh đại diện"
  listType="picture-card"
  [limit]="1"
  hint="Chỉ chấp nhận file ảnh, tối đa 2MB"
/>

// Upload file dạng list
<app-base-upload
  formControlName="documents"
  label="Tài liệu đính kèm"
  listType="text"
  [limit]="5"
  [multiple]="true"
/>

// Upload ảnh dạng picture
<app-base-upload
  formControlName="images"
  label="Hình ảnh"
  listType="picture"
  [multiple]="true"
/>
```

**Props chính**:
- `listType`: 'text' | 'picture' | 'picture-card'
- `limit`: Giới hạn số file
- `multiple`: Cho phép chọn nhiều file
- `accept`: Loại file chấp nhận (vd: 'image/*', '.pdf,.doc')

---

### 2. 📊 Data Display Components

#### `<app-base-table>` - Data Table
**Sử dụng cho**: Danh sách user, sản phẩm, đơn hàng

```typescript
<app-base-table
  [data]="users"
  [columns]="columns"
  [actions]="actions"
  [loading]="loading"
  [total]="total"
  [pageSize]="10"
  [bordered]="true"
  [showPagination]="true"
  (pageChange)="onPageChange($event)"
  (sortChange)="onSortChange($event)"
/>
```

**Định nghĩa columns**:
```typescript
columns: TableColumn[] = [
  { title: 'ID', key: 'id', width: '80px' },
  { title: 'Họ tên', key: 'name', sortable: true },
  { title: 'Email', key: 'email' },
  { 
    title: 'Trạng thái', 
    key: 'status',
    render: (record) => record.active ? 'Hoạt động' : 'Tạm dừng'
  }
];
```

**Định nghĩa actions**:
```typescript
actions: TableAction[] = [
  {
    label: 'Sửa',
    icon: 'edit',
    type: 'primary',
    onClick: (record) => this.edit(record)
  },
  {
    label: 'Xóa',
    icon: 'delete',
    danger: true,
    confirm: true,
    confirmMessage: 'Bạn có chắc muốn xóa?',
    onClick: (record) => this.delete(record)
  }
];
```

---

#### `<app-base-tree>` - Tree View
**Sử dụng cho**: Danh mục, phân cấp tổ chức

```typescript
<app-base-tree
  formControlName="selectedCategories"
  label="Chọn danh mục"
  [nodes]="treeData"
  [checkable]="true"
  [showLine]="true"
  [expandAll]="false"
  (checkBoxChange)="onTreeCheck($event)"
/>
```

**Định nghĩa tree data**:
```typescript
treeData: NzTreeNodeOptions[] = [
  {
    title: 'Công nghệ',
    key: 'tech',
    expanded: true,
    children: [
      { title: 'Frontend', key: 'frontend' },
      { title: 'Backend', key: 'backend' }
    ]
  }
];
```

---

## 🔧 SETUP FORM

### Bước 1: Import Components
```typescript
import { ReactiveFormsModule } from '@angular/forms';
import {
  BaseInputComponent,
  BaseSelectComponent,
  BaseRadioComponent,
  // ... import các component cần dùng
} from '@app/shared/components';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BaseInputComponent,
    BaseSelectComponent,
    // ... thêm vào imports
  ]
})
```

### Bước 2: Tạo FormGroup
```typescript
export class MyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: [null, Validators.required],
      skills: [[]],
      agree: [false]
    });
  }
}
```

### Bước 3: Sử dụng trong Template
```html
<form nz-form [nzLayout]="'vertical'" [formGroup]="form" (ngSubmit)="onSubmit()">
  <app-base-input
    formControlName="username"
    label="Tên đăng nhập"
    [required]="true"
  />
  
  <app-base-select
    formControlName="department"
    label="Phòng ban"
    [options]="departmentOptions"
  />
  
  <button nz-button nzType="primary" [disabled]="form.invalid">
    Lưu
  </button>
</form>
```

---

## 📝 VÍ DỤ HOÀN CHỈNH

### User Form Component
```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  BaseInputComponent,
  BaseSelectComponent,
  BaseRadioComponent,
  BaseDatepickerComponent,
  SelectOption,
  RadioOption
} from '@app/shared/components';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    BaseInputComponent,
    BaseSelectComponent,
    BaseRadioComponent,
    BaseDatepickerComponent
  ],
  template: `
    <form nz-form [nzLayout]="'vertical'" [formGroup]="form" (ngSubmit)="onSubmit()">
      <app-base-input
        formControlName="fullName"
        label="Họ và tên"
        placeholder="Nhập họ và tên"
        [required]="true"
      />

      <app-base-input
        formControlName="email"
        label="Email"
        type="email"
        placeholder="example@email.com"
        [required]="true"
      />

      <app-base-select
        formControlName="department"
        label="Phòng ban"
        [options]="departments"
        [required]="true"
      />

      <app-base-radio
        formControlName="gender"
        label="Giới tính"
        [options]="genders"
      />

      <app-base-datepicker
        formControlName="birthDate"
        label="Ngày sinh"
      />

      <button nz-button nzType="primary" [disabled]="form.invalid">
        Lưu
      </button>
    </form>
  `
})
export class UserFormComponent {
  form: FormGroup;

  departments: SelectOption[] = [
    { label: 'IT', value: 'it' },
    { label: 'HR', value: 'hr' },
    { label: 'Sales', value: 'sales' }
  ];

  genders: RadioOption[] = [
    { label: 'Nam', value: 'male' },
    { label: 'Nữ', value: 'female' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: [null, Validators.required],
      gender: ['male'],
      birthDate: [null]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form data:', this.form.value);
      // Call API to save
    }
  }
}
```

---

## 🎨 DEMO PAGE

Xem demo đầy đủ tất cả components tại:
```
src/app/shared/components/DEMO.component.ts
```

Chạy ứng dụng và truy cập route `/demo` để xem các component hoạt động.

---

## ⚡ BEST PRACTICES

### 1. Luôn sử dụng Reactive Forms
```typescript
// ✅ ĐÚNG
<app-base-input formControlName="username" />

// ❌ SAI - Không dùng ngModel
<app-base-input [(ngModel)]="username" />
```

### 2. Định nghĩa options trong component class
```typescript
// ✅ ĐÚNG
export class MyComponent {
  departments: SelectOption[] = [
    { label: 'IT', value: 'it' }
  ];
}

// ❌ SAI - Không hardcode trong template
<app-base-select [options]="[{label: 'IT', value: 'it'}]" />
```

### 3. Sử dụng validators phù hợp
```typescript
// ✅ ĐÚNG
this.form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
  phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
});
```

### 4. Xử lý submit đúng cách
```typescript
onSubmit() {
  if (this.form.invalid) {
    // Mark all fields as touched để hiển thị lỗi
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
    return;
  }
  
  // Process valid form
  const formData = this.form.value;
  this.apiService.save(formData).subscribe(/* ... */);
}
```

---

## 🚫 CÁC LỖI THƯỜNG GẶP

### 1. Quên import ReactiveFormsModule
```typescript
// ❌ Lỗi: Can't bind to 'formGroup'
// ✅ Fix: Import ReactiveFormsModule
imports: [ReactiveFormsModule, ...]
```

### 2. Quên import component
```typescript
// ❌ Lỗi: 'app-base-input' is not a known element
// ✅ Fix: Import BaseInputComponent
imports: [BaseInputComponent, ...]
```

### 3. FormControlName không khớp
```typescript
// ❌ SAI
this.form = this.fb.group({ userName: [''] });
<app-base-input formControlName="username" /> // Khác tên

// ✅ ĐÚNG
this.form = this.fb.group({ username: [''] });
<app-base-input formControlName="username" />
```

### 4. Quên wrap trong <form>
```typescript
// ❌ SAI
<app-base-input formControlName="username" />

// ✅ ĐÚNG
<form [formGroup]="form">
  <app-base-input formControlName="username" />
</form>
```

---

## 📞 HỖ TRỢ

- Xem demo: `src/app/shared/components/DEMO.component.ts`
- Xem source code: `src/app/shared/components/`
- Đọc README: `src/app/shared/components/README.md`

---

## ✅ CHECKLIST TRƯỚC KHI COMMIT

- [ ] Đã sử dụng shared components thay vì ng-zorro trực tiếp
- [ ] Đã sử dụng Reactive Forms (không dùng ngModel)
- [ ] Đã định nghĩa options trong component class
- [ ] Đã thêm validators phù hợp
- [ ] Đã test form validation
- [ ] Đã xử lý submit đúng cách
- [ ] Code đã được format và không có lỗi

---

**Cập nhật lần cuối**: December 2025
**Version**: 1.0.0
