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

export const TRANSACTION_TYPES = [
  ...DEBIT_TRANSACTION_TYPES,
  ...CREDIT_TRANSACTION_TYPES,
] as const

export const DEBIT_TRANSACTION_ENUM = [
  "debit-others",
  "fee",
  "tax-withholding",
  "withdrawal",
] as const

export const CREDIT_TRANSACTION_ENUM = [
  "coupon-payment",
  "credit-others",
  "deposit",
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
export type TransactionTypeKey = (typeof DEBIT_TRANSACTION_ENUM)[number] | (typeof CREDIT_TRANSACTION_ENUM)[number]
export type TransactionStatus = (typeof TRANSACTION_STATUSES)[number]
export type TransactionCategory = 'debit' | 'credit'

export const toTransactionTypeSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()

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
export const TRANSACTION_FIELD_CONFIG: Record<TransactionTypeKey, FieldVisibility> = {
  // --- DEBIT GROUP ---
  'fee': createConfig(DEBIT_BASE, {
    showFees: true,
    showBankCharges: false,
    showGstAmount: true,
    descriptionAutoFill: 'Fees',
  }),

  'tax-withholding': createConfig(DEBIT_BASE, {
    showFees: false,
    showBankCharges: false,
    descriptionAutoFill: 'Tax Withholding',
  }),

  'debit-others': createConfig(DEBIT_BASE, {
    showFees: true,
    showBankCharges: true,
    showGstAmount: true,
    descriptionAutoFill: '',
    descriptionEditable: true,
  }),

  'withdrawal': createConfig(DEBIT_BASE, {
    showFees: true,
    showBankCharges: true,
    showGstAmount: true,
    descriptionAutoFill: 'Withdrawal',
  }),

  // --- CREDIT GROUP ---
  'coupon-payment': createConfig(CREDIT_BASE, {
    showClientFields: false,
    showFees: false,
    showBankCharges: false,
    descriptionAutoFill: 'Coupon Payment',
  }),

  'credit-others': createConfig(CREDIT_BASE, {
    showClientFields: false,
    showFees: true,
    showBankCharges: false,
    showGstAmount: true,
    descriptionAutoFill: '',
    descriptionEditable: true,
  }),

  'deposit': createConfig(CREDIT_BASE, {
    showClientFields: false,
    showFees: true,
    showGstAmount: true,
    showBankCharges: false,
    descriptionAutoFill: 'Deposit',
  }),
}
// ==================== UTILITY HELPERS====================
export const normalizeTransactionType = (type: string | undefined): TransactionTypeKey | undefined => {
  if (!type) return undefined

  const normalized = toTransactionTypeSlug(type)
  return TRANSACTION_FIELD_CONFIG[normalized as TransactionTypeKey]
    ? (normalized as TransactionTypeKey)
    : undefined
}

export const isCouponPaymentTransactionType = (type: string | undefined) =>
  normalizeTransactionType(type) === "coupon-payment"

export const getTransactionConfig = (type: string | undefined): FieldVisibility => {
  const normalizedType = normalizeTransactionType(type)

  if (!normalizedType) {
    return DEFAULT_CONFIG
  }
  return TRANSACTION_FIELD_CONFIG[normalizedType]
}

export const STATUS_COLORS: Record<TransactionStatus, string> = {
  Draft: '#2563eb',
  Pending: '#f97316',
  Complete: '#22c55e',
}

export const getTransactionFormType = (transactionType: string) => {
  const normalizedType = normalizeTransactionType(transactionType)
  const creditTypes = new Set<TransactionTypeKey>(CREDIT_TRANSACTION_ENUM)
  const debitTypes = new Set<TransactionTypeKey>(DEBIT_TRANSACTION_ENUM)

  if (normalizedType && creditTypes.has(normalizedType)) {
    return "credit"
  }

  if (normalizedType && debitTypes.has(normalizedType)) {
    return "debit"
  }

  return "debit"
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