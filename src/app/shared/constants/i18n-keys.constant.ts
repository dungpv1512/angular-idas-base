/**
 * Constant chứa tất cả các key đa ngôn ngữ của ứng dụng
 * Sử dụng constant này thay vì hardcode string trong template
 */

// ============================================
// COMMON KEYS
// ============================================
export const I18N_COMMON = {
  HOME: 'common.home',
  BACK: 'common.back',
  LANGUAGE: 'common.language',
  VIETNAMESE: 'common.vietnamese',
  ENGLISH: 'common.english',
  CREATE: 'common.create',
  EDIT: 'common.edit',
  DELETE: 'common.delete',
  VIEW: 'common.view',
  SAVE: 'common.save',
  CANCEL: 'common.cancel',
  SEARCH: 'common.search',
  LOADING: 'common.loading',
  NO_DATA: 'common.noData',
  CONFIRM: 'common.confirm',
  CONFIRM_DELETE: 'common.confirmDelete',
  SUCCESS: 'common.success',
  ERROR: 'common.error',
  TABLE: 'common.table',
  TREE: 'common.tree',
  NOT_FOUND: 'common.notFound',
  UNKNOWN: 'common.unknown',
  NONE: 'common.none',
  ACTIONS: 'common.actions',
  SEARCH_PLACEHOLDER: 'common.searchPlaceholder',
} as const;

// ============================================
// ERROR KEYS
// ============================================
export const I18N_ERRORS = {
  GENERAL: 'errors.general',
  NETWORK: 'errors.network',
  UNAUTHORIZED: 'errors.unauthorized',
  FORBIDDEN: 'errors.forbidden',
  NOT_FOUND: 'errors.notFound',
  SERVER: 'errors.server',
} as const;

export const I18N_ERROR = {
  FATAL: {
    TITLE: 'ERROR.FATAL.TITLE',
  },
  CODE: 'ERROR.CODE',
  NOTIFICATIONS: 'ERROR.NOTIFICATIONS',
  ACTION: {
    RELOAD: 'ERROR.ACTION.RELOAD',
    GO_HOME: 'ERROR.ACTION.GO_HOME',
    DISMISS: 'ERROR.ACTION.DISMISS',
    DISMISS_ALL: 'ERROR.ACTION.DISMISS_ALL',
  },
} as const;

// ============================================
// EXCEPTION KEYS
// ============================================
export const I18N_EXCEPTION = {
  GO_HOME: 'exception.goHome',
  GO_BACK: 'exception.goBack',
  FORBIDDEN: {
    TITLE: 'exception.forbidden.title',
    SUBTITLE: 'exception.forbidden.subtitle',
  },
  NOT_FOUND: {
    TITLE: 'exception.notFound.title',
    SUBTITLE: 'exception.notFound.subtitle',
  },
  SERVER_ERROR: {
    TITLE: 'exception.serverError.title',
    SUBTITLE: 'exception.serverError.subtitle',
  },
} as const;

// ============================================
// MENU KEYS
// ============================================
export const I18N_MENU = {
  WELCOME: 'menu.welcome',
  TOCHUC: 'menu.tochuc',
  DEMO: 'menu.demo',
  VIRTUAL_TABLE: 'menu.virtualTable',
} as const;

// ============================================
// DEMO KEYS
// ============================================
export const I18N_DEMO = {
  EDIT_RECORD: 'demo.editRecord',
  FORM_SUBMITTED: 'demo.formSubmitted',
} as const;

