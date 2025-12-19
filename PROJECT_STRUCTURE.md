# Cấu trúc Project Angular + Ant Design (ng-zorro-antd)

> **Lưu ý**: Tài liệu này được cập nhật liên tục mỗi khi có thay đổi về cấu trúc project.

**Ngày cập nhật**: 19/12/2025  
**Phiên bản Angular**: 20.3.0  
**Phiên bản ng-zorro-antd**: 20.4.3  
**Phiên bản @ngx-translate**: 17.0.0

---

## 📋 Tổng quan

Project này sử dụng Angular kết hợp với ng-zorro-antd (Ant Design cho Angular) theo kiến trúc modular và lazy loading để tối ưu hiệu suất.

### Công nghệ chính
- **Framework**: Angular 20.3.0 (Standalone Components, Zoneless)
- **UI Library**: ng-zorro-antd 20.4.3
- **Language**: TypeScript 5.9.2
- **Styling**: LESS (cho theme customization)
- **i18n**: @ngx-translate/core 17.0.0
- **Build Tool**: Angular CLI 20.3.13 với Application Builder
- **Testing**: Jasmine + Karma + fast-check (PBT)
- **State Management**: Angular Signals

---

## 🗂️ Cấu trúc thư mục chính

```
src/app/
├── core/                    # Core module - singleton services, guards, interceptors
│   ├── base/               # Base classes (BaseApiService, BaseStore)
│   ├── guards/             # Route guards
│   ├── handlers/           # Error handlers
│   ├── interceptors/       # HTTP interceptors
│   ├── services/           # Core singleton services (auth, config, i18n, loading)
│   └── startup/            # App initialization tasks
│
├── services/               # ⭐ Feature Services (KHÔNG đặt trong features/)
│   ├── api/                # API Services - gọi backend
│   │   └── index.ts
│   ├── shared-state/       # Shared State Services - cross-feature data sharing
│   │   └── index.ts
│   ├── event-bus/          # Event Bus - cross-feature communication
│   │   ├── event-bus.service.ts
│   │   ├── events.constant.ts
│   │   └── index.ts
│   └── index.ts            # Barrel export
│
├── shared/                 # Shared module - reusable across features
│   ├── components/         # 60+ IDAS components (wrapper ng-zorro-antd)
│   │   ├── idas-button/
│   │   ├── idas-input/
│   │   ├── idas-table/
│   │   ├── ... (60+ components)
│   │   ├── types/          # Component-specific types
│   │   └── index.ts
│   ├── constants/          # ⭐ ALL constants (KHÔNG đặt trong features/)
│   │   ├── i18n-keys.constant.ts
│   │   ├── icons.constant.ts
│   │   ├── view-mode.constant.ts
│   │   └── index.ts
│   ├── enums/              # ⭐ ALL enums (KHÔNG đặt trong features/)
│   │   ├── loai-to-chuc.enum.ts
│   │   ├── trang-thai.enum.ts
│   │   └── index.ts
│   ├── models/             # ⭐ ALL models (KHÔNG đặt trong features/)
│   │   ├── organization.model.ts
│   │   ├── employee.model.ts
│   │   └── index.ts
│   ├── pipes/              # Shared pipes
│   ├── types/              # Shared TypeScript types
│   └── utils/              # Utility functions
│
├── features/               # Feature modules - lazy loaded
│   ├── exception/          # Exception pages (403, 404, 500)
│   │   ├── routes/
│   │   ├── pages/
│   │   └── exception.feature.ts
│   └── experimentals/      # Component Showcase
│       ├── routes/
│       ├── pages/
│       └── experimentals.feature.ts
│
└── layouts/                # Layout components
    ├── default-layout/
    ├── blank-layout/
    └── experimental-layout/
```

---

## ⚠️ QUY TẮC QUAN TRỌNG

### Feature Module KHÔNG chứa:
- ❌ `models/` → Đặt trong `shared/models/`
- ❌ `constants/` → Đặt trong `shared/constants/`
- ❌ `enums/` → Đặt trong `shared/enums/`
- ❌ `services/` → Đặt trong `services/api/`

### Feature Module CHỈ chứa:
- ✅ `routes/` - Route definitions
- ✅ `pages/` - Page-level components
- ✅ `components/` - Feature-specific components (optional)
- ✅ `store/` - Feature store (signals)
- ✅ `{feature}.feature.ts` - Entry point

---

## 📁 Cấu trúc Feature Module chuẩn

```
features/
└── {feature-name}/
    ├── routes/
    │   └── {feature-name}.routes.ts
    ├── pages/
    │   ├── {feature-name}-list/
    │   │   ├── {feature-name}-list.page.ts
    │   │   ├── {feature-name}-list.page.html
    │   │   └── {feature-name}-list.page.less
    │   └── {feature-name}-detail/
    │       ├── {feature-name}-detail.page.ts
    │       ├── {feature-name}-detail.page.html
    │       └── {feature-name}-detail.page.less
    ├── components/                     # Optional - feature-specific components
    │   └── {feature-name}-form/
    ├── store/
    │   └── {feature-name}.store.ts
    ├── {feature-name}.feature.ts       # Entry point
    └── README.md
```

---

## 🔄 State Management

Project sử dụng 3 patterns cho state management:

