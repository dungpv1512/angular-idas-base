import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';

/**
 * IDAS BackTop Component - Wrapper cho nz-back-top
 */
@Component({
  selector: 'app-idas-back-top',
  standalone: true,
  imports: [CommonModule, NzBackTopModule],
  templateUrl: './idas-back-top.component.html',
  styleUrl: './idas-back-top.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasBackTopComponent {
  @Input() visibilityHeight = 400;
  @Input() target?: string | HTMLElement;
  @Input() duration = 450;
  @Output() readonly click = new EventEmitter<void>();

  onClick(): void {
    this.click.emit();
  }
}
