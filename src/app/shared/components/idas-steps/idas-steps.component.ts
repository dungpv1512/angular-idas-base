import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzStepsModule } from 'ng-zorro-antd/steps';

/**
 * IDAS Steps Component - Wrapper cho nz-steps
 */
@Component({
  selector: 'app-idas-steps',
  standalone: true,
  imports: [CommonModule, NzStepsModule],
  templateUrl: './idas-steps.component.html',
  styleUrl: './idas-steps.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasStepsComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
