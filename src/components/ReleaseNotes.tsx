import { ICONS } from '../utils/icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { ScrollArea } from './ui/ScrollArea';
import { LuBug, LuInfo, LuSparkles } from 'react-icons/lu';
import { MdUpgrade } from 'react-icons/md';
import { cn } from '@pcit/shared/utils/cn';
import { formatDate } from '@pcit/shared/utils/formatDate';

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

const UPDATES: Update[] = [
  {
    changes: [
      {
        notes:
          'PDI forms have a "Start Coaching" button that allows you to start the coaching process. This will put a breakpoint in the flows to show when you started coaching, but you can still continue to record session data while you coach. The data recorded after the "Coaching Started" breakpoint will not be used to calculate the totals and percentages.',
        type: UpdateType.FEATURE,
      },
      {
        notes:
          'You can now add a label to each PDI flow step. This is useful for tracking notes on what was said or specific details about that part of the session.',
        type: UpdateType.FEATURE,
      },
      {
        notes: 'Added new PDI graphs to the data page.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'You can now track WACB-N and WACB-P scores. Enable this feature in your account settings.',
        type: UpdateType.FEATURE,
      },
      {
        notes: 'A new "Play Talk" option is now available on CDI forms. Enable this feature in your account settings.',
        type: UpdateType.FEATURE,
      },
      {
        notes:
          'Added a setting to split questions into "Inflection Questions" and "Other Questions" for more detailed tracking. These two will be combined into one "Questions" in charts. Enable this feature in your account settings.',
        type: UpdateType.FEATURE,
      },
      {
        notes: 'Changed "Use Enthusiasm" to "Enjoyment" on all CDI forms.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Updated "Mastery Criteria" to "Goal Criteria" throughout the site.',
        type: UpdateType.INFO,
      },
    ],
    date: '2025-07-31 11:00 AM',
    version: '2.6.4',
  },
  {
    changes: [
      {
        notes:
          'Added a new "PDI" chart to the data page. This chart shows the percent of correct follow through and effective direct commands for each caregiver.',
        type: UpdateType.FEATURE,
      },
    ],
    date: '2025-07-29 11:00 AM',
    version: '2.2.0',
  },
  {
    changes: [
      {
        notes:
          'You can now manually set the CDI goal criteria completion dates for caregivers from the family page. There is an edit icon at the top right of the "Caregivers" section. CDI goal criteria status will be automatically set when the criteria are met - it is calculated when you hit "End Session" on a CDI Coach Form, but now you can also set it manually.',
        type: UpdateType.FEATURE,
      },
    ],
    date: '2025-07-27 11:00 AM',
    version: '2.1.4',
  },
  {
    changes: [
      {
        notes:
          'PCIT-OC DPICS AND CDI AVAILABLE! We know there are many adaptations to PCIT, including PCIT for older children (PCIT-OC). We have added a new checkbox feature that allows you to indicate whether you are utilizing PCIT-OC with a family. This distinction will update DPICS and CDI data collection forms, including the ability to track frequencies of self-descriptions and rate non-verbal praise, and this new version will adjust criteria for CDI Goals to fit guidelines for PCIT-OC. Stay tuned for future updates on PDI forms and criteria for working with families when using PCIT-OC!',
        type: UpdateType.FEATURE,
      },
      {
        notes:
          'Added next and previous session buttons on the session page in the top bar around the session date picker.',
        type: UpdateType.ENHANCEMENT,
      },
    ],
    date: '2025-07-18 11:00 AM',
    version: '2.1.2',
  },
  {
    changes: [
      {
        notes:
          'FAMILY REPORTS! We have added a new feature that allows you to create reports for families. This is a great way to view and share with families, especially as they near CDI goal criteria or graduation criteria. The report includes high-level information about the family’s progress in a simple, easy-to-read format. Try it out now by using the "Report" button on the Family page or on the Data page.',
        type: UpdateType.FEATURE,
      },
      {
        notes: 'Fixed the "New session" and "New family" buttons on the home page.',
        type: UpdateType.BUGFIX,
      },
    ],
    date: '2025-07-12 6:00 PM',
    version: '2.0.2',
  },
  {
    changes: [
      {
        notes: 'Improved chart export quality. The chart download buttons now export a high quality image.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Added a chart layout toggle to the data page to switch between a single chart view and a grid view.',
        type: UpdateType.FEATURE,
      },
      {
        notes: 'Generally improved quality of charts and chart tooltips.',
        type: UpdateType.ENHANCEMENT,
      },
    ],
    date: '2025-07-10 11:00 AM',
    version: '1.8.6',
  },
  {
    changes: [
      {
        notes: 'Enhanced app UI and layout - miscellaneous UI improvements across the platform.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Chart and family filter state is now preserved when navigating between pages.',
        type: UpdateType.ENHANCEMENT,
      },
    ],
    date: '2025-07-04 11:00 AM',
    version: '1.8.2',
  },
  {
    changes: [
      {
        notes: 'Fixed issue that caused the family import to fail occasionally.',
        type: UpdateType.BUGFIX,
      },
      {
        notes: 'Fixed "Create a Family" button not working.',
        type: UpdateType.BUGFIX,
      },
    ],
    date: '2025-07-03 11:00 AM',
    version: '1.7.4',
  },
  {
    changes: [
      {
        notes: 'Added new graph for visualizing the new "Special Time Days Since Last Session" field on the CDI Form.',
        type: UpdateType.FEATURE,
      },
    ],
    date: '2025-06-10 11:00 AM',
    version: '1.7.2',
  },
  {
    changes: [
      {
        notes:
          'Added a "Special Time Days Since Last Session" field to the CDI Form. This field tracks the total number of days the caregiver(s) have had special time with the child since the last session.',
        type: UpdateType.FEATURE,
      },
    ],
    date: '2025-06-09 11:00 AM',
    version: '1.7.0',
  },
  {
    changes: [
      {
        notes:
          'Fixed an issue where login was case-sensitive for email addresses. Users can now sign in regardless of uppercase or lowercase letters in their email.',
        type: UpdateType.BUGFIX,
      },
    ],
    date: '2025-05-08 11:00 AM',
    version: '1.6.18',
  },
  {
    changes: [
      {
        notes: 'Unlabeled praise in PDI Coach form is now neutrally colored instead of positively (green) colored.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Allow clearing selection for form dropdowns.',
        type: UpdateType.ENHANCEMENT,
      },
    ],
    date: '2025-04-16 11:00 AM',
    version: '1.6.14',
  },
  {
    changes: [
      {
        notes: 'Added a search bar to the FAQs page to search for specific questions.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Improved miscellaneous UI elements to be more user friendly and consistent.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Number inputs now allow you to clear out the 0 when typing directly into them',
        type: UpdateType.ENHANCEMENT,
      },
    ],
    date: '2025-04-14 11:00 AM',
    version: '1.6.12',
  },
  {
    changes: [
      {
        notes:
          'Adding the CSV export to the family export dialog. On a family page, click the "Export family" button to download an Excel file with all session data in a spreadsheet format for data analysis and record keeping/reporting.',
        type: UpdateType.FEATURE,
      },
    ],
    date: '2025-04-06 11:00 AM',
    version: '1.6.10',
  },
  {
    changes: [
      {
        notes:
          'Dashboard redesigned to be more user friendly and informative. Added new logo and secondary color to the app for more contrast.',
        type: UpdateType.ENHANCEMENT,
      },
    ],
    date: '2025-04-02 11:00 AM',
    version: '1.6.8',
  },
  {
    changes: [
      {
        notes:
          'You can now export an entire family as a JSON file. This includes all sessions, caregivers, and notes. This is useful for transferring families to new therapists or for data backup purposes. See the "Export family" button in the family details page.',
        type: UpdateType.FEATURE,
      },
      {
        notes:
          'All buttons now have more contrast with the background. This makes it easier to see which button you are clicking on.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Login and signup pages show better error messages when login fails.',
        type: UpdateType.BUGFIX,
      },
    ],
    date: '2025-04-01 11:00 AM',
    version: '1.6.2',
  },
  {
    changes: [
      {
        notes: 'CDI Teach and PDI Teach forms now have a Comments field for notes and comments about the session.',
        type: UpdateType.FEATURE,
      },
    ],
    date: '2025-03-14 11:00 AM',
    version: '1.5.0',
  },
  {
    changes: [
      {
        notes: `Auth pages do not have an "/auth" prefix anymore. You may need to update your bookmarks. Ex: Before: ${process.env.NEXT_PUBLIC_APP_URL}/auth/signin, After: ${process.env.NEXT_PUBLIC_APP_URL}/signin`,
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Fixed issue where last session type and date were not correct on the families page.',
        type: UpdateType.BUGFIX,
      },
      {
        notes: 'Fixed calendar date picker button icons not appearing.',
        type: UpdateType.BUGFIX,
      },
    ],
    date: '2025-02-28',
    version: '1.4.2',
  },
  {
    changes: [
      {
        notes: 'Session forms now auto-save as you enter values. You can also manually save at any time.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes:
          'Added "Other" option to caregiver select when creating/updating a family. Select "Other" and type in a custom label to add a caregiver that is not in the list.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Fixed issue error message when logging in with incorrect credentials.',
        type: UpdateType.BUGFIX,
      },
    ],
    date: '2025-02-18',
    version: '1.4.0',
  },
  {
    changes: [
      {
        notes: 'App will now automatically warn you if you try to leave a session without saving.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Added FAQs section to help page.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Fixed bug where ECBI intensity and problem scores were not updating.',
        type: UpdateType.BUGFIX,
      },
    ],
    date: '2025-01-28',
    version: '1.2.0',
  },
  {
    changes: [
      {
        notes: 'Moved save, next, and previous buttons to the top section of forms for better use of space.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Date picker now allows manual text input.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Added sort select options to families page.',
        type: UpdateType.FEATURE,
      },
    ],
    date: '2025-01-28',
    version: '1.1.4',
  },
  {
    changes: [
      {
        notes: 'Adjusted input, button, and text sizes for better readability.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Auto-save sessions when changing between caregivers or forms',
        type: UpdateType.FEATURE,
      },
      {
        notes: 'Fixed bug on mobile safari where chart labels were overlapping.',
        type: UpdateType.BUGFIX,
      },
    ],
    date: '2025-01-25',
    version: '1.1.2',
  },
  {
    changes: [
      {
        notes:
          'Ability to archive and set graduated status on families. Archived and/or graduated families are hidden from the main families list by default (this can be toggled in the filters).',
        type: UpdateType.FEATURE,
      },
      {
        notes: 'Adjusted data chart colors for enhanced readability.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Added "Notes" section on families page.',
        type: UpdateType.FEATURE,
      },
    ],
    date: '2025-01-20',
    version: '1.1.0',
  },
  {
    changes: [
      {
        notes: 'Added percentages to ECBI Pie Chart tooltips.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'ECBI inputs update immediately.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Added "New session" button from families page.',
        type: UpdateType.FEATURE,
      },
    ],
    date: '2025-01-19',
    version: '1.0.4',
  },
  {
    changes: [
      {
        notes: 'Updated families and family pages to be more user friendly.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Reduced data cache time so updates are reflected faster.',
        type: UpdateType.BUGFIX,
      },
    ],
    date: '2025-01-14',
    version: '1.0.3',
  },
  {
    changes: [
      {
        notes: 'Added ability to export PDF of charts.',
        type: UpdateType.FEATURE,
      },
      {
        notes: 'Various UI improvements in both light and dark mode.',
        type: UpdateType.ENHANCEMENT,
      },
      {
        notes: 'Fixed PDI form overflow issue on smaller screens.',
        type: UpdateType.BUGFIX,
      },
    ],
    date: '2024-12-16',
    version: '1.0.2',
  },
];

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

export const ReleaseNotes = ({ className, hideHeader = false }: { className?: string; hideHeader?: boolean }) => {
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
            {UPDATES.map((update, index) => (
              <TimelineItem key={index} update={update} />
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};
