import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzWaterMarkModule } from 'ng-zorro-antd/water-mark';

/**
 * IDAS Watermark Component - Wrapper cho nz-watermark
 */
@Component({
  selector: 'app-idas-watermark',
  standalone: true,
  imports: [CommonModule, NzWaterMarkModule],
  templateUrl: './idas-watermark.component.html',
  styleUrl: './idas-watermark.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasWatermarkComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
