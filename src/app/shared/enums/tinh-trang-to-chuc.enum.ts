/**
 * Enum tình trạng hoạt động của tổ chức
 */
export enum TinhTrangToChuc {
  HoatDong = 1,
  TamDung = 2,
}

/**
 * Mapping tình trạng với i18n key
 */
export const TINH_TRANG_TO_CHUC_I18N_MAP: Record<TinhTrangToChuc, string> = {
  [TinhTrangToChuc.HoatDong]: 'tochuc.tinhTrang.hoatDong',
  [TinhTrangToChuc.TamDung]: 'tochuc.tinhTrang.tamDung',
};
