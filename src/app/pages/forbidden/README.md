# 403 Forbidden Page

Trang hiển thị khi user không có quyền truy cập.

## Cách sử dụng

### 1. Cấu hình quyền trong AuthService

```typescript
// src/app/core/services/auth.service.ts
const mockUser: AuthUser = {
  id: 1,
  name: 'Demo User',
  email: 'demo@example.com',
  permissions: {
    canViewToChuc: true,  // Đổi thành false để test 403
    canEditToChuc: false,
    canDeleteToChuc: false
  }
};
```

### 2. Bảo vệ route với permission guard

```typescript
// src/app/app.routes.ts
import { permissionGuard } from './core/guards/permission.guard';

{
  path: 'tochuc',
  canActivate: [permissionGuard(['canViewToChuc'])],
  loadChildren: () => import('./pages/tochuc/tochuc.routes').then(m => m.toChucRoutes)
}
```

### 3. Các tùy chọn guard

```typescript
// Yêu cầu ít nhất 1 quyền (mặc định)
canActivate: [permissionGuard(['canViewToChuc', 'canEditToChuc'])]

// Yêu cầu tất cả các quyền
canActivate: [permissionGuard(['canViewToChuc', 'canEditToChuc'], true)]
```

## Test

1. Để test trang 403, đổi `canViewToChuc: false` trong AuthService
2. Truy cập `/tochuc` sẽ tự động redirect về `/403`
3. Đổi lại `canViewToChuc: true` để có quyền truy cập

## Features

- Sử dụng Blank Layout (không có sidebar/header)
- Nút "Về trang chủ" và "Quay lại"
- Design theo chuẩn ng-zorro-antd
- Responsive và user-friendly
