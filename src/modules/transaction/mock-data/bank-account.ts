import type { BankAccount } from '../types'

// ==================== MOCK BANK ACCOUNTS ====================

export const mockBankAccounts: BankAccount[] = [
  // USD Accounts
  {
    id: 'bank-001',
    bankAccountUid: 'sbi-usd-cma',
    accountName: 'SBI DIGITAL MARKETS PTE. LTD. - (CMA) - USD',
    accountNumber: 'USD-001',
    bankName: 'SBI Digital Markets',
    currency: 'USD',
    beneficiaryName: 'SBI DIGITAL MARKETS PTE. LTD.',
    beneficiaryBankName: 'SBI Digital Markets',
    beneficiaryBankAccountNumber: 'USD-001',
    beneficiaryBankSwift: 'SBISSGSG',
    displayName: 'SBI DIGITAL MARKETS PTE. LTD. - (CMA) - USD',
  },
  {
    id: 'bank-002',
    bankAccountUid: 'sbi-usd-cma-float',
    accountName: 'SBI DIGITAL MARKETS PTE. LTD. - (CMA) - USD (FLOAT)',
    accountNumber: 'USD-002',
    bankName: 'SBI Digital Markets',
    currency: 'USD',
    beneficiaryName: 'SBI DIGITAL MARKETS PTE. LTD.',
    beneficiaryBankName: 'SBI Digital Markets',
    beneficiaryBankAccountNumber: 'USD-002',
    beneficiaryBankSwift: 'SBISSGSG',
    displayName: 'SBI DIGITAL MARKETS PTE. LTD. - (CMA) - USD (FLOAT)',
  },
  
  // SGD Accounts
  {
    id: 'bank-004',
    bankAccountUid: 'dbs-sgd-001',
    accountName: 'DBS SGD Current Account',
    accountNumber: '004-567890-004',
    bankName: 'DBS Bank Ltd',
    currency: 'SGD',
    beneficiaryName: 'Global Industries Ltd',
    beneficiaryBankName: 'DBS Bank',
    beneficiaryBankAccountNumber: '004-567890-004',
    beneficiaryBankSwift: 'DBSSSGSG',
    displayName: 'DBS SGD Current (004-567890-004)',
  },
  {
    id: 'bank-005',
    bankAccountUid: 'ocbc-sgd-001',
    accountName: 'OCBC SGD Savings Account',
    accountNumber: '005-678901-005',
    bankName: 'OCBC Bank',
    currency: 'SGD',
    beneficiaryName: 'Pacific Financial Group',
    beneficiaryBankName: 'OCBC Bank',
    beneficiaryBankAccountNumber: '005-678901-005',
    beneficiaryBankSwift: 'OCBCSGSG',
    displayName: 'OCBC SGD Savings (005-678901-005)',
  },
  
  // VND Accounts
  {
    id: 'bank-006',
    bankAccountUid: 'sbi-vnd-cma',
    accountName: 'SBI DIGITAL MARKETS PTE. LTD. - (CMA) - VND (Vietcombank)',
    accountNumber: 'VND-001',
    bankName: 'Vietcombank',
    currency: 'VND',
    beneficiaryName: 'SBI DIGITAL MARKETS PTE. LTD.',
    beneficiaryBankName: 'Joint Stock Commercial Bank for Foreign Trade of Vietnam',
    beneficiaryBankAccountNumber: 'VND-001',
    beneficiaryBankSwift: 'BFTVVNVX',
    displayName: 'SBI DIGITAL MARKETS PTE. LTD. - (CMA) - VND (Vietcombank)',
  },
  {
    id: 'bank-010',
    bankAccountUid: 'sbi-vnd-cma-float',
    accountName: 'SBI DIGITAL MARKETS PTE. LTD. - (CMA) - VND (FLOAT) - Vietcombank',
    accountNumber: 'VND-002',
    bankName: 'Vietcombank',
    currency: 'VND',
    beneficiaryName: 'SBI DIGITAL MARKETS PTE. LTD.',
    beneficiaryBankName: 'Joint Stock Commercial Bank for Foreign Trade of Vietnam',
    beneficiaryBankAccountNumber: 'VND-002',
    beneficiaryBankSwift: 'BFTVVNVX',
    displayName: 'SBI DIGITAL MARKETS PTE. LTD. - (CMA) - VND (FLOAT) - Vietcombank',
  },
  
  // EUR Accounts
  {
    id: 'bank-007',
    bankAccountUid: 'hsbc-eur-001',
    accountName: 'HSBC EUR Business Account',
    accountNumber: '007-890123-007',
    bankName: 'HSBC Bank',
    currency: 'EUR',
    beneficiaryName: 'Tech Ventures Europe',
    beneficiaryBankName: 'HSBC Bank',
    beneficiaryBankAccountNumber: '007-890123-007',
    beneficiaryBankSwift: 'HSBCGB2L',
    displayName: 'HSBC EUR Business (007-890123-007)',
  },
  
  // GBP Accounts
  {
    id: 'bank-008',
    bankAccountUid: 'hsbc-gbp-001',
    accountName: 'HSBC GBP Corporate Account',
    accountNumber: '008-901234-008',
    bankName: 'HSBC UK Bank',
    currency: 'GBP',
    beneficiaryName: 'Tech Ventures Inc',
    beneficiaryBankName: 'HSBC UK Bank',
    beneficiaryBankAccountNumber: '008-901234-008',
    beneficiaryBankSwift: 'HBUKGB4B',
    displayName: 'HSBC GBP Corporate (008-901234-008)',
  },
  
  // AUD Accounts
  {
    id: 'bank-009',
    bankAccountUid: 'nab-aud-001',
    accountName: 'NAB AUD Business Account',
    accountNumber: '009-012345-009',
    bankName: 'National Australia Bank',
    currency: 'AUD',
    beneficiaryName: 'Pacific Financial Group',
    beneficiaryBankName: 'National Australia Bank',
    beneficiaryBankAccountNumber: '009-012345-009',
    beneficiaryBankSwift: 'NATAAU3303M',
    displayName: 'NAB AUD Business (009-012345-009)',
  },
]
