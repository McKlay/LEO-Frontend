import { X, Type, Eye, Zap, Keyboard } from 'lucide-react';
import { Language } from '../../types/chat';
import { getTranslation } from '../../utils/i18n';
import { useAccessibility, FontSize } from '../../context/AccessibilityContext';

interface AccessibilitySettingsProps {
  language: Language;
  onClose: () => void;
}

export default function AccessibilitySettings({ language, onClose }: AccessibilitySettingsProps) {
  const { settings, setFontSize, toggleHighContrast, toggleReducedMotion, toggleKeyboardShortcuts } = useAccessibility();

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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="accessibility-title">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 id="accessibility-title" className="text-xl font-bold text-slate-800">
            {language === 'en' ? 'Accessibility Settings' : language === 'fil' ? 'Mga Setting ng Accessibility' : 'Mga Setting sa Accessibility'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label={language === 'en' ? 'Close settings' : language === 'fil' ? 'Isara ang settings' : 'Sirad-i ang settings'}
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
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
      </div>
    </div>
  );
}
