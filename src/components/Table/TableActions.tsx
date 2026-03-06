import { Pencil, Trash2 } from 'lucide-react';

export interface TableActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  editLabel?: string;
  deleteLabel?: string;
  showEdit?: boolean;
  showDelete?: boolean;
}

export const TableActions = ({
  onEdit,
  onDelete,
  editLabel = 'Edit',
  deleteLabel = 'Delete',
  showEdit = true,
  showDelete = true,
}: TableActionsProps) => {
  return (
    <div className="flex items-center gap-2">
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
