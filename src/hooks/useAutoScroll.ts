import { useEffect, useRef, useCallback, useState } from 'react';

interface UseAutoScrollOptions {
  /**
   * Enable/disable auto-scroll functionality
   */
  enabled?: boolean;
  
  /**
   * Scroll behavior for new messages
   * 'smooth' - smooth scroll animation
   * 'instant' - immediate scroll with no animation
   * 'auto' - browser default
   */
  behavior?: ScrollBehavior;
  
  /**
   * Threshold in pixels from bottom to consider "scrolled to bottom"
   * Default: 100px
   */
  threshold?: number;
}

interface UseAutoScrollReturn {
  /**
   * Ref to attach to the scrollable container
   */
  scrollContainerRef: React.RefObject<HTMLElement>;
  
  /**
   * Ref to attach to a marker element at the bottom of the chat
   */
  scrollAnchorRef: React.RefObject<HTMLDivElement>;
  
  /**
   * Check if user is currently at the bottom of the scroll area
   */
  isAtBottom: () => boolean;
  
  /**
   * Manually scroll to bottom
   */
  scrollToBottom: (behavior?: ScrollBehavior) => void;
  
  /**
   * Track scroll position changes
   */
  handleScroll: () => void;
  
  /**
   * Perform auto-scroll (called internally or manually)
   */
  performAutoScroll: () => void;
  
  /**
   * Whether user is currently scrolled away from bottom
   */
  isScrolledUp: boolean;
}

/**
 * Custom hook for intelligent auto-scrolling in chat interfaces
 * 
 * Features:
 * - Auto-scroll when new messages arrive (if user is at bottom)
 * - Preserve scroll position when user scrolls up
 * - Resume auto-scroll when user returns to bottom
 * - Support for pagination (preserve position when loading older messages)
 * 
 * @param options - Configuration options
 * @returns Object containing refs and helper functions
 */
export function useAutoScroll(options: UseAutoScrollOptions = {}): UseAutoScrollReturn {
  const {
    enabled = true,
    behavior = 'smooth',
    threshold = 100
  } = options;

  const scrollContainerRef = useRef<HTMLElement>(null);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const isUserScrollingRef = useRef(false);
  const previousScrollHeightRef = useRef(0);
  const shouldAutoScrollRef = useRef(true);
  const [isScrolledUp, setIsScrolledUp] = useState(false);

  /**
   * Check if the user is currently scrolled to the bottom
   */
  const isAtBottom = useCallback((): boolean => {
    const container = scrollContainerRef.current;
    if (!container) return true;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    
    return distanceFromBottom <= threshold;
  }, [threshold]);

  /**
   * Scroll to the bottom of the container
   */
  const scrollToBottom = useCallback((scrollBehavior: ScrollBehavior = behavior) => {
    if (!enabled) return;

    const anchor = scrollAnchorRef.current;
    if (anchor) {
      anchor.scrollIntoView({ 
        behavior: scrollBehavior,
        block: 'end',
        inline: 'nearest'
      });
    }
  }, [enabled, behavior]);

  /**
   * Handle scroll events to detect user-initiated scrolling
   */
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Check if user is at the bottom
    const atBottom = isAtBottom();
    
    // Update auto-scroll flag based on position
    shouldAutoScrollRef.current = atBottom;
    
    // Update scrolled up state for UI indicators
    setIsScrolledUp(!atBottom);
    
    // Mark that user has scrolled (will be reset after a short delay)
    isUserScrollingRef.current = true;
    
    // Reset user scrolling flag after a delay
    setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 150);
  }, [isAtBottom]);

  /**
   * Monitor scroll height changes for pagination support
   * If content is added at the top (pagination), maintain scroll position
   */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const currentScrollHeight = container.scrollHeight;
    const previousScrollHeight = previousScrollHeightRef.current;

    // If scroll height increased while user was scrolled up (likely pagination)
    if (previousScrollHeight > 0 && currentScrollHeight > previousScrollHeight) {
      const heightDifference = currentScrollHeight - previousScrollHeight;
      
      // Only adjust if user is not at the bottom (i.e., viewing older messages)
      if (!isAtBottom()) {
        container.scrollTop += heightDifference;
      }
    }

    // Update previous scroll height
    previousScrollHeightRef.current = currentScrollHeight;
  });

  /**
   * Auto-scroll when messages change (if user is at bottom)
   */
  const performAutoScroll = useCallback(() => {
    if (!enabled) return;
    
    // Only auto-scroll if user is at the bottom or hasn't manually scrolled up
    if (shouldAutoScrollRef.current && !isUserScrollingRef.current) {
      scrollToBottom();
    }
  }, [enabled, scrollToBottom]);

  return {
    scrollContainerRef,
    scrollAnchorRef,
    isAtBottom,
    scrollToBottom,
    handleScroll,
    performAutoScroll,
    isScrolledUp
  };
}
