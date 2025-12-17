import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ErrorService } from '@core/services/error.service';

/**
 * Response Interceptor - Transform response data và xử lý errors
 * Tự động hiển thị error message cho tất cả API calls
 * Tích hợp với ErrorService để quản lý lỗi toàn cục
 */
export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  const translate = inject(TranslateService);
  const message = inject(NzMessageService);
  const errorService = inject(ErrorService);

  return next(req).pipe(
    tap((event) => {
      // Xử lý response thành công
      if (event instanceof HttpResponse) {
        console.log('API Response:', {
          url: req.url,
          status: event.status,
          body: event.body
        });

        // Transform response nếu cần
        // Ví dụ: unwrap data từ wrapper object
        if (event.body && typeof event.body === 'object') {
          // Nếu API trả về format: { success: true, data: {...}, message: '' }
          // Có thể transform ở đây
        }
      }
    }),
    catchError((error) => {
      // Xử lý errors
      console.error('API Error:', {
        url: req.url,
        status: error.status,
        message: error.message,
        error: error.error
      });

      // Transform error message using i18n
      let errorMessage = translate.instant('errors.general');
      let errorCode = `HTTP_${error.status}`;

      if (error.status === 0) {
        errorMessage = translate.instant('errors.network');
        errorCode = 'NETWORK_ERROR';
      } else if (error.status === 401) {
        errorMessage = translate.instant('errors.unauthorized');
        // Có thể redirect đến trang login
      } else if (error.status === 403) {
        errorMessage = translate.instant('errors.forbidden');
      } else if (error.status === 404) {
        errorMessage = translate.instant('errors.notFound');
      } else if (error.status >= 500) {
        errorMessage = translate.instant('errors.server');
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }

      // Hiển thị toast message
      message.error(errorMessage);

      // Thêm vào ErrorService để hiển thị trong Error Boundary
      // Chỉ thêm các lỗi nghiêm trọng (500+) hoặc network error
      if (error.status === 0 || error.status >= 500) {
        errorService.addHttpError(error.status, errorMessage, req.url);
      }

      return throwError(() => ({
        ...error,
        userMessage: errorMessage,
        errorCode
      }));
    })
  );
};
