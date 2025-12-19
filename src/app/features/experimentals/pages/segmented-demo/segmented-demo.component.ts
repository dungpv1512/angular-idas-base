import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IdasSegmentedComponent, SegmentedOption, IdasCardComponent } from '@app/shared/components';

/**
 * Demo component cho IdasSegmented
 */
@Component({
  selector: 'app-segmented-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, IdasSegmentedComponent, IdasCardComponent],
  templateUrl: './segmented-demo.component.html',
  styleUrl: './segmented-demo.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmentedDemoComponent {
  /** Giá trị được chọn */
  readonly selectedValue = signal<string | number>('list');
  readonly selectedSize = signal<string>('default');

  /** Options cơ bản */
  readonly basicOptions: SegmentedOption[] = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  /** Options với icon */
  readonly iconOptions: SegmentedOption[] = [
    { value: 'list', label: 'List', icon: 'unordered-list' },
    { value: 'kanban', label: 'Kanban', icon: 'appstore' },
    { value: 'chart', label: 'Chart', icon: 'bar-chart' }
  ];

  /** Options cho size */
  readonly sizeOptions: SegmentedOption[] = [
    { value: 'small', label: 'Small' },
    { value: 'default', label: 'Default' },
    { value: 'large', label: 'Large' }
  ];

  /** Options với disabled */
  readonly disabledOptions: SegmentedOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2', disabled: true },
    { value: 'option3', label: 'Option 3' }
  ];

  onValueChange(value: string | number): void {
    this.selectedValue.set(value);
  }

  onSizeChange(value: string | number): void {
    this.selectedSize.set(value as string);
  }
}
