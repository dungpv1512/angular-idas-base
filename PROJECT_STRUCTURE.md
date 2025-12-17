# Cấu trúc Project Angular + Ant Design (ng-zorro-antd)

> **Lưu ý**: Tài liệu này được cập nhật liên tục mỗi khi có thay đổi về cấu trúc project.

**Ngày cập nhật**: 17/12/2025  
**Phiên bản Angular**: 20.3.0  
**Phiên bản ng-zorro-antd**: 20.4.3  
**Phiên bản @ngx-translate**: 17.0.0

---

## 📋 Tổng quan

Project này sử dụng Angular kết hợp với ng-zorro-antd (Ant Design cho Angular) theo kiến trúc modular và lazy loading để tối ưu hiệu suất.

### Công nghệ chính
- **Framework**: Angular 20.3.0 (Standalone Components)
- **UI Library**: ng-zorro-antd 20.4.3
- **Language**: TypeScript 5.9.2
- **Styling**: LESS (cho theme customization)
- **i18n**: @ngx-translate/core 17.0.0
- **Build Tool**: Angular CLI 20.3.13 với Application Builder
- **Testing**: Jasmine + Karma

---

## 🗂️ Cấu trúc thư mục

```
angular-idas/
├── .angular/                    # Angular cache (auto-generated)
├── .vscode/                     # VS Code settings
├── node_modules/                # Dependencies
├── public/                      # Static assets
│   ├── favicon.ico
│   ├── logo.png
│   └── i18n/                   # Translation files
│       ├── en.json
│       └── vi.json
├── scripts/                     # Build & utility scripts
│   ├── fetch-etcd-config.js    # Fetch config from etcd
│   ├── parse-etcd-from-md.js   # Parse etcd config from markdown
│   ├── switch-profile.js       # Switch environment profiles
│   └── README.md
├── src/
│   ├── app/
│   │   ├── core/               # Core services, guards, interceptors
│   │   │   ├── guards/
│   │   │   │   └── permission.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   ├── loading.interceptor.ts
│   │   │   │   ├── response.interceptor.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── README.md
│   │   │   ├── services/
│   │   │   │   ├── api.service.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── etcd-config.service.ts
│   │   │   │   ├── i18n.service.ts
│   │   │   │   ├── loading.service.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   └── README.md
│   │   │   ├── startup/        # Startup tasks
│   │   │   │   ├── tasks/
│   │   │   │   ├── startup-order.constants.ts
│   │   │   │   ├── startup-task.interface.ts
│   │   │   │   └── startup-task.runner.ts
│   │   │   └── base/           # Base classes
│   │   │       ├── base-api.service.ts
│   │   │       ├── base-store.ts
│   │   │       └── index.ts
│   │   ├── layouts/            # Layout components
│   │   │   ├── default-layout/
│   │   │   │   ├── partials/   # Layout partials (header, footer, sidebar)
│   │   │   │   ├── default-layout.component.ts
│   │   │   │   ├── default-layout.component.html
│   │   │   │   ├── default-layout.component.less
│   │   │   │   └── default-layout.model.ts
│   │   │   ├── blank-layout/
│   │   │   │   ├── blank-layout.component.ts
│   │   │   │   ├── blank-layout.component.html
│   │   │   │   └── blank-layout.component.less
│   │   │   ├── experimental-layout/
│   │   │   │   ├── experimental-layout.component.ts
│   │   │   │   ├── experimental-layout.component.html
│   │   │   │   └── experimental-layout.component.less
│   │   │   └── index.ts
│   │   ├── features/           # Feature modules (lazy-loaded)
│   │   │   ├── experimentals/  # Component Showcase
│   │   │   │   ├── routes/
│   │   │   │   │   └── experimentals.routes.ts
│   │   │   │   ├── pages/      # page-level demo components
│   │   │   │   │   ├── affix-demo/
│   │   │   │   │   ├── alert-demo/
│   │   │   │   │   ├── form-inputs-demo/
│   │   │   │   │   └── ...
│   │   │   │   ├── experimentals.feature.ts  # entry point
│   │   │   │   └── README.md
│   │   │   └── forbidden/      # 403 page
│   │   │       ├── routes/
│   │   │       │   └── forbidden.routes.ts
│   │   │       ├── pages/
│   │   │       │   └── forbidden/
│   │   │       ├── forbidden.feature.ts      # entry point
│   │   │       └── README.md
│   │   ├── shared/             # Shared components, types, utils
│   │   │   ├── components/     # 60+ IDAS components (wrapper ng-zorro-antd)
│   │   │   │   ├── idas-affix/
│   │   │   │   ├── idas-alert/
│   │   │   │   ├── idas-anchor/
│   │   │   │   ├── idas-avatar/
│   │   │   │   ├── idas-back-top/
│   │   │   │   ├── idas-badge/
│   │   │   │   ├── idas-breadcrumb/
│   │   │   │   ├── idas-button/
│   │   │   │   ├── idas-calendar/
│   │   │   │   ├── idas-card/
│   │   │   │   ├── idas-carousel/
│   │   │   │   ├── idas-cascader/
│   │   │   │   ├── idas-checkbox/
│   │   │   │   ├── idas-collapse/
│   │   │   │   ├── idas-comment/
│   │   │   │   ├── idas-datepicker/
│   │   │   │   ├── idas-descriptions/
│   │   │   │   ├── idas-divider/
│   │   │   │   ├── idas-drawer/
│   │   │   │   ├── idas-dropdown/
│   │   │   │   ├── idas-empty/
│   │   │   │   ├── idas-form/
│   │   │   │   ├── idas-grid/
│   │   │   │   ├── idas-icon/
│   │   │   │   ├── idas-image/
│   │   │   │   ├── idas-input/
│   │   │   │   ├── idas-input-number/
│   │   │   │   ├── idas-layout/
│   │   │   │   ├── idas-list/
│   │   │   │   ├── idas-mentions/
│   │   │   │   ├── idas-menu/
│   │   │   │   ├── idas-modal/
│   │   │   │   ├── idas-page-header/
│   │   │   │   ├── idas-pagination/
│   │   │   │   ├── idas-popconfirm/
│   │   │   │   ├── idas-popover/
│   │   │   │   ├── idas-progress/
│   │   │   │   ├── idas-qr-code/
│   │   │   │   ├── idas-radio/
│   │   │   │   ├── idas-rate/
│   │   │   │   ├── idas-result/
│   │   │   │   ├── idas-search/
│   │   │   │   ├── idas-select/
│   │   │   │   ├── idas-skeleton/
│   │   │   │   ├── idas-slider/
│   │   │   │   ├── idas-space/
│   │   │   │   ├── idas-spin/
│   │   │   │   ├── idas-statistic/
│   │   │   │   ├── idas-steps/
│   │   │   │   ├── idas-switch/
│   │   │   │   ├── idas-table/
│   │   │   │   ├── idas-tabs/
│   │   │   │   ├── idas-tag/
│   │   │   │   ├── idas-tags-input/
│   │   │   │   ├── idas-textarea/
│   │   │   │   ├── idas-time-picker/
│   │   │   │   ├── idas-timeline/
│   │   │   │   ├── idas-tooltip/
│   │   │   │   ├── idas-transfer/
│   │   │   │   ├── idas-tree/
│   │   │   │   ├── idas-tree-select/
│   │   │   │   ├── idas-typography/
│   │   │   │   ├── idas-upload/
│   │   │   │   ├── idas-watermark/
│   │   │   │   ├── types/      # Component types
│   │   │   │   ├── index.ts
│   │   │   │   ├── README.md
│   │   │   │   └── QUICK_START.md
│   │   │   ├── types/
│   │   │   │   └── table.types.ts
│   │   │   └── utils/
│   │   │       ├── filter.utils.ts
│   │   │       └── README.md
│   │   ├── app.ts              # Root component
│   │   ├── app.html            # Root template
│   │   ├── app.config.ts       # Application configuration
│   │   ├── app.routes.ts       # Root routing
│   │   ├── app.spec.ts         # Root component tests
│   │   └── icons-provider.ts   # Ant Design icons configuration
│   ├── environments/           # Environment configurations
│   │   ├── environment.ts      # Development environment
│   │   └── environment.prod.ts # Production environment
│   ├── styles/                 # Global styles
│   │   ├── styles.less         # Main global styles
│   │   ├── variables.less      # LESS variables
│   │   └── ng-zorro-antd-less-variables.md
│   ├── index.html              # Main HTML file
│   └── main.ts                 # Application entry point
├── .editorconfig               # Editor configuration
├── .env                        # Environment variables
├── .gitignore                  # Git ignore rules
├── .npmrc                      # NPM configuration
├── angular.json                # Angular CLI configuration
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json           # App-specific TS config
├── tsconfig.spec.json          # Test-specific TS config
└── *.md                        # Documentation files
```

