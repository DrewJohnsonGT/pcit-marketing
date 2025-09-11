import Image from 'next/image';
import Link from 'next/link';
import { ContactForm } from '~/components/ContactForm';
import { CostExplanation } from '~/components/CostExplanation';
import { FAQs } from '~/components/FAQs';
import { FeatureCards } from '~/components/FeatureCards';
import { Founders } from '~/components/Founders';
import { HeroVideoDialog } from '~/components/HeroVideoDialog';
import { HoverBorderGradient } from '~/components/HoverBorderGradient';
import { News } from '~/components/News';
import { PricingPlans } from '~/components/Pricing';
import { ProductCards } from '~/components/ProductCards';
import { ReleaseNotes } from '~/components/ReleaseNotes';
import { SocialShareButtons } from '~/components/SocialShareButtons';
import { Testimonials } from '~/components/Testimonials';
import { Button } from '~/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/DropdownMenu';
import { A, H2, H3 } from '~/components/ui/Typography';
import { cn } from '~/utils/cn';
import {
  APP_NAME,
  APP_SLOGAN,
  PRIVACY_POLICY_URL,
  RESPONSIBLE_USE_URL,
  SUPPORT_EMAIL,
  TERMS_OF_SERVICE_URL,
} from '~/utils/constants';
import { ICONS } from '~/utils/icons';
import { IMAGES } from '~/utils/images';

const HEADER_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#about', label: 'About' },
  { href: '#faqs', label: 'FAQs' },
  { href: '#release-notes', label: 'Changelog' },
  { href: '#contact', label: 'Contact' },
];

const FOOTER_LINKS = [
  { href: TERMS_OF_SERVICE_URL, label: 'Terms of Service' },
  { href: PRIVACY_POLICY_URL, label: 'Privacy Policy' },
  { href: RESPONSIBLE_USE_URL, label: 'Responsible Use Policy' },
];

const Heading = ({
  children,
  className,
  variant = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'accent' | 'default' | 'hero' | 'muted' | 'primary' | 'secondary';
}) => {
  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return 'text-primary-foreground';
      case 'secondary':
        return 'text-secondary-foreground';
      case 'accent':
        return 'text-accent-foreground';
      case 'muted':
        return 'text-muted-foreground';
      default:
        return 'text-secondary';
    }
  };

  return (
    <h2 className={cn(`mb-8 text-center text-5xl font-bold tracking-tight select-none`, getTextColor(), className)}>
      {children}
    </h2>
  );
};

const getSectionStyle = (variant: 'accent' | 'default' | 'hero' | 'muted' | 'primary' | 'secondary') => {
  switch (variant) {
    case 'hero':
      return 'bg-gradient-to-b from-background via-background to-primary/10';
    case 'primary':
      return 'bg-primary text-primary-foreground';
    case 'secondary':
      return 'bg-secondary text-secondary-foreground';
    case 'accent':
      return 'bg-accent-background text-accent-foreground';
    case 'muted':
      return 'bg-muted text-muted-foreground';
    default:
      return 'bg-background text-foreground';
  }
};
const Section = ({
  children,
  className,
  id,
  subheader,
  header,
  variant = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  header?: string;
  id?: string;
  subheader?: React.ReactNode;
  variant?: 'accent' | 'default' | 'hero' | 'muted' | 'primary' | 'secondary';
}) => {
  return (
    <section
      id={id}
      className={cn(
        `
          relative flex w-full flex-col items-center px-4 py-6 transition-colors duration-500
          md:px-6 md:py-12
          lg:py-20
        `,
        getSectionStyle(variant),
        className,
      )}
    >
      {header && (
        <Heading variant={variant} className={cn(subheader && 'mb-4')}>
          {header}
        </Heading>
      )}
      {subheader && <p className={cn('mb-8 text-center text-lg', getSectionStyle(variant))}>{subheader}</p>}
      {children}
    </section>
  );
};

