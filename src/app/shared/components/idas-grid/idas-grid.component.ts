import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';

/**
 * IDAS Grid Component - Wrapper cho nz-grid
 */
@Component({
  selector: 'app-idas-grid',
  standalone: true,
  imports: [CommonModule, NzGridModule],
  templateUrl: './idas-grid.component.html',
  styleUrl: './idas-grid.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasGridComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
