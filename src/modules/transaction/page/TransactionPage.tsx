import { useEffect } from 'react';
import { useHeader } from '@/hooks/useHeaderContext';
import CreateTransactionButton from '../components/CreateTransactionButton';
import ModalForm from '../components/modal/ModalForm';
import { useTransactionModalStore } from '../store/useTransactionModalStore';
import { useTransactionDetail } from '../hook/useTransactionDetail';
import { DataTable } from '@/components/Table';
import { transactionDetailColumns } from '../components/table/TransactionColumns';
import { useModalTypeStore } from '../store/useModalTypeStore';

export default function TransactionPage() {
  const { setHeaderContent } = useHeader();
  const { openModal, isOpen, transactionType, closeModal } = useTransactionModalStore()
  const { typeOpen, setTypeOpen } = useModalTypeStore()
  const { useGetList } = useTransactionDetail()
  const { data, isLoading } = useGetList()

  useEffect(() => {
    setHeaderContent({
      title: 'Transaction Management',
      actions: (
        <CreateTransactionButton
          onSelectDebit={() => {
            openModal('debit');
            setTypeOpen('Create')
          }}
          onSelectCredit={() => {
            openModal('credit');
            setTypeOpen('Create')
          }}
        />
      ),
    });

    return () => {
      setHeaderContent({});
    };
  }, [openModal, setHeaderContent]);

  return (<>
    <DataTable
      data={data?.data ?? []}
      columns={transactionDetailColumns}
      isLoading={isLoading}
      totalPages={10}
      pageIndex={0}
      pageSize={10}
      totalItems={10}
      onPageChange={() => {}}
      onPageSizeChange={() => {}}
    />

    <ModalForm
      typeForm={transactionType}
      isOpen={isOpen}
      onClose={closeModal}
      mode={typeOpen}
    />
  </>);
}
