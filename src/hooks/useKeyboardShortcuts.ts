import { useEffect } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { Language } from '../types/chat';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  handler: () => void;
  description: string;
}

interface UseKeyboardShortcutsProps {
  onNewConversation?: () => void;
  onFocusSearch?: () => void;
  onCloseModal?: () => void;
  onToggleSettings?: () => void;
  language: Language;
}

export function useKeyboardShortcuts({
  onNewConversation,
  onFocusSearch,
  onCloseModal,
  onToggleSettings,
}: UseKeyboardShortcutsProps) {
  const { settings } = useAccessibility();

  useEffect(() => {
    if (!settings.keyboardShortcutsEnabled) return;

    const shortcuts: KeyboardShortcut[] = [
      {
        key: 'N',
        shiftKey: true,
        handler: () => onNewConversation?.(),
        description: 'Create new conversation',
      },
      {
        key: '/',
        ctrlKey: true,
        handler: () => onFocusSearch?.(),
        description: 'Focus search bar',
      },
      {
        key: 'Escape',
        handler: () => onCloseModal?.(),
        description: 'Close modal or menu',
      },
      {
        key: ',',
        ctrlKey: true,
        handler: () => onToggleSettings?.(),
        description: 'Open settings',
      },
    ];

    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrlKey ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatch = shortcut.shiftKey ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.altKey ? event.altKey : !event.altKey;
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
          event.preventDefault();
          shortcut.handler();
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [settings.keyboardShortcutsEnabled, onNewConversation, onFocusSearch, onCloseModal, onToggleSettings]);

  return { enabled: settings.keyboardShortcutsEnabled };
}
