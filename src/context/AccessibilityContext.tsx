import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type FontSize = 'small' | 'medium' | 'large' | 'extra-large';
export type ContrastMode = 'normal' | 'high';

interface AccessibilitySettings {
  fontSize: FontSize;
  highContrastMode: boolean;
  reducedMotion: boolean;
  keyboardShortcutsEnabled: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  setFontSize: (size: FontSize) => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  toggleKeyboardShortcuts: () => void;
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 'medium',
  highContrastMode: false,
  reducedMotion: false,
  keyboardShortcutsEnabled: true,
};

const FONT_SIZE_MAP: Record<FontSize, string> = {
  small: '14px',
  medium: '16px',
  large: '18px',
  'extra-large': '20px',
};

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useLocalStorage<AccessibilitySettings>(
    'labor-chatbot-accessibility',
    DEFAULT_SETTINGS
  );

  // Apply font size to root element
  useEffect(() => {
    document.documentElement.style.fontSize = FONT_SIZE_MAP[settings.fontSize];
  }, [settings.fontSize]);

  // Apply high contrast mode
  useEffect(() => {
    if (settings.highContrastMode) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [settings.highContrastMode]);

  // Apply reduced motion preference
  useEffect(() => {
    if (settings.reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [settings.reducedMotion]);

  // Check user's system preferences on mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && !settings.reducedMotion) {
      setSettings((prev) => ({ ...prev, reducedMotion: true }));
    }
  }, []);

  const setFontSize = (size: FontSize) => {
    setSettings((prev) => ({ ...prev, fontSize: size }));
  };

  const toggleHighContrast = () => {
    setSettings((prev) => ({ ...prev, highContrastMode: !prev.highContrastMode }));
  };

  const toggleReducedMotion = () => {
    setSettings((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  const toggleKeyboardShortcuts = () => {
    setSettings((prev) => ({ ...prev, keyboardShortcutsEnabled: !prev.keyboardShortcutsEnabled }));
  };

  const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        setFontSize,
        toggleHighContrast,
        toggleReducedMotion,
        toggleKeyboardShortcuts,
        announceToScreenReader,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}
