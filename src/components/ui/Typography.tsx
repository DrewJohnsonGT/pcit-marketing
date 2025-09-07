import React from 'react';
import { cn } from '@pcit/shared/utils/cn';

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
    scroll-m-20 text-xl font-bold tracking-tight text-primary select-none
    sm:text-3xl
  `),
  'H1',
);

export const H2 = createComponent<HTMLHeadingElement>(
  'h2',
  cn(`
    scroll-m-20 border-b py-2 text-2xl font-semibold tracking-tight text-secondary select-none
    first:mt-0
    sm:text-3xl
  `),
  'H2',
);

export const H3 = createComponent<HTMLHeadingElement>(
  'h3',
  cn(`
    scroll-m-20 text-xl font-semibold tracking-tight text-secondary select-none
    sm:text-2xl
  `),
  'H3',
);

export const H4 = createComponent<HTMLHeadingElement>(
  'h4',
  cn(`
    scroll-m-20 text-xl font-semibold tracking-tight text-primary select-none
    sm:text-2xl
  `),
  'H4',
);

export const Lead = createComponent<HTMLParagraphElement>('p', cn('text-xl text-muted-foreground'), 'Lead');

export const P = createComponent<HTMLParagraphElement>('p', cn('leading-7'), 'P');

export const Large = createComponent<HTMLDivElement>('div', cn('text-lg font-semibold'), 'Large');

export const Small = createComponent<HTMLParagraphElement>('p', cn('text-sm leading-none'), 'Small');

export const Muted = createComponent<HTMLSpanElement>('span', cn('text-sm text-muted-foreground'), 'Muted');

export const InlineCode = createComponent<HTMLSpanElement>(
  'code',
  cn(`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold`),
  'InlineCode',
);

export const MultilineCode = createComponent<HTMLPreElement>(
  'pre',
  cn(`relative overflow-x-auto rounded bg-muted p-4 font-mono text-sm font-semibold`),
  'MultilineCode',
);

export const List = createComponent<HTMLUListElement>(
  'ul',
  cn(`
    my-2 list-disc
    [&>li]:mt-2
  `),
  'List',
);

export const ListItem = createComponent<HTMLLIElement>(
  'li',
  cn(`
    my-2 list-disc
    [&>li]:mt-2
  `),
  'ListItem',
);

export const Quote = createComponent<HTMLQuoteElement>(
  'blockquote',
  cn('mt-6 border-l-2 pl-6 text-muted-foreground italic'),
  'Quote',
);

export const A = createComponent<HTMLAnchorElement>(
  'a',
  cn(`
    text-link
    hover:underline
  `),
  'A',
);
