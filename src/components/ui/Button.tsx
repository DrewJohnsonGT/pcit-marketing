import * as React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip';
import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '@pcit/shared/utils/cn';

const buttonVariants = cva(
  `
    inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap
    select-none
    focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden
    disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
    [&>svg]:size-5 [&>svg]:shrink-0
  `,
  {
    compoundVariants: [
      {
        className: 'hover:text-destructive',
        color: 'destructive',
        variant: 'ghost',
      },
      {
        className: `
          border-destructive bg-destructive
          hover:bg-destructive/90
        `,
        color: 'destructive',
        variant: 'primary',
      },
      {
        className: `
          border-destructive bg-background text-destructive
          hover:border-destructive-foreground hover:bg-destructive hover:text-destructive-foreground
          active:bg-destructive/90
        `,
        color: 'destructive',
        variant: 'outline',
      },
      {
        className: `
          border-destructive bg-destructive text-destructive-foreground
          hover:border-destructive/90 hover:bg-destructive/90
          active:border-destructive/90 active:bg-destructive/90
        `,
        color: 'destructive',
        variant: 'primary',
      },
    ],
    defaultVariants: {
      size: 'default',
      variant: 'primary',
    },
    variants: {
      color: {
        destructive: `
          border-destructive bg-destructive text-destructive-foreground
          active:bg-destructive/90 active:text-destructive-foreground
        `,
        link: `
          text-link underline-offset-4
          hover:underline
        `,
        success: 'bg-success text-success-foreground',
      },
      size: {
        default: 'h-input p-2',
        icon: `
          size-input
          [&>svg]:size-6
        `,
        lg: 'h-10 px-8',
        sm: `
          h-8 px-3 text-sm
          [&>svg]:size-4
        `,
        smIcon: `
          size-6
          [&>svg]:size-4
        `,
        xs: 'h-6 px-2 py-0 text-xs',
        xsIcon: `
          size-5
          [&>svg]:size-3
        `,
      },
      variant: {
        ghost: `
          border-none bg-transparent text-foreground shadow-none
          hover:bg-accent hover:text-accent-foreground
        `,
        link: `
          m-0 p-0 break-words text-link underline-offset-4
          hover:underline
        `,
        outline: `
          border border-border bg-outline-normal text-foreground shadow-normal
          hover:border-secondary hover:bg-outline-hover hover:text-accent-foreground
          active:bg-outline-pressed
        `,
        primary: `
          border border-primary bg-primary-normal text-primary-foreground shadow-button
          hover:border-secondary hover:bg-primary-hover
          active:bg-primary-pressed
        `,
        primaryOutline: `
          border border-border bg-outline-normal text-foreground shadow-normal
          hover:bg-primary-normal hover:text-primary-foreground hover:shadow-button
          active:bg-primary-pressed active:text-primary-foreground
        `,
        secondary: `
          border border-secondary bg-secondary-normal text-secondary-foreground shadow-button
          hover:border-primary hover:bg-secondary-hover
          active:bg-secondary-pressed
        `,
        secondaryOutline: `
          border border-border bg-outline-normal text-foreground shadow-normal
          hover:border-secondary hover:bg-accent hover:bg-secondary-hover hover:text-secondary-foreground
          hover:shadow-button
        `,
      },
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, ButtonVariantProps {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  tooltip?: string | React.ReactNode;
  tooltipDelay?: number;
  tooltipSide?: React.ComponentProps<typeof TooltipContent>['side'];
}

const ButtonLoadingContent = ({
  loadingText,
  size,
  variant,
}: {
  loadingText: string;
  size: ButtonVariantProps['size'];
  variant: ButtonVariantProps['variant'];
}) => (
  <div className="flex items-center">
    <LoadingSpinner
      className={cn(
        'size-4',
        size !== 'icon' && size !== 'smIcon' && 'mr-2',
        variant === 'primary' && 'stroke-primary-foreground',
      )}
      color="static"
      size="sm"
    />
    {size !== 'icon' && size !== 'smIcon' && <span>{loadingText}</span>}
  </div>
);

const Button: React.FC<React.ComponentProps<'button'> & ButtonProps> = ({
  asChild = false,
  className,
  color,
  loading,
  loadingText = 'Loading...',
  size,
  tooltip,
  tooltipDelay = 0,
  tooltipSide = 'top',
  variant = 'primary',
  type = 'button',
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';
  const buttonContent = (
    <Comp
      className={cn(buttonVariants({ color, size, variant }), className)}
      disabled={props.disabled || loading}
      type={type}
      {...props}
    >
      {loading ? <ButtonLoadingContent size={size} loadingText={loadingText} variant={variant} /> : props.children}
    </Comp>
  );

  return tooltip ? (
    <Tooltip delayDuration={tooltipDelay}>
      <TooltipTrigger className={cn(props.disabled && 'cursor-default')} asChild>
        <span>{buttonContent}</span>
      </TooltipTrigger>
      <TooltipContent side={tooltipSide}>{tooltip}</TooltipContent>
    </Tooltip>
  ) : (
    buttonContent
  );
};

export { Button, buttonVariants };
