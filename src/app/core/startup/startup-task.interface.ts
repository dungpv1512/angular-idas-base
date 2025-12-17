import { InjectionToken } from '@angular/core';

/**
 * Interface cho các task chạy khi ứng dụng khởi động
 * Tương tự IStartupTask trong .NET Core
 */
export interface IStartupTask {
  /**
   * Thứ tự thực thi (số nhỏ hơn = chạy trước)
   */
  readonly order: number;

  /**
   * Thực thi startup task
   */
  execute(): Promise<void>;
}

/**
 * Injection token để đăng ký các startup tasks
 * Sử dụng với multi: true để đăng ký nhiều tasks
 */
export const STARTUP_TASK = new InjectionToken<IStartupTask>('STARTUP_TASK');
