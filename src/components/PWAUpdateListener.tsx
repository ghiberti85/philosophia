'use client';

import { useEffect } from 'react';

/**
 * Reloads the page once when an updated service worker takes control, so
 * installed PWAs pick up new deploys on the next launch instead of serving
 * the previous version until the cache is cleared by hand.
 *
 * The service worker activates immediately (`skipWaiting` + `clientsClaim`
 * in src/sw.ts); this listener closes the last gap — the already-open page
 * still showing the old build.
 */
export function PWAUpdateListener() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    // No controller yet means this is the very first install — the page is
    // already the newest build, so a reload would only waste a paint.
    let hadController = Boolean(navigator.serviceWorker.controller);
    let reloaded = false;

    const onControllerChange = () => {
      if (!hadController) {
        hadController = true;
        return;
      }
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);
    return () =>
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
  }, []);

  return null;
}
