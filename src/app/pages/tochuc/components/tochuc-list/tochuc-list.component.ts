import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { TranslateModule } from '@ngx-translate/core';
import { BaseTableComponent } from '@app/shared/components/base-table/base-table.component';
import { BaseTreeComponent } from '@app/shared/components/base-tree/base-tree.component';
import { BaseTagsInputComponent } from '@app/shared/components/base-tags-input/base-tags-input.component';
import { TableColumn, TableAction } from '@app/shared/types/table.types';
import { ToChuc } from '@app/core/services/tochuc.service';

@Component({
  selector: 'app-tochuc-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzSpaceModule,
    NzCardModule,
    NzIconModule,
    NzRadioModule,
    NzDividerModule,
    NzEmptyModule,
    TranslateModule,
    BaseTableComponent,
    BaseTreeComponent,
    BaseTagsInputComponent
  ],
  templateUrl: './tochuc-list.component.html',
  styleUrls: ['./tochuc-list.component.less']
})
export class ToChucListComponent implements OnChanges, OnInit {
  @Input() viewMode: 'table' | 'tree' = 'table';
  @Input() treeTableData: any[] = [];
  @Input() treeData: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() actions: TableAction[] = [];
  @Input() loading = false;
  @Input() searchFields: string[] = []; // Danh sách fields để search
  
  // Customization options
  @Input() title = 'tochuc.title';
  @Input() subtitle = 'tochuc.subtitle';
  @Input() showCreateButton = true; // Hiển thị nút "Thêm mới"
  @Input() showActions = true; // Hiển thị cột thao tác
  @Input() checkable = false; // Bật checkbox selection
  @Input() checkedKeys: string[] = []; // Checked keys cho tree
  @Input() scroll: { x?: string; y?: string } = { y: 'calc(-445px + 100vh)' };
  @Input() multiple = true; // Cho phép chọn nhiều (table view)

  @Output() viewModeChange = new EventEmitter<'table' | 'tree'>();
  @Output() createClick = new EventEmitter<void>();
  @Output() treeNodeClick = new EventEmitter<any>();
  @Output() searchTagsChange = new EventEmitter<string[]>();
  @Output() checkChange = new EventEmitter<any>(); // Emit khi checkbox change

  searchTags: string[] = [];
  filteredTreeData: any[] = [];

  ngOnChanges(): void {
    // Filter tree data khi có search tags
    this.filterTreeData();
  }

  onSearchTagsChange(tags: string[]): void {
    this.searchTags = tags;
    this.searchTagsChange.emit(tags);
    this.filterTreeData();
  }

  /**
   * Filter tree data dựa trên search tags
   * Hiển thị node nếu:
   * - Node match với bất kỳ tag nào
   * - Hoặc có child node match
   */
  private filterTreeData(): void {
    if (!this.searchTags || this.searchTags.length === 0) {
      this.filteredTreeData = this.treeData;
      return;
    }

    this.filteredTreeData = this.filterNodes(this.treeData, this.searchTags);
  }

  private filterNodes(nodes: any[], tags: string[]): any[] {
    if (!nodes || nodes.length === 0) {
      return [];
    }

    const filtered: any[] = [];

    for (const node of nodes) {
      // Check if node matches any tag
      const nodeMatches = this.nodeMatchesTags(node, tags);
      
      // Recursively filter children
      const filteredChildren = node.children ? this.filterNodes(node.children, tags) : [];
      
      // Include node if it matches or has matching children
      if (nodeMatches || filteredChildren.length > 0) {
        filtered.push({
          ...node,
          children: filteredChildren,
          expanded: filteredChildren.length > 0 // Auto expand if has matching children
        });
      }
    }

    return filtered;
  }

  private nodeMatchesTags(node: any, tags: string[]): boolean {
    if (!node.data) {
      return false;
    }

    // Check if any tag matches any search field
    return tags.some(tag => {
      const lowerTag = tag.toLowerCase();
      return this.searchFields.some(field => {
        const fieldValue = node.data[field];
        if (!fieldValue) return false;
        return String(fieldValue).toLowerCase().includes(lowerTag);
      });
    });
  }

  switchView(mode: 'table' | 'tree'): void {
    this.viewModeChange.emit(mode);
  }

  onCreateClick(): void {
    this.createClick.emit();
  }

  onTreeNodeClick(event: any): void {
    this.treeNodeClick.emit(event);
  }

  onCheckChange(event: any): void {
    this.checkChange.emit(event);
  }

  get displayColumns(): TableColumn[] {
    return this.columns;
  }

  get displayActions(): TableAction[] {
    return this.showActions ? this.actions : [];
  }

  ngOnInit(): void {
    // Component initialization
  }
}
