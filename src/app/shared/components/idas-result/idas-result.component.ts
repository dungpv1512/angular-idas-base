import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzResultModule } from 'ng-zorro-antd/result';

/**
 * IDAS Result Component - Wrapper cho nz-result
 */
@Component({
  selector: 'app-idas-result',
  standalone: true,
  imports: [CommonModule, NzResultModule],
  templateUrl: './idas-result.component.html',
  styleUrl: './idas-result.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasResultComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
