/**
 * Types cho Organization View Component
 * Tái sử dụng cho các features liên quan đến tổ chức
 */

/**
 * Interface cho Organization data
 * Dùng chung cho cả List mode và Org Chart mode
 */
export interface OrganizationViewData {
  Id: number;
  MaToChuc: string;
  TenToChuc: string;
  Loai?: number;
  TrangThai?: number;
  TinhTrang?: number;
  IdToChucCapTren?: number | null;
  DuongDanSapXep?: string;
  TenNhanSu?: string | null;
  countNS?: number;
  NoiDungChucNangNhiemVus?: string[];
  children?: OrganizationViewData[];
  [key: string]: unknown;
}

/**
 * Interface cho action event từ Organization View
 */
export interface OrganizationViewActionEvent {
  action: string;
  data: OrganizationViewData;
}

/**
 * Interface cho check change event từ Organization View
 */
export interface OrganizationViewCheckEvent {
  keys: string[];
  records: OrganizationViewData[];
}
