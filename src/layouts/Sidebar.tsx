import { useState, type ReactElement } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { cn } from '@/lib/cn';
import { ChangePasswordModal } from '@/components/common';
import useAuthContext from '@/hooks/useAuthContext';

interface SubMenuItem {
  id: string;
  label: string;
  path: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  hasDropdown?: boolean;
  children?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  { id: 'static-content', label: 'Static Content', icon: 'monitor', path: '/static-content' },
  { 
    id: 'accounts', 
    label: 'Accounts', 
    icon: 'users', 
    hasDropdown: true,
    children: [
      { id: 'admin-management', label: 'Admin Management', path: '/admin-management' },
      { id: 'doula-management', label: 'Doula Management', path: '/doula-management' },
      { id: 'client-management', label: 'Client Management', path: '/client-management' },
    ]
  },
  { id: 'article', label: 'Article', icon: 'file-text', path: '/article' },
  { id: 'pd-session', label: 'PD Session', icon: 'calendar', path: '/pd-session' },
  { id: 'category', label: 'Category', icon: 'grid', path: '/category' },
  { id: 'subscriptions', label: 'Subscriptions', icon: 'package', path: '/subscriptions' },
  { id: 'voucher', label: 'Voucher', icon: 'ticket', path: '/voucher' },
  { id: 'help-documents', label: 'Help Documents', icon: 'file', path: '/help-documents' },
  { id: 'search-settings', label: 'Search Settings', icon: 'search', path: '/search-settings' },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuthContext();
  
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const getActiveItem = () => {
    const path = location.pathname;
    for (const item of menuItems) {
      if (item.path === path) return item.id;
      if (item.children) {
        const child = item.children.find(c => c.path === path);
        if (child) return child.id;
      }
    }
    return 'static-content';
  };

  const activeItem = getActiveItem();

  const toggleMenu = (menuId: string) => {
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId);
    } else {
      newExpanded.add(menuId);
    }
    setExpandedMenus(newExpanded);
  };

  const renderIcon = (iconName: string, isActive: boolean) => {
    const iconClass = isActive ? 'text-violet-700' : 'text-gray-500';
    const iconMap: Record<string, ReactElement> = {
      monitor: (
        <svg className={`w-5 h-5 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      users: (
        <svg className={`w-5 h-5 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      'file-text': (
        <svg className={`w-5 h-5 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      calendar: (
        <svg className={`w-5 h-5 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      grid: (
        <svg className={`w-5 h-5 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      package: (
        <svg className={`w-5 h-5 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      ticket: (
        <svg className={`w-5 h-5 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      ),
      file: (
        <svg className={`w-5 h-5 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      search: (
        <svg className={`w-5 h-5 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    };
    return iconMap[iconName] || null;
  };

  return (
    <aside
      className={cn(
        'bg-white flex flex-col transition-all duration-300 border-r border-gray-200',
        isOpen ? 'w-64' : 'w-0 md:w-20'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 bg-violet-700 text-white">
        <div className="flex items-center gap-3">
          {isOpen && <span className="font-semibold text-lg">NurtureWave</span>}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4">
        {menuItems.map((item) => {
          const isActive = activeItem === item.id;
          const isExpanded = expandedMenus.has(item.id);
          const hasChildren = item.children && item.children.length > 0;

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (hasChildren) {
                    toggleMenu(item.id);
                  } else if (item.path) {
                    navigate(item.path);
                  }
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors mx-2 rounded-lg',
                  'hover:bg-gray-100',
                  isActive ? 'bg-violet-50 border border-violet-200 font-semibold text-violet-700' : 'text-gray-600'
                )}
              >
                <span className="shrink-0">{renderIcon(item.icon, isActive)}</span>
                {isOpen && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.hasDropdown && (
                      <svg 
                        className={cn('w-4 h-4 transition-transform', isExpanded && 'rotate-180')} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </>
                )}
              </button>

              {/* Submenu */}
              {isOpen && hasChildren && isExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.children!.map((child) => {
                    const isChildActive = activeItem === child.id;
                    return (
                      <button
                        key={child.id}
                        onClick={() => navigate(child.path)}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors mx-2 rounded-lg',
                          'hover:bg-gray-100',
                          isChildActive 
                            ? 'bg-violet-50 border border-violet-200 font-medium text-violet-700' 
                            : 'text-gray-600'
                        )}
                      >
                        <span className="flex-1 text-left">{child.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Menu */}
      <div className="relative bg-violet-100">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="w-full flex items-center gap-3 px-4 py-4 hover:bg-violet-200 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-violet-300 flex items-center justify-center text-violet-700 font-semibold text-sm shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          {isOpen && (
            <>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</div>
              </div>
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </>
          )}
        </button>

        {/* User Dropdown Menu */}
        {showUserMenu && isOpen && (
          <div className="absolute bottom-full left-0 right-0 mb-2 mx-4 bg-white rounded-lg shadow-lg overflow-hidden">
            <button 
              onClick={() => {
                setShowChangePasswordModal(true);
                setShowUserMenu(false);
              }}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Change Password
            </button>
            <button 
              onClick={() => {
                logout();
                setShowUserMenu(false);
              }}
              className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
        onSubmit={async () => {
          setShowChangePasswordModal(false);
        }}
      />
    </aside>
  );
};
