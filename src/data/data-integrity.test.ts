import { describe, expect, it } from 'vitest';
import { LOCALES } from '@/lib/i18n';
import { dict } from './dictionary';
import { philosophers } from './philosophers';
import { quizQuestions } from './quizzes';
import { schools } from './schools';

/**
 * Content integrity suite: guarantees that every piece of content is fully
 * translated and that cross-references between schools, philosophers and
 * quizzes never dangle.
 */

const philosopherSlugs = new Set(philosophers.map((p) => p.slug));
const schoolSlugs = new Set(schools.map((s) => s.slug));

describe('dictionary', () => {
  it('has every UI string translated into every locale', () => {
    for (const [key, value] of Object.entries(dict)) {
      for (const locale of LOCALES) {
        expect(value[locale], `dict.${key}.${locale}`).toBeTruthy();
      }
    }
  });
});

describe('schools', () => {
  it('has unique slugs', () => {
    expect(schoolSlugs.size).toBe(schools.length);
  });

  it('only references existing philosophers', () => {
    for (const school of schools) {
      for (const slug of school.philosopherSlugs) {
        expect(philosopherSlugs.has(slug), `${school.slug} → ${slug}`).toBe(true);
      }
    }
  });

  it('is fully translated', () => {
    for (const school of schools) {
      for (const locale of LOCALES) {
        expect(school.name[locale]).toBeTruthy();
        expect(school.description[locale]).toBeTruthy();
        expect(school.coreIdeas[locale].length).toBeGreaterThan(0);
      }
    }
  });
});

describe('philosophers', () => {
  it('has unique slugs', () => {
    expect(philosopherSlugs.size).toBe(philosophers.length);
  });

  it('belongs to existing schools, and every school lists it back', () => {
    for (const p of philosophers) {
      expect(p.schoolSlugs.length).toBeGreaterThan(0);
      for (const slug of p.schoolSlugs) {
        expect(schoolSlugs.has(slug), `${p.slug} → ${slug}`).toBe(true);
        const school = schools.find((s) => s.slug === slug)!;
        expect(school.philosopherSlugs, `${slug} should list ${p.slug}`).toContain(p.slug);
      }
    }
  });

  it('has complete, translated content sections', () => {
    for (const p of philosophers) {
      for (const locale of LOCALES) {
        expect(p.biography[locale].length, `${p.slug} biography ${locale}`).toBeGreaterThan(0);
        expect(p.contributions[locale].length).toBeGreaterThan(0);
        expect(p.traits[locale].length).toBeGreaterThan(0);
        expect(p.facts[locale].length).toBeGreaterThan(0);
      }
      expect(p.quotes.length, `${p.slug} quotes`).toBeGreaterThan(0);
      for (const quote of p.quotes) {
        for (const locale of LOCALES) expect(quote.text[locale]).toBeTruthy();
      }
    }
  });

  it('has a valid bust configuration', () => {
    for (const p of philosophers) {
      expect(p.bust.marble).toMatch(/^#[0-9a-f]{6}$/i);
      expect(p.bust.pedestal).toMatch(/^#[0-9a-f]{6}$/i);
      for (const v of [p.bust.headWidth, p.bust.beard, p.bust.hair]) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(1);
      }
    }
  });
});

describe('quiz questions', () => {
  it('has unique ids', () => {
    const ids = new Set(quizQuestions.map((q) => q.id));
    expect(ids.size).toBe(quizQuestions.length);
  });

  it('references existing philosophers, and every philosopher has a pool', () => {
    const covered = new Set(quizQuestions.map((q) => q.philosopherSlug));
    for (const q of quizQuestions) {
      expect(philosopherSlugs.has(q.philosopherSlug), q.id).toBe(true);
    }
    for (const slug of philosopherSlugs) {
      expect(covered.has(slug), `no quiz questions for ${slug}`).toBe(true);
    }
  });

  it('has exactly four options per locale, all distinct, in every locale', () => {
    for (const q of quizQuestions) {
      for (const locale of LOCALES) {
        const options = q.options[locale];
        expect(options, `${q.id} options ${locale}`).toHaveLength(4);
        expect(new Set(options).size, `${q.id} duplicate options in ${locale}`).toBe(4);
        expect(q.prompt[locale]).toBeTruthy();
        expect(q.explanation[locale]).toBeTruthy();
      }
    }
  });
});
