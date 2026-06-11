import { SchoolSlider, type SchoolVM } from '@/components/SchoolSlider';
import { getPhilosopher } from '@/data/philosophers';
import { getQuestionsFor } from '@/data/quizzes';
import { schools } from '@/data/schools';
import { t, type Locale } from '@/lib/i18n';

/**
 * One-page experience: the home IS the app. Each school of thought is a
 * full-viewport game-dashboard slide; the visitor flips through them like
 * levels. Deep content (full biographies, busts) stays one click away on
 * the philosopher pages.
 */
export default function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  const vms: SchoolVM[] = schools.map((school) => ({
    slug: school.slug,
    name: t(school.name, locale),
    period: t(school.period, locale),
    tagline: t(school.tagline, locale),
    description: t(school.description, locale),
    coreIdeas: t(school.coreIdeas, locale),
    accent: school.accent,
    scene: school.scene,
    cityImage: school.cityImage,
    thinkers: school.philosopherSlugs
      .map(getPhilosopher)
      .filter((p): p is NonNullable<ReturnType<typeof getPhilosopher>> => p !== undefined)
      .map((p) => ({
        slug: p.slug,
        name: p.name,
        epithet: t(p.epithet, locale),
        years: t(p.years, locale),
        figureImage: p.figureImage,
        marble: p.bust.marble,
        pedestal: p.bust.pedestal,
        questions: getQuestionsFor(p.slug),
      })),
  }));

  return <SchoolSlider schools={vms} locale={locale} />;
}
