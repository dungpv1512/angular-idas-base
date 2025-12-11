# Modal Integration Guide

## 🎯 Tích hợp ToChucSelectorComponent vào Modal

Component này được thiết kế để dễ dàng tích hợp vào Modal/Drawer cho việc chọn tổ chức.

## ✅ Đã tích hợp sẵn

### ToChucFormComponent

Component `ToChucFormComponent` đã được tích hợp sẵn với ToChucSelector qua modal:

1. **Nút "Chọn từ danh sách"** xuất hiện bên dưới tree-select `IdToChucCapTren`
2. Click vào nút → Mở modal với ToChucSelectorComponent
3. Chọn tổ chức → Click "Xác nhận" → Giá trị được fill vào form

### Cách sử dụng

Không cần làm gì thêm! Chỉ cần đảm bảo truyền `treeTableData` vào form:

```html
<app-tochuc-form
  [mode]="drawerMode"
  [toChuc]="selectedToChuc"
  [treeData]="treeData"
  [treeTableData]="treeTableData"  <!-- ← Required -->
  (submit)="onFormSubmit($event)"
  (cancel)="onDrawerClose()"
/>
```

## 🔧 Tự tích hợp vào component khác

### Bước 1: Import dependencies

```typescript
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToChucSelectorComponent } from '@app/pages/tochuc/components/tochuc-selector/tochuc-selector.component';
import { ToChuc } from '@app/core/services/tochuc.service';
import { TableColumn } from '@app/shared/types/table.types';
```

### Bước 2: Inject modal service

```typescript
export class YourComponent {
  private modal = inject(NzModalService);

  treeTableData: any[] = [];
  treeData: any[] = [];
  
  columns: TableColumn[] = [
    { key: 'MaToChuc', title: 'Mã tổ chức', width: '150px' },
    { key: 'TenToChuc', title: 'Tên tổ chức', width: '300px' }
  ];
}
```

### Bước 3: Tạo method mở modal

```typescript
openToChucSelector(): void {
  const modalRef = this.modal.create({
    nzTitle: 'Chọn Tổ chức',
    nzContent: ToChucSelectorComponent,
    nzWidth: '90%',
    nzStyle: { top: '20px' },
    nzBodyStyle: { padding: '0' },
    nzData: {
      treeTableData: this.treeTableData,
      treeData: this.treeData,
      columns: this.columns,
      searchFields: ['MaToChuc', 'TenToChuc'],
      title: 'Chọn Tổ chức',
      subtitle: 'Chọn một hoặc nhiều tổ chức',
      multiple: false,  // true nếu cho phép chọn nhiều
      scroll: { y: '500px' }
    },
    nzFooter: [
      {
        label: 'Hủy',
        onClick: () => modalRef.destroy()
      },
      {
        label: 'Xác nhận',
        type: 'primary',
        disabled: (componentInstance) => {
          return !componentInstance || componentInstance.selectedCount === 0;
        },
        onClick: (componentInstance) => {
          if (componentInstance && componentInstance.selectedItems.length > 0) {
            const selected = componentInstance.selectedItems;
            this.handleSelection(selected);
            modalRef.destroy();
          }
        }
      }
    ]
  });
}

handleSelection(items: ToChuc[]): void {
  console.log('Selected:', items);
  // Xử lý logic của bạn ở đây
}
```

### Bước 4: Gọi method từ template

```html
<button nz-button (click)="openToChucSelector()">
  Chọn Tổ chức
</button>
```

## 🎨 Customization

### Modal Size

```typescript
nzWidth: '90%',        // Responsive width
nzWidth: '1200px',     // Fixed width
```

### Modal Position

```typescript
nzStyle: { top: '20px' },     // Gần top
nzStyle: { top: '50px' },     // Xa top hơn
nzCentered: true,             // Center modal
```

### Scroll Height

```typescript
nzData: {
  scroll: { y: '500px' },     // Fixed height
  scroll: { y: '60vh' },      // Responsive height
  ...
}
```

