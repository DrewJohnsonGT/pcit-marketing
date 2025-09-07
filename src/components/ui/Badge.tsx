import * as React from 'react';
import { Skeleton } from './Skeleton';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { Button } from '@pcit/shared/components/ui/Button';
import { cn } from '@pcit/shared/utils/cn';
import { ICONS } from '@pcit/shared/utils/icons';

export const badgeVariants = cva(
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

export const RemovableBadge = ({
  children,
  className,
  onClose,
  onClick,
  size,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: BadgeProps['size'];
}) => {
  return (
    <Badge
      variant="outline"
      className={cn('group relative flex items-center gap-1', className)}
      onClick={onClick}
      size={size}
    >
      {children}
      {onClose && (
        <Button
          variant="outline"
          size={size === 'sm' ? 'xsIcon' : 'smIcon'}
          onClick={onClose}
          className={cn(
            `
              absolute right-1 hidden text-muted-foreground
              group-hover:inline-flex
            `,
            size === 'sm' && 'right-[0.5px]',
          )}
        >
          <ICONS.X />
        </Button>
      )}
    </Badge>
  );
};

export const BadgeSkeleton = ({ size }: { size?: BadgeProps['size'] }) => {
  return <Skeleton className={cn(badgeVariants({ size, variant: 'outline' }), 'w-24')} />;
};
