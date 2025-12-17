import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';

/**
 * IDAS Calendar Component - Wrapper cho nz-calendar
 */
@Component({
  selector: 'app-idas-calendar',
  standalone: true,
  imports: [CommonModule, NzCalendarModule],
  templateUrl: './idas-calendar.component.html',
  styleUrl: './idas-calendar.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasCalendarComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
