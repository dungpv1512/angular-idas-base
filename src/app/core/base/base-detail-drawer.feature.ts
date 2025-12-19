import {
  signal,
  computed,
  Signal,
  WritableSignal,
  Directive,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

/**
 * Base class cho các drawer chi tiết
 *
 * Cung cấp cơ chế:
 * - Quản lý tabs (activeTab)
 * - Loading state
 * - Close handling với reset state
 * - Two-way binding cho visible state
 *
 * @example
 * ```typescript
 * @Component({...})
 * export class OrganizationDetailDrawerComponent extends BaseDetailDrawerFeature<OrganizationModel> {
 *   override readonly drawerWidth = '600px';
 *
 *   override readonly drawerTitle = computed(() => {
 *     const item = this.selectedItem();
 *     return item?.TenToChuc || 'Chi tiết tổ chức';
 *   });
 *
 *   readonly selectedItem = computed(() => {
 *     const id = this.itemId;
 *     if (!id) return null;
 *     return this.store.organizations().find(org => org.Id === id) || null;
 *   });
 * }
 * ```
 *
 * Validates: Requirements 3.1, 3.7
 */
@Directive()
export abstract class BaseDetailDrawerFeature<T> {
  /**
   * Input properties - nhận từ parent component
   */
  @Input() visible: boolean = false;
  @Input() itemId: number | null = null;

  /**
   * Output events - emit events lên parent component
   */
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Internal state signals
   */
  private readonly _activeTab: WritableSignal<number> = signal(0);
  private readonly _loading: WritableSignal<boolean> = signal(false);

  /**
   * Public readonly signals
   */
  readonly activeTab: Signal<number> = this._activeTab.asReadonly();
  readonly loading: Signal<boolean> = this._loading.asReadonly();

  /**
   * Abstract properties - subclass phải implement
   */
  abstract readonly drawerTitle: Signal<string>;
  abstract readonly drawerWidth: string;

  /**
   * Xử lý đóng drawer
   * Emit events và reset state
   * Validates: Requirements 3.7
   */
  handleClose(): void {
    this.visibleChange.emit(false);
    this.onClose.emit();
    this.resetState();
  }

  /**
   * Reset state khi đóng drawer
   * Subclass có thể override để thêm logic reset
   * Validates: Requirements 3.7
   */
  protected resetState(): void {
    this._activeTab.set(0);
    this._loading.set(false);
  }

  /**
   * Set active tab
   *
   * @param index - Index của tab cần active
   */
  setActiveTab(index: number): void {
    this._activeTab.set(index);
  }

  /**
   * Set loading state
   *
   * @param loading - Trạng thái loading
   */
  protected setLoading(loading: boolean): void {
    this._loading.set(loading);
  }

  /**
   * Computed signal kiểm tra drawer có đang mở không
   */
  readonly isOpen: Signal<boolean> = computed(() => this.visible);

  /**
   * Computed signal kiểm tra có item được chọn không
   */
  readonly hasSelectedItem: Signal<boolean> = computed(() => this.itemId !== null);
}
