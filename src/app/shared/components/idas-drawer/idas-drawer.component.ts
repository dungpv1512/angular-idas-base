import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  TemplateRef,
  ContentChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDrawerModule, NzDrawerPlacement } from 'ng-zorro-antd/drawer';

/**
 * IDAS Drawer Component - Wrapper cho nz-drawer
 * Cung cấp drawer panel có thể mở từ các cạnh của màn hình
 *
 * @example
 * ```html
 * <app-idas-drawer
 *   [visible]="drawerVisible()"
 *   [title]="'Chi tiết'"
 *   [width]="600"
 *   (visibleChange)="drawerVisible.set($event)"
 *   (onClose)="handleClose()">
 *   <ng-container *nzDrawerContent>
 *     <!-- Nội dung drawer -->
 *   </ng-container>
 * </app-idas-drawer>
 * ```
 */
@Component({
  selector: 'app-idas-drawer',
  standalone: true,
  imports: [CommonModule, NzDrawerModule],
  templateUrl: './idas-drawer.component.html',
  styleUrl: './idas-drawer.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdasDrawerComponent {
  /**
   * Trạng thái hiển thị của drawer
   */
  @Input() visible = false;

  /**
   * Tiêu đề của drawer
   */
  @Input() title: string | TemplateRef<object> = '';

  /**
   * Chiều rộng của drawer (khi placement là left/right)
   * Có thể là số (px) hoặc string (%, vw, etc.)
   */
  @Input() width: string | number = 256;

  /**
   * Chiều cao của drawer (khi placement là top/bottom)
   * Có thể là số (px) hoặc string (%, vh, etc.)
   */
  @Input() height: string | number = 256;

  /**
   * Vị trí xuất hiện của drawer
   */
  @Input() placement: NzDrawerPlacement = 'right';

  /**
   * Hiển thị nút đóng ở góc trên bên phải
   */
  @Input() closable = true;

  /**
   * Cho phép đóng drawer khi click vào mask (overlay)
   */
  @Input() maskClosable = true;

  /**
   * Cho phép đóng drawer bằng phím ESC
   */
  @Input() keyboard = true;

  /**
   * Hiển thị mask (overlay) phía sau drawer
   */
  @Input() mask = true;

  /**
   * Style cho mask
   */
  @Input() maskStyle: { [key: string]: string } | undefined = undefined;

  /**
   * Style cho body của drawer
   */
  @Input() bodyStyle: { [key: string]: string } | undefined = undefined;

  /**
   * Style cho header của drawer
   */
  @Input() headerStyle: { [key: string]: string } | undefined = undefined;

  /**
   * Template cho footer của drawer
   */
  @Input() footer: string | TemplateRef<object> | undefined = undefined;

  /**
   * Template cho extra content ở header (bên phải title)
   */
  @Input() extra: string | TemplateRef<object> | undefined = undefined;

  /**
   * Z-index của drawer
   */
  @Input() zIndex = 1000;

  /**
   * Class CSS bổ sung cho wrapper
   */
  @Input() wrapClassName = '';

  /**
   * Offset X khi placement là left/right
   */
  @Input() offsetX = 0;

  /**
   * Offset Y khi placement là top/bottom
   */
  @Input() offsetY = 0;

  /**
   * Event emit khi trạng thái visible thay đổi
   */
  @Output() visibleChange = new EventEmitter<boolean>();

  /**
   * Event emit khi drawer được đóng
   */
  @Output() onClose = new EventEmitter<void>();

  /**
   * Event emit khi drawer được mở (sau animation)
   */
  @Output() onOpen = new EventEmitter<void>();

  /**
   * Content template reference
   */
  @ContentChild('drawerContent') drawerContent: TemplateRef<object> | null = null;

  /**
   * Xử lý khi drawer đóng
   */
  handleClose(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.onClose.emit();
  }

  /**
   * Xử lý khi drawer mở xong (sau animation)
   */
  handleAfterOpen(): void {
    this.onOpen.emit();
  }

  /**
   * Xử lý khi visible thay đổi từ nz-drawer
   */
  handleVisibleChange(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(visible);
    if (!visible) {
      this.onClose.emit();
    }
  }
}
