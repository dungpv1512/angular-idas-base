# Base Search Component

Component tìm kiếm có thể tái sử dụng với tính năng debounce tích hợp sẵn.

## Features

- ✅ Debounce search (mặc định 500ms)
- ✅ Clear button tự động hiển thị
- ✅ Two-way binding với `[(value)]`
- ✅ Customizable size, placeholder, icon
- ✅ Emit event khi search
- ✅ Disabled state support

## Usage

### Basic Example

```typescript
import { IdasSearchComponent } from '@app/shared/components/idas-search/base-search.component';

@Component({
  imports: [IdasSearchComponent]
})
export class MyComponent {
  searchText = '';

  onSearch(value: string): void {
    console.log('Search:', value);
    // Call API with search value
  }
}
```

```html
<app-base-search
  [(value)]="searchText"
  [placeholder]="'Tìm kiếm...'"
  (search)="onSearch($event)"
/>
```

### Advanced Example

```html
<app-base-search
  [(value)]="searchText"
  [placeholder]="'Tìm kiếm theo tên hoặc mã...'"
  [debounceTime]="300"
  [size]="'large'"
  [prefixIcon]="'search'"
  [showClearButton]="true"
  [disabled]="loading"
  (search)="onSearch($event)"
/>
```

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | Giá trị search (two-way binding) |
| `placeholder` | `string` | `'Tìm kiếm...'` | Placeholder text |
| `debounceTime` | `number` | `500` | Thời gian debounce (ms) |
| `size` | `'large' \| 'default' \| 'small'` | `'default'` | Kích thước input |
| `prefixIcon` | `string` | `'search'` | Icon prefix (ng-zorro icon type) |
| `showClearButton` | `boolean` | `true` | Hiển thị nút clear |
| `disabled` | `boolean` | `false` | Disable input |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `valueChange` | `EventEmitter<string>` | Emit khi value thay đổi (two-way binding) |
| `search` | `EventEmitter<string>` | Emit sau khi debounce (dùng để gọi API) |

## Examples

### Example 1: Simple Search

```html
<app-base-search
  [(value)]="searchText"
  (search)="loadData($event)"
/>
```

### Example 2: Large Search with Custom Debounce

```html
<app-base-search
  [(value)]="searchText"
  [size]="'large'"
  [debounceTime]="300"
  [placeholder]="'Tìm kiếm sản phẩm...'"
  (search)="searchProducts($event)"
/>
```

### Example 3: Search with Custom Icon

```html
<app-base-search
  [(value)]="searchText"
  [prefixIcon]="'user'"
  [placeholder]="'Tìm kiếm người dùng...'"
  (search)="searchUsers($event)"
/>
```

### Example 4: Disabled State

```html
<app-base-search
  [(value)]="searchText"
  [disabled]="loading"
  [placeholder]="'Đang tải...'"
  (search)="onSearch($event)"
/>
```

### Example 5: Multi-Value Search ⭐ (Recommended)

Tìm kiếm với nhiều giá trị cùng lúc, mỗi giá trị sẽ được tìm trong tất cả các fields.

```typescript
// Component
searchFields = ['TenToChuc', 'MaToChuc', 'Stt'];

onSearch(searchValue: string): void {
  // Parse thành mảng các giá trị
  const searchValues = searchValue.trim()
    ? searchValue.trim().split(' ').filter(v => v.length > 0)
    : undefined;
  
  // Build filter với helper function
  const filter = buildApiFilterMultiValue(
    searchValues,
    this.searchFields,
    [{ field: 'TrangThai', operator: 'notinlist', value: [6, 8, 9] }]
  );
  
  this.service.getList({ filter }).subscribe(...);
}
```

```html
<app-base-search
  [(value)]="searchText"
  [searchFields]="searchFields"
  [multiValue]="true"
  [separator]="' '"
  [placeholder]="'Tìm kiếm nhiều giá trị (cách nhau bởi dấu cách)...'"
  (search)="onSearch($event)"
/>
```

**Ví dụ:**
- Input: `"phong ban 01"`
- Parsed values: `["phong", "ban", "01"]`
- Filter logic:
  ```
  (TenToChuc contains "phong" OR MaToChuc contains "phong" OR Stt contains "phong")
  OR (TenToChuc contains "ban" OR MaToChuc contains "ban" OR Stt contains "ban")
  OR (TenToChuc contains "01" OR MaToChuc contains "01" OR Stt contains "01")
  ```

### Example 6: Using searchWithFields Event

```typescript
import { SearchResult } from '@app/shared/components/idas-search/base-search.component';

onSearchWithFields(result: SearchResult): void {
  console.log('Search value:', result.value);
  console.log('Search fields:', result.fields);
  
  // result.fields = ['TenToChuc', 'MaToChuc', 'Stt']
  // Tự động build OR filter cho các fields này
}
```

```html
<app-base-search
  [(value)]="searchText"
  [searchFields]="['TenToChuc', 'MaToChuc']"
  (searchWithFields)="onSearchWithFields($event)"
/>
```

## Notes

- Component tự động debounce, không cần xử lý debounce ở parent component
- Clear button chỉ hiển thị khi có text
- Click clear button sẽ emit event `search` với giá trị rỗng
- Sử dụng `distinctUntilChanged` để tránh emit duplicate values
- **Multi-field search**: Khi set `searchFields`, component sẽ emit cả `search` và `searchWithFields` events
- **Filter Utils**: Sử dụng `buildApiFilter` từ `@app/shared/utils/filter.utils` để build filter động với OR condition
