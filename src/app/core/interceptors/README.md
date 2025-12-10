# HTTP Interceptors

Các interceptors được sử dụng để xử lý HTTP requests/responses một cách tự động.

## Danh sách Interceptors

### 1. **authInterceptor** - Authentication
Tự động thêm authentication token và headers vào mọi request.

**Headers được thêm:**
- `Authorization: Bearer {token}`
- `Content-Type: application/json`
- `Accept: application/json`
- `X-Requested-With: XMLHttpRequest`

**Token source:** `localStorage.getItem('access_token')`

---

### 2. **loadingInterceptor** - Loading State
Tự động hiển thị/ẩn loading indicator khi gọi API.

**Sử dụng:** `LoadingService` với Angular Signals

**Skip loading cho request cụ thể:**
```typescript
const headers = new HttpHeaders({ 'X-Skip-Loading': 'true' });
this.http.get('/api/endpoint', { headers });
```

---

### 3. **cacheInterceptor** - Response Caching
Cache các GET requests trong 5 phút để giảm số lượng API calls.

**Chỉ cache:**
- GET requests
- Không có header `X-Skip-Cache`

**Skip cache:**
```typescript
const headers = new HttpHeaders({ 'X-Skip-Cache': 'true' });
this.http.get('/api/endpoint', { headers });
```

**Cache duration:** 5 phút (có thể config)

---

### 4. **responseInterceptor** - Response Transform & Error Handling
Transform response data và xử lý errors một cách thống nhất.

**Xử lý errors:**
- `0`: Không kết nối được server
- `401`: Phiên đăng nhập hết hạn
- `403`: Không có quyền truy cập
- `404`: Không tìm thấy dữ liệu
- `5xx`: Lỗi server

**Error format:**
```typescript
{
  ...originalError,
  userMessage: 'Thông báo lỗi cho user'
}
```

---

## Thứ tự thực thi

Interceptors được thực thi theo thứ tự khai báo trong `app.config.ts`:

```
Request Flow:
1. authInterceptor      → Thêm headers
2. loadingInterceptor   → Show loading
3. cacheInterceptor     → Check cache
4. responseInterceptor  → Transform response
   ↓
   API Server
   ↓
Response Flow (ngược lại):
4. responseInterceptor  → Handle errors
3. cacheInterceptor     → Save to cache
2. loadingInterceptor   → Hide loading
1. authInterceptor      → (không xử lý response)
```

---

## Cách sử dụng

### 1. Sử dụng ApiService (Recommended)

```typescript
import { inject } from '@angular/core';
import { ApiService } from '@core/services/api.service';

export class MyComponent {
  private apiService = inject(ApiService);

  loadData() {
    // GET với cache
    this.apiService.get<User[]>('/users').subscribe({
      next: (users) => console.log(users),
      error: (err) => console.error(err.userMessage)
    });

    // GET không cache
    this.apiService.get<User>('/users/1', { skipCache: true })
      .subscribe(user => console.log(user));

    // POST
    this.apiService.post<User>('/users', { name: 'John' })
      .subscribe(user => console.log(user));

    // Background sync (không loading)
    this.apiService.get<User[]>('/sync', { skipLoading: true })
      .subscribe(users => console.log(users));
  }
}
```

### 2. Sử dụng HttpClient trực tiếp

```typescript
import { inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class MyComponent {
  private http = inject(HttpClient);

  loadData() {
    // Request bình thường (có cache, có loading)
    this.http.get('/api/users').subscribe();

    // Skip cache
    const headers = new HttpHeaders({ 'X-Skip-Cache': 'true' });
    this.http.get('/api/users', { headers }).subscribe();

    // Skip loading
    const headers2 = new HttpHeaders({ 'X-Skip-Loading': 'true' });
    this.http.get('/api/users', { headers: headers2 }).subscribe();

    // Skip cả cache và loading
    const headers3 = new HttpHeaders({
      'X-Skip-Cache': 'true',
      'X-Skip-Loading': 'true'
    });
    this.http.get('/api/users', { headers: headers3 }).subscribe();
  }
}
```

### 3. Hiển thị Loading trong Template

```typescript
// Component
import { inject } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';

export class MyComponent {
  loadingService = inject(LoadingService);
}
```

```html
<!-- Template -->
@if (loadingService.isLoading()) {
  <nz-spin nzSimple [nzSize]="'large'"></nz-spin>
}
```

---

## Customization

### Thay đổi token source

Edit `auth.interceptor.ts`:
```typescript
// Thay vì localStorage, có thể inject AuthService
const authService = inject(AuthService);
const token = authService.getToken();
```

### Thay đổi cache duration

Edit `cache.interceptor.ts`:
```typescript
const CACHE_DURATION = 10 * 60 * 1000; // 10 phút
```

### Thêm custom headers

Edit `auth.interceptor.ts`:
```typescript
const authReq = req.clone({
  setHeaders: {
    Authorization: token ? `Bearer ${token}` : '',
    'X-Custom-Header': 'custom-value',
    'X-App-Version': '1.0.0'
  }
});
```

### Transform response format

Edit `response.interceptor.ts`:
```typescript
if (event instanceof HttpResponse) {
  // Nếu API trả về: { success: true, data: {...} }
  // Transform thành: {...}
  if (event.body?.success && event.body?.data) {
    return event.clone({ body: event.body.data });
  }
}
```

---

## Testing

### Mock interceptors trong tests

```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

TestBed.configureTestingModule({
  providers: [
    provideHttpClient(withInterceptors([])), // Không dùng interceptors
    provideHttpClientTesting()
  ]
});
```

---

## Best Practices

1. ✅ Sử dụng `ApiService` thay vì `HttpClient` trực tiếp
2. ✅ Skip cache cho data thay đổi thường xuyên
3. ✅ Skip loading cho background sync
4. ✅ Xử lý errors trong component với `error.userMessage`
5. ✅ Lưu token an toàn (không dùng localStorage cho production)
6. ✅ Log requests/responses trong development mode only

---

## Troubleshooting

### Token không được gửi
- Kiểm tra token có trong localStorage: `localStorage.getItem('access_token')`
- Kiểm tra thứ tự interceptors trong `app.config.ts`

### Cache không hoạt động
- Chỉ cache GET requests
- Kiểm tra không có header `X-Skip-Cache`

### Loading không ẩn
- Kiểm tra `LoadingService.hide()` được gọi trong `finalize()`
- Reset loading: `loadingService.reset()`

### CORS errors
- Thêm headers vào server CORS config
- Kiểm tra `X-Requested-With` header
