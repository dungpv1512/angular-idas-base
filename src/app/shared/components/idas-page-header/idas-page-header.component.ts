import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

/**
 * IDAS PageHeader Component - Wrapper cho nz-page-header
 */
@Component({
  selector: 'app-idas-page-header',
  standalone: true,
  imports: [CommonModule, NzPageHeaderModule],
  templateUrl: './idas-page-header.component.html',
  styleUrl: './idas-page-header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasPageHeaderComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
