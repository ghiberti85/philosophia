import type { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/i18n';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://philosophia.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return LOCALES.flatMap((locale) => [
    { url: `${BASE_URL}/${locale}`, lastModified: now },
    { url: `${BASE_URL}/${locale}/graph`, lastModified: now },
  ]);
}
