import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { TableColumn, TableAction } from '@app/shared/types/table.types';
import { ToChucService, ToChuc } from '@app/core/services/tochuc.service';
import { ToChucListComponent } from './components/tochuc-list/tochuc-list.component';
import { ToChucViewComponent } from './components/tochuc-view/tochuc-view.component';
import { ToChucFormComponent } from './components/tochuc-form/tochuc-form.component';
import { buildApiFilterMultiValue } from '@app/shared/utils/filter.utils';

@Component({
  selector: 'app-tochuc',
  standalone: true,
  imports: [
    CommonModule,
    NzDrawerModule,
    TranslateModule,
    ToChucListComponent,
    ToChucViewComponent,
    ToChucFormComponent
  ],
  templateUrl: './tochuc.component.html',
  styleUrls: ['./tochuc.component.less']
})
export class ToChucComponent implements OnInit {
  private toChucService = inject(ToChucService);
  private message = inject(NzMessageService);
  private translate = inject(TranslateService);

  // Data
  listData: ToChuc[] = [];
  treeData: any[] = [];
  treeTableData: any[] = [];
  filteredData: ToChuc[] = [];
  selectedToChuc: ToChuc | null = null;
  
  // UI State
  loading = false;
  drawerVisible = false;
  drawerMode: 'create' | 'edit' | 'view' = 'view';
  drawerTitle = '';
  viewMode: 'table' | 'tree' = 'table';

  // Search config
  searchFields = ['TenToChuc', 'MaToChuc', 'Stt']; // Các field để search với OR condition

  // Table config
  get columns(): TableColumn[] {
    return [
      { title: this.translate.instant('tochuc.columns.stt'), key: 'Stt', width: '20%' },
      { title: this.translate.instant('tochuc.columns.name'), key: 'TenToChuc' },
      { title: this.translate.instant('tochuc.columns.type'), key: 'LoaiText', width: '10%' },
      { title: this.translate.instant('tochuc.columns.status'), key: 'TrangThaiText', width: '12%' },
      { title: this.translate.instant('tochuc.columns.updatedBy'), key: 'TenNhanSu', width: '12%' }
    ];
  }

  get actions(): TableAction[] {
    return [
      {
        label: '',
        tooltipText: this.translate.instant('tochuc.actions.view'),
        icon: 'eye',
        type: 'default',
        onClick: (record: ToChuc) => this.viewDetail(record)
      },
      {
        label: '',
        tooltipText: this.translate.instant('tochuc.actions.edit'),
        icon: 'edit',
        type: 'primary',
        onClick: (record: ToChuc) => this.edit(record)
      },
      {
        label: '',
        tooltipText: this.translate.instant('tochuc.actions.delete'),
        icon: 'delete',
        danger: true,
        confirm: true,
        confirmText: this.translate.instant('tochuc.messages.deleteConfirm'),
        onClick: (record: ToChuc) => this.delete(record)
      }
    ];
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(searchTags?: string[]): void {
    this.loading = true;
    
    // Build filter với helper function (multi-value)
    const apiFilter = buildApiFilterMultiValue(
      searchTags && searchTags.length > 0 ? searchTags : undefined,
      this.searchFields,
      [{ field: 'TrangThai', operator: 'notinlist', value: [6, 8, 9] }]
    );

    const filter: any = {
      all: true,
      UseCache: false
    };

    if (apiFilter) {
      filter.filter = apiFilter;
    }

    this.toChucService.getList(filter).subscribe({
      next: (response) => {
        this.listData = response.Data.map(item => ({
          ...item,
          LoaiText: this.translate.instant(item.Loai === 1 ? 'tochuc.type.center' : 'tochuc.type.department'),
          TrangThaiText: this.getTrangThaiText(item.TrangThai)
        }));
        this.filteredData = [...this.listData];
        this.treeData = this.toChucService.convertToTreeData(response.Data);
        this.treeTableData = this.toChucService.convertToTreeTableData(response.Data);
        this.loading = false;
      },
      error: (error) => {
        this.message.error(this.translate.instant('tochuc.messages.loadError'));
        console.error(error);
        this.loading = false;
      }
    });
  }

  onSearchTagsChange(tags: string[]): void {
    this.loadData(tags);
  }

  getTrangThaiText(status: number): string {
    const statusMap: { [key: number]: string } = {
      1: this.translate.instant('tochuc.status.draft'),
      2: this.translate.instant('tochuc.status.active'),
      3: this.translate.instant('tochuc.status.paused'),
      4: this.translate.instant('tochuc.status.approved'),
      5: this.translate.instant('tochuc.status.cancelled')
    };
    return statusMap[status] || this.translate.instant('common.unknown');
  }

  openCreateDrawer(): void {
    this.drawerMode = 'create';
    this.drawerTitle = this.translate.instant('tochuc.drawer.create');
    this.selectedToChuc = null;
    this.drawerVisible = true;
  }

  viewDetail(record: ToChuc): void {
    this.selectedToChuc = record;
    this.drawerMode = 'view';
    this.drawerTitle = this.translate.instant('tochuc.drawer.view');
    this.drawerVisible = true;
  }

  edit(record: ToChuc): void {
    this.selectedToChuc = record;
    this.drawerMode = 'edit';
    this.drawerTitle = this.translate.instant('tochuc.drawer.edit');
    this.drawerVisible = true;
  }

  delete(record: ToChuc): void {
    this.toChucService.delete(record.Id).subscribe({
      next: () => {
        this.message.success(this.translate.instant('tochuc.messages.deleteSuccess'));
        this.loadData();
      },
      error: (error) => {
        this.message.error(this.translate.instant('tochuc.messages.deleteError'));
        console.error(error);
      }
    });
  }

  onFormSubmit(formData: any): void {
    const request$ = this.drawerMode === 'create'
      ? this.toChucService.create(formData)
      : this.toChucService.update(formData.Id, formData);

    request$.subscribe({
      next: () => {
        const messageKey = this.drawerMode === 'create' 
          ? 'tochuc.messages.createSuccess' 
          : 'tochuc.messages.updateSuccess';
        this.message.success(this.translate.instant(messageKey));
        this.drawerVisible = false;
        this.loadData();
      },
      error: (error) => {
        this.message.error(this.translate.instant('tochuc.messages.saveError'));
        console.error(error);
      }
    });
  }

  onDrawerClose(): void {
    this.drawerVisible = false;
    this.selectedToChuc = null;
  }

  onTreeNodeClick(event: any): void {
    const toChuc = this.listData.find(item => item.Id === Number(event.node.key));
    if (toChuc) {
      this.viewDetail(toChuc);
    }
  }

  switchView(mode: 'table' | 'tree'): void {
    this.viewMode = mode;
  }

  getParentName(idToChucCapTren: number | null): string {
    if (!idToChucCapTren) return this.translate.instant('common.none');
    const parent = this.listData.find(item => item.Id === idToChucCapTren);
    return parent?.TenToChuc || this.translate.instant('common.unknown');
  }
}
