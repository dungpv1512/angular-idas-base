# Cách xem Demo Shared Components

## Bước 1: Chạy dev server

```bash
npm start
```

Hoặc:

```bash
ng serve
```

## Bước 2: Truy cập demo page

Mở trình duyệt và truy cập một trong các URL sau:

### Cách 1: Trực tiếp
```
http://localhost:4200/demo
```

### Cách 2: Từ trang chủ
1. Truy cập: `http://localhost:4200`
2. Click vào link "🎨 Xem Demo Shared Components"

---

## Demo bao gồm:

### ✅ Form Components
- Input (text, email, password, number)
- Textarea với character count
- Select (single & multiple)
- Radio (normal & button style)
- Checkbox (single & group)
- Switch
- DatePicker (single & range)
- Upload (text & picture-card)

### ✅ Data Display
- Table với pagination, sorting, actions
- Tree view với checkbox

### ✅ Features
- Form validation
- Error messages
- Sample data fill
- Form reset
- Real-time form value display

---

## Cấu trúc Routes

```typescript
// src/app/app.routes.ts
export const routes: Routes = [
  { path: '', redirectTo: '/welcome' },
  { path: 'welcome', ... },
  { path: 'demo', loadComponent: () => import('./shared/components/DEMO.component') }
];
```

---

## Troubleshooting

### Port đã được sử dụng
```bash
ng serve --port 4201
```
Sau đó truy cập: `http://localhost:4201/demo`

### Lỗi compilation
```bash
# Xóa cache và rebuild
rm -rf .angular
npm start
```

### Module not found
Kiểm tra các imports trong DEMO.component.ts đã đầy đủ:
- FormsModule
- ReactiveFormsModule
- Tất cả base components
- ng-zorro-antd modules

---

## Screenshots

Khi truy cập `/demo`, bạn sẽ thấy:

1. **Form Section** - Tất cả form controls với validation
2. **Table Section** - Table với actions (Edit, Delete)
3. **Tree Section** - Tree view với checkbox

Bạn có thể:
- Điền form và xem validation
- Click "Fill Sample Data" để điền dữ liệu mẫu
- Click "Reset" để reset form
- Submit form và xem console log
- Tương tác với table actions
- Check/uncheck tree nodes

---

## Next Steps

Sau khi xem demo, bạn có thể:

1. **Copy code** từ DEMO.component.ts để sử dụng
2. **Đọc docs** tại `src/app/shared/components/README.md`
3. **Quick start** tại `src/app/shared/components/QUICK_START.md`
4. **Tạo components mới** sử dụng base components

---

## Tips

- Mở DevTools Console để xem form values
- Thử validation bằng cách submit form rỗng
- Test tất cả form controls để hiểu cách hoạt động
- Xem source code DEMO.component.ts để học cách implement
