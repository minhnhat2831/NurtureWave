import type { Organization, SubOrganization } from '../types'

// ==================== MOCK ORGANIZATIONS ====================

export const mockOrgs: Organization[] = [
  {
    id: 'PFL-0JSKBG438987V',
    name: 'Acme Corporation',
    shortName: 'ACME',
    countryCode: 'US',
  },
  {
    id: 'PFL-0JF2RAR548R1Y',
    name: 'Global Industries Ltd',
    shortName: 'GLOBAL',
    countryCode: 'SG',
  },
  {
    id: 'SFOVI000529',
    name: 'Scott Test Organization',
    shortName: 'SCOTT',
    countryCode: 'US',
  },
  {
    id: 'ORG-001',
    name: 'Tech Ventures Inc',
    shortName: 'TECH',
    countryCode: 'UK',
  },
  {
    id: 'ORG-002',
    name: 'Pacific Financial Group',
    shortName: 'PACIFIC',
    countryCode: 'AU',
  },
]

// ==================== MOCK SUB-ORGANIZATIONS ====================

export const mockSubOrgs: Record<string, SubOrganization[]> = {
  'PFL-0JSKBG438987V': [
    {
      id: 'SUB-001',
      subOrgId: 'PFL-0JF2RAR548R1Y',
      name: 'Marketing Department',
      orgId: 'PFL-0JSKBG438987V',
      description: 'Marketing and Brand Management',
    },
    {
      id: 'SUB-002',
      subOrgId: 'PFL-SUB-002',
      name: 'Sales Department',
      orgId: 'PFL-0JSKBG438987V',
      description: 'Sales and Business Development',
    },
  ],
  'PFL-0JF2RAR548R1Y': [
    {
      id: 'SUB-003',
      subOrgId: 'PFL-SUB-003',
      name: 'Operations',
      orgId: 'PFL-0JF2RAR548R1Y',
      description: 'Global Operations Division',
    },
  ],
  'SFOVI000529': [
    {
      id: 'SUB-004',
      subOrgId: 'SRG-0F648HDFY8832',
      name: 'Scott Test Sub-Org',
      orgId: 'SFOVI000529',
      description: 'Testing sub-organization',
    },
  ],
  'ORG-001': [
    {
      id: 'SUB-005',
      subOrgId: 'SUB-TECH-001',
      name: 'R&D Division',
      orgId: 'ORG-001',
      description: 'Research and Development',
    },
    {
      id: 'SUB-006',
      subOrgId: 'SUB-TECH-002',
      name: 'Product Division',
      orgId: 'ORG-001',
      description: 'Product Management',
    },
  ],
  'ORG-002': [],
}
