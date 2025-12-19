/**
 * Barrel export cho tất cả models
 *
 * Import: import { OrganizationModel, EmployeeModel } from '@app/shared/models';
 *
 * ⚠️ QUAN TRỌNG: Tất cả models phải đặt ở đây, KHÔNG đặt trong feature folder
 * Cấu trúc: DOMAIN-BASED (chia theo domain)
 */

// Common models
export * from './common';

// Organization domain models
export * from './organization';

// Employee domain models
export * from './employee';

// Approval domain models
export * from './approval';
