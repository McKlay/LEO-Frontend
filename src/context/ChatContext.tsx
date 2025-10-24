import { createContext, useState, ReactNode, useEffect } from 'react';
import { Message, Conversation, Language, FeedbackData } from '../types/chat';
import { chatApi } from '../services/api/chatApi';
import { conversationApi } from '../services/api/conversationApi';
import { saveFeedback } from '../services/api/feedbackApi';
import { AppError, createAppError, ErrorCode, logError } from '../services/utils/errorHandler';

interface ChatContextType {
  messages: Message[];
  conversations: Conversation[];
  currentConversationId: string | null;
  isTyping: boolean;
  error: AppError | null;
  showArchived: boolean;
  sendMessage: (content: string) => Promise<void>;
  createNewConversation: () => void;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, newTitle: string) => void;
  archiveConversation: (id: string, archived: boolean) => void;
  searchConversations: (query: string) => Conversation[];
  exportConversation: (id: string, format: 'txt') => void;
  toggleShowArchived: () => void;
  clearError: () => void;
  rateMessage: (messageId: string, rating: 1 | 2 | 3 | 4 | 5) => void;
  flagMessage: (messageId: string, reason: string, details: string) => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
  language: Language;
}

export const ChatProvider = ({ children, language }: ChatProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  const clearError = () => {
    setError(null);
  };

  const toggleShowArchived = () => {
    setShowArchived(prev => !prev);
  };

  // Load conversations and current conversation on mount
  useEffect(() => {
    const loadedConversations = conversationApi.getAllConversations();
    setConversations(loadedConversations);

    const currentId = conversationApi.getCurrentConversationId();
    if (currentId) {
      setCurrentConversationId(currentId);
      const loadedMessages = conversationApi.loadConversation(currentId);
      setMessages(loadedMessages);
    }
  }, []);

  // Save messages whenever they change
  useEffect(() => {
    if (currentConversationId && messages.length > 0) {
      conversationApi.saveConversation(currentConversationId, messages);
    }
  }, [messages, currentConversationId]);

  const sendMessage = async (content: string) => {
    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Call API to get assistant response (currently mocked)
      const response = await chatApi.sendMessage(content, language);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        citations: response.citations,
        suggestions: response.suggestions
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Create or update conversation
      if (!currentConversationId) {
        const newConv: Conversation = {
          id: Date.now().toString(),
          title: conversationApi.generateTitle(content, language),
          lastMessage: response.content.slice(0, 100),
          timestamp: new Date(),
          language
        };
        
        // Create conversation
        conversationApi.createConversation(newConv);
        setConversations((prev) => [newConv, ...prev]);
        setCurrentConversationId(newConv.id);
        
        // Messages will be saved by useEffect
      } else {
        // Update conversation metadata
        conversationApi.updateConversationMetadata(currentConversationId, {
          lastMessage: response.content.slice(0, 100),
          timestamp: new Date()
        });
        
        // Refresh conversations list
        const updatedConversations = conversationApi.getAllConversations();
        setConversations(updatedConversations);
      }
    } catch (err) {
      const appError = createAppError(err, ErrorCode.API_ERROR);
      setError(appError);
      logError(appError, 'sendMessage');
      
      // Remove user message if send failed
      setMessages((prev) => prev.filter(msg => msg.id !== userMessage.id));
    } finally {
      setIsTyping(false);
    }
  };

  const createNewConversation = () => {
    setMessages([]);
    setCurrentConversationId(null);
  };

  const selectConversation = (id: string) => {
    setCurrentConversationId(id);
    conversationApi.setCurrentConversationId(id);
    
    // Load messages from storage
    const loadedMessages = conversationApi.loadConversation(id);
    setMessages(loadedMessages);
  };

  const deleteConversation = (id: string) => {
    try {
      conversationApi.deleteConversation(id);
      
      // Refresh conversations list
      const updatedConversations = conversationApi.getAllConversations();
      setConversations(updatedConversations);
      
      // If deleted conversation was current, clear it
      if (currentConversationId === id) {
        setMessages([]);
        setCurrentConversationId(null);
      }
    } catch (err) {
      const appError = createAppError(err, ErrorCode.STORAGE_ERROR);
      setError(appError);
      logError(appError, 'deleteConversation');
    }
  };

  const renameConversation = (id: string, newTitle: string) => {
    try {
      conversationApi.renameConversation(id, newTitle);
      
      // Refresh conversations list
      const updatedConversations = conversationApi.getAllConversations();
      setConversations(updatedConversations);
    } catch (err) {
      const appError = createAppError(err, ErrorCode.STORAGE_ERROR);
      setError(appError);
      logError(appError, 'renameConversation');
    }
  };

  const archiveConversation = (id: string, archived: boolean) => {
    try {
      conversationApi.archiveConversation(id, archived);
      
      // Refresh conversations list
      const updatedConversations = conversationApi.getAllConversations();
      setConversations(updatedConversations);
      
      // If archived conversation was current, clear it
      if (archived && currentConversationId === id) {
        setMessages([]);
        setCurrentConversationId(null);
      }
    } catch (err) {
      const appError = createAppError(err, ErrorCode.STORAGE_ERROR);
      setError(appError);
      logError(appError, 'archiveConversation');
    }
  };

  const searchConversations = (query: string): Conversation[] => {
    try {
      return conversationApi.searchConversations(query);
    } catch (err) {
      const appError = createAppError(err, ErrorCode.STORAGE_ERROR);
      setError(appError);
      logError(appError, 'searchConversations');
      return [];
    }
  };

  const exportConversation = (id: string, format: 'txt') => {
    try {
      const text = conversationApi.exportAsText(id);
      
      // Create blob and download
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      const conversations = conversationApi.getAllConversations();
      const conversation = conversations.find((c: Conversation) => c.id === id);
      const filename = `${conversation?.title || 'conversation'}_${new Date().toISOString().split('T')[0]}.txt`;
      
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      const appError = createAppError(err, ErrorCode.STORAGE_ERROR);
      setError(appError);
      logError(appError, 'exportConversation');
    }
  };

  const rateMessage = (messageId: string, rating: 1 | 2 | 3 | 4 | 5) => {
    try {
      if (!currentConversationId) return;

      // Update message with feedback
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                feedback: {
                  ...msg.feedback,
                  rating,
                  timestamp: new Date()
                }
              }
            : msg
        )
      );

      // Save feedback data
      const feedbackData: FeedbackData = {
        messageId,
        conversationId: currentConversationId,
        rating,
        timestamp: new Date(),
        language
      };
      saveFeedback(feedbackData);
    } catch (err) {
      const appError = createAppError(err, ErrorCode.STORAGE_ERROR);
      setError(appError);
      logError(appError, 'rateMessage');
    }
  };

  const flagMessage = (messageId: string, reason: string, details: string) => {
    try {
      if (!currentConversationId) return;

      // Update message with flag
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                feedback: {
                  ...msg.feedback,
                  flagged: true,
                  flagReason: `${reason}${details ? ` - ${details}` : ''}`,
                  timestamp: new Date()
                }
              }
            : msg
        )
      );

      // Save feedback data
      const feedbackData: FeedbackData = {
        messageId,
        conversationId: currentConversationId,
        flagged: true,
        flagReason: `${reason}${details ? ` - ${details}` : ''}`,
        timestamp: new Date(),
        language
      };
      saveFeedback(feedbackData);
    } catch (err) {
      const appError = createAppError(err, ErrorCode.STORAGE_ERROR);
      setError(appError);
      logError(appError, 'flagMessage');
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        conversations,
        currentConversationId,
        isTyping,
        error,
        showArchived,
        sendMessage,
        createNewConversation,
        selectConversation,
        deleteConversation,
        renameConversation,
        archiveConversation,
        searchConversations,
        exportConversation,
        toggleShowArchived,
        clearError,
        rateMessage,
        flagMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
