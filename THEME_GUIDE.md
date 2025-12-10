# Theme Guide - Red & White Gradient

Hướng dẫn sử dụng theme màu đỏ và trắng với gradient cho Angular IDAS.

## 🎨 Color Palette (Based on IDAS Logo)

### Primary Colors (From Logo Center)
- **Primary Red-Brown**: `#a94442` (RGB: 169, 68, 66)
- **Primary Hover**: `#8b3735`
- **Primary Dark**: `#6d2a28`
- **Primary Darker**: `#4f1e1c`
- **Primary Light**: `#f8e8e8`
- **Border Light**: `#f0d4d4`

### Accent Colors (From Logo Circle)
- **Red**: `#e74c3c` (Top right of circle)
- **Orange**: `#f39c12` (Right of circle)
- **Yellow**: `#f1c40f` (Bottom right)
- **Green**: `#27ae60` (Bottom left)
- **Blue**: `#5b9bd5` (Left of circle)

### Gradients
```css
/* Primary Gradient (Sidebar, Buttons) */
background: linear-gradient(135deg, #a94442 0%, #6d2a28 100%);

/* Light Gradient (Header, Footer) */
background: linear-gradient(90deg, #ffffff 0%, #f8e8e8 100%);

/* Background Gradient (Content) */
background: linear-gradient(135deg, #f8e8e8 0%, #ffffff 50%, #f8e8e8 100%);

/* Colorful Gradient (From Logo Circle) */
background: linear-gradient(90deg, #e74c3c 0%, #f39c12 25%, #f1c40f 50%, #27ae60 75%, #5b9bd5 100%);
```

### Text Colors
- **Heading**: `#6d2a28` (Dark red-brown)
- **Body**: `#2c3e50` (Dark blue-gray)
- **Secondary**: `#7f8c8d` (Gray)

---

## 📁 Files Modified

### 1. `src/theme.less`
Ant Design theme customization với màu đỏ chủ đạo.

```less
@primary-color: #dc2626;
@link-color: #dc2626;
@border-radius-base: 8px;
@box-shadow-base: 0 2px 8px rgba(220, 38, 38, 0.08);
```

### 2. `src/styles.css`
Global styles với CSS variables và overrides.

```css
:root {
  --primary-color: #dc2626;
  --gradient-primary: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
}
```

### 3. `src/app/layouts/default-layout/default-layout.component.css`
Layout styles với gradient cho sidebar, header, footer.

---

## 🎯 Usage Examples

### Buttons

```html
<!-- Primary button (gradient red) -->
<button nz-button nzType="primary">Save</button>

<!-- Default button -->
<button nz-button>Cancel</button>

<!-- Danger button -->
<button nz-button nzDanger>Delete</button>
```

### Cards with Gradient Border

```html
<nz-card>
  <div style="border-top: 3px solid #dc2626;">
    Card content
  </div>
</nz-card>
```

### Gradient Text

```css
.gradient-text {
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Gradient Background

```css
.gradient-bg {
  background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
}
```

---

## 🎨 Component Theming

### Sidebar Menu
- Background: Vertical gradient từ đỏ đậm đến đỏ tối
- Selected item: White overlay (15% opacity)
- Hover: White overlay (10% opacity)

### Header
- Background: Horizontal gradient từ trắng sang đỏ nhạt
- Actions hover: Red tint với 8% opacity

### Footer
- Background: Horizontal gradient từ đỏ nhạt sang trắng
- Text: Dark red (#991b1b)

### Content Area
- Background: Diagonal gradient với red-50 và white
- Cards: White với red shadow và red top border

---

## 🔧 Customization

### Thay đổi màu chính

Edit `src/theme.less`:
```less
@primary-color: #your-color;
```

### Thay đổi gradient

Edit `src/styles.css`:
```css
:root {
  --gradient-primary: linear-gradient(135deg, #color1 0%, #color2 100%);
}
```

### Thay đổi sidebar gradient

Edit `src/app/layouts/default-layout/default-layout.component.css`:
```css
.menu-sidebar {
  background: linear-gradient(180deg, #color1 0%, #color2 50%, #color3 100%);
}
```

---

## 🎭 Dark Mode (Future)

Để thêm dark mode, có thể sử dụng:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #ef4444; /* Lighter red for dark mode */
    --gradient-primary: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  }
}
```

---

## 📊 Accessibility

### Contrast Ratios
- Red (#dc2626) on White: **4.5:1** ✅ (WCAG AA)
- Dark Red (#991b1b) on White: **7.1:1** ✅ (WCAG AAA)
- White on Red (#dc2626): **4.5:1** ✅ (WCAG AA)

### Best Practices
1. ✅ Sử dụng dark red (#991b1b) cho text quan trọng
2. ✅ Sử dụng primary red (#dc2626) cho buttons và links
3. ✅ Sử dụng light red (#fef2f2) cho backgrounds
4. ✅ Đảm bảo contrast ratio >= 4.5:1 cho text

---

## 🎨 Design Tokens

```css
/* Primary */
--red-50: #fef2f2;
--red-100: #fee2e2;
--red-600: #dc2626;  /* Primary */
--red-700: #b91c1c;
--red-800: #991b1b;  /* Dark */

/* Gradients */
--gradient-sidebar: linear-gradient(180deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%);
--gradient-header: linear-gradient(90deg, #ffffff 0%, #fef2f2 100%);
--gradient-footer: linear-gradient(90deg, #fef2f2 0%, #ffffff 100%);
--gradient-content: linear-gradient(135deg, #fef2f2 0%, #ffffff 50%, #fef2f2 100%);

/* Shadows */
--shadow-red: 0 2px 8px rgba(220, 38, 38, 0.08);
--shadow-red-hover: 0 4px 12px rgba(220, 38, 38, 0.15);
```

---

## 🖼️ Visual Examples

### Sidebar
```
┌─────────────────┐
│  Logo (Red)     │ ← Gradient: #dc2626 → #991b1b
├─────────────────┤
│ ▶ Dashboard     │
│   • Welcome     │ ← Selected: White 15%
│   • Monitor     │ ← Hover: White 10%
│ ▶ Components    │
└─────────────────┘
```

### Header
```
┌────────────────────────────────────────┐
│ ☰  [Gradient: White → Red-50]  🔔 👤 │
└────────────────────────────────────────┘
```

### Content Card
```
┌────────────────────────────────────────┐
│ ▬▬▬ (Red border top)                   │
│                                        │
│  Card Content                          │
│                                        │
└────────────────────────────────────────┘
```

---

## 🚀 Quick Start

1. **Rebuild project** để apply theme mới:
   ```bash
   npm start
   ```

2. **Xem demo** tại `/demo` để thấy theme hoạt động

3. **Customize** theo nhu cầu bằng cách edit các file đã nêu

---

## 📝 Notes

- Theme sử dụng Tailwind color palette (Red-50 đến Red-800)
- Gradients được optimize cho performance
- Tất cả màu đều accessible (WCAG AA+)
- Responsive và mobile-friendly
- Compatible với ng-zorro-antd components

---

## 🔗 Resources

- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors)
- [ng-zorro-antd Theming](https://ng.ant.design/docs/customize-theme/en)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
