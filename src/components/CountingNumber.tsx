'use client';

import { animate, domAnimation, LazyMotion, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { cn } from '~/utils/cn';

export const CountingNumber = ({
  className,
  duration = 1,
  start = 0,
  end = 100,
}: {
  className?: string;
  duration?: number;
  end?: number;
  start?: number;
}) => {
  const [count, setCount] = useState<number>(start);

  useEffect(() => {
    const controls = animate(start, end, {
      duration,
      onUpdate: (latest) => {
        setCount(Math.floor(latest));
      },
    });

    return () => {
      controls.stop();
    };
  }, [start, end, duration]);

  return (
    <LazyMotion features={domAnimation}>
      <motion.div className={cn('text-lg font-bold text-primary', className)}>{count}</motion.div>
    </LazyMotion>
  );
};
