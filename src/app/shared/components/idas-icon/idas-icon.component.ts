import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * IDAS Icon Component - Wrapper cho nz-icon
 */
@Component({
  selector: 'app-idas-icon',
  standalone: true,
  imports: [CommonModule, NzIconModule],
  templateUrl: './idas-icon.component.html',
  styleUrl: './idas-icon.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasIconComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
