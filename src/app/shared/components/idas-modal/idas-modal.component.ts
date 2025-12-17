import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';

/**
 * IDAS Modal Component - Wrapper cho nz-modal
 */
@Component({
  selector: 'app-idas-modal',
  standalone: true,
  imports: [CommonModule, NzModalModule],
  templateUrl: './idas-modal.component.html',
  styleUrl: './idas-modal.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasModalComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
