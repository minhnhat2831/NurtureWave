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
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
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
