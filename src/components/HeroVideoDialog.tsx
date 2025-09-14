'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { cn } from '~/utils/cn';
import { ICONS } from '~/utils/icons';
import { AppImage } from '~/utils/images';

type AnimationStyle =
  | 'fade'
  | 'from-bottom'
  | 'from-center'
  | 'from-left'
  | 'from-right'
  | 'from-top'
  | 'left-in-right-out'
  | 'top-in-bottom-out';

const animationVariants = {
  fade: {
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    initial: { opacity: 0 },
  },
  'from-bottom': {
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '100%' },
    initial: { opacity: 0, y: '100%' },
  },
  'from-center': {
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
    initial: { opacity: 0, scale: 0.5 },
  },
  'from-left': {
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' },
    initial: { opacity: 0, x: '-100%' },
  },
  'from-right': {
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' },
    initial: { opacity: 0, x: '100%' },
  },
  'from-top': {
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '-100%' },
    initial: { opacity: 0, y: '-100%' },
  },
  'left-in-right-out': {
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' },
    initial: { opacity: 0, x: '-100%' },
  },
  'top-in-bottom-out': {
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '100%' },
    initial: { opacity: 0, y: '-100%' },
  },
};

export const HeroVideoDialog = ({
  animationStyle = 'from-center',
  videoSrc,
  thumbnail,
  thumbnailAlt = 'Video thumbnail',
  className,
  priority = false,
}: {
  animationStyle?: AnimationStyle;
  className?: string;
  priority?: boolean;
  thumbnail: AppImage;
  thumbnailAlt?: string;
  videoSrc: string;
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const selectedAnimation = animationVariants[animationStyle];

  return (
    <div className={cn('relative', className)}>
      <div
        className="group relative cursor-pointer overflow-hidden rounded-md border-4 shadow-lg"
        onClick={() => setIsVideoOpen(true)}
      >
        <Image
          src={thumbnail.src}
          alt={thumbnailAlt}
          width={thumbnail.width}
          height={thumbnail.height}
          className={`
            [transform:scale(1.02)]
            group-hover:brightness-[0.8]
          `}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
        />
        <div
          className={`
            absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200
            ease-out
            group-hover:scale-100
          `}
        >
          <div className="flex size-28 items-center justify-center rounded-full bg-secondary/10 backdrop-blur-md">
            <div
              className={`
                relative flex size-20 scale-100 items-center justify-center rounded-full bg-gradient-to-b
                from-secondary/30 to-secondary shadow-md transition-all duration-200 ease-out
                group-hover:scale-[1.2]
              `}
            >
              <ICONS.Play
                className={`
                  size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out
                  group-hover:scale-105
                `}
                style={{
                  filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsVideoOpen(false)}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
          >
            <motion.div
              {...selectedAnimation}
              transition={{ damping: 30, stiffness: 300, type: 'spring' }}
              className={`
                relative mx-4 aspect-video w-full max-w-4xl
                md:mx-0
              `}
            >
              <motion.button
                className={`
                  absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md
                `}
              >
                <ICONS.X className="size-5" />
              </motion.button>
              <div className="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-white">
                <iframe
                  src={videoSrc}
                  className="size-full rounded-2xl"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
