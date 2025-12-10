# Cấu trúc Project Angular + Ant Design (ng-zorro-antd)

> **Lưu ý**: Tài liệu này được cập nhật liên tục mỗi khi có thay đổi về cấu trúc project.

**Ngày cập nhật**: 10/12/2025  
**Phiên bản Angular**: 20.3.0  
**Phiên bản ng-zorro-antd**: 20.4.3

---

## 📋 Tổng quan

Project này sử dụng Angular kết hợp với ng-zorro-antd (Ant Design cho Angular) theo kiến trúc modular và lazy loading để tối ưu hiệu suất.

### Công nghệ chính
- **Framework**: Angular 20.3.0 (Standalone Components)
- **UI Library**: ng-zorro-antd 20.4.3
- **Language**: TypeScript 5.9.2
- **Styling**: CSS + LESS (cho theme customization)
- **Build Tool**: Angular CLI với Vite
- **Testing**: Jasmine + Karma

---

## 🗂️ Cấu trúc thư mục

```
angular-idas/
├── .angular/                    # Angular cache (auto-generated)
├── .vscode/                     # VS Code settings
├── node_modules/                # Dependencies
├── public/                      # Static assets
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── pages/              # Feature modules (lazy-loaded)
│   │   │   └── welcome/
│   │   │       ├── welcome.ts
│   │   │       ├── welcome.html
│   │   │       ├── welcome.css
│   │   │       └── welcome.routes.ts
│   │   ├── app.ts              # Root component
│   │   ├── app.html            # Root template
│   │   ├── app.css             # Root styles
│   │   ├── app.config.ts       # Application configuration
│   │   ├── app.routes.ts       # Root routing
│   │   └── icons-provider.ts   # Ant Design icons configuration
│   ├── index.html              # Main HTML file
│   ├── main.ts                 # Application entry point
│   ├── styles.css              # Global styles
│   └── theme.less              # Ant Design theme customization
├── angular.json                # Angular CLI configuration
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json           # App-specific TS config
└── tsconfig.spec.json          # Test-specific TS config
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
- provideRouter()           // Routing
- provideNzIcons()          // Ant Design icons
- provideNzI18n(vi_VN)      // Internationalization (Vietnamese)
- provideAnimationsAsync()  // Animations
- provideHttpClient()       // HTTP client
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
│   ├── services/
│   │   ├── api.service.ts
│   │   ├── loading.service.ts
│   │   └── user.service.ts
│   ├── guards/
│   └── interceptors/
│       ├── auth.interceptor.ts
│       ├── loading.interceptor.ts
│       ├── cache.interceptor.ts
│       ├── response.interceptor.ts
│       ├── index.ts
│       └── README.md
├── shared/                  # Shared components, directives, pipes
│   ├── components/
│   │   ├── base-input/
│   │   ├── base-textarea/
│   │   ├── base-select/
│   │   ├── base-checkbox/
│   │   ├── base-radio/
│   │   ├── base-switch/
│   │   ├── base-datepicker/
│   │   ├── base-table/
│   │   ├── base-tree/
│   │   ├── base-upload/
│   │   ├── index.ts
│   │   ├── README.md
│   │   └── DEMO.component.ts
│   ├── directives/
│   └── pipes/
├── features/                # Feature modules (hoặc pages/)
│   ├── feature-a/
│   └── feature-b/
└── layouts/                 # Layout components
    ├── default-layout/
    │   ├── default-layout.component.ts
    │   ├── default-layout.component.html
    │   └── default-layout.component.css
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
  "src/styles.css"     // Global styles
]
```

#### Budgets (Production)
- Initial: 500kB warning, 1MB error
- Component styles: 4kB warning, 8kB error

---

## 📦 Dependencies

### Core Dependencies
- `@angular/core`, `@angular/common`, `@angular/router`
- `ng-zorro-antd` - Ant Design components
- `rxjs` - Reactive programming
- `zone.js` - Change detection

### Dev Dependencies
- `@angular/cli` - CLI tools
- `typescript` - Language
- `less` - LESS compiler cho Ant Design
- `jasmine`, `karma` - Testing

---

## 🚀 Scripts

```bash
npm start          # Dev server (http://localhost:4200)
npm run build      # Production build
npm run watch      # Build with watch mode
npm test           # Run tests
```

---

## 📝 Quy tắc đặt tên

### Files
- Component: `feature-name.ts`
- Template: `feature-name.html`
- Styles: `feature-name.css` hoặc `.less`
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

- **Current locale**: Vietnamese (`vi_VN`)
- **Configuration**: `app.config.ts`
- **Ant Design i18n**: `provideNzI18n(vi_VN)`
- **Angular locale data**: `registerLocaleData(vi)`

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

Project có sẵn các base components được xây dựng trên ng-zorro-antd để tái sử dụng:

### Form Controls (với ControlValueAccessor)
- **BaseInputComponent** - Text input với validation
- **BaseTextareaComponent** - Textarea với character count
- **BaseSelectComponent** - Single & Multiple select
- **BaseCheckboxComponent** - Checkbox & Checkbox group
- **BaseRadioComponent** - Radio group (normal & button style)
- **BaseSwitchComponent** - Toggle switch
- **BaseDatepickerComponent** - Date & Range picker
- **BaseUploadComponent** - File upload

### Data Display
- **BaseTableComponent** - Table với pagination, sorting, actions
- **BaseTreeComponent** - Tree view với checkbox, search, drag-drop

**Tính năng:**
- ✅ Tích hợp Reactive Forms (ControlValueAccessor)
- ✅ Validation & error messages
- ✅ Disabled state support
- ✅ Customizable với nhiều options
- ✅ TypeScript interfaces
- ✅ Consistent UI theo Ant Design

**Chi tiết:** Xem `src/app/shared/components/README.md`  
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

## 🎨 SCSS Styling

Project sử dụng SCSS thay vì CSS để có khả năng tái sử dụng và maintain tốt hơn.

### Structure
```
src/
├── styles.scss                    # Global styles
├── theme.less                     # Ant Design theme
└── app/
    └── shared/
        └── styles/
            ├── _variables.scss    # Variables, mixins, functions
            └── README.md          # SCSS guide
```

### Features
- ✅ Variables cho colors, spacing, typography
- ✅ Mixins cho responsive, gradients, effects
- ✅ Consistent theme với Red & White gradient
- ✅ Reusable patterns
- ✅ Type-safe với SCSS

### Usage
```scss
@import '../../shared/styles/variables';

.component {
  color: $primary-color;
  padding: $spacing-lg;
  @include card-hover;
}
```

**Chi tiết:** Xem `src/app/shared/styles/README.md`

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
| 10/12/2025 | Chuyển đổi từ CSS sang SCSS với variables & mixins | - |
| 10/12/2025 | Áp dụng Red & White gradient theme | - |

---

**Ghi chú**: Tài liệu này nên được cập nhật mỗi khi có thay đổi lớn về cấu trúc, thêm module mới, hoặc thay đổi architecture pattern.
