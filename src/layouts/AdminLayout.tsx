import { useState, type ReactNode } from 'react';
import { Sidebar, Header } from '.';
import { HeaderProvider } from '@/hooks/useHeaderContext';
import { GlobalConfirmDialog } from '@/components/common';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <HeaderProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>

        <GlobalConfirmDialog />
      </div>
    </HeaderProvider>
  );
};
