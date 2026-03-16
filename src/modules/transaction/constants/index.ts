// ==================== TRANSACTION TYPES ====================

export const DEBIT_TRANSACTION_TYPES = [
  'Debit (Others)',
  'Fee',
  'Tax Withholding',
  'Withdrawal',
] as const

export const CREDIT_TRANSACTION_TYPES = [
  'Coupon Payment',
  'Credit (Others)',
  'Deposit',
] as const

export const TRANSACTION_STATUS_KEY_ENUM = [
  'pending',
  'draft',
  'complete',
  'pending-maker'
] as const

export const TRANSACTION_STATUS_KEY = [
  TRANSACTION_STATUS_KEY_ENUM[0] as 'Pending',
  TRANSACTION_STATUS_KEY_ENUM[1] as 'Draft',
  TRANSACTION_STATUS_KEY_ENUM[2] as 'Complete',
  TRANSACTION_STATUS_KEY_ENUM[3] as 'Pending'
] as const

export const TRANSACTION_TYPES = [
  ...DEBIT_TRANSACTION_TYPES,
  ...CREDIT_TRANSACTION_TYPES,
] as const

export const DEBIT_TRANSACTION_ENUM = [
  DEBIT_TRANSACTION_TYPES[0] as "debit-others",
  DEBIT_TRANSACTION_TYPES[1] as "fee",
  DEBIT_TRANSACTION_TYPES[2] as "tax-withholding",
  DEBIT_TRANSACTION_TYPES[3] as "withdrawal",
] as const

export const CREDIT_TRANSACTION_ENUM = [
  CREDIT_TRANSACTION_TYPES[0] as "coupon-payment",
  CREDIT_TRANSACTION_TYPES[1] as "credit-others",
  CREDIT_TRANSACTION_TYPES[2] as "deposit",
] as const

export const DEBIT_TRANSACTION_TYPE_OPTION = [
  {
    value: DEBIT_TRANSACTION_ENUM[0],
    label: DEBIT_TRANSACTION_TYPES[0]
  },
  {
    value: DEBIT_TRANSACTION_ENUM[1],
    label: DEBIT_TRANSACTION_TYPES[1]
  },
  {
    value: DEBIT_TRANSACTION_ENUM[2],
    label: DEBIT_TRANSACTION_TYPES[2]
  },
  {
    value: DEBIT_TRANSACTION_ENUM[3],
    label: DEBIT_TRANSACTION_TYPES[3]
  },
]

export const CREDIT_TRANSACTION_TYPE_OPTION = [
  {
    value: CREDIT_TRANSACTION_ENUM[0],
    label: CREDIT_TRANSACTION_TYPES[0]
  },
  {
    value: CREDIT_TRANSACTION_ENUM[1],
    label: CREDIT_TRANSACTION_TYPES[1]
  },
  {
    value: CREDIT_TRANSACTION_ENUM[2],
    label: CREDIT_TRANSACTION_TYPES[2]
  },
]

export const TRANSACTION_STATUSES = ['Draft', 'Pending', 'Complete'] as const

export type DebitTransactionType = (typeof DEBIT_TRANSACTION_TYPES)[number]
export type CreditTransactionType = (typeof CREDIT_TRANSACTION_TYPES)[number]
export type TransactionType = (typeof TRANSACTION_TYPES)[number]
export type TransactionStatus = (typeof TRANSACTION_STATUSES)[number]
export type TransactionCategory = 'debit' | 'credit'

// ==================== FIELD VISIBILITY CONFIG ====================
export interface FieldVisibility {
  showClientFields: boolean
  showFees: boolean
  showBankCharges: boolean
  showGstAmount: boolean
  bankDirection: 'from' | 'to' | null
  descriptionAutoFill: string
  descriptionEditable: boolean
}
// 1. DEFAULT CONFIG
const DEFAULT_CONFIG: FieldVisibility = {
  showClientFields: true,
  showFees: false,
  showBankCharges: false,
  showGstAmount: false,
  bankDirection: null,
  descriptionAutoFill: '',
  descriptionEditable: true,
}

const DEBIT_BASE: Partial<FieldVisibility> = { bankDirection: 'from' }
const CREDIT_BASE: Partial<FieldVisibility> = { bankDirection: 'to' }

