import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  Optional,
  Self,
  signal,
  computed,
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NgControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { IdasOrganizationViewComponent, OrganizationData } from '../idas-organization-view/idas-organization-view.component';
import { IdasSearchComponent } from '../idas-search/idas-search.component';
import { IdasButtonComponent } from '../idas-button/idas-button.component';
import { TableColumn } from '@app/shared/types/table.types';
import { I18N_TOCHUC, I18N_COMMON, ICON_ACTION, VIEW_MODE } from '@app/shared/constants';

/**
 * Interface cho filter options
 */
export interface OrganizationSelectorFilter {
  loai?: number;
  trangThai?: number;
  tinhTrang?: number;
  excludeIds?: number[];
}

/**
 * IDAS Organization Selector Component
 * Shared component chọn tổ chức dạng popup với Organization View
 * Implements ControlValueAccessor để sử dụng với Reactive Forms
 * 
 * Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7
 */
@Component({
  selector: 'app-idas-organization-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzSpinModule,
    IdasOrganizationViewComponent,
    IdasSearchComponent,
    IdasButtonComponent
  ],
  templateUrl: './idas-organization-selector.component.html',
  styleUrl: './idas-organization-selector.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasOrganizationSelectorComponent implements ControlValueAccessor, OnChanges {
  // ============================================
  // INJECTIONS
  // ============================================
  private readonly translate = inject(TranslateService);

  // ============================================
  // INPUTS
  // ============================================

  /** Label hiển thị */
  @Input() label = '';

  /** Placeholder cho input */
  @Input() placeholder = '';

  /** Dữ liệu tổ chức để hiển thị trong modal */
  @Input() data: OrganizationData[] = [];

  /** ID tổ chức đã chọn (single mode) */
  @Input() selectedId: number | null = null;

  /** Cho phép chọn nhiều tổ chức */
  @Input() multiple = false;

  /** Filter options */
  @Input() filter: OrganizationSelectorFilter = {};

  /** Bắt buộc chọn */
  @Input() required = false;

  /** Disabled state */
  @Input() disabled = false;

  /** Thông báo lỗi */
  @Input() errorTip = '';

  /** Hiển thị nút clear */
  @Input() showClear = true;

  /** Trạng thái loading */
  @Input() loading = false;

  /** Cấu hình cột cho table trong modal */
  @Input() columns: TableColumn[] = [];

  /** Chiều rộng modal */
  @Input() modalWidth: string | number = 800;

  /** Tiêu đề modal */
  @Input() modalTitle = '';

  // ============================================
  // OUTPUTS
  // ============================================

  /** Event khi chọn tổ chức */
  @Output() onSelect = new EventEmitter<OrganizationData | OrganizationData[]>();

  /** Event khi clear selection */
  @Output() onClear = new EventEmitter<void>();

  // ============================================
  // INTERNAL STATE
  // ============================================

  /** i18n keys */
  readonly i18n = I18N_TOCHUC;
  readonly i18nCommon = I18N_COMMON;

  /** Icon constants */
  readonly ICON_ACTION = ICON_ACTION;

  /** View mode constant */
  readonly VIEW_MODE = VIEW_MODE;

  /** Modal visible state */
  readonly modalVisible = signal(false);

  /** Search text trong modal */
  readonly searchText = signal('');

  /** Temporary selection trong modal (chưa confirm) */
  readonly tempSelectedIds = signal<number[]>([]);

  /** Temporary selected records trong modal */
  readonly tempSelectedRecords = signal<OrganizationData[]>([]);

  /** Value được lưu (single: number | null, multiple: number[]) */
  private internalValue: number | number[] | null = null;

  /** Selected records để hiển thị */
  readonly selectedRecords = signal<OrganizationData[]>([]);

  /** Computed: filtered data theo search và filter */
  readonly filteredData = computed(() => {
    let result = this.data;
    const search = this.searchText().toLowerCase().trim();
    const filterOptions = this.filter;

    // Áp dụng filter
    if (filterOptions) {
      result = this.applyFilter(result, filterOptions);
    }

    // Áp dụng search
    if (search) {
      result = this.applySearch(result, search);
    }

    return result;
  });

  /** Computed: display text cho input */
  readonly displayText = computed(() => {
    const records = this.selectedRecords();
    if (records.length === 0) return '';
    if (this.multiple) {
      return records.map(r => r.TenToChuc).join(', ');
    }
    return records[0]?.TenToChuc || '';
  });

  /** Computed: modal title */
  readonly computedModalTitle = computed(() => {
    if (this.modalTitle) return this.modalTitle;
    return this.translate.instant(this.i18n.SELECT_TO_CHUC);
  });

  // ============================================
  // CONSTRUCTOR
  // ============================================

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // ============================================
  // LIFECYCLE
  // ============================================

  ngOnChanges(changes: SimpleChanges): void {
    // Khi data thay đổi, cập nhật selected records
    if (changes['data'] || changes['selectedId']) {
      this.updateSelectedRecords();
    }
  }

  // ============================================
  // CONTROL VALUE ACCESSOR
  // ============================================

  onChange: (value: number | number[] | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: number | number[] | null): void {
    this.internalValue = value;
    this.updateSelectedRecords();
  }

  registerOnChange(fn: (value: number | number[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** Validate status cho form control */
  get validateStatus(): string {
    if (!this.ngControl?.control) return '';
    const control = this.ngControl.control;
    if (control.invalid && (control.dirty || control.touched)) {
      return 'error';
    }
    return '';
  }

  // ============================================
  // PUBLIC METHODS
  // ============================================

  /**
   * Mở modal chọn tổ chức
   */
  openModal(): void {
    if (this.disabled) return;
    
    // Reset search
    this.searchText.set('');
    
    // Copy current selection to temp
    if (this.multiple) {
      const ids = Array.isArray(this.internalValue) ? this.internalValue : [];
      this.tempSelectedIds.set([...ids]);
      this.tempSelectedRecords.set([...this.selectedRecords()]);
    } else {
      const id = typeof this.internalValue === 'number' ? this.internalValue : null;
      this.tempSelectedIds.set(id ? [id] : []);
      this.tempSelectedRecords.set([...this.selectedRecords()]);
    }
    
    this.modalVisible.set(true);
  }

  /**
   * Đóng modal
   */
  closeModal(): void {
    this.modalVisible.set(false);
    this.searchText.set('');
    this.tempSelectedIds.set([]);
    this.tempSelectedRecords.set([]);
  }

  /**
   * Xử lý khi search trong modal
   */
  onSearchChange(value: string): void {
    this.searchText.set(value);
  }

  /**
   * Xử lý khi chọn tổ chức trong modal
   */
  onOrganizationSelect(record: OrganizationData): void {
    if (this.multiple) {
      // Multiple mode: toggle selection
      const currentIds = this.tempSelectedIds();
      const currentRecords = this.tempSelectedRecords();
      const index = currentIds.indexOf(record.Id);
      
      if (index > -1) {
        // Bỏ chọn
        this.tempSelectedIds.set(currentIds.filter(id => id !== record.Id));
        this.tempSelectedRecords.set(currentRecords.filter(r => r.Id !== record.Id));
      } else {
        // Thêm chọn
        this.tempSelectedIds.set([...currentIds, record.Id]);
        this.tempSelectedRecords.set([...currentRecords, record]);
      }
    } else {
      // Single mode: replace selection
      this.tempSelectedIds.set([record.Id]);
      this.tempSelectedRecords.set([record]);
    }
  }

  /**
   * Confirm selection và đóng modal
   */
  confirmSelection(): void {
    const records = this.tempSelectedRecords();
    
    if (this.multiple) {
      const ids = this.tempSelectedIds();
      this.internalValue = ids;
      this.selectedRecords.set([...records]);
      this.onChange(ids);
      this.onSelect.emit(records);
    } else {
      const id = this.tempSelectedIds()[0] || null;
      this.internalValue = id;
      this.selectedRecords.set(records.length > 0 ? [records[0]] : []);
      this.onChange(id);
      if (records.length > 0) {
        this.onSelect.emit(records[0]);
      }
    }
    
    this.onTouched();
    this.closeModal();
  }

  /**
   * Clear selection
   */
  clearSelection(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    if (this.multiple) {
      this.internalValue = [];
      this.onChange([]);
    } else {
      this.internalValue = null;
      this.onChange(null);
    }
    
    this.selectedRecords.set([]);
    this.onTouched();
    this.onClear.emit();
  }

  /**
   * Xóa một item trong multiple mode
   */
  removeItem(record: OrganizationData, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    if (!this.multiple) return;
    
    const currentIds = Array.isArray(this.internalValue) ? this.internalValue : [];
    const newIds = currentIds.filter(id => id !== record.Id);
    const newRecords = this.selectedRecords().filter(r => r.Id !== record.Id);
    
    this.internalValue = newIds;
    this.selectedRecords.set(newRecords);
    this.onChange(newIds);
    this.onTouched();
  }

  /**
   * Kiểm tra tổ chức có được chọn trong modal không
   */
  isSelected(record: OrganizationData): boolean {
    return this.tempSelectedIds().includes(record.Id);
  }

  // ============================================
  // PRIVATE METHODS
  // ============================================

  /**
   * Cập nhật selected records từ value
   */
  private updateSelectedRecords(): void {
    if (!this.data || this.data.length === 0) {
      this.selectedRecords.set([]);
      return;
    }

    const ids = this.getSelectedIds();
    const records = this.findRecordsByIds(this.data, ids);
    this.selectedRecords.set(records);
  }

  /**
   * Lấy danh sách IDs đã chọn
   */
  private getSelectedIds(): number[] {
    if (this.internalValue === null || this.internalValue === undefined) {
      return this.selectedId ? [this.selectedId] : [];
    }
    
    if (Array.isArray(this.internalValue)) {
      return this.internalValue;
    }
    
    return [this.internalValue];
  }

  /**
   * Tìm records theo IDs (recursive)
   */
  private findRecordsByIds(data: OrganizationData[], ids: number[]): OrganizationData[] {
    const result: OrganizationData[] = [];
    
    const search = (items: OrganizationData[]) => {
      for (const item of items) {
        if (ids.includes(item.Id)) {
          result.push(item);
        }
        if (item.children && item.children.length > 0) {
          search(item.children);
        }
      }
    };
    
    search(data);
    return result;
  }

  /**
   * Áp dụng filter cho data
   */
  private applyFilter(data: OrganizationData[], filter: OrganizationSelectorFilter): OrganizationData[] {
    return data
      .filter(item => {
        // Filter by loai
        if (filter.loai !== undefined && item.Loai !== filter.loai) {
          return false;
        }
        // Filter by trangThai
        if (filter.trangThai !== undefined && item.TrangThai !== filter.trangThai) {
          return false;
        }
        // Filter by tinhTrang
        if (filter.tinhTrang !== undefined && item.TinhTrang !== filter.tinhTrang) {
          return false;
        }
        // Exclude IDs
        if (filter.excludeIds && filter.excludeIds.includes(item.Id)) {
          return false;
        }
        return true;
      })
      .map(item => ({
        ...item,
        children: item.children ? this.applyFilter(item.children, filter) : undefined
      }));
  }

  /**
   * Áp dụng search cho data (recursive)
   */
  private applySearch(data: OrganizationData[], search: string): OrganizationData[] {
    const result: OrganizationData[] = [];
    
    for (const item of data) {
      const matchesSelf = 
        item.TenToChuc.toLowerCase().includes(search) ||
        item.MaToChuc.toLowerCase().includes(search);
      
      const filteredChildren = item.children 
        ? this.applySearch(item.children, search) 
        : [];
      
      if (matchesSelf || filteredChildren.length > 0) {
        result.push({
          ...item,
          children: filteredChildren.length > 0 ? filteredChildren : item.children
        });
      }
    }
    
    return result;
  }
}
