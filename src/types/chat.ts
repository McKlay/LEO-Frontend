export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  citations?: Citation[];
  suggestions?: string[];
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
