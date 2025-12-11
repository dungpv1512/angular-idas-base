import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService, Language } from '../../core/services/i18n.service';

/**
 * Language Switcher Component
 * Component chuyển đổi ngôn ngữ (Tiếng Việt / English)
 * 
 * @example
 * // Trong template
 * <app-language-switcher />
 */
@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    CommonModule,
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    TranslateModule
  ],
  template: `
    <button 
      nz-button 
      nzType="text"
      nz-dropdown 
      [nzDropdownMenu]="menu"
      nzPlacement="bottomRight"
      class="language-switcher"
    >
      <span nz-icon nzType="global" nzTheme="outline"></span>
      <span class="language-label">{{ getCurrentLanguageLabel() }}</span>
      <span nz-icon nzType="down" nzTheme="outline"></span>
    </button>

    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        @for (lang of i18nService.availableLanguages; track lang.code) {
          <li 
            nz-menu-item 
            [class.active]="lang.code === i18nService.language()"
            (click)="changeLanguage(lang.code)"
          >
            <span nz-icon 
              [nzType]="lang.code === i18nService.language() ? 'check' : ''" 
              nzTheme="outline"
              class="check-icon"
            ></span>
            {{ lang.label }}
          </li>
        }
      </ul>
    </nz-dropdown-menu>
  `,
  styles: [`
    .language-switcher {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 12px;
      height: 40px;
      border-radius: 4px;
      transition: all 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.04);
      }

      .language-label {
        font-size: 14px;
      }
    }

    :host ::ng-deep {
      .ant-dropdown-menu-item {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 150px;

        &.active {
          background: #e6f7ff;
          color: #1890ff;
        }

        .check-icon {
          width: 16px;
          display: inline-flex;
          justify-content: center;
        }
      }
    }
  `]
})
export class LanguageSwitcherComponent {
  i18nService = inject(I18nService);

  changeLanguage(lang: Language): void {
    this.i18nService.changeLanguage(lang);
  }

  getCurrentLanguageLabel(): string {
    const current = this.i18nService.language();
    const lang = this.i18nService.availableLanguages.find(l => l.code === current);
    return lang?.label || 'Tiếng Việt';
  }
}
