import { Icons } from '@/components/common';
import { useHeader } from '@/hooks/useHeaderContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { headerContent } = useHeader();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4">
      {/* Mobile Menu Toggle */}
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer lg:hidden"
        aria-label="Toggle menu"
      >
        <Icons.menu />
      </button>

      {/* Page Title */}
      {headerContent.title && (
        <h1 className="text-lg font-semibold text-gray-900">
          {headerContent.title}
        </h1>
      )}

      {/* Search Bar */}
      {headerContent.searchBar && (
        <div className="flex-1 max-w-md mx-auto">
          {headerContent.searchBar}
        </div>
      )}

      {/* Actions */}
      {headerContent.actions && (
        <div className="ml-auto">
          {headerContent.actions}
        </div>
      )}
    </header>
  );
};
