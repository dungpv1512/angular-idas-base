import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';

/**
 * IDAS Card Component - Wrapper cho nz-card
 */
@Component({
  selector: 'app-idas-card',
  standalone: true,
  imports: [CommonModule, NzCardModule],
  templateUrl: './idas-card.component.html',
  styleUrl: './idas-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasCardComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
