import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { AnchorLink } from '../types/anchor-link.model';

/**
 * IDAS Anchor Component - Wrapper cho nz-anchor
 */
@Component({
  selector: 'app-idas-anchor',
  standalone: true,
  imports: [CommonModule, NzAnchorModule],
  templateUrl: './idas-anchor.component.html',
  styleUrl: './idas-anchor.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasAnchorComponent {
  @Input() items: AnchorLink[] = [];
  @Input() affix: boolean = true;
  @Input() bounds: number = 5;
  @Input() offsetTop?: number;
  @Input() showInkInFixed: boolean = false;
  @Input() targetOffset?: number;
  @Output() readonly click = new EventEmitter<string>();
  @Output() readonly scroll = new EventEmitter<HTMLElement>();

  onClick(link: any): void {
    this.click.emit(link);
  }

  onScroll(element: any): void {
    this.scroll.emit(element);
  }
}
