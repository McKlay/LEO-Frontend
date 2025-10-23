import { Menu, Scale, Globe, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Language } from '../types/chat';
import { getTranslation } from '../utils/i18n';
import { SUPPORTED_LANGUAGES } from '../types/language';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onMenuToggle: () => void;
}

export default function Header({ language, onLanguageChange, onMenuToggle }: HeaderProps) {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };

    if (showLanguageMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguageMenu]);

  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === language);

  const handleLanguageSelect = (lang: Language) => {
    onLanguageChange(lang);
    setShowLanguageMenu(false);
  };

  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 shadow-sm" role="banner">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} className="text-slate-700" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-md">
              <Scale size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">
                {getTranslation(language, 'appTitle')}
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                {getTranslation(language, 'appSubtitle')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 relative" ref={menuRef}>
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-sm font-medium text-slate-700"
            aria-label={language === 'en' ? 'Change language' : language === 'fil' ? 'Palitan ang wika' : 'Usba ang pinulongan'}
            aria-expanded={showLanguageMenu}
            aria-haspopup="true"
          >
            <Globe size={18} />
            <span className="hidden sm:inline">
              {currentLanguage?.nativeName}
            </span>
            <span className="sm:hidden uppercase">
              {language}
            </span>
            <ChevronDown size={16} className={`transition-transform ${showLanguageMenu ? 'rotate-180' : ''}`} />
          </button>

          {showLanguageMenu && (
            <div 
              className="absolute top-full right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[140px] z-50"
              role="menu"
              aria-label={language === 'en' ? 'Language selection' : language === 'fil' ? 'Pagpili ng wika' : 'Pagpili sa pinulongan'}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 transition-colors ${
                    language === lang.code ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700'
                  }`}
                  role="menuitem"
                  aria-current={language === lang.code ? 'true' : 'false'}
                >
                  <div className="flex items-center justify-between">
                    <span>{lang.nativeName}</span>
                    {language === lang.code && (
                      <span className="text-sky-600" aria-hidden="true">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
