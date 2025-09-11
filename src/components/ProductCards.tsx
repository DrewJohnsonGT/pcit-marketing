import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/Card';
import { ICONS, Icons } from '~/utils/icons';
import { IMAGES } from '~/utils/images';

const FEATURES = [
  {
    description:
      'Made by and for PCIT Professionals, PCIT Tracker is your home for all things related to Parent-Child Interaction Therapy.',
    gradientBottom: 'hsl(var(--background))',
    gradientTop: '#279AF133',
    icon: ICONS[Icons.Home],
    iconColor: '#279AF1',
    imageLight: IMAGES.home,
    preloadImage: true,
    title: 'Your PCIT Platform',
  },
  {
    description: 'No more piles of paper, hard to read notes, or lost documents.',
    gradientBottom: 'hsl(var(--background))',
    gradientTop: 'hsl(var(--family-foreground) / 0.2)',
    icon: ICONS[Icons.Family],
    iconColor: 'hsl(var(--family-foreground))',
    imageLight: IMAGES.families,
    preloadImage: false,
    title: 'See all your families and sessions in one place',
  },
  {
    description: 'Track sessions seamlessly with our easy to use interface.',
    gradientBottom: 'hsl(var(--background))',
    gradientTop: 'hsl(var(--session-foreground) / 0.2)',
    icon: ICONS[Icons.Session],
    iconColor: 'hsl(var(--session-foreground))',
    imageLight: IMAGES.session,
    preloadImage: true,
    title: 'Intuitive Session Tracker',
  },
  {
    description:
      'Gain insights into your data with interactive charts and graphs that are automatically generated. Export your data to CSV or PDF with a single click.',
    gradientBottom: 'hsl(var(--background))',
    gradientTop: 'hsl(var(--data-foreground) / 0.2)',
    icon: ICONS[Icons.Data],
    iconColor: 'hsl(var(--data-foreground))',
    imageLight: IMAGES.data,
    preloadImage: true,
    title: 'Data Visualization',
  },
  {
    description:
      'Tracking PDI sessions has never been easier! Our guided walk-through of the time-out sequence allows you to track each session with precision and automatically see key metrics.',
    gradientBottom: 'hsl(var(--background))',
    gradientTop: '#A2D2FF44',
    icon: ICONS[Icons.Caregiver],
    iconColor: '#61b0fa',
    imageLight: IMAGES.pdi,
    preloadImage: false,
    title: 'PDI Tracking',
  },
  {
    description: 'Generate custom family reports with a single click.',
    gradientBottom: 'hsl(var(--background))',
    gradientTop: 'hsl(var(--pdf-foreground) / 0.2)',
    icon: ICONS[Icons.Report],
    iconColor: 'hsl(var(--pdf-foreground))',
    imageLight: IMAGES.report,
    preloadImage: false,
    title: 'Automated Reports',
  },
];

export const ProductCards = () => {
  return (
    <div
      className={`
        mt-8 w-full columns-1 gap-10
        lg:columns-2
      `}
    >
      {FEATURES.map((feature) => {
        const Icon = feature.icon;
        return (
          <div key={feature.title} className="mb-8 break-inside-avoid">
            <Card
              className="relative w-full max-w-full overflow-hidden border border-border shadow-lg"
              style={{
                background: `linear-gradient(to bottom right, ${feature.gradientTop}, ${feature.gradientBottom})`,
              }}
            >
              <CardContent className="p-0">
                <CardHeader className="mb-4 p-4">
                  <CardTitle className="flex items-start gap-2">
                    <Icon
                      className="size-10! text-primary"
                      style={{
                        color: feature.iconColor,
                      }}
                      aria-hidden="true"
                    />
                    <span className="text-3xl font-bold">{feature.title}</span>
                  </CardTitle>
                  <CardDescription className="text-xl text-foreground">{feature.description}</CardDescription>
                </CardHeader>
                <div className="relative w-full flex-1">
                  <Image
                    src={feature.imageLight}
                    alt={feature.title}
                    width={feature.imageLight.width}
                    height={feature.imageLight.height}
                    sizes="(max-width: 1279px) min(100vw, 850px), min(50vw, 850px)"
                    className={`absolute right-0 ml-auto size-auto rounded-t-lg object-contain`}
                    loading={feature.preloadImage ? 'eager' : 'lazy'}
                    priority={feature.preloadImage}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
