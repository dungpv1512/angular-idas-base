# Base Tags Input Component

Component nhập nhiều giá trị dưới dạng tags, hỗ trợ debounce và tích hợp sẵn với filter API.

## Features

- ✅ Nhập nhiều giá trị dưới dạng tags
- ✅ Enter để thêm tag, Backspace để xóa tag cuối
- ✅ Click X để xóa từng tag hoặc clear all
- ✅ Debounce search (mặc định 500ms)
- ✅ Two-way binding với `[(tags)]`
- ✅ Hiển thị số lượng tags
- ✅ Giới hạn số lượng tags tối đa
- ✅ Tự động thêm tag khi blur
- ✅ Customizable: icon, color, placeholder

## Usage

### Basic Example

```typescript
import { BaseTagsInputComponent } from '@app/shared/components/base-tags-input/base-tags-input.component';

@Component({
  imports: [BaseTagsInputComponent]
})
export class MyComponent {
  searchTags: string[] = [];

  onTagsChange(tags: string[]): void {
    console.log('Tags:', tags);
    // Call API with tags
  }
}
```

```html
<app-base-tags-input
  [(tags)]="searchTags"
  [placeholder]="'Nhập và Enter để thêm...'"
  (tagsChange)="onTagsChange($event)"
/>
```

### Advanced Example with Search Fields

```typescript
import { BaseTagsInputComponent, TagsSearchResult } from '@app/shared/components/base-tags-input/base-tags-input.component';
import { buildApiFilterMultiValue } from '@app/shared/utils/filter.utils';

@Component({
  imports: [BaseTagsInputComponent]
})
export class MyComponent {
  searchTags: string[] = [];
  searchFields = ['TenToChuc', 'MaToChuc', 'Stt'];

  onSearch(result: TagsSearchResult): void {
    console.log('Tags:', result.tags);
    console.log('Fields:', result.fields);
    
    // Build filter và call API
    const filter = buildApiFilterMultiValue(
      result.tags,
      result.fields,
      [{ field: 'TrangThai', operator: 'eq', value: 2 }]
    );
    
    this.service.getList({ filter }).subscribe(...);
  }
}
```

```html
<app-base-tags-input
  [(tags)]="searchTags"
  [searchFields]="searchFields"
  [placeholder]="'Nhập giá trị và Enter...'"
  [debounceTime]="500"
  [maxTags]="10"
  (search)="onSearch($event)"
/>
```

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tags` | `string[]` | `[]` | Mảng các tags (two-way binding) |
| `placeholder` | `string` | `'Nhập và Enter để thêm...'` | Placeholder text |
| `debounceTime` | `number` | `500` | Thời gian debounce (ms) |
| `prefixIcon` | `string` | `'search'` | Icon prefix (ng-zorro icon type) |
| `showClearButton` | `boolean` | `true` | Hiển thị nút clear all |
| `showCount` | `boolean` | `true` | Hiển thị số lượng tags |
| `disabled` | `boolean` | `false` | Disable input |
| `tagColor` | `string` | `'blue'` | Màu của tags |
| `maxTags` | `number` | `10` | Số lượng tags tối đa |
| `minTagLength` | `number` | `1` | Độ dài tối thiểu của tag |
| `searchFields` | `string[]` | `[]` | Danh sách fields để search |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `tagsChange` | `EventEmitter<string[]>` | Emit khi tags thay đổi (two-way binding) |
| `search` | `EventEmitter<TagsSearchResult>` | Emit sau khi debounce (dùng để gọi API) |

### Types

```typescript
interface TagsSearchResult {
  tags: string[];      // Mảng các tags
  fields?: string[];   // Danh sách fields để search
}
```

## Examples

### Example 1: Simple Tags Input

```html
<app-base-tags-input
  [(tags)]="tags"
  [placeholder]="'Nhập từ khóa...'"
/>
```

### Example 2: With Custom Settings

```html
<app-base-tags-input
  [(tags)]="tags"
  [maxTags]="5"
  [minTagLength]="2"
  [tagColor]="'green'"
  [showCount]="true"
  [placeholder]="'Tối đa 5 tags...'"
/>
```

### Example 3: Integrated with API Filter

```typescript
// Component
searchTags: string[] = [];
searchFields = ['TenToChuc', 'MaToChuc', 'Stt'];

loadData(tags: string[]): void {
  const filter = buildApiFilterMultiValue(
    tags.length > 0 ? tags : undefined,
    this.searchFields,
    [{ field: 'TrangThai', operator: 'notinlist', value: [6, 8, 9] }]
  );

  this.service.getList({ filter }).subscribe({
    next: (response) => {
      // Handle response
    }
  });
}

onTagsChange(tags: string[]): void {
  this.loadData(tags);
}
```

```html
<app-base-tags-input
  [(tags)]="searchTags"
  [searchFields]="searchFields"
  [placeholder]="'Nhập giá trị và Enter để thêm...'"
  (tagsChange)="onTagsChange($event)"
/>
```

### Example 4: Disabled State

```html
<app-base-tags-input
  [(tags)]="tags"
  [disabled]="loading"
  [placeholder]="'Đang tải...'"
/>
```

## Keyboard Shortcuts

- **Enter**: Thêm tag mới
- **Backspace**: Xóa tag cuối cùng (khi input rỗng)
- **Blur**: Tự động thêm tag nếu có giá trị trong input

## Filter Logic

Khi sử dụng với `searchFields`, component sẽ tạo filter với logic OR:

**Input tags:** `["phong", "ban", "01"]`

**Filter logic:**
```
(TenToChuc contains "phong" OR MaToChuc contains "phong" OR Stt contains "phong")
OR
(TenToChuc contains "ban" OR MaToChuc contains "ban" OR Stt contains "ban")
OR
(TenToChuc contains "01" OR MaToChuc contains "01" OR Stt contains "01")
```

## Styling

Component sử dụng ng-zorro-antd styling và có thể customize thông qua:
- `tagColor`: Màu của tags
- CSS variables (nếu cần override)

## Notes

- Component tự động debounce, không cần xử lý debounce ở parent
- Tags không được trùng lặp
- Clear button chỉ hiển thị khi có tags
- Tự động focus vào input sau khi thêm/xóa tag
- Sử dụng `distinctUntilChanged` để tránh emit duplicate values
