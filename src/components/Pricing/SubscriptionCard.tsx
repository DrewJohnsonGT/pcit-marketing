import { PricingPlanBadge } from './PricingPlanBadge';
import { PricingPlan } from './types';
import { Button } from '~/components/ui/Button';
import { Card, CardContent, CardFooter } from '~/components/ui/Card';
import { Label } from '~/components/ui/Label';
import { Skeleton } from '~/components/ui/Skeleton';
import { P } from '~/components/ui/Typography';
import { formatDate } from '~/utils/formatDate';

const SubscriptionCardSkeleton = () => {
  return (
    <Card className="mx-auto mt-4 w-full max-w-md">
      <CardContent className="flex flex-col items-center gap-2">
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
};

export const SubscriptionCard = ({
  currentPlan,
  isLoading,
  onReactivatePlan,
  onCancelPlan,
}: {
  currentPlan?: {
    cancelAtPeriodEnd: boolean;
    endDate?: Date;
    plan: PricingPlan;
    startDate?: Date;
  };
  isLoading?: boolean;
  onCancelPlan?: () => void;
  onReactivatePlan?: () => Promise<void>;
}) => {
  const isActive = currentPlan && !currentPlan.cancelAtPeriodEnd && currentPlan.startDate;
  const isCanceled = currentPlan?.cancelAtPeriodEnd;

  if (isLoading) {
    return <SubscriptionCardSkeleton />;
  }

  return (
    <Card className="mx-auto mt-4 max-w-md">
      <CardContent className="flex flex-col items-center gap-2">
        <div className={`flex w-full flex-1 flex-wrap items-center justify-center gap-4`}>
          <div className="flex flex-col items-center gap-2">
            <Label className="font-semibold">Your current plan</Label>
            <PricingPlanBadge plan={currentPlan?.plan} />
          </div>
          {currentPlan?.startDate && currentPlan?.endDate && (
            <div className="flex flex-col items-center gap-2">
              <Label className="font-semibold">Current Billing Period</Label>
              <div className="flex items-center gap-2">
                <P>{formatDate(currentPlan.startDate, 'M/dd/yyyy')}</P>
                <span>-</span>
                <P>{formatDate(currentPlan.endDate, 'M/dd/yyyy')}</P>
              </div>
            </div>
          )}
        </div>
        {isCanceled && (
          <div className="flex w-full flex-col items-center gap-2">
            <P className="text-center font-semibold text-warning">
              Your plan will end on {formatDate(currentPlan.endDate ?? new Date(), 'M/dd/yyyy')}
            </P>
          </div>
        )}
      </CardContent>
      {isActive && (onReactivatePlan || onCancelPlan) && (
        <CardFooter className="flex flex-col items-center gap-2">
          {isCanceled && onReactivatePlan && (
            <Button variant="outline" size="sm" onClick={onReactivatePlan}>
              Reactivate Plan
            </Button>
          )}
          {isActive && onCancelPlan && (
            <Button variant="outline" size="sm" onClick={onCancelPlan}>
              Cancel Plan
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
