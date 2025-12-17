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
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.less'
})
export class BlankLayoutComponent {}
