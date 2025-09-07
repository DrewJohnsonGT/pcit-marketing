import * as React from 'react';
import { sharedInputClasses } from './Input';
import { cn } from '@pcit/shared/utils/cn';

const Textarea: React.FC<React.ComponentProps<'textarea'>> = ({
  className,
  maxLength,
  value: initialValue = '',
  ...props
}) => {
  const [value, setValue] = React.useState(String(initialValue));

  React.useEffect(() => {
    setValue(String(initialValue));
  }, [initialValue]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (maxLength === undefined || newValue.length <= maxLength) {
      setValue(newValue);
      props.onChange?.(event);
    }
  };

  return (
    <div className="relative">
      <textarea
        className={cn(
          sharedInputClasses,
          `
            flex min-h-[80px]
            data-[placeholder]:text-muted-foreground
          `,
          className,
        )}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        {...props}
      />
      {maxLength !== undefined && (
        <div
          className={`
            absolute right-2 bottom-1 rounded bg-background/10 px-1 py-0.5 text-xs text-muted-foreground
            backdrop-blur-[2px]
          `}
        >
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
};

Textarea.displayName = 'Textarea';

export { Textarea };
