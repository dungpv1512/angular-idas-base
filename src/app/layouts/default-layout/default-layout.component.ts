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
  styleUrl: './default-layout.component.less'
})
export class DefaultLayoutComponent {
  isCollapsed = signal(false);

  menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      open: true,
      children: [
        { title: 'Welcome', route: '/welcome' }
      ]
    },
    {
      title: 'Quản lý',
      icon: 'setting',
      open: true,
      children: [
        { title: 'Quản lý Tổ chức', route: '/tochuc' }
      ]
    },
    {
      title: 'Components',
      icon: 'appstore',
      open: false,
      children: [
        { title: 'Shared Components Demo', route: '/demo' },
        { title: 'Virtual Table Demo', route: '/virtual-table' }
      ]
    }
  ];

  toggleCollapsed(): void {
    this.isCollapsed.update(value => !value);
  }
}
