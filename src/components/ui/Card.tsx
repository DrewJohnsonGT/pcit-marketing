import * as React from 'react';
import { H3 } from './Typography';
import { cn } from '@pcit/shared/utils/cn';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(`flex flex-col rounded-lg border bg-card text-card-foreground`, className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        `
          @container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start rounded-t-md border-b bg-accent/40
          p-4
          has-data-[slot=card-action]:grid-cols-[1fr_auto]
        `,
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <H3
      data-slot="card-title"
      className={cn(
        `
          flex items-center gap-2 leading-none text-primary-darker
          [&_svg]:size-7
        `,
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-description" className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('p-4', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={cn(`mt-auto flex items-center border-t p-2`, className)} {...props} />;
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
