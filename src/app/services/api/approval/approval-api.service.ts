import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { BaseApiService } from '@app/core/base';
import { ApiResponse, PaginatedResponse } from '@app/core/base/types';
import { ApprovalRequestModel, ProcessApprovalRequest } from '@app/shared/models';

/**
 * Filter cho danh sách yêu cầu phê duyệt
 */
export interface ApprovalFilter {
  /** Từ khóa tìm kiếm */
  keyword?: string;
  /** Trạng thái yêu cầu: 1=ChoDuyet, 2=DaDuyet, 3=TuChoi */
  trangThai?: number;
  /** Loại yêu cầu: 1=GuiDuyet, 2=PheDuyet, 3=TuChoi, 4=GuiHuy */
  typeRequest?: number;
  /** Ngày bắt đầu */
  fromDate?: string;
  /** Ngày kết thúc */
  toDate?: string;
  /** Trang hiện tại */
  page?: number;
  /** Số lượng mỗi trang */
  pageSize?: number;
}

/**
 * API Service cho Phê duyệt
 * Cung cấp các phương thức gọi API liên quan đến phê duyệt tổ chức
 *
 * @example
 * ```typescript
 * const approvalApi = inject(ApprovalApiService);
 * approvalApi.getList({ trangThai: 1 }).subscribe(response => {
 *   console.log(response.data);
 * });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class ApprovalApiService extends BaseApiService {
  protected readonly baseUrl = '/pheduyet';

  /**
   * Lấy danh sách yêu cầu phê duyệt (có phân trang)
   *
   * @param filter - Bộ lọc yêu cầu phê duyệt
   * @returns Observable với danh sách yêu cầu phê duyệt phân trang
   */
  getList(filter?: ApprovalFilter): Observable<ApiResponse<PaginatedResponse<ApprovalRequestModel>>> {
    const params = this.buildFilterParams(filter);
    return this.getPaginated<ApprovalRequestModel>(params);
  }

  /**
   * Lấy danh sách yêu cầu chờ duyệt
   *
   * @param page - Trang hiện tại
   * @param pageSize - Số lượng mỗi trang
   * @returns Observable với danh sách yêu cầu chờ duyệt
   */
  getPendingRequests(page = 1, pageSize = 10): Observable<ApiResponse<PaginatedResponse<ApprovalRequestModel>>> {
    return this.getList({ trangThai: 1, page, pageSize });
  }

  /**
   * Lấy chi tiết yêu cầu phê duyệt theo ID
   *
   * @param id - ID yêu cầu phê duyệt
   * @returns Observable với thông tin chi tiết yêu cầu
   */
  getDetail(id: number): Observable<ApiResponse<ApprovalRequestModel>> {
    return this.getById<ApprovalRequestModel>(id);
  }

  /**
   * Phê duyệt yêu cầu
   *
   * @param id - ID yêu cầu phê duyệt
   * @param noiDungPhanHoi - Nội dung phản hồi
   * @returns Observable với kết quả phê duyệt
   */
  approve(id: number, noiDungPhanHoi: string): Observable<ApiResponse<void>> {
    const request: ProcessApprovalRequest = {
      idYeuCau: id,
      typeRequest: 2, // PheDuyet
      noiDungPhanHoi,
    };
    return this.http.post<ApiResponse<void>>(`${this.fullUrl}/${id}/xu-ly`, request);
  }

  /**
   * Từ chối yêu cầu
   *
   * @param id - ID yêu cầu phê duyệt
   * @param noiDungPhanHoi - Lý do từ chối
   * @returns Observable với kết quả từ chối
   */
  reject(id: number, noiDungPhanHoi: string): Observable<ApiResponse<void>> {
    const request: ProcessApprovalRequest = {
      idYeuCau: id,
      typeRequest: 3, // TuChoi
      noiDungPhanHoi,
    };
    return this.http.post<ApiResponse<void>>(`${this.fullUrl}/${id}/xu-ly`, request);
  }

  /**
   * Xử lý yêu cầu phê duyệt (generic)
   *
   * @param request - Dữ liệu xử lý
   * @returns Observable với kết quả xử lý
   */
  processRequest(request: ProcessApprovalRequest): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.fullUrl}/${request.idYeuCau}/xu-ly`, request);
  }

  /**
   * Build HttpParams từ filter object
   *
   * @param filter - Bộ lọc yêu cầu phê duyệt
   * @returns HttpParams đã được build
   */
  private buildFilterParams(filter?: ApprovalFilter): HttpParams {
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
    if (filter.typeRequest !== undefined && filter.typeRequest !== null) {
      params = params.set('typeRequest', filter.typeRequest.toString());
    }
    if (filter.fromDate) {
      params = params.set('fromDate', filter.fromDate);
    }
    if (filter.toDate) {
      params = params.set('toDate', filter.toDate);
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
