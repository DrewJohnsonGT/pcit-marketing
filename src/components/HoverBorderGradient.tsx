'use client';

import { domAnimation, LazyMotion } from 'motion/react';
import * as m from 'motion/react-m';
import React, { useEffect, useState } from 'react';
import { cn } from '~/utils/cn';

type Direction = 'BOTTOM' | 'LEFT' | 'RIGHT' | 'TOP';

export const HoverBorderGradient = ({
  as: Tag = 'button',
  children,
  className,
  clockwise = true,
  containerClassName,
  duration = 2,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    className?: string;
    clockwise?: boolean;
    containerClassName?: string;
    duration?: number;
  } & React.HTMLAttributes<HTMLElement>
>) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>('TOP');

  const movingMap: Record<Direction, string> = {
    BOTTOM: 'radial-gradient(28% 55% at 50% 100%, #7534cb 60%, rgba(255,255,255,0) 100%)',
    LEFT: 'radial-gradient(28% 55% at 0% 50%, #7534cb 60%, rgba(255,255,255,0) 100%)',
    RIGHT: 'radial-gradient(28% 55% at 100% 50%, #7534cb 60%, rgba(255,255,255,0) 100%)',
    TOP: 'radial-gradient(28% 55% at 50% 0%, #7534cb 60%, rgba(255,255,255,0) 100%)',
  };

  const highlight = 'radial-gradient(100% 181.15942028985506% at 50% 50%, #7534cb 60%, rgba(255, 255, 255, 0) 100%)';

  useEffect(() => {
    if (!hovered) {
      const rotateDirection = (currentDirection: Direction): Direction | undefined => {
        const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];
        const currentIndex = directions.indexOf(currentDirection);
        const nextIndex = clockwise
          ? (currentIndex - 1 + directions.length) % directions.length
          : (currentIndex + 1) % directions.length;
        return directions[nextIndex];
      };
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState) ?? 'TOP');
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        `
          relative flex cursor-pointer flex-col flex-nowrap place-content-center items-center overflow-visible
          rounded-md bg-foreground/10 box-decoration-clone p-[3px] transition duration-500
        `,
        containerClassName,
      )}
      {...props}
    >
      <div
        className={cn(
          `
            z-10 rounded-sm bg-background p-2 text-foreground transition-colors duration-500
            hover:text-primary
          `,
          className,
        )}
      >
        {children}
      </div>
      <LazyMotion features={domAnimation}>
        <m.div
          className={cn('absolute inset-0 z-0 flex-none overflow-hidden rounded-md')}
          style={{
            filter: 'blur(2px)',
            height: '100%',
            position: 'absolute',
            width: '100%',
          }}
          initial={{ background: movingMap[direction] }}
          animate={{
            background: hovered ? [movingMap[direction], highlight] : movingMap[direction],
          }}
          transition={{ duration: duration ?? 1, ease: 'linear' }}
        />
      </LazyMotion>
      <div className="absolute inset-[3px] flex-none rounded-md bg-background" />
    </Tag>
  );
};
