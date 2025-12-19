import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '@app/core/base';
import { ApiResponse } from '@app/core/base/types';
import {
  OrganizationPositionModel,
  AssignPositionRequest,
  RemovePositionRequest,
} from '@app/shared/models';

/**
 * API Service cho Chức danh trong Tổ chức
 * Cung cấp các phương thức gọi API liên quan đến gán/xóa chức danh trong tổ chức
 *
 * @example
 * ```typescript
 * const orgPositionApi = inject(OrganizationPositionApiService);
 * orgPositionApi.getByOrganization(1).subscribe(response => {
 *   console.log(response.data);
 * });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class OrganizationPositionApiService extends BaseApiService {
  protected readonly baseUrl = '/tochuc-chucdanh';

  /**
   * Lấy danh sách chức danh của tổ chức
   *
   * @param idToChuc - ID tổ chức
   * @returns Observable với danh sách chức danh trong tổ chức
   */
  getByOrganization(idToChuc: number): Observable<ApiResponse<OrganizationPositionModel[]>> {
    return this.http.get<ApiResponse<OrganizationPositionModel[]>>(`${this.fullUrl}/tochuc/${idToChuc}`);
  }

  /**
   * Gán chức danh vào tổ chức
   *
   * @param request - Dữ liệu gán chức danh
   * @returns Observable với danh sách chức danh đã gán
   */
  assignPositions(request: AssignPositionRequest): Observable<ApiResponse<OrganizationPositionModel[]>> {
    return this.http.post<ApiResponse<OrganizationPositionModel[]>>(`${this.fullUrl}/gan`, request);
  }

  /**
   * Xóa chức danh khỏi tổ chức
   *
   * @param request - Dữ liệu xóa chức danh
   * @returns Observable với kết quả xóa
   */
  removePosition(request: RemovePositionRequest): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.fullUrl}/xoa`, request);
  }

  /**
   * Xóa nhiều chức danh khỏi tổ chức
   *
   * @param idToChuc - ID tổ chức
   * @param idChucDanhs - Danh sách ID chức danh cần xóa
   * @returns Observable với kết quả xóa
   */
  removeMultiplePositions(idToChuc: number, idChucDanhs: number[]): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.fullUrl}/xoa-nhieu`, {
      idToChuc,
      idChucDanhs,
    });
  }
}
