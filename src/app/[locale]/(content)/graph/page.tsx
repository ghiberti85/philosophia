import type { Metadata } from 'next';
import { InfluenceGraph } from '@/components/graph/InfluenceGraph';
import { SectionHeading } from '@/components/SectionHeading';
import { dict } from '@/data/dictionary';
import { buildInfluenceGraph } from '@/lib/influence-graph';
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
        <SectionHeading as="h1">{t(dict.influenceMap, locale)}</SectionHeading>
        <p className="mx-auto max-w-2xl opacity-80">{t(dict.influenceMapSubtitle, locale)}</p>
      </header>

      <InfluenceGraph nodes={nodes} links={links} locale={locale} />
    </div>
  );
}
