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
 * Hỗ trợ cả flat table và tree table
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
  template: `
    <nz-table
      #table
      [nzData]="displayData"
      [nzLoading]="loading"
      [nzPageSize]="pageSize"
      [nzPageIndex]="pageIndex"
      [nzTotal]="total"
      [nzFrontPagination]="frontPagination"
      [nzShowPagination]="showPagination && !isTree"
      [nzShowSizeChanger]="showSizeChanger"
      [nzPageSizeOptions]="pageSizeOptions"
      [nzSize]="size"
      [nzBordered]="bordered"
      [nzScroll]="scroll"
      (nzPageIndexChange)="onPageChange($event)"
      (nzPageSizeChange)="onPageSizeChange($event)"
      (nzQueryParams)="onQueryParamsChange($event)"
    >
      <thead>
        <tr>
          @for (column of columns; track $index) {
            <th
              [nzWidth]="column.width || null"
              [nzAlign]="column.align || 'left'"
              [nzSortFn]="column.sortable ? true : null"
            >
              {{ column.title }}
            </th>
          }
          @if (actions && actions.length > 0) {
            <th [nzWidth]="isTree ? '18%' : '15%'" nzAlign="center">Thao tác</th>
          }
        </tr>
      </thead>
      <tbody>
        @if (isTree) {
          <!-- Tree Table Mode -->
          @for (node of table.data; track node.key) {
            <tr>
              @for (column of columns; track $index; let first = $first) {
                <td 
                  [nzAlign]="column.align || 'left'" 
                  [nzIndentSize]="first ? (node.level || 0) * 20 : 0" 
                  [nzShowExpand]="first && hasChildren(node)" 
                  [(nzExpand)]="node.expand"
                  (nzExpandChange)="onExpandChange(node, $event)"
                >
                  {{ node.data[column.key] }}
                </td>
              }
              @if (actions && actions.length > 0) {
                <td nzAlign="center">
                  <div class="table-actions">
                    @for (action of actions; track $index) {
                      @if (!action.visible || action.visible(node.data)) {
                        <span nz-tooltip [nzTooltipTitle]="action.tooltipText">
                          @if (action.confirm) {
                            <button
                              nz-button
                              nzSize="small"
                              [nzType]="action.type || 'default'"
                              [nzDanger]="action.danger"
                              nz-popconfirm
                              [nzPopconfirmTitle]="action.confirmText || 'Bạn có chắc chắn?'"
                              (nzOnConfirm)="action.onClick(node.data)"
                            >
                              @if (action.icon) {
                                <span nz-icon [nzType]="action.icon"></span>
                              }
                              {{ action.label }}
                            </button>
                          } @else {
                            <button
                              nz-button
                              nzSize="small"
                              [nzType]="action.type || 'default'"
                              [nzDanger]="action.danger"
                              (click)="action.onClick(node.data)"
                            >
                              @if (action.icon) {
                                <span nz-icon [nzType]="action.icon"></span>
                              }
                              {{ action.label }}
                            </button>
                          }
                        </span>
                      }
                    }
                  </div>
                </td>
              }
            </tr>
          }
        } @else {
          <!-- Flat Table Mode -->
          @for (record of table.data; track record[rowKey]) {
            <tr>
              @for (column of columns; track $index) {
                <td [nzAlign]="column.align || 'left'">
                  @if (column.template) {
                    <ng-container
                      *ngTemplateOutlet="column.template; context: { $implicit: record }"
                    ></ng-container>
                  } @else {
                    {{ record[column.key] }}
                  }
                </td>
              }
              @if (actions && actions.length > 0) {
                <td nzAlign="center">
                  <div class="table-actions">
                    @for (action of actions; track $index) {
                      @if (!action.visible || action.visible(record)) {
                        <span nz-tooltip [nzTooltipTitle]="action.tooltipText">
                          @if (action.confirm) {
                            <button
                              nz-button
                              [nzType]="action.type || 'default'"
                              [nzDanger]="action.danger"
                              nz-popconfirm
                              [nzPopconfirmTitle]="action.confirmText || 'Bạn có chắc chắn?'"
                              (nzOnConfirm)="action.onClick(record)"
                            >
                              @if (action.icon) {
                                <span nz-icon [nzType]="action.icon"></span>
                              }
                              {{ action.label }}
                            </button>
                          } @else {
                            <button
                              nz-button
                              [nzType]="action.type || 'default'"
                              [nzDanger]="action.danger"
                              (click)="action.onClick(record)"
                            >
                              @if (action.icon) {
                                <span nz-icon [nzType]="action.icon"></span>
                              }
                              {{ action.label }}
                            </button>
                          }
                        </span>
                      }
                    }
                  </div>
                </td>
              }
            </tr>
          }
        }
      </tbody>
    </nz-table>
  `,
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
  @Input() isTree = false; // NEW: Xác định table mode
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

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() queryParamsChange = new EventEmitter<any>();

  private _data: any[] = [];
  displayData: any[] = [];

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

  // Tree table methods
  hasChildren(node: TreeTableNode): boolean {
    return !!(node.children && node.children.length > 0);
  }

  onExpandChange(node: TreeTableNode, expand: boolean): void {
    node.expand = expand;
    this.displayData = this.flattenTree(this._data as TreeTableNode[]);
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
