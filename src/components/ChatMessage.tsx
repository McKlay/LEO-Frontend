import { User, Bot, ChevronDown, ChevronUp, ExternalLink, BookOpen, Flag } from 'lucide-react';
import { Message, Language } from '../types/chat';
import { getTranslation } from '../utils/i18n';
import { useState } from 'react';
import ContactModal from './Common/ContactModal';
import FormModal from './Common/FormModal';
import FeedbackRating from './Common/FeedbackRating';
import FlagModal from './Common/FlagModal';
import { COMMON_ACTIONS } from '../types/actions';
import type { ContactActionData, FormActionData } from '../types/actions';
import { getRelatedResources, getCitationShortRef, isValidUrl } from '../services/utils/citationUtils';

interface ChatMessageProps {
  message: Message;
  language: Language;
  conversationId: string;
  onRateMessage: (messageId: string, rating: 1 | 2 | 3 | 4 | 5) => void;
  onFlagMessage: (messageId: string, reason: string, details: string) => void;
}

export default function ChatMessage({ message, language, conversationId, onRateMessage, onFlagMessage }: ChatMessageProps) {
  const [showCitations, setShowCitations] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [activeContactData, setActiveContactData] = useState<ContactActionData | null>(null);
  const [activeFormData, setActiveFormData] = useState<FormActionData | null>(null);
  const isUser = message.role === 'user';

  const handleActionClick = (suggestion: string) => {
    // Map suggestion text to common actions
    const lowerSuggestion = suggestion.toLowerCase();
    
    if (lowerSuggestion.includes('dole') || lowerSuggestion.includes('contact')) {
      setActiveContactData(COMMON_ACTIONS.CONTACT_DOLE[language].data as ContactActionData);
      setShowContactModal(true);
    } else if (lowerSuggestion.includes('sena') || lowerSuggestion.includes('file')) {
      setActiveFormData(COMMON_ACTIONS.FILE_SENA[language].data as FormActionData);
      setShowFormModal(true);
    } else if (lowerSuggestion.includes('lawyer') || lowerSuggestion.includes('abogado')) {
      window.open(COMMON_ACTIONS.FIND_LAWYER[language].data.url, '_blank');
    }
  };

  return (
    <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-lg">
          <Bot size={20} className="text-white" />
        </div>
      )}

      <div className={`flex-1 max-w-3xl ${isUser ? 'flex justify-end' : ''}`}>
        <div
          className={`rounded-2xl px-5 py-3.5 shadow-sm ${
            isUser
              ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-white'
              : 'bg-white border border-slate-200'
          }`}
        >
          <p className={`text-sm leading-relaxed whitespace-pre-wrap ${isUser ? 'text-white' : 'text-slate-800'}`}>
            {message.content}
          </p>

          {message.citations && message.citations.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <button
                onClick={() => setShowCitations(!showCitations)}
                className="flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors"
              >
                {showCitations ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {getTranslation(language, 'citations')} ({message.citations.length})
              </button>

              {showCitations && (
                <div className="mt-3 space-y-3">
                  {message.citations.map((citation) => {
                    const relatedResources = getRelatedResources(citation);
                    const shortRef = getCitationShortRef(citation);

                    return (
                      <div
                        key={citation.id}
                        className="text-xs bg-slate-50 rounded-lg p-3 border border-slate-200 hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <p className="font-semibold text-slate-700">{citation.source}</p>
                          {shortRef && (
                            <span className="text-xs font-mono text-slate-500 bg-slate-200 px-2 py-0.5 rounded">
                              {shortRef}
                            </span>
                          )}
                        </div>
                        
                        {citation.article && (
                          <p className="text-slate-600 font-medium mb-1.5">{citation.article}</p>
                        )}
                        
                        <p className="text-slate-600 italic leading-relaxed">{citation.text}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {citation.url && isValidUrl(citation.url) && (
                            <a
                              href={citation.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-md font-medium transition-colors text-xs"
                            >
                              <ExternalLink size={12} />
                              {language === 'en' ? 'View Source' : language === 'fil' ? 'Tingnan ang Sanggunian' : 'Tan-awa ang Tinubdan'}
                            </a>
                          )}
                          
                          {relatedResources.length > 0 && (
                            <button
                              onClick={() => {
                                // Open all related resources in new tabs
                                relatedResources.forEach(resource => {
                                  window.open(resource.url, '_blank');
                                });
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md font-medium transition-colors text-xs"
                              title={relatedResources.map(r => r.title).join(', ')}
                            >
                              <BookOpen size={12} />
                              {language === 'en' ? `Related (${relatedResources.length})` : language === 'fil' ? `Kaugnay (${relatedResources.length})` : `Kalabot (${relatedResources.length})`}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {message.suggestions && message.suggestions.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs font-medium text-slate-600 mb-2">
                {getTranslation(language, 'suggestedActions')}
              </p>
              <div className="flex flex-wrap gap-2">
                {message.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleActionClick(suggestion)}
                    className="text-xs px-3 py-1.5 bg-sky-50 text-sky-700 rounded-full hover:bg-sky-100 transition-colors font-medium hover:shadow-md"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs mt-2 opacity-60">
            {new Date(message.timestamp).toLocaleTimeString(language === 'en' ? 'en-US' : 'fil-PH', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>

          {/* Feedback Section - Only for bot messages */}
          {!isUser && (
            <div className="mt-4 pt-3 border-t border-slate-200 space-y-3">
              {/* Rating */}
              <FeedbackRating
                messageId={message.id}
                currentRating={message.feedback?.rating}
                language={language}
                onRate={onRateMessage}
              />

              {/* Flag Button */}
              <div className="flex items-center gap-2">
                {message.feedback?.flagged ? (
                  <div className="flex items-center gap-1.5 text-xs text-amber-600">
                    <Flag size={14} className="fill-amber-600" />
                    <span className="font-medium">{getTranslation(language, 'flagged')}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowFlagModal(true)}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-600 transition-colors group"
                  >
                    <Flag size={14} className="group-hover:fill-amber-100 transition-all" />
                    <span>{getTranslation(language, 'flagIncorrect')}</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-lg">
          <User size={20} className="text-white" />
        </div>
      )}

      {/* Modals */}
      {activeContactData && (
        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          contact={activeContactData}
          language={language}
        />
      )}

      {activeFormData && (
        <FormModal
          isOpen={showFormModal}
          onClose={() => setShowFormModal(false)}
          formData={activeFormData}
          language={language}
        />
      )}

      {/* Flag Modal */}
      <FlagModal
        isOpen={showFlagModal}
        onClose={() => setShowFlagModal(false)}
        onSubmit={(reason, details) => onFlagMessage(message.id, reason, details)}
        language={language}
      />
    </div>
  );
}
