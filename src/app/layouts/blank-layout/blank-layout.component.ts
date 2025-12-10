import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Blank Layout Component - Layout trống không có sidebar/header
 * Sử dụng cho: Login, Register, 404, 500, etc.
 */
@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="blank-layout">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .blank-layout {
        min-height: 100vh;
        background: #f0f2f5;
      }
    `
  ]
})
export class BlankLayoutComponent {}
