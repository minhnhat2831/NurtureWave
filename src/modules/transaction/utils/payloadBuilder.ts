import type { TransactionFormValues } from '../types'

type PayloadAction = 'request-draft' | 'request-pending' | 'request-complete'

const formatDateToYYYYMMDD = (date: Date | null | undefined): string => {
  if (!date) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const buildTransactionPayload = (data: TransactionFormValues, action: PayloadAction) => {
  const baseData = {
    orgNum: data.clientName,
    subOrgNum: data.subOrgName,
    transactionType: data.transactionType?.toLowerCase().replace(/\s+/g, '-') || '',
    currency: data.currency,
    amount: data.amount || 0,
    effectiveDo: formatDateToYYYYMMDD(data.effectiveDate),
    description: data.description,
    feesAmt: data.fees || null,
    gstAmt: data.gstAmount || null,
    bankChargesAmt: data.bankCharges || null,
    bankAccountUid: data.bankAccount,
    createdDo: data.createdDate ? formatDateToYYYYMMDD(data.createdDate) : undefined,
    comments: data.internalComments,
    files: data.supportingDocs?.map(f => f.name) || [],
  }

  const couponData = data.transactionType === 'Coupon Payment' && data.couponPayments ? {
    couponPayments: data.couponPayments.map(payment => ({
      clientName: payment.clientName,
      organizationNum: payment.organizationNum,
      subOrganizationNum: payment.subOrganizationNum,
      subAccountNum: payment.subAccountNum,
      effectiveValueAmt: payment.effectiveValueAmt,
      cashOrderAmt: payment.cashOrderAmt,
      currency: payment.currency,
      bankAccountTo: payment.bankAccountTo
    })),
    totalCouponAmount: data.totalCouponAmount,
    isin: data.isin,
    couponPercentageRate: data.couponPercentageRate ?? undefined,
    paymentDo: data.paymentDate ? formatDateToYYYYMMDD(data.paymentDate) : undefined
  } : {}

  return { action, data: { ...baseData, ...couponData } }
}
