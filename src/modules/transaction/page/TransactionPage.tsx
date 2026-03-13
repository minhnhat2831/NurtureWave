import { useEffect } from 'react';
import { useHeader } from '@/hooks/useHeaderContext';
import CreateTransactionButton from '../components/CreateTransactionButton';
import ModalForm from '../components/modal/ModalForm';
import { useTransactionModalStore } from '../store/useTransactionModalStore';

export default function TransactionPage() {
  const { setHeaderContent } = useHeader();
  const { openModal, isOpen, transactionType, closeModal } = useTransactionModalStore()
  useEffect(() => {
    setHeaderContent({
      title: 'Transaction Management',
      actions: (
        <CreateTransactionButton
          onSelectDebit={() => {
            openModal('debit');
          }}
          onSelectCredit={() => {
            openModal('credit');
          }}
        />
      ),
    });

    return () => {
      setHeaderContent({});
    };
  }, [openModal, setHeaderContent]);

  return (<>
    <div className="p-6">
      <p className="text-gray-600">Transaction list will be displayed here</p>
    </div>

    <ModalForm
      typeForm={transactionType}
      isOpen={isOpen}
      onClose={closeModal}
      />
  </>);
}