---

## 📁 Chi tiết cấu trúc

### 1. **Root Level**

#### `angular.json`
- Cấu hình Angular CLI
- Build options, assets, styles
- Ant Design icons được copy vào `/assets/` khi build

#### `package.json`
- Dependencies và devDependencies
- Scripts: `start`, `build`, `test`
- Prettier configuration

#### `tsconfig.json`
- TypeScript compiler options
- Strict mode enabled

---

### 2. **src/app/** - Application Core

#### `app.config.ts` - Application Configuration
```typescript
// Providers chính:
- provideRouter()                    // Routing
- provideNzIcons()                   // Ant Design icons
- provideNzI18n(vi_VN)               // Ant Design i18n (Vietnamese)
- provideAnimationsAsync()           // Animations
- provideHttpClient(withInterceptors()) // HTTP client với interceptors
- TranslateModule                    // ngx-translate i18n
- provideTranslateService()          // Translation service configuration
```

#### `app.routes.ts` - Root Routing
- Redirect mặc định: `/` → `/welcome`
- Lazy loading cho các feature modules

#### `icons-provider.ts`
- Import và export các icons từ `@ant-design/icons-angular`
- Chỉ import icons được sử dụng để giảm bundle size

---

### 3. **src/app/features/** - Feature Modules

Mỗi feature module nên có cấu trúc chuẩn:
```
feature-name/
├── routes/
│   └── feature-name.routes.ts
├── pages/                        # page-level components
│   ├── feature-list/
│   │   ├── feature-list.page.ts
│   │   ├── feature-list.page.html
│   │   └── feature-list.page.less
│   ├── feature-detail/
│   └── feature-create/
├── components/                   # components dùng trong feature
│   ├── feature-form/
│   └── feature-table/
├── services/
│   ├── feature-api.service.ts
│   ├── feature.facade.ts         # optional
│   └── feature.mapper.ts
├── models/
│   ├── feature.model.ts
│   └── feature-filter.model.ts
├── store/                        # nếu dùng signal / ngrx
│   ├── feature.store.ts
│   └── feature.selectors.ts
├── constants/
│   └── feature-permission.constant.ts
├── feature-name.feature.ts       # entry point
└── README.md
```

