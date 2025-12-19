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
├── services/               # ⭐ Feature Services - CHIA THEO DOMAIN
│   ├── api/                # API Services - gọi backend
│   │   ├── organization/   # Organization domain
│   │   │   ├── organization-api.service.ts
│   │   │   ├── position-api.service.ts
│   │   │   ├── function-duty-api.service.ts
│   │   │   └── index.ts
│   │   ├── employee/       # Employee domain
│   │   │   ├── employee-api.service.ts
│   │   │   └── index.ts
│   │   ├── approval/       # Approval domain
│   │   │   ├── approval-api.service.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── shared-state/       # Shared State Services - cross-feature data sharing
│   │   ├── organization-state.service.ts
│   │   ├── user-state.service.ts
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
│   │   │   ├── organization-view.model.ts
│   │   │   ├── tree-table-node.model.ts
│   │   │   ├── select-option.model.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── constants/          # ⭐ ALL constants - CHIA THEO DOMAIN
│   │   ├── common/         # Common constants
│   │   │   ├── icons.constant.ts
│   │   │   ├── view-mode.constant.ts
│   │   │   └── index.ts
│   │   ├── i18n/           # i18n keys - CHIA THEO DOMAIN
│   │   │   ├── common.i18n.ts
│   │   │   ├── organization.i18n.ts
│   │   │   ├── employee.i18n.ts
│   │   │   ├── approval.i18n.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── enums/              # ⭐ ALL enums - CHIA THEO DOMAIN
│   │   ├── common/         # Common enums
│   │   │   ├── trang-thai.enum.ts
│   │   │   └── index.ts
│   │   ├── organization/   # Organization enums
│   │   │   ├── loai-to-chuc.enum.ts
│   │   │   ├── tinh-trang-to-chuc.enum.ts
│   │   │   ├── loai-chuc-nang-nhiem-vu.enum.ts
│   │   │   └── index.ts
│   │   ├── approval/       # Approval enums
│   │   │   ├── type-request.enum.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── models/             # ⭐ ALL models - CHIA THEO DOMAIN
│   │   ├── common/         # Common models
│   │   │   ├── base.model.ts
│   │   │   ├── pagination.model.ts
│   │   │   └── index.ts
│   │   ├── organization/   # Organization models
│   │   │   ├── organization.model.ts
│   │   │   ├── organization-position.model.ts
│   │   │   ├── organization-filter.model.ts
│   │   │   ├── function-duty.model.ts
│   │   │   ├── position.model.ts
│   │   │   └── index.ts
│   │   ├── employee/       # Employee models
│   │   │   ├── employee.model.ts
│   │   │   └── index.ts
│   │   ├── approval/       # Approval models
│   │   │   ├── approval-request.model.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── pipes/              # Shared pipes
│   │   └── index.ts
│   ├── types/              # Shared TypeScript types (dùng chung)
│   │   ├── table.types.ts
│   │   └── index.ts
│   └── utils/              # Utility functions
│       └── index.ts
│
├── features/               # Feature modules - lazy loaded
│   ├── exception/          # Exception pages (403, 404, 500)
│   │   ├── routes/
│   │   ├── pages/
│   │   └── exception.feature.ts
│   ├── experimentals/      # Component Showcase
│   │   ├── routes/
│   │   ├── pages/
│   │   └── experimentals.feature.ts
│   └── organization/       # Organization feature (example)
│       ├── routes/
│       │   └── organization.routes.ts
│       ├── pages/
│       │   ├── organization-list/
│       │   └── approval-list/
│       ├── components/
│       │   ├── organization-form/
│       │   └── organization-drawer/
│       ├── store/
│       │   └── organization.store.ts
│       └── organization.feature.ts
│
└── layouts/                # Layout components
    ├── default-layout/
    ├── blank-layout/
    └── experimental-layout/
