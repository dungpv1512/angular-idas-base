/**
 * Constants cho ng-zorro-antd icons
 * Sử dụng constants này thay vì hardcode icon names
 * Tham khảo: https://ng.ant.design/components/icon/en
 */

// ============================================
// ACTION ICONS
// ============================================
export const ICON_ACTION = {
  VIEW: 'eye',
  EDIT: 'edit',
  DELETE: 'delete',
  ADD: 'plus',
  SAVE: 'save',
  CANCEL: 'close',
  SEARCH: 'search',
  FILTER: 'filter',
  REFRESH: 'reload',
  DOWNLOAD: 'download',
  UPLOAD: 'upload',
  PRINT: 'printer',
  EXPORT: 'export',
  IMPORT: 'import',
  COPY: 'copy',
  SEND: 'send',
  CHECK: 'check',
  CLOSE: 'close',
  MORE: 'more',
  SETTING: 'setting',
} as const;

// ============================================
// NAVIGATION ICONS
// ============================================
export const ICON_NAV = {
  HOME: 'home',
  BACK: 'arrow-left',
  FORWARD: 'arrow-right',
  UP: 'arrow-up',
  DOWN: 'arrow-down',
  MENU: 'menu',
  EXPAND: 'expand-alt',
  COLLAPSE: 'shrink',
} as const;

// ============================================
// VIEW MODE ICONS
// ============================================
export const ICON_VIEW = {
  LIST: 'unordered-list',
  GRID: 'appstore',
  TABLE: 'table',
  KANBAN: 'appstore',
  CHART: 'bar-chart',
  ORG_CHART: 'apartment',
  TREE: 'cluster',
  CALENDAR: 'calendar',
} as const;

// ============================================
// STATUS ICONS
// ============================================
export const ICON_STATUS = {
  SUCCESS: 'check-circle',
  ERROR: 'close-circle',
  WARNING: 'exclamation-circle',
  INFO: 'info-circle',
  LOADING: 'loading',
  QUESTION: 'question-circle',
} as const;

// ============================================
// FILE ICONS
// ============================================
export const ICON_FILE = {
  FILE: 'file',
  FILE_TEXT: 'file-text',
  FILE_PDF: 'file-pdf',
  FILE_EXCEL: 'file-excel',
  FILE_WORD: 'file-word',
  FILE_IMAGE: 'file-image',
  FILE_ZIP: 'file-zip',
  FOLDER: 'folder',
  FOLDER_OPEN: 'folder-open',
} as const;

// ============================================
// USER ICONS
// ============================================
export const ICON_USER = {
  USER: 'user',
  USERS: 'team',
  USER_ADD: 'user-add',
  USER_DELETE: 'user-delete',
  PROFILE: 'idcard',
} as const;

// ============================================
// ORGANIZATION ICONS
// ============================================
export const ICON_ORG = {
  ORGANIZATION: 'apartment',
  DEPARTMENT: 'cluster',
  BRANCH: 'branches',
  HIERARCHY: 'partition',
} as const;

// ============================================
// MISC ICONS
// ============================================
export const ICON_MISC = {
  LOCK: 'lock',
  UNLOCK: 'unlock',
  STAR: 'star',
  HEART: 'heart',
  BELL: 'bell',
  MAIL: 'mail',
  PHONE: 'phone',
  LINK: 'link',
  ATTACHMENT: 'paper-clip',
  TAG: 'tag',
  TAGS: 'tags',
  CLOCK: 'clock-circle',
  HISTORY: 'history',
  COMMENT: 'comment',
  MESSAGE: 'message',
} as const;

/**
 * Export tất cả icons dưới dạng một object
 */
export const ICONS = {
  ACTION: ICON_ACTION,
  NAV: ICON_NAV,
  VIEW: ICON_VIEW,
  STATUS: ICON_STATUS,
  FILE: ICON_FILE,
  USER: ICON_USER,
  ORG: ICON_ORG,
  MISC: ICON_MISC,
} as const;
