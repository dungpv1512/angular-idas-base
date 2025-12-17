import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorBoundaryComponent } from './shared/components/error-boundary/error-boundary.component';

/**
 * Root App Component
 * Sử dụng router-outlet để cho phép routing quyết định layout
 */
@Component({
  selector: 'app-root',
  imports: [ErrorBoundaryComponent, RouterOutlet],
  template: `<app-error-boundary>
                <router-outlet />
             </app-error-boundary>`
})
export class App { }
