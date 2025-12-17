import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzImageModule } from 'ng-zorro-antd/image';

/**
 * IDAS Image Component - Wrapper cho nz-image
 */
@Component({
  selector: 'app-idas-image',
  standalone: true,
  imports: [CommonModule, NzImageModule],
  templateUrl: './idas-image.component.html',
  styleUrl: './idas-image.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasImageComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
