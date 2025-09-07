export enum PricingPlan {
  ENTERPRISE = 'ENTERPRISE',
  FREE = 'FREE',
  PRO = 'PRO',
}

export type BillingCycle = 'annual' | 'monthly';

export enum Feature {
  API = 'API',
  CSVExport = 'CSV Export',
  DataVisualization = 'Data Visualization',
  Families = 'Families',
  ImportExportFamilies = 'Import/Export Families',
  Integrations = 'Integrations',
  Organization = 'Organization',
  PDFExport = 'PDF Export',
  Report = 'Report',
  Sessions = 'Sessions',
  Support = 'Support',
}
