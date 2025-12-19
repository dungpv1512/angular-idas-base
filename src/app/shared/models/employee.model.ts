/**
 * Model cho Nhân sự
 * Đại diện cho một nhân viên trong hệ thống
 */
export interface EmployeeModel {
  /** ID nhân sự */
  Id: number;
  /** Mã nhân sự */
  MaNhanSu: string;
  /** Họ và tên */
  HoTen: string;
  /** Email */
  Email?: string;
  /** Số điện thoại */
  SoDienThoai?: string;
  /** ID tổ chức */
  IdToChuc?: number;
  /** Tên tổ chức */
  TenToChuc?: string;
  /** ID chức danh */
  IdChucDanh?: number;
  /** Tên chức danh */
  TenChucDanh?: string;
  /** Đường dẫn sắp xếp của tổ chức */
  DuongDanSapXep?: string;
  /** Avatar URL */
  Avatar?: string;
  /** Trạng thái: 1=Đang làm việc, 2=Nghỉ việc */
  TrangThai?: number;
  /** Ngày vào làm */
  NgayVaoLam?: string;
  /** Ngày nghỉ việc */
  NgayNghiViec?: string;
}

/**
 * Model cho filter nhân sự
 */
export interface EmployeeFilterModel {
  /** Từ khóa tìm kiếm (tên hoặc mã nhân sự) */
  keyword?: string;
  /** Lọc theo tổ chức */
  idToChuc?: number | null;
  /** Lọc theo đường dẫn sắp xếp (lấy nhân sự của tổ chức và các tổ chức con) */
  duongDanSapXep?: string;
  /** Lọc theo chức danh */
  idChucDanh?: number | null;
  /** Lọc theo trạng thái */
  trangThai?: number | null;
}
