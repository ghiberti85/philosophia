import { Header } from '@/components/Header';
import { dict } from '@/data/dictionary';
import { isLocale, t, type Locale } from '@/lib/i18n';

/**
 * Layout for the influence map: centered container plus footer. The home
 * page lives outside this group so its one-page dashboard can use the full
 * viewport.
 */
export default async function ContentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  return (
    <>
      <Header locale={locale} showBack />
      <main className="mx-auto max-w-6xl px-4 pb-24">{children}</main>
      <footer className="border-t border-gold-500/20 py-8 text-center text-sm opacity-70">
        <p>
          Φ {t(dict.appName, locale)} · {t(dict.footerNote, locale)}
        </p>
      </footer>
    </>
  );
}
