import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService, Language } from '@app/core/services/i18n.service';

/**
 * Pipe để lấy label của ngôn ngữ hiện tại
 * Sử dụng thay vì gọi hàm trực tiếp trong template
 *
 * @example
 * // Trong template
 * {{ currentLang | languageLabel }}
 */
@Pipe({
  name: 'languageLabel',
  standalone: true,
  pure: false, // Cần pure: false để cập nhật khi ngôn ngữ thay đổi
})
export class LanguageLabelPipe implements PipeTransform {
  private readonly i18nService = inject(I18nService);

  transform(langCode: Language | null): string {
    const code = langCode || this.i18nService.language();
    const lang = this.i18nService.availableLanguages.find(
      (l) => l.code === code
    );
    return lang?.label || 'Tiếng Việt';
  }
}
