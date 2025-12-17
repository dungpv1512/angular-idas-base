import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAlertModule } from 'ng-zorro-antd/alert';

/**
 * IDAS Alert Component - Wrapper cho nz-alert
 */
@Component({
  selector: 'app-idas-alert',
  standalone: true,
  imports: [CommonModule, NzAlertModule],
  templateUrl: './idas-alert.component.html',
  styleUrl: './idas-alert.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasAlertComponent {
  @Input() type: 'success' | 'info' | 'warning' | 'error' = 'info';
  @Input() closeable = false;
  @Input() showIcon = false;
  @Input() message = '';
  @Input() description = '';
  @Input() banner = false;
  @Output() readonly close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
