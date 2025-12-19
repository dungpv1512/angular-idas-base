import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IdasResultComponent } from '@app/shared/components/idas-result/idas-result.component';
import { IdasButtonComponent } from '@app/shared/components/idas-button/idas-button.component';
import { IdasCardComponent } from '@app/shared/components/idas-card/idas-card.component';
import { NzResultStatusType } from 'ng-zorro-antd/result';

/**
 * Demo component cho IdasResult
 * Hiển thị các trạng thái: success, error, info, warning, 403, 404, 500
 */
@Component({
  selector: 'app-result-demo',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    IdasResultComponent,
    IdasButtonComponent,
    IdasCardComponent,
  ],
  templateUrl: './result-demo.component.html',
  styleUrl: './result-demo.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultDemoComponent {
  /** Danh sách các status để demo */
  readonly statusList: NzResultStatusType[] = [
    'success',
    'error',
    'info',
    'warning',
    '403',
    '404',
    '500',
  ];

  onAction(): void {
    console.log('[ResultDemo] Action clicked');
  }
}
