/**
 * Model cho Tổ chức
 * Đại diện cho một đơn vị tổ chức trong hệ thống (công ty, chi nhánh, phòng ban)
 */
export interface OrganizationModel {
  /** ID tổ chức */
  Id: number;
  /** Mã tổ chức (unique) */
  MaToChuc: string;
  /** Tên tổ chức */
  TenToChuc: string;
  /** Loại tổ chức: 1 = Tổ chức cấp cao, 2 = Bộ phận */
  Loai: number;
  /** Trạng thái phê duyệt: 1=ThietLap, 2=BanHanh, 3=HuyBo, 4=ChoDuyet... */
  TrangThai: number;
  /** Tình trạng hoạt động: 1=Hoạt động, 2=Tạm dừng */
  TinhTrang: number;
  /** ID tổ chức cấp trên (null nếu là root) */
  IdToChucCapTren: number | null;
  /** Đường dẫn phân cấp dạng ",1,2,3," để xác định vị trí trong cây */
  DuongDanSapXep: string;
  /** Tên nhân sự cấp cao nhất của tổ chức */
  TenNhanSu?: string | null;
  /** Số lượng nhân sự trong tổ chức */
  countNS?: number;
  /** Danh sách nội dung chức năng/nhiệm vụ */
  NoiDungChucNangNhiemVus?: string[];
  /** Mô tả tổ chức */
  MoTa?: string;
  /** Ngày tạo */
  NgayTao?: string;
  /** Người tạo */
  NguoiTao?: string;
  /** Ngày cập nhật */
  NgayCapNhat?: string;
  /** Người cập nhật */
  NguoiCapNhat?: string;
  /** Danh sách tổ chức con (dùng cho tree structure) */
  children?: OrganizationModel[];
}

/**
 * Model cho request tạo/cập nhật tổ chức
 */
export interface OrganizationCreateUpdateRequest {
  /** ID tổ chức (undefined khi tạo mới) */
  Id?: number;
  /** Mã tổ chức */
  MaToChuc: string;
  /** Tên tổ chức */
  TenToChuc: string;
  /** Loại tổ chức */
  Loai: number;
  /** ID tổ chức cấp trên */
  IdToChucCapTren: number | null;
  /** Mô tả */
  MoTa?: string;
}

/**
 * Model cho response thống kê tổ chức
 */
export interface OrganizationStatistics {
  /** Thống kê theo trạng thái */
  byStatus: OrganizationStatusCount[];
  /** Thống kê theo loại */
  byType: OrganizationTypeCount[];
  /** Tổng số tổ chức */
  total: number;
}

/**
 * Model cho thống kê theo trạng thái
 */
export interface OrganizationStatusCount {
  /** Trạng thái */
  trangThai: number;
  /** Số lượng */
  count: number;
}

/**
 * Model cho thống kê theo loại
 */
export interface OrganizationTypeCount {
  /** Loại tổ chức */
  loai: number;
  /** Số lượng */
  count: number;
}
