/**
 * Định nghĩa tất cả event types trong application
 * 
 * Format: DOMAIN:ACTION
 * 
 * @see .kiro/steering/state-management.md
 */

// ============================================================
// EVENT TYPES
// ============================================================

export const APP_EVENTS = {
  // Organization events
  ORGANIZATION: {
    CREATED: 'organization:created',
    UPDATED: 'organization:updated',
    DELETED: 'organization:deleted',
    SELECTED: 'organization:selected',
    REFRESH_REQUESTED: 'organization:refresh-requested',
  },

  // Employee events
  EMPLOYEE: {
    CREATED: 'employee:created',
    UPDATED: 'employee:updated',
    DELETED: 'employee:deleted',
  },

  // Global events
  GLOBAL: {
    LANGUAGE_CHANGED: 'global:language-changed',
    THEME_CHANGED: 'global:theme-changed',
    SESSION_EXPIRED: 'global:session-expired',
    NOTIFICATION: 'global:notification',
  },
} as const;

// ============================================================
// EVENT PAYLOAD INTERFACES
// ============================================================

/**
 * Base interface cho tất cả events
 */
export interface BaseEvent<T extends string, P = undefined> {
  type: T;
  payload: P;
}

// Organization Events
export interface OrganizationCreatedEvent
  extends BaseEvent<
    typeof APP_EVENTS.ORGANIZATION.CREATED,
    { id: number; name: string }
  > {}

export interface OrganizationUpdatedEvent
  extends BaseEvent<
    typeof APP_EVENTS.ORGANIZATION.UPDATED,
    { id: number; changes: Record<string, unknown> }
  > {}

export interface OrganizationDeletedEvent
  extends BaseEvent<typeof APP_EVENTS.ORGANIZATION.DELETED, { id: number }> {}

export interface OrganizationSelectedEvent
  extends BaseEvent<
    typeof APP_EVENTS.ORGANIZATION.SELECTED,
    { id: number | null }
  > {}

export interface OrganizationRefreshRequestedEvent
  extends BaseEvent<typeof APP_EVENTS.ORGANIZATION.REFRESH_REQUESTED, undefined> {}

// Employee Events
export interface EmployeeCreatedEvent
  extends BaseEvent<
    typeof APP_EVENTS.EMPLOYEE.CREATED,
    { id: number; name: string; organizationId: number }
  > {}

export interface EmployeeUpdatedEvent
  extends BaseEvent<
    typeof APP_EVENTS.EMPLOYEE.UPDATED,
    { id: number; changes: Record<string, unknown> }
  > {}

export interface EmployeeDeletedEvent
  extends BaseEvent<typeof APP_EVENTS.EMPLOYEE.DELETED, { id: number }> {}

// Global Events
export interface LanguageChangedEvent
  extends BaseEvent<typeof APP_EVENTS.GLOBAL.LANGUAGE_CHANGED, { language: string }> {}

export interface ThemeChangedEvent
  extends BaseEvent<typeof APP_EVENTS.GLOBAL.THEME_CHANGED, { theme: 'light' | 'dark' }> {}

export interface SessionExpiredEvent
  extends BaseEvent<typeof APP_EVENTS.GLOBAL.SESSION_EXPIRED, undefined> {}

export interface NotificationEvent
  extends BaseEvent<
    typeof APP_EVENTS.GLOBAL.NOTIFICATION,
    { type: 'success' | 'error' | 'warning' | 'info'; message: string }
  > {}

// ============================================================
// UNION TYPE
// ============================================================

/**
 * Union type cho tất cả events
 * Sử dụng trong EventBusService
 */
export type AppEvent =
  // Organization
  | OrganizationCreatedEvent
  | OrganizationUpdatedEvent
  | OrganizationDeletedEvent
  | OrganizationSelectedEvent
  | OrganizationRefreshRequestedEvent
  // Employee
  | EmployeeCreatedEvent
  | EmployeeUpdatedEvent
  | EmployeeDeletedEvent
  // Global
  | LanguageChangedEvent
  | ThemeChangedEvent
  | SessionExpiredEvent
  | NotificationEvent;
