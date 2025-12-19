import { signal, computed, Signal, WritableSignal } from '@angular/core';

/**
 * Interface cho trạng thái của store
 * Được sử dụng để type-check state object
 */
export interface StoreState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Base Store - Lớp cơ sở cho Signal-based state management
 * Cung cấp các patterns chuẩn cho state management với Angular Signals
 *
 * Đặc điểm:
 * - Sử dụng signals riêng lẻ cho data, loading, error
 * - Computed signals tự động cập nhật khi dependencies thay đổi
 * - Không cần manual subscription management
 *
 * @example
 * ```typescript
 * @Injectable()
 * export class EmployeeStore extends BaseStore<Employee[]> {
 *   // Thêm state riêng cho feature
 *   private readonly _selectedEmployee = signal<Employee | null>(null);
 *
 *   readonly selectedEmployee = this._selectedEmployee.asReadonly();
 *
 *   selectEmployee(employee: Employee | null): void {
 *     this._selectedEmployee.set(employee);
 *   }
 * }
 * ```
 */
export abstract class BaseStore<T> {
  /**
   * Trạng thái chính - protected để subclass có thể truy cập
   */
  protected readonly _data: WritableSignal<T | null> = signal(null);
  protected readonly _loading: WritableSignal<boolean> = signal(false);
  protected readonly _error: WritableSignal<string | null> = signal(null);

  /**
   * Public readonly signals - expose ra ngoài để components sử dụng
   * Sử dụng asReadonly() để ngăn việc set trực tiếp từ bên ngoài
   */
  readonly data: Signal<T | null> = this._data.asReadonly();
  readonly loading: Signal<boolean> = this._loading.asReadonly();
  readonly error: Signal<string | null> = this._error.asReadonly();

  /**
   * Computed signals - tự động cập nhật khi dependencies thay đổi
   * Validates: Requirements 3.2, 3.3
   */
  readonly hasData: Signal<boolean> = computed(() => this._data() !== null);
  readonly hasError: Signal<boolean> = computed(() => this._error() !== null);

  /**
   * Set loading state
   * Khi bắt đầu loading, tự động clear error
   *
   * @param loading - Trạng thái loading
   */
  protected setLoading(loading: boolean): void {
    this._loading.set(loading);
    if (loading) {
      this._error.set(null);
    }
  }

  /**
   * Set data và tự động tắt loading
   *
   * @param data - Dữ liệu cần set
   */
  protected setData(data: T | null): void {
    this._data.set(data);
    this._loading.set(false);
  }

  /**
   * Set error và tự động tắt loading
   *
   * @param error - Thông báo lỗi
   */
  protected setError(error: string): void {
    this._error.set(error);
    this._loading.set(false);
  }

  /**
   * Reset state về trạng thái ban đầu
   * Validates: Requirements 3.4
   */
  reset(): void {
    this._data.set(null);
    this._loading.set(false);
    this._error.set(null);
  }

  /**
   * Lấy snapshot của state hiện tại
   * Hữu ích cho debugging hoặc logging
   */
  getState(): StoreState<T> {
    return {
      data: this._data(),
      loading: this._loading(),
      error: this._error()
    };
  }
}
