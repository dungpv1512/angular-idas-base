import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  columns: TableColumn[] = [
    { title: 'STT', key: 'Stt', width: '20%' },
    { title: 'Tên tổ chức', key: 'TenToChuc' },
    { title: 'Loại', key: 'LoaiText', width: '10%' },
    { title: 'Trạng thái', key: 'TrangThaiText', width: '12%' },
    { title: 'Người cập nhật', key: 'TenNhanSu', width: '12%' }
  ];

  actions: TableAction[] = [
    {
      label: '',
      tooltipText: 'Xem',
      icon: 'eye',
      type: 'default',
      onClick: (record: ToChuc) => this.viewDetail(record)
    },
    {
      label: '',
      tooltipText: 'Sửa',
      icon: 'edit',
      type: 'primary',
      onClick: (record: ToChuc) => this.edit(record)
    },
    {
      label: '',
      tooltipText: 'Xóa',
      icon: 'delete',
      danger: true,
      confirm: true,
      confirmText: 'Bạn có chắc muốn xóa tổ chức này?',
      onClick: (record: ToChuc) => this.delete(record)
    }
  ];

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
          LoaiText: item.Loai === 1 ? 'Trung tâm' : 'Phòng ban',
          TrangThaiText: this.getTrangThaiText(item.TrangThai)
        }));
        this.filteredData = [...this.listData];
        this.treeData = this.toChucService.convertToTreeData(response.Data);
        this.treeTableData = this.toChucService.convertToTreeTableData(response.Data);
        this.loading = false;
      },
      error: (error) => {
        this.message.error('Không thể tải dữ liệu');
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
      1: 'Nháp',
      2: 'Đang hoạt động',
      3: 'Tạm dừng',
      4: 'Đã duyệt',
      5: 'Đã hủy'
    };
    return statusMap[status] || 'Không xác định';
  }

  openCreateDrawer(): void {
    this.drawerMode = 'create';
    this.drawerTitle = 'Thêm mới tổ chức';
    this.selectedToChuc = null;
    this.drawerVisible = true;
  }

  viewDetail(record: ToChuc): void {
    this.selectedToChuc = record;
    this.drawerMode = 'view';
    this.drawerTitle = 'Chi tiết tổ chức';
    this.drawerVisible = true;
  }

  edit(record: ToChuc): void {
    this.selectedToChuc = record;
    this.drawerMode = 'edit';
    this.drawerTitle = 'Chỉnh sửa tổ chức';
    this.drawerVisible = true;
  }

  delete(record: ToChuc): void {
    this.toChucService.delete(record.Id).subscribe({
      next: () => {
        this.message.success('Xóa thành công');
        this.loadData();
      },
      error: (error) => {
        this.message.error('Xóa thất bại');
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
        this.message.success(this.drawerMode === 'create' ? 'Thêm mới thành công' : 'Cập nhật thành công');
        this.drawerVisible = false;
        this.loadData();
      },
      error: (error) => {
        this.message.error('Có lỗi xảy ra');
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
    if (!idToChucCapTren) return 'Không có';
    const parent = this.listData.find(item => item.Id === idToChucCapTren);
    return parent?.TenToChuc || 'Không xác định';
  }
}
