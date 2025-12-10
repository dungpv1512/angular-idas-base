import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

/**
 * User Service - Ví dụ service sử dụng ApiService
 */
export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiService = inject(ApiService);

  /**
   * Lấy danh sách users (có cache)
   */
  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>('/users');
  }

  /**
   * Lấy user theo ID (không cache)
   */
  getUserById(id: number): Observable<User> {
    return this.apiService.get<User>(`/users/${id}`, { skipCache: true });
  }

  /**
   * Tạo user mới
   */
  createUser(user: Partial<User>): Observable<User> {
    return this.apiService.post<User>('/users', user);
  }

  /**
   * Cập nhật user
   */
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.apiService.put<User>(`/users/${id}`, user);
  }

  /**
   * Xóa user
   */
  deleteUser(id: number): Observable<void> {
    return this.apiService.delete<void>(`/users/${id}`);
  }

  /**
   * Background sync - không hiển thị loading
   */
  syncUsers(): Observable<User[]> {
    return this.apiService.get<User[]>('/users/sync', { skipLoading: true });
  }
}
