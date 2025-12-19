/**
 * Barrel export cho tất cả enums
 *
 * Import: import { TrangThai, LoaiToChuc } from '@app/shared/enums';
 *
 * ⚠️ QUAN TRỌNG: Tất cả enums phải đặt ở đây, KHÔNG đặt trong feature folder
 * Cấu trúc: DOMAIN-BASED (chia theo domain)
 */

// Common enums
export * from './common';

// Organization domain enums
export * from './organization';

// Approval domain enums
export * from './approval';
