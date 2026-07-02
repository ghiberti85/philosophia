import { philosophers } from '@/data/philosophers';
import { getSchool } from '@/data/schools';
import type { Philosopher } from '@/data/types';

/**
 * Graph model for the philosopher influence map (/graph).
 *
 * Nodes are the 23 philosophers, coloured by the accent of their first
 * school; directed links point from influencer to influenced. Everything is
 * derived from `Philosopher.influencedBy`, so content edits automatically
 * reshape the graph.
 */

export interface GraphNode {
  slug: string;
  philosopher: Philosopher;
  /** Accent colour of the philosopher's first school. */
  accent: string;
  /** Approximate birth year (negative = BC) used to seed the layout. */
  birthYear: number;
  /** 0..1 chronological position among all nodes (0 = earliest). */
  chrono: number;
  /** Total degree (in + out), used for node sizing. */
  degree: number;
}

export interface GraphLink {
  /** Slug of the influencer. */
  source: string;
  /** Slug of the influenced. */
  target: string;
}

/**
 * Approximate birth years (negative = BC). Kept here rather than on the data
 * model because they only matter for layout seeding; the display string in
 * `Philosopher.years` remains the source of truth for readers.
 */
const BIRTH_YEARS: Record<string, number> = {
  socrates: -470,
  antisthenes: -446,
  aristippus: -435,
  plato: -428,
  aristotle: -384,
  theophrastus: -371,
  'zeno-of-citium': -334,
  seneca: -4,
  epictetus: 50,
  'marcus-aurelius': 121,
  plotinus: 204,
  hypatia: 360,
  averroes: 1126,
  descartes: 1596,
  spinoza: 1632,
  leibniz: 1646,
  kant: 1724,
  fichte: 1762,
  hegel: 1770,
  kierkegaard: 1813,
  nietzsche: 1844,
  sartre: 1905,
  'simone-de-beauvoir': 1908,
};

const FALLBACK_ACCENT = '#c2922f';

export function buildInfluenceGraph(): { nodes: GraphNode[]; links: GraphLink[] } {
  const slugs = new Set(philosophers.map((p) => p.slug));

  const links: GraphLink[] = philosophers.flatMap((p) =>
    p.influencedBy
      .filter((source) => slugs.has(source))
      .map((source) => ({ source, target: p.slug })),
  );

  const degree = new Map<string, number>();
  for (const { source, target } of links) {
    degree.set(source, (degree.get(source) ?? 0) + 1);
    degree.set(target, (degree.get(target) ?? 0) + 1);
  }

  const byBirth = [...philosophers].sort(
    (a, b) => (BIRTH_YEARS[a.slug] ?? 0) - (BIRTH_YEARS[b.slug] ?? 0),
  );
  const chronoRank = new Map(byBirth.map((p, i) => [p.slug, i]));
  const maxRank = Math.max(1, byBirth.length - 1);

  const nodes: GraphNode[] = philosophers.map((p) => ({
    slug: p.slug,
    philosopher: p,
    accent: getSchool(p.schoolSlugs[0])?.accent ?? FALLBACK_ACCENT,
    birthYear: BIRTH_YEARS[p.slug] ?? 0,
    chrono: (chronoRank.get(p.slug) ?? 0) / maxRank,
    degree: degree.get(p.slug) ?? 0,
  }));

  return { nodes, links };
}

/**
 * Every node reachable from `slug` by walking influence links backwards
 * (intellectual ancestors) and forwards (heirs), including `slug` itself.
 * This is the set highlighted when a node is hovered or selected.
 */
export function lineageOf(slug: string, links: GraphLink[]): Set<string> {
  const up = new Map<string, string[]>();
  const down = new Map<string, string[]>();
  for (const { source, target } of links) {
    up.set(target, [...(up.get(target) ?? []), source]);
    down.set(source, [...(down.get(source) ?? []), target]);
  }

  const lineage = new Set<string>([slug]);
  const walk = (from: string, edges: Map<string, string[]>) => {
    const queue = [from];
    const seen = new Set<string>([from]);
    while (queue.length > 0) {
      const current = queue.pop()!;
      for (const next of edges.get(current) ?? []) {
        if (!seen.has(next)) {
          seen.add(next);
          lineage.add(next);
          queue.push(next);
        }
      }
    }
  };
  walk(slug, up);
  walk(slug, down);
  return lineage;
}

/** Direct heirs of a philosopher (philosophers listing them in `influencedBy`). */
export function influencedList(slug: string): Philosopher[] {
  return philosophers.filter((p) => p.influencedBy.includes(slug));
}
