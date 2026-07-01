import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { useTypewriter, useCountUp } from './hooks';

// framer-motion's useReducedMotion returns false by default in jsdom
vi.mock('framer-motion', () => ({
  useReducedMotion: () => false,
}));

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts empty and types one char at a time', () => {
    const { result } = renderHook(() => useTypewriter('Hi', 30));
    expect(result.current.display).toBe('');
    expect(result.current.done).toBe(false);

    act(() => {
      vi.advanceTimersByTime(30);
    });
    expect(result.current.display).toBe('H');

    act(() => {
      vi.advanceTimersByTime(30);
    });
    expect(result.current.display).toBe('Hi');
    expect(result.current.done).toBe(true);
  });

  it('restarts when text changes', () => {
    const { result, rerender } = renderHook(
      ({ text }: { text: string }) => useTypewriter(text, 30),
      { initialProps: { text: 'Hi' } },
    );
    act(() => {
      vi.advanceTimersByTime(60);
    });
    expect(result.current.done).toBe(true);

    rerender({ text: 'Bye' });
    expect(result.current.display).toBe('');
    expect(result.current.done).toBe(false);

    act(() => {
      vi.advanceTimersByTime(90);
    });
    expect(result.current.display).toBe('Bye');
    expect(result.current.done).toBe(true);
  });

  it('cleans up interval on unmount', () => {
    const clearSpy = vi.spyOn(globalThis, 'clearInterval');
    const { unmount } = renderHook(() => useTypewriter('Hello', 30));
    unmount();
    expect(clearSpy).toHaveBeenCalled();
  });
});

describe('useCountUp', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('starts at 0', () => {
    const { result } = renderHook(() => useCountUp(5, 300));
    // Before any rAF fires, value is still 0
    expect(result.current).toBe(0);
  });

  it('returns 0 immediately when target is 0', () => {
    const { result } = renderHook(() => useCountUp(0, 300));
    expect(result.current).toBe(0);
  });

  it('reaches target after animation completes', async () => {
    // Stub rAF to synchronously fire with a timestamp past the duration
    let rafId = 0;
    vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
      rafId++;
      // Jump to well past the duration so eased value reaches 1
      Promise.resolve().then(() => cb(performance.now() + 10000));
      return rafId;
    });

    const { result } = renderHook(() => useCountUp(5, 300));

    // Flush the microtask queue so the stubbed rAF fires
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(result.current).toBe(5);
  });

  it('resets to 0 when target changes', async () => {
    let fired = false;
    vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
      if (!fired) {
        fired = true;
        Promise.resolve().then(() => cb(performance.now() + 10000));
      }
      return 1;
    });

    const { result, rerender } = renderHook(
      ({ target }: { target: number }) => useCountUp(target, 300),
      { initialProps: { target: 3 } },
    );

    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(result.current).toBe(3);

    rerender({ target: 7 });
    // immediately resets before next rAF
    expect(result.current).toBe(0);
  });
});
