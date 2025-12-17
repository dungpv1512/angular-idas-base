import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-layout-header',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    NzIconModule,
    LanguageSwitcherComponent
  ],
  templateUrl: './layout-header.component.html',
  styleUrl: './layout-header.component.less'
})
export class LayoutHeaderComponent {
  menuIcon = input.required<string>();
  toggleMenu = output<void>();
}
