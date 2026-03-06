import { useState, type ReactElement } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { cn } from '@/lib/cn';
import { ChangePasswordModal, Icons } from '@/components/common';
import useAuthContext from '@/hooks/useAuthContext';
import { useGlobalModalStore } from '@/stores';

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
  { id: 'article', label: 'Article', icon: 'file-text', path: '/admin/articles' },
  { id: 'pd-session', label: 'PD Session', icon: 'calendar', path: '/pd-session' },
  { id: 'category', label: 'Category', icon: 'grid', path: '/admin/categories' },
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
  const navigate = useNavigate()
  const location = useLocation()
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [manualExpandedMenus, setManualExpandedMenus] = useState<Set<string>>(new Set());
  const { logout , user : admin} = useAuthContext()
  const { showChangePasswordModal, openChangePasswordModal, closeChangePasswordModal } = useGlobalModalStore()

  // Derive active item and parent from current path
  const getActiveInfo = () => {
    const path = location.pathname;
    for (const item of menuItems) {
      if (item.path === path) return { activeItem: item.id, parentId: null };
      if (item.children) {
        for (const child of item.children) {
          if (child.path === path) return { activeItem: child.id, parentId: item.id };
        }
      }
    }
    return { activeItem: 'static-content', parentId: null };
  };

  const { activeItem, parentId } = getActiveInfo();

  // Auto-expand parent menu if child is active
  const expandedMenus = new Set(manualExpandedMenus);
  if (parentId) expandedMenus.add(parentId);

  const toggleMenu = (menuId: string) => {
    setManualExpandedMenus(prev => {
      const next = new Set(prev);
      if (next.has(menuId)) {
        next.delete(menuId);
      } else {
        next.add(menuId);
      }
      return next;
    });
  };

  const renderIcon = (iconName: string, isActive: boolean) => {
    const iconClass = isActive ? 'text-violet-700' : 'text-gray-500';
    const iconMap: Record<string, ReactElement> = {
      monitor: (
        <Icons.monitor style={iconClass}/>
      ),
      users: (
        <Icons.user style={iconClass}/>
      ),
      'file-text': (
        <Icons.fileText style={iconClass}/>
      ),
      calendar: (
        <Icons.box style={iconClass}/>
      ),
      grid: (
        <Icons.grid style={iconClass}/>
      ),
      package: (
        <Icons.box style={iconClass}/>
      ),
      ticket: (
        <Icons.ticket style={iconClass}/>
      ),
      file: (
        <Icons.fileText style={iconClass}/>
      ),
      search: (
        <Icons.search style={iconClass}/>
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
                  } else {
                    if (item.path) {
                      navigate(item.path);
                    }
                  }
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors mx-2 rounded-lg cursor-pointer',
                  'hover:bg-gray-100',
                  isActive ? 'bg-violet-50 border border-violet-200 font-semibold text-violet-700' : 'text-gray-600'
                )}
              >
                <span className="shrink-0">{renderIcon(item.icon, isActive)}</span>
                {isOpen && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.hasDropdown && (
                      <Icons.expand />
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
                        onClick={() => {
                          if (child.path) {
                            navigate(child.path)
                          }
                        }}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors mx-2 rounded-lg cursor-pointer',
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
          className="w-full flex items-center gap-3 px-4 py-4 hover:bg-violet-200 transition-colors cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-violet-300 flex items-center justify-center text-violet-700 font-semibold text-sm shrink-0">
            A
          </div>
          {isOpen && (
            <>
              <span className="flex-1 text-left text-sm text-gray-900">{admin}</span>
              <Icons.dotMenu />
            </>
          )}
        </button>

        {/* User Dropdown Menu */}
        {showUserMenu && isOpen && (
          <div className="absolute bottom-full left-0 right-0 mb-2 mx-4 bg-white rounded-lg shadow-lg overflow-hidden">
            <button 
              onClick={() => {
                openChangePasswordModal();
                setShowUserMenu(false);
              }}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Change Password
            </button>
            <button className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => {
              logout();
            }}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={closeChangePasswordModal}
        onSubmit={closeChangePasswordModal}
      />
    </aside>
  );
};
