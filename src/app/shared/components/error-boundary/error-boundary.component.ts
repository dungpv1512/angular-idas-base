import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { ErrorService, AppError } from '@core/services/error.service';

/**
 * Error Boundary Component
 * Hiển thị UI xử lý lỗi toàn cục
 *
 * - Fatal errors: Block toàn bộ UI với màn hình lỗi
 * - Normal errors: Hiển thị notification ở góc màn hình
 *
 * @example
 * ```html
 * <app-error-boundary>
 *   <router-outlet />
 * </app-error-boundary>
 * ```
 */
@Component({
  selector: 'app-error-boundary',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzResultModule,
    NzButtonModule,
    NzAlertModule,
    NzIconModule,
    NzBadgeModule
  ],
  templateUrl: './error-boundary.component.html',
  styleUrl: './error-boundary.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorBoundaryComponent {
  protected readonly errorService = inject(ErrorService);

  /**
   * Signals từ ErrorService
   */
  readonly hasFatalError = this.errorService.hasFatalError;
  readonly fatalError = this.errorService.fatalError;
  readonly errors = this.errorService.errors;
  readonly hasErrors = this.errorService.hasErrors;
  readonly errorCount = this.errorService.errorCount;

  /**
   * Dismiss một lỗi
   */
  onDismiss(error: AppError): void {
    this.errorService.dismissError(error.id);
  }

  /**
   * Dismiss tất cả lỗi
   */
  onDismissAll(): void {
    this.errorService.dismissAll();
  }

  /**
   * Reload trang
   */
  onReload(): void {
    window.location.reload();
  }

  /**
   * Quay về trang chủ
   */
  onGoHome(): void {
    window.location.href = '/';
  }

  /**
   * Lấy icon theo severity
   */
  getIcon(severity: string): string {
    switch (severity) {
      case 'info':
        return 'info-circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'close-circle';
      case 'fatal':
        return 'stop';
      default:
        return 'exclamation-circle';
    }
  }

  /**
   * Lấy type cho nz-alert theo severity
   */
  getAlertType(severity: string): 'success' | 'info' | 'warning' | 'error' {
    switch (severity) {
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      case 'error':
      case 'fatal':
        return 'error';
      default:
        return 'error';
    }
  }

  /**
   * Track by function cho ngFor
   */
  trackByErrorId(_index: number, error: AppError): string {
    return error.id;
  }
}
