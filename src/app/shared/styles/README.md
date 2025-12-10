# SCSS Styles Guide

Hướng dẫn sử dụng SCSS trong Angular IDAS project.

## 📁 Structure

```
src/
├── styles.scss                    # Global styles
└── app/
    └── shared/
        └── styles/
            ├── _variables.scss    # Theme variables, mixins
            └── README.md          # This file
```

---

## 🎨 Variables

### Colors

```scss
// Primary
$primary-color: #dc2626;
$primary-hover: #b91c1c;
$primary-dark: #991b1b;
$primary-light: #fef2f2;

// Text
$text-heading: #991b1b;
$text-body: #374151;
$text-secondary: #6b7280;
```

### Gradients

```scss
$gradient-primary: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
$gradient-sidebar: linear-gradient(180deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%);
$gradient-header: linear-gradient(90deg, #ffffff 0%, #fef2f2 100%);
```

### Shadows

```scss
$shadow-sm: 0 1px 2px rgba(#dc2626, 0.05);
$shadow-base: 0 2px 8px rgba(#dc2626, 0.08);
$shadow-md: 0 4px 12px rgba(#dc2626, 0.12);
$shadow-lg: 0 8px 24px rgba(#dc2626, 0.15);
```

### Spacing

```scss
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
$spacing-2xl: 48px;
```

---

## 🔧 Mixins

### Responsive

```scss
@include mobile {
  // Styles for mobile (max-width: 768px)
}

@include tablet {
  // Styles for tablet (769px - 1024px)
}

@include desktop {
  // Styles for desktop (min-width: 1025px)
}
```

### Gradient Text

```scss
.my-heading {
  @include gradient-text;
}
```

### Card Hover Effect

```scss
.my-card {
  @include card-hover;
}
```

### Flexbox

```scss
.centered {
  @include flex-center;
}

.space-between {
  @include flex-between;
}
```

---

## 📝 Usage in Components

### Import Variables

```scss
// component.scss
@import '../../shared/styles/variables';

.my-component {
  color: $primary-color;
  padding: $spacing-lg;
  border-radius: $radius-base;
  box-shadow: $shadow-base;
}
```

### Using Gradients

```scss
.header {
  background: $gradient-header;
}

.button {
  background: $gradient-primary;
  
  &:hover {
    background: linear-gradient(135deg, $primary-hover 0%, $primary-dark 100%);
  }
}
```

### Using Mixins

```scss
.card {
  @include card-hover;
  padding: $spacing-lg;
  
  @include mobile {
    padding: $spacing-md;
  }
}

.title {
  @include gradient-text;
  font-size: $font-size-2xl;
}
```

---

## 🎯 Best Practices

### 1. Always Import Variables

```scss
// ✅ Good
@import '../../shared/styles/variables';

.component {
  color: $primary-color;
}

// ❌ Bad
.component {
  color: #dc2626; // Hard-coded color
}
```

### 2. Use Mixins for Reusable Patterns

```scss
// ✅ Good
.card {
  @include card-hover;
}

// ❌ Bad
.card {
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.12);
    transform: translateY(-2px);
  }
}
```

### 3. Nest Selectors Logically

```scss
// ✅ Good
.card {
  padding: $spacing-lg;
  
  &-title {
    color: $text-heading;
  }
  
  &-content {
    color: $text-body;
  }
  
  &:hover {
    box-shadow: $shadow-md;
  }
}

// ❌ Bad - Too deep nesting
.card {
  .inner {
    .content {
      .text {
        .paragraph {
          color: $text-body; // 5 levels deep!
        }
      }
    }
  }
}
```

### 4. Use Variables for Consistency

```scss
// ✅ Good
.button {
  padding: $spacing-md $spacing-lg;
  border-radius: $radius-base;
  transition: all $transition-base;
}

// ❌ Bad
.button {
  padding: 16px 24px;
  border-radius: 8px;
  transition: all 0.3s ease;
}
```

---

## 🔄 Migration from CSS

### Before (CSS)

```css
/* component.css */
.component {
  color: #dc2626;
  padding: 24px;
}

.component:hover {
  color: #b91c1c;
}
```

### After (SCSS)

```scss
// component.scss
@import '../../shared/styles/variables';

.component {
  color: $primary-color;
  padding: $spacing-lg;
  
  &:hover {
    color: $primary-hover;
  }
}
```

---

## 📦 Component Example

```scss
// my-component.component.scss
@import '../../shared/styles/variables';

:host {
  display: block;
  padding: $spacing-lg;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  
  @include mobile {
    padding: $spacing-md;
  }
}

.header {
  @include flex-between;
  padding: $spacing-lg;
  background: $gradient-header;
  border-radius: $radius-base;
  box-shadow: $shadow-base;
  
  &-title {
    @include gradient-text;
    font-size: $font-size-2xl;
    margin: 0;
  }
  
  &-actions {
    display: flex;
    gap: $spacing-sm;
  }
}

.card {
  @include card-hover;
  padding: $spacing-lg;
  background: white;
  border-radius: $radius-base;
  border-left: 3px solid $primary-color;
  
  &-title {
    color: $text-heading;
    font-size: $font-size-xl;
    margin-bottom: $spacing-md;
  }
  
  &-content {
    color: $text-body;
    line-height: 1.6;
  }
}
```

---

## 🎨 Theming

### Custom Theme Colors

To change theme colors, edit `_variables.scss`:

```scss
// Change primary color
$primary-color: #your-color;
$primary-hover: darken($primary-color, 10%);
$primary-dark: darken($primary-color, 20%);
```

### Add New Variables

```scss
// _variables.scss
$custom-color: #123456;
$custom-gradient: linear-gradient(135deg, $custom-color 0%, darken($custom-color, 20%) 100%);
```

---

## 🚀 Performance Tips

1. **Avoid deep nesting** (max 3-4 levels)
2. **Use variables** instead of hard-coded values
3. **Leverage mixins** for reusable patterns
4. **Keep selectors specific** but not overly complex
5. **Use @import** sparingly (only for variables/mixins)

---

## 📚 Resources

- [Sass Documentation](https://sass-lang.com/documentation)
- [Angular SCSS Guide](https://angular.dev/guide/component-styles)
- [BEM Naming Convention](http://getbem.com/)
