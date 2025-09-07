import { FaXTwitter } from 'react-icons/fa6';
import { IoLogoReddit } from 'react-icons/io5';
import { LuFacebook, LuLinkedin } from 'react-icons/lu';
import { Button } from '@pcit/shared/components/ui/Button';

const URL = process.env.NEXT_PUBLIC_APP_URL;
const TITLE = 'Check out PCIT Tracker!';

export const SocialShareButtons = () => {
  const encodedUrl = encodeURIComponent(URL);
  const encodedTitle = encodeURIComponent(TITLE);

  const SOCIAL_SHARES = [
    {
      href: `https://twitter.com/share?url=${encodedUrl}&text=${encodedTitle}&via=pcittracker&hashtags=PCIT,ParentChildInteractionTherapy`,
      icon: FaXTwitter,
      name: 'Twitter',
    },
    {
      href: `https://www.facebook.com/sharer.php?u=${encodedUrl}`,
      icon: LuFacebook,
      name: 'Facebook',
    },
    {
      href: `https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedTitle}`,
      icon: LuLinkedin,
      name: 'LinkedIn',
    },
    {
      href: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      icon: IoLogoReddit,
      name: 'Reddit',
    },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        {SOCIAL_SHARES.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${social.name}`}
            >
              <Button variant="outline" size="sm" aria-label={`Share on ${social.name}`}>
                <Icon />
                <span
                  className={`
                    hidden
                    sm:inline
                  `}
                >
                  {social.name}
                </span>
              </Button>
            </a>
          );
        })}
      </div>
    </div>
  );
};
