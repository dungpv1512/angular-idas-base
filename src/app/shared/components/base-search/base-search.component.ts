import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

export interface SearchResult {
  value: string;
  values: string[]; // Mảng các giá trị sau khi split
  fields?: string[];
}

/**
 * Base Search Component - Reusable search input với debounce
 * Hỗ trợ search nhiều giá trị bằng cách tách chuỗi theo separator
 * 
 * @example
 * // Simple search (chỉ emit string)
 * <app-base-search
 *   [(value)]="searchText"
 *   [placeholder]="'Tìm kiếm...'"
 *   [debounceTime]="500"
 *   [size]="'large'"
 *   (search)="onSearch($event)"
 * />
 * 
 * // Multi-value search (tách theo dấu cách)
 * <app-base-search
 *   [(value)]="searchText"
 *   [searchFields]="['TenToChuc', 'MaToChuc']"
 *   [multiValue]="true"
 *   [separator]="' '"
 *   [placeholder]="'Tìm kiếm nhiều giá trị (cách nhau bởi dấu cách)...'"
 *   (searchWithFields)="onSearchWithFields($event)"
 * />
 * 
 * // Input: "phong ban 01"
 * // Output: values = ["phong", "ban", "01"]
 * // Filter: (TenToChuc contains "phong" OR MaToChuc contains "phong") 
 *       OR (TenToChuc contains "ban" OR MaToChuc contains "ban")
 *       OR (TenToChuc contains "01" OR MaToChuc contains "01")
 */
@Component({
  selector: 'app-base-search',
  standalone: true,
  imports: [CommonModule, FormsModule, NzInputModule, NzIconModule],
  template: `
    <nz-input-group [nzPrefix]="prefixTemplate" [nzSuffix]="suffixTemplate" [nzSize]="size">
      <input
        type="text"
        nz-input
        [placeholder]="placeholder"
        [(ngModel)]="inputValue"
        (ngModelChange)="onInputChange($event)"
        [disabled]="disabled"
      />
    </nz-input-group>

    <ng-template #prefixTemplate>
      <span nz-icon [nzType]="prefixIcon"></span>
    </ng-template>

    <ng-template #suffixTemplate>
      @if (showClearButton && inputValue) {
      <span
        nz-icon
        nzType="close-circle"
        nzTheme="fill"
        class="clear-icon"
        (click)="onClear()"
      ></span>
      }
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .clear-icon {
        cursor: pointer;
        color: rgba(0, 0, 0, 0.25);
        transition: color 0.3s;

        &:hover {
          color: rgba(0, 0, 0, 0.45);
        }
      }
    `
  ]
})
export class BaseSearchComponent implements OnInit, OnChanges, OnDestroy {
  @Input() value = '';
  @Input() placeholder = 'Tìm kiếm...';
  @Input() debounceTime = 500;
  @Input() size: 'large' | 'default' | 'small' = 'default';
  @Input() prefixIcon = 'search';
  @Input() showClearButton = true;
  @Input() disabled = false;
  @Input() searchFields: string[] = []; // Danh sách fields để search (OR condition)
  @Input() multiValue = false; // Bật chế độ search nhiều giá trị
  @Input() separator = ' '; // Ký tự phân tách (mặc định: dấu cách)
  @Input() minValueLength = 1; // Độ dài tối thiểu của mỗi giá trị sau khi split

  @Output() valueChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();
  @Output() searchWithFields = new EventEmitter<SearchResult>(); // Emit kèm fields và values

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
