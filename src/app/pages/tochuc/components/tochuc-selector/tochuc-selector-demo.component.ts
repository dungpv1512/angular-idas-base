import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ToChucSelectorComponent } from './tochuc-selector.component';
import { ToChuc } from '@app/core/services/tochuc.service';

/**
 * Demo component để test ToChucSelectorComponent
 * Sử dụng 2 instances trên cùng 1 màn hình để verify không có xung đột
 */
@Component({
  selector: 'app-tochuc-selector-demo',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzDividerModule,
    ToChucSelectorComponent
  ],
  template: `
    <div class="demo-container">
      <nz-card nzTitle="Demo: Sử dụng 2 ToChucSelector trên cùng màn hình">
        <p>Demo này chứng minh 2 instances của ToChucSelectorComponent có thể hoạt động độc lập không xung đột.</p>
      </nz-card>

      <nz-divider></nz-divider>

      <!-- Selector 1 -->
      <div class="selector-section">
        <h3>Selector 1: Chọn Tổ chức chính</h3>
        <app-tochuc-selector
          [viewMode]="viewMode1"
          [title]="'Chọn Tổ chức chính'"
          [subtitle]="'Chọn một hoặc nhiều tổ chức chính'"
          [multiple]="true"
          [selectedIds]="selectedIds1"
          [scroll]="{ y: '400px' }"
          (viewModeChange)="viewMode1 = $event"
          (selectionChange)="onSelection1Change($event)"
        />
        
        @if (selectedItems1.length > 0) {
          <nz-card nzTitle="Kết quả chọn - Selector 1" class="result-card">
            <ul>
              @for (item of selectedItems1; track item.Id) {
                <li>{{ item.TenToChuc }} (ID: {{ item.Id }})</li>
              }
            </ul>
          </nz-card>
        }
      </div>

      <nz-divider></nz-divider>

      <!-- Selector 2 -->
      <div class="selector-section">
        <h3>Selector 2: Chọn Tổ chức phụ</h3>
        <app-tochuc-selector
          [viewMode]="viewMode2"
          [title]="'Chọn Tổ chức phụ'"
          [subtitle]="'Chọn tổ chức phụ (chỉ chọn 1)'"
          [multiple]="false"
          [selectedIds]="selectedIds2"
          [scroll]="{ y: '400px' }"
          (viewModeChange)="viewMode2 = $event"
          (selectionChange)="onSelection2Change($event)"
        />
        
        @if (selectedItems2.length > 0) {
          <nz-card nzTitle="Kết quả chọn - Selector 2" class="result-card">
            <ul>
              @for (item of selectedItems2; track item.Id) {
                <li>{{ item.TenToChuc }} (ID: {{ item.Id }})</li>
              }
            </ul>
          </nz-card>
        }
      </div>

      <nz-divider></nz-divider>

      <!-- Summary -->
      <nz-card nzTitle="Tổng kết" class="summary-card">
        <div class="summary-content">
          <div class="summary-item">
            <strong>Selector 1:</strong> Đã chọn {{ selectedItems1.length }} tổ chức
          </div>
          <div class="summary-item">
            <strong>Selector 2:</strong> Đã chọn {{ selectedItems2.length }} tổ chức
          </div>
          <button nz-button nzType="primary" (click)="showSummary()">
            Xem tổng kết
          </button>
        </div>
      </nz-card>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 24px;
      background: #f0f2f5;
      min-height: 100vh;
      overflow-y: auto;

      .selector-section {
        margin-bottom: 24px;

        h3 {
          margin-bottom: 16px;
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .result-card {
          margin-top: 16px;
          background: #f6ffed;
          border: 1px solid #b7eb8f;

          ul {
            margin: 0;
            padding-left: 20px;
            max-height: 200px;
            overflow-y: auto;

            li {
              margin-bottom: 8px;
              color: #389e0d;
            }
          }
        }
      }

      .summary-card {
        background: #e6f7ff;
        border: 1px solid #91d5ff;
        margin-bottom: 24px;

        .summary-content {
          .summary-item {
            margin-bottom: 12px;
            font-size: 16px;

            strong {
              color: #0050b3;
            }
          }

          button {
            margin-top: 16px;
          }
        }
      }
    }

    /* Ensure smooth scrolling */
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
    }
  `]
})
export class ToChucSelectorDemoComponent {
  private message = inject(NzMessageService);

  // Selector 1 state
  viewMode1: 'table' | 'tree' = 'table';
  selectedIds1: number[] = [];
  selectedItems1: ToChuc[] = [];

  // Selector 2 state
  viewMode2: 'table' | 'tree' = 'tree';
  selectedIds2: number[] = [];
  selectedItems2: ToChuc[] = [];



  onSelection1Change(items: ToChuc[]): void {
    this.selectedItems1 = items;
    console.log('Selector 1 - Selected items:', items);
  }

  onSelection2Change(items: ToChuc[]): void {
    this.selectedItems2 = items;
    console.log('Selector 2 - Selected items:', items);
  }

  showSummary(): void {
    const summary = `
      Selector 1: ${this.selectedItems1.length} tổ chức
      ${this.selectedItems1.map(item => `- ${item.TenToChuc}`).join('\n')}
      
      Selector 2: ${this.selectedItems2.length} tổ chức
      ${this.selectedItems2.map(item => `- ${item.TenToChuc}`).join('\n')}
    `;
    
    console.log('=== TỔNG KẾT ===');
    console.log(summary);
    
    this.message.success('Xem console để thấy tổng kết chi tiết');
  }
}
