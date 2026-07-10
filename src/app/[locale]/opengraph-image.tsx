import { ImageResponse } from 'next/og';
import { dict } from '@/data/dictionary';
import { philosophers } from '@/data/philosophers';
import { quizQuestions } from '@/data/quizzes';
import { schools } from '@/data/schools';
import { t, type Locale } from '@/lib/i18n';
import { OG_CONTENT_TYPE, OG_SIZE, OgFrame, ogFonts, ogStyles } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateImageMetadata({ params }: { params: { locale: Locale } }) {
  return [
    {
      id: 'og',
      size: OG_SIZE,
      contentType: OG_CONTENT_TYPE,
      alt: `Philosophia — ${t(dict.tagline, params.locale)}`,
    },
  ];
}

export default async function Image({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const stats = [
    `${schools.length} ${t(dict.schools, locale)}`,
    `${philosophers.length} ${t(dict.philosophers, locale)}`,
    `${quizQuestions.length} ${t(dict.quizzes, locale)}`,
  ].join(' · ');

  return new ImageResponse(
    <OgFrame>
      <div style={{ ...ogStyles.title, fontSize: 96 }}>{t(dict.heroTitle, locale)}</div>
      <div style={ogStyles.subtitle}>{t(dict.tagline, locale)}</div>
      <div style={{ ...ogStyles.caption, marginTop: 'auto' }}>{stats}</div>
    </OgFrame>,
    { ...OG_SIZE, fonts: await ogFonts() },
  );
}
