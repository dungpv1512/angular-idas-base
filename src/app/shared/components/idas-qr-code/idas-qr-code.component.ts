import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';

/**
 * IDAS QrCode Component - Wrapper cho nz-qr-code
 */
@Component({
  selector: 'app-idas-qr-code',
  standalone: true,
  imports: [CommonModule, NzQRCodeModule],
  templateUrl: './idas-qr-code.component.html',
  styleUrl: './idas-qr-code.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasQrCodeComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
