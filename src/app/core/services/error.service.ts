import { Injectable, signal, computed } from '@angular/core';

/**
 * Mức độ nghiêm trọng của lỗi
 */
export type ErrorSeverity = 'info' | 'warning' | 'error' | 'fatal';

/**
 * Interface cho thông tin lỗi
 */
export interface AppError {
  id: string;
  message: string;
  severity: ErrorSeverity;
  code?: string;
  details?: string;
  stack?: string;
  timestamp: Date;
  dismissed: boolean;
}

/**
 * Options khi thêm lỗi mới
 */
export interface AddErrorOptions {
  message: string;
  severity?: ErrorSeverity;
  code?: string;
  details?: string;
  stack?: string;
  autoDismiss?: boolean;
  autoDismissDelay?: number;
}

/**
 * Error Service - Quản lý lỗi toàn cục
 * Sử dụng Signals để reactive state management
 */
@Injectable({ providedIn: 'root' })
export class ErrorService {
  /**
   * Danh sách tất cả lỗi
   */
  private readonly _errors = signal<AppError[]>([]);

  /**
   * Lỗi fatal hiện tại (nếu có)
   */
  private readonly _fatalError = signal<AppError | null>(null);

  /**
   * Danh sách lỗi chưa dismiss
   */
  readonly errors = computed(() => this._errors().filter((e) => !e.dismissed));

  /**
   * Lỗi fatal (block UI)
   */
  readonly fatalError = this._fatalError.asReadonly();

  /**
   * Có lỗi fatal hay không
   */
  readonly hasFatalError = computed(() => this._fatalError() !== null);

  /**
   * Số lượng lỗi chưa dismiss
   */
  readonly errorCount = computed(() => this.errors().length);

  /**
   * Có lỗi hay không
   */
  readonly hasErrors = computed(() => this.errorCount() > 0);

  /**
   * Thêm lỗi mới
   */
  addError(options: AddErrorOptions): string {
    const id = this.generateId();
    const error: AppError = {
      id,
      message: options.message,
      severity: options.severity ?? 'error',
      code: options.code,
      details: options.details,
      stack: options.stack,
      timestamp: new Date(),
      dismissed: false
    };

    // Nếu là fatal error, set riêng
    if (error.severity === 'fatal') {
      this._fatalError.set(error);
    }

    this._errors.update((errors) => [...errors, error]);

    // Auto dismiss nếu được cấu hình
    if (options.autoDismiss !== false && error.severity !== 'fatal') {
      const delay = options.autoDismissDelay ?? this.getDefaultDelay(error.severity);
      setTimeout(() => this.dismissError(id), delay);
    }

    // Log lỗi ra console
    this.logError(error);

    return id;
  }

  /**
   * Thêm lỗi từ Error object
   */
  addFromError(error: Error, severity: ErrorSeverity = 'error'): string {
    return this.addError({
      message: error.message,
      severity,
      stack: error.stack,
      details: error.name
    });
  }

  /**
   * Thêm lỗi HTTP
   */
  addHttpError(status: number, message: string, url?: string): string {
    const severity: ErrorSeverity = status >= 500 ? 'error' : 'warning';
    return this.addError({
      message,
      severity,
      code: `HTTP_${status}`,
      details: url ? `URL: ${url}` : undefined
    });
  }

  /**
   * Dismiss một lỗi
   */
  dismissError(id: string): void {
    this._errors.update((errors) =>
      errors.map((e) => (e.id === id ? { ...e, dismissed: true } : e))
    );

    // Nếu là fatal error, clear nó
    const fatalError = this._fatalError();
    if (fatalError?.id === id) {
      this._fatalError.set(null);
    }
  }

  /**
   * Dismiss tất cả lỗi
   */
  dismissAll(): void {
    this._errors.update((errors) => errors.map((e) => ({ ...e, dismissed: true })));
    this._fatalError.set(null);
  }

  /**
   * Xóa tất cả lỗi đã dismiss
   */
  clearDismissed(): void {
    this._errors.update((errors) => errors.filter((e) => !e.dismissed));
  }

  /**
   * Reset service
   */
  reset(): void {
    this._errors.set([]);
    this._fatalError.set(null);
  }

  /**
   * Tạo ID unique
   */
  private generateId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Lấy delay mặc định theo severity
   */
  private getDefaultDelay(severity: ErrorSeverity): number {
    switch (severity) {
      case 'info':
        return 3000;
      case 'warning':
        return 5000;
      case 'error':
        return 8000;
      case 'fatal':
        return 0; // Không auto dismiss
      default:
        return 5000;
    }
  }

  /**
   * Log lỗi ra console
   */
  private logError(error: AppError): void {
    const logMethod = error.severity === 'fatal' || error.severity === 'error' ? 'error' : 'warn';
    console[logMethod](`[ErrorService] ${error.severity.toUpperCase()}:`, {
      message: error.message,
      code: error.code,
      details: error.details,
      timestamp: error.timestamp
    });

    if (error.stack) {
      console[logMethod]('[ErrorService] Stack:', error.stack);
    }
  }
}
