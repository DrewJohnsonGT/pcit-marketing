import { PRICING_PLANS, PricingPlanInfo } from './constants';
import { PricingPlan } from './types';
import { Badge, BadgeProps } from '@pcit/shared/components/ui/Badge';

const getPricingPlan = (plan?: PricingPlan): PricingPlanInfo => {
  switch (plan?.toUpperCase()) {
    case PricingPlan.FREE:
      return PRICING_PLANS[PricingPlan.FREE] as PricingPlanInfo;
    case PricingPlan.PRO:
      return PRICING_PLANS[PricingPlan.PRO] as PricingPlanInfo;
    case PricingPlan.ENTERPRISE:
      return PRICING_PLANS[PricingPlan.ENTERPRISE] as PricingPlanInfo;
    default:
      return PRICING_PLANS[PricingPlan.FREE] as PricingPlanInfo;
  }
};

export const PricingPlanBadge = ({ plan, size = 'md' }: { plan?: PricingPlan; size?: BadgeProps['size'] }) => {
  const pricingPlan = getPricingPlan(plan);
  const Icon = pricingPlan.icon;
  return (
    <Badge
      className="flex items-center gap-2"
      style={{ backgroundColor: pricingPlan.color + '10', borderColor: pricingPlan.color }}
      size={size}
    >
      <Icon className="size-4" style={{ borderColor: pricingPlan.color, color: pricingPlan.color }} />
      {pricingPlan.name}
    </Badge>
  );
};
