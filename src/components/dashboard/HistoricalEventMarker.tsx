'use client';

import { dict } from '@/data/dictionary';
import type { HistoricalEvent } from '@/data/types';
import { t, type Locale } from '@/lib/i18n';
import { Icon, type IconName } from './ui';
import { useState } from 'react';

const CATEGORY_ICONS: Record<HistoricalEvent['category'], IconName> = {
  war: 'sword',
  revolution: 'flame',
  discovery: 'spark',
  art: 'layers',
  construction: 'hammer',
  disaster: 'alert',
};

const CATEGORY_LABELS: Record<HistoricalEvent['category'], keyof typeof dict> = {
  war: 'eventWar',
  revolution: 'eventRevolution',
  discovery: 'eventDiscovery',
  art: 'eventArt',
  construction: 'eventConstruction',
  disaster: 'eventDisaster',
};

interface HistoricalEventMarkerProps {
  event: HistoricalEvent;
  locale: Locale;
  compact?: boolean;
  onClick?: (event: HistoricalEvent) => void;
}

export function HistoricalEventMarker({
  event,
  locale,
  compact = false,
  onClick,
}: HistoricalEventMarkerProps) {
  const [hovering, setHovering] = useState(false);
  const categoryLabel = t(dict[CATEGORY_LABELS[event.category]], locale);
  const iconName = CATEGORY_ICONS[event.category];

  return (
    <button
      className={`event-badge event-badge--${event.category}`}
      onClick={() => onClick?.(event)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      title={t(event.name, locale)}
      aria-label={`${categoryLabel}: ${t(event.name, locale)} (${event.year})`}
    >
      <Icon name={iconName} size={20} className="event-badge__icon" />
      <span className="event-badge__name">{t(event.name, locale)}</span>
      <span className="event-badge__year">{event.year}</span>
      {hovering && event.description && (
        <span className="event-badge__tooltip">{t(event.description, locale)}</span>
      )}
    </button>
  );
}
