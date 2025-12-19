import { Routes } from '@angular/router';

/**
 * Routes cho feature Experimentals - Component Showcase
 * Chứa các demo components để test và preview
 */
export const EXPERIMENTAL_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'form-inputs',
    pathMatch: 'full'
  },
  {
    path: 'form-inputs',
    loadComponent: () =>
      import('../pages/form-inputs-demo/form-inputs-demo.component').then(
        (m) => m.FormInputsDemoComponent
      )
  },
  {
    path: 'selection-controls',
    loadComponent: () =>
      import('../pages/selection-controls-demo/selection-controls-demo.component').then(
        (m) => m.SelectionControlsDemoComponent
      )
  },
  {
    path: 'date-upload',
    loadComponent: () =>
      import('../pages/date-upload-demo/date-upload-demo.component').then(
        (m) => m.DateUploadDemoComponent
      )
  },
  {
    path: 'search-tags',
    loadComponent: () =>
      import('../pages/search-tags-demo/search-tags-demo.component').then(
        (m) => m.SearchTagsDemoComponent
      )
  },
  {
    path: 'table-tree',
    loadComponent: () =>
      import('../pages/table-tree-demo/table-tree-demo.component').then(
        (m) => m.TableTreeDemoComponent
      )
  },
  {
    path: 'form-demo',
    loadComponent: () =>
      import('../pages/form-complete-demo/form-complete-demo.component').then(
        (m) => m.FormCompleteDemoComponent
      )
  },
  {
    path: 'alert',
    loadComponent: () =>
      import('../pages/alert-demo/alert-demo.component').then(
        (m) => m.AlertDemoComponent
      )
  },
  {
    path: 'avatar',
    loadComponent: () =>
      import('../pages/avatar-demo/avatar-demo.component').then(
        (m) => m.AvatarDemoComponent
      )
  },
  {
    path: 'button',
    loadComponent: () =>
      import('../pages/button-demo/button-demo.component').then(
        (m) => m.ButtonDemoComponent
      )
  },
  {
    path: 'badge',
    loadComponent: () =>
      import('../pages/badge-demo/badge-demo.component').then(
        (m) => m.BadgeDemoComponent
      )
  },
  {
    path: 'affix',
    loadComponent: () =>
      import('../pages/affix-demo/affix-demo.component').then(
        (m) => m.AffixDemoComponent
      )
  },
  {
    path: 'anchor',
    loadComponent: () =>
      import('../pages/anchor-demo/anchor-demo.component').then(
        (m) => m.AnchorDemoComponent
      )
  },
  {
    path: 'back-top',
    loadComponent: () =>
      import('../pages/back-top-demo/back-top-demo.component').then(
        (m) => m.BackTopDemoComponent
      )
  },
  {
    path: 'breadcrumb',
    loadComponent: () =>
      import('../pages/breadcrumb-demo/breadcrumb-demo.component').then(
        (m) => m.BreadcrumbDemoComponent
      )
  },
  {
    path: 'result',
    loadComponent: () =>
      import('../pages/result-demo/result-demo.component').then(
        (m) => m.ResultDemoComponent
      )
  },
  {
    path: 'segmented',
    loadComponent: () =>
      import('../pages/segmented-demo/segmented-demo.component').then(
        (m) => m.SegmentedDemoComponent
      )
  }
];