#### Ví dụ: `experimentals/`
- Standalone components
- Lazy-loaded qua routing từ entry point
- Sử dụng ng-zorro-antd components
- Entry point: `experimentals.feature.ts`

---

### 4. **Styling**

#### `src/styles.css`
- Global CSS styles
- Reset/normalize styles

#### `src/theme.less`
- Ant Design theme customization
- Override LESS variables
- Custom theme colors, spacing, etc.

---

## 🎯 Best Practices

### 1. **Component Architecture**
- ✅ Sử dụng **Standalone Components** (Angular 14+)
- ✅ Lazy loading cho feature modules
- ✅ Component naming: `feature-name.ts` (không dùng `.component.ts`)
- ✅ Mỗi component có file riêng: `.ts`, `.html`, `.css`

### 2. **Routing**
- ✅ Lazy loading với `loadChildren()`
- ✅ Route guards cho authentication/authorization
- ✅ Preloading strategy cho các routes quan trọng

### 3. **Ant Design Integration**
- ✅ Import chỉ các components cần thiết
- ✅ Sử dụng `provideNzIcons()` với selective imports
- ✅ Customize theme qua `theme.less`
- ✅ Sử dụng Ant Design Grid System

### 4. **Code Organization**

```
src/app/
├── core/                    # Singleton services, guards, interceptors
│   ├── guards/
│   │   └── permission.guard.ts
│   ├── interceptors/
│   │   ├── auth.interceptor.ts
│   │   ├── loading.interceptor.ts
│   │   ├── response.interceptor.ts
│   │   ├── index.ts
│   │   └── README.md
│   ├── services/
│   │   ├── api.service.ts
│   │   ├── auth.service.ts
│   │   ├── etcd-config.service.ts
│   │   ├── i18n.service.ts
│   │   ├── loading.service.ts
│   │   ├── user.service.ts
│   │   └── README.md
│   └── startup/             # Startup tasks
│       ├── tasks/
│       ├── startup-order.constants.ts
│       ├── startup-task.interface.ts
│       └── startup-task.runner.ts
├── shared/                  # Shared components, types, utils
│   ├── components/          # 60+ IDAS components (wrapper ng-zorro-antd)
│   │   ├── idas-button/
│   │   ├── idas-input/
│   │   ├── idas-select/
│   │   ├── idas-table/
│   │   ├── idas-tree/
│   │   ├── ... (60+ components)
│   │   ├── types/
│   │   ├── index.ts
│   │   ├── README.md
│   │   └── QUICK_START.md
│   ├── types/
│   │   └── table.types.ts
│   └── utils/
│       ├── filter.utils.ts
│       └── README.md
├── features/                # Feature modules (lazy-loaded)
│   ├── experimentals/
│   │   ├── routes/
│   │   │   └── experimentals.routes.ts
│   │   ├── pages/           # page-level demo components
│   |   ├── models/          # models demo components
│   |   ├── store/           # store demo components
│   |   ├── constants/       # constants demo components
│   |   ├── services/        # services demo components
│   |   ├── components/      # components demo components
│   │   ├── experimentals.feature.ts  # entry point
│   │   └── README.md
│   └── forbidden/
│       ├── routes/
│       │   └── forbidden.routes.ts
│       ├── pages/
│       ├── models/
│       ├── store/
│       ├── constants/
│       ├── services/
│       ├── components/
│       ├── forbidden.feature.ts      # entry point
│       └── README.md
└── layouts/                 # Layout components
    ├── default-layout/
    │   ├── partials/
    │   ├── default-layout.component.ts
    │   ├── default-layout.component.html
    │   ├── default-layout.component.less
    │   └── default-layout.model.ts
    ├── blank-layout/
    │   ├── blank-layout.component.ts
    │   ├── blank-layout.component.html
    │   └── blank-layout.component.less
    ├── experimental-layout/
    │   ├── experimental-layout.component.ts
    │   ├── experimental-layout.component.html
    │   └── experimental-layout.component.less
    └── index.ts
```

