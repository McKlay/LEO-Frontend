import { X, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Language } from '../../types/chat';
import { getTranslation } from '../../utils/i18n';

interface FlagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, details: string) => void;
  language: Language;
}

export default function FlagModal({ isOpen, onClose, onSubmit, language }: FlagModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [additionalDetails, setAdditionalDetails] = useState<string>('');

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const reasons = [
    'flagReasonIncorrectLaw',
    'flagReasonMisleading',
    'flagReasonNotClear',
    'flagReasonOther'
  ];

  const handleSubmit = () => {
    if (selectedReason) {
      const reasonText = getTranslation(language, selectedReason as keyof typeof import('../../utils/i18n').translations.en);
      onSubmit(reasonText, additionalDetails);
      setSelectedReason('');
      setAdditionalDetails('');
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedReason('');
    setAdditionalDetails('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="flag-modal-title"
        aria-modal="true"
      >
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-amber-600" size={20} />
            <h2 id="flag-modal-title" className="text-lg font-semibold text-slate-900">
              {getTranslation(language, 'flagIncorrect')}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
            aria-label={language === 'en' ? 'Close' : language === 'fil' ? 'Isara' : 'Sirado'}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              {getTranslation(language, 'flagReason')}
            </label>
            <div className="space-y-2">
              {reasons.map((reason) => (
                <label
                  key={reason}
                  className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedReason === reason
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="flagReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="mt-0.5 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-slate-700 flex-1">
                    {getTranslation(language, reason as keyof typeof import('../../utils/i18n').translations.en)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="additional-details" className="block text-sm font-medium text-slate-700 mb-2">
              {getTranslation(language, 'additionalDetails')}
            </label>
            <textarea
              id="additional-details"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-sm"
              placeholder={
                language === 'en' 
                  ? 'Please provide more details about the issue...' 
                  : language === 'fil'
                  ? 'Mangyaring magbigay ng karagdagang detalye tungkol sa isyu...'
                  : 'Palihug paghatag og dugang nga detalye bahin sa isyu...'
              }
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-slate-50 px-6 py-4 flex gap-3 border-t border-slate-200">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition-colors"
          >
            {getTranslation(language, 'cancelFlag')}
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedReason}
            className="flex-1 px-4 py-2.5 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-600"
          >
            {getTranslation(language, 'submitFlag')}
          </button>
        </div>
      </div>
    </div>
  );
}
