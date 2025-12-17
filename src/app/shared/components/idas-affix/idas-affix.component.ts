import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAffixModule } from 'ng-zorro-antd/affix';

/**
 * IDAS Affix Component - Wrapper cho nz-affix
 */
@Component({
  selector: 'app-idas-affix',
  standalone: true,
  imports: [CommonModule, NzAffixModule],
  templateUrl: './idas-affix.component.html',
  styleUrl: './idas-affix.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasAffixComponent {
  @Input() offsetTop?: number;
  @Input() offsetBottom?: number;
  @Output() readonly change = new EventEmitter<boolean>();

  onAffixChange(status: boolean): void {
    this.change.emit(status);
  }
}
