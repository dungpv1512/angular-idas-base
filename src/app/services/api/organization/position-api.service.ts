import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { BaseApiService } from '@app/core/base';
import { ApiResponse, PaginatedResponse } from '@app/core/base/types';
import { PositionModel, PositionCreateUpdateRequest } from '@app/shared/models';

/**
 * Filter cho danh sách chức danh
 */
export interface PositionFilter {
  /** Từ khóa tìm kiếm */
  keyword?: string;
  /** Trạng thái */
  trangThai?: number;
  /** Trang hiện tại */
  page?: number;
  /** Số lượng mỗi trang */
  pageSize?: number;
}

/**
 * API Service cho Chức danh (Danh mục)
 * Cung cấp các phương thức gọi API liên quan đến chức danh
 *
 * @example
 * ```typescript
 * const positionApi = inject(PositionApiService);
 * positionApi.getList().subscribe(response => {
 *   console.log(response.data);
 * });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class PositionApiService extends BaseApiService {
  protected readonly baseUrl = '/chucdanh';

  /**
   * Lấy danh sách chức danh (có phân trang)
   *
   * @param filter - Bộ lọc chức danh
   * @returns Observable với danh sách chức danh phân trang
   */
  getList(filter?: PositionFilter): Observable<ApiResponse<PaginatedResponse<PositionModel>>> {
    const params = this.buildFilterParams(filter);
    return this.getPaginated<PositionModel>(params);
  }

  /**
   * Lấy tất cả chức danh (không phân trang)
   *
   * @returns Observable với danh sách tất cả chức danh
   */
  getAllPositions(): Observable<ApiResponse<PositionModel[]>> {
    return this.getAll<PositionModel>();
  }

  /**
   * Lấy chi tiết chức danh theo ID
   *
   * @param id - ID chức danh
   * @returns Observable với thông tin chi tiết chức danh
   */
  getDetail(id: number): Observable<ApiResponse<PositionModel>> {
    return this.getById<PositionModel>(id);
  }

  /**
   * Tạo mới chức danh
   *
   * @param data - Dữ liệu tạo chức danh
   * @returns Observable với chức danh đã tạo
   */
  createPosition(data: PositionCreateUpdateRequest): Observable<ApiResponse<PositionModel>> {
    return this.create<PositionModel>(data);
  }

  /**
   * Cập nhật chức danh
   *
   * @param id - ID chức danh
   * @param data - Dữ liệu cập nhật
   * @returns Observable với chức danh đã cập nhật
   */
  updatePosition(id: number, data: PositionCreateUpdateRequest): Observable<ApiResponse<PositionModel>> {
    return this.update<PositionModel>(id, data);
  }

  /**
   * Xóa chức danh
   *
   * @param id - ID chức danh cần xóa
   * @returns Observable với kết quả xóa
   */
  deletePosition(id: number): Observable<ApiResponse<void>> {
    return this.delete(id);
  }

  /**
   * Build HttpParams từ filter object
   *
   * @param filter - Bộ lọc chức danh
   * @returns HttpParams đã được build
   */
  private buildFilterParams(filter?: PositionFilter): HttpParams {
    let params = new HttpParams();

    if (!filter) {
      return params;
    }

    if (filter.keyword) {
      params = params.set('keyword', filter.keyword);
    }
    if (filter.trangThai !== undefined && filter.trangThai !== null) {
      params = params.set('trangThai', filter.trangThai.toString());
    }
    if (filter.page !== undefined) {
      params = params.set('page', filter.page.toString());
    }
    if (filter.pageSize !== undefined) {
      params = params.set('pageSize', filter.pageSize.toString());
    }

    return params;
  }
}
