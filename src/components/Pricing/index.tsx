'use client';

import { useState } from 'react';
import { PRICING_PLANS, YEARLY_RATE_MULTIPLIER } from './constants';
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
    <div className="flex w-full max-w-full flex-1 flex-col items-center gap-14">
      <Card className="p-4">
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
      </Card>

      <div
        className={`
          flex w-full flex-col items-center justify-center gap-8
          sm:gap-14
          xl:flex-row xl:gap-2
        `}
      >
        {Object.entries(PRICING_PLANS).map(([plan, { color, description, features, icon: Icon, name, price }]) => {
          const isMostPopularPlan = plan === PricingPlan.PRO;
          return (
            <Card
              key={plan}
              className={cn(
                `
                  h-full w-full max-w-sm flex-1 px-0 shadow-md transition-all duration-200
                  sm:max-w-md
                  xl:min-w-sm
                `,
                isMostPopularPlan &&
                  `
                    relative z-10 shadow-[0_0_0_2px_hsl(var(--secondary)/70%)] ring-[6px] ring-secondary/50
                    sm:scale-110
                  `,
              )}
            >
              {isMostPopularPlan && (
                <div
                  className={`
                    absolute right-1/2 z-10 translate-x-1/2 -translate-y-1/2
                    sm:-top-2 sm:-right-2 sm:translate-x-0 sm:translate-y-0 sm:rotate-12
                  `}
                >
                  <Badge
                    variant="outline"
                    className={`
                      bg-background px-2 py-1 font-semibold shadow-[0_0_0_2px_hsl(var(--secondary)/70%)] ring-4
                      ring-secondary/50
                      sm:bg-background/20 sm:backdrop-blur-xs
                    `}
                  >
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="flex flex-col items-center justify-center pt-6">
                <CardTitle
                  className={`
                    flex flex-col items-center justify-center gap-0 text-center text-2xl tracking-wide text-foreground
                    uppercase
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
                <CardDescription className={`flex h-20 items-center px-4 text-center text-lg text-foreground`}>
                  {description}
                </CardDescription>
              </CardHeader>
              <CardContent className={`flex w-full flex-col items-center py-4`}>
                <div className="flex flex-col items-center justify-center">
                  {typeof price === 'number' && (
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-bold">$</span>
                      <CountingNumber
                        className="text-5xl font-extrabold text-secondary"
                        start={getMonthlyRate(price as number, billingCycle === 'monthly' ? 'annual' : 'monthly')}
                        end={getMonthlyRate(price as number, billingCycle)}
                      />
                      <span className={`font-medium text-muted-foreground`}>/ month</span>
                    </div>
                  )}
                  {typeof price === 'string' && <p className="text-4xl font-bold text-secondary">{price}</p>}
                </div>
                <ul className="flex list-none flex-col gap-2 py-4">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <ICONS.CheckCircle className="size-6 text-success" />
                      <span className="font-medium text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
