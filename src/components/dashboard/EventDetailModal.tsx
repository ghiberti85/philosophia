'use client';

import { useRef } from 'react';
import { dict } from '@/data/dictionary';
import type { HistoricalEvent } from '@/data/types';
import { t, type Locale } from '@/lib/i18n';
import { Modal, Icon, type IconName } from './ui';

const CATEGORY_LABELS: Record<HistoricalEvent['category'], keyof typeof dict> = {
  war: 'eventWar',
  revolution: 'eventRevolution',
  discovery: 'eventDiscovery',
  art: 'eventArt',
  construction: 'eventConstruction',
  disaster: 'eventDisaster',
};

const CATEGORY_ICONS: Record<HistoricalEvent['category'], IconName> = {
  war: 'sword',
  revolution: 'flame',
  discovery: 'spark',
  art: 'layers',
  construction: 'hammer',
  disaster: 'alert',
};

interface EventDetailModalProps {
  event: HistoricalEvent | null;
  locale: Locale;
  onClose: () => void;
}

export function EventDetailModal({ event, locale, onClose }: EventDetailModalProps) {
  const snapshot = useRef<HistoricalEvent | null>(null);
  if (event) snapshot.current = event;
  const activeEvent = snapshot.current;

  const categoryLabel = activeEvent ? t(dict[CATEGORY_LABELS[activeEvent.category]], locale) : '';
  const iconName = activeEvent ? CATEGORY_ICONS[activeEvent.category] : 'info';
  const significanceStars = activeEvent
    ? Array.from({ length: 5 }, (_, i) => (i < activeEvent.significance ? '★' : '☆')).join('')
    : '';

  return (
    <Modal
      open={!!event}
      onClose={onClose}
      labelledby="event-title"
      closeLabel={t(dict.close, locale)}
    >
      {activeEvent && (
        <div className="modal__scroll">
          <div className="tabpanel">
            <div className="panel__head">
              <Icon name={iconName} size={16} style={{ color: 'var(--accent)' }} />
              <span className="mono" id="event-title">
                {categoryLabel} · {activeEvent.year}
              </span>
            </div>

            <h2 className="idea-deep__title" style={{ marginTop: 12, marginBottom: 12 }}>
              {t(activeEvent.name, locale)}
            </h2>

            <p className="context-body" style={{ marginBottom: 16 }}>
              {t(activeEvent.description, locale)}
            </p>

            {activeEvent.context && (
              <p className="idea-deep__body dropcap" style={{ marginBottom: 18 }}>
                {t(activeEvent.context, locale)}
              </p>
            )}

            <div
              className="context-body mono"
              style={{
                marginTop: 22,
                paddingTop: 16,
                borderTop: '1px solid var(--color-semantic-border)',
              }}
            >
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span>{t(dict.significance, locale)}</span>
                <span style={{ letterSpacing: '2px', color: 'var(--accent)' }}>
                  {significanceStars}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
