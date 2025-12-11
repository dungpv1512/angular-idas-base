# Cấu trúc Project Angular + Ant Design (ng-zorro-antd)

> **Lưu ý**: Tài liệu này được cập nhật liên tục mỗi khi có thay đổi về cấu trúc project.

**Ngày cập nhật**: 11/12/2025  
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
│   │   │   │   ├── cache.interceptor.ts
│   │   │   │   ├── loading.interceptor.ts
│   │   │   │   ├── response.interceptor.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── README.md
│   │   │   │   └── USAGE_EXAMPLE.md
│   │   │   └── services/
│   │   │       ├── api.service.ts
│   │   │       ├── auth.service.ts
│   │   │       ├── etcd-config.service.ts
│   │   │       ├── i18n.service.ts
│   │   │       ├── loading.service.ts
│   │   │       ├── tochuc.service.ts
│   │   │       ├── user.service.ts
│   │   │       └── README.md
│   │   ├── layouts/            # Layout components
│   │   │   ├── default-layout/
│   │   │   │   ├── default-layout.component.ts
│   │   │   │   ├── default-layout.component.html
│   │   │   │   └── default-layout.component.less
│   │   │   ├── blank-layout/
│   │   │   │   └── blank-layout.component.ts
│   │   │   ├── index.ts
│   │   │   └── README.md
│   │   ├── pages/              # Feature modules (lazy-loaded)
│   │   │   ├── welcome/
│   │   │   │   ├── welcome.ts
│   │   │   │   ├── welcome.html
│   │   │   │   ├── welcome.less
│   │   │   │   └── welcome.routes.ts
│   │   │   ├── tochuc/         # Organization management
│   │   │   │   ├── components/
│   │   │   │   ├── tochuc.component.ts
│   │   │   │   ├── tochuc.component.html
│   │   │   │   ├── tochuc.component.less
│   │   │   │   ├── tochuc.routes.ts
│   │   │   │   ├── README.md
│   │   │   │   ├── I18N_USAGE.md
│   │   │   │   └── TREE_SEARCH_GUIDE.md
│   │   │   ├── forbidden/      # 403 page
│   │   │   │   ├── forbidden.component.ts
│   │   │   │   ├── forbidden.routes.ts
│   │   │   │   └── README.md
│   │   │   └── virtual-table-demo/
│   │   │       └── virtual-table-demo.component.ts
│   │   ├── shared/             # Shared components, types, utils
│   │   │   ├── components/
│   │   │   │   ├── base-input/
│   │   │   │   ├── base-textarea/
│   │   │   │   ├── base-select/
│   │   │   │   ├── base-checkbox/
│   │   │   │   ├── base-radio/
│   │   │   │   ├── base-switch/
│   │   │   │   ├── base-datepicker/
│   │   │   │   ├── base-search/
│   │   │   │   ├── base-tags-input/
│   │   │   │   ├── base-table/
│   │   │   │   ├── base-tree/
│   │   │   │   ├── base-tree-select/
│   │   │   │   ├── base-tree-table/
│   │   │   │   ├── base-upload/
│   │   │   │   ├── language-switcher.component.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── DEMO.component.ts
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
│   ├── index.html              # Main HTML file
│   ├── main.ts                 # Application entry point
│   ├── styles.less             # Global styles
│   └── theme.less              # Ant Design theme customization
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

### 3. **src/app/pages/** - Feature Modules

Mỗi feature module nên có cấu trúc:
```
feature-name/
├── feature-name.ts          # Component
├── feature-name.html        # Template
├── feature-name.css         # Styles
├── feature-name.routes.ts   # Routes (nếu có sub-routes)
└── components/              # Sub-components (nếu cần)
```

#### Ví dụ: `welcome/`
- Standalone component
- Lazy-loaded qua routing
- Sử dụng ng-zorro-antd components

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
│   │   ├── cache.interceptor.ts
│   │   ├── response.interceptor.ts
│   │   ├── index.ts
│   │   ├── README.md
│   │   └── USAGE_EXAMPLE.md
│   └── services/
│       ├── api.service.ts
│       ├── auth.service.ts
│       ├── etcd-config.service.ts
│       ├── i18n.service.ts
│       ├── loading.service.ts
│       ├── tochuc.service.ts
│       ├── user.service.ts
│       └── README.md
├── shared/                  # Shared components, types, utils
│   ├── components/
│   │   ├── base-input/
│   │   ├── base-textarea/
│   │   ├── base-select/
│   │   ├── base-checkbox/
│   │   ├── base-radio/
│   │   ├── base-switch/
│   │   ├── base-datepicker/
│   │   ├── base-search/
│   │   ├── base-tags-input/
│   │   ├── base-table/
│   │   ├── base-tree/
│   │   ├── base-tree-select/
│   │   ├── base-tree-table/
│   │   ├── base-upload/
│   │   ├── language-switcher.component.ts
│   │   ├── index.ts
│   │   ├── DEMO.component.ts
│   │   ├── README.md
│   │   └── QUICK_START.md
│   ├── types/
│   │   └── table.types.ts
│   └── utils/
│       ├── filter.utils.ts
│       └── README.md
├── pages/                   # Feature modules (lazy-loaded)
│   ├── welcome/
│   ├── tochuc/
│   ├── forbidden/
│   └── virtual-table-demo/
└── layouts/                 # Layout components
    ├── default-layout/
    │   ├── default-layout.component.ts
    │   ├── default-layout.component.html
    │   └── default-layout.component.less
    ├── blank-layout/
    │   └── blank-layout.component.ts
    ├── index.ts
    └── README.md
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
  "src/theme.less",    // Ant Design theme
  "src/styles.less"    // Global styles
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

