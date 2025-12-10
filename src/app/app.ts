import { Component } from '@angular/core';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

@Component({
  selector: 'app-root',
  imports: [DefaultLayoutComponent],
  template: '<app-default-layout />'
})
export class App {}
