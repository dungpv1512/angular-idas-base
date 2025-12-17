import { inject, Injectable } from '@angular/core';
import { IStartupTask, STARTUP_TASK } from './startup-task.interface';

/**
 * Runner thực thi tất cả startup tasks đã đăng ký theo thứ tự
 * Tương tự RunStartupTasks() trong .NET Core
 */
@Injectable({ providedIn: 'root' })
export class StartupTaskRunner {
  // Inject tất cả startup tasks đã đăng ký (multi: true)
  private readonly tasks = inject<IStartupTask[]>(STARTUP_TASK, { optional: true }) ?? [];

  /**
   * Thực thi tất cả startup tasks theo thứ tự
   */
  async runStartupTasks(): Promise<void> {
    if (this.tasks.length === 0) {
      console.log('[StartupTaskRunner] No startup tasks registered');
      return;
    }

    // Sắp xếp theo order (tăng dần)
    const sortedTasks = [...this.tasks].sort((a, b) => a.order - b.order);

    console.log(`[StartupTaskRunner] Running ${sortedTasks.length} startup task(s)...`);

    for (const task of sortedTasks) {
      const taskName = task.constructor.name;
      try {
        console.log(`[StartupTaskRunner] Executing: ${taskName} (order: ${task.order})`);
        await task.execute();
        console.log(`[StartupTaskRunner] Completed: ${taskName}`);
      } catch (error) {
        console.error(`[StartupTaskRunner] Failed: ${taskName}`, error);
        // Re-throw để dừng khởi tạo app
        throw error;
      }
    }

    console.log('[StartupTaskRunner] All startup tasks completed');
  }
}
