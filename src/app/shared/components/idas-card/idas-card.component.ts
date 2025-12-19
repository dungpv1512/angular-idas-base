import { Component, Input, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';

/**
 * IDAS Card Component - Wrapper cho nz-card
 * Hỗ trợ các tính năng cơ bản của card
 */
@Component({
  selector: 'app-idas-card',
  standalone: true,
  imports: [CommonModule, NzCardModule],
  templateUrl: './idas-card.component.html',
  styleUrl: './idas-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasCardComponent {
  /** Tiêu đề card */
  @Input() title: string | TemplateRef<void> = '';

  /** Nội dung extra ở góc phải header */
  @Input() extra: string | TemplateRef<void> = '';

  /** Có border hay không */
  @Input() bordered = true;

  /** Có hoverable effect hay không */
  @Input() hoverable = false;

  /** Loading state */
  @Input() loading = false;

  /** Card size */
  @Input() size: 'default' | 'small' = 'default';

  /** Card type */
  @Input() type: 'default' | 'inner' = 'default';

  /** Body style */
  @Input() bodyStyle: { [key: string]: string } = {};
}
