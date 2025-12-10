# Quản lý Tổ chức

Màn hình quản lý tổ chức với đầy đủ chức năng CRUD, hiển thị dạng table và tree view.

## Tính năng

### 1. Hiển thị dữ liệu
- **Table View**: Hiển thị danh sách tổ chức dạng bảng với pagination, sorting
- **Tree View**: Hiển thị cấu trúc phân cấp tổ chức dạng cây
- Chuyển đổi giữa 2 chế độ hiển thị

### 2. CRUD Operations
- **Create**: Thêm mới tổ chức
- **Read**: Xem chi tiết tổ chức
- **Update**: Chỉnh sửa thông tin tổ chức
- **Delete**: Xóa tổ chức (có confirm)

### 3. Form Fields
- **Mã tổ chức**: Text input, required, max 50 ký tự
- **Tên tổ chức**: Text input, required, max 200 ký tự
- **Loại tổ chức**: Select (Trung tâm/Phòng ban)
- **Trạng thái**: Select (Nháp/Đang hoạt động/Tạm dừng/Đã duyệt/Đã hủy)
- **Tổ chức cấp trên**: Tree select (chọn từ cây tổ chức)
- **Chức năng nhiệm vụ**: Textarea (mỗi chức năng 1 dòng)

### 4. Drawer
- **View Mode**: Hiển thị chi tiết tổ chức với descriptions
- **Create/Edit Mode**: Form để tạo mới hoặc chỉnh sửa
- Width: 720px
- Footer cố định với nút action

## API Integration

### Endpoint
```
https://apidemo.idasonline.com/organizations-gateway/api/tochuc
```

### Methods
- `POST /DefaultFilters` - Lấy danh sách với filter
- `GET /{id}` - Lấy chi tiết theo ID
- `POST /` - Tạo mới
- `PUT /{id}` - Cập nhật
- `DELETE /{id}` - Xóa

### Authentication
Token được tự động thêm vào header thông qua `authInterceptor`.

## Components sử dụng

### Shared Components
- `BaseTableComponent` - Hiển thị table
- `BaseTreeComponent` - Hiển thị tree
- `BaseInputComponent` - Input fields
- `BaseSelectComponent` - Dropdown select
- `BaseTextareaComponent` - Textarea
- `BaseTreeSelectComponent` - Tree select (mới)

### ng-zorro Components
- `nz-drawer` - Drawer panel
- `nz-descriptions` - Chi tiết tổ chức
- `nz-tag` - Status tags
- `nz-card` - Card container
- `nz-space` - Spacing
- `nz-divider` - Divider

## Service

### ToChucService
Location: `src/app/core/services/tochuc.service.ts`

**Methods:**
- `getList(filter?)` - Lấy danh sách
- `getById(id)` - Lấy chi tiết
- `create(data)` - Tạo mới
- `update(id, data)` - Cập nhật
- `delete(id)` - Xóa
- `convertToTreeData(data)` - Convert sang tree structure

## Routing

```typescript
{
  path: 'tochuc',
  loadChildren: () => import('./pages/tochuc/tochuc.routes').then(m => m.toChucRoutes),
  title: 'Quản lý Tổ chức'
}
```

## Usage

### Truy cập
```
http://localhost:4200/tochuc
```

### Menu
Sidebar > Quản lý > Quản lý Tổ chức

## Styling

- Sử dụng LESS để tái sử dụng biến của Ant Design
- Import từ `theme.less` để có access đến tất cả biến
- Red & White gradient theme
- Responsive design với breakpoints của Ant Design
- Card hover effects với @primary-1, @primary-2

## Notes

- Form validation tự động với Reactive Forms
- Loading state tự động qua `loadingInterceptor`
- Error handling với `responseInterceptor`
- Cache GET requests với `cacheInterceptor`
- Token tự động thêm vào header

## Future Enhancements

- [ ] Search/Filter trong table
- [ ] Export to Excel
- [ ] Import from Excel
- [ ] Drag & drop trong tree view
- [ ] Bulk actions
- [ ] History/Audit log
