/**
 * Model cho Yêu cầu phê duyệt
 * Đại diện cho một yêu cầu phê duyệt thay đổi tổ chức
 */
export interface ApprovalRequestModel {
  /** ID yêu cầu */
  Id: number;
  /** ID tổ chức liên quan */
  IdToChuc: number;
  /** Thông tin tổ chức */
  ToChuc?: ApprovalOrganizationInfo;
  /** Loại yêu cầu: 1=GuiDuyet, 2=PheDuyet, 3=TuChoi, 4=GuiHuy */
  TypeRequest: number;
  /** Nội dung yêu cầu */
  NoiDung?: string;
  /** Trạng thái yêu cầu: 1=ChoDuyet, 2=DaDuyet, 3=TuChoi */
  TrangThai: number;
  /** Người gửi yêu cầu */
  NguoiGui?: string;
  /** ID người gửi */
  IdNguoiGui?: number;
  /** Ngày gửi */
  NgayGui?: string;
  /** Người phê duyệt */
  NguoiDuyet?: string;
  /** ID người phê duyệt */
  IdNguoiDuyet?: number;
  /** Ngày phê duyệt */
  NgayDuyet?: string;
  /** Nội dung phản hồi (khi phê duyệt/từ chối) */
  NoiDungPhanHoi?: string;
}

/**
 * Model cho thông tin tổ chức trong yêu cầu phê duyệt
 */
export interface ApprovalOrganizationInfo {
  /** ID tổ chức */
  Id: number;
  /** Mã tổ chức */
  MaToChuc: string;
  /** Tên tổ chức */
  TenToChuc: string;
  /** Loại tổ chức */
  Loai: number;
  /** Trạng thái hiện tại */
  TrangThai: number;
}

/**
 * Model cho request gửi duyệt
 */
export interface SubmitApprovalRequest {
  /** ID tổ chức */
  idToChuc: number;
  /** Nội dung gửi duyệt */
  noiDung: string;
}

/**
 * Model cho request phê duyệt/từ chối
 */
export interface ProcessApprovalRequest {
  /** ID yêu cầu phê duyệt */
  idYeuCau: number;
  /** Loại xử lý: 2=PheDuyet, 3=TuChoi */
  typeRequest: number;
  /** Nội dung phản hồi */
  noiDungPhanHoi: string;
}

/**
 * Enum trạng thái yêu cầu phê duyệt
 */
export enum ApprovalStatus {
  /** Chờ duyệt */
  Pending = 1,
  /** Đã duyệt */
  Approved = 2,
  /** Từ chối */
  Rejected = 3,
}
