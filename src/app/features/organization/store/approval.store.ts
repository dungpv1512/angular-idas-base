import { Injectable, inject, signal, computed } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BaseStore } from '@app/core/base';
import { ApprovalApiService, ApprovalFilter } from '@app/services';
import { ApprovalRequestModel } from '@app/shared/models';

/**
 * Store quản lý state của Approval (Phê duyệt) feature
 * Sử dụng Angular Signals cho reactive state management
 *
 * @example
 * ```typescript
 * @Component({
 *   providers: [ApprovalStore]
 * })
 * export class ApprovalListPage {
 *   private readonly store = inject(ApprovalStore);
 *
 *   readonly requests = this.store.data;
 *   readonly loading = this.store.loading;
 * }
 * ```
 */
@Injectable()
export class ApprovalStore extends BaseStore<ApprovalRequestModel[]> {
  private readonly api = inject(ApprovalApiService);

  // ========== Feature-specific State ==========

  /** ID yêu cầu đang được chọn */
  private readonly _selectedId = signal<number | null>(null);

  /** Yêu cầu đang được chọn để xem chi tiết */
  private readonly _selectedRequest = signal<ApprovalRequestModel | null>(null);

  /** Bộ lọc hiện tại */
  private readonly _filter = signal<ApprovalFilter>({});

  /** Tổng số records (cho pagination) */
  private readonly _total = signal<number>(0);

  /** Trang hiện tại */
  private readonly _page = signal<number>(1);

  /** Số lượng mỗi trang */
  private readonly _pageSize = signal<number>(10);

  /** Đang xử lý phê duyệt/từ chối */
  private readonly _processing = signal<boolean>(false);

  // ========== Public Readonly Signals ==========

  readonly selectedId = this._selectedId.asReadonly();
  readonly selectedRequest = this._selectedRequest.asReadonly();
  readonly filter = this._filter.asReadonly();
  readonly total = this._total.asReadonly();
  readonly page = this._page.asReadonly();
  readonly pageSize = this._pageSize.asReadonly();
  readonly processing = this._processing.asReadonly();

  // ========== Computed Signals ==========

  /** Yêu cầu đang chọn từ danh sách */
  readonly selectedFromList = computed(() => {
    const id = this._selectedId();
    const data = this._data();
    if (!id || !data) return null;
    return data.find(r => r.Id === id) ?? null;
  });

  /** Có yêu cầu nào đang được chọn không */
  readonly hasSelection = computed(() => this._selectedId() !== null);

  /** Tổng số trang */
  readonly totalPages = computed(() => {
    const total = this._total();
    const pageSize = this._pageSize();
    return Math.ceil(total / pageSize);
  });

  /** Số lượng yêu cầu chờ duyệt */
  readonly pendingCount = computed(() => {
    const data = this._data();
    if (!data) return 0;
    return data.filter(r => r.TrangThai === 1).length;
  });

  // ========== Actions ==========

  /**
   * Tải danh sách yêu cầu phê duyệt (có phân trang)
   *
   * @param filter - Bộ lọc (optional)
   */
  async loadRequests(filter?: ApprovalFilter): Promise<void> {
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
        this.setError(response.message || 'Không thể tải danh sách yêu cầu');
      }
    } catch (error) {
      this.setError('Không thể tải danh sách yêu cầu');
    }
  }

  /**
   * Tải danh sách yêu cầu chờ duyệt
   */
  async loadPendingRequests(): Promise<void> {
    await this.loadRequests({ trangThai: 1 });
  }

  /**
   * Tải chi tiết yêu cầu theo ID
   *
   * @param id - ID yêu cầu
   */
  async loadRequestDetail(id: number): Promise<void> {
    this.setLoading(true);
    try {
      const response = await firstValueFrom(this.api.getDetail(id));
      if (response.success) {
        this._selectedRequest.set(response.data);
        this._selectedId.set(id);
        this.setLoading(false);
      } else {
        this.setError(response.message || 'Không thể tải chi tiết yêu cầu');
      }
    } catch (error) {
      this.setError('Không thể tải chi tiết yêu cầu');
    }
  }

  /**
   * Phê duyệt yêu cầu
   *
   * @param id - ID yêu cầu
   * @param noiDungPhanHoi - Nội dung phản hồi
   * @returns true nếu phê duyệt thành công
   */
  async approveRequest(id: number, noiDungPhanHoi: string): Promise<boolean> {
    this._processing.set(true);
    try {
      const response = await firstValueFrom(this.api.approve(id, noiDungPhanHoi));
      if (response.success) {
        // Reload danh sách sau khi phê duyệt
        await this.loadRequests();
        // Clear selection
        this.clearSelection();
        return true;
      } else {
        this.setError(response.message || 'Không thể phê duyệt yêu cầu');
        return false;
      }
    } catch (error) {
      this.setError('Không thể phê duyệt yêu cầu');
      return false;
    } finally {
      this._processing.set(false);
    }
  }

  /**
   * Từ chối yêu cầu
   *
   * @param id - ID yêu cầu
   * @param noiDungPhanHoi - Lý do từ chối
   * @returns true nếu từ chối thành công
   */
  async rejectRequest(id: number, noiDungPhanHoi: string): Promise<boolean> {
    this._processing.set(true);
    try {
      const response = await firstValueFrom(this.api.reject(id, noiDungPhanHoi));
      if (response.success) {
        // Reload danh sách sau khi từ chối
        await this.loadRequests();
        // Clear selection
        this.clearSelection();
        return true;
      } else {
        this.setError(response.message || 'Không thể từ chối yêu cầu');
        return false;
      }
    } catch (error) {
      this.setError('Không thể từ chối yêu cầu');
      return false;
    } finally {
      this._processing.set(false);
    }
  }

  // ========== State Mutations ==========

  /**
   * Chọn yêu cầu
   *
   * @param id - ID yêu cầu hoặc null để bỏ chọn
   */
  selectRequest(id: number | null): void {
    this._selectedId.set(id);
    if (id) {
      const request = this.selectedFromList();
      this._selectedRequest.set(request);
    } else {
      this._selectedRequest.set(null);
    }
  }

  /**
   * Đặt yêu cầu đang xem chi tiết
   *
   * @param request - Yêu cầu hoặc null
   */
  setSelectedRequest(request: ApprovalRequestModel | null): void {
    this._selectedRequest.set(request);
    this._selectedId.set(request?.Id ?? null);
  }

  /**
   * Xóa selection
   */
  clearSelection(): void {
    this._selectedId.set(null);
    this._selectedRequest.set(null);
  }

  /**
   * Cập nhật bộ lọc
   *
   * @param filter - Bộ lọc mới
   */
  setFilter(filter: ApprovalFilter): void {
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
    this._selectedRequest.set(null);
    this._filter.set({});
    this._total.set(0);
    this._page.set(1);
    this._pageSize.set(10);
    this._processing.set(false);
  }
}
