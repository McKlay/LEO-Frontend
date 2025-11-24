import { Language } from '../../types/chat';
import { ChatResponse, ChatMessageRequest } from '../../types/api';

/**
 * Configuration for API calls
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');

/**
 * Session management
 */
interface SessionData {
  sessionId: string;
  token: string;
  expiresAt: string;
  language: string;
}

let cachedSession: SessionData | null = null;

/**
 * Create a new anonymous session
 */
async function createSession(language: Language): Promise<SessionData> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language,
        metadata: {
          userAgent: navigator.userAgent,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create session');
    }

    const sessionData: SessionData = await response.json();
    cachedSession = sessionData;
    
    // Store in localStorage for persistence
    localStorage.setItem('leo_session', JSON.stringify(sessionData));
    
    return sessionData;
  } catch (error) {
    console.error('Session creation error:', error);
    throw error;
  }
}

/**
 * Get or create a valid session token
 */
async function getValidSession(language: Language): Promise<string> {
  // Check cached session
  if (cachedSession) {
    const expiresAt = new Date(cachedSession.expiresAt);
    if (expiresAt > new Date()) {
      return cachedSession.token;
    }
  }

  // Check localStorage
  const storedSession = localStorage.getItem('leo_session');
  if (storedSession) {
    try {
      const sessionData: SessionData = JSON.parse(storedSession);
      const expiresAt = new Date(sessionData.expiresAt);
      if (expiresAt > new Date()) {
        cachedSession = sessionData;
        return sessionData.token;
      }
    } catch (error) {
      console.error('Error parsing stored session:', error);
    }
  }

  // Create new session
  const newSession = await createSession(language);
  return newSession.token;
}

/**
 * Hardcoded suggestions (to be replaced with backend data later)
 */
const HARDCODED_SUGGESTIONS = [
  'Contact DOLE at 1349',
  'Consult with a labor lawyer',
  'Visit your nearest DOLE office'
];

/**
 * Status event callback for streaming
 */
export type StatusCallback = (status: string) => void;

/**
 * Chat API service - handles communication with backend
 * Implements BACKEND_API_SPECIFICATIONS.md v1.0.0
 */
export const chatApi = {
  /**
   * Send a message and get AI response with streaming support
   * Supports multi-turn conversation by passing previous messages in context
   * @param content - User's message
   * @param language - Current language setting
   * @param conversationId - Current conversation ID
   * @param previousMessages - Array of previous messages for context
   * @param onStatusUpdate - Optional callback for status updates during streaming
   */
  sendMessage: async (
    content: string,
    language: Language,
    conversationId: string,
    previousMessages: Array<{ role: string; content: string }> = [],
    onStatusUpdate?: StatusCallback
  ): Promise<ChatResponse> => {
    try {
      // Get valid session token
      const token = await getValidSession(language);

      // Prepare request payload
      const request: ChatMessageRequest = {
        conversationId,
        message: content,
        language,
        context: {
          previousMessageIds: previousMessages.map((_, idx) => `msg-${idx}`),
          userMetadata: {
            employmentType: 'regular',
            industry: 'general'
          }
        }
      };

      // Use streaming endpoint for better UX
      const response = await fetch(`${API_BASE_URL}/chat/message/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language,
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(API_TIMEOUT)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData?.error?.message || `API Error: ${response.statusText}`
        );
      }

      // Process SSE stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      let contentChunks: string[] = [];
      let citations: any[] = [];
      let currentEventType: string | null = null;
      
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.trim()) continue;

          // Parse SSE format: "event: <type>" or "data: <json>"
          if (line.startsWith('event: ')) {
            currentEventType = line.substring(7).trim();
          } else if (line.startsWith('data: ')) {
            const data = line.substring(6).trim();
            
            if (data === '[DONE]') continue;

            try {
              const eventData = JSON.parse(data);

              // Handle different event types
              if (currentEventType === 'status' && onStatusUpdate) {
                // Status event: data = {"step": "analyze", "message": "Analyzing..."}
                onStatusUpdate(eventData.message || eventData.step);
              } else if (currentEventType === 'content_chunk') {
                // Content chunk event: data = {"chunk": "text"}
                contentChunks.push(eventData.chunk);
              } else if (currentEventType === 'citations') {
                // Citations event: data = {"citations": [...]}
                citations = eventData.citations || eventData;
              } else if (currentEventType === 'complete') {
                // Complete event: data = {content, citations, suggestions, metadata}
                // This happens for clarification responses (no streaming chunks)
                if (eventData.content && !contentChunks.length) {
                  contentChunks.push(eventData.content);
                }
                if (eventData.citations && !citations.length) {
                  citations = eventData.citations;
                }
              }
              // Ignore 'metadata' event (handled in 'complete')
              
              // Reset event type after processing
              currentEventType = null;
            } catch (e) {
              console.warn('Failed to parse SSE event:', data, e);
            }
          }
        }
      }

      // Combine content chunks
      const fullContent = contentChunks.join('');

      // Transform backend citations to frontend format
      const formattedCitations = citations.map(cite => ({
        id: cite.id,
        text: cite.text,
        source: cite.source,
        article: cite.article,
        url: cite.url
      }));

      return {
        content: fullContent,
        citations: formattedCitations,
        suggestions: HARDCODED_SUGGESTIONS
      };
    } catch (error) {
      console.error('Chat API error:', error);
      throw error;
    }
  }
};
