import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCommentModule } from 'ng-zorro-antd/comment';

/**
 * IDAS Comment Component - Wrapper cho nz-comment
 */
@Component({
  selector: 'app-idas-comment',
  standalone: true,
  imports: [CommonModule, NzCommentModule],
  templateUrl: './idas-comment.component.html',
  styleUrl: './idas-comment.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasCommentComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
