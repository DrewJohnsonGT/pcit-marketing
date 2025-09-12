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
  PRIVACY_POLICY_URL,
  RESPONSIBLE_USE_URL,
  SUPPORT_EMAIL,
  TERMS_OF_SERVICE_URL,
} from '~/utils/constants';
import { ICONS } from '~/utils/icons';
import { IMAGES } from '~/utils/images';

const HEADER_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#about', label: 'About' },
  { href: '#faqs', label: 'FAQs' },
  { href: '#contact', label: 'Contact' },
];

const FOOTER_LINKS = [
  { href: TERMS_OF_SERVICE_URL, label: 'Terms of Service' },
  { href: PRIVACY_POLICY_URL, label: 'Privacy Policy' },
  { href: RESPONSIBLE_USE_URL, label: 'Responsible Use Policy' },
];

const getTextColor = (variant: 'accent' | 'default' | 'hero' | 'muted' | 'primary' | 'secondary') => {
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
    default:
      return 'bg-background text-foreground';
  }
};

const Heading = ({
  children,
  className,
  variant = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'accent' | 'default' | 'hero' | 'muted' | 'primary' | 'secondary';
}) => {
  return (
    <h2
      className={cn(
        `mb-8 text-center text-5xl font-medium tracking-normal select-none`,
        getTextColor(variant),
        className,
      )}
    >
      {children}
    </h2>
  );
};

const Subheading = ({
  children,
  className,
  variant = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'accent' | 'default' | 'hero' | 'muted' | 'primary' | 'secondary';
}) => {
  return <p className={cn('mb-8 text-center text-xl', getSectionStyle(variant), className)}>{children}</p>;
};

const Section = ({
  children,
  className,
  id,
  subheading,
  header,
  variant = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  header?: string;
  id?: string;
  subheading?: React.ReactNode;
  variant?: 'accent' | 'default' | 'hero' | 'muted' | 'primary' | 'secondary';
}) => {
  return (
    <section
      id={id}
      className={cn(
        `
          relative flex w-full scroll-m-20 flex-col items-center px-4 py-6 transition-colors duration-500
          md:px-6 md:py-12
          lg:py-20
        `,
        getSectionStyle(variant),
        className,
      )}
    >
      {header && (
        <Heading variant={variant} className={cn(subheading && 'mb-4')}>
          {header}
        </Heading>
      )}
      {subheading && <Subheading variant={variant}>{subheading}</Subheading>}
      {children}
    </section>
  );
};

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header
        className={`
          sticky top-0 z-50 flex h-20 w-full items-center justify-between border-b border-border/50 bg-background/95 p-2
          px-4 backdrop-blur-sm
        `}
      >
        <nav
          className={`
            hidden flex-1 items-center gap-2
            md:flex
          `}
        >
          {HEADER_LINKS.map((link, index) => (
            <Link key={index} href={link.href} aria-label={`Scroll to ${link.label}`} prefetch={false}>
              <Button
                variant="ghost"
                className={`
                  font-bold decoration-border decoration-3 underline-offset-12 transition-all duration-300
                  hover:bg-background hover:text-secondary hover:underline
                `}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>
        <Link href="/" aria-label="Home" prefetch={false} className="flex flex-1 items-center justify-center gap-4">
          <Image src={IMAGES.logoNoText.src} alt={APP_NAME} width={64} height={64} />
          <span className="text-3xl font-semibold tracking-wider text-primary-dark uppercase">{APP_NAME}</span>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-6">
          <Link
            href="/login"
            aria-label="Login"
            className={`
              text-lg underline decoration-border decoration-3 underline-offset-6
              hover:text-secondary hover:decoration-secondary
            `}
          >
            Log in
          </Link>
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
      <main>
        <div className="flex h-8 items-center justify-center gap-1 bg-primary-light text-foreground">
          <ICONS.Info className="size-4" aria-hidden="true" /> Interested in research, partnerships, or a premium trial?{' '}
          <A href="/#contact" className={`underline`}>
            Contact us!
          </A>
        </div>
        <Section variant="primary">
          <div
            className={`
              text-5xl select-none
              sm:text-4xl
              md:text-5xl
              lg:text-6xl/none
            `}
          >
            Track Smarter.
            <br />
            Treat Smarter.
          </div>
          <ul className={`z-10 mt-2 flex max-w-lg flex-col gap-3 p-4 text-xl font-medium text-inherit`}>
            <li className="flex items-center gap-2">
              <ICONS.History className="size-6" aria-hidden="true" />
              <span>Save hours every week</span>
            </li>
            <li className="flex items-center gap-2">
              <ICONS.Data className="size-6" aria-hidden="true" />
              <span>Get instant data insights</span>
            </li>
            <li className="flex items-center gap-2">
              <ICONS.Star className="size-6" aria-hidden="true" />
              <span>Maximize the effectiveness of your PCIT</span>
            </li>
          </ul>
          <Link href="/signup" className="z-10 mt-4" aria-label={`Sign up for ${APP_NAME}`}>
            <HoverBorderGradient
              as="button"
              className={`
                w-[250px] bg-secondary/80 text-secondary-foreground
                hover:text-secondary-foreground
              `}
            >
              <span>Get Started</span>
            </HoverBorderGradient>
          </Link>
          <div className="mt-8" />
        </Section>
        <Section>
          <HeroVideoDialog
            videoSrc="https://www.youtube.com/embed/Nk6xOFjQFf0?si=9mNsawdpcBIRkR9w"
            thumbnailSrc="https://img.youtube.com/vi/Nk6xOFjQFf0/maxresdefault.jpg"
            thumbnailAlt="PCIT Tracker Introduction"
            className="max-w-3xl"
          />
        </Section>
        <Section
          id="testimonials"
          header="What Our Users Say"
          subheading="Discover how PCIT Tracker is making a difference in therapy practices and families' lives."
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
          subheading={
            <>
              Free to try as long as you want! <br />
              Choose the plan that best fits your needs. <br /> Cancel anytime, no questions asked.
            </>
          }
        >
          <PricingPlans />
        </Section>
        <Section id="cost-explanation" className="mx-auto max-w-6xl gap-4" variant="default">
          <H3 className="text-3xl!">Why we charge for PCIT Tracker</H3>
          <CostExplanation />
        </Section>
        <Section id="about" header="Our Founders" variant="accent">
          <Founders />
        </Section>
        <Section
          id="faqs"
          header="FAQs"
          subheading={
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
          subheading={
            <>
              We are always working to improve PCIT Tracker. <br /> Here are the latest updates.
            </>
          }
        >
          <ReleaseNotes hideHeader />
        </Section>
        <Section id="news" variant="default">
          <News />
        </Section>
        <Section id="contact" header="Contact Us" variant="primary" subheading="Anything else you'd like to know?">
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
