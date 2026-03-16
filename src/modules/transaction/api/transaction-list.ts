import { mockListData, mockListDetail } from "../mock-data/transactionDetail";
import type { cashTransactionDetail, cashTransactionList } from "../schema/TransactionCreateFormSchema";

export const fetchListData = async () => {
  return new Promise<{ data: cashTransactionList[] }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: mockListData,
        }),
      500,
    ),
  );
};

export const fetchTransactionDetail = async (transactionId?: string,
) => {
  return new Promise<{ data: cashTransactionDetail | null }>((resolve) =>
    setTimeout(() => {
      const detail =
        mockListDetail.find(
          (item) =>
            item.cashOrderData.transactionId === transactionId,
        ) || null;

      resolve({
        data: detail as cashTransactionDetail | null,
      });
    }, 500),
  );
};