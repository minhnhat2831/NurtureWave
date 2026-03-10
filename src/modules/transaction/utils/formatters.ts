import type { FieldVisibility } from '../constants'

export const getBankLabel = (direction: FieldVisibility['bankDirection']): string => {
  switch (direction) {
    case 'from':
      return 'Bank Details (From)'
    case 'to':
      return 'Bank Details (To)'
    default:
      return 'Bank Account'
  }
}

export const formatCurrency = (value: number, currency: string = 'EUR'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '0.00'
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
