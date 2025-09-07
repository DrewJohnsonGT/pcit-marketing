'use client';

import * as React from 'react';
import { cn } from '~/utils/cn';
import { ICONS } from '~/utils/icons';
import { Button } from './Button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './Command';
import { sharedInputClasses } from './Input';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

export interface ComboSelectProps extends React.ComponentPropsWithoutRef<typeof Popover> {
  dataCy?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  value?: string;
}

const ComboSelect: React.FC<ComboSelectProps> = ({
  onValueChange,
  options,
  placeholder = 'Select an option',
  value,
  disabled,
  dataCy,
}) => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState(value || '');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const displayValue = React.useMemo(() => {
    const selectedOption = options.find((option) => option.value === selectedValue);
    return selectedOption ? selectedOption.label : selectedValue || placeholder;
  }, [selectedValue, options, placeholder]);

  const filteredOptions = React.useMemo(() => {
    return options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()));
  }, [options, query]);

  const handleSelect = React.useCallback(
    (value: string, keepOpen?: boolean) => {
      setSelectedValue(value);
      onValueChange?.(value);
      if (!keepOpen) {
        setOpen(false);
      }
      if (keepOpen && value === 'Other') {
        setQuery('Other');
        setTimeout(() => {
          inputRef.current?.focus();
          inputRef.current?.select();
        }, 0);
      }
    },
    [onValueChange],
  );

  const handleInputChange = React.useCallback(
    (value: string) => {
      setQuery(value);
      setSelectedValue(value);
      onValueChange?.(value);
    },
    [onValueChange],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger data-cy={dataCy} asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(sharedInputClasses, 'h-10 w-[200px] justify-between border-none')}
          disabled={disabled}
          aria-expanded={open}
        >
          {displayValue}
          <ICONS.ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command className="bg-input-background">
          <CommandInput
            ref={inputRef}
            placeholder="Enter custom value"
            value={query}
            onValueChange={handleInputChange}
          />
          <CommandList>
            <CommandEmpty
              className={`
                cursor-pointer py-4 text-center
                hover:bg-muted
              `}
              onClick={() => handleSelect(query)}
            >
              Use custom value: {query}
            </CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                  data-cy={`combo-select-option-${option.value}`}
                >
                  <ICONS.Check
                    className={cn('mr-2 size-4', selectedValue === option.value ? 'opacity-100' : 'opacity-0')}
                  />
                  {option.label}
                </CommandItem>
              ))}
              <CommandItem onSelect={() => handleSelect('Other', true)}>
                <ICONS.Check className={cn('mr-2 size-4', selectedValue === 'Other' ? 'opacity-100' : 'opacity-0')} />
                Other (Enter custom value)
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

ComboSelect.displayName = 'ComboSelect';

export { ComboSelect };
