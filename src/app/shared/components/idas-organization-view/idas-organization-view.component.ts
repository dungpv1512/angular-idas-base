import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  computed,
  signal,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

import { IdasTableComponent } from '../idas-table/idas-table.component';
import { IdasSegmentedComponent, SegmentedOption } from '../idas-segmented/idas-segmented.component';
import { TableColumn, TableAction } from '@app/shared/types/table.types';
import { TreeTableNode } from '@app/shared/components/types/tree-table-node.model';
import {
  OrganizationViewData,
  OrganizationViewActionEvent,
  OrganizationViewCheckEvent
} from '@app/shared/components/types/organization-view.model';
import { I18N_COMMON, I18N_TOCHUC, ICON_VIEW, ToChucViewMode, VIEW_MODE } from '@app/shared/constants';

// Re-export types để backward compatible
export type OrganizationData = OrganizationViewData;
export type OrganizationActionEvent = OrganizationViewActionEvent;
export type OrganizationCheckEvent = OrganizationViewCheckEvent;

/**
 * IDAS Organization View Component
 * Shared component hiển thị tổ chức dạng List (TreeGrid) hoặc Org Chart
 * 
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7
 */
@Component({
  selector: 'app-idas-organization-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NzIconModule,
    NzEmptyModule,
    NzSpinModule,
    NzPopoverModule,
    NzAvatarModule,
    IdasTableComponent,
    IdasSegmentedComponent
  ],
  templateUrl: './idas-organization-view.component.html',
  styleUrl: './idas-organization-view.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasOrganizationViewComponent implements OnChanges {
  // ============================================
  // INPUTS
  // ============================================

  /** Dữ liệu tổ chức dạng tree */
  @Input() data: OrganizationData[] = [];

  /** Chế độ xem: list hoặc orgchart */
  @Input() viewMode: ToChucViewMode = VIEW_MODE.LIST;

  /** Cấu hình cột cho TreeGrid */
  @Input() columns: TableColumn[] = [];

  /** Các action buttons */
  @Input() actions: TableAction[] = [];

  /** Trạng thái loading */
  @Input() loading = false;

  /** ID của tổ chức đang được chọn */
  @Input() selectedId: number | null = null;

  /** Hiển thị toggle chuyển đổi view mode */
  @Input() showViewModeToggle = true;

  /** Expand tất cả nodes */
  @Input() expandAll = false;

  /** Cho phép checkbox selection */
  @Input() checkable = false;

  /** Các keys đã được check */
  @Input() checkedKeys: string[] = [];

  /** Row key để identify record */
  @Input() rowKey = 'Id';

  // ============================================
  // OUTPUTS
  // ============================================

  /** Event khi click chọn tổ chức */
  @Output() onSelect = new EventEmitter<OrganizationData>();

  /** Event khi double-click xem chi tiết */
  @Output() onDetail = new EventEmitter<OrganizationData>();

  /** Event khi thực hiện action */
  @Output() onAction = new EventEmitter<OrganizationActionEvent>();

  /** Event khi thay đổi view mode */
  @Output() viewModeChange = new EventEmitter<ToChucViewMode>();

  /** Event khi checkbox thay đổi */
  @Output() checkChange = new EventEmitter<OrganizationCheckEvent>();

  // ============================================
  // INTERNAL STATE
  // ============================================

  /** i18n keys */
  readonly i18n = I18N_TOCHUC;
  readonly i18nCommon = I18N_COMMON;

  /** View mode constants */
  readonly VIEW_MODE = VIEW_MODE;

  /** Icon constants */
  readonly ICON_VIEW = ICON_VIEW;

  /** View mode options cho segmented control */
  readonly viewModeOptions: SegmentedOption[] = [
    { value: VIEW_MODE.LIST, label: this.i18n.LIST, icon: ICON_VIEW.LIST },
    { value: VIEW_MODE.ORG_CHART, label: this.i18n.ORG_CHART, icon: ICON_VIEW.ORG_CHART }
  ];

  /** Signal cho tree data đã được flatten */
  private readonly treeDataSignal = signal<TreeTableNode[]>([]);

  /** Computed tree data cho table */
  readonly treeData = computed(() => this.treeDataSignal());

  /** Computed org chart data - chỉ hiển thị tổ chức có TrangThai = BanHanh (2) */
  readonly orgChartData = computed(() => {
    return this.filterOrgChartData(this.data);
  });

  // ============================================
  // LIFECYCLE
  // ============================================

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['expandAll']) {
      this.buildTreeData();
    }
  }

  // ============================================
  // PUBLIC METHODS
  // ============================================

  /**
   * Xử lý khi thay đổi view mode
   */
  onViewModeChange(mode: string | number): void {
    const newMode = mode as ToChucViewMode;
    this.viewModeChange.emit(newMode);
  }

  /**
   * Xử lý khi click vào row trong table
   */
  onRowClick(record: OrganizationData): void {
    this.onSelect.emit(record);
  }

  /**
   * Xử lý khi double-click vào row trong table
   */
  onRowDoubleClick(record: OrganizationData): void {
    this.onDetail.emit(record);
  }

  /**
   * Xử lý khi click vào node trong org chart
   */
  onOrgChartNodeClick(node: OrganizationData): void {
    this.onSelect.emit(node);
  }

  /**
   * Xử lý khi double-click vào node trong org chart
   */
  onOrgChartNodeDoubleClick(node: OrganizationData): void {
    this.onDetail.emit(node);
  }

  /**
   * Xử lý khi checkbox thay đổi
   */
  onCheckChange(event: { keys: string[]; records: any[] }): void {
    this.checkChange.emit({
      keys: event.keys,
      records: event.records as OrganizationData[]
    });
  }

  /**
   * Kiểm tra node có được chọn không
   */
  isNodeSelected(node: OrganizationData): boolean {
    return this.selectedId === node.Id;
  }

  /**
   * Lấy initials từ tên nhân sự
   */
  getInitials(name: string | null | undefined): string {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  /**
   * Kiểm tra node có children không
   */
  hasChildren(node: OrganizationData): boolean {
    return !!(node.children && node.children.length > 0);
  }

  // ============================================
  // PRIVATE METHODS
  // ============================================

  /**
   * Build tree data từ flat data
   */
  private buildTreeData(): void {
    const treeNodes = this.convertToTreeNodes(this.data, this.expandAll);
    this.treeDataSignal.set(treeNodes);
  }

  /**
   * Convert OrganizationData[] sang TreeTableNode[]
   */
  private convertToTreeNodes(data: OrganizationData[], expandAll: boolean, level = 0): TreeTableNode[] {
    return data.map(item => ({
      key: String(item.Id),
      title: item.TenToChuc,
      data: item,
      level,
      expand: expandAll,
      children: item.children
        ? this.convertToTreeNodes(item.children, expandAll, level + 1)
        : undefined
    }));
  }

  /**
   * Filter data cho Org Chart - chỉ hiển thị TrangThai = BanHanh (2)
   * Requirement 10.2
   */
  private filterOrgChartData(data: OrganizationData[]): OrganizationData[] {
    return data
      .filter(item => item.TrangThai === 2) // BanHanh = 2
      .map(item => ({
        ...item,
        children: item.children ? this.filterOrgChartData(item.children) : undefined
      }));
  }
}
