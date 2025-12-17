import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { SearchResult } from '@app/shared/components/types/search-result.model';

/**
 * IDAS Search Component
 * Reusable search input với debounce
 * Hỗ trợ search nhiều giá trị bằng cách tách chuỗi theo separator
 * 
 * @example
 * // Simple search (chỉ emit string)
 * <app-idas-search
 *   [(value)]="searchText"
 *   [placeholder]="'Tìm kiếm...'"
 *   [debounceTime]="500"
 *   [size]="'large'"
 *   (search)="onSearch($event)"
 * />
 * 
 * // Multi-value search (tách theo dấu cách)
 * <app-idas-search
 *   [(value)]="searchText"
 *   [searchFields]="['TenToChuc', 'MaToChuc']"
 *   [multiValue]="true"
 *   [separator]="' '"
 *   [placeholder]="'Tìm kiếm nhiều giá trị (cách nhau bởi dấu cách)...'"
 *   (searchWithFields)="onSearchWithFields($event)"
 * />
 */
@Component({
  selector: 'app-idas-search',
  standalone: true,
  imports: [CommonModule, FormsModule, NzInputModule, NzIconModule],
  templateUrl: './idas-search.component.html',
  styleUrl: './idas-search.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasSearchComponent implements OnInit, OnChanges, OnDestroy {
  @Input() value = '';
  @Input() placeholder = 'Tìm kiếm...';
  @Input() debounceTime = 500;
  @Input() size: 'large' | 'default' | 'small' = 'default';
  @Input() showClearButton = true;
  @Input() disabled = false;
  @Input() searchFields: string[] = [];
  @Input() multiValue = false;
  @Input() separator = ' ';
  @Input() minValueLength = 1;

  @Output() valueChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();
  @Output() searchWithFields = new EventEmitter<SearchResult>();

  inputValue = '';

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor() {
    // Setup debounce search
    this.searchSubject
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((searchValue) => {
        this.search.emit(searchValue);

        // Emit với fields nếu có searchFields
        if (this.searchFields && this.searchFields.length > 0) {
          const values = this.parseSearchValues(searchValue);
          this.searchWithFields.emit({
            value: searchValue,
            values: values,
            fields: this.searchFields
          });
        }
      });
  }

  ngOnInit(): void {
    this.inputValue = this.value;
  }

  ngOnChanges(): void {
    if (this.value !== this.inputValue) {
      this.inputValue = this.value;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Parse search value thành mảng các giá trị
   * Nếu multiValue = true, tách theo separator
   * Nếu multiValue = false, trả về mảng 1 phần tử
   */
  private parseSearchValues(searchValue: string): string[] {
    if (!searchValue || !searchValue.trim()) {
      return [];
    }

    if (!this.multiValue) {
      return [searchValue.trim()];
    }

    // Tách theo separator và lọc các giá trị rỗng hoặc quá ngắn
    return searchValue
      .split(this.separator)
      .map(v => v.trim())
      .filter(v => v.length >= this.minValueLength);
  }

  onInputChange(value: string): void {
    this.valueChange.emit(value);
    this.searchSubject.next(value);
  }

  onClear(): void {
    this.inputValue = '';
    this.valueChange.emit('');
    this.search.emit('');

    // Emit clear với fields
    if (this.searchFields && this.searchFields.length > 0) {
      this.searchWithFields.emit({
        value: '',
        values: [],
        fields: this.searchFields
      });
    }
  }
}
