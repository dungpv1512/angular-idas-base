import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

/**
 * IDAS Descriptions Component - Wrapper cho nz-descriptions
 */
@Component({
  selector: 'app-idas-descriptions',
  standalone: true,
  imports: [CommonModule, NzDescriptionsModule],
  templateUrl: './idas-descriptions.component.html',
  styleUrl: './idas-descriptions.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasDescriptionsComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
