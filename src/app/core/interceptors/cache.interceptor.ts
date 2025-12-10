import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Cache Interceptor - Cache GET requests
 */
const cache = new Map<string, HttpResponse<any>>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 phút

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  // Chỉ cache GET requests
  if (req.method !== 'GET') {
    return next(req);
  }

  // Kiểm tra nếu request có header skip cache
  if (req.headers.has('X-Skip-Cache')) {
    return next(req);
  }

  // Kiểm tra cache
  const cachedResponse = cache.get(req.url);
  if (cachedResponse) {
    console.log('Returning cached response for:', req.url);
    return of(cachedResponse.clone());
  }

  // Gọi API và cache response
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cache.set(req.url, event.clone());
        
        // Xóa cache sau CACHE_DURATION
        setTimeout(() => {
          cache.delete(req.url);
        }, CACHE_DURATION);
      }
    })
  );
};
