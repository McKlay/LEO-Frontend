export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  citations?: Citation[];
  suggestions?: string[];
  feedback?: MessageFeedback;
}

export interface Citation {
  id: string;
  text: string;
  source: string;
  article?: string;
  url?: string;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  language: 'en' | 'fil' | 'ceb';
  archived?: boolean;
}

export type Language = 'en' | 'fil' | 'ceb';

export type ConversationExportFormat = 'txt' | 'pdf' | 'json';

export interface MessageFeedback {
  rating?: 1 | 2 | 3 | 4 | 5;
  flagged?: boolean;
  flagReason?: string;
  timestamp: Date;
}

export interface FeedbackData {
  messageId: string;
  conversationId: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  flagged?: boolean;
  flagReason?: string;
  timestamp: Date;
  language: Language;
}
