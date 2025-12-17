import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzProgressModule } from 'ng-zorro-antd/progress';

/**
 * IDAS Progress Component - Wrapper cho nz-progress
 */
@Component({
  selector: 'app-idas-progress',
  standalone: true,
  imports: [CommonModule, NzProgressModule],
  templateUrl: './idas-progress.component.html',
  styleUrl: './idas-progress.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasProgressComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
