import { cn } from '@/lib/cn';

export type StatusType ='draft' | 'published' | 'unpublished' | 'show' | 'hide' | 'active' | 'inactive';

export interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; dotColor: string }> = {
  draft: {
    label: 'Draft',
    dotColor: 'bg-yellow-500',
  },
  published: {
    label: 'Published',
    dotColor: 'bg-green-500',
  },
  unpublished: {
    label: 'Unpublished',
    dotColor: 'bg-gray-500',
  },
  show: {
    label: 'Show',
    dotColor: 'bg-green-500',
  },
  hide: {
    label: 'Hide',
    dotColor: 'bg-gray-500',
  },
  active: {
    label: 'Active',
    dotColor: 'bg-green-500',
  },
  inactive: {
    label: 'Inactive',
    dotColor: 'bg-gray-500',
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-sm text-gray-900',
        className
      )}
    >
      <span className={cn('w-2 h-2 rounded-full', config.dotColor)} />
      {config.label}
    </span>
  );
};
