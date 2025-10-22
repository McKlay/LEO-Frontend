export type Language = 'en' | 'fil' | 'ceb';

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fil', name: 'Filipino', nativeName: 'Filipino' },
  { code: 'ceb', name: 'Cebuano', nativeName: 'Bisaya' }
];
