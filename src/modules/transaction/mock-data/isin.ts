import type { Isin, IsinHolding } from '../types'

// ==================== MOCK ISINS ====================

export const mockIsins: Isin[] = [
  {
    isin: 'ISIN19012026',
    securityName: 'Vietnam Government Bond 2026',
    currency: 'VND',
  },
  {
    isin: 'ISIN20031025',
    securityName: 'Corporate Bond Series A',
    currency: 'USD',
  },
]

// ==================== MOCK ISIN HOLDINGS ====================

export const mockIsinHolding: Record<string, IsinHolding[]> = {
  'ISIN19012026': [
    {
      clientName: 'VIETNAM Official 9999 sos VNVC',
      organizationName: 'VIETNAM Official 9999 sos VNVC',
      organizationNum: 'PFL-0JSKBG438987V',
      subOrganizationName: 'VIETNAM Official sub-org 9999',
      subOrganizationNum: 'PFL-0JF2RAR548R1Y',
      subAccountNum: null,
      effectiveValueAmt: 100000.0,
      currency: 'VND',
    },
    {
      clientName: 'ABC Corporation',
      organizationName: 'ABC Corporation',
      organizationNum: 'PFL-ABC001',
      subOrganizationName: 'ABC Sub Org 1',
      subOrganizationNum: 'PFL-ABC-SUB-001',
      subAccountNum: null,
      effectiveValueAmt: 150000.0,
      currency: 'VND',
    },
    {
      clientName: 'XYZ Holdings Ltd',
      organizationName: 'XYZ Holdings Ltd',
      organizationNum: 'PFL-XYZ001',
      subOrganizationName: 'XYZ Sub Org A',
      subOrganizationNum: 'PFL-XYZ-SUB-A',
      subAccountNum: null,
      effectiveValueAmt: 200000.0,
      currency: 'VND',
    },
  ],
  'ISIN20031025': [
    {
      clientName: 'Global Investment Fund',
      organizationName: 'Global Investment Fund',
      organizationNum: 'GIF-USD-001',
      subOrganizationName: 'Global Sub 1',
      subOrganizationNum: 'GIF-SUB-001',
      subAccountNum: null,
      effectiveValueAmt: 250000.0,
      currency: 'USD',
    },
    {
      clientName: 'Pacific Trust Co',
      organizationName: 'Pacific Trust Co',
      organizationNum: 'PTC-USD-002',
      subOrganizationName: 'Pacific Sub 2',
      subOrganizationNum: 'PTC-SUB-002',
      subAccountNum: null,
      effectiveValueAmt: 300000.0,
      currency: 'USD',
    },
  ],
}
