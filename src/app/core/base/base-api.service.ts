import { inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { PaginatedResponse, PaginationParams } from './types';

/**
 * Base API Service - Lớp cơ sở cho tất cả API services
 * Cung cấp các phương thức CRUD chuẩn và xử lý lỗi tập trung
 *
 * @example
 * ```typescript
 * @Injectable({ providedIn: 'root' })
 * export class EmployeeApiService extends BaseApiService<Employee> {
 *   protected override endpoint = 'employees';
 * }
 * ```
 */
export abstract class BaseApiService<T, CreateDTO = Partial<T>, UpdateDTO = Partial<T>> {
  protected readonly http = inject(HttpClient);

  /**
   * Endpoint của API (không bao gồm base URL)
   * Ví dụ: 'employees', 'departments'
   */
  protected abstract endpoint: string;

  /**
   * Base URL của API
   */
  protected get baseUrl(): string {
    return environment.apiUrl;
  }

  /**
   * Full URL của endpoint
   */
  protected get url(): string {
    return `${this.baseUrl}/${this.endpoint}`;
  }

  /**
   * Lấy danh sách tất cả items
   */
  getAll(params?: PaginationParams): Observable<T[] | PaginatedResponse<T>> {
    const httpParams = this.buildParams(params);
    return this.http.get<T[] | PaginatedResponse<T>>(this.url, { params: httpParams });
  }

  /**
   * Lấy item theo ID
   */
  getById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  /**
   * Tạo mới item
   */
  create(data: CreateDTO): Observable<T> {
    return this.http.post<T>(this.url, data);
  }

  /**
   * Cập nhật item
   */
  update(id: string | number, data: UpdateDTO): Observable<T> {
    return this.http.put<T>(`${this.url}/${id}`, data);
  }

  /**
   * Cập nhật một phần item
   */
  patch(id: string | number, data: Partial<UpdateDTO>): Observable<T> {
    return this.http.patch<T>(`${this.url}/${id}`, data);
  }

  /**
   * Xóa item
   */
  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  /**
   * Xóa nhiều items
   */
  deleteMany(ids: (string | number)[]): Observable<void> {
    return this.http.request<void>('DELETE', this.url, { body: { ids } });
  }

  /**
   * Build HttpParams từ object
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
