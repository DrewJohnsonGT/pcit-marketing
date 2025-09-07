import { LuExternalLink } from 'react-icons/lu';
import { Badge } from '@pcit/shared/components/ui/Badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@pcit/shared/components/ui/Card';
import { ScrollArea } from '@pcit/shared/components/ui/ScrollArea';
import { A } from '@pcit/shared/components/ui/Typography';
import { cn } from '@pcit/shared/utils/cn';
import { formatDate } from '@pcit/shared/utils/formatDate';
import { ICONS } from '@pcit/shared/utils/icons';

enum NewsTags {
  Conference = 'Conference',
  Education = 'Education',
  Research = 'Research',
  Therapy = 'Therapy',
}

const NewsTagColors = {
  [NewsTags.Research]: 'bg-blue-500/40 border-blue-500',
  [NewsTags.Therapy]: 'bg-green-500/40 border-green-500',
  [NewsTags.Conference]: 'bg-yellow-500/40 border-yellow-500',
  [NewsTags.Education]: 'bg-purple-500/40 border-purple-500',
};

const NEWS = [
  {
    date: '2025-07-11',
    description:
      'A new study from researchers at the University of Miami highlights how time-limited PCIT improves not only child behavior but also caregiver mental health. Caregivers reported significant reductions in depression and anxiety symptoms, with improvements partially explained by increases in parenting skills. These findings support PCIT as an impactful intervention not only for children, but also for their caregivers.',
    link: 'https://www.mdpi.com/2227-9067/12/7/922',
    tags: [NewsTags.Research, NewsTags.Education],
    title:
      'Parenting Under Pressure: The Transformative Impact of PCIT on Caregiver Depression and Anxiety and Child Outcomes',
  },
  {
    date: '2022-05-05',
    description:
      'A recent study from a Midwestern children’s hospital found that Parent–Child Interaction Therapy (PCIT) is effective for children with and without trauma histories—even when families do not complete the full course of treatment. Both groups showed significant reductions in behavior problems and increases in parenting confidence over time. These findings support the use of standard PCIT for children with trauma exposure.',
    link: 'https://psycnet.apa.org/record/2022-57829-001?doi=1',
    tags: [NewsTags.Research, NewsTags.Education],
    title: 'Comparative effectiveness of parent–child interaction therapy based on trauma exposure and attrition.',
  },
];

export const News = ({ className }: { className?: string }) => {
  return (
    <Card className={cn('max-w-xl', className)}>
      <CardHeader>
        <CardTitle>
          <ICONS.News /> PCIT in the News
        </CardTitle>
        <CardDescription>
          Recent articles, research, and resources about Parent-Child Interaction Therapy.
        </CardDescription>
      </CardHeader>
      <ScrollArea className="h-[550px]" type="always">
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {NEWS.map((item, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader className="flex flex-col gap-2">
                  <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                  <div className="flex w-full items-center justify-between text-sm">
                    <span>{formatDate(new Date(item.date), 'MMMM d, yyyy')}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} size="sm" className={cn('text-foreground', NewsTagColors[tag])}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <A
                      href={item.link}
                      className={`
                        inline-flex items-center text-primary
                        hover:underline
                      `}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Read more about ${item.title}`}
                    >
                      Read more
                      <LuExternalLink className="ml-1 size-4" />
                    </A>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};
