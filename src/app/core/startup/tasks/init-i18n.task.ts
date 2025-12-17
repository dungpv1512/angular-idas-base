import { inject, Injectable } from '@angular/core';
import { IStartupTask } from '../startup-task.interface';
import { I18nService } from '../../services/i18n.service';
import { StartupOrderDefaults } from '../startup-order.constants';

/**
 * Task 2: Khởi tạo đa ngôn ngữ (i18n)
 * Thứ tự: 20 (chạy sau khi config đã được tải)
 */
@Injectable()
export class InitI18nTask implements IStartupTask {
  readonly order = StartupOrderDefaults.I18n;

  // Inject I18nService để quản lý ngôn ngữ
  private readonly i18nService = inject(I18nService);

  async execute(): Promise<void> {
    // Lấy ngôn ngữ hiện tại (từ localStorage hoặc browser)
    const currentLang = this.i18nService.getCurrentLanguage();
    console.log(`[InitI18nTask] Ngôn ngữ đã khởi tạo: ${currentLang}`);
  }
}
