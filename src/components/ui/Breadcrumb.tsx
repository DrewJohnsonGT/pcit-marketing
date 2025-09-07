import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@pcit/shared/utils/cn';
import { ICONS } from '@pcit/shared/utils/icons';

const textSize = 'text-2xl sm:text-3xl';
const textColor = 'text-primary';
const textWeight = 'font-semibold';
const letterSpacing = 'tracking-tight';

const Breadcrumb: React.FC<
  React.ComponentProps<'nav'> & {
    separator?: React.ReactNode;
  }
> = ({ ...props }) => <nav aria-label="breadcrumb" {...props} />;
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList: React.FC<React.ComponentProps<'ol'>> = ({ className, ...props }) => (
  <ol
    className={cn(`flex flex-wrap items-center gap-1 text-sm break-words text-muted-foreground`, className)}
    {...props}
  />
);
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem: React.FC<React.ComponentProps<'li'> & { noStyles?: boolean }> = ({
  className,
  noStyles,
  ...props
}) => (
  <li
    className={cn(
      'inline-flex items-center gap-1.5',
      !noStyles && [textSize, textColor, textWeight, letterSpacing],
      className,
    )}
    {...props}
  />
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink: React.FC<
  React.ComponentProps<'a'> & {
    asChild?: boolean;
  }
> = ({ asChild, className, ...props }) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      className={cn(
        `
          underline-offset-4 transition-colors
          hover:text-link hover:underline
        `,
        textColor,
        textWeight,
        letterSpacing,
        className,
      )}
      {...props}
    />
  );
};
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage: React.FC<React.ComponentProps<'span'>> = ({ className, ...props }) => (
  <span role="link" aria-disabled="true" aria-current="page" className={cn('cursor-default', className)} {...props} />
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator: React.FC<React.ComponentProps<'li'>> = ({ children, className, ...props }) => (
  <li role="presentation" aria-hidden="true" className={className} {...props}>
    {children ?? <ICONS.ChevronRight className={cn(textColor, textSize, letterSpacing)} />}
  </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbEllipsis: React.FC<React.ComponentProps<'span'>> = ({ className, ...props }) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex size-input items-center justify-center', className)}
    {...props}
  >
    <ICONS.Ellipsis className="size-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis';

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
