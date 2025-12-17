import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

/**
 * IDAS Collapse Component - Wrapper cho nz-collapse
 */
@Component({
  selector: 'app-idas-collapse',
  standalone: true,
  imports: [CommonModule, NzCollapseModule],
  templateUrl: './idas-collapse.component.html',
  styleUrl: './idas-collapse.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasCollapseComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
