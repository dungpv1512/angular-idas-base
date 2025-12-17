import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { IdasTableComponent, IdasTreeComponent, IdasTreeSelectComponent } from '@app/shared/components';
import { TreeSelectNode } from '@app/shared/components/types';
import { TableAction, TableColumn } from '@app/shared/types/table.types';

interface DemoUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-table-tree-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzCardModule, IdasTableComponent, IdasTreeComponent, IdasTreeSelectComponent],
  templateUrl: './table-tree-demo.component.html',
  styleUrl: './table-tree-demo.component.less'
})
export class TableTreeDemoComponent {
  private readonly fb = inject(FormBuilder);
  private readonly message = inject(NzMessageService);

  demoForm: FormGroup;

  tableData: DemoUser[] = [
    { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', role: 'Admin' },
    { id: 2, name: 'Trần Thị B', email: 'b@example.com', role: 'User' }
  ];

  tableColumns: TableColumn[] = [
    { title: 'ID', key: 'id', width: '80px' },
    { title: 'Họ tên', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Vai trò', key: 'role' }
  ];

  tableActions: TableAction[] = [
    { label: 'Sửa', icon: 'edit', type: 'primary', onClick: (record) => this.message.info(`Sửa: ${record.name}`) }
  ];

  treeData: NzTreeNodeOptions[] = [
    { title: 'Công nghệ', key: 'tech', children: [{ title: 'Frontend', key: 'frontend' }] }
  ];

  treeSelectData: TreeSelectNode[] = [
    { title: 'Công nghệ', value: 'tech', key: 'tech', children: [{ title: 'Frontend', value: 'frontend', key: 'frontend' }] }
  ];

  constructor() {
    this.demoForm = this.fb.group({
      selectedCategories: [[]],
      selectedTree: [null]
    });
  }
}
