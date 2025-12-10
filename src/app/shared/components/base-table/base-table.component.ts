import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

export interface TableColumn {
  title: string;
  key: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  align?: 'left' | 'center' | 'right';
  template?: TemplateRef<any>;
}

export interface TableAction {
  label: string;
  icon?: string;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  danger?: boolean;
  confirm?: boolean;
  confirmText?: string;
  onClick: (record: any) => void;
  visible?: (record: any) => boolean;
}

/**
 * Base Table Component - Reusable table với pagination, sorting, actions
 */
@Component({
  selector: 'app-base-table',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzPopconfirmModule
  ],
  template: `
    <nz-table
      #table
      [nzData]="data"
      [nzLoading]="loading"
      [nzPageSize]="pageSize"
      [nzPageIndex]="pageIndex"
      [nzTotal]="total"
      [nzFrontPagination]="frontPagination"
      [nzShowPagination]="showPagination"
      [nzShowSizeChanger]="showSizeChanger"
      [nzPageSizeOptions]="pageSizeOptions"
      [nzSize]="size"
      [nzBordered]="bordered"
      (nzPageIndexChange)="onPageChange($event)"
      (nzPageSizeChange)="onPageSizeChange($event)"
      (nzQueryParams)="onQueryParamsChange($event)"
    >
      <thead>
        <tr>
          @for (column of columns; track column.key) {
            <th
              [nzWidth]="column.width || null"
              [nzAlign]="column.align || 'left'"
              [nzSortFn]="column.sortable ? true : null"
            >
              {{ column.title }}
            </th>
          }
          @if (actions && actions.length > 0) {
            <th nzWidth="150px" nzAlign="center">Thao tác</th>
          }
        </tr>
      </thead>
      <tbody>
        @for (record of table.data; track record[rowKey]) {
          <tr>
            @for (column of columns; track column.key) {
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
                  @for (action of actions; track action.label) {
                    @if (!action.visible || action.visible(record)) {
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
                    }
                  }
                </div>
              </td>
            }
          </tr>
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
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() actions: TableAction[] = [];
  @Input() loading = false;
  @Input() rowKey = 'id';
  @Input() pageSize = 10;
  @Input() pageIndex = 1;
  @Input() total = 0;
  @Input() frontPagination = true;
  @Input() showPagination = true;
  @Input() showSizeChanger = true;
  @Input() pageSizeOptions = [10, 20, 50, 100];
  @Input() size: 'small' | 'middle' | 'default' = 'default';
  @Input() bordered = false;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() queryParamsChange = new EventEmitter<any>();

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
}
