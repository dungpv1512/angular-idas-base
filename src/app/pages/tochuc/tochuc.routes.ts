import { Routes } from '@angular/router';

export const toChucRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tochuc.component').then(m => m.ToChucComponent)
  }
];
