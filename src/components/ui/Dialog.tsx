'use client';

import * as React from 'react';
import { buttonVariants } from './Button';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cn } from '~/utils/cn';
import { ICONS } from '~/utils/icons';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay: React.FC<React.ComponentProps<typeof DialogPrimitive.Overlay>> = ({ className, ...props }) => (
  <DialogPrimitive.Overlay
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
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent: React.FC<
  React.ComponentProps<typeof DialogPrimitive.Content> & {
    actions?: React.ReactNode;
    fullscreen?: boolean;
    hideCloseButton?: boolean;
    showOverlay?: boolean;
  }
> = ({ actions, children, className, hideCloseButton = false, showOverlay = true, fullscreen = false, ...props }) => (
  <DialogPortal>
    {showOverlay && <DialogOverlay />}
    <DialogPrimitive.Content
      className={cn(
        `
          fixed top-1/2 left-1/2 z-50 flex max-h-[95vh] min-h-0 w-full max-w-[95vw] flex-1 -translate-x-1/2
          -translate-y-1/2 flex-col border bg-background shadow-lg duration-200
          focus:outline-none
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
          data-[state=closed]:slide-out-to-top-[48%]
          data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
          data-[state=open]:slide-in-from-bottom-[100%]
          sm:rounded-lg
        `,
        fullscreen &&
          `
            h-screen max-h-dvh min-h-0 min-w-full gap-0 border-0 p-0
            sm:rounded-none
          `,
        className,
      )}
      onOpenAutoFocus={(e) => e.preventDefault()}
      tabIndex={undefined}
      {...props}
    >
      {children}
      <div className="absolute top-2 right-2 flex items-center gap-1">
        {actions}
        {!hideCloseButton && (
          <DialogPrimitive.Close
            className={cn(
              buttonVariants({
                size: 'icon',
                variant: 'outline',
              }),
            )}
          >
            <ICONS.X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </div>
    </DialogPrimitive.Content>
  </DialogPortal>
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div
    className={cn(
      `
        flex flex-shrink-0 flex-col gap-2 p-4 text-center
        sm:text-left
      `,
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogBody: React.FC<React.ComponentProps<'div'>> = ({ className, children }) => (
  <div className={cn('flex flex-col gap-4 overflow-y-auto p-4', className)}>{children}</div>
);
DialogBody.displayName = 'DialogBody';

const DialogFooter: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div
    className={cn(
      `
        flex flex-shrink-0 flex-col-reverse gap-2 p-4
        sm:flex-row sm:justify-end
      `,
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle: React.FC<React.ComponentProps<typeof DialogPrimitive.Title>> = ({ className, ...props }) => (
  <DialogPrimitive.Title
    className={cn(
      `
        flex items-center gap-2 text-xl leading-none font-semibold tracking-tight
        [&>svg]:size-6
      `,
      className,
    )}
    {...props}
  />
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription: React.FC<
  React.ComponentProps<typeof DialogPrimitive.Description> & {
    hideVisually?: boolean;
  }
> = ({ className, hideVisually = false, ...props }) => {
  const description = (
    <DialogPrimitive.Description className={cn('text-sm text-muted-foreground', className)} {...props} />
  );
  return hideVisually ? <VisuallyHidden>{description}</VisuallyHidden> : description;
};

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
