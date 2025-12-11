import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseTableComponent } from '@app/shared/components/base-table/base-table.component';
import { TableColumn } from '@app/shared/types/table.types';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface User {
  Id: number;
  Name: string;
  Email: string;
  Phone: string;
  Address: string;
  Age: number;
  Department: string;
  Position: string;
  Salary: number;
  JoinDate: string;
}

/**
 * Virtual Table Demo Component - Demo virtual scroll với 10000 bản ghi
 */
@Component({
  selector: 'app-virtual-table-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseTableComponent, NzInputModule, NzIconModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h2>Virtual Scroll Table Demo</h2>
        <p>Demo bảng với 30,000 bản ghi sử dụng virtual scroll để tối ưu hiệu năng</p>
      </div>

      <div class="search-bar">
        <nz-input-group [nzPrefix]="prefixIconSearch" [nzSuffix]="suffixIconClear">
          <input
            nz-input
            type="text"
            placeholder="Tìm kiếm theo tên, email, phòng ban, chức vụ..."
            [(ngModel)]="searchValue"
            (ngModelChange)="onSearch()"
          />
        </nz-input-group>
        <ng-template #prefixIconSearch>
          <span nz-icon nzType="search"></span>
        </ng-template>
        <ng-template #suffixIconClear>
          @if (searchValue) {
            <span nz-icon nzType="close-circle" nzTheme="fill" (click)="clearSearch()" style="cursor: pointer;"></span>
          }
        </ng-template>
      </div>

      <div class="table-info">
        <span>Tổng số bản ghi: <strong>{{ allUsers.length }}</strong></span>
        @if (searchValue) {
          <span>Kết quả tìm kiếm: <strong>{{ filteredUsers.length }}</strong></span>
        }
        <span>Virtual Item Size: <strong>54px</strong></span>
      </div>

      <app-base-table
        [data]="filteredUsers"
        [columns]="columns"
        [loading]="loading"
        [scroll]="{ y: 'calc(100vh - 445px)' }"
        [virtualScroll]="true"
        [virtualItemSize]="54"
        [frontPagination]="false"
        [showPagination]="false"
        [bordered]="true"
      />
    </div>

    <!-- Template for highlighted text -->
    <ng-template #highlightTpl let-record let-column="column">
      <span [innerHTML]="getHighlightedValue(record, column)"></span>
    </ng-template>
  `,
  styles: [`
    .page-container {
      padding: 24px;
      background: #fff;
      min-height: calc(100vh - 64px);
    }

    .page-header {
      margin-bottom: 24px;
    }

    .page-header h2 {
      margin: 0 0 8px 0;
      font-size: 24px;
      font-weight: 600;
    }

    .page-header p {
      margin: 0;
      color: rgba(0, 0, 0, 0.45);
    }

    .search-bar {
      margin-bottom: 16px;
    }

    .search-bar nz-input-group {
      max-width: 500px;
    }

    .table-info {
      display: flex;
      gap: 24px;
      margin-bottom: 16px;
      padding: 12px 16px;
      background: #f5f5f5;
      border-radius: 4px;
    }

    .table-info span {
      color: rgba(0, 0, 0, 0.65);
    }

    .table-info strong {
      color: #1890ff;
    }

    :host ::ng-deep .highlight {
      background-color: #ffc069;
      padding: 0 2px;
    }
  `]
})
export class VirtualTableDemoComponent implements OnInit, AfterViewInit {
  @ViewChild('highlightTpl', { static: true }) highlightTpl!: TemplateRef<any>;

  loading = false;
  allUsers: User[] = [];
  filteredUsers: User[] = [];
  searchValue = '';
  currentColumn = '';

  columns: TableColumn[] = [];

  ngOnInit(): void {
    this.generateMockData();
  }

  ngAfterViewInit(): void {
    this.setupColumns();
  }

  setupColumns(): void {
    this.columns = [
      { key: 'Id', title: 'ID', width: '5%', align: 'center' },
      { key: 'Name', title: 'Họ và tên', width: '10%', template: this.highlightTpl },
      { key: 'Email', title: 'Email', width: '12%', template: this.highlightTpl },
      { key: 'Phone', title: 'Số điện thoại', width: '8%' },
      { key: 'Age', title: 'Tuổi', width: '5%', align: 'center' },
      { key: 'Department', title: 'Phòng ban', width: '10%', template: this.highlightTpl },
      { key: 'Position', title: 'Chức vụ', width: '10%', template: this.highlightTpl },
      { key: 'Salary', title: 'Lương (VNĐ)', width: '10%', align: 'right' },
      { key: 'JoinDate', title: 'Ngày vào làm', width: '8%', align: 'center' },
      { key: 'Address', title: 'Địa chỉ', width: '22%', template: this.highlightTpl }
    ];
  }

  onSearch(): void {
    if (!this.searchValue.trim()) {
      this.filteredUsers = [...this.allUsers];
      return;
    }

    const searchLower = this.searchValue.toLowerCase().trim();
    this.filteredUsers = this.allUsers.filter(user => 
      user.Name.toLowerCase().includes(searchLower) ||
      user.Email.toLowerCase().includes(searchLower) ||
      user.Department.toLowerCase().includes(searchLower) ||
      user.Position.toLowerCase().includes(searchLower) ||
      user.Address.toLowerCase().includes(searchLower)
    );
  }

  clearSearch(): void {
    this.searchValue = '';
    this.onSearch();
  }

  getHighlightedValue(record: any, column: TableColumn): string {
    const value = record[column.key];
    return this.highlightText(value, this.searchValue);
  }

  highlightText(text: any, search: string): string {
    if (!search || !text) {
      return text;
    }

    const textStr = String(text);
    const searchLower = search.toLowerCase().trim();
    const textLower = textStr.toLowerCase();
    
    if (!textLower.includes(searchLower)) {
      return textStr;
    }

    const regex = new RegExp(`(${this.escapeRegExp(search)})`, 'gi');
    return textStr.replace(regex, '<span class="highlight">$1</span>');
  }

  private escapeRegExp(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private generateMockData(): void {
    this.loading = true;

    const departments = ['IT', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations', 'R&D', 'Support'];
    const positions = ['Manager', 'Senior', 'Junior', 'Lead', 'Specialist', 'Coordinator', 'Director', 'Intern'];
    const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng'];
    const middleNames = ['Văn', 'Thị', 'Hữu', 'Đức', 'Minh', 'Anh', 'Quốc', 'Thanh', 'Tuấn', 'Hồng'];
    const lastNames = ['An', 'Bình', 'Cường', 'Dũng', 'Hà', 'Hùng', 'Khoa', 'Linh', 'Nam', 'Phong', 'Quân', 'Sơn', 'Tâm', 'Tú', 'Vân'];
    const streets = ['Lê Lợi', 'Nguyễn Huệ', 'Trần Hưng Đạo', 'Hai Bà Trưng', 'Lý Thường Kiệt', 'Võ Văn Tần', 'Điện Biên Phủ', 'Cách Mạng Tháng 8'];
    const cities = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Nha Trang', 'Huế', 'Vũng Tàu'];

    const users: User[] = [];

    for (let i = 1; i <= 30000; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${middleName} ${lastName}`;
      
      const department = departments[Math.floor(Math.random() * departments.length)];
      const position = positions[Math.floor(Math.random() * positions.length)];
      const age = Math.floor(Math.random() * 40) + 22; // 22-62 tuổi
      const salary = Math.floor(Math.random() * 50000000) + 10000000; // 10M-60M
      
      const street = streets[Math.floor(Math.random() * streets.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const streetNumber = Math.floor(Math.random() * 500) + 1;
      
      const year = Math.floor(Math.random() * 10) + 2014; // 2014-2023
      const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
      const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');

      users.push({
        Id: i,
        Name: name,
        Email: `user${i}@company.com`,
        Phone: `09${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
        Address: `${streetNumber} ${street}, ${city}`,
        Age: age,
        Department: department,
        Position: position,
        Salary: salary,
        JoinDate: `${day}/${month}/${year}`
      });
    }

    this.allUsers = users;
    this.filteredUsers = [...users];
    this.loading = false;
  }
}
