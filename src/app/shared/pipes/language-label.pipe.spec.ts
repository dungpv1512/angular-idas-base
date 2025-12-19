import { TestBed } from '@angular/core/testing';
import { LanguageLabelPipe } from './language-label.pipe';
import { I18nService, Language } from '@app/core/services/i18n.service';
import { signal } from '@angular/core';

describe('LanguageLabelPipe', () => {
  let pipe: LanguageLabelPipe;
  let mockI18nService: jasmine.SpyObj<I18nService>;

  beforeEach(() => {
    mockI18nService = jasmine.createSpyObj('I18nService', [], {
      language: signal<Language>('vi'),
      availableLanguages: [
        { code: 'vi' as Language, label: 'Tiếng Việt' },
        { code: 'en' as Language, label: 'English' },
        { code: 'ja' as Language, label: '日本語' },
      ],
    });

    TestBed.configureTestingModule({
      providers: [
        LanguageLabelPipe,
        { provide: I18nService, useValue: mockI18nService },
      ],
    });

    pipe = TestBed.inject(LanguageLabelPipe);
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return Vietnamese label for vi code', () => {
    expect(pipe.transform('vi')).toBe('Tiếng Việt');
  });

  it('should return English label for en code', () => {
    expect(pipe.transform('en')).toBe('English');
  });

  it('should return Japanese label for ja code', () => {
    expect(pipe.transform('ja')).toBe('日本語');
  });

  it('should return default label for null', () => {
    expect(pipe.transform(null)).toBe('Tiếng Việt');
  });
});
