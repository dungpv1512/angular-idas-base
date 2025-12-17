import { signal, computed, Signal, WritableSignal } from '@angular/core';
import { BaseState } from './types';

/**
 * Base Store - Lớp cơ sở cho Signal-based state management
 * Cung cấp các patterns chuẩn cho state management
 *
 * @example
 * ```typescript
 * interface EmployeeState extends BaseState<Employee> {
 *   filter: EmployeeFilter;
 * }
 *
 * @Injectable({ providedIn: 'root' })
 * export class EmployeeStore extends BaseStore<Employee, EmployeeState> {
 *   constructor() {
 *     super({
 *       data: [],
 *       selectedItem: null,
 *       total: 0,
 *       page: 1,
 *       pageSize: 20,
 *       loading: false,
 *       error: null,
 *       filter: {}
 *     });
 *   }
 * }
 * ```
 */
export abstract class BaseStore<T, S extends BaseState<T>> {
  /**
   * State signal - chứa toàn bộ state của store
   */
  protected readonly state: WritableSignal<S>;

  /**
   * Selectors - computed signals cho từng phần của state
   */
  readonly data: Signal<T[]>;
  readonly selectedItem: Signal<T | null>;
  readonly loading: Signal<boolean>;
  readonly error: Signal<string | null>;
  readonly total: Signal<number>;
  readonly page: Signal<number>;
  readonly pageSize: Signal<number>;

  /**
   * Computed: kiểm tra có data hay không
   */
  readonly hasData: Signal<boolean>;

  /**
   * Computed: tổng số trang
   */
  readonly totalPages: Signal<number>;

  constructor(initialState: S) {
    this.state = signal(initialState);

    // Tạo selectors
    this.data = computed(() => this.state().data);
    this.selectedItem = computed(() => this.state().selectedItem);
    this.loading = computed(() => this.state().loading);
    this.error = computed(() => this.state().error);
    this.total = computed(() => this.state().total);
    this.page = computed(() => this.state().page);
    this.pageSize = computed(() => this.state().pageSize);

    // Computed values
    this.hasData = computed(() => this.state().data.length > 0);
    this.totalPages = computed(() => {
      const { total, pageSize } = this.state();
      return Math.ceil(total / pageSize);
    });
  }

  /**
   * Cập nhật state
   */
  protected setState(partialState: Partial<S>): void {
    this.state.update((current) => ({ ...current, ...partialState }));
  }

  /**
   * Set loading state
   */
  setLoading(loading: boolean): void {
    this.setState({ loading } as Partial<S>);
  }

  /**
   * Set error state
   */
  setError(error: string | null): void {
    this.setState({ error, loading: false } as Partial<S>);
  }

  /**
   * Set data
   */
  setData(data: T[], total?: number): void {
    this.setState({
      data,
      total: total ?? data.length,
      loading: false,
      error: null
    } as Partial<S>);
  }

  /**
   * Set selected item
   */
  setSelectedItem(item: T | null): void {
    this.setState({ selectedItem: item } as Partial<S>);
  }

  /**
   * Set pagination
   */
  setPagination(page: number, pageSize?: number): void {
    const update: Partial<S> = { page } as Partial<S>;
    if (pageSize !== undefined) {
      (update as BaseState<T>).pageSize = pageSize;
    }
    this.setState(update);
  }

  /**
   * Add item to data
   */
  addItem(item: T): void {
    this.state.update((current) => ({
      ...current,
      data: [...current.data, item],
      total: current.total + 1
    }));
  }

  /**
   * Update item in data
   */
  updateItem(predicate: (item: T) => boolean, updatedItem: T): void {
    this.state.update((current) => ({
      ...current,
      data: current.data.map((item) => (predicate(item) ? updatedItem : item))
    }));
  }

  /**
   * Remove item from data
   */
  removeItem(predicate: (item: T) => boolean): void {
    this.state.update((current) => ({
      ...current,
      data: current.data.filter((item) => !predicate(item)),
      total: current.total - 1
    }));
  }

  /**
   * Reset state về initial
   */
  abstract reset(): void;
}
