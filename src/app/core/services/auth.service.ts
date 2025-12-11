import { Injectable, signal } from '@angular/core';

/**
 * Auth Service - Quản lý authentication và authorization
 */
export interface UserPermissions {
  canViewToChuc?: boolean;
  canEditToChuc?: boolean;
  canDeleteToChuc?: boolean;
  // Thêm các quyền khác tùy theo nhu cầu
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  permissions: UserPermissions;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signal để quản lý user state
  private currentUser = signal<AuthUser | null>(null);
  
  // Expose readonly signal
  user = this.currentUser.asReadonly();

  constructor() {
    // Mock user - trong thực tế sẽ load từ API/localStorage
    this.loadMockUser();
  }

  /**
   * Load mock user để demo
   * Trong thực tế, load từ API hoặc localStorage
   */
  private loadMockUser(): void {
    const mockUser: AuthUser = {
      id: 1,
      name: 'Demo User',
      email: 'demo@example.com',
      permissions: {
        canViewToChuc: true, // Đổi thành false để test 403
        canEditToChuc: false,
        canDeleteToChuc: false
      }
    };
    this.currentUser.set(mockUser);
  }

  /**
   * Kiểm tra user có quyền cụ thể không
   */
  hasPermission(permission: keyof UserPermissions): boolean {
    const user = this.currentUser();
    if (!user) return false;
    return user.permissions[permission] === true;
  }

  /**
   * Kiểm tra user có ít nhất một trong các quyền không
   */
  hasAnyPermission(permissions: (keyof UserPermissions)[]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }

  /**
   * Kiểm tra user có tất cả các quyền không
   */
  hasAllPermissions(permissions: (keyof UserPermissions)[]): boolean {
    return permissions.every(permission => this.hasPermission(permission));
  }

  /**
   * Login - mock function
   */
  login(email: string, password: string): Promise<AuthUser> {
    // Mock login
    return Promise.resolve(this.currentUser()!);
  }

  /**
   * Logout
   */
  logout(): void {
    this.currentUser.set(null);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }
}
