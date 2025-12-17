# IDAS Shared Components

Hệ thống wrapper components cho ng-zorro-antd, cung cấp API thống nhất và dễ dàng customize cho toàn bộ project.

## 🎯 Mục đích

- ✅ **Consistent API**: Interface thống nhất cho toàn bộ ứng dụng
- ✅ **Customization**: Dễ dàng customize styling và behavior
- ✅ **Type Safety**: Full TypeScript support với strict types
- ✅ **Form Integration**: Tích hợp sẵn với Reactive Forms
- ✅ **Future-proof**: Dễ dàng thay đổi UI library nếu cần

## 📦 Tổng quan

**Tổng số**: 64 components  
**Đã hoàn thiện**: 13 components  
**Skeleton**: 51 components  

## ✅ Components đã hoàn thiện

### Form Controls (8)
1. **IdasInputComponent** (`app-idas-input`) - Text input với validation
2. **IdasTextareaComponent** (`app-idas-textarea`) - Textarea với character count
3. **IdasSelectComponent** (`app-idas-select`) - Single & Multiple select
4. **IdasCheckboxComponent** (`app-idas-checkbox`) - Single checkbox & Checkbox group
5. **IdasRadioComponent** (`app-idas-radio`) - Radio group (normal & button style)
6. **IdasSwitchComponent** (`app-idas-switch`) - Toggle switch
7. **IdasDatepickerComponent** (`app-idas-datepicker`) - Date & Range picker
8. **IdasUploadComponent** (`app-idas-upload`) - File upload

### Data Display (3)
9. **IdasTableComponent** (`app-idas-table`) - Table với pagination, sorting, actions
10. **IdasTreeComponent** (`app-idas-tree`) - Tree view với checkbox, search
11. **IdasTreeSelectComponent** (`app-idas-tree-select`) - Tree select dropdown

### Custom Components (2)
12. **IdasSearchComponent** (`app-idas-search`) - Search với debounce
13. **IdasTagsInputComponent** (`app-idas-tags-input`) - Multi-value search tags

## 🚧 Components đã tạo skeleton (cần implement)

### General (3)
- IdasButtonComponent
- IdasIconComponent
- IdasTypographyComponent

### Layout (4)
- IdasGridComponent
- IdasLayoutComponent
- IdasSpaceComponent
- IdasDividerComponent

### Navigation (10)
- IdasAffixComponent
- IdasBreadcrumbComponent
- IdasDropdownComponent
- IdasMenuComponent
- IdasPaginationComponent
- IdasPageHeaderComponent
- IdasStepsComponent
- IdasTabsComponent
- IdasAnchorComponent
- IdasBackTopComponent

### Data Entry (8)
- IdasCascaderComponent
- IdasFormComponent
- IdasInputNumberComponent
- IdasMentionsComponent
- IdasRateComponent
- IdasSliderComponent
- IdasTimePickerComponent
- IdasTransferComponent

### Data Display (16)
- IdasAvatarComponent
- IdasBadgeComponent
- IdasCalendarComponent
- IdasCardComponent
- IdasCarouselComponent
- IdasCollapseComponent
- IdasCommentComponent
- IdasDescriptionsComponent
- IdasEmptyComponent
- IdasImageComponent
- IdasListComponent
- IdasPopoverComponent
- IdasStatisticComponent
- IdasTagComponent
- IdasTimelineComponent
- IdasTooltipComponent

### Feedback (8)
- IdasAlertComponent
- IdasDrawerComponent
- IdasModalComponent
- IdasPopconfirmComponent
- IdasProgressComponent
- IdasResultComponent
- IdasSkeletonComponent
- IdasSpinComponent

### Other (2)
- IdasQrCodeComponent
- IdasWatermarkComponent

---

## 🚀 Quick Start

### Import components

```typescript
import { 
  IdasInputComponent,
  IdasButtonComponent,
  IdasSelectComponent 
} from '@app/shared/components';

@Component({
  selector: 'app-my-feature',
  standalone: true,
  imports: [
    IdasInputComponent,
    IdasButtonComponent,
    IdasSelectComponent
  ]
})
export class MyFeatureComponent {}
```

