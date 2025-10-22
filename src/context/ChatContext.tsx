import { createContext, useState, ReactNode, useRef, useEffect } from 'react';
import { Message, Conversation, Language } from '../types/chat';
import { chatApi } from '../services/api/chatApi';
import { conversationApi } from '../services/api/conversationApi';
import { AppError, createAppError, ErrorCode, logError } from '../services/utils/errorHandler';

interface ChatContextType {
  messages: Message[];
  conversations: Conversation[];
  currentConversationId: string | null;
  isTyping: boolean;
  error: AppError | null;
  sendMessage: (content: string) => Promise<void>;
  createNewConversation: () => void;
  selectConversation: (id: string) => void;
  clearError: () => void;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const clearError = () => {
    setError(null);
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

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  return (
    <ChatContext.Provider
      value={{
        messages,
        conversations,
        currentConversationId,
        isTyping,
        error,
        sendMessage,
        createNewConversation,
        selectConversation,
        clearError
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
