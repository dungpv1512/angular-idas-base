# 🧪 Experimental - Component Showcase

## Mô tả

Trang **Experimental** là một bộ documentation tương tác cho tất cả shared components trong project. Trang này giúp developers:

- 📖 Xem mô tả chi tiết về từng component
- 🎯 Hiểu rõ các Inputs/Outputs của component
- 🎨 Demo trực tiếp các tính năng
- 💡 Copy code examples để sử dụng

## Cấu trúc

```
experimentals/
├── routes/
│   └── experimentals.routes.ts
├── pages/                          # page-level demo components
│   ├── affix-demo/
│   ├── alert-demo/
│   ├── anchor-demo/
│   ├── avatar-demo/
│   ├── back-top-demo/
│   ├── badge-demo/
│   ├── breadcrumb-demo/
│   ├── button-demo/
│   ├── date-upload-demo/
│   ├── form-complete-demo/
│   ├── form-inputs-demo/
│   ├── search-tags-demo/
│   ├── selection-controls-demo/
│   ├── table-tree-demo/
│   └── shared-demo-styles.less
├── experimentals.feature.ts        # entry point
└── README.md
```

## Truy cập

Truy cập trang qua URL: `/experimental`

## Các Tab

### 1. 📝 Form Inputs
- BaseInputComponent
- BaseTextareaComponent  
- BaseSelectComponent

### 2. ☑️ Selection Controls
- BaseRadioComponent
- BaseCheckboxComponent
- BaseSwitchComponent

### 3. 📅 Date & Upload
- BaseDatepickerComponent
- BaseUploadComponent

### 4. 🔍 Search & Tags
- BaseSearchComponent
- BaseTagsInputComponent

### 5. 📊 Table & Tree
- BaseTableComponent
- BaseTreeComponent
- BaseTreeSelectComponent

### 6. 🎯 Form Demo
- Complete form example với tất cả components

## Tính năng

### Documentation
Mỗi component có:
- **Mô tả**: Giải thích chức năng
- **Selector**: Tên selector để sử dụng
- **Inputs**: Danh sách tất cả @Input properties
- **Outputs**: Danh sách tất cả @Output events
- **Tags**: Phân loại component (Form Control, Standalone, etc.)

### Interactive Demo
- Form tương tác để test component
- Real-time preview
- Form value display (JSON format)
- Sample data fill

### Styling
- Gradient background đẹp mắt
- Card-based layout
- Responsive design
- Dark theme cho code display

## Sử dụng

### Xem documentation
1. Mở trang `/experimental`
2. Chọn tab tương ứng với component cần xem
3. Đọc API documentation trong bảng

### Test component
1. Scroll xuống phần "Demo"
2. Tương tác với form
3. Xem kết quả trong "Form Value" section

### Copy code
1. Xem code example trong demo
2. Copy selector và properties
3. Sử dụng trong component của bạn

## Ví dụ

```typescript
// Sử dụng BaseInputComponent
<app-base-input
  formControlName="username"
  label="Tên đăng nhập"
  placeholder="Nhập tên đăng nhập"
  prefixIcon="user"
  [required]="true"
  errorTip="Vui lòng nhập tên đăng nhập"
/>
```

## Lưu ý

- Trang này chỉ dùng cho development/testing
- Không deploy lên production (có thể thêm guard nếu cần)
- Cập nhật documentation khi thêm component mới
- Giữ cho demo đơn giản và dễ hiểu

## Cập nhật

Khi thêm component mới:
1. Import component vào `experimental.component.ts`
2. Thêm tab mới hoặc thêm vào tab hiện có
3. Tạo card với API documentation
4. Thêm demo section
5. Cập nhật README này
