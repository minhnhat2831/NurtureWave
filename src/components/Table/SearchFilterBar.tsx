import { cn } from '@/lib/cn';

export interface FilterOption {
  label: string;
  value: string;
}

export interface SearchFilterBarProps {
  // Search
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;

  // Filter
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: FilterOption[];
  filterLabel?: string;

  // Sort
  sortValue?: string;
  onSortChange?: (value: string) => void;
  sortOptions?: FilterOption[];
  sortLabel?: string;

  // Create Button
  onCreateClick?: () => void;
  createButtonText?: string;

  // Clear filters
  onClearFilters?: () => void;
  showClearButton?: boolean;

  // Styling
  className?: string;
}

export const SearchFilterBar = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search',
  filterValue,
  onFilterChange,
  filterOptions = [],
  filterLabel = 'Filter',
  sortValue,
  onSortChange,
  sortOptions = [],
  sortLabel = 'Sort by',
  onCreateClick,
  createButtonText = 'Create',
  onClearFilters,
  showClearButton = true,
  className,
}: SearchFilterBarProps) => {
  const hasActiveFilters = searchValue || filterValue || sortValue;

  return (
    <div className={cn('flex flex-col sm:flex-row gap-3 mb-4', className)}>
      {/* Search Input */}
      <div className="relative flex-1">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="flex gap-2">
        {/* Filter Dropdown */}
        {filterOptions.length > 0 && onFilterChange && (
          <select
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">{filterLabel}</option>
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {/* Sort Dropdown */}
        {sortOptions.length > 0 && onSortChange && (
          <select
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">{sortLabel}</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {/* Clear Filters Button */}
        {showClearButton && hasActiveFilters && onClearFilters && (
          <button
            onClick={onClearFilters}
            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
        )}

        {/* Create Button */}
        {onCreateClick && (
          <button
            onClick={onCreateClick}
            className="px-4 py-2 bg-violet-700 text-white text-sm font-medium rounded-lg hover:bg-violet-800 transition-colors whitespace-nowrap"
          >
            {createButtonText}
          </button>
        )}
      </div>
    </div>
  );
};
