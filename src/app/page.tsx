import Image from 'next/image';
import Link from 'next/link';
import { ContactForm } from '~/components/ContactForm';
import { CostExplanation } from '~/components/CostExplanation';
import { FAQs } from '~/components/FAQs';
import { FeatureCards } from '~/components/FeatureCards';
import { Founders } from '~/components/Founders';
import { HeroVideoDialog } from '~/components/HeroVideoDialog';
import { News } from '~/components/News';
import { PricingPlans } from '~/components/Pricing';
import { ProductCards } from '~/components/ProductCards';
import { ReleaseNotes } from '~/components/ReleaseNotes';
import { SocialShareButtons } from '~/components/SocialShareButtons';
import { Testimonials } from '~/components/Testimonials';
import { Button } from '~/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/DropdownMenu';
import { A, H2, Underline } from '~/components/ui/Typography';
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

enum SectionIds {
  About = 'about',
  Contact = 'contact',
  CostExplanation = 'cost-explanation',
  FAQs = 'faqs',
  Features = 'features',
  News = 'news',
  Pricing = 'pricing',
  ReleaseNotes = 'release-notes',
  Testimonials = 'testimonials',
}

const HEADER_LINKS = [
  { href: SectionIds.Features, label: 'Features' },
  { href: SectionIds.FAQs, label: 'FAQs' },
  { href: SectionIds.About, label: 'About Us' },
  { href: SectionIds.Contact, label: 'Contact' },
];

const FOOTER_LINKS = [
  { href: TERMS_OF_SERVICE_URL, label: 'Terms of Service' },
  { href: PRIVACY_POLICY_URL, label: 'Privacy Policy' },
  { href: RESPONSIBLE_USE_URL, label: 'Responsible Use Policy' },
];

type SectionVariant = 'default' | 'primary' | 'secondary';

const getTextColor = (variant: SectionVariant) => {
  switch (variant) {
    case 'primary':
      return 'text-primary-foreground';
    case 'secondary':
      return 'text-secondary-foreground';
    default:
      return 'text-secondary';
  }
};

