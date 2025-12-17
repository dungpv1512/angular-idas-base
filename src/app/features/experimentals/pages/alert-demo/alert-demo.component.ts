import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdasAlertComponent } from '@shared/components';
import { NzSpaceModule } from 'ng-zorro-antd/space';

/**
 * Alert Demo Component - Demo component Alert
 */
@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [CommonModule, IdasAlertComponent, NzSpaceModule],
  templateUrl: './alert-demo.component.html',
  styleUrl: './alert-demo.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDemoComponent {
  onAlertClose(): void {
    console.log('Alert closed');
  }
}
