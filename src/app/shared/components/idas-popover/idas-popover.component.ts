import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

/**
 * IDAS Popover Component - Wrapper cho nz-popover
 */
@Component({
  selector: 'app-idas-popover',
  standalone: true,
  imports: [CommonModule, NzPopoverModule],
  templateUrl: './idas-popover.component.html',
  styleUrl: './idas-popover.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasPopoverComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
