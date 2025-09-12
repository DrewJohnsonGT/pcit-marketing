import { Feature, PricingPlan } from './types';
import { IoMdApps } from 'react-icons/io';
import { LuCode, LuHeadset } from 'react-icons/lu';
import { PiCircleDuotone, PiHexagonDuotone, PiTriangleDuotone } from 'react-icons/pi';
import { ICONS, Icons } from '~/utils/icons';

export const YEARLY_RATE_MULTIPLIER = 0.75;

export type PricingPlanInfo = {
  color: string;
  description: string;
  features: string[];
  icon: React.ElementType;
  name: string;
  price: number | string;
};

export const PRICING_PLANS: Partial<Record<PricingPlan, PricingPlanInfo>> = {
  [PricingPlan.FREE]: {
    color: '#3cc1c8',
    description: 'Try out the platform as long as you want for free!',
    features: ['3 Families', '20 Sessions', 'Data Visualization', 'CSV Export', 'PDF Export'],
    icon: PiCircleDuotone,
    name: 'Starter',
    price: 'Free',
  },
  [PricingPlan.PRO]: {
    color: '#0088cc',
    description: 'Perfect for small PCIT practices or individual clinicians',
    features: ['Unlimited Families', 'Unlimited Sessions', 'Family Export/Import', 'Report Generation'],
    icon: PiTriangleDuotone,
    name: 'Pro',
    price: 24,
  },
  [PricingPlan.ENTERPRISE]: {
    color: '#6A1B9A',
    description: 'Tailored solutions for PCIT organizations',
    features: [
      'Everything in Pro Plus',
      'Manage your organization',
      'Cheaper per user licenses',
      'Custom Integrations',
      'API Access',
    ],
    icon: PiHexagonDuotone,
    name: 'Enterprise',
    price: 'Custom',
  },
};

export const FEATURES = [
  {
    availability: {
      [PricingPlan.FREE]: 3,
      [PricingPlan.PRO]: 'Unlimited',
      [PricingPlan.ENTERPRISE]: 'Unlimited',
    },
    description: 'The number of families you can track in your account',
    icon: ICONS[Icons.Family],
    key: Feature.Families,
    name: 'Families',
  },
  {
    availability: {
      [PricingPlan.FREE]: 20,
      [PricingPlan.PRO]: 'Unlimited',
      [PricingPlan.ENTERPRISE]: 'Unlimited',
    },
    description: 'The total number of sessions you can create across all families',
    icon: ICONS[Icons.Session],
    key: Feature.Sessions,
    name: 'Sessions',
  },
  {
    availability: {
      [PricingPlan.FREE]: true,
      [PricingPlan.PRO]: true,
      [PricingPlan.ENTERPRISE]: true,
    },
    description: 'Graphs and charts are automatically generated for your families',
    icon: ICONS[Icons.Data],
    key: Feature.DataVisualization,
    name: 'Data Visualization',
  },
  {
    availability: {
      [PricingPlan.FREE]: true,
      [PricingPlan.PRO]: true,
      [PricingPlan.ENTERPRISE]: true,
    },
    description: 'Export your data to CSV for easy integration with other tools',
    icon: ICONS[Icons.CSVSimple],
    key: Feature.CSVExport,
    name: 'CSV Export',
  },
  {
    availability: {
      [PricingPlan.FREE]: true,
      [PricingPlan.PRO]: true,
      [PricingPlan.ENTERPRISE]: true,
    },
    description: 'Export charts and graphs to PDF for easy printing',
    icon: ICONS[Icons.PDFSimple],
    key: Feature.PDFExport,
    name: 'PDF Export',
  },
  {
    availability: {
      [PricingPlan.FREE]: false,
      [PricingPlan.PRO]: true,
      [PricingPlan.ENTERPRISE]: true,
    },
    description:
      'If you need to transfer PCIT clients to another therapist using the PCIT Tracker, we have developed a process for exporting your client data via JSON download. You can send this data to your colleagues, allowing them to import client data and pick up from where you left off!',
    icon: ICONS[Icons.Export],
    key: Feature.ImportExportFamilies,
    name: 'Import/Export Families',
  },
  {
    availability: {
      [PricingPlan.FREE]: false,
      [PricingPlan.PRO]: true,
      [PricingPlan.ENTERPRISE]: true,
    },
    description: 'Generate output reports based on family data and templates you can customize',
    icon: ICONS[Icons.Report],
    key: Feature.Report,
    name: 'Automated Report Generation',
  },
  {
    availability: {
      [PricingPlan.FREE]: false,
      [PricingPlan.PRO]: false,
      [PricingPlan.ENTERPRISE]: true,
    },
    description: 'Create and manage your organization, invite members, and see aggregate data across your organization',
    icon: ICONS[Icons.Organization],
    key: Feature.Organization,
    name: 'Organization Management',
  },
  {
    availability: {
      [PricingPlan.FREE]: false,
      [PricingPlan.PRO]: false,
      [PricingPlan.ENTERPRISE]: true,
    },
    description: 'Get dedicated support from our team to help you with your account',
    icon: LuHeadset,
    key: Feature.Support,
    name: 'Dedicated Support',
  },
  {
    availability: {
      [PricingPlan.FREE]: false,
      [PricingPlan.PRO]: false,
      [PricingPlan.ENTERPRISE]: true,
    },
    description: 'Direct access to our APIs to integrate with other tools and automate your workflows',
    icon: LuCode,
    key: Feature.API,
    name: 'API Access',
  },
  {
    availability: {
      [PricingPlan.FREE]: false,
      [PricingPlan.PRO]: false,
      [PricingPlan.ENTERPRISE]: true,
    },
    description: 'Integrate with other tools and automate your workflows with custom prebuilt integrations',
    icon: IoMdApps,
    key: Feature.Integrations,
    name: 'Custom Integrations',
  },
];
