import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@app/layouts/default-layout/default-layout.component').then(m => m.DefaultLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: '' }
    ]
  },
  {
    path: '403',
    loadComponent: () => import('@app/layouts/blank-layout/blank-layout.component').then(m => m.BlankLayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('@app/features/forbidden/forbidden.feature').then(m => m.FORBIDDEN_ROUTES),
        title: '403 - Forbidden'
      }
    ]
  },
  {
    path: 'experimental',
    loadComponent: () => import('@app/layouts/experimental-layout/experimental-layout.component').then(m => m.ExperimentalLayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('@app/features/experimentals/experimentals.feature').then(m => m.EXPERIMENTAL_ROUTES),
        title: '🧪 Component Showcase'
      }
    ]
  }
];
