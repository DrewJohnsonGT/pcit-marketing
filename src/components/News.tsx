import { LuExternalLink } from 'react-icons/lu';
import { Badge } from '~/components/ui/Badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/Card';
import { ScrollArea } from '~/components/ui/ScrollArea';
import { A } from '~/components/ui/Typography';
import { cn } from '~/utils/cn';
import { formatDate } from '~/utils/formatDate';
import { ICONS } from '~/utils/icons';

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

interface NewsItem {
  date: string;
  description: string;
  link: string;
  tags: NewsTags[];
  title: string;
}

async function getNews(): Promise<NewsItem[]> {
  const newsResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/public/news`, {
    cache: 'force-cache',
    next: { tags: ['news'] },
  });

  if (!newsResponse.ok) {
    throw new Error('Failed to fetch news data');
  }

  return newsResponse.json();
}

export const News = async ({ className }: { className?: string }) => {
  const newsData = await getNews();

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
            {newsData.map((item, index) => (
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
                      View Article
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
