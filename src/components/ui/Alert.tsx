import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '~/utils/cn';

const alertVariants = cva(
  `
    relative w-full rounded-lg border p-4
    [&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg]:text-foreground
    [&>svg+div]:translate-y-[-3px]
    [&>svg~*]:pl-9
  `,
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'bg-background-light text-foreground',
        destructive: `
          border-destructive/50 bg-destructive/10 text-destructive
          dark:border-destructive
          [&>svg]:text-destructive
        `,
        success: `
          bg-success/10 text-success
          [&>svg]:text-success
        `,
      },
    },
  },
);

const Alert: React.FC<React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>> = ({
  className,
  variant,
  ...props
}) => <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;

const AlertTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h5 className={cn('mb-1 leading-none font-medium tracking-tight', className)} {...props} />
);

const AlertDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <div className={cn('[&_p]:leading-relaxed', className)} {...props} />
);

export { Alert, AlertDescription, AlertTitle };
