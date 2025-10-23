import { Star } from 'lucide-react';
import { useState } from 'react';
import { Language } from '../../types/chat';
import { getTranslation } from '../../utils/i18n';

interface FeedbackRatingProps {
  messageId: string;
  currentRating?: 1 | 2 | 3 | 4 | 5;
  language: Language;
  onRate: (messageId: string, rating: 1 | 2 | 3 | 4 | 5) => void;
}

export default function FeedbackRating({ messageId, currentRating, language, onRate }: FeedbackRatingProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleRate = (rating: 1 | 2 | 3 | 4 | 5) => {
    onRate(messageId, rating);
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 2000);
  };

  if (showThankYou) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 animate-fade-in">
        <span>✓</span>
        <span>{getTranslation(language, 'feedbackThankYou')}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-600">
        {getTranslation(language, 'rateThisAnswer')}:
      </span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((rating) => {
          const isActive = currentRating && rating <= currentRating;
          const isHovered = hoveredRating !== null && rating <= hoveredRating;
          
          return (
            <button
              key={rating}
              onClick={() => handleRate(rating as 1 | 2 | 3 | 4 | 5)}
              onMouseEnter={() => setHoveredRating(rating)}
              onMouseLeave={() => setHoveredRating(null)}
              className="p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 rounded"
              aria-label={`${language === 'en' ? 'Rate' : language === 'fil' ? 'I-rate' : 'I-rate'} ${rating} ${language === 'en' ? 'stars' : language === 'fil' ? 'bituin' : 'bituon'}`}
            >
              <Star
                size={16}
                className={`transition-colors ${
                  isActive || isHovered
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-slate-300 hover:text-yellow-300'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
