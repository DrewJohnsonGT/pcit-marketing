import { ThemeToggle } from '../components/ThemeToggle';
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
import { Button } from '~/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/DropdownMenu';
import { ScrollArea, ScrollBar } from '~/components/ui/ScrollArea';
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

const Heading = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2 className={cn(`mb-8 text-center text-5xl font-bold tracking-tight text-secondary select-none`, className)}>
    {children}
  </h2>
);

const Section = ({
  children,
  className,
  id,
  subheader,
  header,
}: {
  children: React.ReactNode;
  className?: string;
  header?: string;
  id?: string;
  subheader?: React.ReactNode;
}) => (
  <section
    id={id}
    className={cn(
      `
        flex w-full flex-col items-center px-4 py-6
        md:px-6 md:py-12
        lg:py-20
      `,
      className,
    )}
  >
    {header && <Heading className={cn(subheader && 'mb-4')}>{header}</Heading>}
    {subheader && <p className="mb-8 text-center text-lg text-muted-foreground">{subheader}</p>}
    {children}
  </section>
);

export default function MarketingPage() {
  return (
    <div className="bg-background">
      <header className={`fixed inset-x-0 top-0 z-50 h-14 w-full flex-1 items-center bg-transparent p-2`}>
        <div
          className={`
            mx-auto flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-background/20 px-1
            py-1 pl-4 backdrop-blur-md
          `}
        >
          <Link href="#" aria-label="Home" prefetch={false}>
            <span className="text-2xl leading-none font-bold text-primary">{APP_NAME}</span>
          </Link>
          <nav
            className={`
              mx-auto hidden flex-1 items-center justify-center gap-2
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
          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <a href="/signin" aria-label="Sign In">
              <Button aria-label="Sign In">Sign In</Button>
            </a>
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
        </div>
      </header>
      <ScrollArea className="h-dvh">
        <main className="flex-1">
          <Section className="mt-6">
            <Image
              src={IMAGES.logoNoText.src}
              alt="PCIT Tracker"
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
            <a href="/signup" className="z-10 mt-4" aria-label="Sign up for PCIT Tracker">
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
            <div className="mt-8" />
            <HeroVideoDialog
              videoSrc="https://www.youtube.com/embed/Nk6xOFjQFf0?si=9mNsawdpcBIRkR9w"
              thumbnailSrc="https://img.youtube.com/vi/Nk6xOFjQFf0/maxresdefault.jpg"
              thumbnailAlt="PCIT Tracker Introduction"
              className="mt-8 max-w-3xl"
            />
          </Section>
          <Section id="features" header="Features">
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
          >
            <PricingPlans />
          </Section>
          <Section id="cost-explanation" className="mx-auto max-w-3xl">
            <H3 className="mb-4 text-2xl">Why we charge for PCIT Tracker</H3>
            <CostExplanation />
          </Section>
          <Section id="about" header="Our Founders">
            <Founders />
          </Section>
          <Section
            id="faqs"
            header="FAQs"
            subheader={
              <>
                Got questions? We&apos;ve got answers. <br /> If you don&apos;t find what you&apos;re looking for,
                please reach out to us.
              </>
            }
          >
            <FAQs defaultHeadersOpen={['General Questions']} />
          </Section>
          <Section
            id="release-notes"
            header="Release Notes"
            subheader={
              <>
                We are always working to improve PCIT Tracker. <br /> Here are the latest updates.
              </>
            }
          >
            <ReleaseNotes hideHeader />
          </Section>
          <Section id="news">
            <News />
          </Section>
          <Section id="contact" header="Contact Us">
            <ContactForm />
          </Section>
          <Section>
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
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
