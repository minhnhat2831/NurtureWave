import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import { ArrowUp, ArrowDown, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  
  // Pagination
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange:(pageSize: number) => void;
  
  // Sorting
  currentSort?: string;
  onSortChange?: (sort: string) => void;
  sortableColumns?: string[];
  
  // States
  isLoading?: boolean;
  error?: string;
  
  // Styling
  className?: string;
}

export const DataTable = <TData,>({
  columns,
  data,
  pageIndex,
  pageSize,
  totalPages,
  totalItems,
  onPageChange,
  onPageSizeChange,
  currentSort,
  onSortChange,
  sortableColumns = [],
  isLoading = false,
  error,
  className,
}: DataTableProps<TData>) => {
  'use no memo'; // Disable React Compiler memoization for TanStack Table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  // Parse current sort: "columnName" or "-columnName" for desc
  const getSortState = (columnKey: string) => {
    if (!currentSort) return null
    if (currentSort === columnKey) return 'asc'
    if (currentSort === `-${columnKey}`) return 'desc'
    return null
  }

  const handleSort = (columnKey: string) => {
    if (!onSortChange || !sortableColumns.includes(columnKey)) return
    
    const currentState = getSortState(columnKey)
    let newSort: string
    
    if (currentState === 'asc') {
      newSort = `-${columnKey}` // Switch to desc
    } else if (currentState === 'desc') {
      newSort = 'createdAt' // Reset to default
    } else {
      newSort = columnKey // Set to asc
    }
    
    onSortChange(newSort)
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  const startItem = pageIndex * pageSize + 1;
  const endItem = Math.min((pageIndex + 1) * pageSize, totalItems);

  return (
    <div className={cn('w-full', className)}>
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const columnKey = header.column.id
                  const isSortable = sortableColumns.includes(columnKey)
                  const sortState = getSortState(columnKey)
                  
                  return (
                    <th
                      key={header.id}
                      className={cn(
                        "px-6 py-3 text-left text-sm font-normal text-gray-700",
                        isSortable && "cursor-pointer select-none hover:bg-gray-100"
                      )}
                      onClick={() => isSortable && handleSort(columnKey)}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {isSortable && (
                          <span className="text-gray-400">
                            {sortState === 'asc' ? <ArrowUp className="w-4 h-4" /> 
                             : sortState === 'desc' ? <ArrowDown className="w-4 h-4" /> 
                             : <ArrowUpDown className="w-4 h-4" />}
                          </span>
                        )}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              // Loading skeleton rows - show same number as current data or pageSize
              Array.from({ length: data.length || Math.min(pageSize, 10) }).map((_, rowIndex) => (
                <tr key={`skeleton-${rowIndex}`} className="animate-pulse">
                  {columns.map((_, colIndex) => (
                    <td key={`skeleton-cell-${colIndex}`} className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <p className="text-sm text-gray-500">No data available</p>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 text-sm text-gray-900">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && data.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 rounded-b-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">
              showing {startItem} to {endItem} of {totalItems} entries.
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Page Size Select */}
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            >
              {[10, 25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size} per page
                </option>
              ))}
            </select>

            {/* Pagination Buttons */}
            <div className="flex gap-1">
              <button
                onClick={() => onPageChange(pageIndex - 1)}
                disabled={pageIndex === 0}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 text-sm border border-gray-300 rounded-lg bg-white">
                {pageIndex + 1}
              </span>
              <button
                onClick={() => onPageChange(pageIndex + 1)}
                disabled={pageIndex >= totalPages - 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
