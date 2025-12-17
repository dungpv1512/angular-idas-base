import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

/**
 * IDAS Statistic Component - Wrapper cho nz-statistic
 */
@Component({
  selector: 'app-idas-statistic',
  standalone: true,
  imports: [CommonModule, NzStatisticModule],
  templateUrl: './idas-statistic.component.html',
  styleUrl: './idas-statistic.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasStatisticComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
