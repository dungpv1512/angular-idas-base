import { Routes } from '@angular/router';
import { BlankLayoutComponent } from '@app/layouts/blank-layout/blank-layout.component';

/**
 * Routes cho trang 403 Forbidden
 */
export const FORBIDDEN_ROUTES: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@app/features/forbidden/pages/forbidden/forbidden.component').then((m) => m.ForbiddenComponent),
      },
    ],
  },
];
