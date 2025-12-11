# Hướng dẫn Đa ngôn ngữ (i18n)

## Tổng quan

Hệ thống đa ngôn ngữ hỗ trợ **Tiếng Việt** và **Tiếng Anh** sử dụng `@ngx-translate/core`.

## Cấu trúc

```
public/i18n/
├── vi.json    # Tiếng Việt
└── en.json    # English
```

## Sử dụng

### 1. Trong Template (HTML)

```html
<!-- Sử dụng pipe translate -->
<h1>{{ 'common.home' | translate }}</h1>
<p>{{ 'forbidden.subtitle' | translate }}</p>

<!-- Với parameters -->
<p>{{ 'welcome.greeting' | translate: {name: userName} }}</p>
```

### 2. Trong Component (TypeScript)

```typescript
import { Component, inject } from '@angular/core';
import { I18nService } from './core/services/i18n.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [TranslateModule],
  template: `...`
})
export class MyComponent {
  i18nService = inject(I18nService);

  // Lấy ngôn ngữ hiện tại
  currentLang = this.i18nService.language(); // Signal: 'vi' | 'en'

  // Đổi ngôn ngữ
  changeToEnglish() {
    this.i18nService.changeLanguage('en');
  }

  // Translate instant (không async)
  getTranslation() {
    return this.i18nService.instant('common.home');
  }
}
```

### 3. Language Switcher Component

Component có sẵn để chuyển đổi ngôn ngữ:

```typescript
import { LanguageSwitcherComponent } from './shared/components/language-switcher.component';

@Component({
  imports: [LanguageSwitcherComponent],
  template: `
    <!-- Hiển thị dropdown chuyển ngôn ngữ -->
    <app-language-switcher />
  `
})
```

## Thêm Translation Keys

### 1. Thêm vào file JSON

**public/i18n/vi.json:**
```json
{
  "myModule": {
    "title": "Tiêu đề của tôi",
    "description": "Mô tả chi tiết",
    "button": {
      "save": "Lưu",
      "cancel": "Hủy"
    }
  }
}
```

**public/i18n/en.json:**
```json
{
  "myModule": {
    "title": "My Title",
    "description": "Detailed description",
    "button": {
      "save": "Save",
      "cancel": "Cancel"
    }
  }
}
```

### 2. Sử dụng trong code

```html
<h1>{{ 'myModule.title' | translate }}</h1>
<p>{{ 'myModule.description' | translate }}</p>
<button>{{ 'myModule.button.save' | translate }}</button>
<button>{{ 'myModule.button.cancel' | translate }}</button>
```

## Translation Keys có sẵn

### common
- `common.home` - Trang chủ / Home
- `common.back` - Quay lại / Back
- `common.language` - Ngôn ngữ / Language
- `common.vietnamese` - Tiếng Việt / Vietnamese
- `common.english` - Tiếng Anh / English
- `common.create` - Thêm mới / Create
- `common.edit` - Sửa / Edit
- `common.delete` - Xóa / Delete
- `common.view` - Xem / View
- `common.save` - Lưu / Save
- `common.cancel` - Hủy / Cancel
- `common.search` - Tìm kiếm / Search
- `common.table` - Bảng / Table
- `common.tree` - Cây / Tree
- `common.notFound` - Không tìm thấy kết quả / No results found
- `common.unknown` - Không xác định / Unknown
- `common.none` - Không có / None

### forbidden (Trang 403)
- `forbidden.title` - 403
- `forbidden.subtitle` - Xin lỗi... / Sorry...
- `forbidden.goHome` - Về trang chủ / Go Home
- `forbidden.goBack` - Quay lại / Go Back

### menu
- `menu.welcome` - Chào mừng / Welcome
- `menu.tochuc` - Quản lý Tổ chức / Organization Management
- `menu.demo` - Demo Components
- `menu.virtualTable` - Virtual Table Demo

### tochuc (Module Quản lý Tổ chức)
- `tochuc.title` - Quản lý Tổ chức / Organization Management
- `tochuc.subtitle` - Quản lý thông tin tổ chức, phòng ban / Manage organization and department information
- `tochuc.list.searchPlaceholder` - Nhập giá trị và Enter... / Enter value and press Enter...
- `tochuc.columns.stt` - STT / No.
- `tochuc.columns.name` - Tên tổ chức / Organization Name
- `tochuc.columns.type` - Loại / Type
- `tochuc.columns.status` - Trạng thái / Status
- `tochuc.columns.updatedBy` - Người cập nhật / Updated By
- `tochuc.actions.view` - Xem / View
- `tochuc.actions.edit` - Sửa / Edit
- `tochuc.actions.delete` - Xóa / Delete
- `tochuc.actions.create` - Thêm mới / Create
- `tochuc.drawer.create` - Thêm mới tổ chức / Create Organization
- `tochuc.drawer.edit` - Chỉnh sửa tổ chức / Edit Organization
- `tochuc.drawer.view` - Chi tiết tổ chức / Organization Details
- `tochuc.type.center` - Trung tâm / Center
- `tochuc.type.department` - Phòng ban / Department
- `tochuc.status.draft` - Nháp / Draft
- `tochuc.status.active` - Đang hoạt động / Active
- `tochuc.status.paused` - Tạm dừng / Paused
- `tochuc.status.approved` - Đã duyệt / Approved
- `tochuc.status.cancelled` - Đã hủy / Cancelled
- `tochuc.messages.loadError` - Không thể tải dữ liệu / Unable to load data
- `tochuc.messages.deleteConfirm` - Bạn có chắc muốn xóa... / Are you sure...
- `tochuc.messages.deleteSuccess` - Xóa thành công / Deleted successfully
- `tochuc.messages.deleteError` - Xóa thất bại / Delete failed
- `tochuc.messages.createSuccess` - Thêm mới thành công / Created successfully
- `tochuc.messages.updateSuccess` - Cập nhật thành công / Updated successfully
- `tochuc.messages.saveError` - Có lỗi xảy ra / An error occurred

## Lưu ý

1. **Ngôn ngữ mặc định**: Tiếng Việt (`vi`)
2. **Lưu trữ**: Ngôn ngữ được lưu trong `localStorage` với key `app-language`
3. **Reload**: Không cần reload trang khi đổi ngôn ngữ
4. **Signal**: `i18nService.language()` là signal, tự động update UI

## Best Practices

1. **Đặt tên key rõ ràng**: Sử dụng cấu trúc module.feature.action
   ```
   user.profile.edit
   user.profile.delete
   product.list.title
   ```

2. **Nhóm theo module**: Tổ chức keys theo module/feature
   ```json
   {
     "user": { ... },
     "product": { ... },
     "order": { ... }
   }
   ```

3. **Sử dụng parameters**: Cho dynamic content
   ```json
   {
     "welcome": "Xin chào {{name}}!"
   }
   ```
   ```html
   {{ 'welcome' | translate: {name: userName} }}
   ```

4. **Import TranslateModule**: Nhớ import trong standalone component
   ```typescript
   imports: [TranslateModule]
   ```

## Troubleshooting

### Translation không hiển thị
- Kiểm tra file JSON có đúng format không
- Kiểm tra key có tồn tại trong cả `vi.json` và `en.json`
- Kiểm tra đã import `TranslateModule` trong component

### Language Switcher không hoạt động
- Kiểm tra đã import `LanguageSwitcherComponent`
- Kiểm tra console có lỗi không
- Xóa localStorage và thử lại

### File JSON không load
- Kiểm tra path: `public/i18n/vi.json` và `public/i18n/en.json`
- Kiểm tra config trong `app.config.ts`
- Kiểm tra network tab trong DevTools
