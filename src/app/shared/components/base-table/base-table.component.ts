import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
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
    NzTooltipModule
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
export class BaseTableComponent {
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

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() queryParamsChange = new EventEmitter<any>();

  private _data: any[] = [];
  displayData: any[] = [];

  trackByIndex = (index: number, data: any): number => data[this.rowKey];

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
}
