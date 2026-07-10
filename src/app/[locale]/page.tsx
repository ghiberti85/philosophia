import { Dashboard } from '@/components/dashboard/Dashboard';
import type { Locale } from '@/lib/i18n';

/**
 * One-page experience: the home IS the app. A game-style "Codex × HUD"
 * dashboard per school of thought — isometric hero, faction readouts,
 * philosopher dossiers and quizzes — navigated along a 24-century
 * timeline rail. Deep content stays one click away on the inner pages.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <Dashboard locale={locale} />;
}
