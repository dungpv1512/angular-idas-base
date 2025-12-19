import { inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ApiResponse, PaginatedResponse, PaginationParams } from './types';

/**
 * Base API Service - Lớp cơ sở cho tất cả API services
 * Cung cấp các phương thức CRUD chuẩn và xử lý lỗi tập trung
 *
 * Đặc điểm:
 * - Tất cả methods trả về Observable với ApiResponse wrapper
 * - Hỗ trợ pagination với PaginatedResponse
 * - Tự động build HttpParams từ object
 *
 * @example
 * ```typescript
 * @Injectable()
 * export class EmployeeApiService extends BaseApiService {
 *   protected readonly baseUrl = '/employees';
 *
 *   getEmployees(filter?: EmployeeFilter): Observable<ApiResponse<PaginatedResponse<Employee>>> {
 *     return this.getPaginated<Employee>(this.buildParams(filter));
 *   }
 * }
 * ```
 */
export abstract class BaseApiService {
  /**
   * HttpClient được inject tự động
   */
  protected readonly http: HttpClient = inject(HttpClient);

  /**
   * Base URL của endpoint (không bao gồm API URL)
   * Ví dụ: '/employees', '/departments'
   * Subclass phải override property này
   */
  protected abstract readonly baseUrl: string;

  /**
   * Full URL của endpoint (API URL + baseUrl)
   */
  protected get fullUrl(): string {
    return `${environment.apiUrl}${this.baseUrl}`;
  }

  /**
   * Lấy danh sách tất cả items
   *
   * @param params - HttpParams cho query string
   * @returns Observable với ApiResponse chứa array items
   */
  protected getAll<T>(params?: HttpParams): Observable<ApiResponse<T[]>> {
    return this.http.get<ApiResponse<T[]>>(this.fullUrl, { params });
  }

  /**
   * Lấy danh sách items với pagination
   *
   * @param params - HttpParams cho query string (bao gồm page, pageSize)
   * @returns Observable với ApiResponse chứa PaginatedResponse
   */
  protected getPaginated<T>(params?: HttpParams): Observable<ApiResponse<PaginatedResponse<T>>> {
    return this.http.get<ApiResponse<PaginatedResponse<T>>>(this.fullUrl, { params });
  }

  /**
   * Lấy item theo ID
   *
   * @param id - ID của item
   * @returns Observable với ApiResponse chứa item
   */
  protected getById<T>(id: string | number): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.fullUrl}/${id}`);
  }

  /**
   * Tạo mới item
   *
   * @param data - Dữ liệu để tạo item
   * @returns Observable với ApiResponse chứa item đã tạo
   */
  protected create<T>(data: Partial<T>): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(this.fullUrl, data);
  }

  /**
   * Cập nhật item
   *
   * @param id - ID của item
   * @param data - Dữ liệu cập nhật
   * @returns Observable với ApiResponse chứa item đã cập nhật
   */
  protected update<T>(id: string | number, data: Partial<T>): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(`${this.fullUrl}/${id}`, data);
  }

  /**
   * Xóa item
   *
   * @param id - ID của item cần xóa
   * @returns Observable với ApiResponse void
   */
  protected delete(id: string | number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.fullUrl}/${id}`);
  }

  /**
   * Build HttpParams từ object
   * Tự động loại bỏ các giá trị undefined, null, empty string
   *
   * @param params - Object chứa các params
   * @returns HttpParams đã được build
   */
  protected buildParams(params?: PaginationParams): HttpParams {
    let httpParams = new HttpParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }

    return httpParams;
  }
}