| Pattern | Scope | Vị trí | Use Case |
|---------|-------|--------|----------|
| Feature Store | Feature-specific | `features/{feature}/store/` | State riêng của feature |
| Shared State Service | Cross-feature (read) | `services/shared-state/` | Share data giữa features |
| Event Bus Service | Cross-feature (action) | `services/event-bus/` | Trigger actions giữa features |

### Decision Tree
```
Cần quản lý state?
│
├─ State chỉ dùng trong 1 feature?
│  └─ ✅ Feature Store (trong features/{feature}/store/)
│
├─ Feature A cần ĐỌC data từ Feature B?
│  └─ ✅ Shared State Service (trong services/shared-state/)
│
└─ Feature A cần TRIGGER action ở Feature B?
   └─ ✅ Event Bus (trong services/event-bus/)
```

**Chi tiết:** Xem `.kiro/steering/state-management.md`

---

## 📍 Tóm tắt đường dẫn

| Loại | Đường dẫn | Import Path |
|------|-----------|-------------|
| Models | `src/app/shared/models/` | `@app/shared/models` |
| Constants | `src/app/shared/constants/` | `@app/shared/constants` |
| Enums | `src/app/shared/enums/` | `@app/shared/enums` |
| API Services | `src/app/services/api/` | `@app/services` |
| Shared State | `src/app/services/shared-state/` | `@app/services` |
| Event Bus | `src/app/services/event-bus/` | `@app/services` |
| Shared Components | `src/app/shared/components/` | `@app/shared/components` |
| Pipes | `src/app/shared/pipes/` | `@app/shared/pipes` |
| Core Services | `src/app/core/services/` | `@app/core/services` |
| Base Classes | `src/app/core/base/` | `@app/core/base` |
| Feature Stores | `src/app/features/{feature}/store/` | Relative import |

---

## 🎨 Shared Components (IDAS Components)

Project có sẵn **60+ IDAS components** - wrapper components của ng-zorro-antd với prefix `idas-`:

### Categories
- **General**: idas-button, idas-icon, idas-typography
- **Layout**: idas-divider, idas-grid, idas-layout, idas-space
- **Navigation**: idas-affix, idas-breadcrumb, idas-menu, idas-pagination, idas-steps
- **Data Entry**: idas-input, idas-select, idas-checkbox, idas-radio, idas-datepicker, idas-upload
- **Data Display**: idas-table, idas-tree, idas-card, idas-tabs, idas-tag, idas-avatar
- **Feedback**: idas-alert, idas-drawer, idas-modal, idas-spin, idas-progress

**Chi tiết:** Xem `src/app/shared/components/README.md`

---

## 🎭 Layouts

| Layout | Mô tả | Sử dụng cho |
|--------|-------|-------------|
| DefaultLayout | Sidebar + Header + Footer | Dashboard, forms, tables |
| BlankLayout | Không có sidebar/header | Login, Register, Error pages |
| ExperimentalLayout | Layout thử nghiệm | Component showcase |

---

## 🔌 HTTP Interceptors

| Interceptor | Chức năng |
|-------------|-----------|
| cacheInterceptor | Cache GET requests |
| authInterceptor | Thêm Authorization header |
| loadingInterceptor | Hiển thị loading indicator |
| responseInterceptor | Transform response & handle errors |

---

## 🌐 Internationalization (i18n)

- **Supported languages**: Vietnamese (vi), English (en), Japanese (ja)
- **Translation files**: `public/i18n/{vi,en,ja}.json`
- **Format**: Flat structure (không nested)
- **Constants**: `shared/constants/i18n-keys.constant.ts`

---

## 📝 Checklist khi tạo Feature mới

- [ ] Tạo models trong `shared/models/`
- [ ] Tạo enums trong `shared/enums/`
- [ ] Tạo constants trong `shared/constants/`
- [ ] Tạo API service trong `services/api/`
- [ ] Tạo feature folder với routes, pages, store
- [ ] Thêm i18n keys và translations
- [ ] Export từ barrel files (index.ts)
- [ ] Cập nhật app.routes.ts

**Chi tiết:** Xem `.kiro/steering/feature-creation-guide.md`

---

## 🔧 NPM Scripts

```bash
pnpm start          # Dev server (http://localhost:4200)
pnpm build          # Production build
pnpm test           # Run tests
pnpm run profile    # Switch environment profile
```

---

## 📚 Tài liệu tham khảo

- **Steering files**: `.kiro/steering/`
  - `project-structure.md` - Quy tắc cấu trúc thư mục
  - `state-management.md` - Hướng dẫn state management
  - `feature-creation-guide.md` - Hướng dẫn tạo feature mới
  - `angular-development.md` - Angular development guidelines
  - `coding-standards.md` - Coding standards
  - `shared-components.md` - Shared components reference

- **External docs**:
  - [Angular Documentation](https://angular.dev)
  - [ng-zorro-antd Documentation](https://ng.ant.design)

---

## 🔄 Lịch sử thay đổi

| Ngày | Thay đổi |
|------|----------|
| 19/12/2025 | Cập nhật cấu trúc với services/api, shared-state, event-bus |
| 19/12/2025 | Loại bỏ models/constants/services khỏi features |
| 18/12/2025 | Di chuyển constants và models vào shared/ |
| 17/12/2025 | Thêm 60+ IDAS components |
| 17/12/2025 | Tái cấu trúc features với entry point |
