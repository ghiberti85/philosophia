import { describe, expect, it } from 'vitest';
import { switchLocalePath } from './LocaleSwitcher';

describe('switchLocalePath', () => {
  it('swaps the locale segment and keeps the rest of the path', () => {
    expect(switchLocalePath('/en/philosophers/socrates', 'pt')).toBe('/pt/philosophers/socrates');
    expect(switchLocalePath('/pt/quiz/kant', 'en')).toBe('/en/quiz/kant');
  });

  it('handles the locale root', () => {
    expect(switchLocalePath('/en', 'pt')).toBe('/pt');
  });
});
