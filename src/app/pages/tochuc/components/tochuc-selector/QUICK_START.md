# Quick Start - ToChucSelectorComponent

## 🎯 Tái sử dụng 100% ToChucListComponent

Component này **wrap** `ToChucListComponent` và chỉ thêm logic selection. Không duplicate HTML/CSS!

```
ToChucSelectorComponent
  └── ToChucListComponent (Reused)
        └── All UI from original component
```

## 🚀 Sử dụng nhanh trong 3 bước

### Bước 1: Import component

```typescript
import { ToChucSelectorComponent } from '@app/pages/tochuc/components/tochuc-selector/tochuc-selector.component';

@Component({
  imports: [ToChucSelectorComponent]
})
```

### Bước 2: Chuẩn bị data (giống ToChucListComponent)

```typescript
export class YourComponent implements OnInit {
  private toChucService = inject(ToChucService);

  treeTableData: any[] = [];
  treeData: any[] = [];
  loading = false;

  columns: TableColumn[] = [
    { key: 'MaToChuc', title: 'Mã tổ chức', width: '150px' },
    { key: 'TenToChuc', title: 'Tên tổ chức', width: '300px' }
  ];

  ngOnInit(): void {
    this.loading = true;
    this.toChucService.getList().subscribe(response => {
      const data = response.Data || [];
      this.treeTableData = this.toChucService.convertToTreeTableData(data);
      this.treeData = this.toChucService.convertToTreeData(data);
      this.loading = false;
    });
  }

  onSelectionChange(items: ToChuc[]): void {
    console.log('Selected:', items);
  }
}
```

### Bước 3: Sử dụng trong template

```html
<app-tochuc-selector
  [treeTableData]="treeTableData"
  [treeData]="treeData"
  [columns]="columns"
  [loading]="loading"
  [searchFields]="['MaToChuc', 'TenToChuc']"
  (selectionChange)="onSelectionChange($event)"
/>
```

## ✅ Xong!

Component sẽ hiển thị:
- ✅ Selection info bar (số lượng đã chọn)
- ✅ Toàn bộ UI của ToChucListComponent
- ✅ Checkbox để chọn tổ chức (tree view)
- ✅ Không có cột thao tác
- ✅ Không có nút "Thêm mới"

## 🎯 Use cases phổ biến

### Pre-select items
```html
<app-tochuc-selector
  [selectedIds]="[1, 2, 3]"
  ...
/>
```

### Custom title
```html
<app-tochuc-selector
  [title]="'Chọn Tổ chức phụ trách'"
  [subtitle]="'Chọn các tổ chức sẽ phụ trách dự án này'"
  ...
/>
```

### Sử dụng 2 selectors trên cùng màn hình
```html
<app-tochuc-selector
  [title]="'Chọn Tổ chức chính'"
  (selectionChange)="onSelection1($event)"
/>

<nz-divider></nz-divider>

<app-tochuc-selector
  [title]="'Chọn Tổ chức phụ'"
  (selectionChange)="onSelection2($event)"
/>
```
**Không lo xung đột!** Mỗi instance hoạt động độc lập.

## 🔑 Key Points

1. **Tái sử dụng 100%**: Không duplicate HTML/CSS từ ToChucListComponent
2. **Dễ maintain**: Sửa UI ở ToChucListComponent → tự động apply cho Selector
3. **Không xung đột**: Dùng nhiều instances trên cùng màn hình
4. **Lightweight**: Chỉ thêm logic selection, không thêm UI code

## 📚 Tài liệu chi tiết

- `README.md` - API documentation
- `USAGE_EXAMPLE.md` - Nhiều ví dụ chi tiết
- `tochuc-selector-demo.component.ts` - Demo component
