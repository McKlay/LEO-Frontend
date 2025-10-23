import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import SettingsModal from './components/Common/SettingsModal';
import LiveRegion from './components/Common/LiveRegion';
import { LanguageProvider } from './context/LanguageContext';
import { ChatProvider } from './context/ChatContext';
import { UIProvider } from './context/UIContext';
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';
import { useLanguage } from './hooks/useLanguage';
import { useChat } from './hooks/useChat';
import { useUI } from './hooks/useUI';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Bot } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

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
  const { announceToScreenReader } = useAccessibility();
  const [showSettings, setShowSettings] = useState(false);
  const [screenReaderMessage, setScreenReaderMessage] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mainContentRef = useRef<HTMLElement>(null);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onNewConversation: createNewConversation,
    onFocusSearch: () => searchInputRef.current?.focus(),
    onCloseModal: () => setShowSettings(false),
    onToggleSettings: () => setShowSettings(true),
    language,
  });

  // Announce messages to screen readers
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        const announcement = language === 'en' 
          ? 'New message from assistant' 
          : language === 'fil'
          ? 'Bagong mensahe mula sa assistant'
          : 'Bag-ong mensahe gikan sa assistant';
        setScreenReaderMessage(announcement);
        announceToScreenReader(announcement);
      }
    }
  }, [messages, language, announceToScreenReader]);

  // Announce typing indicator
  useEffect(() => {
    if (isTyping) {
      const announcement = language === 'en' 
        ? 'Assistant is typing' 
        : language === 'fil'
        ? 'Nagsusulat ang assistant'
        : 'Nagsuwat ang assistant';
      setScreenReaderMessage(announcement);
      announceToScreenReader(announcement, 'polite');
    }
  }, [isTyping, language, announceToScreenReader]);

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a href="#main-content" className="skip-to-content">
        {language === 'en' ? 'Skip to main content' : language === 'fil' ? 'Tumalon sa pangunahing content' : 'Laktaw ngadto sa main content'}
      </a>

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
          searchInputRef={searchInputRef}
          onSettingsClick={() => setShowSettings(true)}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            language={language}
            onLanguageChange={setLanguage}
            onMenuToggle={toggleSidebar}
          />

          <main 
            id="main-content" 
            ref={mainContentRef}
            className="flex-1 overflow-y-auto" 
            role="main"
            aria-label={language === 'en' ? 'Chat conversation' : language === 'fil' ? 'Pag-uusap' : 'Panag-istoryahanay'}
          >
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

    {/* Settings Modal */}
    {showSettings && (
      <SettingsModal
        language={language}
        onClose={() => setShowSettings(false)}
      />
    )}

    {/* Live region for screen reader announcements */}
    <LiveRegion message={screenReaderMessage} priority="polite" />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <UIProvider>
          <ChatProviderWrapper />
        </UIProvider>
      </AccessibilityProvider>
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

