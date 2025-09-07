'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@pcit/shared/utils/cn';

const Tabs = TabsPrimitive.Root;

const TabsList: React.FC<
  React.ComponentProps<typeof TabsPrimitive.List> & {
    variant?: 'compact' | 'default' | 'tall';
  }
> = ({ className, variant = 'default', ...props }) => (
  <TabsPrimitive.List
    className={cn(
      `inline-flex items-center justify-center rounded-md bg-accent p-1 text-muted-foreground`,
      variant === 'compact' && 'h-8 py-1',
      variant === 'default' && 'h-input',
      variant === 'tall' && 'h-14 p-2',
      className,
    )}
    {...props}
  />
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger: React.FC<
  React.ComponentProps<typeof TabsPrimitive.Trigger> & {
    variant?: 'compact' | 'default' | 'tall';
  }
> = ({ className, variant = 'default', ...props }) => (
  <TabsPrimitive.Trigger
    className={cn(
      `
        inline-flex cursor-pointer items-center justify-center rounded-sm font-medium whitespace-nowrap
        ring-offset-background transition-all
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none
        disabled:pointer-events-none disabled:opacity-50
        data-[state=active]:bg-input-background data-[state=active]:text-primary data-[state=active]:shadow-sm
        data-[state=inactive]:hover:text-primary
      `,
      variant === 'compact' ? 'px-2 py-0' : 'px-3 py-1',
      className,
    )}
    {...props}
  />
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent: React.FC<React.ComponentProps<typeof TabsPrimitive.Content>> = ({ className, ...props }) => (
  <TabsPrimitive.Content
    className={cn(
      `
        mt-2 ring-offset-background
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none
        data-[state=active]:flex data-[state=active]:flex-1
        data-[state=inactive]:hidden
      `,
      className,
    )}
    {...props}
  />
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
