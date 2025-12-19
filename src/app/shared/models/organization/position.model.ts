/**
 * Model cho Chức danh (Danh mục)
 * Đại diện cho một chức danh/vị trí công việc trong hệ thống
 */
export interface PositionModel {
  /** ID chức danh */
  Id: number;
  /** Mã chức danh (unique) */
  MaChucDanh: string;
  /** Tên chức danh */
  TenChucDanh: string;
  /** Cấp bậc (dùng để sắp xếp thứ tự) */
  CapBac?: number;
  /** Mô tả chức danh */
  MoTa?: string;
  /** Trạng thái: 1=Hoạt động, 0=Không hoạt động */
  TrangThai?: number;
  /** Ngày tạo */
  NgayTao?: string;
  /** Người tạo */
  NguoiTao?: string;
  /** Ngày cập nhật */
  NgayCapNhat?: string;
  /** Người cập nhật */
  NguoiCapNhat?: string;
}

/**
 * Model cho request tạo/cập nhật chức danh
 */
export interface PositionCreateUpdateRequest {
  /** ID chức danh (undefined khi tạo mới) */
  Id?: number;
  /** Mã chức danh */
  MaChucDanh: string;
  /** Tên chức danh */
  TenChucDanh: string;
  /** Cấp bậc */
  CapBac?: number;
  /** Mô tả */
  MoTa?: string;
}
