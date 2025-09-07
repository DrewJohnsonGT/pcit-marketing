'use client';

import { useState } from 'react';
import { PRICING_PLANS, YEARLY_RATE_MULTIPLIER } from './constants';
import { EnterpriseDialog } from './EnterpriseDialog';
import { FeatureTable } from './FeatureTable';
import { SubscriptionCard } from './SubscriptionCard';
import { BillingCycle, PricingPlan } from './types';
import { CountingNumber } from '@pcit/shared/components/CountingNumber';
import { Badge } from '@pcit/shared/components/ui/Badge';
import { Button } from '@pcit/shared/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@pcit/shared/components/ui/Card';
import { Switch } from '@pcit/shared/components/ui/Switch';
import { cn } from '@pcit/shared/utils/cn';
import { ICONS } from '@pcit/shared/utils/icons';

const getMonthlyRate = (price: number, billingCycle: BillingCycle) => {
  return billingCycle === 'annual' ? price * YEARLY_RATE_MULTIPLIER : price;
};

export const PricingPlans = ({
  currentPlan,
  onPlanChange,
  onCancelPlan,
  onReactivatePlan,
  isLoading,
  showSubscriptionCard = false,
}: {
  currentPlan?: {
    cancelAtPeriodEnd: boolean;
    endDate?: Date;
    plan: PricingPlan;
    startDate?: Date;
    subscriptionId?: string;
  };
  isLoading?: boolean;
  onCancelPlan?: () => void;
  onPlanChange?: ({
    newPlan,
    annual,
    seats,
    currentSubscriptionId,
  }: {
    annual: boolean;
    currentSubscriptionId?: string;
    newPlan: PricingPlan;
    seats?: number;
  }) => Promise<void>;
  onReactivatePlan?: () => Promise<void>;
  showSubscriptionCard?: boolean;
}) => {
  const [isEnterpriseDialogOpen, setIsEnterpriseDialogOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('monthly');

  const handlePlanChange = (plan: PricingPlan, annual: boolean, seats?: number) => {
    if (plan === PricingPlan.ENTERPRISE) {
      setIsEnterpriseDialogOpen(true);
      return;
    }
    onPlanChange?.({
      annual,
      currentSubscriptionId: currentPlan?.subscriptionId,
      newPlan: plan,
      seats,
    });
  };
  return (
    <div className="flex max-w-full flex-1 flex-col items-center gap-10">
      {showSubscriptionCard && (
        <SubscriptionCard
          currentPlan={currentPlan}
          isLoading={isLoading}
          onCancelPlan={onCancelPlan}
          onReactivatePlan={onReactivatePlan}
        />
      )}
      <div className="flex items-center gap-2">
        <span>Monthly</span>
        <Switch
          checked={billingCycle === 'annual'}
          onCheckedChange={(checked) => setBillingCycle(checked ? 'annual' : 'monthly')}
          aria-label="Billing Cycle"
        />
        <span className="flex items-center gap-2">
          Annually
          <Badge variant="success" size="sm">
            Save {100 - YEARLY_RATE_MULTIPLIER * 100}%
          </Badge>
        </span>
      </div>

      <div
        className={`
          relative grid grid-cols-1 items-stretch gap-2
          xl:grid-cols-3 xl:items-center
        `}
      >
        {Object.entries(PRICING_PLANS).map(([plan, { color, description, features, icon: Icon, name, price }]) => {
          const isCurrentPricingPlan = plan === currentPlan?.plan;
          const isMostPopularPlan = plan === PricingPlan.PRO;
          return (
            <Card
              key={plan}
              className={cn(
                `
                  h-full min-w-sm px-0 shadow-md transition-all duration-200
                  xl:min-w-xs
                `,
                isMostPopularPlan &&
                  `relative z-10 scale-105 shadow-[0_0_0_2px_hsl(var(--primary)/70%)] ring-[6px] ring-primary/50`,
                isCurrentPricingPlan && `shadow-[0_0_0_2px_hsl(var(--success)/70%)] ring-[6px] ring-success/50`,
              )}
            >
              {isMostPopularPlan && (
                <div className="absolute -top-2 -right-2 z-10 rotate-12">
                  <Badge
                    variant="outline"
                    className={`
                      bg-background/20 px-2 py-1 font-semibold shadow-[0_0_0_2px_hsl(var(--secondary)/70%)] ring
                      ring-secondary/50 backdrop-blur-sm
                    `}
                  >
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="flex flex-col items-center justify-center gap-2">
                <CardTitle
                  className={`
                    flex flex-col items-center justify-center gap-2 text-center text-2xl text-foreground uppercase
                  `}
                >
                  <Icon
                    className="size-16!"
                    style={{
                      color,
                    }}
                  />
                  {name}
                </CardTitle>
                <CardDescription className={`h-20 p-2 text-center text-foreground`}>{description}</CardDescription>
              </CardHeader>
              <CardContent className={`flex w-full flex-col items-center p-0`}>
                <div className="flex h-24 flex-col items-center justify-center">
                  {typeof price === 'number' && (
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-bold">$</span>
                      <CountingNumber
                        className="text-5xl font-extrabold text-secondary"
                        start={getMonthlyRate(price as number, billingCycle === 'monthly' ? 'annual' : 'monthly')}
                        end={getMonthlyRate(price as number, billingCycle)}
                      />
                      <span className={`text-sm font-medium text-muted-foreground`}>/ month</span>
                    </div>
                  )}
                  {typeof price === 'string' && <p className="text-3xl font-bold text-secondary">{price}</p>}
                </div>
                <ul className="list-none pt-4">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <ICONS.Check className="mr-2 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className={`mt-4 flex flex-col items-center justify-center gap-2 border-t-0`}>
                {isCurrentPricingPlan && (
                  <div className="flex flex-col items-center gap-2">
                    <Badge variant="success" size="sm">
                      Current Plan
                    </Badge>
                    {plan !== PricingPlan.FREE && !currentPlan?.cancelAtPeriodEnd && (
                      <Button variant="outline" size="sm" color="destructive" onClick={onCancelPlan}>
                        Cancel
                      </Button>
                    )}
                    {plan !== PricingPlan.FREE && currentPlan?.cancelAtPeriodEnd && (
                      <Button variant="primaryOutline" size="sm" onClick={onReactivatePlan}>
                        Reactivate Plan
                      </Button>
                    )}
                  </div>
                )}
                {onPlanChange && !isCurrentPricingPlan && plan === PricingPlan.PRO && (
                  <Button onClick={() => handlePlanChange(plan as PricingPlan, billingCycle === 'annual')}>
                    Choose {name}
                  </Button>
                )}
                {onPlanChange && !isCurrentPricingPlan && plan === PricingPlan.ENTERPRISE && (
                  <Button onClick={() => handlePlanChange(plan as PricingPlan, billingCycle === 'annual')}>
                    Learn more
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <FeatureTable />
      <EnterpriseDialog
        open={isEnterpriseDialogOpen}
        onOpenChange={setIsEnterpriseDialogOpen}
        onSubscribe={async (seats, billingCycle) => {
          await onPlanChange?.({
            annual: billingCycle === 'annual',
            currentSubscriptionId: currentPlan?.subscriptionId,
            newPlan: PricingPlan.ENTERPRISE,
            seats,
          });
        }}
      />
    </div>
  );
};
