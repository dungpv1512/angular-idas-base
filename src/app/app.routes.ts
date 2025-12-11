import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { 
    path: 'tochuc', 
    loadChildren: () => import('./pages/tochuc/tochuc.routes').then(m => m.toChucRoutes),
    title: 'Quản lý Tổ chức'
  },
  { 
    path: 'demo', 
    loadComponent: () => import('./shared/components/DEMO.component').then(m => m.SharedDemoComponent),
    title: 'Shared Components Demo'
  },
  { 
    path: 'virtual-table', 
    loadComponent: () => import('./pages/virtual-table-demo/virtual-table-demo.component').then(m => m.VirtualTableDemoComponent),
    title: 'Virtual Table Demo'
  }
];
