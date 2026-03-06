import { Pencil, Trash2 } from 'lucide-react'
import { Icons } from '../common';

export interface TableActionsProps {
  onView?: () => void
  onEdit?: () => void;
  onDelete?: () => void;
  viewLabel?: string
  editLabel?: string;
  deleteLabel?: string;
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
}

export const TableActions = ({
  onEdit,
  onDelete,
  onView,
  editLabel = 'Edit',
  deleteLabel = 'Delete',
  viewLabel = 'View',
  showEdit = true,
  showDelete = true,
  showView = true,
}: TableActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      {showView && onView && (
        <button
          onClick={onView}
          title={viewLabel}
          className="p-1 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
        >
          <Icons.view />
        </button>
      )}
      {showEdit && onEdit && (
        <button
          onClick={onEdit}
          title={editLabel}
          className="p-1.5 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-md transition-colors cursor-pointer"
        >
          <Pencil className="w-5 h-5" />
        </button>
      )}
      {showDelete && onDelete && (
        <button
          onClick={onDelete}
          title={deleteLabel}
          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
