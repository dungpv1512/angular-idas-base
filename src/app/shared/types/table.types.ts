import { TemplateRef } from '@angular/core';

export interface TableColumn {
  title: string;
  key: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  align?: 'left' | 'center' | 'right';
  template?: TemplateRef<any>;
}

export interface TableAction {
  label: string;
  icon?: string;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  danger?: boolean;
  confirm?: boolean;
  confirmText?: string;
  tooltipText?: string;
  onClick: (record: any) => void;
  visible?: (record: any) => boolean;
}
