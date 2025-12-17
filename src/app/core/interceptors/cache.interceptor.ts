import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

/**
 * Interface cho cache entry
 */
interface CacheEntry {
  response: HttpResponse<unknown>;
  timestamp: number;
}

/**
 * Cache storage - lưu trữ responses
 */
const cache = new Map<string, CacheEntry>();

/**
 * Thời gian cache mặc định (5 phút)
 */
const DEFAULT_CACHE_TTL = 5 * 60 * 1000;

/**
 * Các URL patterns được cache
 * Chỉ cache các GET requests cho static/reference data
 */
const CACHEABLE_PATTERNS: RegExp[] = [
  /\/api\/v1\/reference\//,      // Reference data
  /\/api\/v1\/lookup\//,         // Lookup data
  /\/api\/v1\/config\//,         // Config data
  /\/assets\/.*\.json$/          // Static JSON files
];

/**
 * Kiểm tra URL có được cache hay không
 */
function isCacheable(url: string): boolean {
  return CACHEABLE_PATTERNS.some((pattern) => pattern.test(url));
}

/**
 * Tạo cache key từ request
 */
function createCacheKey(url: string, params?: string): string {
  return params ? `${url}?${params}` : url;
}

/**
 * Kiểm tra cache entry còn valid hay không
 */
function isValidCache(entry: CacheEntry, ttl: number = DEFAULT_CACHE_TTL): boolean {
  return Date.now() - entry.timestamp < ttl;
}

/**
 * Cache Interceptor - Cache HTTP GET responses
 *
 * Chỉ cache các requests:
 * - Method: GET
 * - URL match với CACHEABLE_PATTERNS
 * - Không có header 'X-Skip-Cache'
 *
 * @example
 * // Skip cache cho request cụ thể
 * this.http.get('/api/v1/reference/departments', {
 *   headers: { 'X-Skip-Cache': 'true' }
 * });
 *
 * // Clear cache
 * clearHttpCache();
 * clearHttpCache('/api/v1/reference/departments');
 */
export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  // Chỉ cache GET requests
  if (req.method !== 'GET') {
    return next(req);
  }

  // Skip cache nếu có header
  if (req.headers.has('X-Skip-Cache')) {
    const newReq = req.clone({
      headers: req.headers.delete('X-Skip-Cache')
    });
    return next(newReq);
  }

  // Kiểm tra URL có được cache không
  if (!isCacheable(req.url)) {
    return next(req);
  }

  // Tạo cache key
  const cacheKey = createCacheKey(req.url, req.params.toString());

  // Kiểm tra cache
  const cachedEntry = cache.get(cacheKey);
  if (cachedEntry && isValidCache(cachedEntry)) {
    console.log(`[CacheInterceptor] Cache hit: ${cacheKey}`);
    return of(cachedEntry.response.clone());
  }

  // Gọi API và cache response
  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        console.log(`[CacheInterceptor] Caching: ${cacheKey}`);
        cache.set(cacheKey, {
          response: event.clone(),
          timestamp: Date.now()
        });
      }
    })
  );
};

/**
 * Xóa cache
 * @param urlPattern - URL pattern để xóa, nếu không truyền sẽ xóa tất cả
 */
export function clearHttpCache(urlPattern?: string): void {
  if (urlPattern) {
    // Xóa cache theo pattern
    const keysToDelete: string[] = [];
    cache.forEach((_, key) => {
      if (key.includes(urlPattern)) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach((key) => cache.delete(key));
    console.log(`[CacheInterceptor] Cleared ${keysToDelete.length} cache entries for: ${urlPattern}`);
  } else {
    // Xóa tất cả cache
    const size = cache.size;
    cache.clear();
    console.log(`[CacheInterceptor] Cleared all ${size} cache entries`);
  }
}

/**
 * Lấy thông tin cache hiện tại (cho debugging)
 */
export function getCacheInfo(): { key: string; age: number }[] {
  const now = Date.now();
  const info: { key: string; age: number }[] = [];

  cache.forEach((entry, key) => {
    info.push({
      key,
      age: Math.round((now - entry.timestamp) / 1000) // seconds
    });
  });

  return info;
}
