'use client';

import * as React from 'react';
import { DayPicker, Dropdown as DropDownDayPicker } from 'react-day-picker';
import { cn } from '~/utils/cn';
import { buttonVariants } from './Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select';

type CalendarProps = React.ComponentProps<typeof DayPicker>;

const buttonRangeClassName =
  'bg-accent [&>button]:bg-primary [&>button]:text-primary-foreground hover:[&>button]:bg-primary hover:[&>button]:text-primary-foreground';

const Dropdown = ({ value, onChange, options }: React.ComponentProps<typeof DropDownDayPicker>) => {
  const selected = options?.find((option) => option.value === value);
  const handleChange = (value: string) => {
    const changeEvent = {
      target: { value },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange?.(changeEvent);
  };
  const isYearPicker = Boolean(options?.find((option) => option.value > 12));
  const sortedOptions = isYearPicker ? [...(options ?? [])].reverse() : options;
  return (
    <Select
      value={value?.toString()}
      onValueChange={(value) => {
        handleChange(value);
      }}
    >
      <SelectTrigger>
        <SelectValue>{selected?.label}</SelectValue>
      </SelectTrigger>
      <SelectContent align="center">
        {sortedOptions?.map(({ value, label, disabled }, id) => (
          <SelectItem key={`${value}-${id}`} value={value?.toString()} disabled={disabled}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const Calendar = ({
  className,
  classNames,
  hideNavigation,
  showOutsideDays = true,
  components: customComponents,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      hideNavigation={true}
      className={cn('p-2', className)}
      classNames={{
        caption_label: 'truncate text-sm font-medium',
        day: 'flex size-9 flex-1 items-center justify-center p-0 text-sm',
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          `
            size-9 rounded-md p-0 font-normal transition-none
            aria-selected:opacity-100
          `,
        ),
        disabled: 'text-muted-foreground opacity-50',
        dropdowns: cn('flex w-full items-center justify-center gap-2', hideNavigation && 'w-full'),
        footer: 'pt-3 text-sm',
        hidden: 'invisible flex-1',
        month: 'flex flex-col gap-2',
        month_caption: 'relative flex items-center justify-center',
        month_grid: 'mx-auto mt-4',
        months: 'flex flex-col gap-2 sm:flex-row',
        nav: 'hidden',
        outside:
          'text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        range_end: cn(buttonRangeClassName, 'rounded-e-md'),
        range_middle:
          'bg-accent text-foreground! [&>button]:bg-transparent [&>button]:text-foreground! hover:[&>button]:bg-transparent hover:[&>button]:text-foreground!',
        range_start: cn(buttonRangeClassName, 'rounded-s-md'),
        selected:
          '[&>button]:bg-primary [&>button]:text-primary-foreground hover:[&>button]:bg-primary hover:[&>button]:text-primary-foreground',
        today: '[&>button]:bg-accent [&>button]:text-accent-foreground',
        week: 'mt-2 flex w-max items-start',
        weekday: 'w-9 text-sm font-normal text-muted-foreground',
        weekdays: 'flex',
        ...classNames,
      }}
      components={{
        Dropdown,
        ...customComponents,
      }}
      {...props}
    />
  );
};
Calendar.displayName = 'Calendar';
