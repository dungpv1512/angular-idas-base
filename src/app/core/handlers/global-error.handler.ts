import { ErrorHandler, Injectable, inject, NgZone } from '@angular/core';
import { ErrorService } from '@core/services/error.service';

/**
 * Global Error Handler
 * Bắt tất cả lỗi không được xử lý trong ứng dụng
 *
 * Được đăng ký trong app.config.ts:
 * ```typescript
 * { provide: ErrorHandler, useClass: GlobalErrorHandler }
 * ```
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly errorService = inject(ErrorService);
  private readonly ngZone = inject(NgZone);

  /**
   * Xử lý lỗi không được catch
   */
  handleError(error: unknown): void {
    // Chạy trong NgZone để đảm bảo change detection hoạt động
    this.ngZone.run(() => {
      // Xác định loại lỗi
      if (error instanceof Error) {
        this.handleJsError(error);
      } else if (typeof error === 'string') {
        this.handleStringError(error);
      } else {
        this.handleUnknownError(error);
      }
    });

    // Log ra console để debug
    console.error('[GlobalErrorHandler] Unhandled error:', error);
  }

  /**
   * Xử lý JavaScript Error
   */
  private handleJsError(error: Error): void {
    // Kiểm tra các loại lỗi đặc biệt
    const errorName = error.name.toLowerCase();
    const errorMessage = error.message.toLowerCase();

    // Chunk loading error (lazy loading fail)
    if (errorMessage.includes('loading chunk') || errorMessage.includes('chunkloaderror')) {
      this.errorService.addError({
        message: 'Không thể tải module. Vui lòng kiểm tra kết nối mạng và thử lại.',
        severity: 'error',
        code: 'CHUNK_LOAD_ERROR',
        details: error.message,
        stack: error.stack
      });
      return;
    }

    // Network error
    if (errorName === 'typeerror' && errorMessage.includes('network')) {
      this.errorService.addError({
        message: 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.',
        severity: 'error',
        code: 'NETWORK_ERROR',
        details: error.message
      });
      return;
    }

    // Out of memory
    if (errorMessage.includes('out of memory') || errorMessage.includes('allocation')) {
      this.errorService.addError({
        message: 'Ứng dụng đã hết bộ nhớ. Vui lòng tải lại trang.',
        severity: 'fatal',
        code: 'OUT_OF_MEMORY',
        details: error.message
      });
      return;
    }

    // Generic JS error
    this.errorService.addError({
      message: 'Đã xảy ra lỗi không mong muốn.',
      severity: 'error',
      code: 'JS_ERROR',
      details: error.message,
      stack: error.stack
    });
  }

  /**
   * Xử lý lỗi dạng string
   */
  private handleStringError(error: string): void {
    this.errorService.addError({
      message: error,
      severity: 'error',
      code: 'STRING_ERROR'
    });
  }

  /**
   * Xử lý lỗi không xác định
   */
  private handleUnknownError(error: unknown): void {
    this.errorService.addError({
      message: 'Đã xảy ra lỗi không xác định.',
      severity: 'error',
      code: 'UNKNOWN_ERROR',
      details: JSON.stringify(error)
    });
  }
}
