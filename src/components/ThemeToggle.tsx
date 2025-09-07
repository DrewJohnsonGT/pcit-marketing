'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/Button';
import { Skeleton } from '~/components/ui/Skeleton';
import { ICONS } from '~/utils/icons';

export const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton className="size-input" />;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.stopPropagation();
        toggleTheme();
      }}
      aria-label="Theme Toggle"
    >
      <ICONS.Light
        className={`
          transition-transform duration-300
          ${resolvedTheme === 'light' ? 'scale-100 rotate-0' : `scale-0 -rotate-90`}
        `}
      />
      <ICONS.Dark
        className={`
          absolute transition-transform duration-300
          ${resolvedTheme === 'dark' ? 'scale-100 rotate-0' : `scale-0 rotate-90`}
        `}
      />
    </Button>
  );
};
