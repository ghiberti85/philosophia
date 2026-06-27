import type { Metadata } from 'next';
import { Cormorant_Garamond, JetBrains_Mono, Playfair_Display, Source_Sans_3 } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { Providers } from '@/components/Providers';
import { dict } from '@/data/dictionary';
import { isLocale, LOCALES, LOCALE_HTML_LANG, t, type Locale } from '@/lib/i18n';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '700'],
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  return {
    title: {
      default: `${t(dict.appName, locale)} — ${t(dict.tagline, locale)}`,
      template: `%s — ${t(dict.appName, locale)}`,
    },
    description: t(dict.heroSubtitle, locale),
    manifest: '/manifest.json',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: t(dict.appName, locale),
    },
    formatDetection: {
      telephone: false,
    },
    icons: {
      icon: '/icon-192.png',
      apple: '/icon-180.png',
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  return (
    <html
      lang={LOCALE_HTML_LANG[locale]}
      className={`${playfair.variable} ${cormorant.variable} ${jetbrainsMono.variable} ${sourceSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#faf7f2" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1a1208" media="(prefers-color-scheme: dark)" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <link rel="apple-touch-icon" href="/icon-180.png" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
