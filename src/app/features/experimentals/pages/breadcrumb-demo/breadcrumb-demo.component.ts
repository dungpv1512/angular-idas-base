import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdasBreadcrumbComponent } from '@shared/components';
import { BreadcrumbOption } from '@shared/components/types';

/**
 * Breadcrumb Demo Component - Demo component Breadcrumb
 */
@Component({
  selector: 'app-breadcrumb-demo',
  standalone: true,
  imports: [CommonModule, IdasBreadcrumbComponent],
  templateUrl: './breadcrumb-demo.component.html',
  styleUrl: './breadcrumb-demo.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbDemoComponent {
  // Basic breadcrumb items
  readonly basicItems: BreadcrumbOption[] = [
    { label: 'Home' },
    { label: 'Application' },
    { label: 'List' }
  ];

  // Breadcrumb items with links
  readonly itemsWithLinks: BreadcrumbOption[] = [
    { label: 'Home', href: '#' },
    { label: 'Application Center', href: '#' },
    { label: 'Application List', href: '#' },
    { label: 'An Application' }
  ];

  // Breadcrumb items with icons
  readonly itemsWithIcons: BreadcrumbOption[] = [
    { label: '', icon: 'home' },
    { label: 'Application List', icon: 'user', href: '#' },
    { label: 'Application' }
  ];

  // Mixed items
  readonly mixedItems: BreadcrumbOption[] = [
    { label: 'Home', icon: 'home', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'Electronics', href: '#' },
    { label: 'Laptop' }
  ];
}
