/**
 * Error Handling Utilities
 * Provides consistent error handling and user-friendly error messages
 */

import { Language } from '../../types/chat';

export interface AppError {
  code: string;
  message: string;
  originalError?: Error;
  retryable?: boolean;
}

export enum ErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  API_ERROR = 'API_ERROR',
  STORAGE_ERROR = 'STORAGE_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

/**
 * Error messages in multiple languages
 */
const errorMessages = {
  en: {
    [ErrorCode.NETWORK_ERROR]: 'Network connection error. Please check your internet connection and try again.',
    [ErrorCode.API_ERROR]: 'Unable to process your request. Please try again later.',
    [ErrorCode.STORAGE_ERROR]: 'Unable to save your data. Please check your browser settings.',
    [ErrorCode.VALIDATION_ERROR]: 'Invalid input. Please check your message and try again.',
    [ErrorCode.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again.',
    RETRY: 'Retry',
    DISMISS: 'Dismiss'
  },
  fil: {
    [ErrorCode.NETWORK_ERROR]: 'May problema sa koneksyon sa internet. Pakisuri ang iyong koneksyon at subukan muli.',
    [ErrorCode.API_ERROR]: 'Hindi maproseso ang iyong kahilingan. Pakisubukan muli mamaya.',
    [ErrorCode.STORAGE_ERROR]: 'Hindi ma-save ang iyong data. Pakisuri ang settings ng iyong browser.',
    [ErrorCode.VALIDATION_ERROR]: 'Hindi wastong input. Pakisuri ang iyong mensahe at subukan muli.',
    [ErrorCode.UNKNOWN_ERROR]: 'May hindi inaasahang error. Pakisubukan muli.',
    RETRY: 'Subukan Muli',
    DISMISS: 'Isara'
  },
  ceb: {
    [ErrorCode.NETWORK_ERROR]: 'Problema sa koneksyon sa internet. Palihug susihon ang imong koneksyon ug sulayi pag-usab.',
    [ErrorCode.API_ERROR]: 'Dili maproseso ang imong hangyo. Palihug sulayi pag-usab unya.',
    [ErrorCode.STORAGE_ERROR]: 'Dili ma-save ang imong data. Palihug susihon ang settings sa imong browser.',
    [ErrorCode.VALIDATION_ERROR]: 'Dili husto nga input. Palihug susihon ang imong mensahe ug sulayi pag-usab.',
    [ErrorCode.UNKNOWN_ERROR]: 'May wala damha nga error. Palihug sulayi pag-usab.',
    RETRY: 'Sulayi Pag-usab',
    DISMISS: 'Sirado'
  }
};

/**
 * Create an AppError from an unknown error
 */
export const createAppError = (error: unknown, defaultCode: ErrorCode = ErrorCode.UNKNOWN_ERROR): AppError => {
  if (error instanceof Error) {
    // Check for specific error patterns
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return {
        code: ErrorCode.NETWORK_ERROR,
        message: error.message,
        originalError: error,
        retryable: true
      };
    }

    if (error.message.includes('localStorage') || error.message.includes('storage')) {
      return {
        code: ErrorCode.STORAGE_ERROR,
        message: error.message,
        originalError: error,
        retryable: false
      };
    }

    return {
      code: defaultCode,
      message: error.message,
      originalError: error,
      retryable: true
    };
  }

  return {
    code: defaultCode,
    message: String(error),
    retryable: true
  };
};

/**
 * Get user-friendly error message in the specified language
 */
export const getErrorMessage = (error: AppError, language: Language): string => {
  const messages = errorMessages[language];
  return messages[error.code as ErrorCode] || messages[ErrorCode.UNKNOWN_ERROR];
};

/**
 * Get retry button text
 */
export const getRetryText = (language: Language): string => {
  return errorMessages[language].RETRY;
};

/**
 * Get dismiss button text
 */
export const getDismissText = (language: Language): string => {
  return errorMessages[language].DISMISS;
};

/**
 * Check if error is retryable
 */
export const isRetryable = (error: AppError): boolean => {
  return error.retryable !== false;
};

/**
 * Log error for debugging
 */
export const logError = (error: AppError, context?: string): void => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${error.code}]${context ? ` ${context}:` : ''}`, error.message);
    if (error.originalError) {
      console.error('Original error:', error.originalError);
    }
  }

  // TODO: In production, send to error tracking service
  // sendToErrorTracker(error, context);
};

/**
 * Retry an async operation with exponential backoff
 */
export const retryWithBackoff = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> => {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('Max retries exceeded');
};
