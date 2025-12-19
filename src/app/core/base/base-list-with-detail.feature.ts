import {
  inject,
  signal,
  DestroyRef,
  OnInit,
  OnDestroy,
  Signal,
  WritableSignal,
  Directive
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseStore } from './base-store';

/**
 * Base class cho các màn hình danh sách có drawer chi tiết với deep link support
 *
 * Cung cấp cơ chế:
 * - Đọc query param (idsDetail) khi khởi tạo
 * - Tự động mở drawer nếu có idsDetail trong URL
 * - Sync URL khi mở/đóng drawer
 * - Giữ nguyên trạng thái grid khi đóng drawer
 *
 * @example
 * ```typescript
 * @Component({...})
 * export class OrganizationListPage extends BaseListWithDetailFeature<OrganizationModel> {
 *   readonly store = inject(OrganizationStore);
 *   readonly queryParamKey = 'idsDetail';
 *
 *   readonly selectedOrganization = computed(() => {
 *     const id = this.selectedItemId();
 *     if (!id) return null;
 *     return this.store.organizations().find(org => org.Id === id) || null;
 *   });
 * }
 * ```
 *
 * Validates: Requirements 16.1, 16.2, 16.3, 16.4, 16.5
 */
@Directive()
export abstract class BaseListWithDetailFeature<T> implements OnInit, OnDestroy {
  /**
   * Inject các dependencies cần thiết
   */
  protected readonly router: Router = inject(Router);
  protected readonly route: ActivatedRoute = inject(ActivatedRoute);
  protected readonly destroyRef: DestroyRef = inject(DestroyRef);

  /**
   * Signals quản lý trạng thái drawer
   */
  private readonly _drawerVisible: WritableSignal<boolean> = signal(false);
  private readonly _selectedItemId: WritableSignal<number | null> = signal(null);

  /**
   * Public readonly signals - expose ra ngoài để components sử dụng
   */
  readonly drawerVisible: Signal<boolean> = this._drawerVisible.asReadonly();
  readonly selectedItemId: Signal<number | null> = this._selectedItemId.asReadonly();

  /**
   * Abstract properties - subclass phải implement
   */
  abstract readonly store: BaseStore<T[]>;

  /**
   * Query param key để sync với URL
   * Mặc định là 'idsDetail', subclass có thể override
   */
  readonly queryParamKey: string = 'idsDetail';

  /**
   * Lifecycle hook - khởi tạo deep link
   */
  ngOnInit(): void {
    this.initDeepLink();
  }

  /**
   * Đọc query param và mở drawer nếu có
   * Validates: Requirements 16.1, 16.2
   */
  protected initDeepLink(): void {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const idsParam = params[this.queryParamKey];
        if (idsParam) {
          // Hỗ trợ nhiều IDs (idsDetail=1,2,3), lấy ID đầu tiên
          const ids = String(idsParam)
            .split(',')
            .map(Number)
            .filter(id => !isNaN(id) && id > 0);

          if (ids.length > 0) {
            this.openDetailById(ids[0]);
          }
        }
      });
  }

  /**
   * Mở drawer với item ID
   * Subclass có thể override để thêm logic (ví dụ: load data)
   *
   * @param id - ID của item cần hiển thị chi tiết
   * Validates: Requirements 16.2
   */
  openDetailById(id: number): void {
    this._selectedItemId.set(id);
    this._drawerVisible.set(true);
    this.updateUrlWithDetail(id);
  }

  /**
   * Đóng drawer và xóa query param
   * Validates: Requirements 16.4
   */
  closeDetail(): void {
    this._drawerVisible.set(false);
    this._selectedItemId.set(null);
    this.removeDetailFromUrl();
  }

  /**
   * Cập nhật URL với idsDetail
   * Sử dụng replaceUrl để không tạo history entry mới
   *
   * @param id - ID để thêm vào URL
   * Validates: Requirements 16.3
   */
  protected updateUrlWithDetail(id: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [this.queryParamKey]: id },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  /**
   * Xóa idsDetail khỏi URL
   * Validates: Requirements 16.4
   */
  protected removeDetailFromUrl(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [this.queryParamKey]: null },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  /**
   * Set drawer visible state trực tiếp
   * Hữu ích khi cần control từ template
   *
   * @param visible - Trạng thái visible
   */
  setDrawerVisible(visible: boolean): void {
    this._drawerVisible.set(visible);
    if (!visible) {
      this._selectedItemId.set(null);
      this.removeDetailFromUrl();
    }
  }

  /**
   * Lifecycle hook - cleanup
   * takeUntilDestroyed tự động handle unsubscribe
   */
  ngOnDestroy(): void {
    // Cleanup handled by takeUntilDestroyed
  }
}
