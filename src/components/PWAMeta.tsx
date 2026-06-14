export function PWAMeta() {
  return (
    <>
      <meta name="theme-color" content="#faf7f2" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#1a1208" media="(prefers-color-scheme: dark)" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Philosophia" />
      <link rel="apple-touch-icon" href="/icon-180.png" />
      <link rel="icon" type="image/png" href="/icon-192.png" />
      <link rel="manifest" href="/manifest.json" />
    </>
  );
}
