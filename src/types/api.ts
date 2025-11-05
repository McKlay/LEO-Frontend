import { Message, Citation, Language } from './chat';

/**
 * Backend API Response Types (matching BACKEND_API_SPECIFICATIONS.md)
 */

export interface ChatMessageRequest {
  conversationId: string;
  message: string;
  language: Language;
  context?: {
    previousMessageIds?: string[];
    userMetadata?: Record<string, any>;
  };
}

export interface SuggestedAction {
  id: string;
  type: 'query' | 'link' | 'info' | 'contact' | 'form';
  label: string;
  data: Record<string, any>;
}

export interface BackendCitation extends Citation {
  confidence?: number;
  section?: string;
  effectiveDate?: string;
  amendedBy?: string;
}

export interface ChatMessageResponse {
  messageId: string;
  role: 'assistant';
  content: string;
  timestamp: string; // ISO 8601
  citations: BackendCitation[];
  suggestions: SuggestedAction[];
  metadata?: {
    processingTime?: number;
    model?: string;
    confidence?: number;
  };
}

export interface ChatResponse {
  content: string;
  citations: Citation[];
  suggestions: string[];
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    field?: string;
    details?: any;
    timestamp: string;
    requestId?: string;
  };
}

export interface ConversationData {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Conversation API Response Types
 */

export interface CreateConversationRequest {
  title: string;
  language: Language;
  metadata?: {
    source?: string;
    tags?: string[];
  };
}

export interface ConversationResponse {
  id: string;
  title: string;
  language: Language;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  messageCount: number;
  archived: boolean;
}

export interface GetConversationsResponse {
  conversations: ConversationResponse[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

/**
 * Feedback API Response Types
 */

export interface RatingRequest {
  messageId: string;
  conversationId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  language: Language;
  metadata?: Record<string, any>;
}

export interface FlagRequest {
  messageId: string;
  conversationId: string;
  flagged: boolean;
  flagReason: string;
  language: Language;
  metadata?: Record<string, any>;
}
