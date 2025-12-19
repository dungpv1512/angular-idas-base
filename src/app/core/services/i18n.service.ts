import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Language = 'vi' | 'en' | 'ja';

/**
 * I18n Service - Quản lý đa ngôn ngữ
 * Hỗ trợ 3 ngôn ngữ: Tiếng Việt, English, 日本語
 */
@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private translate = inject(TranslateService);
  
  // Signal để track current language
  private currentLang = signal<Language>('vi');
  
  // Expose readonly signal
  language = this.currentLang.asReadonly();

  // Available languages - 3 ngôn ngữ: vi, en, ja
  readonly availableLanguages: { code: Language; label: string }[] = [
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' }
  ];

  constructor() {
    this.initLanguage();
  }

  /**
   * Initialize language from localStorage or default
   */
  private initLanguage(): void {
    const savedLang = localStorage.getItem('app-language') as Language;
    const defaultLang: Language = savedLang || 'vi';
    
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
    this.currentLang.set(defaultLang);
  }

  /**
   * Change language
   */
  changeLanguage(lang: Language): void {
    this.translate.use(lang);
    this.currentLang.set(lang);
    localStorage.setItem('app-language', lang);
  }

  /**
   * Get current language
   */
  getCurrentLanguage(): Language {
    return this.currentLang();
  }

  /**
   * Translate instant
   */
  instant(key: string, params?: any): string {
    return this.translate.instant(key, params);
  }
}
