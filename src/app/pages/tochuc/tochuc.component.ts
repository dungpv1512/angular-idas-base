import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { BaseTableComponent, TableColumn, TableAction } from '@app/shared/components/base-table/base-table.component';
import { BaseTreeComponent } from '@app/shared/components/base-tree/base-tree.component';
import { BaseInputComponent } from '@app/shared/components/base-input/base-input.component';
import { BaseSelectComponent, SelectOption } from '@app/shared/components/base-select/base-select.component';
import { BaseTextareaComponent } from '@app/shared/components/base-textarea/base-textarea.component';
import { BaseTreeSelectComponent } from '@app/shared/components/base-tree-select/base-tree-select.component';
import { ToChucService, ToChuc } from '@app/core/services/tochuc.service';

@Component({
  selector: 'app-tochuc',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzDrawerModule,
    NzSpaceModule,
    NzDividerModule,
    NzDescriptionsModule,
    NzTagModule,
    NzCardModule,
    NzGridModule,
    NzFormModule,
    NzIconModule,
    NzModalModule,
    BaseTableComponent,
    BaseTreeComponent,
    BaseInputComponent,
    BaseSelectComponent,
    BaseTextareaComponent,
    BaseTreeSelectComponent
  ],
  templateUrl: './tochuc.component.html',
  styleUrls: ['./tochuc.component.less']
})
export class ToChucComponent implements OnInit {
  private fb = inject(FormBuilder);
  private toChucService = inject(ToChucService);
  private message = inject(NzMessageService);
  private modal = inject(NzModalService);

  // Data
  listData: ToChuc[] = [];
  treeData: any[] = [];
  filteredData: ToChuc[] = [];
  selectedToChuc: ToChuc | null = null;
  
  // UI State
  loading = false;
  drawerVisible = false;
  drawerMode: 'create' | 'edit' | 'view' = 'view';
  drawerTitle = '';
  viewMode: 'table' | 'tree' = 'table';

  // Form
  form!: FormGroup;

  // Table config
  columns: TableColumn[] = [
    { title: 'STT', key: 'Stt', width: '80px', sortable: true },
    { title: 'Mã tổ chức', key: 'MaToChuc', width: '150px', sortable: true },
    { title: 'Tên tổ chức', key: 'TenToChuc', sortable: true },
    { title: 'Loại', key: 'LoaiText', width: '120px' },
    { title: 'Trạng thái', key: 'TrangThaiText', width: '120px' },
    { title: 'Người cập nhật', key: 'TenNhanSu', width: '150px' }
  ];

  actions: TableAction[] = [
    {
      label: 'Xem',
      icon: 'eye',
      type: 'default',
      onClick: (record: ToChuc) => this.viewDetail(record)
    },
    {
      label: 'Sửa',
      icon: 'edit',
      type: 'primary',
      onClick: (record: ToChuc) => this.edit(record)
    },
    {
      label: 'Xóa',
      icon: 'delete',
      danger: true,
      confirm: true,
      confirmText: 'Bạn có chắc muốn xóa tổ chức này?',
      onClick: (record: ToChuc) => this.delete(record)
    }
  ];

  // Options
  loaiOptions: SelectOption[] = [
    { label: 'Trung tâm', value: 1 },
    { label: 'Phòng ban', value: 2 }
  ];

  trangThaiOptions: SelectOption[] = [
    { label: 'Nháp', value: 1 },
    { label: 'Đang hoạt động', value: 2 },
    { label: 'Tạm dừng', value: 3 },
    { label: 'Đã duyệt', value: 4 },
    { label: 'Đã hủy', value: 5 }
  ];

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.form = this.fb.group({
      Id: [null],
      TenToChuc: ['', [Validators.required, Validators.maxLength(200)]],
      MaToChuc: ['', [Validators.required, Validators.maxLength(50)]],
      IdToChucCapTren: [null],
      Loai: [1, Validators.required],
      TrangThai: [2, Validators.required],
      NoiDungChucNangNhiemVus: ['']
    });
  }

  loadData(): void {
    this.loading = true;
    this.toChucService.getList().subscribe({
      next: (response) => {
        this.listData = response.Data.map(item => ({
          ...item,
          LoaiText: this.getLoaiText(item.Loai),
          TrangThaiText: this.getTrangThaiText(item.TrangThai)
        }));
        this.filteredData = [...this.listData];
        this.treeData = this.toChucService.convertToTreeData(response.Data);
        this.loading = false;
      },
      error: (error) => {
        this.message.error('Không thể tải dữ liệu');
        console.error(error);
        this.loading = false;
      }
    });
  }

  openCreateDrawer(): void {
    this.drawerMode = 'create';
    this.drawerTitle = 'Thêm mới tổ chức';
    this.form.reset({ Loai: 1, TrangThai: 2 });
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
    
    this.form.patchValue({
      Id: record.Id,
      TenToChuc: record.TenToChuc,
      MaToChuc: record.MaToChuc,
      IdToChucCapTren: record.IdToChucCapTren,
      Loai: record.Loai,
      TrangThai: record.TrangThai,
      NoiDungChucNangNhiemVus: record.NoiDungChucNangNhiemVus?.join('\n') || ''
    });
    
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

  onSubmit(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    const formData = this.form.value;
    
    // Convert NoiDungChucNangNhiemVus từ string sang array
    if (formData.NoiDungChucNangNhiemVus) {
      formData.NoiDungChucNangNhiemVus = formData.NoiDungChucNangNhiemVus
        .split('\n')
        .filter((line: string) => line.trim());
    }

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
    this.form.reset();
    this.selectedToChuc = null;
  }

  onTreeNodeClick(event: any): void {
    const toChuc = this.listData.find(item => item.Id === Number(event.node.key));
    if (toChuc) {
      this.viewDetail(toChuc);
    }
  }

  onTreeCheck(event: any): void {
    console.log('Checked nodes:', event.checkedKeys);
  }

  switchView(mode: 'table' | 'tree'): void {
    this.viewMode = mode;
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

  getTrangThaiColor(status: number): string {
    const colorMap: { [key: number]: string } = {
      1: 'default',
      2: 'success',
      3: 'warning',
      4: 'processing',
      5: 'error'
    };
    return colorMap[status] || 'default';
  }

  getLoaiText(loai: number): string {
    return loai === 1 ? 'Trung tâm' : 'Phòng ban';
  }

  getParentName(idToChucCapTren: number | null): string {
    if (!idToChucCapTren) return 'Không có';
    const parent = this.listData.find(item => item.Id === idToChucCapTren);
    return parent?.TenToChuc || 'Không xác định';
  }
}
