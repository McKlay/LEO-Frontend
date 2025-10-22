import { Message, Conversation, Language } from '../../types/chat';

const CONVERSATIONS_KEY = 'conversations_list';
const MESSAGES_KEY_PREFIX = 'conversation_messages_';
const CURRENT_CONVERSATION_KEY = 'current_conversation_id';

/**
 * Conversation persistence service
 * Currently uses localStorage as a placeholder for Supabase
 */
export const conversationApi = {
  /**
   * Get all conversation metadata
   */
  getAllConversations: (): Conversation[] => {
    try {
      const data = localStorage.getItem(CONVERSATIONS_KEY);
      if (!data) return [];
      
      const conversations = JSON.parse(data);
      // Convert timestamp strings back to Date objects
      return conversations.map((conv: Conversation) => ({
        ...conv,
        timestamp: new Date(conv.timestamp)
      }));
    } catch (error) {
      console.error('Error loading conversations:', error);
      return [];
    }
  },

  /**
   * Get current conversation ID
   */
  getCurrentConversationId: (): string | null => {
    try {
      return localStorage.getItem(CURRENT_CONVERSATION_KEY);
    } catch (error) {
      console.error('Error getting current conversation ID:', error);
      return null;
    }
  },

  /**
   * Set current conversation ID
   */
  setCurrentConversationId: (conversationId: string | null): void => {
    try {
      if (conversationId) {
        localStorage.setItem(CURRENT_CONVERSATION_KEY, conversationId);
      } else {
        localStorage.removeItem(CURRENT_CONVERSATION_KEY);
      }
    } catch (error) {
      console.error('Error setting current conversation ID:', error);
    }
  },

  /**
   * Create a new conversation
   */
  createConversation: (conversation: Conversation): void => {
    try {
      const conversations = conversationApi.getAllConversations();
      conversations.unshift(conversation); // Add to beginning
      localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
      conversationApi.setCurrentConversationId(conversation.id);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  },

  /**
   * Update conversation metadata (title, lastMessage, timestamp)
   */
  updateConversationMetadata: (conversationId: string, updates: Partial<Omit<Conversation, 'id'>>): void => {
    try {
      const conversations = conversationApi.getAllConversations();
      const index = conversations.findIndex(c => c.id === conversationId);
      
      if (index !== -1) {
        conversations[index] = {
          ...conversations[index],
          ...updates,
          timestamp: new Date()
        };
        localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
      }
    } catch (error) {
      console.error('Error updating conversation metadata:', error);
    }
  },

  /**
   * Save conversation messages
   */
  saveConversation: (conversationId: string, messages: Message[]): void => {
    try {
      const key = `${MESSAGES_KEY_PREFIX}${conversationId}`;
      localStorage.setItem(key, JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  },

  /**
   * Add messages to existing conversation
   */
  addMessages: (conversationId: string, newMessages: Message[]): void => {
    try {
      const existing = conversationApi.loadConversation(conversationId);
      const updated = [...existing, ...newMessages];
      conversationApi.saveConversation(conversationId, updated);
      
      // Update conversation metadata
      if (newMessages.length > 0) {
        const lastMessage = newMessages[newMessages.length - 1];
        conversationApi.updateConversationMetadata(conversationId, {
          lastMessage: lastMessage.content.slice(0, 100),
          timestamp: new Date()
        });
      }
    } catch (error) {
      console.error('Error adding messages:', error);
    }
  },

  /**
   * Load conversation messages
   */
  loadConversation: (conversationId: string): Message[] => {
    try {
      const key = `${MESSAGES_KEY_PREFIX}${conversationId}`;
      const data = localStorage.getItem(key);
      if (!data) return [];
      
      const messages = JSON.parse(data);
      // Convert timestamp strings back to Date objects
      return messages.map((msg: Message) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    } catch (error) {
      console.error('Error loading conversation:', error);
      return [];
    }
  },

  /**
   * Delete conversation and its messages
   */
  deleteConversation: (conversationId: string): void => {
    try {
      // Remove messages
      const messagesKey = `${MESSAGES_KEY_PREFIX}${conversationId}`;
      localStorage.removeItem(messagesKey);
      
      // Remove from conversations list
      const conversations = conversationApi.getAllConversations();
      const filtered = conversations.filter(c => c.id !== conversationId);
      localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(filtered));
      
      // Clear current conversation if it was the deleted one
      if (conversationApi.getCurrentConversationId() === conversationId) {
        conversationApi.setCurrentConversationId(null);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  },

  /**
   * Generate title from first user message
   */
  generateTitle: (firstMessage: string, language: Language): string => {
    const maxLength = 50;
    const cleaned = firstMessage.trim();
    
    if (cleaned.length <= maxLength) {
      return cleaned;
    }
    
    // Truncate at word boundary
    const truncated = cleaned.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > maxLength * 0.7) {
      return truncated.slice(0, lastSpace) + '...';
    }
    
    return truncated + '...';
  }
};
