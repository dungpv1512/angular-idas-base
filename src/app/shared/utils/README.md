# Filter Utils

Utility functions để build API filters một cách dễ dàng và nhất quán.

## Functions

### `buildSearchFilter(searchValue, fields, operator?)`

Build search filter với nhiều fields (OR condition).

**Parameters:**
- `searchValue: string` - Giá trị search
- `fields: string[]` - Danh sách fields để search
- `operator?: string` - Operator (mặc định: 'contains')

**Returns:** `FilterGroup` với logic OR

**Example:**
```typescript
import { buildSearchFilter } from '@app/shared/utils/filter.utils';

const filter = buildSearchFilter('test', ['TenToChuc', 'MaToChuc']);

// Result:
// {
//   logic: 'or',
//   filters: [
//     { field: 'TenToChuc', operator: 'contains', value: 'test' },
//     { field: 'MaToChuc', operator: 'contains', value: 'test' }
//   ]
// }
```

### `buildFilterWithSearch(baseFilters, searchValue?, searchFields?)`

Build filter kết hợp base conditions và search.

**Parameters:**
- `baseFilters: FilterGroup` - Base filters
- `searchValue?: string` - Giá trị search
- `searchFields?: string[]` - Danh sách fields để search

**Returns:** `FilterGroup` kết hợp base và search filters

**Example:**
```typescript
import { buildFilterWithSearch } from '@app/shared/utils/filter.utils';

const baseFilters = {
  logic: 'and',
  filters: [
    { field: 'TrangThai', operator: 'notinlist', value: [6, 8, 9] }
  ]
};

const filter = buildFilterWithSearch(
  baseFilters,
  'test',
  ['TenToChuc', 'MaToChuc']
);

// Result:
// {
//   logic: 'and',
//   filters: [
//     {
//       logic: 'and',
//       filters: [
//         { field: 'TrangThai', operator: 'notinlist', value: [6, 8, 9] }
//       ]
//     },
//     {
//       logic: 'or',
//       filters: [
//         { field: 'TenToChuc', operator: 'contains', value: 'test' },
//         { field: 'MaToChuc', operator: 'contains', value: 'test' }
//       ]
//     }
//   ]
// }
```

### `buildApiFilter(searchValue?, searchFields?, baseConditions?)` ⭐ Recommended

Build complete API filter request - Cách dễ nhất để build filter.

**Parameters:**
- `searchValue?: string` - Giá trị search
- `searchFields?: string[]` - Danh sách fields để search
- `baseConditions?: FilterCondition[]` - Base conditions

**Returns:** `FilterGroup | undefined` - Complete filter ready for API

**Example:**
```typescript
import { buildApiFilter } from '@app/shared/utils/filter.utils';

// Example 1: Chỉ có base conditions
const filter1 = buildApiFilter(
  undefined,
  undefined,
  [{ field: 'TrangThai', operator: 'eq', value: 2 }]
);

// Example 2: Chỉ có search
const filter2 = buildApiFilter(
  'test',
  ['TenToChuc', 'MaToChuc']
);

// Example 3: Kết hợp cả hai (Most common)
const filter3 = buildApiFilter(
  'test',
  ['TenToChuc', 'MaToChuc', 'Stt'],
  [{ field: 'TrangThai', operator: 'notinlist', value: [6, 8, 9] }]
);

// Sử dụng với API
this.service.getList({ filter: filter3 }).subscribe(...);
```

## Complete Example - Single Value Search

```typescript
import { Component, OnInit } from '@angular/core';
import { buildApiFilter } from '@app/shared/utils/filter.utils';

@Component({...})
export class MyComponent implements OnInit {
  searchFields = ['TenToChuc', 'MaToChuc', 'Stt'];
  
  ngOnInit(): void {
    this.loadData();
  }

  loadData(searchText?: string): void {
    // Build filter với helper function
    const apiFilter = buildApiFilter(
      searchText,
      this.searchFields,
      [
        { field: 'TrangThai', operator: 'notinlist', value: [6, 8, 9] },
        { field: 'Loai', operator: 'eq', value: 1 }
      ]
    );

    const requestBody: any = {
      all: true,
      UseCache: false
    };

    if (apiFilter) {
      requestBody.filter = apiFilter;
    }

    this.service.getList(requestBody).subscribe({
      next: (response) => {
        // Handle response
      }
    });
  }

  onSearch(searchValue: string): void {
    this.loadData(searchValue);
  }
}
```

## Complete Example - Multi-Value Search ⭐ (Recommended)

```typescript
import { Component, OnInit } from '@angular/core';
import { buildApiFilterMultiValue } from '@app/shared/utils/filter.utils';

@Component({...})
export class MyComponent implements OnInit {
  searchFields = ['TenToChuc', 'MaToChuc', 'Stt'];
  
  ngOnInit(): void {
    this.loadData();
  }

  loadData(searchText?: string): void {
    // Parse search text thành mảng các giá trị
    const searchValues = searchText && searchText.trim()
      ? searchText.trim().split(' ').filter(v => v.length > 0)
      : undefined;
    
    // Build filter với helper function (multi-value)
    const apiFilter = buildApiFilterMultiValue(
      searchValues,
      this.searchFields,
      [
        { field: 'TrangThai', operator: 'notinlist', value: [6, 8, 9] },
        { field: 'Loai', operator: 'eq', value: 1 }
      ]
    );

    const requestBody: any = {
      all: true,
      UseCache: false
    };

    if (apiFilter) {
      requestBody.filter = apiFilter;
    }

    this.service.getList(requestBody).subscribe({
      next: (response) => {
        // Handle response
      }
    });
  }

  onSearch(searchValue: string): void {
    this.loadData(searchValue);
  }
}
```

**Ví dụ Multi-Value Search:**
- User nhập: `"phong ban 01"`
- Parsed values: `["phong", "ban", "01"]`
- Filter sẽ tìm records có:
  - (TenToChuc contains "phong" OR MaToChuc contains "phong" OR Stt contains "phong")
  - OR (TenToChuc contains "ban" OR MaToChuc contains "ban" OR Stt contains "ban")
  - OR (TenToChuc contains "01" OR MaToChuc contains "01" OR Stt contains "01")

## API Filter Structure

Filter structure theo chuẩn Kendo UI DataSource:

```typescript
interface FilterCondition {
  field: string;      // Tên field
  operator: string;   // 'eq', 'neq', 'contains', 'startswith', 'endswith', 'gt', 'gte', 'lt', 'lte', 'isnull', 'isnotnull', 'inlist', 'notinlist'
  value: any;         // Giá trị filter
}

interface FilterGroup {
  logic: 'and' | 'or';  // Logic kết hợp
  filters: (FilterCondition | FilterGroup)[];  // Nested filters
}
```

## Common Operators

- `eq` - Equal
- `neq` - Not equal
- `contains` - Contains (for strings)
- `startswith` - Starts with
- `endswith` - Ends with
- `gt` - Greater than
- `gte` - Greater than or equal
- `lt` - Less than
- `lte` - Less than or equal
- `isnull` - Is null
- `isnotnull` - Is not null
- `inlist` - In list
- `notinlist` - Not in list

## Best Practices

1. **Sử dụng `buildApiFilter`** cho hầu hết các trường hợp - đơn giản và dễ maintain
2. **Define searchFields** ở component level để dễ quản lý
3. **Base conditions** nên là những điều kiện cố định (ví dụ: TrangThai filter)
4. **Search fields** nên là những field có ý nghĩa cho user search (tên, mã, số thứ tự...)
5. **Operator 'contains'** phù hợp nhất cho text search
