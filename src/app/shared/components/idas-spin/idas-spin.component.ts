import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';

/**
 * IDAS Spin Component - Wrapper cho nz-spin
 */
@Component({
  selector: 'app-idas-spin',
  standalone: true,
  imports: [CommonModule, NzSpinModule],
  templateUrl: './idas-spin.component.html',
  styleUrl: './idas-spin.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasSpinComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
