/**
 * Enum loại tổ chức
 */
export enum LoaiToChuc {
  ToChuc = 1,
  BoPhan = 2,
}

/**
 * Mapping loại tổ chức với i18n key
 */
export const LOAI_TO_CHUC_I18N_MAP: Record<LoaiToChuc, string> = {
  [LoaiToChuc.ToChuc]: 'tochuc.loai.toChuc',
  [LoaiToChuc.BoPhan]: 'tochuc.loai.boPhan',
};
