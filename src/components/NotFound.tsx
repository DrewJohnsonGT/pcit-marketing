import { Button } from '~/components/ui/Button';
import { ROOT_PATH } from '~/utils/constants';
import { ICONS } from '~/utils/icons';
import { IMAGES } from '~/utils/images';

export const NotFound = ({ button }: { button?: React.ReactNode }) => {
  const HomeButton = button || (
    <Button variant="outline" className="mt-4">
      <a href={ROOT_PATH} className="inline-flex items-center">
        <ICONS.ArrowLeft />
        Back to Home
      </a>
    </Button>
  );

  return (
    <div className={`flex min-h-screen flex-col items-center justify-center p-4 text-center`}>
      <div className="flex max-w-lg flex-col gap-4">
        <h1 className="animate-pulse text-6xl font-bold text-primary">404</h1>
        <div className="mx-auto h-1 w-20 animate-expand rounded-full bg-primary"></div>
        <h2 className="text-2xl font-semibold text-primary">Page Not Found</h2>
        <img src={IMAGES.notFound.src} alt="404" className="mx-auto flex-1" />
        <p className="text-muted-foreground">
          Oops! <br /> The page you&apos;re looking for seems to have vanished into the digital void.
        </p>
        {HomeButton}
      </div>
    </div>
  );
};
