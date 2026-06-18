'use client';

import { dict } from '@/data/dictionary';
import type { HistoricalEvent, School } from '@/data/types';
import { t, type Locale } from '@/lib/i18n';
import { getEventsFor } from '@/data/historical-events';
import { Panel, roman } from './ui';
import { HistoricalEventMarker } from './HistoricalEventMarker';
import type { CSSProperties } from 'react';

interface HistoricalEventsPanelProps {
  school: School;
  locale: Locale;
  onEventClick?: (event: HistoricalEvent) => void;
}

export function HistoricalEventsPanel({
  school,
  locale,
  onEventClick,
}: HistoricalEventsPanelProps) {
  const events = getEventsFor(school.slug)
    .sort((a, b) => {
      const yearA = parseInt(a.year.replace(/[^0-9-]/g, ''));
      const yearB = parseInt(b.year.replace(/[^0-9-]/g, ''));
      return yearA - yearB;
    })
    .slice(0, 6);

  if (events.length === 0) return null;

  return (
    <Panel
      area="events"
      glyph="◉"
      label={t(dict.historicalEvents, locale)}
      count={roman(events.length)}
      className="reveal"
      style={{ '--d': '230ms' } as CSSProperties}
    >
      <div className="events-grid">
        {events.map((event) => (
          <HistoricalEventMarker
            key={event.slug}
            event={event}
            locale={locale}
            onClick={onEventClick}
          />
        ))}
      </div>
    </Panel>
  );
}
