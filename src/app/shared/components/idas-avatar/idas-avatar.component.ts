import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

/**
 * IDAS Avatar Component - Wrapper cho nz-avatar
 */
@Component({
  selector: 'app-idas-avatar',
  standalone: true,
  imports: [CommonModule, NzAvatarModule],
  templateUrl: './idas-avatar.component.html',
  styleUrl: './idas-avatar.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasAvatarComponent {
  @Input() icon?: string;
  @Input() shape: 'circle' | 'square' = 'circle';
  @Input() size: 'large' | 'small' | 'default' | number = 'default';
  @Input() src?: string;
  @Input() srcSet?: string;
  @Input() alt?: string;
  @Input() text?: string;
  @Output() readonly error = new EventEmitter<Event>();

  onError(event: Event): void {
    this.error.emit(event);
  }
}
