import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BaseTableComponent } from '@app/shared/components/base-table/base-table.component';
import { BaseTreeComponent } from '@app/shared/components/base-tree/base-tree.component';
import { TableColumn, TableAction } from '@app/shared/types/table.types';
import { ToChuc } from '@app/core/services/tochuc.service';

@Component({
  selector: 'app-tochuc-list',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzSpaceModule,
    NzCardModule,
    NzIconModule,
    BaseTableComponent,
    BaseTreeComponent
  ],
  templateUrl: './tochuc-list.component.html',
  styleUrls: ['./tochuc-list.component.less']
})
export class ToChucListComponent {
  @Input() viewMode: 'table' | 'tree' = 'table';
  @Input() treeTableData: any[] = [];
  @Input() treeData: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() actions: TableAction[] = [];
  @Input() loading = false;

  @Output() viewModeChange = new EventEmitter<'table' | 'tree'>();
  @Output() createClick = new EventEmitter<void>();
  @Output() treeNodeClick = new EventEmitter<any>();

  switchView(mode: 'table' | 'tree'): void {
    this.viewModeChange.emit(mode);
  }

  onCreateClick(): void {
    this.createClick.emit();
  }

  onTreeNodeClick(event: any): void {
    this.treeNodeClick.emit(event);
  }
}
