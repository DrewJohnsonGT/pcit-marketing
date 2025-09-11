import { FEATURES, PRICING_PLANS } from './constants';
import { PricingPlan } from './types';
import { FaCheckSquare } from 'react-icons/fa';
import { GoDash } from 'react-icons/go';
import { LuInfinity, LuInfo } from 'react-icons/lu';
import { ScrollArea, ScrollBar } from '~/components/ui/ScrollArea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/Table';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/Tooltip';

export const FeatureTable = () => {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-full flex-1 flex-col">
      <ScrollArea className="min-h-0 rounded-md border bg-background" type="auto">
        <Table className="w-full whitespace-nowrap">
          <TableHeader>
            <TableRow className="text-xl">
              <TableHead className="text-lg font-semibold" />
              {Object.entries(PRICING_PLANS).map(([plan, { icon: PlanIcon, color, name }]) => {
                return (
                  <TableHead key={plan} className="pt-2 text-lg capitalize">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex items-center justify-center rounded-full border bg-background p-1`}
                        style={{ color }}
                      >
                        <PlanIcon className="inline size-8 stroke-2" />
                      </div>
                      <span className="text-sm text-foreground">{name}</span>
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {FEATURES.map((feature) => (
              <TableRow key={feature.key}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <feature.icon className="size-8 text-primary" />
                    {feature.name}
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <LuInfo className={`size-4 cursor-help text-muted-foreground`} />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        {feature.description}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
                {Object.entries(PRICING_PLANS).map(([plan, planValue]) => {
                  const { color } = planValue;
                  return (
                    <TableCell key={plan}>
                      <div
                        className="flex min-w-24 items-center justify-center"
                        style={{
                          color,
                        }}
                      >
                        {typeof feature.availability[plan as PricingPlan] === 'boolean' ? (
                          feature.availability[plan as PricingPlan] ? (
                            <FaCheckSquare className="size-8" />
                          ) : (
                            <GoDash className="size-8" />
                          )
                        ) : feature.availability[plan as PricingPlan] === 'Unlimited' ? (
                          <LuInfinity className="size-8" />
                        ) : (
                          <span className="text-2xl font-semibold">{feature.availability[plan as PricingPlan]}</span>
                        )}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
