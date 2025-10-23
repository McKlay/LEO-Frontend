import { FeedbackData } from '../../types/chat';

const FEEDBACK_STORAGE_KEY = 'labor-law-chatbot-feedback';

/**
 * Save feedback data to localStorage
 */
export function saveFeedback(feedback: FeedbackData): void {
  try {
    const existingFeedback = getAllFeedback();
    
    // Check if feedback for this message already exists
    const existingIndex = existingFeedback.findIndex(
      (f) => f.messageId === feedback.messageId
    );
    
    if (existingIndex >= 0) {
      // Update existing feedback
      existingFeedback[existingIndex] = feedback;
    } else {
      // Add new feedback
      existingFeedback.push(feedback);
    }
    
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(existingFeedback));
  } catch (error) {
    console.error('Error saving feedback:', error);
  }
}

/**
 * Get all feedback data from localStorage
 */
export function getAllFeedback(): FeedbackData[] {
  try {
    const data = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (!data) return [];
    
    const feedback = JSON.parse(data) as FeedbackData[];
    
    // Convert timestamp strings back to Date objects
    return feedback.map((f) => ({
      ...f,
      timestamp: new Date(f.timestamp)
    }));
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    return [];
  }
}

/**
 * Get feedback for a specific message
 */
export function getFeedbackForMessage(messageId: string): FeedbackData | null {
  try {
    const allFeedback = getAllFeedback();
    return allFeedback.find((f) => f.messageId === messageId) || null;
  } catch (error) {
    console.error('Error retrieving feedback for message:', error);
    return null;
  }
}

/**
 * Get feedback for a specific conversation
 */
export function getFeedbackForConversation(conversationId: string): FeedbackData[] {
  try {
    const allFeedback = getAllFeedback();
    return allFeedback.filter((f) => f.conversationId === conversationId);
  } catch (error) {
    console.error('Error retrieving feedback for conversation:', error);
    return [];
  }
}

/**
 * Delete feedback for a specific message
 */
export function deleteFeedback(messageId: string): void {
  try {
    const allFeedback = getAllFeedback();
    const updatedFeedback = allFeedback.filter((f) => f.messageId !== messageId);
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(updatedFeedback));
  } catch (error) {
    console.error('Error deleting feedback:', error);
  }
}

/**
 * Get feedback statistics for a conversation
 */
export function getFeedbackStats(conversationId: string): {
  totalRatings: number;
  averageRating: number;
  totalFlagged: number;
  ratingDistribution: Record<number, number>;
} {
  try {
    const feedback = getFeedbackForConversation(conversationId);
    const ratingsOnly = feedback.filter((f) => f.rating !== undefined);
    const flaggedOnly = feedback.filter((f) => f.flagged === true);
    
    const totalRatings = ratingsOnly.length;
    const sumRatings = ratingsOnly.reduce((sum, f) => sum + (f.rating || 0), 0);
    const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
    
    const ratingDistribution: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };
    
    ratingsOnly.forEach((f) => {
      if (f.rating) {
        ratingDistribution[f.rating]++;
      }
    });
    
    return {
      totalRatings,
      averageRating: Math.round(averageRating * 10) / 10,
      totalFlagged: flaggedOnly.length,
      ratingDistribution
    };
  } catch (error) {
    console.error('Error calculating feedback stats:', error);
    return {
      totalRatings: 0,
      averageRating: 0,
      totalFlagged: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };
  }
}

/**
 * Export all feedback data as JSON
 */
export function exportFeedbackData(): string {
  try {
    const allFeedback = getAllFeedback();
    return JSON.stringify(allFeedback, null, 2);
  } catch (error) {
    console.error('Error exporting feedback data:', error);
    return '[]';
  }
}

/**
 * Clear all feedback data (use with caution)
 */
export function clearAllFeedback(): void {
  try {
    localStorage.removeItem(FEEDBACK_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing feedback data:', error);
  }
}
