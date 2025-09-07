import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '~/utils/cn';

const badgeVariants = cva(
  `
    inline-flex h-auto w-fit items-center rounded-full border border-border font-semibold transition-colors
    focus:outline-hidden
  `,
  {
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
    variants: {
      size: {
        lg: 'min-h-input px-3 py-1 text-base',
        md: 'min-h-8 px-2 py-0.5',
        sm: 'px-2 text-sm',
      },
      variant: {
        default: 'bg-card text-card-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        muted: 'bg-muted/50 text-muted-foreground',
        outline: 'text-foreground',
        primary: 'border border-primary bg-primary/20 text-primary',
        secondary: 'bg-secondary text-secondary-foreground',
        success: 'border border-success bg-success/20 text-success',
        warning: 'border-amber-500 bg-amber-500/30',
      },
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, size, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ size, variant }), className)} {...props} />;
}

export { Badge };
