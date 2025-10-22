import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

/**
 * Hook to access and manage language state
 * Must be used within LanguageProvider
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  
  return context;
};
