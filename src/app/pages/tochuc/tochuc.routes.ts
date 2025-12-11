import { Routes } from '@angular/router';

export const toChucRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tochuc.component').then(m => m.ToChucComponent)
  },
  {
    path: 'selector-demo',
    loadComponent: () => import('./components/tochuc-selector/tochuc-selector-demo.component').then(m => m.ToChucSelectorDemoComponent),
    title: 'ToChuc Selector Demo'
  }
];
