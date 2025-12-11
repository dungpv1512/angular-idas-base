# Ví dụ sử dụng ToChucSelectorComponent

## Ví dụ 1: Sử dụng đơn giản

```typescript
// your-component.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { ToChucSelectorComponent } from '@app/pages/tochuc/components/tochuc-selector/tochuc-selector.component';
import { ToChucService, ToChuc } from '@app/core/services/tochuc.service';
import { TableColumn } from '@app/shared/types/table.types';

@Component({
  selector: 'app-your-component',
  standalone: true,
  imports: [ToChucSelectorComponent],
  template: `
    <app-tochuc-selector
      [treeTableData]="treeTableData"
      [treeData]="treeData"
      [columns]="columns"
      [loading]="loading"
      [searchFields]="['MaToChuc', 'TenToChuc']"
      (selectionChange)="onSelectionChange($event)"
    />
  `
})
export class YourComponent implements OnInit {
  private toChucService = inject(ToChucService);

  treeTableData: any[] = [];
  treeData: any[] = [];
  loading = false;

  columns: TableColumn[] = [
    { key: 'MaToChuc', title: 'Mã tổ chức', width: '150px' },
    { key: 'TenToChuc', title: 'Tên tổ chức', width: '300px' },
    { key: 'Stt', title: 'STT', width: '100px', align: 'center' }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.toChucService.getList().subscribe({
      next: (response) => {
        const data = response.Data || [];
        this.treeTableData = this.toChucService.convertToTreeTableData(data);
        this.treeData = this.toChucService.convertToTreeData(data);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSelectionChange(items: ToChuc[]): void {
    console.log('Selected items:', items);
    // Xử lý logic của bạn ở đây
  }
}
```

## Ví dụ 2: Chọn 1 tổ chức (Single mode)

```html
<app-tochuc-selector
  [treeTableData]="treeTableData"
  [treeData]="treeData"
  [columns]="columns"
  [title]="'Chọn Tổ chức'"
  [subtitle]="'Chọn một tổ chức'"
  [multiple]="false"
  (selectionChange)="onSelectionChange($event)"
/>
```

## Ví dụ 3: Pre-selected items

```typescript
export class YourComponent {
  selectedIds: number[] = [1, 2, 3]; // IDs đã chọn trước

  // ...
}
```

```html
<app-tochuc-selector
  [treeTableData]="treeTableData"
  [treeData]="treeData"
  [columns]="columns"
  [selectedIds]="selectedIds"
  (selectionChange)="onSelectionChange($event)"
/>
```

## Ví dụ 4: Sử dụng 2 selectors trên cùng màn hình

```typescript
export class YourComponent {
  // Selector 1
  selectedItems1: ToChuc[] = [];
  
  // Selector 2
  selectedItems2: ToChuc[] = [];

  onSelection1Change(items: ToChuc[]): void {
    this.selectedItems1 = items;
    console.log('Selector 1:', items);
  }

  onSelection2Change(items: ToChuc[]): void {
    this.selectedItems2 = items;
    console.log('Selector 2:', items);
  }
}
```

```html
<div class="container">
  <!-- Selector 1: Chọn nhiều -->
  <app-tochuc-selector
    [treeTableData]="treeTableData"
    [treeData]="treeData"
    [columns]="columns"
    [title]="'Chọn Tổ chức chính'"
    [multiple]="true"
    (selectionChange)="onSelection1Change($event)"
  />

  <nz-divider></nz-divider>

  <!-- Selector 2: Chọn 1 -->
  <app-tochuc-selector
    [treeTableData]="treeTableData"
    [treeData]="treeData"
    [columns]="columns"
    [title]="'Chọn Tổ chức phụ'"
    [multiple]="false"
    (selectionChange)="onSelection2Change($event)"
  />
</div>
```

## Ví dụ 5: Sử dụng trong Modal/Drawer

```typescript
import { NzModalService } from 'ng-zorro-antd/modal';

export class YourComponent {
  private modal = inject(NzModalService);

  openSelector(): void {
    const modalRef = this.modal.create({
      nzTitle: 'Chọn Tổ chức',
      nzContent: ToChucSelectorComponent,
      nzWidth: '80%',
      nzData: {
        treeTableData: this.treeTableData,
        treeData: this.treeData,
        columns: this.columns,
        searchFields: ['MaToChuc', 'TenToChuc']
      },
      nzFooter: [
        {
          label: 'Hủy',
          onClick: () => modalRef.destroy()
        },
        {
          label: 'Xác nhận',
          type: 'primary',
          onClick: (componentInstance) => {
            const selected = componentInstance.selectedItems;
            console.log('Selected:', selected);
            modalRef.destroy();
          }
        }
      ]
    });

    // Listen to selection change
    modalRef.componentInstance.selectionChange.subscribe((items: ToChuc[]) => {
      console.log('Selection changed:', items);
    });
  }
}
```

## Ví dụ 6: Custom scroll height

```html
<app-tochuc-selector
  [treeTableData]="treeTableData"
  [treeData]="treeData"
  [columns]="columns"
  [scroll]="{ y: '500px' }"
  (selectionChange)="onSelectionChange($event)"
/>
```

## Ví dụ 7: Programmatically clear selection

```typescript
import { ViewChild } from '@angular/core';
import { ToChucSelectorComponent } from '@app/pages/tochuc/components/tochuc-selector/tochuc-selector.component';

export class YourComponent {
  @ViewChild(ToChucSelectorComponent) selector!: ToChucSelectorComponent;

  clearAll(): void {
    this.selector.clearSelection();
  }

  getSelectedCount(): number {
    return this.selector.selectedCount;
  }
}
```

```html
<app-tochuc-selector
  #selector
  [treeTableData]="treeTableData"
  [treeData]="treeData"
  [columns]="columns"
  (selectionChange)="onSelectionChange($event)"
/>

<button nz-button (click)="clearAll()">Clear All</button>
<p>Selected: {{ selector.selectedCount }}</p>
```

## Câu hỏi thường gặp

### Q: 2 selectors có xung đột với nhau không?
**A:** Không. Mỗi instance có state riêng biệt, hoàn toàn độc lập.

### Q: Làm sao để lấy items đã chọn?
**A:** Sử dụng event `(selectionChange)="onSelectionChange($event)"`. Event này emit mảng các `ToChuc` đã chọn.

### Q: Có thể pre-select items không?
**A:** Có. Truyền mảng IDs vào `[selectedIds]="[1, 2, 3]"`.

### Q: Làm sao để chỉ cho phép chọn 1 item?
**A:** Set `[multiple]="false"`.

### Q: Component có hỗ trợ search không?
**A:** Có. Truyền `[searchFields]="['MaToChuc', 'TenToChuc']"` để enable search.
