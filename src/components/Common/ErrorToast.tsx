import { AlertCircle, X, RefreshCw } from 'lucide-react';
import { AppError } from '../../services/utils/errorHandler';
import { Language } from '../../types/chat';
import { getErrorMessage, getRetryText, getDismissText, isRetryable } from '../../services/utils/errorHandler';

interface ErrorToastProps {
  error: AppError;
  language: Language;
  onRetry?: () => void;
  onDismiss: () => void;
}

export default function ErrorToast({ error, language, onRetry, onDismiss }: ErrorToastProps) {
  const message = getErrorMessage(error, language);
  const retryText = getRetryText(language);
  const dismissText = getDismissText(language);
  const canRetry = isRetryable(error) && onRetry;

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-white border-l-4 border-red-500 rounded-lg shadow-xl p-4 animate-in slide-in-from-bottom-5 duration-300 z-50">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle size={18} className="text-red-600" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 mb-1">
            {language === 'en' ? 'Error' : language === 'fil' ? 'May Mali' : 'Sayop'}
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            {message}
          </p>

          {process.env.NODE_ENV === 'development' && error.originalError && (
            <details className="mt-2">
              <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-700">
                Technical Details
              </summary>
              <pre className="text-xs text-red-600 mt-1 overflow-auto max-h-20">
                {error.originalError.message}
              </pre>
            </details>
          )}

          <div className="flex gap-2 mt-3">
            {canRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium rounded-md transition-colors"
              >
                <RefreshCw size={14} />
                {retryText}
              </button>
            )}
            
            <button
              onClick={onDismiss}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md transition-colors"
            >
              {dismissText}
            </button>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="flex-shrink-0 p-1 hover:bg-slate-100 rounded transition-colors"
          aria-label="Close"
        >
          <X size={16} className="text-slate-400" />
        </button>
      </div>
    </div>
  );
}
