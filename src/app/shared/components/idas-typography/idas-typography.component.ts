import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

/**
 * IDAS Typography Component - Wrapper cho nz-typography
 */
@Component({
  selector: 'app-idas-typography',
  standalone: true,
  imports: [CommonModule, NzTypographyModule],
  templateUrl: './idas-typography.component.html',
  styleUrl: './idas-typography.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasTypographyComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