```

---

## ⚠️ QUY TẮC QUAN TRỌNG

### Cấu trúc DOMAIN-BASED

Project sử dụng cấu trúc **DOMAIN-BASED** (chia theo domain) để dễ quản lý khi project lớn:

```
# ✅ ĐÚNG - Cấu trúc DOMAIN-BASED
shared/
├── models/
│   ├── common/                 # Models dùng chung
│   ├── organization/           # Organization domain
│   ├── employee/               # Employee domain
│   └── approval/               # Approval domain
├── enums/
│   ├── common/
│   ├── organization/
│   └── approval/
└── constants/
    ├── common/
    └── i18n/
        ├── common.i18n.ts
        ├── organization.i18n.ts
        └── employee.i18n.ts
```

### Feature Module KHÔNG chứa:
- ❌ `models/` → Đặt trong `shared/models/{domain}/`
- ❌ `constants/` → Đặt trong `shared/constants/{domain}/`
- ❌ `enums/` → Đặt trong `shared/enums/{domain}/`
- ❌ `services/` → Đặt trong `services/api/{domain}/`

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

| Loại | Đường dẫn | Import Path | Cấu trúc |
|------|-----------|-------------|----------|
| Models | `src/app/shared/models/{domain}/` | `@app/shared/models` | By domain |
| Constants | `src/app/shared/constants/{domain}/` | `@app/shared/constants` | By domain |
| Enums | `src/app/shared/enums/{domain}/` | `@app/shared/enums` | By domain |
| i18n Keys | `src/app/shared/constants/i18n/` | `@app/shared/constants` | By domain |
| API Services | `src/app/services/api/{domain}/` | `@app/services` | By domain |
| Shared State | `src/app/services/shared-state/` | `@app/services` | Flat |
| Event Bus | `src/app/services/event-bus/` | `@app/services` | - |
| Shared Types | `src/app/shared/types/` | `@app/shared/types` | Flat |
| Component Types | `src/app/shared/components/types/` | `@app/shared/components` | Flat |
| Shared Components | `src/app/shared/components/` | `@app/shared/components` | By component |
| Pipes | `src/app/shared/pipes/` | `@app/shared/pipes` | Flat |
| Core Services | `src/app/core/services/` | `@app/core/services` | Flat |
| Base Classes | `src/app/core/base/` | `@app/core/base` | Flat |
| Feature Stores | `src/app/features/{feature}/store/` | Relative import | By feature |

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
- **Constants**: `shared/constants/i18n/{domain}.i18n.ts`

### Cấu trúc i18n Keys
```typescript
// shared/constants/i18n/organization.i18n.ts
export const I18N_TOCHUC = {
  TITLE: 'tochuc.title',
  LIST: {
    TITLE: 'tochuc.list.title',
  },
  FORM: {
    // ...
  },
  MESSAGES: {
    // ...
  }
} as const;
```

---

## 📝 Checklist khi tạo Feature mới

- [ ] Tạo domain folder trong `shared/models/{domain}/`
- [ ] Tạo models trong domain folder
- [ ] Tạo domain folder trong `shared/enums/{domain}/` (nếu cần)
- [ ] Tạo enums trong domain folder
- [ ] Tạo i18n keys trong `shared/constants/i18n/{domain}.i18n.ts`
- [ ] Tạo domain folder trong `services/api/{domain}/`
- [ ] Tạo API services trong domain folder
- [ ] Tạo feature folder với routes, pages, components, store
- [ ] Thêm translations vào `public/i18n/{vi,en,ja}.json`
- [ ] Export từ barrel files (index.ts) ở mỗi level
- [ ] Cập nhật app.routes.ts

**Chi tiết:** Xem `.kiro/steering/project-structure.md`

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
| 19/12/2025 | Chuyển sang cấu trúc DOMAIN-BASED cho models, enums, constants, services |
| 19/12/2025 | Cập nhật cấu trúc với services/api, shared-state, event-bus |
| 19/12/2025 | Loại bỏ models/constants/services khỏi features |
| 18/12/2025 | Di chuyển constants và models vào shared/ |
| 17/12/2025 | Thêm 60+ IDAS components |
| 17/12/2025 | Tái cấu trúc features với entry point |
