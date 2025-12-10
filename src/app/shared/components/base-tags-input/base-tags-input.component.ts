import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

export interface TagsSearchResult {
  tags: string[];
  fields?: string[];
}

/**
 * Base Tags Input Component - Input với tags để search nhiều giá trị
 * 
 * @example
 * <app-base-tags-input
 *   [(tags)]="searchTags"
 *   [searchFields]="['TenToChuc', 'MaToChuc']"
 *   [placeholder]="'Nhập và Enter để thêm...'"
 *   [debounceTime]="500"
 *   (tagsChange)="onTagsChange($event)"
 * />
 */
@Component({
  selector: 'app-base-tags-input',
  standalone: true,
  imports: [CommonModule, FormsModule, NzTagModule, NzInputModule, NzIconModule],
  template: `
    <div class="tags-input-container">
      <div class="tags-wrapper" [class.focused]="isFocused" [class.disabled]="disabled">
        <span nz-icon [nzType]="prefixIcon" class="prefix-icon"></span>
        
        <div class="tags-content">
          @for (tag of tags; track $index) {
            <nz-tag
              [nzMode]="'closeable'"
              (nzOnClose)="removeTag($index)"
              [nzColor]="tagColor"
            >
              {{ tag }}
            </nz-tag>
          }
          
          <input
            #inputElement
            type="text"
            class="tag-input"
            [placeholder]="tags.length === 0 ? placeholder : ''"
            [(ngModel)]="inputValue"
            (keydown.enter)="addTag()"
            (keydown.backspace)="onBackspace()"
            (focus)="onFocus()"
            (blur)="onBlur()"
            [disabled]="disabled"
          />
        </div>

        @if (showClearButton && tags.length > 0) {
          <span
            nz-icon
            nzType="close-circle"
            nzTheme="fill"
            class="clear-icon"
            (click)="clearAll()"
          ></span>
        }
      </div>
      
      @if (showCount && tags.length > 0) {
        <div class="tags-count">{{ tags.length }} giá trị</div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .tags-input-container {
        position: relative;
      }

      .tags-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 11px;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        background: #fff;
        transition: all 0.3s;
        min-height: 40px;

        &:hover:not(.disabled) {
          border-color: #4096ff;
        }

        &.focused:not(.disabled) {
          border-color: #4096ff;
          box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
        }

        &.disabled {
          background: #f5f5f5;
          cursor: not-allowed;
        }
      }

      .prefix-icon {
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        flex-shrink: 0;
      }

      .tags-content {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        align-items: center;
        min-height: 24px;
      }

      .tag-input {
        flex: 1;
        min-width: 120px;
        border: none;
        outline: none;
        background: transparent;
        font-size: 14px;
        line-height: 1.5715;
        padding: 0;

        &::placeholder {
          color: rgba(0, 0, 0, 0.25);
        }

        &:disabled {
          cursor: not-allowed;
        }
      }

      .clear-icon {
        cursor: pointer;
        color: rgba(0, 0, 0, 0.25);
        font-size: 14px;
        flex-shrink: 0;
        transition: color 0.3s;

        &:hover {
          color: rgba(0, 0, 0, 0.45);
        }
      }

      .tags-count {
        margin-top: 4px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.45);
        text-align: right;
      }

      :global {
        .ant-tag {
          margin: 0;
          display: inline-flex;
          align-items: center;
          max-width: 200px;
          
          .ant-tag-close-icon {
            margin-left: 4px;
          }
        }
      }
    `
  ]
})
export class BaseTagsInputComponent implements OnInit, OnChanges, OnDestroy {
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
      .pipe(debounceTime(this.debounceTime), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((tags) => {
        this.search.emit({
          tags,
          fields: this.searchFields
        });
      });
  }

  ngOnInit(): void {}

  ngOnChanges(): void {}

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
