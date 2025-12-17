import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { BreadcrumbOption } from '../types/breadcrumb-option.model';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * IDAS Breadcrumb Component - Wrapper cho nz-breadcrumb
 */
@Component({
  selector: 'app-idas-breadcrumb',
  standalone: true,
  imports: [CommonModule, NzBreadCrumbModule, NzIconModule],
  templateUrl: './idas-breadcrumb.component.html',
  styleUrl: './idas-breadcrumb.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasBreadcrumbComponent {
  @Input() items: BreadcrumbOption[] = [];
  @Input() autoGenerate: boolean = false;
  @Input() separator: string = '/';
  @Input() routeLabel: string = 'breadcrumb';
}
