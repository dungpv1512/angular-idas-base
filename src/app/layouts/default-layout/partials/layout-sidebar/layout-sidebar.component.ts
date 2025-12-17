import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MenuItem } from '../../default-layout.model';

@Component({
  selector: 'app-layout-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    TranslateModule
  ],
  templateUrl: './layout-sidebar.component.html',
  styleUrl: './layout-sidebar.component.less'
})
export class LayoutSidebarComponent {
  isCollapsed = input.required<boolean>();
  menuItems = input.required<MenuItem[]>();
}
