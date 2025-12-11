# Thay đổi trong Implementation

## 🎯 Mục tiêu

Tạo component chọn tổ chức **TÁI SỬ DỤNG** hoàn toàn `ToChucListComponent` thay vì duplicate HTML/CSS.

## ✅ Giải pháp

### 1. Mở rộng ToChucListComponent

Thêm các Input để customize component:

```typescript
// src/app/pages/tochuc/components/tochuc-list/tochuc-list.component.ts

// NEW INPUTS
@Input() title = 'Quản lý Tổ chức';
@Input() subtitle = 'Quản lý cấu trúc tổ chức và phòng ban';
@Input() showCreateButton = true;      // Ẩn/hiện nút "Thêm mới"
@Input() showActions = true;           // Ẩn/hiện cột thao tác
@Input() checkable = false;            // Bật checkbox selection
@Input() checkedKeys: string[] = [];   // Checked keys cho tree
@Input() scroll: { x?: string; y?: string } = { y: 'calc(-445px + 100vh)' };

// NEW OUTPUT
@Output() checkChange = new EventEmitter<any>(); // Emit khi checkbox change
```

### 2. Cập nhật HTML của ToChucListComponent

```html
<!-- Conditional render nút "Thêm mới" -->
@if (showCreateButton) {
  <div class="header-actions">
    <button nz-button nzType="primary" nzSize="large" (click)="onCreateClick()">
      <span nz-icon nzType="plus"></span>
      Thêm mới
    </button>
  </div>
}

<!-- Dynamic title/subtitle -->
<h1>{{ title }}</h1>
<p class="subtitle">{{ subtitle }}</p>

<!-- Pass checkable to tree -->
<app-base-tree 
  [checkable]="checkable" 
  [checkedKeys]="checkedKeys"
  (nzCheckBoxChange)="onCheckChange($event)"
/>

<!-- Hide actions column -->
<app-base-table 
  [actions]="displayActions"  <!-- Returns [] if showActions = false -->
/>
```

### 3. Tạo ToChucSelectorComponent (Wrapper)

Component này **wrap** `ToChucListComponent` và chỉ thêm:
- Selection info bar
- Logic xử lý selection
- Emit selected items

```typescript
// src/app/pages/tochuc/components/tochuc-selector/tochuc-selector.component.ts

@Component({
  selector: 'app-tochuc-selector',
  imports: [
    CommonModule,
    NzButtonModule,
    NzSpaceModule,
    ToChucListComponent  // ← Reuse!
  ],
  template: `
    <!-- Selection info bar -->
    @if (selectedCount > 0) {
      <div class="selection-info-bar">...</div>
    }

    <!-- Reuse ToChucListComponent -->
    <app-tochuc-list
      [showCreateButton]="false"
      [showActions]="false"
      [checkable]="true"
      [checkedKeys]="checkedKeys"
      (checkChange)="onCheckChange($event)"
    />
  `
})
export class ToChucSelectorComponent {
  // Chỉ xử lý logic selection, không duplicate UI
}
```

## 📊 So sánh

### ❌ Cách cũ (Duplicate)
```
ToChucListComponent
  ├── HTML (500 lines)
  └── CSS (200 lines)

ToChucSelectorComponent
  ├── HTML (500 lines) ← DUPLICATE!
  └── CSS (200 lines) ← DUPLICATE!
```

### ✅ Cách mới (Reuse)
```
ToChucListComponent (Extended)
  ├── HTML (500 lines)
  ├── CSS (200 lines)
  └── + Customization Inputs

ToChucSelectorComponent (Wrapper)
  ├── HTML (20 lines) ← Chỉ wrap!
  ├── CSS (50 lines) ← Chỉ selection bar!
  └── Logic selection
```

## 🎁 Lợi ích

1. **Không duplicate code**: Tái sử dụng 100% HTML/CSS
2. **Dễ maintain**: Sửa UI ở 1 chỗ → apply cho cả 2 components
3. **Lightweight**: ToChucSelectorComponent chỉ ~100 lines
4. **Flexible**: ToChucListComponent vẫn hoạt động độc lập
5. **Không xung đột**: Dùng nhiều instances trên cùng màn hình

## 📝 Files đã thay đổi

### Modified
- `src/app/pages/tochuc/components/tochuc-list/tochuc-list.component.ts`
- `src/app/pages/tochuc/components/tochuc-list/tochuc-list.component.html`

### Created
- `src/app/pages/tochuc/components/tochuc-selector/tochuc-selector.component.ts`
- `src/app/pages/tochuc/components/tochuc-selector/tochuc-selector.component.html`
- `src/app/pages/tochuc/components/tochuc-selector/tochuc-selector.component.less`
- `src/app/pages/tochuc/components/tochuc-selector/README.md`
- `src/app/pages/tochuc/components/tochuc-selector/QUICK_START.md`
- `src/app/pages/tochuc/components/tochuc-selector/USAGE_EXAMPLE.md`
- `src/app/pages/tochuc/components/tochuc-selector/tochuc-selector-demo.component.ts`

## ✅ Backward Compatibility

Các thay đổi trong `ToChucListComponent` **không ảnh hưởng** đến code hiện tại vì:
- Tất cả Input mới đều có default values
- Component cha (`tochuc.component.ts`) không cần sửa
- Behavior mặc định giữ nguyên như cũ
