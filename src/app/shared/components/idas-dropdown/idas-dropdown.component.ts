import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

/**
 * IDAS Dropdown Component - Wrapper cho nz-dropdown
 */
@Component({
  selector: 'app-idas-dropdown',
  standalone: true,
  imports: [CommonModule, NzDropDownModule],
  templateUrl: './idas-dropdown.component.html',
  styleUrl: './idas-dropdown.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasDropdownComponent {
  // TODO: Thêm @Input và @Output properties theo nhu cầu
}
