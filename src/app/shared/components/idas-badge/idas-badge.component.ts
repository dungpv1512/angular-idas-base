import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

/**
 * IDAS Badge Component - Wrapper cho nz-badge
 */
@Component({
  selector: 'app-idas-badge',
  standalone: true,
  imports: [CommonModule, NzBadgeModule],
  templateUrl: './idas-badge.component.html',
  styleUrl: './idas-badge.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasBadgeComponent {
  @Input() count?: number;
  @Input() dot = false;
  @Input() showZero = false;
  @Input() overflowCount = 99;
  @Input() color?: string;
  @Input() text?: string;
  @Input() title?: string;
  @Input() offset?: [number, number];
  @Input() status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
}
