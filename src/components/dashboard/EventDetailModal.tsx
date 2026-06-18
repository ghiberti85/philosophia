'use client';

import { dict } from '@/data/dictionary';
import type { HistoricalEvent } from '@/data/types';
import { t, type Locale } from '@/lib/i18n';
import { Modal } from './ui';

const CATEGORY_LABELS: Record<HistoricalEvent['category'], keyof typeof dict> = {
  war: 'eventWar',
  revolution: 'eventRevolution',
  discovery: 'eventDiscovery',
  art: 'eventArt',
  construction: 'eventConstruction',
  disaster: 'eventDisaster',
};

const CATEGORY_ICONS: Record<HistoricalEvent['category'], string> = {
  war: '⚔️',
  revolution: '🔥',
  discovery: '⚡',
  art: '🎭',
  construction: '🏛️',
  disaster: '💀',
};

interface EventDetailModalProps {
  event: HistoricalEvent | null;
  locale: Locale;
  onClose: () => void;
}

export function EventDetailModal({ event, locale, onClose }: EventDetailModalProps) {
  if (!event) return null;

  const categoryLabel = t(dict[CATEGORY_LABELS[event.category]], locale);
  const categoryIcon = CATEGORY_ICONS[event.category];

  const significanceStars = Array.from({ length: 5 }, (_, i) => i < event.significance ? '★' : '☆').join('');

  return (
    <Modal open onClose={onClose} labelledby="event-title" closeLabel={t(dict.close, locale)}>
      <div className="modal__scroll">
        <div className="tabpanel">
          <div className="panel__head">
            <span className="glyph">{categoryIcon}</span>
            <span className="mono" id="event-title">
              {categoryLabel} · {event.year}
            </span>
          </div>

          <h2 className="idea-deep__title" style={{ marginTop: 12, marginBottom: 12 }}>
            {t(event.name, locale)}
          </h2>

          <p className="context-body" style={{ marginBottom: 16 }}>
            {t(event.description, locale)}
          </p>

          {event.context && (
            <p className="idea-deep__body dropcap" style={{ marginBottom: 18 }}>
              {t(event.context, locale)}
            </p>
          )}

          <div className="context-body mono" style={{ marginTop: 22, paddingTop: 16, borderTop: '1px solid var(--color-semantic-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{t(dict.significance, locale)}</span>
              <span style={{ letterSpacing: '2px', color: 'var(--accent)' }}>{significanceStars}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
