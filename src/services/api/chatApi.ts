import { Language } from '../../types/chat';
import { ChatResponse } from '../../types/api';
import { llmService } from '../llm/llmService';

/**
 * Chat API service - handles communication with backend
 * Currently uses mock responses via llmService
 */
export const chatApi = {
  /**
   * Send a message and get AI response
   * @param content - User's message
   * @param language - Current language setting
   */
  sendMessage: async (content: string, language: Language): Promise<ChatResponse> => {
    // TODO: Replace with real API call when backend is ready
    // const response = await fetch('/api/chat', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message: content, language })
    // });
    // return await response.json();

    // For now, use mock LLM service
    return await llmService.generateResponse(content, language);
  }
};
