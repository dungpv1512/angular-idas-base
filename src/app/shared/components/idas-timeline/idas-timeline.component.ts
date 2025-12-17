import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

/**
 * IDAS Timeline Component - Wrapper cho nz-timeline
 */
@Component({
  selector: 'app-idas-timeline',
  standalone: true,
  imports: [CommonModule, NzTimelineModule],
  templateUrl: './idas-timeline.component.html',
  styleUrl: './idas-timeline.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasTimelineComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
