import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserPermissions } from '../services/auth.service';

/**
 * Permission Guard Factory
 * Tạo guard để kiểm tra quyền truy cập
 * 
 * @example
 * // Trong routes
 * {
 *   path: 'tochuc',
 *   canActivate: [permissionGuard(['canViewToChuc'])],
 *   loadChildren: ...
 * }
 */
export function permissionGuard(
  requiredPermissions: (keyof UserPermissions)[],
  requireAll: boolean = false
): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Kiểm tra authentication
    if (!authService.isAuthenticated()) {
      router.navigate(['/403']);
      return false;
    }

    // Kiểm tra authorization
    const hasPermission = requireAll
      ? authService.hasAllPermissions(requiredPermissions)
      : authService.hasAnyPermission(requiredPermissions);

    if (!hasPermission) {
      router.navigate(['/403']);
      return false;
    }

    return true;
  };
}
