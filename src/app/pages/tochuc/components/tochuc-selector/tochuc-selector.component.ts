import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, Inject, Optional, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ToChucListComponent } from '../tochuc-list/tochuc-list.component';
import { TableColumn } from '@app/shared/types/table.types';
import { ToChuc, ToChucService } from '@app/core/services/tochuc.service';

/**
 * ToChuc Selector Component
 * Component chọn tổ chức với checkbox selection
 * Wrap ToChucListComponent và thêm:
 * - Checkbox selection
 * - Ẩn cột thao tác
 * - Ẩn nút "Thêm mới"
 * - Emit selected items
 * - Hiển thị số lượng đã chọn
 */
@Component({
  selector: 'app-tochuc-selector',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzSpaceModule,
    ToChucListComponent
  ],
  templateUrl: './tochuc-selector.component.html',
  styleUrls: ['./tochuc-selector.component.less']
})
export class ToChucSelectorComponent implements OnInit, OnChanges {
  private toChucService = inject(ToChucService);
  private message = inject(NzMessageService);

  @Input() viewMode: 'table' | 'tree' = 'table';
  @Input() title = 'Chọn Tổ chức';
  @Input() subtitle = 'Chọn một hoặc nhiều tổ chức';
  @Input() multiple = true; // Cho phép chọn nhiều
  @Input() selectedIds: number[] = []; // IDs đã chọn từ bên ngoài
  @Input() scroll: { x?: string; y?: string } = { y: 'calc(-445px + 100vh)' };
  @Input() autoLoad = true; // Tự động load data khi init

  @Output() viewModeChange = new EventEmitter<'table' | 'tree'>();
  @Output() selectionChange = new EventEmitter<ToChuc[]>();
  @Output() searchTagsChange = new EventEmitter<string[]>();

  // Data
  treeTableData: any[] = [];
  treeData: any[] = [];
  loading = false;

  // Config
  columns: TableColumn[] = [
    { key: 'MaToChuc', title: 'Mã tổ chức', width: '150px' },
    { key: 'TenToChuc', title: 'Tên tổ chức', width: '300px' },
    { key: 'Stt', title: 'STT', width: '100px', align: 'center' }
  ];
  searchFields = ['MaToChuc', 'TenToChuc'];

  // Selection state
  checkedKeys: string[] = []; // For tree view
  selectedItems: ToChuc[] = [];

  constructor(
    @Optional() @Inject(NZ_MODAL_DATA) private modalData: any
  ) {
    // Nếu được mở từ modal, override các config từ modalData
    if (this.modalData) {
      this.viewMode = this.modalData.viewMode || this.viewMode;
      this.title = this.modalData.title || this.title;
      this.subtitle = this.modalData.subtitle || this.subtitle;
      this.multiple = this.modalData.multiple !== undefined ? this.modalData.multiple : this.multiple;
      this.selectedIds = this.modalData.selectedIds || this.selectedIds;
      this.scroll = this.modalData.scroll || this.scroll;
      this.autoLoad = this.modalData.autoLoad !== undefined ? this.modalData.autoLoad : this.autoLoad;
      
      // Override columns nếu có
      if (this.modalData.columns) {
        this.columns = this.modalData.columns;
      }
      // Override searchFields nếu có
      if (this.modalData.searchFields) {
        this.searchFields = this.modalData.searchFields;
      }
    }
  }

  ngOnInit(): void {
    if (this.autoLoad) {
      this.loadData();
    }
    this.initializeSelection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedIds']) {
      this.initializeSelection();
    }
  }

  /**
   * Khởi tạo selection từ selectedIds
   */
  private initializeSelection(): void {
    if (this.selectedIds && this.selectedIds.length > 0) {
      this.checkedKeys = this.selectedIds.map(id => id.toString());
      this.updateSelectedItems();
    }
  }

  /**
   * Handle checkbox change từ ToChucListComponent
   */
  onCheckChange(event: any): void {
    const checkedKeys = event.keys || [];
    this.checkedKeys = checkedKeys;
    this.updateSelectedItems();
  }

  /**
   * Update selected items và emit event
   */
  private updateSelectedItems(): void {
    // Find selected items from tree data
    this.selectedItems = this.findSelectedItemsInTree(this.treeData, this.checkedKeys);
    
    // If not found in tree, try table data
    if (this.selectedItems.length === 0 && this.treeTableData.length > 0) {
      this.selectedItems = this.findSelectedItemsInTree(this.treeTableData, this.checkedKeys);
    }
    
    this.selectionChange.emit(this.selectedItems);
  }

  /**
   * Recursively find selected items in tree
   */
  private findSelectedItemsInTree(nodes: any[], checkedKeys: string[]): ToChuc[] {
    const result: ToChuc[] = [];
    const keySet = new Set(checkedKeys);
    
    const traverse = (nodeList: any[]) => {
      nodeList.forEach(node => {
        if (keySet.has(node.key)) {
          result.push(node.data);
        }
        if (node.children && node.children.length > 0) {
          traverse(node.children);
        }
      });
    };

    traverse(nodes);
    return result;
  }

  /**
   * Handle view mode change
   */
  onViewModeChange(mode: 'table' | 'tree'): void {
    this.viewMode = mode;
    this.viewModeChange.emit(mode);
  }

  /**
   * Clear all selections
   */
  clearSelection(): void {
    this.checkedKeys = [];
    this.selectedItems = [];
    this.selectionChange.emit([]);
  }

  /**
   * Get selected count
   */
  get selectedCount(): number {
    return this.checkedKeys.length;
  }

  /**
   * Load data từ API
   */
  loadData(searchTags?: string[]): void {
    this.loading = true;

    const filter: any = {
      all: true,
      UseCache: false,
      filter: {
        logic: 'and',
        filters: [
          {
            logic: 'and',
            filters: [
              { field: 'TrangThai', operator: 'notinlist', value: [6, 8, 9] }
            ]
          }
        ]
      }
    };

    // Add search filter if provided
    if (searchTags && searchTags.length > 0) {
      const searchFilters = searchTags.map(tag => ({
        logic: 'or',
        filters: this.searchFields.map(field => ({
          field,
          operator: 'contains',
          value: tag
        }))
      }));
      filter.filter.filters.push(...searchFilters);
    }

    this.toChucService.getList(filter).subscribe({
      next: (response) => {
        const data = response.Data || [];
        this.treeTableData = this.toChucService.convertToTreeTableData(data);
        this.treeData = this.toChucService.convertToTreeData(data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.message.error('Không thể tải dữ liệu tổ chức');
        this.loading = false;
      }
    });
  }

  /**
   * Handle search tags change và reload data
   */
  onSearchTagsChange(tags: string[]): void {
    this.searchTagsChange.emit(tags);
    if (this.autoLoad) {
      this.loadData(tags);
    }
  }
}
