# Layouts

Các layout components để tái sử dụng trong toàn bộ project.

## Danh sách Layouts

### 1. DefaultLayoutComponent
Layout mặc định với sidebar menu, header, footer.

**Sử dụng cho:** Tất cả các trang chính của ứng dụng (dashboard, forms, tables, etc.)

**Features:**
- ✅ Collapsible sidebar menu
- ✅ Responsive (mobile-friendly)
- ✅ Header với actions (notifications, user menu)
- ✅ Footer
- ✅ Configurable menu items
- ✅ Router outlet cho content

**Menu Structure:**
```typescript
menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    open: true,
    children: [
      { title: 'Welcome', route: '/welcome' },
      { title: 'Monitor', route: '/monitor' }
    ]
  }
];
```

---

### 2. BlankLayoutComponent
Layout trống không có sidebar/header/footer.

**Sử dụng cho:** Login, Register, 404, 500, Landing pages

**Features:**
- ✅ Minimal layout
- ✅ Full-screen content
- ✅ Background color

---

## Cách sử dụng

### Option 1: Sử dụng trực tiếp trong App Component (Current)

```typescript
// src/app/app.ts
import { Component } from '@angular/core';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

@Component({
  selector: 'app-root',
  imports: [DefaultLayoutComponent],
  template: '<app-default-layout />'
})
export class App {}
```

### Option 2: Sử dụng với Route-based Layout

```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', redirectTo: '/welcome', pathMatch: 'full' },
      { path: 'welcome', loadComponent: () => import('./pages/welcome/welcome') },
      { path: 'demo', loadComponent: () => import('./shared/components/DEMO.component') }
    ]
  },
  {
    path: 'auth',
    component: BlankLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./pages/auth/login') },
      { path: 'register', loadComponent: () => import('./pages/auth/register') }
    ]
  }
];
```

---

## Customization

### Thay đổi Menu Items

Edit `default-layout.component.ts`:

```typescript
menuItems: MenuItem[] = [
  {
    title: 'Your Section',
    icon: 'your-icon',
    open: true,
    children: [
      { title: 'Page 1', route: '/page1' },
      { title: 'Page 2', route: '/page2' }
    ]
  }
];
```

### Thay đổi Logo

Edit `default-layout.component.html`:

```html
<div class="sidebar-logo">
  <a href="/" [class.collapsed]="isCollapsed()">
    <img src="/assets/your-logo.svg" alt="logo" />
    @if (!isCollapsed()) {
      <h1>Your App Name</h1>
    }
  </a>
</div>
```

### Thay đổi Header Actions

Edit `default-layout.component.html`:

```html
<div class="header-right">
  <span class="header-action" (click)="onSearch()">
    <span nz-icon nzType="search"></span>
  </span>
  <span class="header-action" (click)="onNotification()">
    <span nz-icon nzType="bell"></span>
  </span>
  <!-- Add more actions -->
</div>
```

### Thay đổi Footer

Edit `default-layout.component.html`:

```html
<nz-footer>
  <div class="footer-content">
    Your Company ©{{ currentYear }}
  </div>
</nz-footer>
```

---

## Layout Structure

```
layouts/
├── default-layout/
│   ├── default-layout.component.ts
│   ├── default-layout.component.html
│   └── default-layout.component.css
├── blank-layout/
│   └── blank-layout.component.ts
├── index.ts
└── README.md
```

---

## MenuItem Interface

```typescript
export interface MenuItem {
  title: string;        // Menu title
  icon?: string;        // Ant Design icon name
  route?: string;       // Router link (for single item)
  children?: MenuItem[]; // Sub-menu items
  open?: boolean;       // Default open state for submenu
}
```

---

## Responsive Behavior

### Desktop (> 768px)
- Sidebar: 256px width
- Collapsible with trigger button
- Full menu with icons and text

### Mobile (≤ 768px)
- Sidebar: Auto-collapse
- Overlay mode
- Icons only when collapsed

---

## Best Practices

1. ✅ Sử dụng `DefaultLayoutComponent` cho tất cả trang chính
2. ✅ Sử dụng `BlankLayoutComponent` cho auth pages
3. ✅ Customize menu items theo structure của app
4. ✅ Thêm guards cho protected routes
5. ✅ Sử dụng lazy loading cho pages
6. ✅ Keep layout logic minimal
7. ✅ Use signals for reactive state

---

## Examples

### Thêm User Menu

```typescript
// default-layout.component.ts
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

// Add to imports
imports: [..., NzDropDownModule]

// Add to template
<nz-dropdown [nzDropdownMenu]="userMenu">
  <span class="header-action">
    <span nz-icon nzType="user"></span>
  </span>
</nz-dropdown>

<nz-dropdown-menu #userMenu="nzDropdownMenu">
  <ul nz-menu>
    <li nz-menu-item>
      <a routerLink="/profile">Profile</a>
    </li>
    <li nz-menu-item>
      <a routerLink="/settings">Settings</a>
    </li>
    <li nz-menu-divider></li>
    <li nz-menu-item (click)="logout()">
      Logout
    </li>
  </ul>
</nz-dropdown-menu>
```

### Thêm Breadcrumb

```html
<!-- default-layout.component.html -->
<nz-content>
  <nz-breadcrumb style="margin: 16px 24px;">
    <nz-breadcrumb-item>Home</nz-breadcrumb-item>
    <nz-breadcrumb-item>Dashboard</nz-breadcrumb-item>
  </nz-breadcrumb>
  
  <div class="inner-content">
    <router-outlet></router-outlet>
  </div>
</nz-content>
```

### Dynamic Menu từ API

```typescript
// default-layout.component.ts
import { inject, OnInit } from '@angular/core';
import { MenuService } from '@core/services/menu.service';

export class DefaultLayoutComponent implements OnInit {
  private menuService = inject(MenuService);
  menuItems = signal<MenuItem[]>([]);

  ngOnInit() {
    this.menuService.getMenuItems().subscribe(items => {
      this.menuItems.set(items);
    });
  }
}
```

---

## Troubleshooting

### Menu không hiển thị
- Kiểm tra `menuItems` array có data
- Kiểm tra routes đã được config đúng
- Kiểm tra `RouterModule` đã được import

### Sidebar không collapse
- Kiểm tra `isCollapsed` signal
- Kiểm tra `toggleCollapsed()` method
- Kiểm tra CSS cho collapsed state

### Content bị overflow
- Kiểm tra `nz-content` height calculation
- Kiểm tra `overflow-y: auto`
- Adjust height calculation nếu có thêm header/footer
