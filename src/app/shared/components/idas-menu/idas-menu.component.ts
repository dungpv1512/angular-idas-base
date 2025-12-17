import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';

/**
 * IDAS Menu Component - Wrapper cho nz-menu
 */
@Component({
  selector: 'app-idas-menu',
  standalone: true,
  imports: [CommonModule, NzMenuModule],
  templateUrl: './idas-menu.component.html',
  styleUrl: './idas-menu.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasMenuComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
