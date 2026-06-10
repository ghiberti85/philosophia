import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { Header } from '@/components/Header';
import { Providers } from '@/components/Providers';
import { dict } from '@/data/dictionary';
import { isLocale, LOCALES, LOCALE_HTML_LANG, t, type Locale } from '@/lib/i18n';

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
    <html lang={LOCALE_HTML_LANG[locale]} suppressHydrationWarning>
      <body>
        <Providers>
          <Header locale={locale} />
          <main className="mx-auto max-w-6xl px-4 pb-24">{children}</main>
          <footer className="border-t border-gold-500/20 py-8 text-center text-sm opacity-70">
            <p>Φ {t(dict.appName, locale)} · {t(dict.footerNote, locale)}</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
