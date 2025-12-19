import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { LayoutHeaderComponent, LayoutSidebarComponent, LayoutFooterComponent } from './partials';
import { MenuItem } from './default-layout.model';

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
    LayoutHeaderComponent,
    LayoutSidebarComponent,
    LayoutFooterComponent
  ],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.less'
})
export class DefaultLayoutComponent {
  isCollapsed = signal(false);
  menuIcon = computed(() => this.isCollapsed() ? 'menu-unfold' : 'menu-fold');

  menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      titleKey: 'menu.welcome',
      icon: 'dashboard',
      open: true,
      children: [
        { title: 'Welcome', titleKey: 'menu.welcome', route: '/welcome' }
      ]
    },
    {
      title: 'Quản lý',
      icon: 'setting',
      open: true,
      children: [
        { title: 'Quản lý Tổ chức', titleKey: 'menu.tochuc', route: '/tochuc2' }
      ]
    },
    {
      title: 'Components',
      icon: 'appstore',
      open: false,
      children: [
        { title: 'Shared Components Demo', titleKey: 'menu.demo', route: '/demo' },
        { title: 'Virtual Table Demo', titleKey: 'menu.virtualTable', route: '/virtual-table' }
      ]
    }
  ];

  toggleCollapsed(): void {
    this.isCollapsed.update(value => !value);
  }
}
