import { ImageResponse } from 'next/og';
import { getPhilosopher, philosophers } from '@/data/philosophers';
import { getSchool } from '@/data/schools';
import { LOCALES, t, type Locale } from '@/lib/i18n';
import { OG_CONTENT_TYPE, OG_SIZE, OgFrame, ogFonts, ogStyles } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => philosophers.map((p) => ({ locale, slug: p.slug })));
}

export function generateImageMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const philosopher = getPhilosopher(params.slug);
  const name = philosopher ? t(philosopher.name, params.locale) : 'Philosophia';
  return [{ id: 'og', size: OG_SIZE, contentType: OG_CONTENT_TYPE, alt: name }];
}

export default async function Image({ params }: { params: { locale: Locale; slug: string } }) {
  const { locale, slug } = params;
  const philosopher = getPhilosopher(slug);
  const school = philosopher ? getSchool(philosopher.schoolSlugs[0]) : undefined;
  const accent = school?.accent ?? ogStyles.palette.gold;
  const quote = philosopher?.quotes[0];

  return new ImageResponse(
    <OgFrame accent={accent}>
      <div style={ogStyles.title}>{philosopher ? t(philosopher.name, locale) : 'Philosophia'}</div>
      {philosopher && <div style={ogStyles.subtitle}>{t(philosopher.epithet, locale)}</div>}
      {philosopher && (
        <div style={ogStyles.caption}>
          {t(philosopher.years, locale)}
          {school ? ` · ${t(school.name, locale)}` : ''}
        </div>
      )}
      {quote && <div style={ogStyles.quote(accent)}>“{t(quote.text, locale)}”</div>}
    </OgFrame>,
    { ...OG_SIZE, fonts: await ogFonts() },
  );
}