### Single vs Multiple Selection

```typescript
// Single selection
nzData: {
  multiple: false,
  ...
}

// Multiple selection
nzData: {
  multiple: true,
  ...
}
```

### Pre-selected Items

```typescript
nzData: {
  selectedIds: [1, 2, 3],  // IDs đã chọn trước
  ...
}
```

## 📋 Modal Footer Options

### Basic Footer

```typescript
nzFooter: [
  {
    label: 'Hủy',
    onClick: () => modalRef.destroy()
  },
  {
    label: 'OK',
    type: 'primary',
    onClick: (componentInstance) => {
      // Handle OK
      modalRef.destroy();
    }
  }
]
```

### Conditional Disable

```typescript
{
  label: 'Xác nhận',
  type: 'primary',
  disabled: (componentInstance) => {
    // Disable nếu chưa chọn gì
    return componentInstance.selectedCount === 0;
  },
  onClick: (componentInstance) => {
    // Handle confirm
  }
}
```

### Loading State

```typescript
{
  label: 'Lưu',
  type: 'primary',
  loading: this.saving,  // Bind to component property
  onClick: async (componentInstance) => {
    this.saving = true;
    await this.saveData(componentInstance.selectedItems);
    this.saving = false;
    modalRef.destroy();
  }
}
```

## 🎯 Use Cases

### 1. Chọn tổ chức cấp trên (Single)

```typescript
openParentSelector(): void {
  const modalRef = this.modal.create({
    nzTitle: 'Chọn Tổ chức cấp trên',
    nzContent: ToChucSelectorComponent,
    nzData: {
      multiple: false,
      title: 'Chọn Tổ chức cấp trên',
      subtitle: 'Chọn một tổ chức làm cấp trên',
      ...
    },
    nzFooter: [...]
  });
}
```

### 2. Chọn nhiều tổ chức phụ trách (Multiple)

```typescript
openResponsibleSelector(): void {
  const modalRef = this.modal.create({
    nzTitle: 'Chọn Tổ chức phụ trách',
    nzContent: ToChucSelectorComponent,
    nzData: {
      multiple: true,
      title: 'Chọn Tổ chức phụ trách',
      subtitle: 'Chọn các tổ chức sẽ phụ trách dự án',
      ...
    },
    nzFooter: [...]
  });
}
```

### 3. Chọn với pre-selected items

```typescript
openEditSelector(currentIds: number[]): void {
  const modalRef = this.modal.create({
    nzTitle: 'Chỉnh sửa Tổ chức',
    nzContent: ToChucSelectorComponent,
    nzData: {
      selectedIds: currentIds,  // Pre-select
      ...
    },
    nzFooter: [...]
  });
}
```

## 💡 Tips

1. **Modal width**: Dùng `90%` cho responsive, `1200px` cho fixed
2. **Scroll height**: Dùng `500px` cho modal, `60vh` cho fullscreen
3. **Body padding**: Set `nzBodyStyle: { padding: '0' }` để selector chiếm full width
4. **Top position**: Set `nzStyle: { top: '20px' }` để modal không quá cao
5. **Footer disable**: Disable nút "Xác nhận" khi chưa chọn gì

## 🐛 Troubleshooting

### Modal quá nhỏ
```typescript
nzWidth: '90%',  // Tăng width
nzData: {
  scroll: { y: '60vh' }  // Tăng scroll height
}
```

### Không scroll được
```typescript
nzData: {
  scroll: { y: '500px' }  // Set fixed height thay vì calc()
}
```

### Footer button không disable
```typescript
disabled: (componentInstance) => {
  return !componentInstance || componentInstance.selectedCount === 0;
}
```

## 📚 Xem thêm

- `README.md` - API documentation
- `SCROLL_GUIDE.md` - Scroll configuration
- `USAGE_EXAMPLE.md` - Ví dụ sử dụng
