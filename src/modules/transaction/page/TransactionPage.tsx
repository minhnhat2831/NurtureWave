import { useEffect } from 'react';
import { useHeader } from '@/hooks/useHeaderContext';
import CreateTransactionButton from '../components/CreateTransactionButton';

export default function TransactionPage() {
  const { setHeaderContent } = useHeader();

  useEffect(() => {
    setHeaderContent({
      title: 'Transaction Management',
      actions: (
        <CreateTransactionButton
          onSelectDebit={() => {
            // TODO: Open modal or navigate to debit transaction form
          }}
          onSelectCredit={() => {
          }}
        />
      ),
    });

    return () => {
      setHeaderContent({});
    };
  }, [setHeaderContent]);

  return (
    <div className="p-6">
      <p className="text-gray-600">Transaction list will be displayed here</p>
    </div>
  );
}
