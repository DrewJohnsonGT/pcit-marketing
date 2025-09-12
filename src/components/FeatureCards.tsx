import { IconType } from 'react-icons';
import { TbChartBar, TbClock, TbCurrencyDollar, TbGift, TbHelp, TbLock, TbTerminal2, TbUsers } from 'react-icons/tb';
import { cn } from '~/utils/cn';

export const FeatureCards = () => {
  const features = [
    {
      description: 'Experience a clean, intuitive design that simplifies tracking and enhances user experience.',
      icon: TbTerminal2,
      title: 'Modern Interface for Clinicians',
    },
    {
      description: 'Generate comprehensive graphs and reports effortlessly after entering session data in real time.',
      icon: TbChartBar,
      title: 'Automated Reporting',
    },
    {
      description:
        'Free up your valuable time by eliminating the need for copying data forms, calculations, and transferring data.',
      icon: TbClock,
      title: 'Time-Saving Efficiency',
    },
    {
      description: 'Administrators can seamlessly aggregate data across clinicians to monitor clients’ progress.',
      icon: TbUsers,
      title: 'Organizational Support',
    },
    {
      description: 'Try PCIT Tracker free with 3 families and up to 20 sessions',
      icon: TbGift,
      title: 'Try for Free',
    },
    {
      description: 'Ensure the safety and confidentiality of your data with robust security measures.',
      icon: TbLock,
      title: 'Secure Data Management',
    },
    {
      description: 'Access premium features at a low monthly cost, delivering exceptional value.',
      icon: TbCurrencyDollar,
      title: 'Affordable Subscription Plans',
    },
    {
      description: 'Receive prompt assistance from our support team whenever you need it.',
      icon: TbHelp,
      title: 'Dedicated Customer Support',
    },
  ];
  return (
    <div
      className={`
        relative z-10 mx-auto mt-16 grid w-full max-w-7xl grid-cols-1 py-10
        md:grid-cols-2
        lg:grid-cols-4
      `}
    >
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
};

const hoverColors = 'from-primary/20 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100';

const Feature = ({
  description,
  icon,
  index,
  title,
}: {
  description: string;
  icon: IconType;
  index: number;
  title: string;
}) => {
  const Icon = icon;
  return (
    <div
      className={cn(
        `
          group/feature relative flex flex-col py-10
          lg:border-r
        `,
        (index === 0 || index === 4) && 'lg:border-l',
        index < 4 && 'lg:border-b',
      )}
    >
      {index < 4 && (
        <div className={cn('pointer-events-none absolute inset-0 size-full bg-gradient-to-t', hoverColors)} />
      )}
      {index >= 4 && (
        <div className={cn('pointer-events-none absolute inset-0 size-full bg-gradient-to-b', hoverColors)} />
      )}
      <div
        className={`
          relative z-10 mb-4 px-4 text-foreground
          sm:px-10
        `}
      >
        <Icon
          className={`
            size-10
            group-hover/feature:text-primary
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
            group-hover/feature:h-20 group-hover/feature:bg-primary
          `}
        />
        <span
          className={`
            inline-block text-foreground transition duration-200
            group-hover/feature:translate-x-2 group-hover/feature:text-primary
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
