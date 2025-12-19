import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService, Language } from '../../../../core/services/i18n.service';
import { LanguageLabelPipe } from '@app/shared/pipes';

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
    TranslateModule,
    LanguageLabelPipe,
  ],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  readonly i18nService = inject(I18nService);

  changeLanguage(lang: Language): void {
    this.i18nService.changeLanguage(lang);
  }
}
