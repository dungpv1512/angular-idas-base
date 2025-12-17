import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

/**
 * IDAS Layout Component - Wrapper cho nz-layout
 */
@Component({
  selector: 'app-idas-layout',
  standalone: true,
  imports: [CommonModule, NzLayoutModule],
  templateUrl: './idas-layout.component.html',
  styleUrl: './idas-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasLayoutComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
