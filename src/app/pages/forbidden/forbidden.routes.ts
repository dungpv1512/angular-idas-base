import { Routes } from '@angular/router';
import { BlankLayoutComponent } from '../../layouts/blank-layout/blank-layout.component';

export const FORBIDDEN_ROUTES: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./forbidden.component').then(m => m.ForbiddenComponent)
      }
    ]
  }
];
