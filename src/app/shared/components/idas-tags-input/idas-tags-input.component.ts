import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { TagsSearchResult } from '@app/shared/components/types/tags-search-result.model';

/**
 * IDAS Tags Input Component
 * Input với tags để search nhiều giá trị
 * 
 * @example
 * <app-idas-tags-input
 *   [(tags)]="searchTags"
 *   [searchFields]="['TenToChuc', 'MaToChuc']"
 *   [placeholder]="'Nhập và Enter để thêm...'"
 *   [debounceTime]="500"
 *   (tagsChange)="onTagsChange($event)"
 * />
 */
@Component({
  selector: 'app-idas-tags-input',
  standalone: true,
  imports: [CommonModule, FormsModule, NzTagModule, NzInputModule, NzIconModule],
  templateUrl: './idas-tags-input.component.html',
  styleUrl: './idas-tags-input.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdasTagsInputComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tags: string[] = [];
  @Input() placeholder = 'Nhập và Enter để thêm...';
  @Input() debounceTime = 500;
  @Input() prefixIcon = 'search';
  @Input() showClearButton = true;
  @Input() showCount = true;
  @Input() disabled = false;
  @Input() tagColor = 'blue';
  @Input() maxTags = 10;
  @Input() minTagLength = 1;
  @Input() searchFields: string[] = [];

  @Output() tagsChange = new EventEmitter<string[]>();
  @Output() search = new EventEmitter<TagsSearchResult>();

  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  inputValue = '';
  isFocused = false;

  private searchSubject = new Subject<string[]>();
  private destroy$ = new Subject<void>();

  constructor() {
    // Setup debounce search
    this.searchSubject
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((tags) => {
        this.search.emit({
          tags,
          fields: this.searchFields
        });
      });
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  ngOnChanges(): void {
    // Handle input changes if needed
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addTag(): void {
    const value = this.inputValue.trim();

    if (!value || value.length < this.minTagLength) {
      return;
    }

    if (this.tags.length >= this.maxTags) {
      return;
    }

    if (this.tags.includes(value)) {
      this.inputValue = '';
      return;
    }

    const newTags = [...this.tags, value];
    this.tags = newTags;
    this.inputValue = '';
    this.tagsChange.emit(newTags);
    this.searchSubject.next(newTags);
  }

  removeTag(index: number): void {
    const newTags = this.tags.filter((_, i) => i !== index);
    this.tags = newTags;
    this.tagsChange.emit(newTags);
    this.searchSubject.next(newTags);
  }

  clearAll(): void {
    this.tags = [];
    this.inputValue = '';
    this.tagsChange.emit([]);
    this.searchSubject.next([]);
  }

  onBackspace(): void {
    if (this.inputValue === '' && this.tags.length > 0) {
      this.removeTag(this.tags.length - 1);
    }
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
    // Tự động thêm tag khi blur nếu có giá trị
    if (this.inputValue.trim()) {
      this.addTag();
    }
  }
}
