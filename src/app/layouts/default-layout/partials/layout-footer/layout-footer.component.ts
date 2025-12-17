import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-layout-footer',
  standalone: true,
  imports: [NzLayoutModule],
  templateUrl: './layout-footer.component.html',
  styleUrl: './layout-footer.component.less'
})
export class LayoutFooterComponent {}
