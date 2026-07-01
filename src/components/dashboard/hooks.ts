'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Types each character of `text` at the given interval (ms/char).
 * Respects prefers-reduced-motion: jumps to the final text instantly.
 * Restarts whenever `text` changes (e.g. school switch).
 */
export function useTypewriter(text: string, speed = 28): { display: string; done: boolean } {
  const [display, setDisplay] = useState(text);
  const [done, setDone] = useState(true);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setDisplay(text);
      setDone(true);
      return;
    }
    setDisplay('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplay(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, prefersReduced]);

  return { display, done };
}

/**
 * Animates a numeric value from 0 to `target` over `duration` ms using
 * an ease-out cubic curve. Respects prefers-reduced-motion.
 */
export function useCountUp(target: number, duration = 700): number {
  const [value, setValue] = useState(0);
  const prefersReduced = useReducedMotion();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    if (prefersReduced || target === 0) {
      setValue(target);
      return;
    }

    setValue(0);
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, prefersReduced]);

  return value;
}
