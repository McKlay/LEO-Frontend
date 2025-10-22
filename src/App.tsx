import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { LanguageProvider } from './context/LanguageContext';
import { ChatProvider } from './context/ChatContext';
import { UIProvider } from './context/UIContext';
import { useLanguage } from './hooks/useLanguage';
import { useChat } from './hooks/useChat';
import { useUI } from './hooks/useUI';
import { Bot } from 'lucide-react';

function ChatInterface() {
  const { language, setLanguage } = useLanguage();
  const { 
    messages, 
    conversations, 
    currentConversationId, 
    isTyping, 
    showArchived,
    sendMessage, 
    createNewConversation, 
    selectConversation,
    deleteConversation,
    renameConversation,
    archiveConversation,
    exportConversation,
    toggleShowArchived
  } = useChat();
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useUI();

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        language={language}
        conversations={conversations}
        currentConversationId={currentConversationId}
        onNewChat={createNewConversation}
        onSelectConversation={selectConversation}
        onRenameConversation={renameConversation}
        onArchiveConversation={archiveConversation}
        onDeleteConversation={deleteConversation}
        onExportConversation={exportConversation}
        showArchived={showArchived}
        onToggleArchived={toggleShowArchived}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          language={language}
          onLanguageChange={setLanguage}
          onMenuToggle={toggleSidebar}
        />

        <main className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <WelcomeScreen language={language} onSelectQuestion={sendMessage} />
          ) : (
            <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} language={language} />
              ))}

              {isTyping && (
                <div className="flex gap-4 justify-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-lg">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3.5 shadow-sm">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        <ChatInput
          language={language}
          onSendMessage={sendMessage}
          disabled={isTyping}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <UIProvider>
        <ChatProviderWrapper />
      </UIProvider>
    </LanguageProvider>
  );
}

function ChatProviderWrapper() {
  const { language } = useLanguage();
  
  return (
    <ChatProvider language={language}>
      <ChatInterface />
    </ChatProvider>
  );
}

export default App;

