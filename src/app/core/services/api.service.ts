import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * API Service - Base service cho các HTTP requests
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment?.apiUrl || 'http://localhost:3000/api';

  /**
   * GET request
   */
  get<T>(endpoint: string, options?: { skipCache?: boolean; skipLoading?: boolean }): Observable<T> {
    const headers = new HttpHeaders({
      ...(options?.skipCache && { 'X-Skip-Cache': 'true' }),
      ...(options?.skipLoading && { 'X-Skip-Loading': 'true' })
    });

    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { headers });
  }

  /**
   * POST request
   */
  post<T>(endpoint: string, data: any, options?: { skipLoading?: boolean }): Observable<T> {
    const headers = new HttpHeaders({
      ...(options?.skipLoading && { 'X-Skip-Loading': 'true' })
    });

    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, { headers });
  }

  /**
   * PUT request
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data);
  }

  /**
   * PATCH request
   */
  patch<T>(endpoint: string, data: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${endpoint}`, data);
  }

  /**
   * DELETE request
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
  }
}
