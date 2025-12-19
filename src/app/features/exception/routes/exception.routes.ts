import { Routes } from '@angular/router';
import { BlankLayoutComponent } from '@app/layouts/blank-layout/blank-layout.component';

/**
 * Routes cho các trang exception: 403, 404, 500
 */
export const EXCEPTION_ROUTES: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: '403',
        loadComponent: () =>
          import('@app/features/exception/pages/forbidden/forbidden.page').then((m) => m.ForbiddenPage),
      },
      {
        path: '404',
        loadComponent: () =>
          import('@app/features/exception/pages/not-found/not-found.page').then((m) => m.NotFoundPage),
      },
      {
        path: '500',
        loadComponent: () =>
          import('@app/features/exception/pages/server-error/server-error.page').then((m) => m.ServerErrorPage),
      },
      {
        path: '',
        redirectTo: '404',
        pathMatch: 'full',
      },
    ],
  },
];
