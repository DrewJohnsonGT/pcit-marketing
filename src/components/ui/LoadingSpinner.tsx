import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '~/utils/cn';

const spinnerVariants = cva('size-12 shrink-0 origin-center stroke-[6px]', {
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
  variants: {
    color: {
      primary: 'stroke-primary',
    },
    size: {
      lg: 'size-14',
      md: 'size-10',
      sm: 'size-8',
      xs: 'size-6',
    },
  },
});

const LoadingSpinner: React.FC<React.ComponentProps<'svg'> & VariantProps<typeof spinnerVariants>> = ({
  className,
  color,
  size,
  ...props
}) => (
  <svg viewBox="0 0 50 50" className={cn(spinnerVariants({ color, size }), `animate-spin`, className)} {...props}>
    <circle
      className={cn('animate-loading-spinner fill-none')}
      cx="25"
      cy="25"
      r="20"
      strokeLinecap="round"
      strokeDasharray="1,200"
      strokeDashoffset="0"
    />
  </svg>
);

LoadingSpinner.displayName = 'LoadingSpinner';

export { LoadingSpinner };
