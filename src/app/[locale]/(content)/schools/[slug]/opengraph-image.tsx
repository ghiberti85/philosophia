import { ImageResponse } from 'next/og';
import { getSchool, schools } from '@/data/schools';
import { LOCALES, t, type Locale } from '@/lib/i18n';
import { OG_CONTENT_TYPE, OG_SIZE, OgFrame, ogFonts, ogStyles } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => schools.map((s) => ({ locale, slug: s.slug })));
}

export function generateImageMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const school = getSchool(params.slug);
  const name = school ? t(school.name, params.locale) : 'Philosophia';
  return [{ id: 'og', size: OG_SIZE, contentType: OG_CONTENT_TYPE, alt: name }];
}

export default async function Image({ params }: { params: { locale: Locale; slug: string } }) {
  const { locale, slug } = params;
  const school = getSchool(slug);
  const accent = school?.accent ?? ogStyles.palette.gold;

  return new ImageResponse(
    <OgFrame accent={accent}>
      <div style={ogStyles.title}>{school ? t(school.name, locale) : 'Philosophia'}</div>
      {school && <div style={ogStyles.caption}>{t(school.period, locale)}</div>}
      {school && <div style={ogStyles.quote(accent)}>{t(school.tagline, locale)}</div>}
    </OgFrame>,
    { ...OG_SIZE, fonts: await ogFonts() },
  );
}