const createConfig = (
  groupBase: Partial<FieldVisibility>,
  overrides: Partial<FieldVisibility> = {}
): FieldVisibility => {
  return { ...DEFAULT_CONFIG, ...groupBase, ...overrides }
}
//FINAL CONFIG MAP
export const TRANSACTION_FIELD_CONFIG: Record<TransactionType, FieldVisibility> = {
  // --- DEBIT GROUP ---
  'Fee': createConfig(DEBIT_BASE, {
    showFees: false,
    showBankCharges: false,
    descriptionAutoFill: 'Fees',
  }),

  'Tax Withholding': createConfig(DEBIT_BASE, {
    showFees: false,
    showBankCharges: false,
    descriptionAutoFill: 'Tax Withholding',
  }),

  'Debit (Others)': createConfig(DEBIT_BASE, {
    showFees: false,
    showBankCharges: false,
    descriptionAutoFill: '',
    descriptionEditable: true,
  }),

  'Withdrawal': createConfig(DEBIT_BASE, {
    showFees: true,
    showBankCharges: true,
    showGstAmount: true,
    descriptionAutoFill: 'Withdrawal',
  }),

  // --- CREDIT GROUP ---
  'Coupon Payment': createConfig(CREDIT_BASE, {
    showClientFields: false,
    showFees: false,
    showBankCharges: false,
    descriptionAutoFill: 'Coupon Payment',
  }),

  'Credit (Others)': createConfig(CREDIT_BASE, {
    showClientFields: false,
    showFees: false,
    showBankCharges: false,
    descriptionAutoFill: '',
    descriptionEditable: true,
  }),

  'Deposit': createConfig(CREDIT_BASE, {
    showClientFields: false,
    showFees: true,
    showGstAmount: true,
    showBankCharges: true,
    descriptionAutoFill: 'Deposit',
  }),
}
// ==================== UTILITY HELPERS====================
export const getTransactionConfig = (type: string | undefined): FieldVisibility => {
  if (!type || !TRANSACTION_FIELD_CONFIG[type as TransactionType]) {
    return DEFAULT_CONFIG
  }
  return TRANSACTION_FIELD_CONFIG[type as TransactionType]
}
/*Kiểm tra xem có cần hiện Fees field*/
export const shouldShowFee = (type: string): boolean => {
  return getTransactionConfig(type).showFees
}
/*Kiểm tra xem có cần hiện GST field*/
export const shouldShowGst = (type: string): boolean => {
  return getTransactionConfig(type).showGstAmount
}

export const STATUS_COLORS: Record<TransactionStatus, string> = {
  Draft: '#2563eb',
  Pending: '#f97316',
  Complete: '#22c55e',
}

export const ORDER_STATUSES = ['Draft', 'Pending', 'Complete', 'Pending Maker'] as const
export type OrderStatus = (typeof ORDER_STATUSES)[number]

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  Draft: '#2563eb',
  Pending: '#f97316',
  Complete: '#22c55e',
  "Pending Maker" : '#f97316'
}

export const getTransactionFormType = (transactionType: string) => {

  if (DEBIT_TRANSACTION_ENUM.includes(transactionType as any) || CREDIT_TRANSACTION_ENUM[1] || CREDIT_TRANSACTION_ENUM[2]) {
    return "debit"
  }

  if (CREDIT_TRANSACTION_ENUM[0]) {
    return "credit"
  }

  return "debit"
}

export const STATUS_COLORS_TYPE: Record<TransactionStatus, string> = {
  Draft: '#2563eb',
  Pending: '#f97316',
  Complete: '#22c55e',
}

export const TRANSACTION_TYPE_MAP: Record<string,{ label: string}> = {
  "debit-others": {
    label: "Debit (Others)",
  },
  fee: {
    label: "Fee",
  },
  "tax-withholding": {
    label: "Tax Withholding",
  },
  withdrawal: {
    label: "Withdrawal",
  },

  "coupon-payment": {
    label: "Coupon Payment",
  },
  "credit-others": {
    label: "Credit (Others)",
  },
  deposit: {
    label: "Deposit",
  }
}

export const TRANSACTION_STATUS_MAP: Record<string,{ label: string; style: string }> = {
  pending: {
    label: "Pending",
    style : "#f59e0b"
  },
  draft: {
    label: "Draft",
    style: "#6b7280"
  },
  complete: {
    label: "Complete",
    style: "#22c55e"
  },
  "pending-maker": {
    label: "Pending",
    style: "#f97316"
  }
}