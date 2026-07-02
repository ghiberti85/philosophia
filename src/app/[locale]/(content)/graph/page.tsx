import type { Metadata } from 'next';
import Link from 'next/link';
import { InfluenceGraph } from '@/components/graph/InfluenceGraph';
import { SectionHeading } from '@/components/SectionHeading';
import { dict } from '@/data/dictionary';
import { philosophers } from '@/data/philosophers';
import { buildInfluenceGraph, influencedList } from '@/lib/influence-graph';
import { getPhilosopher } from '@/data/philosophers';
import { t, type Locale } from '@/lib/i18n';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return {
    title: t(dict.influenceMap, params.locale),
    description: t(dict.influenceMapSubtitle, params.locale),
  };
}

export default function GraphPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const { nodes, links } = buildInfluenceGraph();

  return (
    <div className="space-y-10 pt-8 sm:space-y-14 sm:pt-12">
      <header className="space-y-3 text-center">
        <SectionHeading>{t(dict.influenceMap, locale)}</SectionHeading>
        <p className="mx-auto max-w-2xl opacity-80">{t(dict.influenceMapSubtitle, locale)}</p>
      </header>

      <InfluenceGraph nodes={nodes} links={links} locale={locale} />

      {/* Accessible / crawlable mirror of the graph: every relation as links. */}
      <section className="space-y-6">
        <SectionHeading>{t(dict.lineageIndex, locale)}</SectionHeading>
        <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {philosophers.map((p) => {
            const heirs = influencedList(p.slug);
            return (
              <li
                key={p.slug}
                className="rounded-xl border border-gold-500/20 bg-white/50 p-4 text-sm shadow-card dark:bg-midnight-800/50"
              >
                <Link
                  href={`/${locale}/philosophers/${p.slug}`}
                  className="font-display text-base hover:text-gold-600 dark:hover:text-gold-300"
                >
                  {t(p.name, locale)}
                </Link>
                <dl className="mt-2 space-y-1 text-xs">
                  <div>
                    <dt className="inline uppercase tracking-wider opacity-50">
                      {t(dict.influencedByLabel, locale)}:{' '}
                    </dt>
                    <dd className="inline">
                      {p.influencedBy.length > 0 ? (
                        p.influencedBy.map((slug, i) => {
                          const other = getPhilosopher(slug);
                          if (!other) return null;
                          return (
                            <span key={slug}>
                              {i > 0 && ', '}
                              <Link
                                href={`/${locale}/philosophers/${slug}`}
                                className="underline decoration-gold-500/40 underline-offset-2 hover:text-gold-600"
                              >
                                {t(other.name, locale)}
                              </Link>
                            </span>
                          );
                        })
                      ) : (
                        <span className="opacity-60">{t(dict.noInfluences, locale)}</span>
                      )}
                    </dd>
                  </div>
                  {heirs.length > 0 && (
                    <div>
                      <dt className="inline uppercase tracking-wider opacity-50">
                        {t(dict.influencedLabel, locale)}:{' '}
                      </dt>
                      <dd className="inline">
                        {heirs.map((other, i) => (
                          <span key={other.slug}>
                            {i > 0 && ', '}
                            <Link
                              href={`/${locale}/philosophers/${other.slug}`}
                              className="underline decoration-gold-500/40 underline-offset-2 hover:text-gold-600"
                            >
                              {t(other.name, locale)}
                            </Link>
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
