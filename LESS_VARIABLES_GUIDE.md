# Hướng dẫn sử dụng LESS Variables từ Ant Design

## 📋 Tổng quan

Project sử dụng LESS thay vì SCSS để tái sử dụng trực tiếp các biến từ ng-zorro-antd (Ant Design).

## 🎨 Theme Configuration

**File**: `src/theme.less`

Tất cả biến LESS được định nghĩa trong file này và có thể import vào các component.

## 📦 Các biến có sẵn

### Colors

#### Primary Colors (Red Theme)
```less
@primary-color: #dc2626;     // Red-600 - Màu chính
@primary-1: #fee2e2;          // Red-50 - Hover states
@primary-2: #fecaca;          // Red-100 - Selected states
@primary-3: #fca5a5;          // Red-200
@primary-4: #f87171;          // Red-300
@primary-5: #ef4444;          // Red-400
@primary-6: @primary-color;   // Red-600
@primary-7: #b91c1c;          // Red-700
```

#### Semantic Colors
```less
@link-color: @primary-color;
@success-color: #16a34a;      // Green
@warning-color: #ea580c;      // Orange
@error-color: @primary-color; // Red
```

#### Text Colors
```less
@heading-color: #1f2937;
@text-color: #374151;
@text-color-secondary: #6b7280;
@disabled-color: #d1d5db;
```

#### Background Colors
```less
@background-color-light: #f0f2f5;
@component-background: #ffffff;
```

#### Border
```less
@border-color-base: #e5e7eb;
@border-radius-base: 4px;
```

#### Shadow
```less
@box-shadow-base: 0 2px 8px rgba(220, 38, 38, 0.08);
```

### Spacing

#### Padding
```less
@padding-xs: 8px;
@padding-sm: 12px;
@padding-md: 16px;
@padding-lg: 24px;
@padding-xl: 32px;
```

#### Margin
```less
@margin-xs: 8px;
@margin-sm: 12px;
@margin-md: 16px;
@margin-lg: 24px;
@margin-xl: 32px;
```

### Typography

```less
@font-size-base: 14px;
@font-size-lg: 16px;
@font-size-sm: 12px;
@line-height-base: 1.5715;
```

### Breakpoints

```less
@screen-xs: 480px;
@screen-sm: 576px;
@screen-md: 768px;
@screen-lg: 992px;
@screen-xl: 1200px;
@screen-xxl: 1600px;
```

## 🔧 Cách sử dụng trong Component

### 1. Tạo file .less cho component

```less
// my-component.component.less
@import '../../../theme.less';

.my-component {
  padding: @padding-lg;
  background: @component-background;
  border-radius: @border-radius-base;
  box-shadow: @box-shadow-base;

  h2 {
    color: @heading-color;
    font-size: @font-size-lg + 8px;
    margin-bottom: @margin-md;
  }

  .card {
    padding: @padding-md;
    background: @background-color-light;
    border: 1px solid @border-color-base;

    &:hover {
      background: @primary-1;
    }
  }
}

// Responsive
@media (max-width: @screen-md) {
  .my-component {
    padding: @padding-md;
  }
}
```

### 2. Cập nhật Component TypeScript

```typescript
@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [...],
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.less'] // Đổi từ .scss sang .less
})
export class MyComponent {}
```

## 📝 Best Practices

### ✅ DO

```less
// Sử dụng biến từ theme
.button {
  padding: @padding-md;
  color: @primary-color;
  border-radius: @border-radius-base;
}

// Tính toán dựa trên biến
.title {
  font-size: @font-size-lg + 4px;
  margin-bottom: @margin-lg * 2;
}

// Sử dụng color levels
.hover-effect {
  &:hover {
    background: @primary-1; // Lighter
  }
  &:active {
    background: @primary-7; // Darker
  }
}
```

### ❌ DON'T

```less
// Không hardcode giá trị
.button {
  padding: 16px; // ❌ Dùng @padding-md
  color: #dc2626; // ❌ Dùng @primary-color
  border-radius: 4px; // ❌ Dùng @border-radius-base
}

// Không tự định nghĩa biến trùng
@my-primary-color: #dc2626; // ❌ Đã có @primary-color
```

## 🎯 Ví dụ thực tế

### Card Component

```less
@import '../../../theme.less';

.card-container {
  padding: @padding-lg;
  background: @component-background;
  border-radius: @border-radius-base;
  box-shadow: @box-shadow-base;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
    transform: translateY(-2px);
  }

  .card-header {
    padding: @padding-md;
    border-bottom: 1px solid @border-color-base;
    
    h3 {
      margin: 0;
      color: @heading-color;
      font-size: @font-size-lg;
    }
  }

  .card-body {
    padding: @padding-md;
    color: @text-color;
    line-height: @line-height-base;
  }

  .card-footer {
    padding: @padding-sm @padding-md;
    background: @background-color-light;
    border-top: 1px solid @border-color-base;
  }
}
```

### Form Component

```less
@import '../../../theme.less';

.form-container {
  .form-item {
    margin-bottom: @margin-lg;

    label {
      display: block;
      margin-bottom: @margin-xs;
      color: @heading-color;
      font-weight: 600;
    }

    input {
      padding: @padding-sm;
      border: 1px solid @border-color-base;
      border-radius: @border-radius-base;
      font-size: @font-size-base;

      &:focus {
        border-color: @primary-color;
        outline: none;
      }

      &:disabled {
        background: @background-color-light;
        color: @disabled-color;
      }
    }

    .error-message {
      margin-top: @margin-xs;
      color: @error-color;
      font-size: @font-size-sm;
    }
  }
}
```

## 🔗 Tài liệu tham khảo

- [ng-zorro-antd Customize Theme](https://ng.ant.design/docs/customize-theme/en)
- [Ant Design Default Variables](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/style/themes/default.less)
- [LESS Documentation](https://lesscss.org/)

## 💡 Tips

1. **Import theme.less** ở đầu mỗi component LESS file
2. **Sử dụng color levels** (@primary-1 đến @primary-7) cho hover/active states
3. **Tính toán động** với LESS: `@padding-lg * 2`, `@font-size-base + 4px`
4. **Responsive** với breakpoints: `@screen-md`, `@screen-lg`
5. **Consistency** - Luôn dùng biến thay vì hardcode

---

**Cập nhật**: December 10, 2025
