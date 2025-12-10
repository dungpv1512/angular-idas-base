import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

/**
 * Response Interceptor - Transform response data và xử lý errors
 */
export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap(event => {
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
    catchError(error => {
      // Xử lý errors
      console.error('API Error:', {
        url: req.url,
        status: error.status,
        message: error.message,
        error: error.error
      });

      // Transform error message
      let errorMessage = 'Đã xảy ra lỗi';
      
      if (error.status === 0) {
        errorMessage = 'Không thể kết nối đến server';
      } else if (error.status === 401) {
        errorMessage = 'Phiên đăng nhập hết hạn';
        // Có thể redirect đến trang login
      } else if (error.status === 403) {
        errorMessage = 'Bạn không có quyền truy cập';
      } else if (error.status === 404) {
        errorMessage = 'Không tìm thấy dữ liệu';
      } else if (error.status >= 500) {
        errorMessage = 'Lỗi server, vui lòng thử lại sau';
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }

      return throwError(() => ({
        ...error,
        userMessage: errorMessage
      }));
    })
  );
};
