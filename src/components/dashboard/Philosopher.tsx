'use client';

import Image from 'next/image';
import { dict } from '@/data/dictionary';
import { getQuestionsFor } from '@/data/quizzes';
import type { Philosopher } from '@/data/types';
import { t, type Locale } from '@/lib/i18n';
import { Accordion, Icon, Modal, type TabDef } from './ui';

/** Monogram letter shown faintly behind the portrait. */
export function monogram(name: string): string {
  const parts = name.replace(/^(St\.?|Saint)\s+/i, '').split(/\s+/);
  return (parts[parts.length - 1][0] || 'Φ').toUpperCase();
}

function Portrait({ p, big, locale }: { p: Philosopher; big?: boolean; locale?: Locale }) {
  const name = locale ? t(p.name, locale) : p.name.en;
  return (
    <div className={big ? 'pm__portrait' : 'pcard__portrait'}>
      <span className="pcard__mono" aria-hidden="true">{monogram(name)}</span>
      {p.figureImage && (
        big ? (
          <Image src={p.figureImage} alt={name} width={200} height={260} sizes="(max-width: 640px) 100vw, 200px" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        ) : (
          <Image src={p.figureImage} alt={name} width={92} height={116} sizes="(max-width: 640px) 64px, 92px" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        )
      )}
    </div>
  );
}

export function PhilosopherCard({
  p,
  locale,
  onOpen,
}: {
  p: Philosopher;
  locale: Locale;
  onOpen: (p: Philosopher) => void;
}) {
  return (
    <button className="pcard reveal" style={{ '--d': '120ms' } as React.CSSProperties} onClick={() => onOpen(p)}
      aria-label={`${t(p.name, locale)} — ${t(dict.about, locale)}`}>
      <Portrait p={p} locale={locale} />
      <span className="pcard__body">
        <span className="mono pcard__epithet">{t(p.epithet, locale)}</span>
        <span className="pcard__name serif">{t(p.name, locale)}</span>
        <span className="pcard__years">{t(p.years, locale)}</span>
        <span className="pcard__quote serif">&ldquo;{t(p.quotes[0].text, locale)}&rdquo;</span>
        <span className="pcard__open">
          {t(dict.about, locale)} <Icon name="arrow" className="arr" stroke={1.8} size={14} />
        </span>
      </span>
    </button>
  );
}

export function PhilosopherModal({
  p,
  open,
  onClose,
  onQuiz,
  locale,
}: {
  p: Philosopher | null;
  open: boolean;
  onClose: () => void;
  onQuiz: (p: Philosopher) => void;
  locale: Locale;
}) {
  if (!p) return null;
  const idBase = `pm-${p.slug}`;

  const tabs: TabDef[] = [
    {
      label: t(dict.biography, locale),
      icon: 'scroll',
      render: () => (
        <div className="prose dropcap">
          {t(p.biography, locale).map((para, i) => <p key={i}>{para}</p>)}
        </div>
      ),
    },
    {
      label: t(dict.contributions, locale),
      icon: 'spark',
      render: () => (
        <ul className="list-clean">
          {t(p.contributions, locale).map((c, i) => (
            <li key={i}><span className="mk">{String(i + 1).padStart(2, '0')}</span><span>{c}</span></li>
          ))}
        </ul>
      ),
    },
    {
      label: t(dict.notableQuotes, locale),
      icon: 'quote',
      render: () => (
        <div>
          {p.quotes.map((q, i) => (
            <blockquote className="quoteblock" key={i}>
              <p>&ldquo;{t(q.text, locale)}&rdquo;</p>
              {q.source && <cite>— {t(q.source, locale)}</cite>}
            </blockquote>
          ))}
        </div>
      ),
    },
    {
      label: t(dict.traits, locale),
      icon: 'user',
      render: () => (
        <div className="traitwrap">
          {t(p.traits, locale).map((trait, i) => <span className="chip chip--accent" key={i}>{trait}</span>)}
        </div>
      ),
    },
    {
      label: t(dict.remarkableFacts, locale),
      icon: 'info',
      render: () => (
        <div className="factgrid">
          {t(p.facts, locale).map((f, i) => (
            <div className="fact" key={i}>
              <span className="fact__n display">{String(i + 1).padStart(2, '0')}</span>
              <p>{f}</p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Modal open={open} onClose={onClose} labelledby={`${idBase}-name`} closeLabel={t(dict.close, locale)}>
      <div className="modal__scroll">
        <div className="pm__head">
          <Portrait p={p} big />
          <div className="pm__intro">
            <span className="mono pm__epithet">{t(p.epithet, locale)}</span>
            <h2 className="pm__name" id={`${idBase}-name`}>{t(p.name, locale)}</h2>
            <div className="pm__meta">
              <span>{t(p.years, locale)}</span>
              <span><b>{t(dict.born, locale)}</b> {t(p.birthplace, locale)}</span>
            </div>
            {getQuestionsFor(p.slug).length > 0 && (
              <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={() => onQuiz(p)} style={{ padding: '9px 16px', fontSize: '0.85rem' }}>
                  <Icon name="target" size={16} /> {t(dict.quizFor, locale)} {t(p.name, locale).split(' ')[0]}
                </button>
              </div>
            )}
          </div>
        </div>
        <Accordion tabs={tabs} idBase={idBase} />
      </div>
    </Modal>
  );
}
