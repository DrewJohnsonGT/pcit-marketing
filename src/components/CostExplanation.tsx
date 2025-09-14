import { ICONS } from '../utils/icons';
import { Card, CardContent } from './ui/Card';
import { A, H4, Underline } from './ui/Typography';

interface FeatureCardProps {
  body: string;
  icon: React.ElementType;
  iconBackground: string;
  iconText: string;
  title: string;
}

const featureCards: FeatureCardProps[] = [
  {
    body: "Because we only support a limited free tier, we don't need to bog down the user experience with ads or monetize any data. Your focus stays on your families, and your clients' information stays private—exactly as it should be in a clinical setting.",
    icon: ICONS.Shield,
    iconBackground: 'bg-primary/10',
    iconText: 'text-primary',
    title: 'Ad-Free, Data-Secure Experience',
  },
  {
    body: 'Subscription revenue goes right back into the platform: building upcoming features (such as custom session reports or supervision model views), working toward achieving and maintaining HIPAA compliance certification, and providing timely customer support.',
    icon: ICONS.Code,
    iconBackground: 'bg-secondary/10',
    iconText: 'text-secondary',
    title: 'Dedicated Development & Support',
  },
  {
    body: "Our success rests entirely on making PCIT Tracker so valuable that you'd never consider leaving. That alignment drives us to continually refine the product based on your feedback and the latest PCIT best practices.",
    icon: ICONS.TrendingUp,
    iconBackground: 'bg-success/10',
    iconText: 'text-success',
    title: 'Aligned Interests = Better Outcomes',
  },
  {
    body: 'We price PCIT Tracker to be accessible for clinicians and clinics of all sizes, with multiple subscription tiers so you can choose the plan that fits your practice. Plus, every new user has access to our limited free tier—no commitment required.',
    icon: ICONS.DollarSign,
    iconBackground: 'bg-warning/10',
    iconText: 'text-warning',
    title: 'Competitive Pricing & Flexible Plans',
  },
];

const FeatureCard = ({ icon: Icon, iconBackground, iconText, title, body }: FeatureCardProps) => {
  return (
    <Card>
      <CardContent className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center gap-3">
          <div
            className={`
              flex size-12 shrink-0 items-center justify-center rounded-full
              ${iconBackground}
            `}
          >
            <Icon
              className={`
                size-6
                ${iconText}
              `}
            />
          </div>
          <H4>{title}</H4>
        </div>
        {body}
      </CardContent>
    </Card>
  );
};

export const CostExplanation = () => {
  return (
    <div className="flex max-w-6xl flex-col gap-6">
      <h3 className="text-center text-3xl">Why we charge for PCIT Tracker</h3>
      <div className="text-center">
        <p className="text-lg">
          We completely understand wanting all the great features of PCIT Tracker without paying—and we wish we could
          offer everything at no cost! However, our premium model exists so we can deliver the{' '}
          <strong>
            <Underline>highest-quality</Underline>, most reliable tool for Parent-Child Interaction Therapy{' '}
            <Underline>without compromise</Underline>
          </strong>
          .
        </p>
      </div>

      <div
        className={`
          grid gap-6
          md:grid-cols-2
        `}
      >
        {featureCards.map((card, index) => (
          <FeatureCard key={index} {...card} />
        ))}
      </div>

      <div className="rounded-lg bg-muted/50 p-4 text-center">
        <p className="text-sm">
          Try PCIT Tracker free as long as you want! <br /> If you&apos;d like to try the premium features,{' '}
          <A href="/#contact">let us know</A> and we&apos;ll get you set up with a free trial. <br />
          <br /> We&apos;re confident that once you experience the streamlined, ad-free workflow of PCIT Tracker,
          you&apos;ll see why investing in the premium version pays off in saved time, reduced paperwork, and better
          client outcomes.
        </p>
      </div>
    </div>
  );
};
