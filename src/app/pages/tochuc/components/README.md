# Tochuc Components

Thư mục này chứa các partial components được tách ra từ component chính `ToChucComponent`.

## Cấu trúc

```
components/
├── tochuc-list/          # Component hiển thị danh sách (table/tree)
├── tochuc-selector/      # Component chọn tổ chức với checkbox
├── tochuc-view/          # Component xem chi tiết
├── tochuc-form/          # Component tạo mới/chỉnh sửa
└── README.md
```

## Components

### 1. ToChucListComponent (`tochuc-list/`)

Component hiển thị danh sách tổ chức với 2 chế độ xem: bảng và cây.

**Inputs:**
- `viewMode`: Chế độ xem ('table' | 'tree')
- `filteredData`: Dữ liệu đã lọc
- `treeData`: Dữ liệu dạng cây
- `columns`: Cấu hình cột bảng
- `actions`: Các hành động trên bảng
- `loading`: Trạng thái loading

**Outputs:**
- `viewModeChange`: Thay đổi chế độ xem
- `createClick`: Click nút thêm mới
- `treeNodeClick`: Click node trên cây

### 2. ToChucSelectorComponent (`tochuc-selector/`) ⭐ NEW

Component chọn tổ chức với checkbox selection. Tái sử dụng logic từ `ToChucListComponent` nhưng:
- ✅ Thêm checkbox selection (single/multiple)
- ✅ Ẩn cột thao tác
- ✅ Ẩn nút "Thêm mới"
- ✅ Emit selected items
- ✅ Hỗ trợ pre-selected items
- ✅ Không xung đột khi dùng nhiều instances

**Inputs:**
- `viewMode`: Chế độ xem ('table' | 'tree')
- `treeTableData`: Dữ liệu cho table view
- `treeData`: Dữ liệu cho tree view
- `columns`: Cấu hình cột
- `loading`: Trạng thái loading
- `searchFields`: Fields để search
- `title`: Tiêu đề
- `subtitle`: Phụ đề
- `multiple`: Cho phép chọn nhiều (default: true)
- `selectedIds`: IDs đã chọn (pre-selected)

**Outputs:**
- `viewModeChange`: Thay đổi chế độ xem
- `selectionChange`: Emit khi selection thay đổi (ToChuc[])
- `searchTagsChange`: Emit khi search tags thay đổi

**Xem thêm:**
- `tochuc-selector/README.md` - Documentation chi tiết
- `tochuc-selector/USAGE_EXAMPLE.md` - Ví dụ sử dụng
- `tochuc-selector-demo.component.ts` - Demo component

### 3. ToChucViewComponent (`tochuc-view/`)

Component hiển thị chi tiết thông tin tổ chức.

**Inputs:**
- `toChuc`: Đối tượng tổ chức cần hiển thị
- `parentName`: Tên tổ chức cấp trên

**Outputs:**
- `close`: Đóng drawer
- `edit`: Chuyển sang chế độ chỉnh sửa

### 4. ToChucFormComponent (`tochuc-form/`)

Component form tạo mới/chỉnh sửa tổ chức.

**Inputs:**
- `mode`: Chế độ form ('create' | 'edit')
- `toChuc`: Đối tượng tổ chức (khi edit)
- `treeData`: Dữ liệu cây cho tree select

**Outputs:**
- `submit`: Submit form với dữ liệu đã xử lý
- `cancel`: Hủy form

## Lợi ích của việc tách components

1. **Tách biệt trách nhiệm**: Mỗi component có một nhiệm vụ cụ thể
2. **Dễ bảo trì**: Code ngắn gọn, dễ đọc và sửa đổi
3. **Tái sử dụng**: Có thể sử dụng lại các component ở nơi khác
4. **Testing**: Dễ dàng viết unit test cho từng component
5. **Performance**: Có thể tối ưu change detection cho từng phần

## Sử dụng

Xem file `tochuc.component.html` để biết cách sử dụng các partial components này.
