'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '@pcit/shared/utils/cn';
import { ICONS } from '@pcit/shared/utils/icons';

type CheckboxProps = Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'children'>;

const Checkbox = ({ className, ...props }: CheckboxProps) => (
  <CheckboxPrimitive.Root
    className={cn(
      `group relative block size-6 shrink-0 cursor-pointer overflow-hidden rounded-md`,
      'ring-2 ring-border ring-offset-background',
      'hover:ring-primary',
      `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none`,
      'disabled:cursor-not-allowed disabled:opacity-50',
      'border-none bg-transparent',
      className,
    )}
    {...props}
  >
    <div
      className={cn(
        `absolute z-10 size-10 rotate-45 transform transition-all duration-300 ease-in-out`,
        'bg-primary',
        'top-[-52px] left-[-52px]',
        `group-data-[state=checked]:top-[-10px] group-data-[state=checked]:left-[-10px]`,
      )}
      aria-hidden="true"
    />
    <div
      className={`
        absolute inset-0 hidden items-center justify-center
        group-hover:flex
      `}
    >
      <ICONS.Check className="relative z-20 size-4 text-primary" />
    </div>
    <CheckboxPrimitive.Indicator className={`relative flex size-full items-center justify-center`}>
      <ICONS.Check className="relative z-20 size-4 text-primary-foreground" aria-hidden="true" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
