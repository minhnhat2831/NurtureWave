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
            console.log('Creating Debit transaction');
            // TODO: Open modal or navigate to debit transaction form
          }}
          onSelectCredit={() => {
            console.log('Creating Credit transaction');
            // TODO: Open modal or navigate to credit transaction form
          }}
        />
      ),
    });

    return () => {
      setHeaderContent({});
    };
  }, []);

  return (
    <div className="p-6">
      <p className="text-gray-600">Transaction list will be displayed here</p>
    </div>
  );
}
