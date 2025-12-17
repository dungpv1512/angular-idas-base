import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

/**
 * IDAS Skeleton Component - Wrapper cho nz-skeleton
 */
@Component({
  selector: 'app-idas-skeleton',
  standalone: true,
  imports: [CommonModule, NzSkeletonModule],
  templateUrl: './idas-skeleton.component.html',
  styleUrl: './idas-skeleton.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasSkeletonComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