### Sử dụng trong template

```html
<form [formGroup]="form">
  <app-idas-input
    formControlName="username"
    label="Tên đăng nhập"
    placeholder="Nhập tên đăng nhập"
    [required]="true"
  />
  
  <app-idas-button type="primary" (click)="onSubmit()">
    Đăng nhập
  </app-idas-button>
</form>
```

---

## 📚 Tài liệu chi tiết

- **Hướng dẫn đầy đủ**: Xem file `.kiro/docs/idas-components-guide.md`
- **Demo tương tác**: Truy cập `/experimental` trong ứng dụng
- **ng-zorro docs**: https://ng.ant.design/

---

## 🎨 Tính năng chung

✅ **ControlValueAccessor** - Tích hợp với Reactive Forms & Template-driven Forms  
✅ **Validation** - Hiển thị error messages tự động  
✅ **Disabled state** - Hỗ trợ disable/enable  
✅ **Customizable** - Nhiều options để customize  
✅ **Consistent UI** - Giao diện thống nhất theo Ant Design  
✅ **TypeScript** - Type-safe với interfaces  
✅ **i18n Ready** - Hỗ trợ đa ngôn ngữ  
✅ **OnPush** - Change detection tối ưu  

---

## 🛠️ Development

### Tạo component mới

1. Chạy script generator:
```bash
node scripts/generate-components.js
```

2. Hoặc tạo thủ công:
```bash
# Tạo folder và files
mkdir src/app/shared/components/idas-{name}
touch src/app/shared/components/idas-{name}/idas-{name}.component.{ts,html,less,spec.ts}
```

3. Implement component theo pattern hiện tại

4. Export trong `index.ts`

5. Thêm vào experimental page để demo

### Pattern chuẩn

```typescript
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nz{Module}Module } from 'ng-zorro-antd/{module}';

/**
 * IDAS {Name} Component - Wrapper cho nz-{name}
 */
@Component({
  selector: 'app-idas-{name}',
  standalone: true,
  imports: [CommonModule, Nz{Module}Module],
  templateUrl: './idas-{name}.component.html',
  styleUrl: './idas-{name}.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Idas{Name}Component {
  @Input() label = '';
  // ... other inputs
}
```

---

## 📝 Naming Convention

- **Selector**: `app-idas-{component-name}`
- **Class**: `Idas{ComponentName}Component`
- **Folder**: `idas-{component-name}`
- **Files**: `idas-{component-name}.component.{ts,html,less,spec.ts}`

---

## ✨ Best Practices

### 1. Luôn sử dụng IDAS Components

❌ **Không nên:**
```html
<input nz-input />
<button nz-button>Click</button>
```

✅ **Nên:**
```html
<app-idas-input />
<app-idas-button>Click</app-idas-button>
```

### 2. Import từ barrel file

❌ **Không nên:**
```typescript
import { IdasInputComponent } from './idas-input/idas-input.component';
```

✅ **Nên:**
```typescript
import { IdasInputComponent } from '@app/shared/components';
```

### 3. Sử dụng Reactive Forms

✅ **Nên:**
```typescript
form = this.fb.group({
  username: ['', Validators.required]
});
```

### 4. Sử dụng i18n

✅ **Nên:**
```html
<app-idas-input 
  [label]="'auth.username' | translate"
/>
```

---

## 🗺️ Roadmap

- [x] **Phase 1**: Core form controls (13 components) ✅
- [ ] **Phase 2**: Layout & Navigation (14 components)
- [ ] **Phase 3**: Data Display (16 components)
- [ ] **Phase 4**: Feedback (8 components)
- [ ] **Phase 5**: Advanced features (4 components)

---

## 🤝 Contributing

Khi implement component mới:

1. Follow pattern hiện tại
2. Viết tests đầy đủ
3. Thêm vào experimental page
4. Cập nhật documentation
5. Export trong index.ts

---

## 📞 Support

- Xem demo: `/experimental`
- Đọc docs: `.kiro/docs/idas-components-guide.md`
- ng-zorro: https://ng.ant.design/
