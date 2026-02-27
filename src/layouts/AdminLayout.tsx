import { useState, type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Sidebar, Header } from '.';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleChangePassword = async () => {
  };

  const handleLogout = () => {
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        activeItem={location.pathname}
        onNavigate={handleNavigate}
        onChangePassword={handleChangePassword}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
