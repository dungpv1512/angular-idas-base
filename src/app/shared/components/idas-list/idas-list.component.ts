import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';

/**
 * IDAS List Component - Wrapper cho nz-list
 */
@Component({
  selector: 'app-idas-list',
  standalone: true,
  imports: [CommonModule, NzListModule],
  templateUrl: './idas-list.component.html',
  styleUrl: './idas-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasListComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
