import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { BaseApiService } from '@app/core/base';
import { ApiResponse } from '@app/core/base/types';
import { FunctionDutyModel, FunctionDutyCreateUpdateRequest } from '@app/shared/models';

/**
 * Filter cho danh sách chức năng/nhiệm vụ
 */
export interface FunctionDutyFilter {
  /** ID tổ chức */
  idToChuc?: number;
  /** ID chức danh */
  idChucDanh?: number;
  /** Loại: 1=Chức năng, 2=Nhiệm vụ, 3=Năng lực, 4=Chứng chỉ */
  loai?: number;
}

/**
 * API Service cho Chức năng/Nhiệm vụ
 * Cung cấp các phương thức gọi API liên quan đến chức năng/nhiệm vụ
 *
 * @example
 * ```typescript
 * const functionDutyApi = inject(FunctionDutyApiService);
 * functionDutyApi.getByOrganization(1).subscribe(response => {
 *   console.log(response.data);
 * });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class FunctionDutyApiService extends BaseApiService {
  protected readonly baseUrl = '/chucnangnhiemvu';

  /**
   * Lấy danh sách chức năng/nhiệm vụ theo filter
   *
   * @param filter - Bộ lọc
   * @returns Observable với danh sách chức năng/nhiệm vụ
   */
  getList(filter?: FunctionDutyFilter): Observable<ApiResponse<FunctionDutyModel[]>> {
    const params = this.buildFilterParams(filter);
    return this.getAll<FunctionDutyModel>(params);
  }

  /**
   * Lấy danh sách chức năng/nhiệm vụ theo tổ chức
   *
   * @param idToChuc - ID tổ chức
   * @param loai - Loại (optional): 1=Chức năng, 2=Nhiệm vụ
   * @returns Observable với danh sách chức năng/nhiệm vụ
   */
  getByOrganization(idToChuc: number, loai?: number): Observable<ApiResponse<FunctionDutyModel[]>> {
    return this.getList({ idToChuc, loai });
  }

  /**
   * Lấy danh sách chức năng/nhiệm vụ theo chức danh
   *
   * @param idChucDanh - ID chức danh
   * @param loai - Loại (optional): 3=Năng lực, 4=Chứng chỉ
   * @returns Observable với danh sách chức năng/nhiệm vụ
   */
  getByPosition(idChucDanh: number, loai?: number): Observable<ApiResponse<FunctionDutyModel[]>> {
    return this.getList({ idChucDanh, loai });
  }

  /**
   * Lấy chi tiết chức năng/nhiệm vụ theo ID
   *
   * @param id - ID chức năng/nhiệm vụ
   * @returns Observable với thông tin chi tiết
   */
  getDetail(id: number): Observable<ApiResponse<FunctionDutyModel>> {
    return this.getById<FunctionDutyModel>(id);
  }

  /**
   * Tạo mới chức năng/nhiệm vụ
   *
   * @param data - Dữ liệu tạo mới
   * @returns Observable với chức năng/nhiệm vụ đã tạo
   */
  createFunctionDuty(data: FunctionDutyCreateUpdateRequest): Observable<ApiResponse<FunctionDutyModel>> {
    return this.create<FunctionDutyModel>(data);
  }

  /**
   * Cập nhật chức năng/nhiệm vụ
   *
   * @param id - ID chức năng/nhiệm vụ
   * @param data - Dữ liệu cập nhật
   * @returns Observable với chức năng/nhiệm vụ đã cập nhật
   */
  updateFunctionDuty(id: number, data: FunctionDutyCreateUpdateRequest): Observable<ApiResponse<FunctionDutyModel>> {
    return this.update<FunctionDutyModel>(id, data);
  }

  /**
   * Xóa chức năng/nhiệm vụ
   *
   * @param id - ID chức năng/nhiệm vụ cần xóa
   * @returns Observable với kết quả xóa
   */
  deleteFunctionDuty(id: number): Observable<ApiResponse<void>> {
    return this.delete(id);
  }

  /**
   * Build HttpParams từ filter object
   *
   * @param filter - Bộ lọc
   * @returns HttpParams đã được build
   */
  private buildFilterParams(filter?: FunctionDutyFilter): HttpParams {
    let params = new HttpParams();

    if (!filter) {
      return params;
    }

    if (filter.idToChuc !== undefined && filter.idToChuc !== null) {
      params = params.set('idToChuc', filter.idToChuc.toString());
    }
    if (filter.idChucDanh !== undefined && filter.idChucDanh !== null) {
      params = params.set('idChucDanh', filter.idChucDanh.toString());
    }
    if (filter.loai !== undefined && filter.loai !== null) {
      params = params.set('loai', filter.loai.toString());
    }

    return params;
  }
}
