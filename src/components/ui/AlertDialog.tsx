'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';
import { cn } from '~/utils/cn';
import { ButtonVariantProps, buttonVariants } from './Button';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay: React.FC<React.ComponentProps<typeof AlertDialogPrimitive.Overlay>> = ({
  className,
  ...props
}) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      `
        fixed inset-0 z-50 bg-black/20 backdrop-blur-xs
        data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=closed]:fade-out-0
        data-[state=open]:animate-in data-[state=open]:backdrop-blur-sm data-[state=open]:duration-300
        data-[state=open]:fade-in-0
      `,
      className,
    )}
    {...props}
  />
);
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent: React.FC<React.ComponentProps<typeof AlertDialogPrimitive.Content>> = ({
  className,
  ...props
}) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      className={cn(
        `
          fixed top-1/2 left-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-6 border bg-background
          p-4 shadow-lg duration-200
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
          data-[state=closed]:slide-out-to-top-[48%]
          data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
          data-[state=open]:slide-in-from-bottom-[100%]
          sm:rounded-lg
        `,
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
);
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div
    className={cn(
      `
        flex flex-col space-y-2 text-center
        sm:text-left
      `,
      className,
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div
    className={cn(
      `
        flex flex-col-reverse
        sm:flex-row sm:justify-between sm:space-x-2
      `,
      className,
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle: React.FC<React.ComponentProps<typeof AlertDialogPrimitive.Title>> = ({
  className,
  ...props
}) => <AlertDialogPrimitive.Title className={cn('text-lg font-semibold', className)} {...props} />;
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription: React.FC<React.ComponentProps<typeof AlertDialogPrimitive.Description>> = ({
  className,
  ...props
}) => <AlertDialogPrimitive.Description className={cn('text-muted-foreground', className)} {...props} />;
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction: React.FC<
  React.ComponentProps<typeof AlertDialogPrimitive.Action> & {
    color?: ButtonVariantProps['color'];
    size?: ButtonVariantProps['size'];
    variant?: ButtonVariantProps['variant'];
  }
> = ({ className, color, size, variant, ...props }) => (
  <AlertDialogPrimitive.Action className={cn(buttonVariants({ color, size, variant }), className)} {...props} />
);
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel: React.FC<React.ComponentProps<typeof AlertDialogPrimitive.Cancel>> = ({
  className,
  ...props
}) => (
  <AlertDialogPrimitive.Cancel
    className={cn(
      buttonVariants({ variant: 'outline' }),
      `
        mt-2
        sm:mt-0
      `,
      className,
    )}
    {...props}
  />
);
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogTitle,
    AlertDialogTrigger
};
