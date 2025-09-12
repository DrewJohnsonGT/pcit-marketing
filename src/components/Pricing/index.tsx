'use client';

import { useState } from 'react';
import { PRICING_PLANS, YEARLY_RATE_MULTIPLIER } from './constants';
import { FeatureTable } from './FeatureTable';
import { BillingCycle, PricingPlan } from './types';
import { CountingNumber } from '~/components/CountingNumber';
import { Badge } from '~/components/ui/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/Card';
import { Switch } from '~/components/ui/Switch';
import { cn } from '~/utils/cn';
import { ICONS } from '~/utils/icons';

const getMonthlyRate = (price: number, billingCycle: BillingCycle) => {
  return billingCycle === 'annual' ? price * YEARLY_RATE_MULTIPLIER : price;
};

export const PricingPlans = () => {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('monthly');

  return (
    <div className="flex max-w-full flex-1 flex-col items-center gap-10">
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
            </Card>
          );
        })}
      </div>
      <FeatureTable />
    </div>
  );
};
