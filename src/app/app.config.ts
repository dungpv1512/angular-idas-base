import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { vi_VN, provideNzI18n } from 'ng-zorro-antd/i18n';
import vi from '@angular/common/locales/vi';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { icons } from './icons-provider';
import {
  authInterceptor,
  loadingInterceptor,
  responseInterceptor,
  cacheInterceptor
} from './core/interceptors';

// Global Error Handler
import { GlobalErrorHandler } from './core/handlers/global-error.handler';

// Startup tasks
import { STARTUP_TASK } from './core/startup/startup-task.interface';
import { LoadAppConfigTask } from './core/startup/tasks/load-app-config.task';
import { InitI18nTask } from './core/startup/tasks/init-i18n.task';

registerLocaleData(vi);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideNzIcons(icons),
    provideNzI18n(vi_VN),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        cacheInterceptor,     // Cache GET requests (chạy đầu tiên)
        authInterceptor,      // Thêm auth headers
        loadingInterceptor,   // Hiển thị loading
        responseInterceptor   // Transform response & handle errors
      ])
    ),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'vi'
      })
    ),
    provideTranslateHttpLoader({
      prefix: './i18n/',
      suffix: '.json'
    }),

    // Global Error Handler - Bắt tất cả lỗi không được xử lý
    { provide: ErrorHandler, useClass: GlobalErrorHandler },

    // Register startup tasks (multi: true để có thể có nhiều tasks)
    { provide: STARTUP_TASK, useClass: LoadAppConfigTask, multi: true },
    { provide: STARTUP_TASK, useClass: InitI18nTask, multi: true }
  ]
};
