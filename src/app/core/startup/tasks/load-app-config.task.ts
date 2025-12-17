import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IStartupTask } from '../startup-task.interface';
import { StartupOrderDefaults } from '../startup-order.constants';

/**
 * Cấu hình ứng dụng
 */
interface AppConfig {
  apiUrl: string;
  version: string;
  features: Record<string, boolean>;
}

/**
 * Task 1: Tải cấu hình ứng dụng từ server/assets
 * Thứ tự: 10 (chạy đầu tiên - các task khác có thể phụ thuộc vào config)
 */
@Injectable()
export class LoadAppConfigTask implements IStartupTask {
  readonly order = StartupOrderDefaults.AppConfig;

  // Inject HttpClient để gọi API
  private readonly http = inject(HttpClient);

  async execute(): Promise<void> {
    try {
      // Tải config từ file JSON
      const config = await firstValueFrom(
        this.http.get<AppConfig>('/assets/config/app-config.json')
      );

      // Lưu config vào window để các service khác có thể truy cập
      // TODO: Chuyển sang dùng ConfigService hoặc Signal Store
      (window as unknown as { __APP_CONFIG__: AppConfig }).__APP_CONFIG__ = config;

      console.log('[LoadAppConfigTask] Đã tải config:', config);
    } catch (error) {
      console.warn('[LoadAppConfigTask] Không thể tải config, sử dụng giá trị mặc định');
      // Không throw error để app vẫn chạy được với config mặc định
    }
  }
}
