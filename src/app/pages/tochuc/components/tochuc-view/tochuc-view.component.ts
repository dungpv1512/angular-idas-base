import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ToChuc } from '@app/core/services/tochuc.service';

@Component({
  selector: 'app-tochuc-view',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzSpaceModule,
    NzDividerModule,
    NzDescriptionsModule,
    NzTagModule,
    NzIconModule
  ],
  templateUrl: './tochuc-view.component.html',
  styleUrls: ['./tochuc-view.component.less']
})
export class ToChucViewComponent {
  @Input() toChuc: ToChuc | null = null;
  @Input() parentName = '';

  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<ToChuc>();

  onClose(): void {
    this.close.emit();
  }

  onEdit(): void {
    if (this.toChuc) {
      this.edit.emit(this.toChuc);
    }
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
}
