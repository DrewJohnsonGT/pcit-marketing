import { cn } from '~/utils/cn';
import { IMAGES } from '~/utils/images';

interface Feature {
  description: React.ReactNode;
  icon: string;
  title: string;
}

const FEATURES: Feature[] = [
  {
    description:
      'No more juggling stacks of paper forms—keep all your PCIT data organized and accessible in one secure place.',
    icon: IMAGES.paperwork.src,
    title: 'Minimize Paperwork',
  },
  {
    description: 'Experience a clean, intuitive design that simplifies tracking and enhances user experience.',
    icon: IMAGES.webApp.src,
    title: 'Modern Interface for Clinicians',
  },
  {
    description:
      'PCIT Tracker automatically creates interactive graphs as you enter session data, so you always have up-to-date insights at your fingertips.',
    icon: IMAGES.graphs.src,
    title: 'Automatic Graph Generation',
  },
  {
    description:
      'Administrators can seamlessly aggregate data across clinicians to monitor  progress within their practices.',
    icon: IMAGES.organization.src,
    title: 'Organizational Support',
  },
  {
    description: 'Ensure the safety and confidentiality of your data with robust security measures.',
    icon: IMAGES.security.src,
    title: 'Secure Data Management',
  },
  {
    description: 'Try PCIT Tracker free with 3 families and up to 20 sessions as long as you want',
    icon: IMAGES.gift.src,
    title: 'Try for Free',
  },
];

export const FeatureCards = () => {
  return (
    <div
      className={`
        relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
      `}
    >
      {FEATURES.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
};

const hoverColors =
  'from-secondary/20 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100';

const Feature = ({ icon, description, title, index }: Feature & { index: number }) => {
  return (
    <div
      className={cn(
        `
          group/feature relative flex flex-col py-10
          lg:border-r
        `,
        (index === 0 || index === FEATURES.length / 2) && 'lg:border-l',
        index < FEATURES.length / 2 && 'lg:border-b',
      )}
    >
      {index < FEATURES.length / 2 && (
        <div className={cn('pointer-events-none absolute inset-0 size-full bg-gradient-to-t', hoverColors)} />
      )}
      {index >= FEATURES.length / 2 && (
        <div className={cn('pointer-events-none absolute inset-0 size-full bg-gradient-to-b', hoverColors)} />
      )}
      <div
        className={`
          relative z-10 mb-4 px-4 text-foreground
          sm:px-10
        `}
      >
        <img
          src={icon}
          alt={title}
          className={`
            size-32 transition duration-200
            group-hover/feature:scale-110
          `}
        />
      </div>
      <div
        className={`
          relative z-10 mb-2 px-4 text-lg font-bold
          sm:px-10
        `}
      >
        <div
          className={`
            absolute inset-y-0 left-0 h-8 w-1 origin-center rounded-r-full bg-border transition-all duration-200
            group-hover/feature:h-20 group-hover/feature:bg-secondary
          `}
        />
        <span
          className={`
            inline-block text-foreground transition duration-200
            group-hover/feature:translate-x-2 group-hover/feature:text-secondary
          `}
        >
          {title}
        </span>
      </div>
      <p
        className={`
          relative z-10 max-w-xs px-4 text-sm text-foreground
          sm:px-10
        `}
      >
        {description}
      </p>
    </div>
  );
};
