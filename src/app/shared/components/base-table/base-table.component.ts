import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { TableColumn, TableAction } from '@app/shared/types/table.types';

export interface TreeTableNode {
  key: string;
  title: string;
  data: any;
  children?: TreeTableNode[];
  expand?: boolean;
  level?: number;
  parent?: TreeTableNode;
  [key: string]: any;
}

/**
 * Base Table Component - Reusable table với pagination, sorting, actions
 * Hỗ trợ cả flat table, tree table và virtual scroll
 */
@Component({
  selector: 'app-base-table',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzPopconfirmModule,
    NzTooltipModule,
    TranslateModule
  ],
  templateUrl: './base-table.component.html',
  styles: [
    `
      .table-actions {
        display: flex;
        gap: 8px;
        justify-content: center;
        flex-wrap: wrap;
      }
    `
  ]
})
export class BaseTableComponent implements OnInit, OnChanges {
  @Input() set data(value: any[]) {
    this._data = value;
    if (this.isTree) {
      this.displayData = this.flattenTree(value as TreeTableNode[]);
    } else {
      this.displayData = value;
    }
  }
  get data(): any[] {
    return this._data;
  }

  @Input() columns: TableColumn[] = [];
  @Input() actions: TableAction[] = [];
  @Input() loading = false;
  @Input() rowKey = 'Id';
  @Input() isTree = false;
  @Input() pageSize = 10;
  @Input() pageIndex = 1;
  @Input() total = 0;
  @Input() frontPagination = true;
  @Input() showPagination = true;
  @Input() showSizeChanger = true;
  @Input() pageSizeOptions = [10, 20, 50, 100];
  @Input() size: 'small' | 'middle' | 'default' = 'default';
  @Input() bordered = false;
  @Input() scroll: { x?: string; y?: string } = {};
  @Input() virtualScroll = false;
  @Input() virtualItemSize = 54;
  @Input() checkable = false; // Enable checkbox selection
  @Input() multiple = true; // Allow multiple selection
  @Input() checkedKeys: string[] = []; // Pre-checked keys
  @Input() actionsColumnTitle = 'common.actions'; // Translation key for actions column
  @Input() defaultConfirmText = 'common.confirmDelete'; // Translation key for confirm text

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() queryParamsChange = new EventEmitter<any>();
  @Output() checkChange = new EventEmitter<{ keys: string[]; records: any[] }>(); // Emit checked items

  private _data: any[] = [];
  displayData: any[] = [];
  setOfCheckedId = new Set<string>();

  trackByIndex = (index: number, data: any): number => data[this.rowKey];

  ngOnInit(): void {
    this.initializeCheckedIds();
  }

  ngOnChanges(): void {
    this.initializeCheckedIds();
  }

  /**
   * Initialize checked IDs from checkedKeys
   */
  private initializeCheckedIds(): void {
    if (this.checkedKeys && this.checkedKeys.length > 0) {
      this.setOfCheckedId = new Set(this.checkedKeys);
    }
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
    this.pageChange.emit(page);
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageSizeChange.emit(size);
  }

  onQueryParamsChange(params: any): void {
    this.queryParamsChange.emit(params);
  }

  hasChildren(node: TreeTableNode): boolean {
    return !!(node.children && node.children.length > 0);
  }

  onExpandChange(node: TreeTableNode, expand: boolean): void {
    node.expand = expand;
    const flattened = this.flattenTree(this._data as TreeTableNode[]);
    // Create new array reference to trigger change detection for virtual scroll
    this.displayData = [...flattened];
    
    // Force nz-table to re-render virtual scroll
    if (this.virtualScroll) {
      // Trigger change detection by reassigning
      setTimeout(() => {
        this.displayData = [...this.displayData];
      }, 0);
    }
  }

  private flattenTree(nodes: TreeTableNode[], level = 0): TreeTableNode[] {
    const result: TreeTableNode[] = [];

    nodes.forEach(node => {
      node.level = level;
      result.push(node);

      if (node.expand && node.children && node.children.length > 0) {
        result.push(...this.flattenTree(node.children, level + 1));
      }
    });

    return result;
  }

  /**
   * Handle checkbox change for single item
   */
  onItemChecked(record: any, checked: boolean): void {
    const key = String(record[this.rowKey]);
    
    if (checked) {
      if (this.multiple) {
        this.setOfCheckedId.add(key);
      } else {
        this.setOfCheckedId.clear();
        this.setOfCheckedId.add(key);
      }
    } else {
      this.setOfCheckedId.delete(key);
    }
    
    this.emitCheckChange();
  }

  /**
   * Handle check all
   */
  onAllChecked(checked: boolean): void {
    if (!this.multiple) return;

    const dataToCheck = this.isTree 
      ? this.displayData.map((node: TreeTableNode) => node.data)
      : this.displayData;

    dataToCheck.forEach((record: any) => {
      const key = String(record[this.rowKey]);
      if (checked) {
        this.setOfCheckedId.add(key);
      } else {
        this.setOfCheckedId.delete(key);
      }
    });
    
    this.emitCheckChange();
  }

  /**
   * Check if all items are checked
   */
  get isAllChecked(): boolean {
    const dataToCheck = this.isTree 
      ? this.displayData.map((node: TreeTableNode) => node.data)
      : this.displayData;
    
    return dataToCheck.length > 0 && 
           dataToCheck.every((record: any) => 
             this.setOfCheckedId.has(String(record[this.rowKey]))
           );
  }

  /**
   * Check if some items are checked (indeterminate state)
   */
  get isIndeterminate(): boolean {
    const dataToCheck = this.isTree 
      ? this.displayData.map((node: TreeTableNode) => node.data)
      : this.displayData;
    
    const checkedCount = dataToCheck.filter((record: any) => 
      this.setOfCheckedId.has(String(record[this.rowKey]))
    ).length;
    
    return checkedCount > 0 && checkedCount < dataToCheck.length;
  }

  /**
   * Check if item is checked
   */
  isItemChecked(record: any): boolean {
    return this.setOfCheckedId.has(String(record[this.rowKey]));
  }

  /**
   * Emit check change event
   */
  private emitCheckChange(): void {
    const keys = Array.from(this.setOfCheckedId);
    
    // Get actual records
    const allRecords = this.isTree 
      ? this.displayData.map((node: TreeTableNode) => node.data)
      : this.displayData;
    
    const records = allRecords.filter((record: any) => 
      this.setOfCheckedId.has(String(record[this.rowKey]))
    );
    
    this.checkChange.emit({ keys, records });
  }
}
