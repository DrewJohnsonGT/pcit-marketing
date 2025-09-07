import { IconType } from 'react-icons';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardCommandKey, MdKeyboardControlKey } from 'react-icons/md';
import { cn } from '@pcit/shared/utils/cn';

interface KbdProps {
  className?: string;
  keys: string[];
}

const keyIconMap: Record<string, IconType> = {
  ctrl: MdKeyboardControlKey,
  left: MdKeyboardArrowLeft,
  meta: MdKeyboardCommandKey,
  right: MdKeyboardArrowRight,
};

const Kbd: React.FC<KbdProps> = ({ className, keys }) => {
  return (
    <div className={cn('inline-flex items-center space-x-1', className)}>
      {keys.map((key, index) => {
        const Icon = keyIconMap[key];
        return (
          <kbd
            key={index}
            className={`
              relative -top-px inline-block min-w-3 cursor-default rounded-md border border-border bg-background px-1.5
              py-0.5 text-center align-middle font-sans text-xs leading-none text-foreground
              shadow-[0_2px_0_1px_hsl(var(--foreground))]
              hover:top-px hover:shadow-[0_1px_0_0.5px_var(--border)]
              dark:shadow-[0_2px_0_1px_hsl(var(--muted))] dark:hover:shadow-[0_1px_0_0.5px_hsl(var(--muted))]
            `}
          >
            {Icon ? <Icon /> : key}
          </kbd>
        );
      })}
    </div>
  );
};

export { Kbd };
