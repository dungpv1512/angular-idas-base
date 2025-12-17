import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdasBadgeComponent, IdasButtonComponent, IdasAvatarComponent } from '@shared/components';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * Badge Demo Component - Demo component Badge
 */
@Component({
  selector: 'app-badge-demo',
  standalone: true,
  imports: [
    CommonModule, 
    IdasBadgeComponent, 
    IdasButtonComponent,
    IdasAvatarComponent,
    NzSpaceModule,
    NzIconModule
  ],
  templateUrl: './badge-demo.component.html',
  styleUrl: './badge-demo.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeDemoComponent {
  readonly count = signal(5);
  readonly show = signal(true);

  increase(): void {
    this.count.update(c => c + 1);
  }

  decrease(): void {
    this.count.update(c => Math.max(0, c - 1));
  }

  toggle(): void {
    this.show.update(s => !s);
  }
}
