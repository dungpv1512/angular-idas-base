import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

/**
 * IDAS Tabs Component - Wrapper cho nz-tabs
 */
@Component({
  selector: 'app-idas-tabs',
  standalone: true,
  imports: [CommonModule, NzTabsModule],
  templateUrl: './idas-tabs.component.html',
  styleUrl: './idas-tabs.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasTabsComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
