import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';

/**
 * IDAS Space Component - Wrapper cho nz-space
 */
@Component({
  selector: 'app-idas-space',
  standalone: true,
  imports: [CommonModule, NzSpaceModule],
  templateUrl: './idas-space.component.html',
  styleUrl: './idas-space.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasSpaceComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