### 5. **State Management**
- Signals (Angular 16+) cho local state
- RxJS cho async operations
- NgRx/Akita cho complex state (nếu cần)

### 6. **Performance**
- ✅ OnPush change detection strategy
- ✅ Lazy loading modules
- ✅ Tree-shakeable providers
- ✅ Optimize bundle size (check `angular.json` budgets)

---

## 🔧 Configuration Files

### `angular.json` - Key Configurations

#### Assets
```json
"assets": [
  { "glob": "**/*", "input": "public" },
  { 
    "glob": "**/*", 
    "input": "./node_modules/@ant-design/icons-angular/src/inline-svg/",
    "output": "/assets/"
  }
]
```

#### Styles
```json
"styles": [
  "src/styles/styles.less"    // Global styles (imports theme & variables)
]
```

#### Budgets (Production)
- Initial: 500kB warning, 1MB error
- Component styles: 4kB warning, 8kB error

---

## 📦 Dependencies

### Core Dependencies
- `@angular/core` ^20.3.0 - Angular framework
- `@angular/common` ^20.3.0 - Common Angular utilities
- `@angular/router` ^20.3.0 - Routing
- `@angular/forms` ^20.3.0 - Forms module
- `ng-zorro-antd` ^20.4.3 - Ant Design components
- `@ngx-translate/core` 17.0.0 - i18n translation
- `@ngx-translate/http-loader` 17.0.0 - Translation loader
- `rxjs` ~7.8.0 - Reactive programming
- `zone.js` ~0.15.0 - Change detection

### Dev Dependencies
- `@angular/cli` ^20.3.13 - CLI tools
- `@angular/build` ^20.3.13 - Build system
- `typescript` ~5.9.2 - Language
- `less` ^4.2.0 - LESS compiler cho Ant Design
- `jasmine-core` ~5.9.0 - Testing framework
- `karma` ~6.4.0 - Test runner

---

## 📝 Quy tắc đặt tên

