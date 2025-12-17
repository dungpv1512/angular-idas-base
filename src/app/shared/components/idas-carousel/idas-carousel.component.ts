import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

/**
 * IDAS Carousel Component - Wrapper cho nz-carousel
 */
@Component({
  selector: 'app-idas-carousel',
  standalone: true,
  imports: [CommonModule, NzCarouselModule],
  templateUrl: './idas-carousel.component.html',
  styleUrl: './idas-carousel.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasCarouselComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
