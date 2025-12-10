# Quick Start - Shared Components

Hướng dẫn nhanh sử dụng shared components trong 5 phút.

## 1. Import Component

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseInputComponent, BaseSelectComponent } from '@shared/components';

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BaseInputComponent,
    BaseSelectComponent
  ],
  template: `...`
})
export class MyFormComponent {
  // ...
}
```

## 2. Tạo Form Group

```typescript
form: FormGroup;

constructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    name: [''],
    email: [''],
    department: [null]
  });
}
```

## 3. Sử dụng trong Template

```html
<form [formGroup]="form">
  <!-- Input -->
  <app-base-input
    formControlName="name"
    label="Họ tên"
    placeholder="Nhập họ tên"
  />

  <!-- Select -->
  <app-base-select
    formControlName="department"
    label="Phòng ban"
    [options]="departmentOptions"
  />

  <button nz-button nzType="primary">Lưu</button>
</form>
```

## 4. Định nghĩa Options

```typescript
import { SelectOption } from '@shared/components';

departmentOptions: SelectOption[] = [
  { label: 'IT', value: 'it' },
  { label: 'HR', value: 'hr' },
  { label: 'Sales', value: 'sales' }
];
```

## 5. Xử lý Submit

```typescript
onSubmit() {
  if (this.form.valid) {
    console.log(this.form.value);
    // Call API
  }
}
```

---

## Common Props

### Tất cả form controls có:

```typescript
label: string              // Label hiển thị
placeholder: string        // Placeholder text
required: boolean          // Required field
disabled: boolean          // Disabled state
errorTip: string          // Error message
```

### Input specific:

```typescript
type: 'text' | 'password' | 'email' | 'number'
size: 'large' | 'default' | 'small'
```

### Select specific:

```typescript
mode: 'default' | 'multiple' | 'tags'
options: SelectOption[]
showSearch: boolean
allowClear: boolean
```

### Table specific:

```typescript
data: any[]
columns: TableColumn[]
actions: TableAction[]
loading: boolean
pageSize: number
```

---

## Examples

### Form với validation

```typescript
this.form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]]
});
```

```html
<app-base-input
  formControlName="email"
  label="Email"
  type="email"
  [required]="true"
  errorTip="Email không hợp lệ"
/>

<app-base-input
  formControlName="password"
  label="Mật khẩu"
  type="password"
  [required]="true"
  errorTip="Mật khẩu tối thiểu 6 ký tự"
/>
```

### Multiple Select

```html
<app-base-select
  formControlName="skills"
  label="Kỹ năng"
  mode="multiple"
  [options]="skillOptions"
  [maxMultipleCount]="5"
/>
```

### Date Range

```html
<app-base-datepicker
  formControlName="dateRange"
  label="Khoảng thời gian"
  mode="range"
  startPlaceholder="Từ ngày"
  endPlaceholder="Đến ngày"
/>
```

### Table với Actions

```typescript
columns: TableColumn[] = [
  { title: 'ID', key: 'id', width: '80px' },
  { title: 'Tên', key: 'name', sortable: true }
];

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
    onClick: (record) => this.delete(record)
  }
];
```

```html
<app-base-table
  [data]="users"
  [columns]="columns"
  [actions]="actions"
/>
```

---

## Tips

1. **Import từ index**: `import { BaseInputComponent } from '@shared/components'`
2. **Sử dụng Reactive Forms**: Luôn dùng `formControlName`
3. **Type-safe options**: Sử dụng interfaces (`SelectOption`, `RadioOption`, etc.)
4. **Validation**: Thêm validators trong form group
5. **Error messages**: Cung cấp `errorTip` rõ ràng

---

## Next Steps

- Xem **README.md** để biết chi tiết tất cả components
- Xem **DEMO.component.ts** để xem ví dụ đầy đủ
- Customize components theo nhu cầu project
