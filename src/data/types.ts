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
}

/** A single notable quote with attribution context. */
export interface Quote {
  text: Localized;
  source?: Localized;
}

export interface Philosopher {
  slug: string;
  name: string;
  /** Years of birth/death, already formatted (e.g. "470–399 BC"). */
  years: Localized;
  birthplace: Localized;
  schoolSlugs: string[];
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
  /** Configuration for the procedural 3D bust. */
  bust: BustConfig;
}

/** Stylized "animated character" look for the 3D bust. */
export interface BustLook {
  /** Skin tone, hex. */
  skin: string;
  /** Hair / beard / brow color, hex. */
  hair: string;
  /** Garment (toga / coat / blouse) color, hex. */
  cloth: string;
  /** Sash, collar or trim color, hex. */
  clothAccent: string;
  hairstyle: 'bald' | 'short' | 'curly' | 'long' | 'wig' | 'updo' | 'swept';
  beard: 'none' | 'trimmed' | 'full' | 'long' | 'curly' | 'goatee';
  mustache: 'none' | 'normal' | 'grand';
  /** Golden laurel wreath (emperors). */
  laurel?: boolean;
  /** Fabric headband (Beauvoir's signature turban). */
  headband?: boolean;
  /** Flat white collar / cravat for the moderns. */
  collar?: boolean;
}

/** Parameters that differentiate each philosopher's procedurally generated bust. */
export interface BustConfig {
  /** Marble tint, hex color. */
  marble: string;
  /** Pedestal accent color, hex. */
  pedestal: string;
  /** 0..1 — how wide the head is. */
  headWidth: number;
  /** 0..1 — beard length (0 = clean shaven). */
  beard: number;
  /** 0..1 — hair volume (0 = bald). */
  hair: number;
  /** Stylized character design; when present the bust renders as a toon character. */
  look?: BustLook;
  /** Optional path to a scanned GLB model in /public/models. When present it replaces the procedural bust. */
  modelPath?: string;
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
