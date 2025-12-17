import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

/**
 * IDAS Empty Component - Wrapper cho nz-empty
 */
@Component({
  selector: 'app-idas-empty',
  standalone: true,
  imports: [CommonModule, NzEmptyModule],
  templateUrl: './idas-empty.component.html',
  styleUrl: './idas-empty.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasEmptyComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
