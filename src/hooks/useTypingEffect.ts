import { useState, useEffect, useRef } from 'react';

interface UseTypingEffectOptions {
  text: string;
  speed?: number; // characters per frame
  enabled?: boolean;
  onComplete?: () => void;
}

/**
 * Custom hook for typing effect animation
 * @param text - The full text to display
 * @param speed - Typing speed in characters per frame (default: 2)
 * @param enabled - Whether typing effect is enabled (default: true)
 * @param onComplete - Callback when typing completes
 */
export function useTypingEffect({ 
  text, 
  speed = 2, 
  enabled = true,
  onComplete 
}: UseTypingEffectOptions) {
  const [displayedText, setDisplayedText] = useState(enabled ? '' : text);
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);
  const hasCompletedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  // Update ref when onComplete changes to avoid re-running effect
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Reset when text changes
    indexRef.current = 0;
    hasCompletedRef.current = false;

    if (!enabled || !text) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    // Start with first few characters visible to avoid blank space
    const initialChars = Math.min(speed, text.length);
    setDisplayedText(text.slice(0, initialChars));
    indexRef.current = initialChars;
    setIsTyping(true);

    const intervalId = setInterval(() => {
      if (indexRef.current < text.length) {
        const nextIndex = Math.min(indexRef.current + speed, text.length);
        setDisplayedText(text.slice(0, nextIndex));
        indexRef.current = nextIndex;
      } else {
        clearInterval(intervalId);
        setIsTyping(false);
        if (!hasCompletedRef.current && onCompleteRef.current) {
          hasCompletedRef.current = true;
          onCompleteRef.current();
        }
      }
    }, 16); // ~60fps

    return () => clearInterval(intervalId);
  }, [text, speed, enabled]); // Remove onComplete from dependencies

  return { displayedText, isTyping };
}
