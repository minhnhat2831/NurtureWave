import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';

interface HeaderContent {
  title?: string;
  searchBar?: ReactNode;
  actions?: ReactNode;
}

interface HeaderContextType {
  headerContent: HeaderContent;
  setHeaderContent: (content: HeaderContent) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [headerContent, setHeaderContent] = useState<HeaderContent>({});

  const value = useMemo(() => ({
    headerContent,
    setHeaderContent,
  }), [headerContent, setHeaderContent]);

  return (
    <HeaderContext.Provider value={value}>
      {children}
    </HeaderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within HeaderProvider');
  }
  return context;
}
