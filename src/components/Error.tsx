import { Button } from '~/components/ui/Button';
import { ROOT_PATH, SUPPORT_EMAIL } from '~/utils/constants';
import { ICONS } from '~/utils/icons';
import { IMAGES } from '~/utils/images';

export const Error = ({ error, reset }: { error: { message: string }; reset?: () => void }) => {
  return (
    <div className={`flex flex-1 flex-col items-center justify-center p-4 text-center`}>
      <div className="w-full max-w-lg space-y-6 px-4">
        <h1 className="text-6xl font-bold text-primary">Oops!</h1>
        <img src={IMAGES.error.src} alt="Error" className="mx-auto flex-1 p-4" />
        <p className="text-2xl font-semibold text-primary">Something went wrong.</p>
        <p className="text-muted-foreground">
          Our team has been notified. If you continue to experience issues, please contact support at{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>
            <Button variant="link">{SUPPORT_EMAIL}</Button>
          </a>
          .
        </p>
        {error.message && (
          <pre
            className={`
              max-h-48 w-full overflow-y-auto rounded-md border border-dashed border-destructive bg-muted p-4 text-left
              break-words whitespace-pre-wrap text-destructive
            `}
          >
            {error.message}
          </pre>
        )}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => {
              if (reset) {
                reset();
              } else {
                window.location.reload();
              }
            }}
          >
            <ICONS.Refresh />
            Refresh
          </Button>
          <a href={ROOT_PATH}>
            <Button variant="outline">
              <ICONS.Home />
              Back to Home
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
