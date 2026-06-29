import type { MetadataRoute } from 'next';
import { philosophers } from '@/data/philosophers';
import { schools } from '@/data/schools';
import { LOCALES } from '@/lib/i18n';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://philosophia.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const localeRoots = LOCALES.flatMap((locale) => [
    { url: `${BASE_URL}/${locale}`, lastModified: now },
    { url: `${BASE_URL}/${locale}/schools`, lastModified: now },
    { url: `${BASE_URL}/${locale}/philosophers`, lastModified: now },
  ]);

  const schoolPages = LOCALES.flatMap((locale) =>
    schools.map((s) => ({
      url: `${BASE_URL}/${locale}/schools/${s.slug}`,
      lastModified: now,
    }))
  );

  const philosopherPages = LOCALES.flatMap((locale) =>
    philosophers.map((p) => ({
      url: `${BASE_URL}/${locale}/philosophers/${p.slug}`,
      lastModified: now,
    }))
  );

  return [...localeRoots, ...schoolPages, ...philosopherPages];
}
