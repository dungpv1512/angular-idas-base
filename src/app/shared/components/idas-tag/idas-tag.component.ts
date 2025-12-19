import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';

/**
 * IDAS Tag Component - Wrapper cho nz-tag
 * Hiển thị tag với màu sắc và các tùy chọn
 */
@Component({
  selector: 'app-idas-tag',
  standalone: true,
  imports: [CommonModule, NzTagModule],
  templateUrl: './idas-tag.component.html',
  styleUrl: './idas-tag.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasTagComponent {
  /** Màu sắc của tag */
  @Input() color: string = '';

  /** Chế độ tag (default, closeable) */
  @Input() mode: 'default' | 'closeable' = 'default';

  /** Có border hay không */
  @Input() bordered = true;

  /** Event khi đóng tag */
  @Output() onClose = new EventEmitter<MouseEvent>();

  /**
   * Xử lý sự kiện đóng tag
   */
  handleClose(event: MouseEvent): void {
    this.onClose.emit(event);
  }
}
