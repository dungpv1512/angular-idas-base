import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { BaseApiService } from '@app/core/base';
import { ApiResponse } from '@app/core/base/types';
import {
  OrganizationModel,
  OrganizationCreateUpdateRequest,
  OrganizationStatistics,
  OrganizationFilterModel,
} from '@app/shared/models';

/**
 * API Service cho Tổ chức
 * Cung cấp các phương thức gọi API liên quan đến tổ chức
 *
 * @example
 * ```typescript
 * const orgApi = inject(OrganizationApiService);
 * orgApi.getList().subscribe(response => {
 *   console.log(response.data);
 * });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class OrganizationApiService extends BaseApiService {
  protected readonly baseUrl = '/tochuc';

  /**
   * Lấy danh sách tổ chức dạng tree
   *
   * @param filter - Bộ lọc tổ chức
   * @returns Observable với danh sách tổ chức dạng tree
   */
  getList(filter?: OrganizationFilterModel): Observable<ApiResponse<OrganizationModel[]>> {
    const params = this.buildFilterParams(filter);
    return this.getAll<OrganizationModel>(params);
  }

  /**
   * Lấy chi tiết tổ chức theo ID
   *
   * @param id - ID tổ chức
   * @returns Observable với thông tin chi tiết tổ chức
   */
  getDetail(id: number): Observable<ApiResponse<OrganizationModel>> {
    return this.getById<OrganizationModel>(id);
  }

  /**
   * Tạo mới tổ chức
   *
   * @param data - Dữ liệu tạo tổ chức
   * @returns Observable với tổ chức đã tạo
   */
  createOrganization(data: OrganizationCreateUpdateRequest): Observable<ApiResponse<OrganizationModel>> {
    return this.create<OrganizationModel>(data);
  }

  /**
   * Cập nhật tổ chức
   *
   * @param id - ID tổ chức
   * @param data - Dữ liệu cập nhật
   * @returns Observable với tổ chức đã cập nhật
   */
  updateOrganization(id: number, data: OrganizationCreateUpdateRequest): Observable<ApiResponse<OrganizationModel>> {
    return this.update<OrganizationModel>(id, data);
  }

  /**
   * Xóa tổ chức
   *
   * @param id - ID tổ chức cần xóa
   * @returns Observable với kết quả xóa
   */
  deleteOrganization(id: number): Observable<ApiResponse<void>> {
    return this.delete(id);
  }

  /**
   * Gửi duyệt tổ chức
   *
   * @param id - ID tổ chức
   * @param noiDung - Nội dung gửi duyệt
   * @returns Observable với kết quả gửi duyệt
   */
  submitApproval(id: number, noiDung: string): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.fullUrl}/${id}/gui-duyet`, { noiDung });
  }

  /**
   * Lấy thống kê tổ chức
   *
   * @returns Observable với dữ liệu thống kê
   */
  getStatistics(): Observable<ApiResponse<OrganizationStatistics>> {
    return this.http.get<ApiResponse<OrganizationStatistics>>(`${this.fullUrl}/thong-ke`);
  }

  /**
   * Build HttpParams từ filter object
   *
   * @param filter - Bộ lọc tổ chức
   * @returns HttpParams đã được build
   */
  private buildFilterParams(filter?: OrganizationFilterModel): HttpParams {
    let params = new HttpParams();

    if (!filter) {
      return params;
    }

    if (filter.keyword) {
      params = params.set('keyword', filter.keyword);
    }
    if (filter.loai !== undefined && filter.loai !== null) {
      params = params.set('loai', filter.loai.toString());
    }
    if (filter.trangThai !== undefined && filter.trangThai !== null) {
      params = params.set('trangThai', filter.trangThai.toString());
    }
    if (filter.tinhTrang !== undefined && filter.tinhTrang !== null) {
      params = params.set('tinhTrang', filter.tinhTrang.toString());
    }
    if (filter.idToChucCapTren !== undefined && filter.idToChucCapTren !== null) {
      params = params.set('idToChucCapTren', filter.idToChucCapTren.toString());
    }
    if (filter.excludeIds && filter.excludeIds.length > 0) {
      params = params.set('excludeIds', filter.excludeIds.join(','));
    }

    return params;
  }
}
