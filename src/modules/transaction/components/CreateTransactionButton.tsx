import { Button } from '@/components/common';

interface CreateTransactionButtonProps {
  onSelectDebit?: () => void;
  onSelectCredit?: () => void;
}

export default function CreateTransactionButton({ 
  onSelectDebit, 
  onSelectCredit 
}: CreateTransactionButtonProps) {
  return (
    <div className="relative inline-block group">
      <Button
        variant="primary"
        className="flex items-center gap-2"
      >
        Create Transaction
        <svg
          className="w-4 h-4 transition-transform group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <button
          onClick={onSelectDebit}
          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Debit
        </button>
        <button
          onClick={onSelectCredit}
          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Credit
        </button>
      </div>
    </div>
  );
}
