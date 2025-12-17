import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

/**
 * IDAS Drawer Component - Wrapper cho nz-drawer
 */
@Component({
  selector: 'app-idas-drawer',
  standalone: true,
  imports: [CommonModule, NzDrawerModule],
  templateUrl: './idas-drawer.component.html',
  styleUrl: './idas-drawer.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasDrawerComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