export default function MarketingPage() {
  return (
    <div className="h-dvh bg-background">
      <header className={`sticky top-0 z-50 flex h-20 w-full flex-1 items-center bg-background p-2`}>
        <nav
          className={`
            hidden flex-1 items-center justify-center gap-2
            md:flex
          `}
        >
          {HEADER_LINKS.map((link, index) => (
            <Link key={index} href={link.href} aria-label={`Scroll to ${link.label}`} prefetch={false}>
              <Button
                size="sm"
                variant="ghost"
                className={`
                  text-sm font-medium underline-offset-4 transition-all duration-300
                  hover:text-secondary
                `}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>
        <Link href="#" aria-label="Home" prefetch={false}>
          <span className="text-2xl leading-none font-bold text-primary">{APP_NAME}</span>
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <Link href="/signup" aria-label="Sign Up">
            <Button aria-label="Sign Up" className="rounded-full p-6">
              Get Started
            </Button>
          </Link>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Menu">
                  <ICONS.Menu className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {HEADER_LINKS.map((link, index) => (
                  <DropdownMenuItem key={index}>
                    <Link href={link.href} className={`text-sm font-medium underline-offset-4`} prefetch={false}>
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <Section className="mt-6" variant="primary">
          <Image
            src={IMAGES.logoNoText.src}
            alt={APP_NAME}
            className={`shrink-0 drop-shadow-[0px_0px_4epx_hsl(var(--primary))]`}
            width={250}
            height={250}
            loading="eager"
            priority
          />
          <div
            className={`
              text-center text-5xl font-bold tracking-tight select-none
              sm:text-4xl
              md:text-5xl
              lg:text-6xl/none
            `}
          >
            Minimize paperwork. <br />
            <b className="!font-extrabold">Maximize productivity.</b>
          </div>
          <span className={`z-10 max-w-lg p-4 text-center text-xl font-medium text-foreground`}>{APP_SLOGAN}</span>
          <Link href="/signup" className="z-10 mt-4" aria-label={`Sign up for ${APP_NAME}`}>
            <HoverBorderGradient
              as="button"
              className={`
                w-[250px] bg-primary/80 text-primary-foreground
                hover:text-primary-foreground
              `}
            >
              <span>Get Started</span>
            </HoverBorderGradient>
          </Link>
          <div className="mt-8" />
        </Section>
        <HeroVideoDialog
          videoSrc="https://www.youtube.com/embed/Nk6xOFjQFf0?si=9mNsawdpcBIRkR9w"
          thumbnailSrc="https://img.youtube.com/vi/Nk6xOFjQFf0/maxresdefault.jpg"
          thumbnailAlt="PCIT Tracker Introduction"
          className="mt-8 max-w-3xl"
        />
        <Section
          id="testimonials"
          header="What Our Users Say"
          subheader="Discover how PCIT Tracker is making a difference in therapy practices and families' lives."
          variant="primary"
        >
          <Testimonials />
        </Section>
        <Section id="features" header="Features" variant="default">
          <ProductCards />
          <H2 className="mt-8">Overview of Pages</H2>
          <HeroVideoDialog
            videoSrc="https://www.youtube.com/embed/hS10efyP980?si=lV0uhT-EqBcn8_HM"
            thumbnailSrc="https://img.youtube.com/vi/hS10efyP980/maxresdefault.jpg"
            thumbnailAlt="PCIT Tracker Overview of Pages"
            className="mt-8 max-w-3xl"
          />
          <FeatureCards />
        </Section>
        <Section
          id="pricing"
          header="Pricing Plans"
          subheader={
            <>
              Choose the plan that best fits your needs. <br /> Cancel anytime, no questions asked.
            </>
          }
          variant="secondary"
        >
          <PricingPlans />
        </Section>
        <Section id="cost-explanation" className="mx-auto max-w-3xl" variant="default">
          <H3 className="mb-4 text-2xl">Why we charge for PCIT Tracker</H3>
          <CostExplanation />
        </Section>
        <Section id="about" header="Our Founders" variant="accent">
          <Founders />
        </Section>
        <Section
          id="faqs"
          header="FAQs"
          subheader={
            <>
              Got questions? We&apos;ve got answers. <br /> If you don&apos;t find what you&apos;re looking for, please
              reach out to us.
            </>
          }
          variant="default"
        >
          <FAQs />
        </Section>
        <Section
          id="release-notes"
          header="Release Notes"
          subheader={
            <>
              We are always working to improve PCIT Tracker. <br /> Here are the latest updates.
            </>
          }
          variant="muted"
        >
          <ReleaseNotes hideHeader />
        </Section>
        <Section id="news" variant="default">
          <News />
        </Section>
        <Section id="contact" header="Contact Us" variant="primary">
          <ContactForm />
        </Section>
        <Section variant="hero">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-4">
              <Image src={IMAGES.logo.src} alt="PCIT Tracker" className="mx-auto shrink-0" width={100} height={100} />
              <Heading>Ready to Get Started?</Heading>
              <p
                className={`
                  max-w-[600px] text-muted-foreground
                  md:text-xl/relaxed
                  lg:text-base/relaxed
                  xl:text-xl/relaxed
                `}
              >
                Take your PCIT therapy to the next level.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <div className="flex justify-center">
                <a href="/signup" aria-label="Sign up for PCIT Tracker">
                  <HoverBorderGradient
                    as="button"
                    className={`
                      w-[250px] bg-primary/80 text-primary-foreground
                      hover:text-primary-foreground
                    `}
                  >
                    <span>Get Started</span>
                  </HoverBorderGradient>
                </a>
              </div>
              <p className="text-xs text-muted-foreground">
                By signing up, you agree to our{' '}
                <A href={TERMS_OF_SERVICE_URL} aria-label="Terms & Conditions">
                  Terms & Conditions
                </A>
              </p>
            </div>
          </div>

          <p className="mt-12 text-center text-sm">
            Questions? Email{' '}
            <A href={`mailto:${SUPPORT_EMAIL}`} aria-label="Email support">
              {SUPPORT_EMAIL}
            </A>
          </p>
        </Section>
        <footer
          className={`
            grid items-center gap-4 border-t p-4 py-8
            xl:grid-cols-3
          `}
        >
          <p
            className={`
              text-center text-xs text-muted-foreground
              xl:text-start
            `}
          >
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground">Share us on</p>
            <SocialShareButtons />
          </div>
          <nav
            className={`
              flex justify-center gap-4
              xl:justify-end xl:gap-6
            `}
          >
            {FOOTER_LINKS.map((link) => (
              <A
                key={link.href}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noreferrer"
                className="text-xs"
              >
                {link.label}
              </A>
            ))}
          </nav>
        </footer>
      </main>
    </div>
  );
}
