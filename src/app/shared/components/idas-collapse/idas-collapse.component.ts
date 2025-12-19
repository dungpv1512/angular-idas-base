import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

/**
 * Interface cho collapse panel item
 */
export interface CollapsePanelItem {
  /** Tiêu đề panel */
  header: string | TemplateRef<void>;
  /** Nội dung panel */
  content?: TemplateRef<void>;
  /** Panel có đang mở không */
  active?: boolean;
  /** Panel có bị disabled không */
  disabled?: boolean;
  /** Có hiển thị arrow không */
  showArrow?: boolean;
  /** Extra content ở góc phải header */
  extra?: string | TemplateRef<void>;
}

/**
 * IDAS Collapse Component - Wrapper cho nz-collapse
 * Hỗ trợ hiển thị collapse panels với nhiều tùy chọn
 */
@Component({
  selector: 'app-idas-collapse',
  standalone: true,
  imports: [CommonModule, NzCollapseModule],
  templateUrl: './idas-collapse.component.html',
  styleUrl: './idas-collapse.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasCollapseComponent {
  /** Danh sách panels */
  @Input() panels: CollapsePanelItem[] = [];

  /** Chế độ accordion (chỉ 1 panel mở tại 1 thời điểm) */
  @Input() accordion = false;

  /** Có border hay không */
  @Input() bordered = true;

  /** Có expand icon position */
  @Input() expandIconPosition: 'start' | 'end' = 'start';

  /** Có ghost style hay không */
  @Input() ghost = false;

  /** Event khi panel active thay đổi */
  @Output() activeChange = new EventEmitter<boolean[]>();

  /**
   * Xử lý sự kiện active thay đổi
   */
  onActiveChange(index: number, active: boolean): void {
    if (this.panels[index]) {
      this.panels[index].active = active;
      const activeStates = this.panels.map(p => p.active || false);
      this.activeChange.emit(activeStates);
    }
  }
}
