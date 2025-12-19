/**
 * Model cho Chức danh trong Tổ chức
 * Đại diện cho mapping giữa tổ chức và chức danh
 */
export interface OrganizationPositionModel {
  /** ID mapping */
  Id: number;
  /** ID tổ chức */
  IdToChuc: number;
  /** ID chức danh */
  IdChucDanh: number;
  /** Tên chức danh */
  TenChucDanh?: string;
  /** Mã chức danh */
  MaChucDanh?: string;
  /** Cấp bậc */
  CapBac?: number;
  /** Số lượng nhân sự đang giữ chức danh này trong tổ chức */
  SoLuongNhanSu?: number;
  /** Ngày tạo */
  NgayTao?: string;
  /** Người tạo */
  NguoiTao?: string;
}

/**
 * Model cho request gán chức danh vào tổ chức
 */
export interface AssignPositionRequest {
  /** ID tổ chức */
  idToChuc: number;
  /** Danh sách ID chức danh cần gán */
  idChucDanhs: number[];
}

/**
 * Model cho request xóa chức danh khỏi tổ chức
 */
export interface RemovePositionRequest {
  /** ID tổ chức */
  idToChuc: number;
  /** ID chức danh cần xóa */
  idChucDanh: number;
}
