import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

/**
 * IDAS Popconfirm Component - Wrapper cho nz-popconfirm
 */
@Component({
  selector: 'app-idas-popconfirm',
  standalone: true,
  imports: [CommonModule, NzPopconfirmModule],
  templateUrl: './idas-popconfirm.component.html',
  styleUrl: './idas-popconfirm.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasPopconfirmComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
