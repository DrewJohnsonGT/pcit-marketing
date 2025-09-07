'use client';

import { type DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import * as React from 'react';
import { LuSearch } from 'react-icons/lu';
import { cn } from '~/utils/cn';
import { Dialog, DialogContent } from './Dialog';
import { sharedInputClasses } from './Input';

const Command: React.FC<React.ComponentProps<typeof CommandPrimitive>> = ({ className, ...props }) => (
  <CommandPrimitive
    className={cn(`flex size-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground`, className)}
    {...props}
  />
);
Command.displayName = CommandPrimitive.displayName;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command
          className={`
            [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium
            [&_[cmdk-group-heading]]:text-muted-foreground
            [&_[cmdk-group]]:px-2
            [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0
            [&_[cmdk-input-wrapper]_svg]:size-5
            [&_[cmdk-input]]:h-12
            [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3
            [&_[cmdk-item]_svg]:size-5
          `}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput: React.FC<React.ComponentProps<typeof CommandPrimitive.Input>> = ({ className, ...props }) => (
  <div className="relative p-2">
    <LuSearch className={`absolute top-1/2 left-3 size-4 -translate-y-1/2 opacity-50`} />
    <CommandPrimitive.Input className={cn(sharedInputClasses, 'pl-6', className)} {...props} />
  </div>
);

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList: React.FC<React.ComponentProps<typeof CommandPrimitive.List>> = ({ className, ...props }) => (
  <CommandPrimitive.List className={cn('max-h-[300px] overflow-x-hidden overflow-y-auto', className)} {...props} />
);

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty: React.FC<React.ComponentProps<typeof CommandPrimitive.Empty>> = (props) => (
  <CommandPrimitive.Empty className="py-6 text-center text-sm" {...props} />
);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup: React.FC<React.ComponentProps<typeof CommandPrimitive.Group>> = ({ className, ...props }) => (
  <CommandPrimitive.Group
    className={cn(
      `
        overflow-hidden p-1 text-foreground
        [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs
        [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground
      `,
      className,
    )}
    {...props}
  />
);

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator: React.FC<React.ComponentProps<typeof CommandPrimitive.Separator>> = ({
  className,
  ...props
}) => <CommandPrimitive.Separator className={cn('-mx-1 h-px bg-border', className)} {...props} />;
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem: React.FC<React.ComponentProps<typeof CommandPrimitive.Item>> = ({ className, ...props }) => (
  <CommandPrimitive.Item
    className={cn(
      `
        relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none
        data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50
        data-[selected='true']:bg-accent
        data-[selected=true]:text-accent-foreground
        [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0
      `,
      className,
    )}
    {...props}
  />
);

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) => {
  return <span className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)} {...props} />;
};
CommandShortcut.displayName = 'CommandShortcut';

export {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut
};
