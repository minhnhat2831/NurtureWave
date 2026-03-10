import type { Isin, IsinHolding } from '../types'

// ==================== MOCK ISINS ====================

export const mockIsins: Isin[] = [
  {
    isin: 'US0378331005',
    securityName: 'Apple Inc. Common Stock',
    currency: 'USD',
  },
  {
    isin: 'US5949181045',
    securityName: 'Microsoft Corporation Common Stock',
    currency: 'USD',
  },
  {
    isin: 'US02079K1079',
    securityName: 'Alphabet Inc. Class A Common Stock',
    currency: 'USD',
  },
  {
    isin: 'US0231351067',
    securityName: 'Amazon.com Inc. Common Stock',
    currency: 'USD',
  },
  {
    isin: 'scottcash',
    securityName: 'Scott Cash Securities',
    currency: 'USD',
  },
  {
    isin: 'SG1L01001701',
    securityName: 'DBS Group Holdings Ltd',
    currency: 'SGD',
  },
  {
    isin: 'SG1S61937028',
    securityName: 'Oversea-Chinese Banking Corp Ltd',
    currency: 'SGD',
  },
  {
    isin: 'GB00B10RZP78',
    securityName: 'Unilever PLC',
    currency: 'GBP',
  },
  {
    isin: 'DE0005140008',
    securityName: 'Deutsche Bank AG',
    currency: 'EUR',
  },
  {
    isin: 'AU000000CBA7',
    securityName: 'Commonwealth Bank of Australia',
    currency: 'AUD',
  },
]

// ==================== MOCK ISIN HOLDINGS ====================

export const mockIsinHolding: Record<string, IsinHolding[]> = {
  'US0378331005': [
    {
      clientName: 'Acme Corporation',
      organizationName: 'Acme Corporation',
      organizationNum: 'PFL-0JSKBG438987V',
      subOrganizationName: 'Marketing Department',
      subOrganizationNum: 'PFL-0JF2RAR548R1Y',
      subAccountNum: null,
      effectiveValueAmt: 50000.0,
      currency: 'USD',
    },
    {
      clientName: 'Global Industries',
      organizationName: 'Global Industries Ltd',
      organizationNum: 'PFL-0JF2RAR548R1Y',
      subOrganizationName: 'Operations',
      subOrganizationNum: 'PFL-SUB-003',
      subAccountNum: 'ACC-001',
      effectiveValueAmt: 75000.0,
      currency: 'USD',
    },
  ],
  'US5949181045': [
    {
      clientName: 'Tech Ventures',
      organizationName: 'Tech Ventures Inc',
      organizationNum: 'ORG-001',
      subOrganizationName: 'R&D Division',
      subOrganizationNum: 'SUB-TECH-001',
      subAccountNum: null,
      effectiveValueAmt: 100000.0,
      currency: 'USD',
    },
  ],
  'scottcash': [
    {
      clientName: 'Scott test',
      organizationName: 'Scott Test Organization',
      organizationNum: 'SFOVI000529',
      subOrganizationName: 'Scott Test Sub-Org',
      subOrganizationNum: 'SRG-0F648HDFY8832',
      subAccountNum: null,
      effectiveValueAmt: 100000.0,
      currency: 'USD',
    },
    {
      clientName: 'Scott test 2',
      organizationName: 'Scott Test Organization',
      organizationNum: 'SFOVI000529',
      subOrganizationName: 'Scott Test Sub-Org',
      subOrganizationNum: 'SRG-0F648HDFY8832',
      subAccountNum: 'SUB-ACC-001',
      effectiveValueAmt: 50000.0,
      currency: 'USD',
    },
  ],
  'US02079K1079': [
    {
      clientName: 'Global Industries',
      organizationName: 'Global Industries Ltd',
      organizationNum: 'PFL-0JF2RAR548R1Y',
      subOrganizationName: 'Operations',
      subOrganizationNum: 'PFL-SUB-003',
      subAccountNum: null,
      effectiveValueAmt: 80000.0,
      currency: 'USD',
    },
    {
      clientName: 'Acme Corporation',
      organizationName: 'Acme Corporation',
      organizationNum: 'PFL-0JSKBG438987V',
      subOrganizationName: 'Sales Department',
      subOrganizationNum: 'PFL-SUB-002',
      subAccountNum: null,
      effectiveValueAmt: 60000.0,
      currency: 'USD',
    },
  ],
  'SG1L01001701': [
    {
      clientName: 'Pacific Financial',
      organizationName: 'Pacific Financial Group',
      organizationNum: 'ORG-002',
      subOrganizationName: 'Pacific Financial Group',
      subOrganizationNum: 'ORG-002',
      subAccountNum: null,
      effectiveValueAmt: 120000.0,
      currency: 'SGD',
    },
  ],
  'GB00B10RZP78': [
    {
      clientName: 'Tech Ventures',
      organizationName: 'Tech Ventures Inc',
      organizationNum: 'ORG-001',
      subOrganizationName: 'Product Division',
      subOrganizationNum: 'SUB-TECH-002',
      subAccountNum: null,
      effectiveValueAmt: 90000.0,
      currency: 'GBP',
    },
  ],
}
