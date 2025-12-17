import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdasButtonComponent } from '@shared/components';
import { NzSpaceModule } from 'ng-zorro-antd/space';

/**
 * Button Demo Component - Demo các kiểu button
 */
@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [CommonModule, IdasButtonComponent, NzSpaceModule],
  templateUrl: './button-demo.component.html',
  styleUrl: './button-demo.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoComponent {
  onButtonClick(): void {
    console.log('Button clicked!');
  }
}
