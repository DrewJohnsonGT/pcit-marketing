'use client';

import * as React from 'react';
import { sharedInputClasses } from './Input';
import { Skeleton } from './Skeleton';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@pcit/shared/utils/cn';
import { ICONS } from '@pcit/shared/utils/icons';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger: React.FC<React.ComponentProps<typeof SelectPrimitive.Trigger>> = ({
  children,
  className,
  ...props
}) => (
  <SelectPrimitive.Trigger
    className={cn(
      sharedInputClasses,
      `
        h-auto min-h-input cursor-pointer items-center justify-between
        data-[placeholder]:text-muted-foreground
      `,
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ICONS.ChevronDown className="size-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton: React.FC<React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>> = ({
  className,
  ...props
}) => (
  <SelectPrimitive.ScrollUpButton
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ICONS.ChevronUp className="size-4" />
  </SelectPrimitive.ScrollUpButton>
);
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton: React.FC<React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>> = ({
  className,
  ...props
}) => (
  <SelectPrimitive.ScrollDownButton
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ICONS.ChevronDown className="size-4" />
  </SelectPrimitive.ScrollDownButton>
);
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent: React.FC<React.ComponentProps<typeof SelectPrimitive.Content>> = ({
  children,
  className,
  position = 'popper',
  ...props
}) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        `
          relative z-50 max-h-96 min-w-32 animate-in cursor-pointer overflow-hidden rounded-md border
          bg-input-background text-foreground shadow-md fade-in-0 zoom-in-95
          data-[side=bottom]:slide-in-from-top-2
          data-[side=left]:slide-in-from-right-2
          data-[side=right]:slide-in-from-left-2
          data-[side=top]:slide-in-from-bottom-2
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
        `,
        position === 'popper' &&
          `
            data-[side=bottom]:translate-y-1
            data-[side=left]:-translate-x-1
            data-[side=right]:translate-x-1
            data-[side=top]:-translate-y-1
          `,
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            `h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]`,
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel: React.FC<React.ComponentProps<typeof SelectPrimitive.Label>> = ({ className, ...props }) => (
  <SelectPrimitive.Label className={cn('py-1.5 pr-1 pl-8 text-sm font-semibold', className)} {...props} />
);
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem: React.FC<React.ComponentProps<typeof SelectPrimitive.Item>> = ({ children, className, ...props }) => (
  <SelectPrimitive.Item
    className={cn(
      `
        relative flex w-full cursor-pointer items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none
        focus:bg-accent focus:text-accent-foreground
        data-disabled:pointer-events-none data-disabled:opacity-50
      `,
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <ICONS.Check className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator: React.FC<React.ComponentProps<typeof SelectPrimitive.Separator>> = ({ className, ...props }) => (
  <SelectPrimitive.Separator className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
);
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

const SelectSkeleton = () => <Skeleton className="h-10 w-full" />;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectSkeleton,
  SelectTrigger,
  SelectValue,
};
