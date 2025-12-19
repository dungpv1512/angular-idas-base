/**
 * Enum loại yêu cầu phê duyệt
 */
export enum TypeRequest {
  GuiDuyet = 1,
  PheDuyet = 2,
  TuChoi = 3,
  GuiHuy = 4,
}

/**
 * Mapping loại yêu cầu với i18n key
 */
export const TYPE_REQUEST_I18N_MAP: Record<TypeRequest, string> = {
  [TypeRequest.GuiDuyet]: 'tochuc.typeRequest.guiDuyet',
  [TypeRequest.PheDuyet]: 'tochuc.typeRequest.pheDuyet',
  [TypeRequest.TuChoi]: 'tochuc.typeRequest.tuChoi',
  [TypeRequest.GuiHuy]: 'tochuc.typeRequest.guiHuy',
};
