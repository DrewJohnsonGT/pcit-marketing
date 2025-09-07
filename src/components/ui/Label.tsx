'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '~/utils/cn';

const labelVariants = cva(
  `
    leading-none font-medium select-none
    peer-disabled:cursor-not-allowed peer-disabled:opacity-70
  `,
);

const Label: React.FC<React.ComponentProps<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>> = ({
  className,
  ...props
}) => <LabelPrimitive.Root className={cn(labelVariants(), className)} {...props} />;
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
