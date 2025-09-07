import { ICONS } from '../utils/icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { ScrollArea } from './ui/ScrollArea';
import { LuBug, LuInfo, LuSparkles } from 'react-icons/lu';
import { MdUpgrade } from 'react-icons/md';
import { cn } from '~/utils/cn';
import { formatDate } from '~/utils/formatDate';

enum UpdateType {
  BUGFIX = 'Bugfix',
  ENHANCEMENT = 'Enhancement',
  INFO = 'Info',
  FEATURE = 'New Feature',
}

const UpdateTypeColors = {
  [UpdateType.FEATURE]: {
    background: 'bg-green-500',
    ring: 'ring-green-500/40',
  },
  [UpdateType.BUGFIX]: {
    background: 'bg-red-500',
    ring: 'ring-red-500/40',
  },
  [UpdateType.ENHANCEMENT]: {
    background: 'bg-blue-500',
    ring: 'ring-blue-500/40',
  },
  [UpdateType.INFO]: {
    background: 'bg-yellow-500',
    ring: 'ring-yellow-500/40',
  },
};

interface Change {
  notes: string;
  type: UpdateType;
}

interface Update {
  changes: Change[];
  date: string;
  version: string;
}

async function getReleaseNotesData(): Promise<Update[]> {
  const releaseNotesResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/public/release-notes`, {
    // This ensures the data is fetched at build time and cached
    cache: 'force-cache',
  });

  if (!releaseNotesResponse.ok) {
    throw new Error('Failed to fetch release notes data');
  }

  return releaseNotesResponse.json();
}

const icons: Record<UpdateType, React.ElementType> = {
  [UpdateType.BUGFIX]: LuBug,
  [UpdateType.FEATURE]: LuSparkles,
  [UpdateType.ENHANCEMENT]: MdUpgrade,
  [UpdateType.INFO]: LuInfo,
};

const TimelineItem = ({ update }: { update: Update }) => {
  return (
    <div className="relative pb-10 pl-8">
      <div className="absolute top-0 left-3 h-full w-px bg-border" />

      {update.changes.map((change, idx) => {
        const { background, ring } = UpdateTypeColors[change.type];
        return (
          <div
            key={idx}
            className={cn('absolute z-10 size-3 rounded-full shadow-sm ring-4', background, ring)}
            style={{
              left: '0.75rem',
              top: `${(idx + 1) * 15 - 5}px`,
              transform: 'translateX(-50%)',
              zIndex: 10 - idx,
            }}
          />
        );
      })}

      <div className="mb-2 flex items-center gap-2">
        <span className="text-muted-foreground">{formatDate(new Date(update.date), 'MMM d, yyyy')}</span>
        <span className="text-muted-foreground">•</span>
        <span className="font-bold text-primary">v{update.version}</span>
      </div>

      <div className={`flex flex-col gap-2 rounded-lg border border-border bg-card p-2`}>
        {update.changes.map((change, changeIdx: number) => {
          const Icon = icons[change.type];
          const { background, ring } = UpdateTypeColors[change.type];

          return (
            <div key={changeIdx} className="flex items-start gap-4">
              <div
                className={cn(`flex size-6 shrink-0 items-center justify-center rounded-full ring-4`, background, ring)}
              >
                <Icon className="size-4" />
              </div>
              <p className="text-xs">{change.notes}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ReleaseNotes = async ({ className, hideHeader = false }: { className?: string; hideHeader?: boolean }) => {
  const updatesData = await getReleaseNotesData();

  return (
    <Card className={cn('max-w-lg', className)}>
      <CardHeader className="flex flex-col gap-1">
        {!hideHeader && (
          <CardTitle>
            <ICONS.History /> Release Notes
          </CardTitle>
        )}
        {!hideHeader && <CardDescription>Keep up with the latest updates and improvements to the app.</CardDescription>}
        <legend className={cn('flex w-full justify-around gap-2', !hideHeader && 'mt-4')}>
          {Object.values(UpdateType).map((updateType) => {
            const Icon = icons[updateType];
            return (
              <div key={updateType} className="flex items-center gap-2">
                <div
                  className={cn(
                    `flex size-6 shrink-0 items-center justify-center rounded-full ring-4`,
                    UpdateTypeColors[updateType].background,
                    UpdateTypeColors[updateType].ring,
                  )}
                >
                  <Icon className="size-4" />
                </div>
                <span className="text-sm font-medium">{updateType}</span>
              </div>
            );
          })}
        </legend>
      </CardHeader>
      <ScrollArea className="h-[500px] max-w-xl" type="always">
        <CardContent>
          <div className="pr-4">
            {updatesData.map((update, index) => (
              <TimelineItem key={index} update={update} />
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};
