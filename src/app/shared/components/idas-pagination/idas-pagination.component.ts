import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

/**
 * IDAS Pagination Component - Wrapper cho nz-pagination
 */
@Component({
  selector: 'app-idas-pagination',
  standalone: true,
  imports: [CommonModule, NzPaginationModule],
  templateUrl: './idas-pagination.component.html',
  styleUrl: './idas-pagination.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasPaginationComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
