# Ví dụ sử dụng HTTP Interceptors

## 1. Component với ApiService

```typescript
// user-list.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService, User } from '@core/services/user.service';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonModule],
  template: `
    <div class="user-list">
      <!-- Loading indicator -->
      @if (loadingService.isLoading()) {
        <div class="loading-overlay">
          <nz-spin nzSimple [nzSize]="'large'"></nz-spin>
        </div>
      }

      <!-- User table -->
      <nz-table [nzData]="users()" [nzLoading]="false">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (user of users(); track user.id) {
            <tr>
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <button nz-button nzType="primary" (click)="viewUser(user.id)">
                  View
                </button>
                <button nz-button nzType="default" (click)="editUser(user.id)">
                  Edit
                </button>
                <button nz-button nzDanger (click)="deleteUser(user.id)">
                  Delete
                </button>
              </td>
            </tr>
          }
        </tbody>
      </nz-table>

      <!-- Actions -->
      <div class="actions">
        <button nz-button nzType="primary" (click)="loadUsers()">
          Refresh
        </button>
        <button nz-button nzType="default" (click)="syncUsers()">
          Background Sync
        </button>
      </div>
    </div>
  `,
  styles: [`
    .user-list {
      padding: 24px;
      position: relative;
    }

    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .actions {
      margin-top: 16px;
      display: flex;
      gap: 8px;
    }
  `]
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);
  private message = inject(NzMessageService);
  loadingService = inject(LoadingService);

  users = signal<User[]>([]);

  ngOnInit() {
    this.loadUsers();
  }

  /**
   * Load users - có cache và loading indicator
   */
  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.message.success('Tải danh sách thành công');
      },
      error: (err) => {
        this.message.error(err.userMessage || 'Có lỗi xảy ra');
      }
    });
  }

  /**
   * View user detail - không cache
   */
  viewUser(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        console.log('User detail:', user);
        this.message.info(`Viewing ${user.name}`);
      },
      error: (err) => {
        this.message.error(err.userMessage);
      }
    });
  }

  /**
   * Edit user
   */
  editUser(id: number) {
    const updatedData = { name: 'Updated Name' };
    
    this.userService.updateUser(id, updatedData).subscribe({
      next: (user) => {
        this.message.success('Cập nhật thành công');
        this.loadUsers(); // Refresh list
      },
      error: (err) => {
        this.message.error(err.userMessage);
      }
    });
  }

  /**
   * Delete user
   */
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.message.success('Xóa thành công');
        this.loadUsers(); // Refresh list
      },
      error: (err) => {
        this.message.error(err.userMessage);
      }
    });
  }

  /**
   * Background sync - không hiển thị loading
   */
  syncUsers() {
    this.userService.syncUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.message.info('Đồng bộ hoàn tất');
      },
      error: (err) => {
        console.error('Sync failed:', err);
      }
    });
  }
}
```

---

## 2. Service với Custom Options

```typescript
// product.service.ts
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiService = inject(ApiService);

  /**
   * Get products - có cache
   */
  getProducts(): Observable<Product[]> {
    return this.apiService.get<Product[]>('/products');
  }

  /**
   * Get product detail - không cache (data thay đổi thường xuyên)
   */
  getProductById(id: number): Observable<Product> {
    return this.apiService.get<Product>(`/products/${id}`, { 
      skipCache: true 
    });
  }

  /**
   * Search products - không cache
   */
  searchProducts(query: string): Observable<Product[]> {
    return this.apiService.get<Product[]>(`/products/search?q=${query}`, {
      skipCache: true
    });
  }

  /**
   * Update product inventory - background task, không loading
   */
  updateInventory(id: number, quantity: number): Observable<void> {
    return this.apiService.post<void>(`/products/${id}/inventory`, 
      { quantity },
      { skipLoading: true }
    );
  }

  /**
   * Bulk update - có loading
   */
  bulkUpdate(products: Product[]): Observable<Product[]> {
    return this.apiService.post<Product[]>('/products/bulk', products);
  }
}
```

---

## 3. Authentication Flow

```typescript
// auth.service.ts
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiService = inject(ApiService);
  private router = inject(Router);

  /**
   * Login - lưu token vào localStorage
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.apiService.post<LoginResponse>('/auth/login', credentials).pipe(
      tap(response => {
        // Lưu token - authInterceptor sẽ tự động sử dụng
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  /**
   * Logout - xóa token
   */
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Refresh token
   */
  refreshToken(): Observable<LoginResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.apiService.post<LoginResponse>('/auth/refresh', {
      refresh_token: refreshToken
    }).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access_token);
      })
    );
  }
}
```

---

## 4. Error Handling trong Component

```typescript
// error-handling.component.ts
import { Component, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-error-handling',
  standalone: true,
  template: `
    <button nz-button (click)="handleErrors()">Test Error Handling</button>
  `
})
export class ErrorHandlingComponent {
  private userService = inject(UserService);
  private message = inject(NzMessageService);
  private modal = inject(NzModalService);

  handleErrors() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log('Success:', users);
      },
      error: (err) => {
        // err.userMessage được thêm bởi responseInterceptor
        
        // Hiển thị message ngắn
        this.message.error(err.userMessage);

        // Hoặc hiển thị modal chi tiết
        if (err.status >= 500) {
          this.modal.error({
            nzTitle: 'Lỗi Server',
            nzContent: err.userMessage,
            nzOkText: 'Đóng'
          });
        }

        // Log chi tiết cho dev
        console.error('API Error:', {
          status: err.status,
          message: err.userMessage,
          originalError: err
        });

        // Xử lý theo status code
        switch (err.status) {
          case 401:
            // Redirect to login
            this.router.navigate(['/login']);
            break;
          case 403:
            // Show permission denied
            this.message.warning('Bạn không có quyền thực hiện thao tác này');
            break;
          case 404:
            // Show not found
            this.message.info('Không tìm thấy dữ liệu');
            break;
        }
      }
    });
  }
}
```

---

## 5. Global Loading Component

```typescript
// app.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzSpinModule],
  template: `
    <!-- Global loading overlay -->
    @if (loadingService.isLoading()) {
      <div class="global-loading">
        <nz-spin nzSimple [nzSize]="'large'" nzTip="Đang tải..."></nz-spin>
      </div>
    }

    <!-- App content -->
    <router-outlet />
  `,
  styles: [`
    .global-loading {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
  `]
})
export class AppComponent {
  loadingService = inject(LoadingService);
}
```

---

## 6. Testing với Interceptors

```typescript
// user.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient(withInterceptors([])), // Không dùng interceptors
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get users', () => {
    const mockUsers = [
      { id: 1, name: 'User 1', email: 'user1@example.com' }
    ];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
```

---

## Tips & Best Practices

1. **Luôn sử dụng ApiService** thay vì HttpClient trực tiếp
2. **Skip cache** cho data thay đổi thường xuyên (search, real-time data)
3. **Skip loading** cho background tasks không quan trọng
4. **Xử lý errors** với `err.userMessage` từ responseInterceptor
5. **Test** với `provideHttpClientTesting()` và không dùng interceptors
6. **Security**: Không lưu sensitive tokens trong localStorage (production)
7. **Performance**: Sử dụng cache cho static data (categories, settings)
