import * as React from 'react';
import { sharedInputClasses } from './Input';
import { cn } from '~/utils/cn';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        sharedInputClasses,
        `
          flex min-h-[80px]
          data-[placeholder]:text-muted-foreground
        `,
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