// ============================================
// TOCHUC KEYS
// ============================================
export const I18N_TOCHUC = {
  TITLE: 'tochuc.title',
  SUBTITLE: 'tochuc.subtitle',
  DANH_SACH_TO_CHUC: 'tochuc.danhSachToChuc',
  CHI_TIET_TO_CHUC: 'tochuc.chiTietToChuc',
  THIET_LAP_TO_CHUC: 'tochuc.thietLapToChuc',
  PHE_DUYET_TO_CHUC: 'tochuc.pheDuyetToChuc',
  VIEW_MODE: 'tochuc.viewMode',
  ORG_CHART: 'tochuc.orgChart',
  LIST: 'tochuc.list',
  SEARCH_PLACEHOLDER: 'tochuc.searchPlaceholder',
  SHOW_CANCELLED: 'tochuc.showCancelled',
  THEM_MOI: 'tochuc.themMoi',
  THIET_LAP: 'tochuc.thietLap',
  STT: 'tochuc.stt',
  TEN_TO_CHUC: 'tochuc.tenToChuc',
  MA_TO_CHUC: 'tochuc.maToChuc',
  LOAI: 'tochuc.loai',
  TRANG_THAI: 'tochuc.trangThai',
  TINH_TRANG: 'tochuc.tinhTrang',
  SO_NHAN_SU: 'tochuc.soNhanSu',
  NGAY_CAP_NHAT: 'tochuc.ngayCapNhat',
  NGUOI_CAP_NHAT: 'tochuc.nguoiCapNhat',
  THONG_KE_TRANG_THAI: 'tochuc.thongKeTrangThai',
  THONG_KE_LOAI: 'tochuc.thongKeLoai',
  ORG_CHART_PLACEHOLDER: 'tochuc.orgChartPlaceholder',
  CHI_TIET: 'tochuc.chiTiet',
  NHAN_SU: 'tochuc.nhanSu',
  NHAN_SU_PLACEHOLDER: 'tochuc.nhanSuPlaceholder',
  SELECT_TO_CHUC: 'tochuc.selectToChuc',
  LAN_DIEU_CHINH: 'tochuc.lanDieuChinh',
  TRANG_THAI_PHE_DUYET: 'tochuc.trangThaiPheDuyet',
  GUI_DUYET: 'tochuc.guiDuyet',
  PHE_DUYET: 'tochuc.pheDuyet',
  TU_CHOI: 'tochuc.tuChoi',
  THONG_TIN_CO_BAN: 'tochuc.thongTinCoBan',
  DANH_SACH_CHUC_DANH: 'tochuc.danhSachChucDanh',
  CHUC_NANG: 'tochuc.chucNang',
  NHIEM_VU: 'tochuc.nhiemVu',
  MO_TA: 'tochuc.moTa',
  NOI_DUNG: 'tochuc.noiDung',
  MUC_DO: 'tochuc.mucDo',
  FILE: 'tochuc.file',
  CHUC_DANH: 'tochuc.chucDanh',
  MA_CHUC_DANH: 'tochuc.maChucDanh',
  TEN_CHUC_DANH: 'tochuc.tenChucDanh',
  CAP_BAC: 'tochuc.capBac',
  CHI_TIET_CHUC_DANH: 'tochuc.chiTietChucDanh',
  SEARCH_CHUC_DANH: 'tochuc.searchChucDanh',
  SELECT_CHUC_DANH: 'tochuc.selectChucDanh',
  DANH_SACH_PHE_DUYET: 'tochuc.danhSachPheDuyet',
  CHI_TIET_YEU_CAU: 'tochuc.chiTietYeuCau',
  NGAY_GUI: 'tochuc.ngayGui',
  NGUOI_GUI: 'tochuc.nguoiGui',

  // Nested objects
  LOAI_OPTIONS: {
    TO_CHUC: 'tochuc.loai.toChuc',
    BO_PHAN: 'tochuc.loai.boPhan',
  },
  TINH_TRANG_OPTIONS: {
    HOAT_DONG: 'tochuc.tinhTrang.hoatDong',
    TAM_DUNG: 'tochuc.tinhTrang.tamDung',
  },
  TRANG_THAI_OPTIONS: {
    THIET_LAP: 'tochuc.trangThai.thietLap',
    BAN_HANH: 'tochuc.trangThai.banHanh',
    HUY_BO: 'tochuc.trangThai.huyBo',
    CHO_DUYET: 'tochuc.trangThai.choDuyet',
    DUYET: 'tochuc.trangThai.duyet',
    CHO_HUY: 'tochuc.trangThai.choHuy',
    TU_CHOI_HUY: 'tochuc.trangThai.tuChoiHuy',
    CHUYEN_TIEP_DUYET_HUY: 'tochuc.trangThai.chuyenTiepDuyetHuy',
    HUY: 'tochuc.trangThai.huy',
  },
  LOAI_CHUC_NANG_NHIEM_VU: {
    CHUC_NANG: 'tochuc.loaiChucNangNhiemVu.chucNang',
    NHIEM_VU: 'tochuc.loaiChucNangNhiemVu.nhiemVu',
    NANG_LUC: 'tochuc.loaiChucNangNhiemVu.nangLuc',
    CHUNG_CHI: 'tochuc.loaiChucNangNhiemVu.chungChi',
  },
  TYPE_REQUEST: {
    GUI_DUYET: 'tochuc.typeRequest.guiDuyet',
    PHE_DUYET: 'tochuc.typeRequest.pheDuyet',
    TU_CHOI: 'tochuc.typeRequest.tuChoi',
    GUI_HUY: 'tochuc.typeRequest.guiHuy',
  },
  MESSAGES: {
    LOAD_ERROR: 'tochuc.messages.loadError',
    LOAD_DETAIL_ERROR: 'tochuc.messages.loadDetailError',
    LOAD_APPROVAL_ERROR: 'tochuc.messages.loadApprovalError',
    DELETE_CONFIRM: 'tochuc.messages.deleteConfirm',
    DELETE_SUCCESS: 'tochuc.messages.deleteSuccess',
    DELETE_ERROR: 'tochuc.messages.deleteError',
    CREATE_SUCCESS: 'tochuc.messages.createSuccess',
    UPDATE_SUCCESS: 'tochuc.messages.updateSuccess',
    SAVE_ERROR: 'tochuc.messages.saveError',
    SUBMIT_APPROVAL_SUCCESS: 'tochuc.messages.submitApprovalSuccess',
    SUBMIT_APPROVAL_ERROR: 'tochuc.messages.submitApprovalError',
    APPROVE_SUCCESS: 'tochuc.messages.approveSuccess',
    APPROVE_ERROR: 'tochuc.messages.approveError',
    REJECT_SUCCESS: 'tochuc.messages.rejectSuccess',
    REJECT_ERROR: 'tochuc.messages.rejectError',
    FEATURE_ADD: 'tochuc.messages.featureAdd',
    FEATURE_ADD_CHUCDANH: 'tochuc.messages.featureAddChucDanh',
    FEATURE_EDIT_CHUCDANH: 'tochuc.messages.featureEditChucDanh',
    FEATURE_DELETE_CHUCDANH: 'tochuc.messages.featureDeleteChucDanh',
    FEATURE_VIEW_CHUCDANH: 'tochuc.messages.featureViewChucDanh',
    FEATURE_ADD_CHUCNANG: 'tochuc.messages.featureAddChucNang',
    FEATURE_ADD_NHIEMVU: 'tochuc.messages.featureAddNhiemVu',
    FEATURE_SUBMIT_APPROVAL: 'tochuc.messages.featureSubmitApproval',
    FEATURE_APPROVE: 'tochuc.messages.featureApprove',
    FEATURE_DELETE_TOCHUC: 'tochuc.messages.featureDeleteToChuc',
  },
  CONFIRM: {
    APPROVE_TITLE: 'tochuc.confirm.approveTitle',
    APPROVE_CONTENT: 'tochuc.confirm.approveContent',
    REJECT_TITLE: 'tochuc.confirm.rejectTitle',
    REJECT_CONTENT: 'tochuc.confirm.rejectContent',
  },
} as const;
