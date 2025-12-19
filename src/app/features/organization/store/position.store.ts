import { Injectable, inject, signal, computed } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BaseStore } from '@app/core/base';
import { PositionApiService, PositionFilter } from '@app/services';
import { PositionModel, PositionCreateUpdateRequest } from '@app/shared/models';

/**
 * Store quản lý state của Position (Chức danh) feature
 * Sử dụng Angular Signals cho reactive state management
 *
 * @example
 * ```typescript
 * @Component({
 *   providers: [PositionStore]
 * })
 * export class PositionSetupPage {
 *   private readonly store = inject(PositionStore);
 *
 *   readonly positions = this.store.data;
 *   readonly loading = this.store.loading;
 * }
 * ```
 */
@Injectable()
export class PositionStore extends BaseStore<PositionModel[]> {
  private readonly api = inject(PositionApiService);

  // ========== Feature-specific State ==========

  /** ID chức danh đang được chọn */
  private readonly _selectedId = signal<number | null>(null);

  /** Chức danh đang được chọn để xem/sửa */
  private readonly _selectedPosition = signal<PositionModel | null>(null);

  /** Bộ lọc hiện tại */
  private readonly _filter = signal<PositionFilter>({});

  /** Tổng số records (cho pagination) */
  private readonly _total = signal<number>(0);

  /** Trang hiện tại */
  private readonly _page = signal<number>(1);

  /** Số lượng mỗi trang */
  private readonly _pageSize = signal<number>(10);

  // ========== Public Readonly Signals ==========

  readonly selectedId = this._selectedId.asReadonly();
  readonly selectedPosition = this._selectedPosition.asReadonly();
  readonly filter = this._filter.asReadonly();
  readonly total = this._total.asReadonly();
  readonly page = this._page.asReadonly();
  readonly pageSize = this._pageSize.asReadonly();

  // ========== Computed Signals ==========

  /** Chức danh đang chọn từ danh sách */
  readonly selectedFromList = computed(() => {
    const id = this._selectedId();
    const data = this._data();
    if (!id || !data) return null;
    return data.find(p => p.Id === id) ?? null;
  });

  /** Có chức danh nào đang được chọn không */
  readonly hasSelection = computed(() => this._selectedId() !== null);

  /** Tổng số trang */
  readonly totalPages = computed(() => {
    const total = this._total();
    const pageSize = this._pageSize();
    return Math.ceil(total / pageSize);
  });

  // ========== Actions ==========

  /**
   * Tải danh sách chức danh (có phân trang)
   *
   * @param filter - Bộ lọc (optional)
   */
  async loadPositions(filter?: PositionFilter): Promise<void> {
    this.setLoading(true);
    try {
      const currentFilter = filter ?? this._filter();
      const response = await firstValueFrom(this.api.getList({
        ...currentFilter,
        page: this._page(),
        pageSize: this._pageSize(),
      }));
      if (response.success) {
        this.setData(response.data.data);
        this._total.set(response.data.total);
        if (filter) {
          this._filter.set(filter);
        }
      } else {
        this.setError(response.message || 'Không thể tải danh sách chức danh');
      }
    } catch (error) {
      this.setError('Không thể tải danh sách chức danh');
    }
  }

  /**
   * Tải tất cả chức danh (không phân trang)
   * Dùng cho dropdown select
   */
  async loadAllPositions(): Promise<void> {
    this.setLoading(true);
    try {
      const response = await firstValueFrom(this.api.getAllPositions());
      if (response.success) {
        this.setData(response.data);
        this._total.set(response.data.length);
      } else {
        this.setError(response.message || 'Không thể tải danh sách chức danh');
      }
    } catch (error) {
      this.setError('Không thể tải danh sách chức danh');
    }
  }

  /**
   * Tải chi tiết chức danh theo ID
   *
   * @param id - ID chức danh
   */
  async loadPositionDetail(id: number): Promise<void> {
    this.setLoading(true);
    try {
      const response = await firstValueFrom(this.api.getDetail(id));
      if (response.success) {
        this._selectedPosition.set(response.data);
        this._selectedId.set(id);
        this.setLoading(false);
      } else {
        this.setError(response.message || 'Không thể tải chi tiết chức danh');
      }
    } catch (error) {
      this.setError('Không thể tải chi tiết chức danh');
    }
  }

