import { Badge } from '@pcit/shared/components/ui/Badge';
import { Button } from '@pcit/shared/components/ui/Button';
import {
    Dialog,
    DialogBody,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@pcit/shared/components/ui/Dialog';
import { Input } from '@pcit/shared/components/ui/Input';
import { Label } from '@pcit/shared/components/ui/Label';
import { Separator } from '@pcit/shared/components/ui/Separator';
import { Switch } from '@pcit/shared/components/ui/Switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@pcit/shared/components/ui/Table';
import { A } from '@pcit/shared/components/ui/Typography.jsx';
import { useFeatureFlags } from '@pcit/shared/hooks/useFeatureFlags';
import { cn } from '@pcit/shared/utils/cn';
import { SUPPORT_EMAIL } from '@pcit/shared/utils/constants';
import { useState } from 'react';
import { ENTERPRISE_LICENSE_BASE_PRICE, USER_LICENSE_BASE_PRICE, YEARLY_RATE_MULTIPLIER } from './constants';
import { BillingCycle } from './types';

const getPerUserPrice = (licenses: number): number => {
  if (licenses <= 5) return 22;
  if (licenses <= 10) return 20;
  if (licenses <= 20) return 18;
  return 16;
};

const getTotalPrice = (licenses: number, billingCycle: BillingCycle): number => {
  const perUser = getPerUserPrice(licenses);
  const total = ENTERPRISE_LICENSE_BASE_PRICE + perUser * licenses;
  if (billingCycle === 'annual') {
    return Math.round(total * YEARLY_RATE_MULTIPLIER * 100) / 100;
  }
  return total;
};

const getPriceLabel = (billingCycle: BillingCycle): string => {
  return billingCycle === 'annual' ? 'per month (billed annually)' : 'per month';
};

export const EnterpriseDialog = ({
  open,
  onOpenChange,
  onSubscribe,
}: {
  onOpenChange: (open: boolean) => void;
  onSubscribe: (licenses: number, billingCycle: BillingCycle) => Promise<void>;
  open: boolean;
}) => {
  const isEnterpriseEnabled = useFeatureFlags((state) => state.isEnabled('ENTERPRISE'));

  const [licenses, setLicenses] = useState<number>(5);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  const handleLicensesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/\D/g, ''));
    setLicenses(Math.max(1, Math.min(1000, value)));
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      await onSubscribe(licenses, billingCycle);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const perUser = getPerUserPrice(licenses);
  const perUserSavings = USER_LICENSE_BASE_PRICE - perUser;

  const monthlyTotal = getTotalPrice(licenses, 'monthly');
  const annualMonthlyRate = getTotalPrice(licenses, 'annual');
  const annualTotal = annualMonthlyRate * 12;
  const monthlyTotalAnnualized = monthlyTotal * 12;
  const annualSavings = monthlyTotalAnnualized - annualTotal;

  const total = billingCycle === 'annual' ? annualMonthlyRate : monthlyTotal;
  const fullYearPrice = billingCycle === 'annual' ? annualTotal : monthlyTotal * 12;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Enterprise Plan</DialogTitle>
          <DialogDescription>
            The enterprise plan allows you to create an organization. <br /> You can invite users to your organization
            and view aggregated data across all your users and their families/sessions
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <div>
              The owner license is <b>$79/month</b> and allows you to create an organization and invite users. <br />
              <br />
              The number of users you can invite is based on the licenses you set here, but you can{' '}
              <b>always add or remove licenses later</b>
            </div>
            <Separator />
            <div className="flex items-center justify-center gap-2">
              <span className={cn(billingCycle === 'monthly' && 'font-medium')}>Monthly</span>
              <Switch
                checked={billingCycle === 'annual'}
                onCheckedChange={(checked) => setBillingCycle(checked ? 'annual' : 'monthly')}
                aria-label="Billing Cycle"
              />
              <span className="flex items-center gap-2">
                <span className={cn(billingCycle === 'annual' && 'font-medium')}>Annually</span>
                <Badge variant="success" size="sm">
                  Save ${annualSavings.toFixed(0)}/year
                </Badge>
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-around gap-1">
              <div>
                <div className="mb-1 font-semibold">Tiered Pricing Table</div>
                <Table className="max-w-xs overflow-hidden rounded border text-sm">
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead className="px-2 py-1 text-left font-medium">Licenses</TableHead>
                      <TableHead className="px-2 py-1 text-left font-medium">Per User</TableHead>
                      <TableHead className="px-2 py-1 text-left font-medium">Savings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className={cn(licenses <= 5 && 'bg-success/15')}>
                      <TableCell className="px-2 py-1">1-5</TableCell>
                      <TableCell className="px-2 py-1">$22</TableCell>
                      <TableCell className="px-2 py-1 font-medium text-green-600">Save $2/user</TableCell>
                    </TableRow>
                    <TableRow className={cn(licenses >= 6 && licenses <= 10 && 'bg-success/15')}>
                      <TableCell className="px-2 py-1">6-10</TableCell>
                      <TableCell className="px-2 py-1">$20</TableCell>
                      <TableCell className="px-2 py-1 font-medium text-green-600">Save $4/user</TableCell>
                    </TableRow>
                    <TableRow className={cn(licenses >= 11 && licenses <= 20 && 'bg-success/15')}>
                      <TableCell className="px-2 py-1">11-20</TableCell>
                      <TableCell className="px-2 py-1">$18</TableCell>
                      <TableCell className="px-2 py-1 font-medium text-green-600">Save $6/user</TableCell>
                    </TableRow>
                    <TableRow className={cn(licenses >= 21 && 'bg-success/15')}>
                      <TableCell className="px-2 py-1">21+</TableCell>
                      <TableCell className="px-2 py-1">$16</TableCell>
                      <TableCell className="px-2 py-1 font-medium text-green-600">Save $8/user</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="flex flex-col gap-4">
                <span className="max-w-xs font-medium">
                  Enterprise licenses are <b>always cheaper than individual licenses ($24/user)</b>, with additional
                  volume discounts as you add more users.{' '}
                </span>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="licenses">Licenses</Label>
                  <Input
                    id="licenses"
                    type="number"
                    min={1}
                    max={100}
                    value={licenses}
                    onChange={handleLicensesChange}
                    className="max-w-16"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    aria-label="Licenses"
                  />
                </div>
              </div>
            </div>

            {perUserSavings > 0 && (
              <div className={`rounded-lg border border-success bg-success/10 p-3`}>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <b className="text-foreground">${perUser}/user</b> for {licenses} license{licenses > 1 ? 's' : ''}
                  </div>
                  <Badge variant="success" size="sm" className="ml-2">
                    {((perUserSavings / USER_LICENSE_BASE_PRICE) * 100).toFixed(0)}% off vs individual (Saving $
                    {perUserSavings}/user/month)
                  </Badge>
                </div>
                {billingCycle === 'annual' && (
                  <div className={`text-center font-medium text-success`}>
                    <span className="text-xl">🎉</span> You save{' '}
                    <span className="text-lg font-semibold">${annualSavings.toFixed(0)}</span> per year with annual
                    billing!
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted/50 p-4 text-center">
              <div className="text-lg font-semibold">
                <span className="text-2xl text-primary">
                  ${total.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                </span>{' '}
                <span className="text-sm text-muted-foreground">{getPriceLabel(billingCycle)}</span>
              </div>

              {billingCycle === 'annual' && (
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-semibold text-primary">
                    ${fullYearPrice.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                    <span className="text-sm text-muted-foreground">/year</span>
                  </span>
                </div>
              )}
              {billingCycle === 'monthly' && (
                <div>
                  Full year cost: ${(monthlyTotal * 12).toLocaleString()}
                  <span
                    className={`
                      ml-1 cursor-pointer text-primary
                      hover:underline
                    `}
                    onClick={() => setBillingCycle('annual')}
                  >
                    (switch to annual to save ${annualSavings.toFixed(0)})
                  </span>
                </div>
              )}
            </div>
          </div>
        </DialogBody>
        <DialogFooter
          className={`
            gap-2
            sm:justify-between
          `}
        >
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {isEnterpriseEnabled && (
            <Button
              onClick={handleSubscribe}
              disabled={isLoading || licenses < 1 || licenses > 1000}
              loading={isLoading}
              loadingText="Taking you to checkout..."
            >
              Go to Checkout ({licenses} license{licenses > 1 ? 's' : ''})
            </Button>
          )}
          {!isEnterpriseEnabled && (
            <div className="flex items-center text-muted-foreground">
              Coming soon! Contact us if you&apos;re interested.{' '}
              <A href={`mailto:${SUPPORT_EMAIL}`} className="ml-2">
                {SUPPORT_EMAIL}
              </A>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