### Files
- Component: `feature-name.component.ts` hoặc `feature-name.ts`
- Template: `feature-name.component.html` hoặc `feature-name.html`
- Styles: `feature-name.component.less` hoặc `feature-name.less`
- Routes: `feature-name.routes.ts`
- Service: `feature-name.service.ts`
- Guard: `feature-name.guard.ts`

### Classes
- Component: `FeatureNameComponent`
- Service: `FeatureNameService`
- Guard: `FeatureNameGuard`
- Directive: `FeatureNameDirective`
- Pipe: `FeatureNamePipe`

### Selectors
- Prefix: `app-` (configured in `angular.json`)
- Example: `app-welcome`, `app-user-profile`

---

## 🌐 Internationalization (i18n)

Project hỗ trợ đa ngôn ngữ với 2 hệ thống i18n:

### 1. Ant Design i18n (ng-zorro-antd)
- **Default locale**: Vietnamese (`vi_VN`)
- **Configuration**: `app.config.ts` → `provideNzI18n(vi_VN)`
- **Scope**: UI components của Ant Design (buttons, datepicker, table, etc.)

### 2. ngx-translate (Application i18n)
- **Library**: `@ngx-translate/core` 17.0.0
- **Supported languages**: Vietnamese (vi), English (en)
- **Translation files**: `public/i18n/vi.json`, `public/i18n/en.json`
- **Service**: `I18nService` (`src/app/core/services/i18n.service.ts`)
- **Component**: `LanguageSwitcherComponent` để chuyển đổi ngôn ngữ
- **Usage**: 
  ```typescript
  // In component
  {{ 'KEY' | translate }}
  
  // In TypeScript
  this.translate.get('KEY').subscribe(text => console.log(text));
  ```

**Chi tiết:** Xem `I18N_COMPLETE_GUIDE.md` và `I18N_GUIDE.md`

---

## 🎨 Theming

### Customizing Ant Design Theme

Edit `src/theme.less`:
```less
@import "~ng-zorro-antd/ng-zorro-antd.less";

// Override variables
@primary-color: #1890ff;
@link-color: #1890ff;
@border-radius-base: 4px;
// ... more variables
```

---

## 📚 Tài liệu tham khảo

