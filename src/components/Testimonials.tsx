import React from 'react';
import { Card, CardContent } from '~/components/ui/Card';
import { H3, P, Small } from '~/components/ui/Typography';
import { cn } from '~/utils/cn';
import { Icons, ICONS } from '~/utils/icons';

interface Testimonial {
  content: string;
  rating: number;
  userName: string;
  userTitle: string;
}

const mockTestimonials: Testimonial[] = [
  {
    content:
      'I love the ease that PCIT-Tracker gives to keeping up with all the data I take. Not only is the process of the session simplifed with taking observation data on the tracker, but having the ECBI scores and a 5 minute timer all on the same screen saves me a lot of time. The charts that are made from the data are very beneficial to both the clinician and the family.',
    rating: 5,
    userName: 'Ashley Carter',
    userTitle: 'MA, PCIT Certified Therapist',
  },
  {
    content:
      'I am loving this tracker! It has made my life so much easier, The graphs are wonderful and such a time saver. Parents can clearly see their improved skills. Thank you so much for developing this amazing resource!',
    rating: 5,
    userName: 'Dianne Branning',
    userTitle: 'MA, PCIT Certified Therapist',
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const StarIcon = ICONS[Icons.Star];

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          key={i}
          className={cn('size-6', i < rating ? 'fill-current text-warning' : 'text-muted-foreground')}
        />
      ))}
    </div>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <Card>
      <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
        <StarRating rating={testimonial.rating} />

        <P className="text-muted-foreground italic">&ldquo;{testimonial.content}&rdquo;</P>

        <div>
          <H3 className="mb-1 text-primary-darker">{testimonial.userName}</H3>
          <Small className="text-muted-foreground">{testimonial.userTitle}</Small>
        </div>
      </CardContent>
    </Card>
  );
};

export const Testimonials = () => {
  return (
    <div
      className={`
        mx-auto grid max-w-4xl grid-cols-1 gap-8
        md:grid-cols-2
      `}
    >
      {mockTestimonials.map((testimonial, index) => (
        <TestimonialCard key={index} testimonial={testimonial} />
      ))}
    </div>
  );
};
