import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdasBackTopComponent } from '@shared/components';

/**
 * BackTop Demo Component - Demo component BackTop
 */
@Component({
  selector: 'app-back-top-demo',
  standalone: true,
  imports: [CommonModule, IdasBackTopComponent],
  templateUrl: './back-top-demo.component.html',
  styleUrl: './back-top-demo.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackTopDemoComponent {
  onBackTopClick(): void {
    console.log('Back to top clicked');
  }
}
