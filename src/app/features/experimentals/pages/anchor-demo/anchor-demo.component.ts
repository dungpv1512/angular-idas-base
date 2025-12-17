import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdasAnchorComponent } from '@shared/components';
import { AnchorLink } from '@shared/components/types';

/**
 * Anchor Demo Component - Demo component Anchor
 */
@Component({
  selector: 'app-anchor-demo',
  standalone: true,
  imports: [CommonModule, IdasAnchorComponent],
  templateUrl: './anchor-demo.component.html',
  styleUrl: './anchor-demo.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnchorDemoComponent {
  // Anchor links với nested structure
  readonly anchorLinks: AnchorLink[] = [
    { title: 'Section 1', href: '#section-1' },
    { title: 'Section 2', href: '#section-2' },
    {
      title: 'Section 3',
      href: '#section-3',
      children: [
        { title: 'Section 3.1', href: '#section-3-1' },
        { title: 'Section 3.2', href: '#section-3-2' }
      ]
    },
    { title: 'Section 4', href: '#section-4' }
  ];

  onAnchorClick(link: string): void {
    console.log('Anchor clicked:', link);
  }

  onAnchorScroll(element: HTMLElement): void {
    console.log('Scrolled to:', element);
  }
}