  /**
   * Tạo mới chức danh
   *
   * @param data - Dữ liệu tạo chức danh
   * @returns Chức danh đã tạo hoặc null nếu lỗi
   */
  async createPosition(data: PositionCreateUpdateRequest): Promise<PositionModel | null> {
    this.setLoading(true);
    try {
      const response = await firstValueFrom(this.api.createPosition(data));
      if (response.success) {
        // Reload danh sách sau khi tạo
        await this.loadPositions();
        return response.data;
      } else {
        this.setError(response.message || 'Không thể tạo chức danh');
        return null;
      }
    } catch (error) {
      this.setError('Không thể tạo chức danh');
      return null;
    }
  }

  /**
   * Cập nhật chức danh
   *
   * @param id - ID chức danh
   * @param data - Dữ liệu cập nhật
   * @returns Chức danh đã cập nhật hoặc null nếu lỗi
   */
  async updatePosition(id: number, data: PositionCreateUpdateRequest): Promise<PositionModel | null> {
    this.setLoading(true);
    try {
      const response = await firstValueFrom(this.api.updatePosition(id, data));
      if (response.success) {
        // Reload danh sách sau khi cập nhật
        await this.loadPositions();
        // Cập nhật selected position nếu đang xem
        if (this._selectedId() === id) {
          this._selectedPosition.set(response.data);
        }
        return response.data;
      } else {
        this.setError(response.message || 'Không thể cập nhật chức danh');
        return null;
      }
    } catch (error) {
      this.setError('Không thể cập nhật chức danh');
      return null;
    }
  }

  /**
   * Xóa chức danh
   *
   * @param id - ID chức danh cần xóa
   * @returns true nếu xóa thành công
   */
  async deletePosition(id: number): Promise<boolean> {
    this.setLoading(true);
    try {
      const response = await firstValueFrom(this.api.deletePosition(id));
      if (response.success) {
        // Clear selection nếu đang xem chức danh bị xóa
        if (this._selectedId() === id) {
          this.clearSelection();
        }
        // Reload danh sách
        await this.loadPositions();
        return true;
      } else {
        this.setError(response.message || 'Không thể xóa chức danh');
        return false;
      }
    } catch (error) {
      this.setError('Không thể xóa chức danh');
      return false;
    }
  }

  // ========== State Mutations ==========

  /**
   * Chọn chức danh
   *
   * @param id - ID chức danh hoặc null để bỏ chọn
   */
  selectPosition(id: number | null): void {
    this._selectedId.set(id);
    if (id) {
      const position = this.selectedFromList();
      this._selectedPosition.set(position);
    } else {
      this._selectedPosition.set(null);
    }
  }

  /**
   * Đặt chức danh đang xem chi tiết
   *
   * @param position - Chức danh hoặc null
   */
  setSelectedPosition(position: PositionModel | null): void {
    this._selectedPosition.set(position);
    this._selectedId.set(position?.Id ?? null);
  }

  /**
   * Xóa selection
   */
  clearSelection(): void {
    this._selectedId.set(null);
    this._selectedPosition.set(null);
  }

  /**
   * Cập nhật bộ lọc
   *
   * @param filter - Bộ lọc mới
   */
  setFilter(filter: PositionFilter): void {
    this._filter.set(filter);
  }

  /**
   * Đổi trang
   *
   * @param page - Số trang mới
   */
  setPage(page: number): void {
    this._page.set(page);
  }

  /**
   * Đổi số lượng mỗi trang
   *
   * @param pageSize - Số lượng mới
   */
  setPageSize(pageSize: number): void {
    this._pageSize.set(pageSize);
    this._page.set(1); // Reset về trang 1
  }

  /**
   * Reset store về trạng thái ban đầu
   */
  override reset(): void {
    super.reset();
    this._selectedId.set(null);
    this._selectedPosition.set(null);
    this._filter.set({});
    this._total.set(0);
    this._page.set(1);
    this._pageSize.set(10);
  }
}
