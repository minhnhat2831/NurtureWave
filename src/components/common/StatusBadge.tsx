import { cn } from '@/lib/cn';

export type StatusType = 'draft' | 'published' | 'unpublished' | 'show' | 'hide' | 'active' | 'inactive';

export interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; dotColor: string; textColor: string; bgColor: string }> = {
  draft: {
    label: 'Draft',
    dotColor: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
  },
  published: {
    label: 'Published',
    dotColor: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
  },
  unpublished: {
    label: 'Unpublished',
    dotColor: 'bg-gray-500',
    textColor: 'text-gray-700',
    bgColor: 'bg-gray-50',
  },
  show: {
    label: 'Show',
    dotColor: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
  },
  hide: {
    label: 'Hide',
    dotColor: 'bg-gray-500',
    textColor: 'text-gray-700',
    bgColor: 'bg-gray-50',
  },
  active: {
    label: 'Active',
    dotColor: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
  },
  inactive: {
    label: 'Inactive',
    dotColor: 'bg-gray-500',
    textColor: 'text-gray-700',
    bgColor: 'bg-gray-50',
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        config.bgColor,
        config.textColor,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dotColor)} />
      {config.label}
    </span>
  );
};
