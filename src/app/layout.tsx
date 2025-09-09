import { Analytics } from '@vercel/analytics/next';
import { type Metadata } from 'next';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Lato } from 'next/font/google';
import Head from 'next/head';
import { TooltipProvider } from '~/components/ui/Tooltip';
import { cn } from '~/utils/cn';
import { APP_DESCRIPTION, APP_KEYWORDS, APP_NAME } from '~/utils/constants';
import { IMAGES } from '~/utils/images';

import './globals.css';

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}/`,
  },
  appleWebApp: {
    startupImage: [{ url: IMAGES.logo.src }],
    title: APP_NAME,
  },
  authors: [
    {
      name: 'Cubic Insights LLC',
      url: 'https://cubic-insights.com',
    },
    {
      name: 'Drew Johnson',
      url: 'https://www.linkedin.com/in/drewjohnsongt/',
    },
    {
      name: 'Madeline DeShazer',
      url: 'https://www.linkedin.com/in/madeline-deshazer-228a2015b/',
    },
  ],
  creator: 'Cubic Insights LLC',
  description: APP_DESCRIPTION,
  keywords: APP_KEYWORDS,
  manifest: `${process.env.NEXT_PUBLIC_APP_URL}/manifest.json`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  openGraph: {
    description: APP_DESCRIPTION,
    images: [{ url: IMAGES.logo.src }],
    locale: 'en_US',
    siteName: APP_NAME,
    title: APP_NAME,
    type: 'website',
    url: process.env.NEXT_PUBLIC_APP_URL,
  },
  title: {
    default: `${APP_NAME} | Simplify Data for PCIT Practitioners`,
    template: `%s - ${APP_NAME}`,
  },
  twitter: {
    card: 'summary_large_image',
    description: APP_DESCRIPTION,
    images: [IMAGES.logo.src],
    title: APP_NAME,
  },
};

const font = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['400', '700'],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <Head>
        <meta name="apple-mobile-web-app-title" content="PCIT" />
      </Head>
      <body
        className={cn(
          'h-dvh antialiased',
          `
            ${font.className}
          `,
        )}
      >
        <NextThemesProvider attribute="class">
          <TooltipProvider>{children}</TooltipProvider>
        </NextThemesProvider>
        <Analytics />
      </body>
    </html>
  );
}