Project sử dụng 4 interceptors chính:

### 1. authInterceptor
- Tự động thêm `Authorization: Bearer {token}` vào headers
- Thêm các headers chuẩn: `Content-Type`, `Accept`, `X-Requested-With`

### 2. loadingInterceptor
- Hiển thị loading indicator tự động khi gọi API
- Sử dụng `LoadingService` với Angular Signals
- Skip loading: thêm header `X-Skip-Loading: true`

### 3. cacheInterceptor
- Cache GET requests trong 5 phút
- Giảm số lượng API calls không cần thiết
- Skip cache: thêm header `X-Skip-Cache: true`

### 4. responseInterceptor
- Transform response data
- Xử lý errors thống nhất
- Log requests/responses (dev mode)

**Chi tiết:** Xem `src/app/core/interceptors/README.md`

---

## 🎨 Shared Components

Project có sẵn 14 base components được xây dựng trên ng-zorro-antd để tái sử dụng:

### Form Controls (với ControlValueAccessor)
- **BaseInputComponent** - Text input với validation
- **BaseTextareaComponent** - Textarea với character count
- **BaseSelectComponent** - Single & Multiple select
- **BaseCheckboxComponent** - Checkbox & Checkbox group
- **BaseRadioComponent** - Radio group (normal & button style)
- **BaseSwitchComponent** - Toggle switch
- **BaseDatepickerComponent** - Date & Range picker
- **BaseSearchComponent** - Search input với debounce
- **BaseTagsInputComponent** - Tags input với autocomplete
- **BaseUploadComponent** - File upload

### Data Display & Selection
- **BaseTableComponent** - Table với pagination, sorting, actions
- **BaseTreeComponent** - Tree view với checkbox, search, drag-drop
- **BaseTreeSelectComponent** - Tree select dropdown
- **BaseTreeTableComponent** - Tree table với expand/collapse

### Utility Components
- **LanguageSwitcherComponent** - Language switcher (vi/en)

**Tính năng:**
- ✅ Tích hợp Reactive Forms (ControlValueAccessor)
- ✅ Validation & error messages
- ✅ Disabled state support
- ✅ Customizable với nhiều options
- ✅ TypeScript interfaces
- ✅ Consistent UI theo Ant Design
- ✅ i18n support

**Chi tiết:** Xem `src/app/shared/components/README.md`  
**Quick Start:** `src/app/shared/components/QUICK_START.md`  
**Demo:** `src/app/shared/components/DEMO.component.ts`

---

## 🎭 Layouts

Project có 2 layout components chính:

### 1. DefaultLayoutComponent
Layout mặc định với sidebar menu, header, footer.

**Features:**
- Collapsible sidebar menu
- Responsive design
- Header với actions (notifications, user menu)
- Footer
- Configurable menu items
- Router outlet

**Sử dụng cho:** Dashboard, forms, tables, và tất cả trang chính

### 2. BlankLayoutComponent
Layout trống không có sidebar/header/footer.

**Sử dụng cho:** Login, Register, 404, 500, Landing pages

**Chi tiết:** Xem `src/app/layouts/README.md`

---

## 🎨 LESS Styling

Project sử dụng LESS để tái sử dụng trực tiếp biến của Ant Design.

### Structure
```
src/
├── styles.less                    # Global styles
├── theme.less                     # Ant Design theme & variables
└── app/
    ├── layouts/
    │   └── default-layout/
    │       └── default-layout.component.less
    └── pages/
        ├── welcome/
        │   └── welcome.less
        └── tochuc/
            └── tochuc.component.less
```

### Features
- ✅ Tái sử dụng biến từ Ant Design (@primary-color, @padding-*, @margin-*)
- ✅ Consistent theme với Red & White gradient
- ✅ Reusable patterns với LESS variables
- ✅ Compile-time type checking
- ✅ Integration hoàn hảo với ng-zorro-antd

### Usage
```less
@import '../../../theme.less';

.component {
  color: @primary-color;
  padding: @padding-lg;
  border-radius: @border-radius-base;
  
  &:hover {
    background: @primary-1;
  }
}
```

**Chi tiết:** Xem `LESS_VARIABLES_GUIDE.md`

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
- **TochucService** - Organization management
- **UserService** - User management

### Guards (`src/app/core/guards/`)
- **PermissionGuard** - Route permission guard

**Chi tiết:** Xem `src/app/core/services/README.md`

---

## 🛠️ Shared Utilities

### Types (`src/app/shared/types/`)
- **table.types.ts** - TypeScript interfaces cho table components

### Utils (`src/app/shared/utils/`)
- **filter.utils.ts** - Utility functions cho filtering data

**Chi tiết:** Xem `src/app/shared/utils/README.md`

---

## 📄 Feature Pages

### Current Pages (`src/app/pages/`)

#### 1. Welcome Page (`welcome/`)
- Landing page mặc định
- Lazy-loaded
- Route: `/welcome`

#### 2. Tochuc Page (`tochuc/`)
- Organization management module
- Tree view với search, filter, CRUD operations
- i18n support (vi/en)
- Route: `/tochuc`
- **Docs**: `README.md`, `I18N_USAGE.md`, `TREE_SEARCH_GUIDE.md`

#### 3. Forbidden Page (`forbidden/`)
- 403 Access Denied page
- Route: `/forbidden`
- **Docs**: `README.md`

#### 4. Virtual Table Demo (`virtual-table-demo/`)
- Demo virtual scrolling table
- Performance optimization example

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

---

**Ghi chú**: Tài liệu này nên được cập nhật mỗi khi có thay đổi lớn về cấu trúc, thêm module mới, hoặc thay đổi architecture pattern.
