import { PricingPlan } from './types';
import { PiCircleDuotone, PiHexagonDuotone, PiTriangleDuotone } from 'react-icons/pi';

export const YEARLY_RATE_MULTIPLIER = 0.75;

type PricingPlanInfo = {
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
    features: [
      'Unlimited Families',
      'Unlimited Sessions',
      'Family Export/Import',
      'Report Generation',
      'Organization Management',
    ],
    icon: PiTriangleDuotone,
    name: 'Pro',
    price: 24,
  },
  [PricingPlan.ENTERPRISE]: {
    color: '#6A1B9A',
    description: 'Tailored solutions for PCIT organizations',
    features: ['Everything in Pro', 'Manage user licenses', 'Custom Integrations', 'Dedicated Support', 'API Access'],
    icon: PiHexagonDuotone,
    name: 'Enterprise',
    price: 'Custom',
  },
};
