# Module Forbidden (403)

Module hiển thị trang 403 Forbidden khi user không có quyền truy cập.

## Cấu trúc thư mục

```
forbidden/
├── routes/
│   └── forbidden.routes.ts
├── pages/
│   └── forbidden/
│       ├── forbidden.component.ts
│       ├── forbidden.component.html
│       └── forbidden.component.less
├── forbidden.feature.ts            # entry point
└── README.md
```

## Components

### ForbiddenComponent
Component hiển thị trang 403 với:
- Thông báo không có quyền truy cập
- Nút "Về trang chủ"
- Nút "Quay lại"

## Usage

### Import routes từ entry point
```typescript
import { FORBIDDEN_ROUTES } from '@app/features/forbidden/forbidden.feature';
```

### Trong app.routes.ts
```typescript
{
  path: '403',
  loadChildren: () => import('@app/features/forbidden/forbidden.feature').then(m => m.FORBIDDEN_ROUTES),
  title: '403 - Forbidden'
}
```

### Navigate to forbidden page
```typescript
this.router.navigate(['/403']);
```

## Path Aliases

Module này sử dụng path aliases:
- `@app/*` → `src/app/*`

Ví dụ:
```typescript
import { BlankLayoutComponent } from '@app/layouts/blank-layout/blank-layout.component';
```
