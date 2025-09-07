'use client';

import { isValid, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { cn } from '~/utils/cn';
import { formatDate } from '~/utils/formatDate';
import { ICONS } from '~/utils/icons';
import { Button } from './Button';
import { Calendar } from './Calendar';
import { Input } from './Input';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

interface DatePickerProps {
  className?: string;
  onChange: (date?: Date | null) => void;
  showClearButton?: boolean;
  value: Date | null;
}

export const DatePicker = ({ className, onChange, value: externalValue, showClearButton = false }: DatePickerProps) => {
  const [value, setValue] = useState<Date | null>(externalValue);
  const [inputValue, setInputValue] = useState<string>(externalValue ? formatDate(externalValue, 'MM/dd/yyyy') : '');
  const [error, setError] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setValue(externalValue);
    setInputValue(externalValue ? formatDate(externalValue, 'MM/dd/yyyy') : '');
  }, [externalValue]);

  const handleSelect = (date?: Date) => {
    setValue(date ?? null);
    if (date) {
      setInputValue(formatDate(date, 'MM/dd/yyyy'));
      setError('');
    } else {
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (!newValue) {
      setError('');
      setValue(null);
      return;
    }
  };

  const handleInputBlur = () => {
    if (!inputValue) {
      onChange(null);
      return;
    }

    const parsedDate = parse(inputValue, 'MM/dd/yyyy', new Date());
    if (isValid(parsedDate)) {
      setValue(parsedDate);
      if (parsedDate.getTime() !== externalValue?.getTime()) {
        onChange(parsedDate);
      }
    } else {
      setError('Invalid format (MM/DD/YYYY)');
    }
  };

  const handleClear = () => {
    setValue(null);
    setInputValue('');
    setError('');
    onChange(null);
  };

  const handlePopoverOpenChange = (open: boolean) => {
    if (!open) {
      handleInputBlur();
    }
    setIsOpen(open);
  };

  return (
    <div className={cn('flex gap-1', className)}>
      <Popover onOpenChange={handlePopoverOpenChange} open={isOpen}>
        <PopoverTrigger asChild>
          <div className="relative flex items-center">
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="MM/DD/YYYY"
              className={cn(
                className,
                'z-10 w-[150px] shrink-0 pl-8',
                error && 'border-2 border-destructive',
                isOpen &&
                  `border border-ring ring-[2.5px] ring-ring/50 ring-offset-0 ring-offset-background outline-hidden`,
              )}
            />
            <ICONS.Calendar className="absolute top-1/2 left-2 z-20 size-5 -translate-y-1/2" />
            {error && <span className="absolute -bottom-4 left-0 text-xs text-destructive">{error}</span>}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="end"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onClick={(e) => e.stopPropagation()}
        >
          <Calendar
            mode="single"
            selected={value ?? undefined}
            onSelect={handleSelect}
            defaultMonth={value ?? undefined}
            autoFocus={false}
            startMonth={new Date(1990, 0, 1)}
            endMonth={new Date(new Date().getFullYear(), 11, 31)}
            captionLayout="dropdown"
            showOutsideDays
          />
        </PopoverContent>
      </Popover>
      {showClearButton && value && (
        <Button variant="ghost" size="icon" type="button" tooltip="Clear" tooltipDelay={500} onClick={handleClear}>
          <ICONS.X className="size-4" />
        </Button>
      )}
    </div>
  );
};
