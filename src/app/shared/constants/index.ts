/**
 * Barrel export cho tất cả constants
 *
 * Import: import { I18N_COMMON, ICON_ACTION } from '@app/shared/constants';
 *
 * ⚠️ QUAN TRỌNG: Tất cả constants phải đặt ở đây, KHÔNG đặt trong feature folder
 * Cấu trúc: DOMAIN-BASED (chia theo domain)
 */

// Common constants
export * from './common';

// i18n keys (chia theo domain)
export * from './i18n';
