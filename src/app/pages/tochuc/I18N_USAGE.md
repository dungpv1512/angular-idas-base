# Hướng dẫn sử dụng i18n trong Module Tochuc

## Đã cập nhật

Module Tochuc đã được cập nhật để hỗ trợ đa ngôn ngữ (Tiếng Việt / English).

### Files đã cập nhật:

1. **tochuc.component.ts**
   - Import `TranslateModule` và `TranslateService`
   - Chuyển `columns` và `actions` thành getters để dynamic translation
   - Cập nhật tất cả messages sử dụng `translate.instant()`
   - Cập nhật status text và type text

2. **tochuc-list.component.ts**
   - Import `TranslateModule`
   - Cập nhật default values cho `title` và `subtitle`
   - Sử dụng translation keys thay vì hardcoded text

3. **tochuc-list.component.html**
   - Thêm `| translate` pipe cho tất cả text
   - Cập nhật placeholder, button labels, empty state

## Translation Keys

Tất cả translation keys cho module tochuc được định nghĩa trong:
- `public/i18n/vi.json` - Tiếng Việt
- `public/i18n/en.json` - English

### Cấu trúc keys:

```
tochuc.
├── title                    # Tiêu đề module
├── subtitle                 # Mô tả module
├── list.
│   ├── searchPlaceholder   # Placeholder search
│   ├── viewTable           # Label view table
│   └── viewTree            # Label view tree
├── columns.                # Tên các cột
│   ├── stt
│   ├── name
│   ├── type
│   ├── status
│   └── updatedBy
├── actions.                # Labels cho actions
│   ├── view
│   ├── edit
│   ├── delete
│   └── create
├── drawer.                 # Titles cho drawer
│   ├── create
│   ├── edit
│   └── view
├── type.                   # Loại tổ chức
│   ├── center
│   └── department
├── status.                 # Trạng thái
│   ├── draft
│   ├── active
│   ├── paused
│   ├── approved
│   └── cancelled
└── messages.               # Thông báo
    ├── loadError
    ├── deleteConfirm
    ├── deleteSuccess
    ├── deleteError
    ├── createSuccess
    ├── updateSuccess
    └── saveError
```

## Cách sử dụng

### 1. Trong Template (HTML)

```html
<!-- Sử dụng pipe -->
<h1>{{ 'tochuc.title' | translate }}</h1>
<button>{{ 'tochuc.actions.create' | translate }}</button>
```

### 2. Trong Component (TypeScript)

```typescript
// Inject TranslateService
private translate = inject(TranslateService);

// Sử dụng instant()
this.message.success(this.translate.instant('tochuc.messages.createSuccess'));

// Trong getter
get columns(): TableColumn[] {
  return [
    { 
      title: this.translate.instant('tochuc.columns.name'), 
      key: 'TenToChuc' 
    }
  ];
}
```

### 3. Dynamic Translation

Khi cần translate dựa trên giá trị:

```typescript
// Status mapping
getTrangThaiText(status: number): string {
  const statusMap: { [key: number]: string } = {
    1: this.translate.instant('tochuc.status.draft'),
    2: this.translate.instant('tochuc.status.active'),
    // ...
  };
  return statusMap[status] || this.translate.instant('common.unknown');
}

// Type mapping
const typeText = this.translate.instant(
  item.Loai === 1 ? 'tochuc.type.center' : 'tochuc.type.department'
);
```

## Test

1. Chạy ứng dụng: `npm start`
2. Truy cập `/tochuc`
3. Click vào Language Switcher ở header
4. Chuyển đổi giữa Tiếng Việt và English
5. Kiểm tra:
   - Tiêu đề trang
   - Tên cột trong bảng
   - Button labels
   - Messages (success/error)
   - Tooltips
   - Empty states
   - Drawer titles

## Lưu ý

- Tất cả text hiển thị đều phải qua translation
- Không hardcode text tiếng Việt hoặc tiếng Anh
- Sử dụng `translate.instant()` cho dynamic content
- Sử dụng `| translate` pipe trong template
- Nhớ import `TranslateModule` trong component
