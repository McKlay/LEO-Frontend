import { Message, Citation } from './chat';

export interface ChatResponse {
  content: string;
  citations: Citation[];
  suggestions: string[];
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface ConversationData {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}
