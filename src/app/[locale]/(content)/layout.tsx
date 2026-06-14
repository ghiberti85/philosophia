import { Header } from '@/components/Header';
import { dict } from '@/data/dictionary';
import { isLocale, t, type Locale } from '@/lib/i18n';

/**
 * Layout for the inner content pages (schools, philosophers, quizzes):
 * centered container plus footer. The home page lives outside this group
 * so its one-page dashboard can use the full viewport.
 */
export default function ContentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  return (
    <>
      <Header locale={locale} />
      <main className="mx-auto max-w-6xl px-4 pb-24">{children}</main>
      <footer className="border-t border-gold-500/20 py-8 text-center text-sm opacity-70">
        <p>
          Φ {t(dict.appName, locale)} · {t(dict.footerNote, locale)}
        </p>
      </footer>
    </>
  );
}
