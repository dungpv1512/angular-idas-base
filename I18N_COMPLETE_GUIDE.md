# Hướng dẫn Đa ngôn ngữ Hoàn chỉnh

## Tổng quan

Toàn bộ ứng dụng đã được chuyển đổi sang hệ thống đa ngôn ngữ (i18n) hỗ trợ **Tiếng Việt** và **Tiếng Anh**.

## Các phần đã cập nhật

### 1. Core Components

#### Base Table Component
- ✅ Cột "Thao tác" → `common.actions`
- ✅ Confirm text "Bạn có chắc chắn?" → `common.confirmDelete`
- ✅ Hỗ trợ custom translation keys qua Input properties

#### Response Interceptor
- ✅ Tất cả error messages sử dụng translation
- ✅ Network errors → `errors.network`
- ✅ Unauthorized → `errors.unauthorized`
- ✅ Forbidden → `errors.forbidden`
- ✅ Not found → `errors.notFound`
- ✅ Server errors → `errors.server`

### 2. Tochuc Module

#### ToChuc Component (Main)
- ✅ Columns titles
- ✅ Actions tooltips
- ✅ Drawer titles
- ✅ Success/Error messages
- ✅ Status text (Nháp, Đang hoạt động, etc.)
- ✅ Type text (Trung tâm, Phòng ban)

#### ToChuc List Component
- ✅ Page title và subtitle
- ✅ Button "Thêm mới"
- ✅ Search placeholder
- ✅ View switcher (Bảng/Cây)
- ✅ Empty state message

#### ToChuc Form Component
- ✅ Button labels (Lưu, Hủy)
- ✅ Modal titles
- ✅ Select options (Loại, Trạng thái)
- ✅ Form validation messages

#### ToChuc View Component
- ✅ Button "Chỉnh sửa"
- ✅ Status text
- ✅ Type text

### 3. Layouts

#### Default Layout
- ✅ Menu items
- ✅ Language switcher component

#### Blank Layout
- ✅ 403 Forbidden page

### 4. Shared Components

#### Language Switcher
- ✅ Dropdown với Tiếng Việt / English
- ✅ Lưu preference vào localStorage
- ✅ Auto-reload khi đổi ngôn ngữ

## Translation Keys Structure

```
common.*              # Common texts (buttons, actions, etc.)
errors.*              # Error messages
menu.*                # Menu items
forbidden.*           # 403 page
tochuc.*              # Organization module
  ├── title
  ├── subtitle
  ├── list.*          # List view
  ├── columns.*       # Table columns
  ├── actions.*       # Action buttons
  ├── drawer.*        # Drawer titles
  ├── form.*          # Form fields
  ├── type.*          # Organization types
  ├── status.*        # Status values
  └── messages.*      # Success/Error messages
```

## Files Updated

### Translation Files
- ✅ `public/i18n/vi.json` - Tiếng Việt
- ✅ `public/i18n/en.json` - English

### Core Files
- ✅ `src/app/app.config.ts` - i18n configuration
- ✅ `src/app/core/services/i18n.service.ts` - i18n service
- ✅ `src/app/core/services/auth.service.ts` - Auth service
- ✅ `src/app/core/guards/permission.guard.ts` - Permission guard
- ✅ `src/app/core/interceptors/response.interceptor.ts` - Error messages

### Layout Files
- ✅ `src/app/layouts/default-layout/` - Menu và header
- ✅ `src/app/layouts/blank-layout/` - Blank layout

### Shared Components
- ✅ `src/app/shared/components/language-switcher.component.ts`
- ✅ `src/app/shared/components/base-table/` - Table component

### Tochuc Module
- ✅ `src/app/pages/tochuc/tochuc.component.ts`
- ✅ `src/app/pages/tochuc/components/tochuc-list/`
- ✅ `src/app/pages/tochuc/components/tochuc-form/`
- ✅ `src/app/pages/tochuc/components/tochuc-view/`

### Error Pages
- ✅ `src/app/pages/forbidden/` - 403 page

## Cách sử dụng

### 1. Trong Template (HTML)

