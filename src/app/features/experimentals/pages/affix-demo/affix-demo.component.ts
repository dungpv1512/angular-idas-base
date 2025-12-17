import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdasAffixComponent } from '@shared/components';
import { IdasButtonComponent } from '@shared/components';

/**
 * Affix Demo Component - Demo component Affix
 */
@Component({
  selector: 'app-affix-demo',
  standalone: true,
  imports: [CommonModule, IdasAffixComponent, IdasButtonComponent],
  templateUrl: './affix-demo.component.html',
  styleUrl: './affix-demo.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AffixDemoComponent {
  onAffixChange(status: boolean): void {
    console.log('Affix status:', status);
  }
}
