import { Scale, MessageCircle } from 'lucide-react';
import { Language } from '../types/chat';
import { getTranslation, getTranslationArray } from '../utils/i18n';

interface WelcomeScreenProps {
  language: Language;
  onSelectQuestion: (question: string) => void;
}

export default function WelcomeScreen({ language, onSelectQuestion }: WelcomeScreenProps) {
  const exampleQuestions = getTranslationArray(language, 'exampleQuestions');

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 shadow-xl mb-4">
          <Scale size={40} className="text-white" />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            LEO
          </h1>
          <p className="text-lg text-slate-600">
            Legal Employment Officer
          </p>
        </div>

        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 text-left">
          <div className="flex items-start gap-3">
            <MessageCircle size={24} className="text-sky-600 flex-shrink-0 mt-1" />
            <p className="text-slate-700 leading-relaxed">
              {getTranslation(language, 'welcomeMessage')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {exampleQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => onSelectQuestion(question)}
              className="text-left p-4 bg-white border border-slate-200 rounded-xl hover:border-sky-400 hover:shadow-md transition-all duration-200 group"
            >
              <p className="text-sm text-slate-700 group-hover:text-sky-700">
                {question}
              </p>
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 space-y-1 max-w-2xl mx-auto">
          <p className="flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-sky-500"></span>
            {getTranslation(language, 'disclaimer')}
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-sky-500"></span>
            {getTranslation(language, 'privacyNotice')}
          </p>
        </div>
      </div>
    </div>
  );
}
