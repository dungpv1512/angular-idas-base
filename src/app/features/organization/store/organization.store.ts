import { Injectable, inject, signal, computed, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { BaseStore } from '@app/core/base';
import {
  OrganizationApiService,
  OrganizationPositionApiService,
} from '@app/services';
import {
  OrganizationModel,
  OrganizationCreateUpdateRequest,
  OrganizationFilterModel,
  OrganizationStatistics,
  OrganizationPositionModel,
} from '@app/shared/models';
import { VIEW_MODE } from '@app/shared/constants';

/**
 * Store quản lý state của Organization feature
 * Sử dụng Angular Signals cho reactive state management
 *
 * @example
 * ```typescript
 * @Component({
 *   providers: [OrganizationStore]
 * })
 * export class OrganizationListPage {
 *   private readonly store = inject(OrganizationStore);
 *
 *   readonly organizations = this.store.data;
 *   readonly loading = this.store.loading;
 * }
 * ```
 */
@Injectable()
export class OrganizationStore extends BaseStore<OrganizationModel[]> {
  private readonly api = inject(OrganizationApiService);
  private readonly positionApi = inject(OrganizationPositionApiService);
  private readonly destroyRef = inject(DestroyRef);

  // ========== Feature-specific State ==========

  /** ID tổ chức đang được chọn */
  private readonly _selectedId = signal<number | null>(null);

  /** Tổ chức đang được chọn để xem chi tiết */
  private readonly _selectedOrganization = signal<OrganizationModel | null>(null);

  /** Chế độ xem: list hoặc orgchart */
  private readonly _viewMode = signal<string>(VIEW_MODE.LIST);

  /** Bộ lọc hiện tại */
  private readonly _filter = signal<OrganizationFilterModel>({});

  /** Thống kê tổ chức */
  private readonly _statistics = signal<OrganizationStatistics | null>(null);

  /** Danh sách chức danh của tổ chức đang chọn */
  private readonly _positions = signal<OrganizationPositionModel[]>([]);

  /** Loading state cho positions */
  private readonly _positionsLoading = signal<boolean>(false);

  // ========== Public Readonly Signals ==========

  readonly selectedId = this._selectedId.asReadonly();
  readonly selectedOrganization = this._selectedOrganization.asReadonly();
  readonly viewMode = this._viewMode.asReadonly();
  readonly filter = this._filter.asReadonly();
  readonly statistics = this._statistics.asReadonly();
  readonly positions = this._positions.asReadonly();
  readonly positionsLoading = this._positionsLoading.asReadonly();

  // ========== Computed Signals ==========

  /** Tổ chức đang chọn từ danh sách (dựa trên selectedId) */
  readonly selectedFromList = computed(() => {
    const id = this._selectedId();
    const data = this._data();
    if (!id || !data) return null;
    return this.findOrganizationById(data, id);
  });

  /** Danh sách tổ chức đã lọc theo filter */
  readonly filteredOrganizations = computed(() => {
    const data = this._data();
    const filter = this._filter();
    if (!data) return [];
    return this.applyFilter(data, filter);
  });

  /** Có tổ chức nào đang được chọn không */
  readonly hasSelection = computed(() => this._selectedId() !== null);

  /** Số lượng tổ chức */
  readonly totalCount = computed(() => {
    const data = this._data();
    return data ? this.countOrganizations(data) : 0;
  });

  // ========== Actions ==========

  /**
   * Tải danh sách tổ chức
   *
   * @param filter - Bộ lọc (optional)
   */
  async loadOrganizations(filter?: OrganizationFilterModel): Promise<void> {
    this.setLoading(true);
    try {
      const response = await firstValueFrom(this.api.getList(filter));
      if (response.success) {
        this.setData(response.data);
        if (filter) {
          this._filter.set(filter);
        }
      } else {
        this.setError(response.message || 'Không thể tải danh sách tổ chức');
      }
    } catch (error) {
      this.setError('Không thể tải danh sách tổ chức');
    }
  }

  /**
   * Tải chi tiết tổ chức theo ID
   *
   * @param id - ID tổ chức
   */
  async loadOrganizationDetail(id: number): Promise<void> {
    this.setLoading(true);
    try {
      const response = await firstValueFrom(this.api.getDetail(id));
      if (response.success) {
        this._selectedOrganization.set(response.data);
        this._selectedId.set(id);
        this.setLoading(false);
      } else {
        this.setError(response.message || 'Không thể tải chi tiết tổ chức');
      }
    } catch (error) {
      this.setError('Không thể tải chi tiết tổ chức');
    }
  }

  /**
   * Tạo mới tổ chức
   *
   * @param data - Dữ liệu tạo tổ chức
   * @returns Tổ chức đã tạo hoặc null nếu lỗi
   */
  async createOrganization(data: OrganizationCreateUpdateRequest): Promise<OrganizationModel | null> {
    this.setLoading(true);
    try {
      const response = await firstValueFrom(this.api.createOrganization(data));
      if (response.success) {
        // Reload danh sách sau khi tạo
        await this.loadOrganizations(this._filter());
        return response.data;
      } else {
        this.setError(response.message || 'Không thể tạo tổ chức');
        return null;
      }
    } catch (error) {
      this.setError('Không thể tạo tổ chức');
      return null;
    }
  }

  /**
   * Cập nhật tổ chức
   *
   * @param id - ID tổ chức
   * @param data - Dữ liệu cập nhật
   * @returns Tổ chức đã cập nhật hoặc null nếu lỗi
   */
  async updateOrganization(id: number, data: OrganizationCreateUpdateRequest): Promise<OrganizationModel | null> {
    this.setLoading(true);
    try {
      const response = await firstValueFrom(this.api.updateOrganization(id, data));
      if (response.success) {
        // Reload danh sách sau khi cập nhật
        await this.loadOrganizations(this._filter());
        // Cập nhật selected organization nếu đang xem
        if (this._selectedId() === id) {
          this._selectedOrganization.set(response.data);
        }
        return response.data;
      } else {
        this.setError(response.message || 'Không thể cập nhật tổ chức');
        return null;
      }
    } catch (error) {
      this.setError('Không thể cập nhật tổ chức');
      return null;
    }
  }

  /**
   * Xóa tổ chức
   *
   * @param id - ID tổ chức cần xóa
   * @returns true nếu xóa thành công
   */
  async deleteOrganization(id: number): Promise<boolean> {
    this.setLoading(true);
    try {
      const response = await firstValueFrom(this.api.deleteOrganization(id));
      if (response.success) {
        // Clear selection nếu đang xem tổ chức bị xóa
        if (this._selectedId() === id) {
          this.clearSelection();
        }
        // Reload danh sách
        await this.loadOrganizations(this._filter());
        return true;
      } else {
        this.setError(response.message || 'Không thể xóa tổ chức');
        return false;
      }
    } catch (error) {
      this.setError('Không thể xóa tổ chức');
      return false;
    }
  }

  /**
   * Gửi duyệt tổ chức
   *
   * @param id - ID tổ chức
   * @param noiDung - Nội dung gửi duyệt
   * @returns true nếu gửi duyệt thành công
   */
  async submitApproval(id: number, noiDung: string): Promise<boolean> {
    this.setLoading(true);
    try {
      const response = await firstValueFrom(this.api.submitApproval(id, noiDung));
      if (response.success) {
        // Reload danh sách để cập nhật trạng thái
        await this.loadOrganizations(this._filter());
        return true;
      } else {
        this.setError(response.message || 'Không thể gửi duyệt');
        return false;
      }
    } catch (error) {
      this.setError('Không thể gửi duyệt');
      return false;
    }
  }

  /**
   * Tải thống kê tổ chức
   */
  async loadStatistics(): Promise<void> {
    try {
      const response = await firstValueFrom(this.api.getStatistics());
      if (response.success) {
        this._statistics.set(response.data);
      }
    } catch (error) {
      // Không set error vì statistics là optional
      console.error('Không thể tải thống kê:', error);
    }
  }

  /**
   * Tải danh sách chức danh của tổ chức
   *
   * @param idToChuc - ID tổ chức
   */
  async loadPositions(idToChuc: number): Promise<void> {
    this._positionsLoading.set(true);
    try {
      const response = await firstValueFrom(this.positionApi.getByOrganization(idToChuc));
      if (response.success) {
        this._positions.set(response.data);
      } else {
        this._positions.set([]);
      }
    } catch (error) {
      this._positions.set([]);
    } finally {
      this._positionsLoading.set(false);
    }
  }

  // ========== State Mutations ==========

  /**
   * Chọn tổ chức
   *
   * @param id - ID tổ chức hoặc null để bỏ chọn
   */
  selectOrganization(id: number | null): void {
    this._selectedId.set(id);
    if (id) {
      const org = this.selectedFromList();
      this._selectedOrganization.set(org);
    } else {
      this._selectedOrganization.set(null);
    }
  }

  /**
   * Đặt tổ chức đang xem chi tiết
   *
   * @param org - Tổ chức hoặc null
   */
  setSelectedOrganization(org: OrganizationModel | null): void {
    this._selectedOrganization.set(org);
    this._selectedId.set(org?.Id ?? null);
  }

  /**
   * Xóa selection
   */
  clearSelection(): void {
    this._selectedId.set(null);
    this._selectedOrganization.set(null);
    this._positions.set([]);
  }

  /**
   * Đổi chế độ xem
   *
   * @param mode - Chế độ xem mới
   */
  setViewMode(mode: string): void {
    this._viewMode.set(mode);
  }

  /**
   * Cập nhật bộ lọc
   *
   * @param filter - Bộ lọc mới
   */
  setFilter(filter: OrganizationFilterModel): void {
    this._filter.set(filter);
  }

  /**
   * Reset store về trạng thái ban đầu
   */
  override reset(): void {
    super.reset();
    this._selectedId.set(null);
    this._selectedOrganization.set(null);
    this._viewMode.set(VIEW_MODE.LIST);
    this._filter.set({});
    this._statistics.set(null);
    this._positions.set([]);
    this._positionsLoading.set(false);
  }

  // ========== Private Helpers ==========

  /**
   * Tìm tổ chức theo ID trong tree
   */
  private findOrganizationById(organizations: OrganizationModel[], id: number): OrganizationModel | null {
    for (const org of organizations) {
      if (org.Id === id) {
        return org;
      }
      if (org.children && org.children.length > 0) {
        const found = this.findOrganizationById(org.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  /**
   * Áp dụng filter lên danh sách tổ chức
   */
  private applyFilter(organizations: OrganizationModel[], filter: OrganizationFilterModel): OrganizationModel[] {
    if (!filter || Object.keys(filter).length === 0) {
      return organizations;
    }

    return organizations
      .map(org => this.filterOrganization(org, filter))
      .filter((org): org is OrganizationModel => org !== null);
  }

  /**
   * Filter một tổ chức và children của nó
   */
  private filterOrganization(org: OrganizationModel, filter: OrganizationFilterModel): OrganizationModel | null {
    // Filter children trước
    const filteredChildren = org.children
      ? org.children
          .map(child => this.filterOrganization(child, filter))
          .filter((child): child is OrganizationModel => child !== null)
      : [];

    // Kiểm tra tổ chức hiện tại có match filter không
    const matches = this.matchesFilter(org, filter);

    // Nếu có children match hoặc bản thân match thì giữ lại
    if (filteredChildren.length > 0 || matches) {
      return {
        ...org,
        children: filteredChildren,
      };
    }

    return null;
  }

  /**
   * Kiểm tra tổ chức có match filter không
   */
  private matchesFilter(org: OrganizationModel, filter: OrganizationFilterModel): boolean {
    // Keyword search
    if (filter.keyword) {
      const keyword = filter.keyword.toLowerCase();
      const matchName = org.TenToChuc.toLowerCase().includes(keyword);
      const matchCode = org.MaToChuc.toLowerCase().includes(keyword);
      if (!matchName && !matchCode) {
        return false;
      }
    }

    // Filter by loai
    if (filter.loai !== undefined && filter.loai !== null && org.Loai !== filter.loai) {
      return false;
    }

    // Filter by trangThai
    if (filter.trangThai !== undefined && filter.trangThai !== null && org.TrangThai !== filter.trangThai) {
      return false;
    }

    // Filter by tinhTrang
    if (filter.tinhTrang !== undefined && filter.tinhTrang !== null && org.TinhTrang !== filter.tinhTrang) {
      return false;
    }

    // Exclude IDs
    if (filter.excludeIds && filter.excludeIds.includes(org.Id)) {
      return false;
    }

    return true;
  }

  /**
   * Đếm tổng số tổ chức trong tree
   */
  private countOrganizations(organizations: OrganizationModel[]): number {
    let count = 0;
    for (const org of organizations) {
      count++;
      if (org.children && org.children.length > 0) {
        count += this.countOrganizations(org.children);
      }
    }
    return count;
  }
}
