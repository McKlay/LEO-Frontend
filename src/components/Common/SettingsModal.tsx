import { X, User, Globe2, Eye, Zap, Keyboard, Type } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Language } from '../../types/chat';
import { useAccessibility, FontSize } from '../../context/AccessibilityContext';

interface SettingsModalProps {
  language: Language;
  onClose: () => void;
}

type SettingsTab = 'accessibility' | 'preferences' | 'about';

export default function SettingsModal({ language, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('accessibility');
  const { settings, setFontSize, toggleHighContrast, toggleReducedMotion, toggleKeyboardShortcuts } = useAccessibility();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const tabs = [
    { 
      id: 'accessibility' as SettingsTab, 
      label: language === 'en' ? 'Accessibility' : language === 'fil' ? 'Accessibility' : 'Accessibility',
      icon: Eye 
    },
    { 
      id: 'preferences' as SettingsTab, 
      label: language === 'en' ? 'Preferences' : language === 'fil' ? 'Mga Kagustuhan' : 'Mga Gusto',
      icon: Globe2 
    },
    { 
      id: 'about' as SettingsTab, 
      label: language === 'en' ? 'About' : language === 'fil' ? 'Tungkol' : 'Mahitungod',
      icon: User 
    },
  ];

  const fontSizeOptions: { value: FontSize; label: string }[] = [
    { value: 'small', label: language === 'en' ? 'Small' : language === 'fil' ? 'Maliit' : 'Gamay' },
    { value: 'medium', label: language === 'en' ? 'Medium' : language === 'fil' ? 'Katamtaman' : 'Tunga-tunga' },
    { value: 'large', label: language === 'en' ? 'Large' : language === 'fil' ? 'Malaki' : 'Dako' },
    { value: 'extra-large', label: language === 'en' ? 'Extra Large' : language === 'fil' ? 'Napaka-laki' : 'Hilabihan kadako' },
  ];

  const keyboardShortcuts = [
    { keys: 'Shift + N', description: language === 'en' ? 'New conversation' : language === 'fil' ? 'Bagong pag-uusap' : 'Bag-ong panag-istoryahanay' },
    { keys: 'Ctrl + /', description: language === 'en' ? 'Focus search' : language === 'fil' ? 'Mag-focus sa paghahanap' : 'Mag-focus sa pagpangita' },
    { keys: 'Esc', description: language === 'en' ? 'Close modal' : language === 'fil' ? 'Isara ang modal' : 'Sirad-i ang modal' },
    { keys: 'Ctrl + ,', description: language === 'en' ? 'Open settings' : language === 'fil' ? 'Buksan ang settings' : 'Ablihi ang mga setting' },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="settings-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 id="settings-title" className="text-xl font-bold text-slate-800">
            {language === 'en' ? 'Settings' : language === 'fil' ? 'Mga Setting' : 'Mga Setting'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label={language === 'en' ? 'Close settings' : language === 'fil' ? 'Isara ang settings' : 'Sirad-i ang settings'}
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 px-6">
          <nav className="flex gap-1" role="tablist">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`${tab.id}-panel`}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-sky-600 text-sky-700 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Accessibility Tab */}
          {activeTab === 'accessibility' && (
            <div id="accessibility-panel" role="tabpanel" className="space-y-6">
              {/* Font Size */}
              <section aria-labelledby="font-size-heading">
                <div className="flex items-center gap-2 mb-3">
                  <Type size={20} className="text-sky-600" />
                  <h3 id="font-size-heading" className="text-lg font-semibold text-slate-800">
                    {language === 'en' ? 'Font Size' : language === 'fil' ? 'Laki ng Font' : 'Kadako sa Font'}
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {fontSizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFontSize(option.value)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        settings.fontSize === option.value
                          ? 'border-sky-600 bg-sky-50 text-sky-700 font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                      aria-pressed={settings.fontSize === option.value}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* High Contrast Mode */}
              <section aria-labelledby="contrast-heading">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye size={20} className="text-sky-600" />
                    <h3 id="contrast-heading" className="text-lg font-semibold text-slate-800">
                      {language === 'en' ? 'High Contrast Mode' : language === 'fil' ? 'Mataas na Contrast' : 'Taas nga Contrast'}
                    </h3>
                  </div>
                  <button
                    onClick={toggleHighContrast}
                    role="switch"
                    aria-checked={settings.highContrastMode}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                      settings.highContrastMode ? 'bg-sky-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        settings.highContrastMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  {language === 'en' 
                    ? 'Increases color contrast for better visibility (WCAG AAA compliant)'
                    : language === 'fil'
                    ? 'Pinapataas ang contrast ng kulay para sa mas malinaw na paningin'
                    : 'Gipadako ang contrast sa kolor alang sa mas tin-aw nga panan-aw'}
                </p>
              </section>

              {/* Reduced Motion */}
              <section aria-labelledby="motion-heading">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap size={20} className="text-sky-600" />
                    <h3 id="motion-heading" className="text-lg font-semibold text-slate-800">
                      {language === 'en' ? 'Reduce Motion' : language === 'fil' ? 'Bawasan ang Galaw' : 'Pagkunhod sa Paglihok'}
                    </h3>
                  </div>
                  <button
                    onClick={toggleReducedMotion}
                    role="switch"
                    aria-checked={settings.reducedMotion}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                      settings.reducedMotion ? 'bg-sky-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  {language === 'en' 
                    ? 'Minimizes animations and transitions'
                    : language === 'fil'
                    ? 'Binabawasan ang mga animation at transition'
                    : 'Gikunhod ang mga animation ug transition'}
                </p>
              </section>

              {/* Keyboard Shortcuts */}
              <section aria-labelledby="keyboard-heading">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Keyboard size={20} className="text-sky-600" />
                    <h3 id="keyboard-heading" className="text-lg font-semibold text-slate-800">
                      {language === 'en' ? 'Keyboard Shortcuts' : language === 'fil' ? 'Mga Keyboard Shortcut' : 'Mga Shortcut sa Keyboard'}
                    </h3>
                  </div>
                  <button
                    onClick={toggleKeyboardShortcuts}
                    role="switch"
                    aria-checked={settings.keyboardShortcutsEnabled}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                      settings.keyboardShortcutsEnabled ? 'bg-sky-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        settings.keyboardShortcutsEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {settings.keyboardShortcutsEnabled && (
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    {keyboardShortcuts.map((shortcut, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{shortcut.description}</span>
                        <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-700 font-mono text-xs">
                          {shortcut.keys}
                        </kbd>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* WCAG Compliance Note */}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {language === 'en'
                    ? 'This application meets WCAG AAA accessibility standards with 7:1 contrast ratios, full keyboard navigation, and screen reader support.'
                    : language === 'fil'
                    ? 'Ang aplikasyong ito ay sumusunod sa WCAG AAA accessibility standards na may 7:1 contrast ratios, buong keyboard navigation, at screen reader support.'
                    : 'Kining aplikasyon nagsunod sa WCAG AAA accessibility standards nga adunay 7:1 contrast ratios, bug-os nga keyboard navigation, ug screen reader support.'}
                </p>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div id="preferences-panel" role="tabpanel" className="space-y-6">
              <div className="text-center py-12">
                <Globe2 size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {language === 'en' ? 'General Preferences' : language === 'fil' ? 'Pangkalahatang Kagustuhan' : 'Kinatibuk-ang Gusto'}
                </h3>
                <p className="text-slate-600">
                  {language === 'en'
                    ? 'Additional preferences will be available in future updates.'
                    : language === 'fil'
                    ? 'Makakakuha ng karagdagang mga kagustuhan sa mga susunod na update.'
                    : 'Makakuha og dugang nga mga gusto sa umaabot nga mga update.'}
                </p>
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div id="about-panel" role="tabpanel" className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 shadow-xl mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  LEO
                </h3>
                <p className="text-slate-600 mb-6">
                  Labor Education Online
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{language === 'en' ? 'Version' : language === 'fil' ? 'Bersyon' : 'Bersyon'}</span>
                  <span className="font-mono text-slate-800">1.0.0</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{language === 'en' ? 'Languages' : language === 'fil' ? 'Mga Wika' : 'Mga Pinulongan'}</span>
                  <span className="text-slate-800">English, Filipino, Cebuano</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{language === 'en' ? 'Accessibility' : language === 'fil' ? 'Accessibility' : 'Accessibility'}</span>
                  <span className="text-slate-800">WCAG AAA</span>
                </div>
              </div>

              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {language === 'en'
                    ? 'This is an AI tool providing general legal information only. For specific legal advice, consult a licensed attorney.'
                    : language === 'fil'
                    ? 'Ito ay isang AI tool na nagbibigay lamang ng pangkalahatang legal na impormasyon. Para sa tiyak na legal na payo, kumunsulta sa isang lisensyadong abogado.'
                    : 'Kini usa ka AI tool nga naghatag lamang sa kinatibuk-ang legal nga kasayuran. Alang sa piho nga legal nga tambag, pagkonsulta sa usa ka lisensyadong abogado.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
