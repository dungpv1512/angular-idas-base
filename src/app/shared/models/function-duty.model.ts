/**
 * Model cho Chức năng/Nhiệm vụ
 * Đại diện cho chức năng hoặc nhiệm vụ được gán cho tổ chức hoặc chức danh
 */
export interface FunctionDutyModel {
  /** ID chức năng/nhiệm vụ */
  Id: number;
  /** ID tổ chức (nếu gán cho tổ chức) */
  IdToChuc?: number | null;
  /** ID chức danh (nếu gán cho chức danh) */
  IdChucDanh?: number | null;
  /** Loại: 1=Chức năng, 2=Nhiệm vụ, 3=Năng lực, 4=Chứng chỉ */
  Loai: number;
  /** Mô tả ngắn */
  MoTa?: string;
  /** Nội dung chi tiết */
  NoiDung?: string;
  /** Phạm vi áp dụng */
  PhamVi?: string;
  /** Mức độ quan trọng: 1=Thấp, 2=Trung bình, 3=Cao */
  MucDoQuanTrong?: number;
  /** ID file đính kèm */
  IdFile?: number | null;
  /** Thông tin file đính kèm */
  File?: FunctionDutyFileModel | null;
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
 * Model cho File đính kèm của Chức năng/Nhiệm vụ
 */
export interface FunctionDutyFileModel {
  /** ID file */
  Id: number;
  /** Tên file gốc */
  TenFile: string;
  /** Đường dẫn file trên server */
  DuongDan: string;
  /** Kích thước file (bytes) */
  KichThuoc?: number;
  /** Loại file (extension) */
  LoaiFile?: string;
  /** Ngày upload */
  NgayTao?: string;
}

/**
 * Model cho request tạo/cập nhật chức năng/nhiệm vụ
 */
export interface FunctionDutyCreateUpdateRequest {
  /** ID (null khi tạo mới) */
  Id?: number | null;
  /** ID tổ chức */
  IdToChuc?: number | null;
  /** ID chức danh */
  IdChucDanh?: number | null;
  /** Loại */
  Loai: number;
  /** Mô tả */
  MoTa?: string;
  /** Nội dung */
  NoiDung?: string;
  /** Phạm vi */
  PhamVi?: string;
  /** Mức độ quan trọng */
  MucDoQuanTrong?: number;
  /** ID file đính kèm */
  IdFile?: number | null;
}
