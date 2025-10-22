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
  },

  /**
   * Rename a conversation
   */
  renameConversation: (conversationId: string, newTitle: string): void => {
    try {
      conversationApi.updateConversationMetadata(conversationId, {
        title: newTitle.trim()
      });
    } catch (error) {
      console.error('Error renaming conversation:', error);
      throw error;
    }
  },

  /**
   * Archive or unarchive a conversation
   */
  archiveConversation: (conversationId: string, archived: boolean): void => {
    try {
      const conversations = conversationApi.getAllConversations();
      const index = conversations.findIndex(c => c.id === conversationId);
      
      if (index !== -1) {
        conversations[index] = {
          ...conversations[index],
          archived
        };
        localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
      }
    } catch (error) {
      console.error('Error archiving conversation:', error);
      throw error;
    }
  },

  /**
   * Search conversations by title or content
   */
  searchConversations: (query: string): Conversation[] => {
    try {
      if (!query.trim()) {
        return conversationApi.getAllConversations();
      }

      const searchTerm = query.toLowerCase().trim();
      const allConversations = conversationApi.getAllConversations();
      
      return allConversations.filter(conv => {
        // Search in title
        if (conv.title.toLowerCase().includes(searchTerm)) {
          return true;
        }
        
        // Search in last message
        if (conv.lastMessage.toLowerCase().includes(searchTerm)) {
          return true;
        }
        
        // Search in full conversation content
        const messages = conversationApi.loadConversation(conv.id);
        return messages.some(msg => 
          msg.content.toLowerCase().includes(searchTerm)
        );
      });
    } catch (error) {
      console.error('Error searching conversations:', error);
      return [];
    }
  },

  /**
   * Export conversation as text
   */
  exportAsText: (conversationId: string): string => {
    try {
      const conversations = conversationApi.getAllConversations();
      const conversation = conversations.find(c => c.id === conversationId);
      
      if (!conversation) {
        throw new Error('Conversation not found');
      }

      const messages = conversationApi.loadConversation(conversationId);
      
      let text = `${conversation.title}\n`;
      text += `Date: ${conversation.timestamp.toLocaleDateString()}\n`;
      text += `Language: ${conversation.language}\n`;
      text += `${'='.repeat(60)}\n\n`;
      
      messages.forEach((msg, index) => {
        const role = msg.role === 'user' ? 'You' : 'Labor Law Assistant';
        const time = msg.timestamp.toLocaleTimeString();
        
        text += `[${time}] ${role}:\n`;
        text += `${msg.content}\n`;
        
        if (msg.citations && msg.citations.length > 0) {
          text += `\nCitations:\n`;
          msg.citations.forEach(citation => {
            text += `- ${citation.source}${citation.article ? ` (${citation.article})` : ''}\n`;
            if (citation.url) {
              text += `  ${citation.url}\n`;
            }
          });
        }
        
        if (index < messages.length - 1) {
          text += `\n${'-'.repeat(60)}\n\n`;
        }
      });
      
      text += `\n${'='.repeat(60)}\n`;
      text += `Exported on: ${new Date().toLocaleString()}\n`;
      text += `Total messages: ${messages.length}\n`;
      
      return text;
    } catch (error) {
      console.error('Error exporting conversation as text:', error);
      throw error;
    }
  },

  /**
   * Get archived conversations
   */
  getArchivedConversations: (): Conversation[] => {
    try {
      const allConversations = conversationApi.getAllConversations();
      return allConversations.filter(conv => conv.archived === true);
    } catch (error) {
      console.error('Error getting archived conversations:', error);
      return [];
    }
  },

  /**
   * Get active (non-archived) conversations
   */
  getActiveConversations: (): Conversation[] => {
    try {
      const allConversations = conversationApi.getAllConversations();
      return allConversations.filter(conv => !conv.archived);
    } catch (error) {
      console.error('Error getting active conversations:', error);
      return [];
    }
  }
};
