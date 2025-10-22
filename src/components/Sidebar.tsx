import { MessageSquare, Plus, Settings, User, Clock } from 'lucide-react';
import { Conversation, Language } from '../types/chat';
import { getTranslation } from '../utils/i18n';

interface SidebarProps {
  language: Language;
  conversations: Conversation[];
  currentConversationId: string | null;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  language,
  conversations,
  currentConversationId,
  onNewChat,
  onSelectConversation,
  isOpen,
  onClose
}: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-100 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-slate-800">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors duration-200 font-medium"
          >
            <Plus size={20} />
            {getTranslation(language, 'newChat')}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            {getTranslation(language, 'conversations')}
          </h2>

          <div className="space-y-2">
            {conversations.length === 0 ? (
              <p className="text-sm text-slate-500 italic py-4 text-center">
                {language === 'en' ? 'No conversations yet' : 'Wala pang mga pag-uusap'}
              </p>
            ) : (
              conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    currentConversationId === conv.id
                      ? 'bg-slate-800 text-white'
                      : 'hover:bg-slate-800/50 text-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <MessageSquare size={16} className="mt-1 flex-shrink-0 text-sky-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{conv.title}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{conv.lastMessage}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-slate-600">
                        <Clock size={12} />
                        {new Date(conv.timestamp).toLocaleDateString(language === 'en' ? 'en-US' : 'fil-PH')}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-800 rounded-lg transition-colors duration-200 text-sm">
            <Settings size={18} />
            {getTranslation(language, 'settings')}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-800 rounded-lg transition-colors duration-200 text-sm">
            <User size={18} />
            {getTranslation(language, 'profile')}
          </button>
        </div>
      </aside>
    </>
  );
}
