import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { IdasSearchComponent, IdasTagsInputComponent } from '@app/shared/components';

@Component({
  selector: 'app-search-tags-demo',
  standalone: true,
  imports: [CommonModule, NzCardModule, IdasSearchComponent, IdasTagsInputComponent],
  templateUrl: './search-tags-demo.component.html',
  styleUrl: './search-tags-demo.component.less'
})
export class SearchTagsDemoComponent {
  searchTags: string[] = [];

  onSearchChange(keyword: string): void {
    console.log('Search:', keyword);
  }

  onTagsChange(tags: string[]): void {
    console.log('Tags:', tags);
  }
}
