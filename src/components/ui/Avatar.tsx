'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';
import { cn } from '~/utils/cn';

const Avatar: React.FC<React.ComponentProps<typeof AvatarPrimitive.Root>> = ({ className, ...props }) => (
  <AvatarPrimitive.Root
    className={cn('relative flex size-10 shrink-0 overflow-hidden rounded-full', className)}
    {...props}
  />
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage: React.FC<React.ComponentProps<typeof AvatarPrimitive.Image>> = ({ className, ...props }) => (
  <AvatarPrimitive.Image className={cn('aspect-square size-full', className)} {...props} />
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback: React.FC<React.ComponentProps<typeof AvatarPrimitive.Fallback>> = ({ className, ...props }) => (
  <AvatarPrimitive.Fallback
    className={cn(
      `flex size-full items-center justify-center rounded-full bg-secondary text-secondary-foreground`,
      className,
    )}
    {...props}
  />
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
