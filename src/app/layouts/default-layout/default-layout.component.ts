import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

export interface MenuItem {
  title: string;
  icon?: string;
  route?: string;
  children?: MenuItem[];
  open?: boolean;
}

/**
 * Default Layout Component - Layout mặc định với sidebar menu
 */
@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzBreadCrumbModule
  ],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {
  isCollapsed = signal(false);

  menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      open: true,
      children: [
        { title: 'Welcome', route: '/welcome' },
        { title: 'Monitor', route: '/monitor' },
        { title: 'Workplace', route: '/workplace' }
      ]
    },
    {
      title: 'Components',
      icon: 'appstore',
      open: true,
      children: [
        { title: 'Shared Components Demo', route: '/demo' }
      ]
    },
    {
      title: 'Form',
      icon: 'form',
      children: [
        { title: 'Basic Form', route: '/form/basic' },
        { title: 'Advanced Form', route: '/form/advanced' }
      ]
    },
    {
      title: 'Table',
      icon: 'table',
      children: [
        { title: 'Basic Table', route: '/table/basic' },
        { title: 'Advanced Table', route: '/table/advanced' }
      ]
    }
  ];

  toggleCollapsed(): void {
    this.isCollapsed.update(value => !value);
  }
}
