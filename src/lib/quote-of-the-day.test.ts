import { describe, expect, it } from 'vitest';
import { quoteOfTheDay } from './quote-of-the-day';

describe('quoteOfTheDay', () => {
  it('is deterministic for a given date', () => {
    const date = new Date('2026-06-10T12:00:00Z');
    expect(quoteOfTheDay(date)).toEqual(quoteOfTheDay(date));
  });

  it('rotates to a different quote on consecutive days', () => {
    const today = quoteOfTheDay(new Date('2026-06-10T12:00:00Z'));
    const tomorrow = quoteOfTheDay(new Date('2026-06-11T12:00:00Z'));
    expect(today.quote.text.en).not.toBe(tomorrow.quote.text.en);
  });

  it('always returns a quote with its philosopher', () => {
    const { quote, philosopher } = quoteOfTheDay(new Date(0));
    expect(quote.text.en).toBeTruthy();
    expect(philosopher.quotes).toContain(quote);
  });
});
