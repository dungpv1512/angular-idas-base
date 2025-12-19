import { Component, Input, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzResultModule, NzResultStatusType } from 'ng-zorro-antd/result';

/**
 * IDAS Result Component - Wrapper cho nz-result
 * Hiển thị kết quả của một thao tác (thành công, lỗi, cảnh báo, thông tin, 403, 404, 500)
 */
@Component({
  selector: 'app-idas-result',
  standalone: true,
  imports: [CommonModule, NzResultModule],
  templateUrl: './idas-result.component.html',
  styleUrl: './idas-result.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasResultComponent {
  /** Trạng thái hiển thị: success, error, info, warning, 404, 403, 500 */
  @Input() status: NzResultStatusType = 'info';

  /** Tiêu đề chính */
  @Input() title: string | TemplateRef<void> = '';

  /** Mô tả phụ */
  @Input() subTitle: string | TemplateRef<void> = '';

  /** Icon tùy chỉnh (string hoặc TemplateRef) */
  @Input() icon: string | TemplateRef<void> | undefined = undefined;

  /** Template cho phần extra (thường là các button hành động) */
  @Input() extra: TemplateRef<void> | undefined = undefined;
}
