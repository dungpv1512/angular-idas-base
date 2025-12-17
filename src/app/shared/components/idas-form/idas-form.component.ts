import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';

/**
 * IDAS Form Component - Wrapper cho nz-form
 */
@Component({
  selector: 'app-idas-form',
  standalone: true,
  imports: [CommonModule, NzFormModule],
  templateUrl: './idas-form.component.html',
  styleUrl: './idas-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasFormComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
