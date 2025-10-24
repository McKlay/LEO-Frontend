import { ArrowDown } from 'lucide-react';
import { Language } from '../types/chat';

interface ScrollToBottomButtonProps {
  language: Language;
  onClick: () => void;
  unreadCount?: number;
}

/**
 * Floating button that appears when user scrolls up and there are new messages
 * Clicking it scrolls to the bottom of the chat
 */
export default function ScrollToBottomButton({ 
  language, 
  onClick, 
  unreadCount = 0 
}: ScrollToBottomButtonProps) {
  const getText = () => {
    if (unreadCount > 0) {
      return language === 'en' 
        ? `${unreadCount} new message${unreadCount > 1 ? 's' : ''}`
        : language === 'fil'
        ? `${unreadCount} bagong mensahe`
        : `${unreadCount} bag-ong mensahe`;
    }
    
    return language === 'en' 
      ? 'Scroll to bottom'
      : language === 'fil'
      ? 'Bumalik sa ibaba'
      : 'Balik sa ubos';
  };

  return (
    <div className="fixed bottom-24 right-8 z-10 animate-fade-in">
      <button
        onClick={onClick}
        className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2.5 rounded-full shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        aria-label={getText()}
      >
        <span className="text-sm font-medium">{getText()}</span>
        <ArrowDown size={18} />
      </button>
    </div>
  );
}
