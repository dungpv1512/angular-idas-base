import { ICON_VIEW } from './icons.constant';

/**
 * Constants cho View Mode
 * Sử dụng cho các component có chế độ xem khác nhau
 */

// ============================================
// VIEW MODE VALUES
// ============================================
export const VIEW_MODE = {
  LIST: 'list',
  GRID: 'grid',
  TABLE: 'table',
  KANBAN: 'kanban',
  CHART: 'chart',
  ORG_CHART: 'orgchart',
  TREE: 'tree',
  CALENDAR: 'calendar',
} as const;

// ============================================
// VIEW MODE OPTIONS (cho Segmented, Radio, etc.)
// ============================================
export const VIEW_MODE_OPTIONS = {
  /** List và Org Chart - dùng cho ToChuc */
  LIST_ORGCHART: [
    { value: VIEW_MODE.LIST, icon: ICON_VIEW.LIST },
    { value: VIEW_MODE.ORG_CHART, icon: ICON_VIEW.ORG_CHART }
  ],

  /** List và Grid */
  LIST_GRID: [
    { value: VIEW_MODE.LIST, icon: ICON_VIEW.LIST },
    { value: VIEW_MODE.GRID, icon: ICON_VIEW.GRID }
  ],

  /** List, Grid và Table */
  LIST_GRID_TABLE: [
    { value: VIEW_MODE.LIST, icon: ICON_VIEW.LIST },
    { value: VIEW_MODE.GRID, icon: ICON_VIEW.GRID },
    { value: VIEW_MODE.TABLE, icon: ICON_VIEW.TABLE }
  ],

  /** List, Kanban và Chart */
  LIST_KANBAN_CHART: [
    { value: VIEW_MODE.LIST, icon: ICON_VIEW.LIST },
    { value: VIEW_MODE.KANBAN, icon: ICON_VIEW.KANBAN },
    { value: VIEW_MODE.CHART, icon: ICON_VIEW.CHART }
  ],
} as const;

/** Type cho view mode value */
export type ViewModeValue = typeof VIEW_MODE[keyof typeof VIEW_MODE];

/** Type cho ToChuc view mode (list hoặc orgchart) */
export type ToChucViewMode = typeof VIEW_MODE.LIST | typeof VIEW_MODE.ORG_CHART;
