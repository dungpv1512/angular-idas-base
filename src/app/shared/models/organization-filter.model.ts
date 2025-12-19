/**
 * Model cho filter tổ chức
 * Dùng để lọc danh sách tổ chức theo các tiêu chí
 */
export interface OrganizationFilterModel {
  /** Từ khóa tìm kiếm (tên hoặc mã tổ chức) */
  keyword?: string;
  /** Lọc theo loại tổ chức */
  loai?: number | null;
  /** Lọc theo trạng thái */
  trangThai?: number | null;
  /** Lọc theo tình trạng */
  tinhTrang?: number | null;
  /** Lọc theo tổ chức cấp trên */
  idToChucCapTren?: number | null;
  /** Loại trừ các ID cụ thể */
  excludeIds?: number[];
}
