import type { Localized } from '@/lib/i18n';

/** A school / current of philosophical thought (e.g. Stoicism). */
export interface School {
  slug: string;
  name: Localized;
  period: Localized;
  /** Short tagline shown on cards. */
  tagline: Localized;
  /** Longer description shown on the school page. */
  description: Localized;
  /** Core ideas of the school. */
  coreIdeas: Localized<string[]>;
  /** Slugs of philosophers associated with this school. */
  philosopherSlugs: string[];
  /** Accent color used by the isometric illustration / cards. */
  accent: string;
  /** Which isometric scene to render for the school. */
  scene: 'agora' | 'academy' | 'lyceum' | 'stoa' | 'observatory' | 'cafe' | 'library';
  /** Optional pre-rendered isometric city image (public path); preferred over the procedural scene. */
  cityImage?: string;
  /** Key works / bibliography for this school. */
  keyWorks?: KeyWork[];
}

/** A key work / bibliographic reference. */
export interface KeyWork {
  title: Localized;
  author: Localized;
  year: string;
  note?: Localized;
}

/** A single notable quote with attribution context. */
export interface Quote {
  text: Localized;
  source?: Localized;
}

export interface Philosopher {
  slug: string;
  name: Localized;
  /** Years of birth/death, already formatted (e.g. "470–399 BC"). */
  years: Localized;
  birthplace: Localized;
  schoolSlugs: string[];
  /**
   * Slugs of philosophers (within this encyclopedia) whose thought shaped this
   * one — teachers, intellectual ancestors, or figures engaged with critically.
   * Empty for thinkers with no predecessor in the collection (e.g. Socrates).
   * Powers the influence graph at /graph.
   */
  influencedBy: string[];
  /** Epithet shown under the name (e.g. "The Father of Western Philosophy"). */
  epithet: Localized;
  /** Short biography, one paragraph per array entry. */
  biography: Localized<string[]>;
  /** Main contributions to philosophy. */
  contributions: Localized<string[]>;
  quotes: Quote[];
  /** Personality / intellectual traits. */
  traits: Localized<string[]>;
  /** Striking facts about their life. */
  facts: Localized<string[]>;
  /** AI-generated figurine image (public path) in the diorama art style. */
  figureImage: string;
}

/** One multiple-choice quiz question. */
export interface QuizQuestion {
  id: string;
  philosopherSlug: string;
  prompt: Localized;
  /** Exactly four options; the first one is the correct answer (shuffled at runtime). */
  options: Localized<string[]>;
  /** Shown after answering. */
  explanation: Localized;
}

/** A historical event concurrent with a school of thought. */
export interface HistoricalEvent {
  slug: string;
  name: Localized;
  description: Localized;
  year: string;
  category: 'war' | 'revolution' | 'discovery' | 'art' | 'construction' | 'disaster';
  /** Slugs of schools this event relates to. */
  schoolSlugs: string[];
  /** Significance 1–5 for visual weighting. */
  significance: 1 | 2 | 3 | 4 | 5;
  /** Optional deep-dive context shown in modal. */
  context?: Localized;
  /** Optional icon name. */
  iconName?: 'war' | 'book' | 'bolt' | 'landmark';
}
