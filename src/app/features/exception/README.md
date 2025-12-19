# Module Exception

Module hiển thị các trang lỗi: 403 Forbidden, 404 Not Found, 500 Server Error.

## Cấu trúc thư mục

```
exception/
├── routes/
│   └── exception.routes.ts
├── pages/
│   ├── forbidden/
│   │   ├── forbidden.page.ts
│   │   ├── forbidden.page.html
│   │   └── forbidden.page.less
│   ├── not-found/
│   │   ├── not-found.page.ts
│   │   ├── not-found.page.html
│   │   └── not-found.page.less
│   └── server-error/
│       ├── server-error.page.ts
│       ├── server-error.page.html
│       └── server-error.page.less
├── exception.feature.ts
└── README.md
```

## Pages

### ForbiddenPage (403)
Hiển thị khi user không có quyền truy cập.

### NotFoundPage (404)
Hiển thị khi không tìm thấy trang.

### ServerErrorPage (500)
Hiển thị khi có lỗi server.

## Usage

### Import routes từ entry point
```typescript
import { EXCEPTION_ROUTES } from '@app/features/exception/exception.feature';
```

### Trong app.routes.ts
```typescript
{
  path: 'exception',
  loadChildren: () => import('@app/features/exception/exception.feature').then(m => m.EXCEPTION_ROUTES)
}
```

### Navigate to exception pages
```typescript
this.router.navigate(['/exception/403']);
this.router.navigate(['/exception/404']);
this.router.navigate(['/exception/500']);
```