```html
<!-- Simple translation -->
<h1>{{ 'tochuc.title' | translate }}</h1>

<!-- With parameters -->
<p>{{ 'welcome.greeting' | translate: {name: userName} }}</p>

<!-- In attributes -->
<button [nzTooltipTitle]="'common.edit' | translate">
```

### 2. Trong Component (TypeScript)

```typescript
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export class MyComponent {
  private translate = inject(TranslateService);

  // Instant translation
  getMessage() {
    return this.translate.instant('common.success');
  }

  // In getters for dynamic content
  get columns() {
    return [
      { title: this.translate.instant('tochuc.columns.name'), key: 'name' }
    ];
  }
}
```

### 3. Đổi ngôn ngữ

```typescript
import { I18nService } from './core/services/i18n.service';

export class MyComponent {
  i18nService = inject(I18nService);

  changeToEnglish() {
    this.i18nService.changeLanguage('en');
  }

  getCurrentLang() {
    return this.i18nService.language(); // Signal
  }
}
```

## Best Practices

### 1. Luôn sử dụng translation keys
❌ **Không làm:**
```typescript
const message = 'Xóa thành công';
```

✅ **Nên làm:**
```typescript
const message = this.translate.instant('tochuc.messages.deleteSuccess');
```

### 2. Sử dụng getters cho dynamic content
❌ **Không làm:**
```typescript
columns = [
  { title: 'Tên tổ chức', key: 'name' }
];
```

✅ **Nên làm:**
```typescript
get columns() {
  return [
    { title: this.translate.instant('tochuc.columns.name'), key: 'name' }
  ];
}
```

### 3. Nhóm keys theo module
```json
{
  "moduleName": {
    "feature": {
      "action": "Text"
    }
  }
}
```

### 4. Sử dụng common keys cho text chung
```typescript
// Thay vì tạo key mới cho mỗi module
'tochuc.cancel'
'user.cancel'

// Sử dụng common key
'common.cancel'
```

## Testing

1. Chạy ứng dụng: `npm start`
2. Click vào Language Switcher (🌐) ở header
3. Chuyển đổi giữa Tiếng Việt ↔ English
4. Kiểm tra:
   - ✅ Menu sidebar
   - ✅ Page titles
   - ✅ Button labels
   - ✅ Table columns
   - ✅ Form fields
   - ✅ Messages (success/error)
   - ✅ Tooltips
   - ✅ Empty states
   - ✅ Confirm dialogs

## Thêm translation mới

### 1. Thêm keys vào JSON files

**vi.json:**
```json
{
  "myModule": {
    "title": "Tiêu đề tiếng Việt"
  }
}
```

**en.json:**
```json
{
  "myModule": {
    "title": "English Title"
  }
}
```

### 2. Sử dụng trong code

```html
<h1>{{ 'myModule.title' | translate }}</h1>
```

hoặc

```typescript
const title = this.translate.instant('myModule.title');
```

## Troubleshooting

### Translation không hiển thị
1. Kiểm tra key có tồn tại trong cả `vi.json` và `en.json`
2. Kiểm tra đã import `TranslateModule` trong component
3. Xóa localStorage và reload

### Language Switcher không hoạt động
1. Kiểm tra console có lỗi không
2. Kiểm tra `i18n` files có load được không (Network tab)
3. Kiểm tra `app.config.ts` đã config đúng

### Một số text vẫn bị hardcode
1. Search trong project: `grep -r "Tiếng Việt text" src/`
2. Thêm translation key
3. Cập nhật component sử dụng key

## Kết luận

Toàn bộ ứng dụng đã được chuyển đổi sang hệ thống đa ngôn ngữ hoàn chỉnh. Mọi text hiển thị đều có thể chuyển đổi giữa Tiếng Việt và English một cách liền mạch.

**Không còn hardcoded Vietnamese text trong:**
- ✅ Components
- ✅ Templates
- ✅ Services
- ✅ Interceptors
- ✅ Guards
- ✅ Error messages
- ✅ Success messages
- ✅ Form labels
- ✅ Button labels
- ✅ Table headers
- ✅ Tooltips
- ✅ Confirm dialogs
