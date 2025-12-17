import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';

/**
 * IDAS Tag Component - Wrapper cho nz-tag
 */
@Component({
  selector: 'app-idas-tag',
  standalone: true,
  imports: [CommonModule, NzTagModule],
  templateUrl: './idas-tag.component.html',
  styleUrl: './idas-tag.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasTagComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
