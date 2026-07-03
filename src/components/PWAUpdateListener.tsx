'use client';

import { useEffect } from 'react';

/**
 * Reloads the page once when an updated service worker takes control, so
 * installed PWAs pick up new deploys instead of serving the previous version
 * until the cache is cleared by hand.
 *
 * The service worker activates immediately (`skipWaiting` + `clientsClaim`
 * in src/sw.ts) — but only once the browser has actually fetched a new
 * sw.js and found it different. On mobile, a standalone/home-screen PWA is
 * usually *resumed* from the background rather than freshly navigated to,
 * so the browser's passive "check for a new SW on navigation" never fires
 * and `controllerchange` never fires either. This component closes that
 * gap by explicitly asking for an update check whenever the app regains
 * focus, in addition to once on mount.
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

    const checkForUpdate = () => {
      navigator.serviceWorker.getRegistration().then((registration) => {
        registration?.update().catch(() => {
          /* offline or transient network error — next check will retry */
        });
      });
    };

    // Once now, and every time the installed app comes back to the foreground.
    checkForUpdate();
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') checkForUpdate();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('focus', checkForUpdate);

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('focus', checkForUpdate);
    };
  }, []);

  return null;
}
