/**
 * Enum loại chức năng/nhiệm vụ
 */
export enum LoaiChucNangNhiemVu {
  ChucNang = 1,
  NhiemVu = 2,
  NangLuc = 3,
  ChungChi = 4,
}

/**
 * Mapping loại chức năng/nhiệm vụ với i18n key
 */
export const LOAI_CHUC_NANG_NHIEM_VU_I18N_MAP: Record<
  LoaiChucNangNhiemVu,
  string
> = {
  [LoaiChucNangNhiemVu.ChucNang]: 'tochuc.loaiChucNangNhiemVu.chucNang',
  [LoaiChucNangNhiemVu.NhiemVu]: 'tochuc.loaiChucNangNhiemVu.nhiemVu',
  [LoaiChucNangNhiemVu.NangLuc]: 'tochuc.loaiChucNangNhiemVu.nangLuc',
  [LoaiChucNangNhiemVu.ChungChi]: 'tochuc.loaiChucNangNhiemVu.chungChi',
};
