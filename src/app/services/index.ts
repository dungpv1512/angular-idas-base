/**
 * Barrel export cho tất cả Services
 *
 * Bao gồm:
 * - API Services: Gọi backend APIs
 * - Shared State Services: Share data giữa features (read-only từ features khác)
 * - Event Bus: Cross-feature communication
 *
 * Import: import { OrganizationApiService, EventBusService, APP_EVENTS } from '@app/services';
 *
 * @see .kiro/steering/state-management.md
 * @see .kiro/steering/project-structure.md
 */

// ============================================================
// API SERVICES
// ============================================================
// Organization services
// export * from './api/organization-api.service';

// Employee services
// export * from './api/employee-api.service';

// Approval services
// export * from './api/approval-api.service';

// ============================================================
// SHARED STATE SERVICES
// ============================================================
export * from './shared-state';

// ============================================================
// EVENT BUS
// ============================================================
export * from './event-bus';
