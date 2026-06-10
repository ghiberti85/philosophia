import { describe, expect, it } from 'vitest';
import { mulberry32, sample, shuffle } from './random';

describe('shuffle', () => {
  it('returns a permutation with the same elements', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8];
    const result = shuffle(input, mulberry32(42));
    expect(result).toHaveLength(input.length);
    expect([...result].sort((a, b) => a - b)).toEqual(input);
  });

  it('does not mutate the input array', () => {
    const input = [1, 2, 3];
    const copy = [...input];
    shuffle(input, mulberry32(1));
    expect(input).toEqual(copy);
  });

  it('is deterministic for the same seed', () => {
    const input = ['a', 'b', 'c', 'd', 'e'];
    expect(shuffle(input, mulberry32(7))).toEqual(shuffle(input, mulberry32(7)));
  });

  it('produces different orders for different seeds', () => {
    const input = Array.from({ length: 20 }, (_, i) => i);
    expect(shuffle(input, mulberry32(1))).not.toEqual(shuffle(input, mulberry32(2)));
  });
});

describe('sample', () => {
  it('picks the requested number of distinct elements', () => {
    const input = Array.from({ length: 10 }, (_, i) => i);
    const result = sample(input, 5, mulberry32(3));
    expect(result).toHaveLength(5);
    expect(new Set(result).size).toBe(5);
    for (const item of result) expect(input).toContain(item);
  });

  it('throws when asking for more elements than available', () => {
    expect(() => sample([1, 2], 3)).toThrow(RangeError);
  });
});
