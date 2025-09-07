import * as React from 'react';
import { cn } from '~/utils/cn';
import { Skeleton } from './Skeleton';

export const sharedInputClasses = cn(
  'flex h-input w-full rounded-md bg-input-background px-2 py-2 leading-none',
  'shadow-input transition-all duration-200',
  'placeholder:text-muted-foreground/80',
  'hover:shadow-input-hover',
  'focus-visible:shadow-input-focus focus-visible:ring-[6px] focus-visible:ring-ring/50',
  'focus-visible:ring-offset-0 focus-visible:outline-hidden',
  'disabled:cursor-not-allowed disabled:opacity-50',
);

const Input: React.FC<React.ComponentProps<'input'>> = ({ className, type, ...props }) => (
  <input type={type} className={cn(sharedInputClasses, className)} {...props} />
);
Input.displayName = 'Input';

export const InputSkeleton = () => <Skeleton className="h-input w-full" />;

export { Input };
