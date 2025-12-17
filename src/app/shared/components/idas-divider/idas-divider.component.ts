import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';

/**
 * IDAS Divider Component - Wrapper cho nz-divider
 */
@Component({
  selector: 'app-idas-divider',
  standalone: true,
  imports: [CommonModule, NzDividerModule],
  templateUrl: './idas-divider.component.html',
  styleUrl: './idas-divider.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasDividerComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
