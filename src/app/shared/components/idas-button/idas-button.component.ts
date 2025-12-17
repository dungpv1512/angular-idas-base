import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

/**
 * IDAS Button Component - Wrapper cho nz-button
 */
@Component({
  selector: 'app-idas-button',
  standalone: true,
  imports: [CommonModule, NzButtonModule],
  templateUrl: './idas-button.component.html',
  styleUrl: './idas-button.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasButtonComponent {
  @Input() type: 'primary' | 'default' | 'dashed' | 'link' | 'text' = 'default';
  @Input() shape: 'circle' | 'round' | null = null;
  @Input() size: 'large' | 'default' | 'small' = 'default';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() block = false;
  @Input() danger = false;
  @Input() ghost = false;
}
