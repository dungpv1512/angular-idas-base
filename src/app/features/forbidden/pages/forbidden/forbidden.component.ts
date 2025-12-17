import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';

/**
 * 403 Forbidden Page
 * Hiển thị khi user không có quyền truy cập
 */
@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [NzResultModule, NzButtonModule, TranslateModule],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.less'
})
export class ForbiddenComponent {
  private readonly router = inject(Router);

  goHome(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    window.history.back();
  }
}
