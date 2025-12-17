import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdasAvatarComponent, IdasBadgeComponent } from '@shared/components';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * Avatar Demo Component - Demo component Avatar
 */
@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [
    CommonModule, 
    IdasAvatarComponent, 
    IdasBadgeComponent,
    NzSpaceModule,
    NzIconModule
  ],
  templateUrl: './avatar-demo.component.html',
  styleUrl: './avatar-demo.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarDemoComponent {
  onAvatarError(event: Event): void {
    console.log('Avatar load error:', event);
  }
}
