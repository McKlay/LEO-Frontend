import { createContext, useState, ReactNode, useEffect } from 'react';

interface UIContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
}

export const UIContext = createContext<UIContextType | undefined>(undefined);

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider = ({ children }: UIProviderProps) => {
  // Initialize sidebar state based on screen size
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Check if we're on desktop (lg breakpoint is 1024px)
    return typeof window !== 'undefined' && window.innerWidth >= 1024;
  });

  // Update sidebar state when screen size changes
  useEffect(() => {
    const handleResize = () => {
      // Auto-open on desktop, auto-close on mobile
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);
  const openSidebar = () => setIsSidebarOpen(true);

  return (
    <UIContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        openSidebar
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
