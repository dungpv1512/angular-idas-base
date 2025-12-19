import { Component, Input, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDescriptionsModule, NzDescriptionsSize } from 'ng-zorro-antd/descriptions';
import { NzBreakpointEnum } from 'ng-zorro-antd/core/services';

/**
 * Interface cho description item
 */
export interface DescriptionItem {
  /** Tiêu đề item */
  title: string;
  /** Giá trị item */
  value: string | number | TemplateRef<void>;
  /** Số cột chiếm dụng */
  span?: number;
}

/**
 * IDAS Descriptions Component - Wrapper cho nz-descriptions
 * Hiển thị danh sách thông tin dạng key-value
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
  /** Danh sách items */
  @Input() items: DescriptionItem[] = [];

  /** Tiêu đề của descriptions */
  @Input() title: string | TemplateRef<void> = '';

  /** Số cột hiển thị */
  @Input() column: number | Record<NzBreakpointEnum, number> = 3;

  /** Có border hay không */
  @Input() bordered = false;

  /** Size của descriptions */
  @Input() size: NzDescriptionsSize = 'default';

  /** Layout của descriptions */
  @Input() layout: 'horizontal' | 'vertical' = 'horizontal';

  /** Có colon sau title hay không */
  @Input() colon = true;

  /** Extra content ở góc phải header */
  @Input() extra: string | TemplateRef<void> = '';

  /**
   * Kiểm tra value có phải là TemplateRef không
   */
  isTemplate(value: string | number | TemplateRef<void>): boolean {
    return value instanceof TemplateRef;
  }
}
