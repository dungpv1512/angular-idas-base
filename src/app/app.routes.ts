import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { 
    path: 'demo', 
    loadComponent: () => import('./shared/components/DEMO.component').then(m => m.SharedDemoComponent),
    title: 'Shared Components Demo'
  }
];
