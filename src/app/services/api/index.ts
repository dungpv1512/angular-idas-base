/**
 * Barrel export cho tất cả API services
 *
 * Import: import { OrganizationApiService } from '@app/services';
 *
 * ⚠️ QUAN TRỌNG: Tất cả API services phải đặt ở đây, KHÔNG đặt trong feature folder
 * Cấu trúc: DOMAIN-BASED (chia theo domain)
 */

// Organization domain API services
export * from './organization';

// Employee domain API services
export * from './employee';

// Approval domain API services
export * from './approval';