const getSectionStyle = (variant: SectionVariant) => {
  switch (variant) {
    case 'primary':
      return 'bg-primary-dark text-primary-foreground';
    case 'secondary':
      return 'bg-secondary text-secondary-foreground';
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
  variant?: SectionVariant;
}) => {
  return (
    <h2
      className={cn(
        `
          mb-8 text-center text-4xl font-medium tracking-normal select-none
          sm:text-5xl
        `,
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
  variant?: SectionVariant;
}) => {
  return (
    <p
      className={cn(
        `
          mb-8 text-center text-lg
          sm:text-xl
        `,
        getSectionStyle(variant),
        className,
      )}
    >
      {children}
    </p>
  );
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
  variant?: SectionVariant;
}) => {
  return (
    <section
      id={id}
      className={cn(
        `
          relative flex w-full max-w-full scroll-m-20 flex-col items-center px-4 py-6 transition-colors duration-500
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
    <>
      <div
        className={`
          flex h-auto max-w-full items-center justify-center gap-1 bg-primary-light p-0.5 text-center text-foreground
        `}
      >
        <ICONS.Info
          className={`
            hidden size-4
            sm:block
          `}
          aria-hidden="true"
        />{' '}
        <span className="break-words">
          Interested in research, partnerships, or a premium trial?{' '}
          <A
            href="/#contact"
            className={`
              inline text-secondary underline
              hover:text-primary
            `}
          >
            Contact us!
          </A>
        </span>
      </div>
      <header
        className={`
          sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-background p-1
          sm:h-20 sm:p-2 sm:px-4
        `}
      >
        <nav
          className={`
            hidden flex-1 items-center gap-2
            md:flex
          `}
        >
          {HEADER_LINKS.map((link) => (
            <Link key={link.href} href={`#${link.href}`} aria-label={`Scroll to ${link.label}`} prefetch={false}>
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
        <Link
          href="/"
          aria-label="Home"
          prefetch={false}
          className={`
            flex items-center gap-4
            sm:flex-1
            md:justify-center
          `}
        >
          <Image src={IMAGES.logo.src} alt={APP_NAME} width={64} height={64} />
          <span
            className={`
              hidden text-3xl font-semibold tracking-wider text-primary-dark uppercase
              lg:block
            `}
          >
            {APP_NAME}
          </span>
        </Link>
        <div
          className={`
            flex flex-1 items-center justify-end gap-2
            sm:gap-6
          `}
        >
          <Link
            href="/signin"
            aria-label="Sign in"
            className={`
              text-lg underline decoration-border decoration-3 underline-offset-6
              hover:text-secondary hover:decoration-secondary
            `}
            prefetch={false}
          >
            Log in
          </Link>
          <Link href="/signup" aria-label="Sign Up" prefetch={false}>
            <Button
              aria-label="Sign Up"
              className={`
                rounded-full p-4
                sm:p-6
              `}
            >
              Get Started
            </Button>
          </Link>
          <div className="md:hidden">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Menu">
                  <ICONS.Menu className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {HEADER_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={`#${link.href}`}
                    className={`text-sm font-medium underline-offset-4`}
                    prefetch={false}
                  >
                    <DropdownMenuItem>{link.label}</DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main>
        <Section variant="primary">
          <div
            className={`
              relative flex w-full flex-col items-center
              lg:min-h-[500px]
            `}
          >
            <div className="z-10 flex flex-col items-center text-center">
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={IMAGES.pcitPractitioner.src}
                  alt="PCIT Practitioner illustration"
                  width={125}
                  height={125}
                  className={`
                    block
                    md:hidden
                  `}
                />
                <img
                  src={IMAGES.family.src}
                  alt="Family illustration"
                  width={100}
                  height={100}
                  className={`
                    block
                    md:hidden
                  `}
                />
              </div>
              <div
                className={`
                  text-3xl select-none
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl/none
                `}
              >
                <span className="text-primary-light">Minimize</span> Paperwork
                <br />
                <span className="text-primary-light">Maximize</span> Productivity
              </div>
              <ul
                className={`
                  z-10 mt-2 flex max-w-lg flex-col gap-1 p-4 text-lg font-medium text-inherit
                  sm:gap-3 sm:text-2xl
                `}
              >
                <li className="flex items-center gap-2">
                  <ICONS.Star className="size-6 text-primary-light" aria-hidden="true" />
                  <span>All in one PCIT Platform</span>
                </li>
                <li className="flex items-center gap-2">
                  <ICONS.History className="size-6 text-primary-light" aria-hidden="true" />
                  <span>Save hours every week</span>
                </li>
                <li className="flex items-center gap-2">
                  <ICONS.Data className="size-6 text-primary-light" aria-hidden="true" />
                  <span>Get instant data insights</span>
                </li>
              </ul>
              <Link href="/signup" className="z-10 mt-4" aria-label={`Sign up for ${APP_NAME}`} prefetch={false}>
                <Button
                  size="lg"
                  className={`
                    w-[250px] border-2 bg-secondary/80 p-4 text-lg font-medium text-secondary-foreground
                    hover:text-secondary-foreground
                    sm:p-8 sm:text-2xl
                  `}
                >
                  Get Started
                </Button>
              </Link>
            </div>

            <div
              className={`
                absolute inset-0 hidden items-center justify-center
                lg:flex
              `}
              aria-hidden="true"
            >
              <div className="relative h-full w-full">
                <img
                  src={IMAGES.family.src}
                  alt="Family illustration"
                  width={300}
                  height={300}
                  className="absolute right-4 bottom-0"
                />
                <img
                  src={IMAGES.pcitPractitioner.src}
                  alt="PCIT Practitioner illustration"
                  width={300}
                  height={300}
                  className="absolute bottom-4 left-4"
                />
              </div>
            </div>
          </div>
        </Section>
        <Section>
          <HeroVideoDialog
            videoSrc="https://www.youtube.com/embed/Nk6xOFjQFf0?si=9mNsawdpcBIRkR9w"
            thumbnail={IMAGES.welcomeThumbnail}
            thumbnailAlt="PCIT Tracker Introduction"
            className="max-w-3xl"
            priority
          />
        </Section>
        <Section
          id={SectionIds.Testimonials}
          header="What Our Users Say"
          subheading="Discover how PCIT Tracker is making a difference in therapy practices and families' lives."
          variant="primary"
        >
          <Testimonials />
        </Section>
        <Section
          id={SectionIds.Features}
          header="Features"
          subheading={
            <>
              PCIT Tracker serves as a comprehensive platform for therapists to track progress more seamlessly than ever
              before!
            </>
          }
          variant="default"
        >
          <FeatureCards />
          <H2>Overview of Pages</H2>
          <HeroVideoDialog
            videoSrc="https://www.youtube.com/embed/hS10efyP980?si=lV0uhT-EqBcn8_HM"
            thumbnail={IMAGES.overviewThumbnail}
            thumbnailAlt="PCIT Tracker Overview of Pages"
            className="mt-8 max-w-3xl"
          />
          <ProductCards />
        </Section>
        <Section
          id={SectionIds.Pricing}
          variant="primary"
          header="Pricing Plans"
          subheading={
            <>
              <Underline>Free to try as long as you want!</Underline>
              <br />
              Choose the plan that best fits your needs. <br /> <Underline>Cancel anytime</Underline>, no questions
              asked.
            </>
          }
        >
          <PricingPlans />
        </Section>
        <Section variant="default" id={SectionIds.CostExplanation}>
          <CostExplanation />
        </Section>
        <Section id={SectionIds.About} header="Our Founders">
          <Founders />
        </Section>
        <Section
          id={SectionIds.FAQs}
          header="FAQs"
          subheading={
            <>
              Click below to read our answers to some of our users’ frequently asked questions.
              <br />
              Don&apos;t see your question? <A href="/#contact">Contact us</A> and we&apos;ll be happy to help.
            </>
          }
          variant="default"
        >
          <FAQs />
        </Section>
        <Section
          id={SectionIds.ReleaseNotes}
          header="Release Notes"
          subheading={
            <>
              We are always working to improve PCIT Tracker. <br /> Here are the latest updates.
            </>
          }
        >
          <ReleaseNotes />
        </Section>
        <Section id={SectionIds.News} variant="default">
          <News />
        </Section>
        <Section
          id={SectionIds.Contact}
          header="Contact Us"
          variant="primary"
          subheading="Anything else you'd like to know?"
        >
          <ContactForm />
        </Section>
        <Section>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Image src={IMAGES.logo.src} alt="PCIT Tracker" className="mx-auto shrink-0" width={150} height={150} />
              <Heading>Ready to Get Started?</Heading>
              <Subheading>Take your PCIT therapy to the next level.</Subheading>
            </div>
            <div className="flex w-full max-w-sm flex-col items-center gap-4">
              <div className="flex justify-center">
                <a href="/signup" aria-label="Sign up for PCIT Tracker">
                  <Button
                    size="lg"
                    className={`
                      w-[250px] bg-primary/80 text-primary-foreground
                      hover:text-primary-foreground
                    `}
                  >
                    Get Started
                  </Button>
                </a>
              </div>
              <p className="text-xs">
                By signing up, you agree to our{' '}
                <A href={TERMS_OF_SERVICE_URL} aria-label="Terms & Conditions">
                  Terms & Conditions
                </A>
              </p>
            </div>
          </div>

          <p className="mt-12 text-center">
            Questions? Email{' '}
            <A href={`mailto:${SUPPORT_EMAIL}`} aria-label="Email support">
              {SUPPORT_EMAIL}
            </A>
          </p>
        </Section>
        <footer
          className={`
            grid items-center gap-4 border-t bg-primary-dark p-2 text-primary-foreground
            sm:p-4 sm:py-8
            xl:grid-cols-3
          `}
        >
          <p
            className={`
              text-center text-sm
              xl:text-start
            `}
          >
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm">Share us on</p>
            <SocialShareButtons />
          </div>
          <nav
            className={`
              flex justify-center gap-2
              sm:gap-4
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
                className={`
                  text-center text-xs text-primary-foreground
                  hover:text-secondary-light
                  sm:text-sm
                `}
              >
                {link.label}
              </A>
            ))}
          </nav>
        </footer>
      </main>
    </>
  );
}
