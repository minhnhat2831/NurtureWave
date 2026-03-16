import { mockListData, mockListDetail } from "../mock-data/transactionDetail";
import { mockBankAccounts } from "../mock-data/bank-account";
import { mockOrgs, mockSubOrgs } from "../mock-data/org";
import type { cashTransactionDetail, cashTransactionList, TransactionCreateFormInput } from "../schema/TransactionCreateFormSchema";
import { getTransactionFormType, normalizeTransactionType } from "../constants";

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

const toOrderStatus = (status: string | undefined) => {
  if (status === "Draft") return { orderStatus: "draft", orderStatusAlias: "draft" }
  if (status === "Complete") return { orderStatus: "complete", orderStatusAlias: "complete" }
  return { orderStatus: "pending-maker", orderStatusAlias: "pending" }
}

export const updateTransactionDetailLocally = (
  transactionId: string,
  values: TransactionCreateFormInput
) => {
  const data = values.data
  const detailIndex = mockListDetail.findIndex(
    (item) => item.cashOrderData.transactionId === transactionId,
  )
  const listIndex = mockListData.findIndex((item) => item.transactionId === transactionId)

  if (detailIndex < 0 || listIndex < 0) {
    return null
  }

  const currentDetail = mockListDetail[detailIndex]
  const currentList = mockListData[listIndex]
  const statusMeta = toOrderStatus(typeof data.status === "string" ? data.status : undefined)
  const org = mockOrgs.find((item) => item.id === data.clientName)
  const subOrg = mockSubOrgs[data.clientName || ""]?.find((item) => item.subOrgId === data.subOrgName)
  const bank = mockBankAccounts.find((item) => item.bankAccountUid === data.bankAccountUid)
  const normalizedType = normalizeTransactionType(typeof data.transactionType === "string" ? data.transactionType : "")
  const formType = getTransactionFormType(typeof data.transactionType === "string" ? data.transactionType : "")
  const amount = typeof data.amount === "number" ? data.amount : 0
  const feesAmt = typeof data.feesAmt === "number" ? data.feesAmt : 0
  const gstAmt = typeof data.gstAmt === "number" ? data.gstAmt : 0
  const bankChargesAmt = typeof data.bankChargesAmt === "number" ? data.bankChargesAmt : 0

  const nextShared = {
    ...statusMeta,
    orgNum: data.clientName || "",
    orgName: org?.name || currentDetail.cashOrderData.orgName,
    subOrgNum: data.subOrgName || "",
    subOrgName: subOrg?.name || currentDetail.cashOrderData.subOrgName,
    bankAccountUid: data.bankAccountUid || "",
    bankAccountName: bank?.accountName || bank?.displayName || currentDetail.cashOrderData.bankAccountName,
    bankAccountNum: bank?.accountNumber || currentDetail.cashOrderData.bankAccountNum,
    transactionType: normalizedType || currentDetail.cashOrderData.transactionType,
    transactionCategory: normalizedType || currentDetail.cashOrderData.transactionCategory,
    effectiveDo: data.effectiveDo || currentDetail.cashOrderData.effectiveDo || "",
    currency: data.currency || currentDetail.cashOrderData.currency,
    description: data.description || "",
    amount,
    netAmt: amount,
    feesAmt,
    gstAmt,
    bankChargesAmt,
    comments: data.comments || null,
    createDo: data.createdDo || currentDetail.cashOrderData.createDo,
    debit: formType === "debit" ? amount : null,
    credit: formType === "credit" ? amount : null,
  }

  mockListDetail[detailIndex] = {
    ...currentDetail,
    cashOrderData: {
      ...currentDetail.cashOrderData,
      ...nextShared,
    },
  } as typeof currentDetail

  mockListData[listIndex] = {
    ...currentList,
    ...nextShared,
  } as typeof currentList

  return {
    detail: mockListDetail[detailIndex],
    list: mockListData[listIndex],
  }
}