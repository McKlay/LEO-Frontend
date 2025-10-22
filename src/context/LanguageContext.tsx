import { createContext, ReactNode } from 'react';
import { Language } from '../types/chat';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Persist language preference to localStorage
  const [language, setLanguage] = useLocalStorage<Language>('language', 'en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
