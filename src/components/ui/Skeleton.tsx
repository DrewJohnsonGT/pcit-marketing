import { cn } from '~/utils/cn';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('skeleton rounded-sm', className)} {...props} />;
}
export { Skeleton };
