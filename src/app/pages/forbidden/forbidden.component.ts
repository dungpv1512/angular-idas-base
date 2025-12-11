import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';

/**
 * 403 Forbidden Page
 * Hiển thị khi user không có quyền truy cập
 */
@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [NzResultModule, NzButtonModule],
  template: `
    <div class="forbidden-container">
      <nz-result
        nzStatus="403"
        nzTitle="403"
        nzSubTitle="Xin lỗi, bạn không có quyền truy cập trang này."
      >
        <div nz-result-extra>
          <button nz-button nzType="primary" (click)="goHome()">
            Về trang chủ
          </button>
          <button nz-button (click)="goBack()">
            Quay lại
          </button>
        </div>
      </nz-result>
    </div>
  `,
  styles: [`
    .forbidden-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #f0f2f5;
    }

    [nz-result-extra] {
      display: flex;
      gap: 8px;
      justify-content: center;
    }
  `]
})
export class ForbiddenComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/welcome']);
  }

  goBack(): void {
    window.history.back();
  }
}
