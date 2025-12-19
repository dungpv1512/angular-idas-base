import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTabsModule, NzTabPosition, NzTabType } from 'ng-zorro-antd/tabs';

/**
 * Interface cho tab item
 */
export interface TabItem {
  /** Tiêu đề tab */
  title: string;
  /** Template cho nội dung tab */
  content?: TemplateRef<void>;
  /** Tab có bị disabled không */
  disabled?: boolean;
  /** Icon cho tab */
  icon?: string;
}

/**
 * IDAS Tabs Component - Wrapper cho nz-tabs
 * Hỗ trợ hiển thị tabs với nhiều tùy chọn
 */
@Component({
  selector: 'app-idas-tabs',
  standalone: true,
  imports: [CommonModule, NzTabsModule],
  templateUrl: './idas-tabs.component.html',
  styleUrl: './idas-tabs.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasTabsComponent {
  /** Danh sách tabs */
  @Input() tabs: TabItem[] = [];

  /** Index của tab đang được chọn */
  @Input() selectedIndex = 0;

  /** Vị trí của tabs */
  @Input() tabPosition: NzTabPosition = 'top';

  /** Loại tabs */
  @Input() type: NzTabType = 'line';

  /** Size của tabs */
  @Input() size: 'large' | 'default' | 'small' = 'default';

  /** Có animated hay không */
  @Input() animated = true;

  /** Có centered hay không */
  @Input() centered = false;

  /** Event khi tab thay đổi */
  @Output() selectedIndexChange = new EventEmitter<number>();

  /** Event khi click vào tab */
  @Output() tabClick = new EventEmitter<{ index: number; tab: TabItem }>();

  /**
   * Xử lý sự kiện thay đổi tab
   */
  onTabChange(index: number): void {
    this.selectedIndex = index;
    this.selectedIndexChange.emit(index);
  }

  /**
   * Xử lý sự kiện click tab
   */
  onTabClick(index: number): void {
    if (this.tabs[index]) {
      this.tabClick.emit({ index, tab: this.tabs[index] });
    }
  }
}
