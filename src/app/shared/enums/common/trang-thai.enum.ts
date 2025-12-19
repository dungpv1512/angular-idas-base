/**
 * Enum trạng thái phê duyệt
 * Nguồn: wwwroot/IDASroot/javascript/common/enum.js
 */
export enum TrangThai {
  ThietLap = 1,
  BanHanh = 2,
  HuyBo = 3,
  ChoDuyet = 4,
  Duyet = 5,
  ChoHuy = 6,
  TuChoiHuy = 7,
  ChuyenTiepDuyetHuy = 8,
  Huy = 9,
}

/**
 * Mapping trạng thái với i18n key
 */
export const TRANG_THAI_I18N_MAP: Record<TrangThai, string> = {
  [TrangThai.ThietLap]: 'tochuc.trangThai.thietLap',
  [TrangThai.BanHanh]: 'tochuc.trangThai.banHanh',
  [TrangThai.HuyBo]: 'tochuc.trangThai.huyBo',
  [TrangThai.ChoDuyet]: 'tochuc.trangThai.choDuyet',
  [TrangThai.Duyet]: 'tochuc.trangThai.duyet',
  [TrangThai.ChoHuy]: 'tochuc.trangThai.choHuy',
  [TrangThai.TuChoiHuy]: 'tochuc.trangThai.tuChoiHuy',
  [TrangThai.ChuyenTiepDuyetHuy]: 'tochuc.trangThai.chuyenTiepDuyetHuy',
  [TrangThai.Huy]: 'tochuc.trangThai.huy',
};
