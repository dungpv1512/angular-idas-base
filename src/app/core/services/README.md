# Core Services

## I18nService

Service quản lý đa ngôn ngữ (Tiếng Việt / English).

### Sử dụng trong Component

```typescript
import { Component, inject } from '@angular/core';
import { I18nService } from './core/services/i18n.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [TranslateModule],
  template: `
    <!-- Sử dụng pipe -->
    <h1>{{ 'common.home' | translate }}</h1>
    
    <!-- Sử dụng service -->
    <button (click)="changeToEnglish()">English</button>
  `
})
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

### Thêm Translation Keys

Chỉnh sửa file `public/i18n/vi.json` và `public/i18n/en.json`:

```json
{
  "myModule": {
    "title": "Tiêu đề",
    "description": "Mô tả"
  }
}
```

### Language Switcher Component

Component có sẵn để chuyển đổi ngôn ngữ:

```typescript
import { LanguageSwitcherComponent } from './shared/components/language-switcher.component';

@Component({
  imports: [LanguageSwitcherComponent],
  template: `<app-language-switcher />`
})
```

## AuthService

Service quản lý authentication và permissions.

### Kiểm tra quyền

```typescript
import { inject } from '@angular/core';
import { AuthService } from './core/services/auth.service';

export class MyComponent {
  authService = inject(AuthService);
  
  canEdit = this.authService.hasPermission('canEditToChuc');
  canView = this.authService.hasPermission('canViewToChuc');
}
```

### Cấu hình quyền

```typescript
// Trong auth.service.ts
const mockUser: AuthUser = {
  permissions: {
    canViewToChuc: true,
    canEditToChuc: false,
    canDeleteToChuc: false
  }
};
```
