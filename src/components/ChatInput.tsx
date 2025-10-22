import { Send, Paperclip, Mic } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Language } from '../types/chat';
import { getTranslation } from '../utils/i18n';

interface ChatInputProps {
  language: Language;
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ language, onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="sticky bottom-0 bg-gradient-to-t from-slate-50 to-transparent pt-4 pb-6 px-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="bg-white border border-slate-300 rounded-2xl shadow-lg overflow-hidden focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
            <div className="flex items-end gap-2 p-3">
              <button
                type="button"
                className="flex-shrink-0 p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={disabled}
                title={language === 'en' ? 'Attach file' : 'Maglakip ng file'}
              >
                <Paperclip size={20} />
              </button>

              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={getTranslation(language, 'inputPlaceholder')}
                disabled={disabled}
                rows={1}
                className="flex-1 resize-none border-none outline-none bg-transparent text-slate-800 placeholder-slate-400 text-sm py-2 max-h-[200px] disabled:opacity-50"
              />

              <button
                type="button"
                className="flex-shrink-0 p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={disabled}
                title={language === 'en' ? 'Voice input' : 'Voice input'}
              >
                <Mic size={20} />
              </button>

              <button
                type="submit"
                disabled={!message.trim() || disabled}
                className="flex-shrink-0 p-2.5 bg-gradient-to-r from-sky-600 to-sky-700 text-white rounded-lg hover:from-sky-700 hover:to-sky-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md disabled:shadow-none"
                title={getTranslation(language, 'send')}
              >
                <Send size={18} />
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-500 text-center mt-3 px-4">
            {getTranslation(language, 'disclaimer')}
          </p>
        </form>
      </div>
    </div>
  );
}
