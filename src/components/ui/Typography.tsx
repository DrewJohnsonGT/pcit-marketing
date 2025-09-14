import React from 'react';
import { cn } from '~/utils/cn';

const createComponent = <T extends HTMLElement>(
  tag: keyof React.JSX.IntrinsicElements,
  defaultClassName: string,
  displayName: string,
) => {
  function Component({ ref, className, children, ...props }: React.HTMLProps<T> & { ref?: React.Ref<T> }) {
    return React.createElement(
      tag,
      {
        ...props,
        className: cn(defaultClassName, className),
        ref,
      },
      children,
    );
  }
  Component.displayName = displayName;
  return Component;
};

export const H1 = createComponent<HTMLHeadingElement>(
  'h1',
  cn(`
    text-3xl tracking-tight select-none
    sm:text-4xl
    md:text-5xl
    lg:text-6xl
  `),
  'H1',
);

export const H2 = createComponent<HTMLHeadingElement>(
  'h2',
  cn(`
    py-2 text-3xl font-semibold tracking-tight text-secondary select-none
    first:mt-0
    sm:text-4xl
  `),
  'H2',
);

export const H3 = createComponent<HTMLHeadingElement>(
  'h3',
  cn(`
    text-2xl font-semibold tracking-tight text-secondary select-none
    sm:text-3xl
  `),
  'H3',
);

export const H4 = createComponent<HTMLHeadingElement>(
  'h4',
  cn(`
    text-xl font-semibold tracking-tight text-primary select-none
    sm:text-2xl
  `),
  'H4',
);

export const P = createComponent<HTMLParagraphElement>('p', cn('leading-7'), 'P');

export const Large = createComponent<HTMLDivElement>('div', cn('text-lg font-semibold'), 'Large');

export const Small = createComponent<HTMLParagraphElement>('p', cn('text-sm leading-none'), 'Small');

export const Muted = createComponent<HTMLSpanElement>('span', cn('text-sm text-muted-foreground'), 'Muted');

export const A = createComponent<HTMLAnchorElement>(
  'a',
  cn(`
    text-link
    hover:underline
  `),
  'A',
);

export const Underline = createComponent<HTMLAnchorElement>(
  'u',
  cn(`underline decoration-secondary-light decoration-3`),
  'Underline',
);
