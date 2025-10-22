import { useContext } from 'react';
import { UIContext } from '../context/UIContext';

/**
 * Hook to access UI state (sidebar, modals, etc.)
 * Must be used within UIProvider
 */
export const useUI = () => {
  const context = useContext(UIContext);
  
  if (!context) {
    throw new Error('useUI must be used within UIProvider');
  }
  
  return context;
};
