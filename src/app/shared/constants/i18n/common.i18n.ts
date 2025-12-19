/**
 * i18n keys cho Common
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
