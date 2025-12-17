import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { StartupTaskRunner } from './app/core/startup/startup-task.runner';

bootstrapApplication(App, appConfig)
  .then(async (appRef) => {
    // Run startup tasks after app is bootstrapped
    const startupRunner = appRef.injector.get(StartupTaskRunner);
    await startupRunner.runStartupTasks();
  })
  .catch((err) => console.error(err));
