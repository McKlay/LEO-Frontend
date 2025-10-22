import { MessageSquare, Plus, Settings, User, Clock, Archive as ArchiveIcon } from 'lucide-react';
import { useState } from 'react';
import { Conversation, Language } from '../types/chat';
import { getTranslation } from '../utils/i18n';
import SearchBar from './Common/SearchBar';
import ConversationMenu from './Common/ConversationMenu';

interface SidebarProps {
  language: Language;
  conversations: Conversation[];
  currentConversationId: string | null;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onRenameConversation: (id: string, newTitle: string) => void;
  onArchiveConversation: (id: string, archived: boolean) => void;
  onDeleteConversation: (id: string) => void;
  onExportConversation: (id: string, format: 'txt') => void;
  showArchived: boolean;
  onToggleArchived: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  language,
  conversations,
  currentConversationId,
  onNewChat,
  onSelectConversation,
  onRenameConversation,
  onArchiveConversation,
  onDeleteConversation,
  onExportConversation,
  showArchived,
  onToggleArchived,
  isOpen,
  onClose
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Conversation[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = conversations.filter(conv => {
        const matchesQuery = 
          conv.title.toLowerCase().includes(query.toLowerCase()) ||
          conv.lastMessage.toLowerCase().includes(query.toLowerCase());
        const matchesArchiveFilter = showArchived || !conv.archived;
        return matchesQuery && matchesArchiveFilter;
      });
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  // Get the conversations to display
  const displayConversations = searchQuery.trim() 
    ? searchResults 
    : conversations.filter(conv => showArchived || !conv.archived);

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
        <div className="p-4 border-b border-slate-800 space-y-3">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors duration-200 font-medium"
          >
            <Plus size={20} />
            {getTranslation(language, 'newChat')}
          </button>

          <SearchBar language={language} onSearch={handleSearch} />
          
          <button
            onClick={onToggleArchived}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 text-sm ${
              showArchived 
                ? 'bg-slate-800 text-sky-400' 
                : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <ArchiveIcon size={16} />
            {showArchived 
              ? getTranslation(language, 'hideArchived') 
              : getTranslation(language, 'showArchived')
            }
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            {getTranslation(language, 'conversations')}
          </h2>

          <div className="space-y-2">
            {displayConversations.length === 0 ? (
              <p className="text-sm text-slate-500 italic py-4 text-center">
                {searchQuery.trim() 
                  ? getTranslation(language, 'noSearchResults')
                  : getTranslation(language, 'noConversations')
                }
              </p>
            ) : (
              displayConversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`group relative rounded-lg transition-all duration-200 ${
                    currentConversationId === conv.id
                      ? 'bg-slate-800'
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  <button
                    onClick={() => onSelectConversation(conv.id)}
                    className="w-full text-left px-3 py-2.5 pr-10"
                  >
                    <div className="flex items-start gap-2">
                      <MessageSquare 
                        size={16} 
                        className={`mt-1 flex-shrink-0 ${conv.archived ? 'text-slate-500' : 'text-sky-400'}`} 
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${conv.archived ? 'text-slate-400' : 'text-slate-100'}`}>
                          {conv.title}
                          {conv.archived && (
                            <span className="ml-2 text-xs text-slate-500">
                              ({getTranslation(language, 'archived')})
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{conv.lastMessage}</p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-slate-600">
                          <Clock size={12} />
                          {new Date(conv.timestamp).toLocaleDateString(language === 'en' ? 'en-US' : 'fil-PH')}
                        </div>
                      </div>
                    </div>
                  </button>

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <ConversationMenu
                      conversationId={conv.id}
                      conversationTitle={conv.title}
                      isArchived={conv.archived}
                      language={language}
                      onRename={onRenameConversation}
                      onArchive={onArchiveConversation}
                      onDelete={onDeleteConversation}
                      onExport={onExportConversation}
                    />
                  </div>
                </div>
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
