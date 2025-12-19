import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IdasResultComponent } from '@app/shared/components/idas-result/idas-result.component';
import { IdasButtonComponent } from '@app/shared/components/idas-button/idas-button.component';
import { I18N_EXCEPTION } from '@app/shared/constants';

/**
 * 500 Server Error Page
 * Hiển thị khi có lỗi server
 */
@Component({
  selector: 'app-server-error-page',
  standalone: true,
  imports: [TranslateModule, IdasResultComponent, IdasButtonComponent],
  templateUrl: './server-error.page.html',
  styleUrl: './server-error.page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerErrorPage {
  private readonly router = inject(Router);

  /** i18n keys - expose cho template */
  readonly i18n = I18N_EXCEPTION;

  goHome(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    window.history.back();
  }
}
