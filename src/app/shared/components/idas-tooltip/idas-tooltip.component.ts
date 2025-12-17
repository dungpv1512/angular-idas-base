import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

/**
 * IDAS Tooltip Component - Wrapper cho nz-tooltip
 */
@Component({
  selector: 'app-idas-tooltip',
  standalone: true,
  imports: [CommonModule, NzTooltipModule],
  templateUrl: './idas-tooltip.component.html',
  styleUrl: './idas-tooltip.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasTooltipComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