- [Angular Documentation](https://angular.dev)
- [ng-zorro-antd Documentation](https://ng.ant.design)
- [Ant Design Specification](https://ant.design/docs/spec/introduce)
- [Angular Style Guide](https://angular.dev/style-guide)

---

## 🔌 HTTP Interceptors

Project sử dụng 3 interceptors chính:

### 1. authInterceptor
- Tự động thêm `Authorization: Bearer {token}` vào headers
- Thêm các headers chuẩn: `Content-Type`, `Accept`, `X-Requested-With`

### 2. loadingInterceptor
- Hiển thị loading indicator tự động khi gọi API
- Sử dụng `LoadingService` với Angular Signals
- Skip loading: thêm header `X-Skip-Loading: true`

### 3. responseInterceptor
- Transform response data
- Xử lý errors thống nhất
- Log requests/responses (dev mode)

**Chi tiết:** Xem `src/app/core/interceptors/README.md`

---

## 🎨 Shared Components (IDAS Components)

Project có sẵn **60+ IDAS components** - wrapper components của ng-zorro-antd với prefix `idas-`:

### Component Categories

#### General
- idas-button, idas-icon, idas-typography

#### Layout
- idas-divider, idas-grid, idas-layout, idas-space

#### Navigation
- idas-affix, idas-anchor, idas-breadcrumb, idas-dropdown, idas-menu, idas-page-header, idas-pagination, idas-steps

#### Data Entry
- idas-checkbox, idas-cascader, idas-datepicker, idas-form, idas-input, idas-input-number, idas-mentions, idas-radio, idas-rate, idas-select, idas-slider, idas-switch, idas-time-picker, idas-transfer, idas-tree-select, idas-upload

#### Data Display
- idas-avatar, idas-badge, idas-calendar, idas-card, idas-carousel, idas-collapse, idas-comment, idas-descriptions, idas-empty, idas-image, idas-list, idas-popover, idas-qr-code, idas-statistic, idas-table, idas-tabs, idas-tag, idas-timeline, idas-tooltip, idas-tree

#### Feedback
- idas-alert, idas-drawer, idas-modal, idas-popconfirm, idas-progress, idas-result, idas-skeleton, idas-spin

#### Other
- idas-back-top, idas-watermark

### Custom Components
- **idas-search** - Search input với debounce
- **idas-tags-input** - Tags input với autocomplete
- **idas-textarea** - Textarea với character count

**Tính năng:**
- ✅ Wrapper ng-zorro-antd với naming convention `idas-*`
- ✅ Tích hợp Reactive Forms (ControlValueAccessor)
- ✅ Validation & error messages
- ✅ Disabled state support
- ✅ Customizable với nhiều options
- ✅ TypeScript interfaces
- ✅ Consistent UI theo Ant Design
- ✅ i18n support

**Chi tiết:** Xem `src/app/shared/components/README.md`  
**Quick Start:** `src/app/shared/components/QUICK_START.md`

---

## 🎭 Layouts

Project có 3 layout components chính:

### 1. DefaultLayoutComponent
Layout mặc định với sidebar menu, header, footer.

**Features:**
- Collapsible sidebar menu
- Responsive design
- Header với actions (notifications, user menu)
- Footer
- Configurable menu items
- Router outlet
- Partials: header, footer, sidebar

**Sử dụng cho:** Dashboard, forms, tables, và tất cả trang chính

### 2. BlankLayoutComponent
Layout trống không có sidebar/header/footer.

**Sử dụng cho:** Login, Register, 404, 500, Landing pages

### 3. ExperimentalLayoutComponent
Layout dành cho các tính năng thử nghiệm.

**Sử dụng cho:** Experimental features, testing new layouts

---

## 🎨 LESS Styling

Project sử dụng LESS để tái sử dụng trực tiếp biến của Ant Design.

### Structure
```
src/
├── styles/
│   ├── styles.less                # Main global styles
│   ├── variables.less             # LESS variables
│   └── ng-zorro-antd-less-variables.md
└── app/
    ├── layouts/
    │   ├── default-layout/
    │   │   └── default-layout.component.less
    │   ├── blank-layout/
    │   │   └── blank-layout.component.less
    │   └── experimental-layout/
    │       └── experimental-layout.component.less
    └── features/
        ├── experimentals/
        │   └── pages/
        └── forbidden/
            └── pages/
```

### Features
- ✅ Tái sử dụng biến từ Ant Design (@primary-color, @padding-*, @margin-*)
- ✅ Consistent theme với Red & White gradient
- ✅ Reusable patterns với LESS variables
- ✅ Compile-time type checking
- ✅ Integration hoàn hảo với ng-zorro-antd

### Usage
```less
@import '../../../styles/variables.less';

.component {
  color: @primary-color;
  padding: @padding-lg;
  border-radius: @border-radius-base;
  
  &:hover {
    background: @primary-1;
  }
}
```

**Chi tiết:** Xem `src/styles/ng-zorro-antd-less-variables.md`

---

## � Sccripts & Utilities

### NPM Scripts
```bash
npm start                    # Dev server (http://localhost:4200)
npm run build                # Production build
npm run watch                # Build with watch mode
npm test                     # Run tests
npm run profile              # Switch environment profile
npm run config:sync          # Parse etcd config from markdown
npm run config:sync-live     # Fetch config from etcd server
npm run dung.pham.demo       # Switch to dung.pham.demo profile
npm run hung.dang            # Switch to hung.dang profile
```

### Utility Scripts (`scripts/`)
- **switch-profile.js** - Chuyển đổi environment profiles
- **parse-etcd-from-md.js** - Parse etcd config từ markdown
- **fetch-etcd-config.js** - Fetch config từ etcd server

**Chi tiết:** Xem `scripts/README.md`, `PROFILE_SWITCH_GUIDE.md`, `ETCD_CONFIG_GUIDE.md`

---

## 🔐 Core Services

### Services (`src/app/core/services/`)
- **ApiService** - HTTP API wrapper với error handling
- **AuthService** - Authentication & authorization
- **EtcdConfigService** - Etcd configuration management
- **I18nService** - Internationalization service
- **LoadingService** - Global loading state management
- **UserService** - User management

### Guards (`src/app/core/guards/`)
- **PermissionGuard** - Route permission guard

### Startup (`src/app/core/startup/`)
- **Startup Tasks** - Application initialization tasks
- **StartupTaskRunner** - Task runner với order management
- **StartupTaskInterface** - Interface cho startup tasks
- **StartupOrderConstants** - Constants cho task order

**Chi tiết:** Xem `src/app/core/services/README.md`

---

## 🛠️ Shared Utilities

### Types (`src/app/shared/types/`)
- **table.types.ts** - TypeScript interfaces cho table components

### Utils (`src/app/shared/utils/`)
- **filter.utils.ts** - Utility functions cho filtering data

**Chi tiết:** Xem `src/app/shared/utils/README.md`

---

## 📄 Features

### Current Features (`src/app/features/`)

#### 1. Experimentals Feature (`experimentals/`)
- Component Showcase - trang demo các shared components
- Lazy-loaded từ entry point
- Route: `/experimental`
- **Structure:**
  ```
  experimentals/
  ├── routes/
  │   └── experimentals.routes.ts
  ├── pages/                      # page-level demo components
  │   ├── affix-demo/
  │   ├── alert-demo/
  │   ├── form-inputs-demo/
  │   └── ...
  ├── experimentals.feature.ts    # entry point
  └── README.md
  ```

#### 2. Forbidden Feature (`forbidden/`)
- 403 Access Denied page
- Route: `/403`
- **Structure:**
  ```
  forbidden/
  ├── routes/
  │   └── forbidden.routes.ts
  ├── pages/
  │   └── forbidden/
  │       ├── forbidden.component.ts
  │       ├── forbidden.component.html
  │       └── forbidden.component.less
  ├── forbidden.feature.ts        # entry point
  └── README.md
  ```

---

## 🔄 Lịch sử thay đổi

| Ngày | Thay đổi | Người thực hiện |
|------|----------|-----------------|
| 10/12/2025 | Khởi tạo tài liệu cấu trúc project | - |
| 10/12/2025 | Thêm HTTP Interceptors (auth, loading, cache, response) | - |
| 10/12/2025 | Thêm ApiService, LoadingService, UserService | - |
| 10/12/2025 | Thêm environment configuration | - |
| 10/12/2025 | Thêm 10 Shared Components base trên Ant Design | - |
| 10/12/2025 | Thêm Layout Components (Default & Blank) | - |
| 10/12/2025 | Chuyển đổi toàn bộ project từ SCSS sang LESS | - |
| 10/12/2025 | Tái sử dụng biến LESS của Ant Design | - |
| 10/12/2025 | Áp dụng Red & White gradient theme | - |
| 11/12/2025 | Thêm ngx-translate i18n (vi/en) | - |
| 11/12/2025 | Thêm I18nService, LanguageSwitcherComponent | - |
| 11/12/2025 | Thêm 4 shared components mới (Search, TagsInput, TreeSelect, TreeTable) | - |
| 11/12/2025 | Thêm Tochuc module với tree management | - |
| 11/12/2025 | Thêm Forbidden page (403) | - |
| 11/12/2025 | Thêm EtcdConfigService, TochucService, AuthService | - |
| 11/12/2025 | Thêm PermissionGuard | - |
| 11/12/2025 | Thêm utility scripts (profile switching, etcd config) | - |
| 11/12/2025 | Cập nhật PROJECT_STRUCTURE.md với cấu trúc mới nhất | - |
| 17/12/2025 | Cập nhật cấu trúc với 60+ IDAS components | - |
| 17/12/2025 | Thêm Startup Tasks system | - |
| 17/12/2025 | Thêm ExperimentalLayout | - |
| 17/12/2025 | Cập nhật cấu trúc pages (experimentals, forbidden) | - |
| 17/12/2025 | Cập nhật styles structure (styles folder) | - |
| 17/12/2025 | Tái cấu trúc: đổi `pages/` thành `features/` | - |
| 17/12/2025 | Tái cấu trúc: đổi `components/` thành `pages/` trong features | - |
| 17/12/2025 | Thêm entry point `*.feature.ts` cho mỗi feature | - |
| 17/12/2025 | Cập nhật cấu trúc feature theo chuẩn mới | - |

---

**Ghi chú**: Tài liệu này nên được cập nhật mỗi khi có thay đổi lớn về cấu trúc, thêm module mới, hoặc thay đổi architecture pattern.
