import * as React from 'react';
import { ICONS } from '../utils/icons';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { HiMagnifyingGlass } from 'react-icons/hi2';

export const SearchInput = <T extends React.ComponentProps<'input'>>({
  className,
  value,
  onChange,
  ...props
}: T & {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}) => {
  const handleClear = () => {
    if (onChange) {
      const event = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div className="relative">
      <HiMagnifyingGlass className={`absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground`} />
      <Input
        className={`
          px-8
          ${className}
        `}
        placeholder="Search labels"
        value={value}
        onChange={onChange}
        {...props}
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="smIcon"
          color="destructive"
          className={`
            absolute top-1/2 right-1 size-7 -translate-y-1/2 text-muted-foreground
            active:shadow-none
          `}
          onClick={handleClear}
        >
          <ICONS.X className="size-4" />
        </Button>
      )}
    </div>
  );
};
SearchInput.displayName = 'SearchInput';
