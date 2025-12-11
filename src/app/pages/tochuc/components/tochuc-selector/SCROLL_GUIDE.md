# Scroll Configuration Guide

## 🎯 Vấn đề

Khi sử dụng nhiều `ToChucSelectorComponent` trên cùng màn hình, scroll mặc định `calc(-445px + 100vh)` có thể gây ra vấn đề:
- Mỗi selector chiếm gần toàn bộ viewport height
- Scroll conflict giữa page scroll và table scroll
- Không scroll được trang

## ✅ Giải pháp

### 1. Sử dụng Fixed Height cho Multiple Instances

Khi có nhiều selectors trên cùng màn hình, nên dùng fixed height:

```html
<!-- Selector 1 -->
<app-tochuc-selector
  [scroll]="{ y: '400px' }"
  ...
/>

<!-- Selector 2 -->
<app-tochuc-selector
  [scroll]="{ y: '400px' }"
  ...
/>
```

### 2. Sử dụng Dynamic Height

Tính toán height dựa trên số lượng selectors:

```typescript
export class YourComponent {
  // 2 selectors → mỗi cái 400px
  scrollHeight1 = { y: '400px' };
  scrollHeight2 = { y: '400px' };
  
  // 3 selectors → mỗi cái 300px
  // scrollHeight = { y: '300px' };
}
```

```html
<app-tochuc-selector
  [scroll]="scrollHeight1"
  ...
/>
```

### 3. Sử dụng Percentage Height

```html
<div style="height: 100vh; display: flex; flex-direction: column; gap: 16px;">
  <!-- Selector 1: 45% viewport -->
  <div style="height: 45vh;">
    <app-tochuc-selector
      [scroll]="{ y: 'calc(45vh - 300px)' }"
      ...
    />
  </div>
  
  <!-- Selector 2: 45% viewport -->
  <div style="height: 45vh;">
    <app-tochuc-selector
      [scroll]="{ y: 'calc(45vh - 300px)' }"
      ...
    />
  </div>
</div>
```

## 📐 Scroll Height Calculation

### Formula

```
Table Scroll Height = Container Height - (Header + Toolbar + Padding)
```

### Example

```
Container: 500px
Header: 100px (title + subtitle)
Toolbar: 80px (search + view switcher)
Dividers: 40px
Padding: 80px

Table Scroll = 500 - (100 + 80 + 40 + 80) = 200px
```

### Recommended Heights

| Use Case | Scroll Height | Notes |
|----------|---------------|-------|
| Single selector (full page) | `calc(-445px + 100vh)` | Default |
| 2 selectors | `400px` | Mỗi selector ~500px total |
| 3 selectors | `300px` | Mỗi selector ~400px total |
| Modal/Drawer | `500px` | Fixed height |
| Sidebar | `calc(100vh - 200px)` | Full height - header |

## 🎨 Best Practices

### 1. Single Selector (Full Page)

```html
<!-- Dùng default scroll -->
<app-tochuc-selector
  [treeTableData]="data"
  [treeData]="tree"
  [columns]="columns"
/>
```

### 2. Multiple Selectors (Same Page)

```html
<div class="selectors-container">
  <app-tochuc-selector
    [scroll]="{ y: '400px' }"
    [title]="'Selector 1'"
  />
  
  <nz-divider></nz-divider>
  
  <app-tochuc-selector
    [scroll]="{ y: '400px' }"
    [title]="'Selector 2'"
  />
</div>
```

```css
.selectors-container {
  padding: 24px;
  overflow-y: auto;
  max-height: 100vh;
}
```

### 3. Modal/Drawer

```typescript
openModal(): void {
  this.modal.create({
    nzTitle: 'Chọn Tổ chức',
    nzContent: ToChucSelectorComponent,
    nzWidth: '80%',
    nzData: {
      scroll: { y: '500px' }, // Fixed height for modal
      ...
    }
  });
}
```

### 4. Responsive Scroll

```typescript
export class YourComponent {
  scrollHeight = { y: '400px' };

  @HostListener('window:resize')
  onResize(): void {
    const height = window.innerHeight;
    if (height < 768) {
      this.scrollHeight = { y: '300px' }; // Mobile
    } else if (height < 1024) {
      this.scrollHeight = { y: '400px' }; // Tablet
    } else {
      this.scrollHeight = { y: '500px' }; // Desktop
    }
  }
}
```

## 🐛 Troubleshooting

### Problem: Không scroll được trang

**Cause**: Scroll height quá lớn, chiếm hết viewport

**Solution**: Giảm scroll height xuống

```html
<!-- ❌ Bad -->
<app-tochuc-selector [scroll]="{ y: 'calc(-445px + 100vh)' }" />
<app-tochuc-selector [scroll]="{ y: 'calc(-445px + 100vh)' }" />

<!-- ✅ Good -->
<app-tochuc-selector [scroll]="{ y: '400px' }" />
<app-tochuc-selector [scroll]="{ y: '400px' }" />
```

### Problem: Table scroll conflict với page scroll

**Cause**: Nested scroll containers

**Solution**: Đảm bảo chỉ có 1 scroll container active

```css
/* Container có scroll */
.page-container {
  overflow-y: auto;
  height: 100vh;
}

/* Table có fixed height */
.selector {
  /* scroll: { y: '400px' } */
}
```

### Problem: Scroll không mượt

**Cause**: Thiếu smooth scrolling CSS

**Solution**: Thêm CSS

```css
.demo-container {
  overflow-y: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch; /* iOS smooth scroll */
}
```

## 📝 Demo Component Example

Xem file `tochuc-selector-demo.component.ts` để thấy cách config scroll cho 2 selectors:

```typescript
// Selector 1
<app-tochuc-selector
  [scroll]="{ y: '400px' }"
  ...
/>

// Selector 2
<app-tochuc-selector
  [scroll]="{ y: '400px' }"
  ...
/>
```

## 💡 Tips

1. **Test trên nhiều screen sizes** để đảm bảo scroll hoạt động tốt
2. **Dùng fixed height** cho multiple selectors thay vì calc()
3. **Thêm max-height** cho result cards để tránh quá dài
4. **Enable smooth scrolling** với CSS
5. **Consider virtual scroll** cho danh sách lớn (đã enable mặc định)
