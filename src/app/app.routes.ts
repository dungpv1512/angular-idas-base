import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@app/layouts/default-layout/default-layout.component').then(m => m.DefaultLayoutComponent),
    children: [
    ]
  },
  {
    path: 'exception',
    loadChildren: () => import('@app/features/exception/exception.feature').then(m => m.EXCEPTION_ROUTES),
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
