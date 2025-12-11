# ToChuc Selector Component

Component chọn tổ chức với checkbox selection. **Tái sử dụng hoàn toàn** `ToChucListComponent` và chỉ thêm logic selection.

## ✨ Đặc điểm

- ✅ **Tái sử dụng 100%** HTML/CSS của `ToChucListComponent`
- ✅ Checkbox selection (tree view)
- ✅ Ẩn cột thao tác và nút "Thêm mới"
- ✅ Hiển thị số lượng đã chọn
- ✅ Emit selected items
- ✅ Hỗ trợ pre-selected items
- ✅ **Không xung đột** khi dùng nhiều instances

## 🏗️ Kiến trúc

```
ToChucSelectorComponent (Wrapper)
  └── ToChucListComponent (Reused)
        ├── Header (custom title/subtitle)
        ├── Search với tags
        ├── View switcher (Table/Tree)
        └── Content (với checkbox enabled)
```

## 📦 Sử dụng

### Basic Usage

```typescript
import { ToChucSelectorComponent } from '@app/pages/tochuc/components/tochuc-selector/tochuc-selector.component';

@Component({
  imports: [ToChucSelectorComponent]
})
export class YourComponent {
  treeTableData: any[] = [];
  treeData: any[] = [];
  columns: TableColumn[] = [
    { key: 'MaToChuc', title: 'Mã tổ chức', width: '150px' },
    { key: 'TenToChuc', title: 'Tên tổ chức', width: '300px' }
  ];

  onSelectionChange(items: ToChuc[]): void {
    console.log('Selected:', items);
  }
}
```

```html
<app-tochuc-selector
  [treeTableData]="treeTableData"
  [treeData]="treeData"
  [columns]="columns"
  [searchFields]="['MaToChuc', 'TenToChuc']"
  (selectionChange)="onSelectionChange($event)"
/>
```

### Multiple Instances (Không xung đột!)

```html
<!-- Selector 1 -->
<app-tochuc-selector
  [treeTableData]="treeTableData"
  [treeData]="treeData"
  [columns]="columns"
  [title]="'Chọn Tổ chức chính'"
  (selectionChange)="onMainSelection($event)"
/>

<!-- Selector 2 -->
<app-tochuc-selector
  [treeTableData]="treeTableData"
  [treeData]="treeData"
  [columns]="columns"
  [title]="'Chọn Tổ chức phụ'"
  (selectionChange)="onSubSelection($event)"
/>
```

## 📋 API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `viewMode` | `'table' \| 'tree'` | `'table'` | Chế độ hiển thị |
| `treeTableData` | `any[]` | `[]` | Dữ liệu cho table view |
| `treeData` | `any[]` | `[]` | Dữ liệu cho tree view |
| `columns` | `TableColumn[]` | `[]` | Cấu hình cột |
| `loading` | `boolean` | `false` | Trạng thái loading |
| `searchFields` | `string[]` | `[]` | Fields để search |
| `title` | `string` | `'Chọn Tổ chức'` | Tiêu đề |
| `subtitle` | `string` | `'Chọn một hoặc nhiều tổ chức'` | Phụ đề |
| `multiple` | `boolean` | `true` | Cho phép chọn nhiều |
| `selectedIds` | `number[]` | `[]` | IDs đã chọn (pre-selected) |
| `scroll` | `{ x?: string; y?: string }` | `{ y: 'calc(-445px + 100vh)' }` | Scroll config |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `viewModeChange` | `'table' \| 'tree'` | Emit khi đổi view mode |
| `selectionChange` | `ToChuc[]` | Emit khi selection thay đổi |
| `searchTagsChange` | `string[]` | Emit khi search tags thay đổi |

### Methods

| Method | Description |
|--------|-------------|
| `clearSelection()` | Xóa tất cả selections |
| `selectedCount` | Getter: Số lượng items đã chọn |

## 🎯 So sánh với ToChucListComponent

| Feature | ToChucListComponent | ToChucSelectorComponent |
|---------|---------------------|-------------------------|
| HTML/CSS | ✅ Original | ✅ **Reused 100%** |
| Checkbox selection | ❌ | ✅ |
| Cột thao tác | ✅ | ❌ (Hidden) |
| Nút "Thêm mới" | ✅ | ❌ (Hidden) |
| Emit selected items | ❌ | ✅ |
| Pre-selected items | ❌ | ✅ |
| Selection info bar | ❌ | ✅ |

## 🔧 Customization trong ToChucListComponent

Component này hoạt động nhờ các Input mới được thêm vào `ToChucListComponent`:

```typescript
// ToChucListComponent - New Inputs
@Input() title = 'Quản lý Tổ chức';
@Input() subtitle = 'Quản lý cấu trúc tổ chức và phòng ban';
@Input() showCreateButton = true;
@Input() showActions = true;
@Input() checkable = false;
@Input() checkedKeys: string[] = [];
@Input() scroll: { x?: string; y?: string } = { y: 'calc(-445px + 100vh)' };

@Output() checkChange = new EventEmitter<any>();
```

## 📚 Xem thêm

- `QUICK_START.md` - Hướng dẫn nhanh 3 bước
- `USAGE_EXAMPLE.md` - Nhiều ví dụ chi tiết
- `SCROLL_GUIDE.md` - Hướng dẫn config scroll (quan trọng!)
- `tochuc-selector-demo.component.ts` - Demo component

## ❓ FAQ

### Q: Tại sao không copy HTML mà lại wrap component?
**A:** Để tránh duplicate code. Khi cần sửa UI của list, chỉ cần sửa 1 chỗ (ToChucListComponent) thay vì sửa 2 chỗ.

### Q: 2 selectors có xung đột với nhau không?
**A:** Không. Mỗi instance có state riêng biệt, hoàn toàn độc lập.

### Q: Có thể pre-select items không?
**A:** Có. Truyền mảng IDs vào `[selectedIds]="[1, 2, 3]"`.

### Q: Component có hỗ trợ search không?
**A:** Có. Truyền `[searchFields]="['MaToChuc', 'TenToChuc']"` để enable search (tính năng từ ToChucListComponent).
