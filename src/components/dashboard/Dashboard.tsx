'use client';

import './dashboard.css';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { dict } from '@/data/dictionary';
import { philosophers } from '@/data/philosophers';
import { getQuestionsFor } from '@/data/quizzes';
import { schools } from '@/data/schools';
import { getPhilosopher } from '@/data/philosophers';
import { schoolDetails } from '@/data/school-details';
import type { Philosopher, School } from '@/data/types';
import { t, type Locale } from '@/lib/i18n';
import { IsoScene } from './IsoScene';
import { PhilosopherCard, PhilosopherModal } from './Philosopher';
import { QuizModal } from './QuizModal';
import { Brackets, Icon, Modal, Panel, roman } from './ui';

const LS = {
  get(key: string, fallback: string): string {
    try {
      return localStorage.getItem(`philosophia.${key}`) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(`philosophia.${key}`, value);
    } catch {
      /* private mode */
    }
  },
};

type Layout = 'split' | 'stacked' | 'focus';
type Density = 'compact' | 'regular' | 'comfy';
type CardStyle = 'compact' | 'portrait' | 'plaque';

const TWEAK_DEFAULTS = { layout: 'stacked' as Layout, density: 'regular' as Density, cardStyle: 'plaque' as CardStyle };
const PAD: Record<Density, string> = {
  compact: '14px',
  regular: 'clamp(16px, 1.6vw, 24px)',
  comfy: 'clamp(22px, 2vw, 32px)',
};
const ERAS: Record<string, string> = {
  'socratic-philosophy': 'V BC',
  platonism: 'IV BC',
  aristotelianism: 'IV BC',
  stoicism: 'III BC',
  rationalism: 'XVII',
  'german-idealism': 'XVIII',
  existentialism: 'XX',
};
const DEFAULT_SCHOOL = 3; // Stoicism

/* ── Topbar ─────────────────────────────────────────────────────────── */

function useQuoteOfDay(locale: Locale) {
  return useMemo(() => {
    const all = philosophers.flatMap((p) => p.quotes.map((q) => ({ text: q.text, who: p.name })));
    const day = Math.floor(Date.now() / 86400000) % all.length;
    const q = all[day];
    return { text: t(q.text, locale), who: q.who };
  }, [locale]);
}

function Topbar({ locale }: { locale: Locale }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const qod = useQuoteOfDay(locale);
  const dark = mounted && resolvedTheme === 'dark';
  return (
    <header className="topbar">
      <div className="wordmark">
        <span className="phi">Φ</span>
        <span className="name">Philosophia</span>
        <span className="sub mono" style={{ marginLeft: 4 }}>{t(dict.tagline, locale)}</span>
      </div>
      <div className="ticker" title={`${qod.text} — ${qod.who}`}>
        <span className="ticker__label mono">{t(dict.quoteOfTheDay, locale)}</span>
        <span className="ticker__text">“{qod.text}” <span className="mono" style={{ fontStyle: 'normal' }}>— {qod.who}</span></span>
      </div>
      <div className="topbar__actions">
        <div className="seg" role="group" aria-label={t(dict.language, locale)}>
          <Link href="/en" aria-current={locale === 'en'}>EN</Link>
          <Link href="/pt" aria-current={locale === 'pt'}>PT</Link>
        </div>
        <button className="iconbtn" onClick={() => setTheme(dark ? 'light' : 'dark')}
          aria-label={dark ? t(dict.switchToLight, locale) : t(dict.switchToDark, locale)}>
          <Icon name={dark ? 'sun' : 'moon'} />
        </button>
      </div>
    </header>
  );
}

/* ── Dashboard panels ───────────────────────────────────────────────── */

function Hero({ school, locale, onDossier }: { school: School; locale: Locale; onDossier: () => void }) {
  return (
    <Panel area="hero" className="hero reveal" style={{ '--d': '0ms' } as CSSProperties} tint>
      <div className="hero__scene"><IsoScene scene={school.scene} /></div>
      <div className="hero__veil" />
      <div className="hero__body">
        <span className="hero__period mono"><Icon name="map" size={14} /> {t(school.period, locale)}</span>
        <h1 className="hero__title">{t(school.name, locale)}</h1>
        <p className="hero__tagline">{t(school.tagline, locale)}</p>
        <button className="btn-ghost hero__desc-btn" onClick={onDossier}>
          <Icon name="scroll" size={16} /> {t(dict.readSchool, locale)}
        </button>
      </div>
    </Panel>
  );
}

type StatKind = 'sages' | 'tenets' | 'quiz' | 'sequence';

function Stats({
  school, idx, locale, poolCount, onOpen,
}: {
  school: School; idx: number; locale: Locale; poolCount: number; onOpen: (kind: StatKind) => void;
}) {
  const items: { kind: StatKind; glyph: string; label: string; val: string; unit: string }[] = [
    { kind: 'sages', glyph: '◉', label: t(dict.sages, locale), val: roman(school.philosopherSlugs.length), unit: t(dict.thinkers, locale) },
    { kind: 'tenets', glyph: '▣', label: t(dict.coreTenets, locale), val: roman(school.coreIdeas.en.length), unit: t(dict.principles, locale) },
    { kind: 'quiz', glyph: '◈', label: t(dict.quizPool, locale), val: roman(poolCount), unit: t(dict.questionsInPool, locale) },
    { kind: 'sequence', glyph: '→', label: t(dict.inSequence, locale), val: roman(idx + 1), unit: `${t(dict.of, locale)} ${roman(schools.length)}` },
  ];
  return (
    <Panel area="stats" glyph="▣" label={t(dict.factionReadout, locale)} className="reveal" style={{ '--d': '80ms' } as CSSProperties}>
      <div className="stats-grid">
        {items.map((s) => (
          <button className="stat" key={s.kind} onClick={() => onOpen(s.kind)}>
            <span className="mono" style={{ color: 'var(--accent)' }}>{s.glyph} {s.label}</span>
            <span className="stat__val"><span className="roman">{s.val}</span></span>
            <span className="stat__unit">{s.unit}</span>
            <span className="stat__more mono">{t(dict.readMore, locale)} →</span>
          </button>
        ))}
      </div>
    </Panel>
  );
}

/** Popup behind each faction-readout cell: explanation + the data itself. */
function StatModal({
  kind, school, idx, locale, onClose, onThinker, onIdea, onQuiz, onSchool,
}: {
  kind: StatKind | null;
  school: School;
  idx: number;
  locale: Locale;
  onClose: () => void;
  onThinker: (p: Philosopher) => void;
  onIdea: (i: number) => void;
  onQuiz: () => void;
  onSchool: (i: number) => void;
}) {
  if (!kind) return null;
  const list = school.philosopherSlugs.map(getPhilosopher).filter((p): p is Philosopher => Boolean(p));
  const titles: Record<StatKind, string> = {
    sages: t(dict.sages, locale),
    tenets: t(dict.coreTenets, locale),
    quiz: t(dict.quizPool, locale),
    sequence: t(dict.inSequence, locale),
  };
  const infos: Record<StatKind, string> = {
    sages: t(dict.statSagesInfo, locale),
    tenets: t(dict.statTenetsInfo, locale),
    quiz: t(dict.statQuizInfo, locale),
    sequence: t(dict.statSequenceInfo, locale),
  };
  return (
    <Modal open onClose={onClose} variant="modal--quiz" labelledby="stat-title" closeLabel={t(dict.close, locale)}>
      <div className="modal__scroll">
        <div className="tabpanel">
          <div className="panel__head">
            <span className="glyph">▣</span>
            <span className="mono" id="stat-title">{titles[kind]} · {t(school.name, locale)}</span>
          </div>
          <p className="context-body" style={{ marginBottom: 18 }}>{infos[kind]}</p>

          {kind === 'sages' && (
            <ul className="list-clean">
              {list.map((p, i) => (
                <li key={p.slug}>
                  <span className="mk">{String(i + 1).padStart(2, '0')}</span>
                  <button className="statlink" onClick={() => { onClose(); onThinker(p); }}>
                    <span className="serif" style={{ fontWeight: 700 }}>{p.name}</span>
                    <span className="statlink__sub mono">{t(p.epithet, locale)} · {t(p.years, locale)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {kind === 'tenets' && (
            <ul className="list-clean">
              {t(school.coreIdeas, locale).map((idea, i) => (
                <li key={i}>
                  <span className="mk">{String(i + 1).padStart(2, '0')}</span>
                  <button className="statlink" onClick={() => { onClose(); onIdea(i); }}>
                    <span>{idea}</span>
                    <span className="statlink__sub mono">{t(dict.inDepth, locale)} →</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {kind === 'quiz' && (
            <>
              <ul className="list-clean" style={{ marginBottom: 18 }}>
                {list.map((p, i) => (
                  <li key={p.slug}>
                    <span className="mk">{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ flex: 1 }}>{p.name}</span>
                    <span className="mono" style={{ color: 'var(--accent)' }}>{roman(getQuestionsFor(p.slug).length)}</span>
                  </li>
                ))}
              </ul>
              <button className="btn-primary" onClick={() => { onClose(); onQuiz(); }}>
                <Icon name="target" size={18} /> {t(dict.startQuiz, locale)}
              </button>
            </>
          )}

          {kind === 'sequence' && (
            <ul className="list-clean">
              {schools.map((s, i) => (
                <li key={s.slug}>
                  <span className="mk">{ERAS[s.slug] ?? roman(i + 1)}</span>
                  <button className="statlink" onClick={() => { onClose(); onSchool(i); }}
                    style={i === idx ? { color: 'var(--accent)' } : undefined}>
                    <span style={{ fontWeight: i === idx ? 700 : 500 }}>{t(s.name, locale)}</span>
                    <span className="statlink__sub mono">{t(s.period, locale)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  );
}

function Tenets({ school, locale, onIdea }: { school: School; locale: Locale; onIdea: (i: number) => void }) {
  const ideas = t(school.coreIdeas, locale);
  return (
    <Panel area="ideas" glyph="◉" label={t(dict.coreIdeas, locale)} count={roman(ideas.length)} className="reveal" style={{ '--d': '140ms' } as CSSProperties}>
      <ul className="list-clean tenets tenets--fill">
        {ideas.map((idea, i) => (
          <li key={i}>
            <button className="tenet-row" onClick={() => onIdea(i)}>
              <span className="mk">{String(i + 1).padStart(2, '0')}</span>
              <span className="tenet-row__text">{idea}</span>
              <span className="tenet-row__more mono">{t(dict.inDepth, locale)} →</span>
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/** Deep-dive popup for one core idea. */
function IdeaModal({
  ideaIdx, school, locale, onClose,
}: {
  ideaIdx: number | null; school: School; locale: Locale; onClose: () => void;
}) {
  if (ideaIdx == null) return null;
  const ideas = t(school.coreIdeas, locale);
  const detail = schoolDetails[school.slug];
  const text = detail ? t(detail.ideaDetails, locale)[ideaIdx] : undefined;
  return (
    <Modal open onClose={onClose} labelledby="idea-title" closeLabel={t(dict.close, locale)}>
      <div className="modal__scroll">
        <div className="tabpanel idea-deep">
          <div className="panel__head">
            <span className="glyph">◉</span>
            <span className="mono">{t(dict.coreIdeas, locale)} · {t(school.name, locale)}</span>
            <span className="count">{String(ideaIdx + 1).padStart(2, '0')} / {String(ideas.length).padStart(2, '0')}</span>
          </div>
          <h2 className="idea-deep__title" id="idea-title">{ideas[ideaIdx]}</h2>
          {text && <p className="idea-deep__body dropcap">{text}</p>}
        </div>
      </div>
    </Modal>
  );
}

/** Extended historical-context popup. */
function ContextModal({
  open, school, locale, onClose,
}: {
  open: boolean; school: School; locale: Locale; onClose: () => void;
}) {
  if (!open) return null;
  const detail = schoolDetails[school.slug];
  const paras = detail ? t(detail.contextLong, locale) : [t(school.description, locale)];
  return (
    <Modal open onClose={onClose} labelledby="ctx-title" closeLabel={t(dict.close, locale)}>
      <div className="modal__scroll">
        <div className="tabpanel">
          <div className="panel__head">
            <span className="glyph">◉</span>
            <span className="mono" id="ctx-title">{t(dict.historicalContext, locale)} · {t(school.name, locale)}</span>
          </div>
          <div className="prose dropcap">
            {paras.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </Modal>
  );
}

function Thinkers({ school, locale, cardStyle, onOpen }: { school: School; locale: Locale; cardStyle: CardStyle; onOpen: (p: Philosopher) => void }) {
  const list = school.philosopherSlugs.map(getPhilosopher).filter((p): p is Philosopher => Boolean(p));
  return (
    <Panel area="thinkers" glyph="◈" label={t(dict.keyThinkers, locale)} count={roman(list.length)} className="reveal" style={{ '--d': '200ms' } as CSSProperties}>
      <div className="thinkers-row" data-cardstyle={cardStyle}>
        {list.map((p) => <PhilosopherCard key={p.slug} p={p} locale={locale} onOpen={onOpen} />)}
      </div>
    </Panel>
  );
}

function ContextQuiz({
  school, locale, onQuiz, onContext,
}: {
  school: School; locale: Locale; onQuiz: () => void; onContext: () => void;
}) {
  return (
    <Panel area="context" className="reveal" style={{ '--d': '260ms', gap: 16 } as CSSProperties}>
      <Brackets />
      <button className="context-open" onClick={onContext}>
        <div className="panel__head"><span className="glyph">◉</span><span className="mono">{t(dict.historicalContext, locale)}</span></div>
        <p className="context-body dropcap">{t(school.description, locale)}</p>
        <span className="context-open__more mono">{t(dict.readMore, locale)} →</span>
      </button>
      <hr className="rule rule--gold" />
      <div className="quiz-cta">
        <div className="panel__head" style={{ margin: 0 }}><span className="glyph">◈</span><span className="mono">{t(dict.quizzes, locale)}</span></div>
        <p className="lead">{t(dict.quizSubtitle, locale)}</p>
        <button className="btn-primary" onClick={onQuiz}>
          <Icon name="target" size={18} /> {t(dict.startQuiz, locale)}
        </button>
      </div>
    </Panel>
  );
}

/* ── School dossier modal ───────────────────────────────────────────── */

function SchoolModal({
  school, open, onClose, locale, onThinker,
}: {
  school: School; open: boolean; onClose: () => void; locale: Locale; onThinker: (p: Philosopher) => void;
}) {
  const list = school.philosopherSlugs.map(getPhilosopher).filter((p): p is Philosopher => Boolean(p));
  return (
    <Modal open={open} onClose={onClose} labelledby="sm-name" closeLabel={t(dict.close, locale)}>
      <div className="modal__scroll">
        <div style={{ position: 'relative', height: 200, overflow: 'hidden', borderBottom: '1px solid var(--color-semantic-border)' }}>
          <div className="hero__scene"><IsoScene scene={school.scene} /></div>
          <div className="hero__veil" />
          <div style={{ position: 'absolute', left: 'clamp(20px,3vw,30px)', bottom: 18, zIndex: 2 }}>
            <span className="hero__period mono"><Icon name="map" size={14} /> {t(school.period, locale)}</span>
            <h2 className="pm__name" id="sm-name" style={{ marginTop: 6 }}>{t(school.name, locale)}</h2>
          </div>
        </div>
        <div className="tabpanel">
          <p className="hero__tagline" style={{ maxWidth: 'none', marginBottom: 18 }}>{t(school.tagline, locale)}</p>
          <p className="context-body dropcap" style={{ marginBottom: 22 }}>{t(school.description, locale)}</p>
          <div className="panel__head"><span className="glyph">◉</span><span className="mono">{t(dict.coreIdeas, locale)}</span></div>
          <ul className="list-clean" style={{ marginBottom: 22 }}>
            {t(school.coreIdeas, locale).map((idea, i) => (
              <li key={i}><span className="mk">{String(i + 1).padStart(2, '0')}</span><span>{idea}</span></li>
            ))}
          </ul>
          <div className="panel__head"><span className="glyph">◈</span><span className="mono">{t(dict.keyThinkers, locale)}</span></div>
          <div className="traitwrap">
            {list.map((p) => (
              <button key={p.slug} className="chip" onClick={() => onThinker(p)} style={{ cursor: 'pointer' }}>
                <Icon name="user" size={14} style={{ color: 'var(--accent)' }} /> {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* ── School rail / 24-century timeline ──────────────────────────────── */

function Rail({ idx, setIdx, locale }: { idx: number; setIdx: (updater: (cur: number) => number) => void; locale: Locale }) {
  const prev = () => setIdx((cur) => (cur - 1 + schools.length) % schools.length);
  const next = () => setIdx((cur) => (cur + 1) % schools.length);
  return (
    <nav className="rail" aria-label={t(dict.timeline, locale)}>
      <div className="rail__head">
        <span className="glyph mono" style={{ color: 'var(--accent)' }}>◈ {t(dict.timeline, locale)}</span>
        <span className="mono" style={{ color: 'var(--color-semantic-foreground-muted)' }}>{t(dict.timelineSubtitle, locale)}</span>
        <div className="rail__nav">
          <button className="railbtn" onClick={prev} aria-label={t(dict.prevSchool, locale)}><Icon name="prev" /></button>
          <button className="railbtn" onClick={next} aria-label={t(dict.nextSchool, locale)}><Icon name="next" /></button>
        </div>
      </div>
      <div className="timeline" role="tablist">
        <div className="timeline__line" style={{ '--progress': `${(idx / (schools.length - 1)) * 100}%` } as CSSProperties} />
        {schools.map((s, i) => (
          <button key={s.slug} className="tnode" role="tab" aria-current={i === idx} aria-selected={i === idx}
            style={{ '--tnacc-base': s.accent } as CSSProperties} onClick={() => setIdx(() => i)}>
            <span className="tnode__dot" />
            <span className="tnode__era">{ERAS[s.slug] ?? ''}</span>
            <span className="tnode__name">{t(s.name, locale)}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ── Tweaks panel ───────────────────────────────────────────────────── */

function TweakRadio<V extends string>({ label, value, options, onChange }: {
  label: string; value: V; options: readonly V[]; onChange: (v: V) => void;
}) {
  return (
    <div className="tweaks__row">
      <span className="mono">{label}</span>
      <div className="tweaks__opts">
        {options.map((opt) => (
          <button key={opt} className="tweaks__opt" aria-pressed={value === opt} onClick={() => onChange(opt)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function TweaksPanel({
  locale, layout, density, cardStyle, onLayout, onDensity, onCardStyle,
}: {
  locale: Locale;
  layout: Layout; density: Density; cardStyle: CardStyle;
  onLayout: (v: Layout) => void; onDensity: (v: Density) => void; onCardStyle: (v: CardStyle) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="tweaks">
      {open && (
        <div className="tweaks__pop">
          <TweakRadio label={t(dict.tweakLayout, locale)} value={layout} options={['split', 'stacked', 'focus'] as const} onChange={onLayout} />
          <TweakRadio label={t(dict.tweakDensity, locale)} value={density} options={['compact', 'regular', 'comfy'] as const} onChange={onDensity} />
          <TweakRadio label={t(dict.tweakCardStyle, locale)} value={cardStyle} options={['compact', 'portrait', 'plaque'] as const} onChange={onCardStyle} />
        </div>
      )}
      <button className="iconbtn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={t(dict.tweaks, locale)}>
        <Icon name="sliders" />
      </button>
    </div>
  );
}

/* ── App ────────────────────────────────────────────────────────────── */

export function Dashboard({ locale }: { locale: Locale }) {
  const [idx, setIdxState] = useState(DEFAULT_SCHOOL);
  const [entered, setEntered] = useState(false);

  const [layout, setLayout] = useState<Layout>(TWEAK_DEFAULTS.layout);
  const [density, setDensity] = useState<Density>(TWEAK_DEFAULTS.density);
  const [cardStyle, setCardStyle] = useState<CardStyle>(TWEAK_DEFAULTS.cardStyle);

  const [philOpen, setPhilOpen] = useState<Philosopher | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizScope, setQuizScope] = useState<Philosopher | null>(null); // null = whole school
  const [schoolOpen, setSchoolOpen] = useState(false);
  const [statOpen, setStatOpen] = useState<StatKind | null>(null);
  const [ideaOpen, setIdeaOpen] = useState<number | null>(null);
  const [ctxOpen, setCtxOpen] = useState(false);

  // hydrate persisted state on the client only (SSR markup stays deterministic)
  useEffect(() => {
    const saved = Number(LS.get('school', String(DEFAULT_SCHOOL)));
    if (Number.isFinite(saved)) setIdxState(Math.min(schools.length - 1, Math.max(0, saved)));
    setLayout(LS.get('tweak.layout', TWEAK_DEFAULTS.layout) as Layout);
    setDensity(LS.get('tweak.density', TWEAK_DEFAULTS.density) as Density);
    setCardStyle(LS.get('tweak.cardStyle', TWEAK_DEFAULTS.cardStyle) as CardStyle);
    LS.set('lang', locale);
  }, [locale]);

  const setIdx = (updater: (cur: number) => number) => {
    setIdxState((cur) => {
      const n = updater(cur);
      LS.set('school', String(n));
      return n;
    });
  };
  const tweak = {
    layout: (v: Layout) => { setLayout(v); LS.set('tweak.layout', v); },
    density: (v: Density) => { setDensity(v); LS.set('tweak.density', v); },
    cardStyle: (v: CardStyle) => { setCardStyle(v); LS.set('tweak.cardStyle', v); },
  };

  const school = schools[idx];
  const pool = useMemo(() => school.philosopherSlugs.flatMap((s) => getQuestionsFor(s)), [school]);

  // arm entrance animations only once a real paint frame happens
  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // keyboard nav for the timeline (when no modal open)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (philOpen || quizOpen || schoolOpen || statOpen || ideaOpen != null || ctxOpen) return;
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % schools.length);
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + schools.length) % schools.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [philOpen, quizOpen, schoolOpen, statOpen, ideaOpen, ctxOpen]);

  const openSchoolQuiz = () => { setQuizScope(null); setQuizOpen(true); };
  const openPhilQuiz = (p: Philosopher) => { setPhilOpen(null); setQuizScope(p); setQuizOpen(true); };

  const quizPool = quizScope ? getQuestionsFor(quizScope.slug) : pool;
  const quizTitle = quizScope ? quizScope.name : t(school.name, locale);
  const quizKey = quizScope ? quizScope.slug : school.slug;

  return (
    <div className="stage" data-enter={entered}
      style={{ '--accent-base': school.accent, '--panel-pad': PAD[density] } as CSSProperties}>
      <Topbar locale={locale} />

      <main className="dash" data-layout={layout} key={school.slug}>
        <Hero school={school} locale={locale} onDossier={() => setSchoolOpen(true)} />
        <Stats school={school} idx={idx} locale={locale} poolCount={pool.length} onOpen={setStatOpen} />
        <Tenets school={school} locale={locale} onIdea={setIdeaOpen} />
        <Thinkers school={school} locale={locale} cardStyle={cardStyle} onOpen={setPhilOpen} />
        <ContextQuiz school={school} locale={locale} onQuiz={openSchoolQuiz} onContext={() => setCtxOpen(true)} />
      </main>

      <Rail idx={idx} setIdx={setIdx} locale={locale} />

      <PhilosopherModal p={philOpen} open={!!philOpen} onClose={() => setPhilOpen(null)} onQuiz={openPhilQuiz} locale={locale} />
      <SchoolModal school={school} open={schoolOpen} onClose={() => setSchoolOpen(false)} locale={locale}
        onThinker={(p) => { setSchoolOpen(false); setPhilOpen(p); }} />
      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} pool={quizPool} title={quizTitle} scoreKey={quizKey} locale={locale} />

      <StatModal kind={statOpen} school={school} idx={idx} locale={locale} onClose={() => setStatOpen(null)}
        onThinker={setPhilOpen} onIdea={setIdeaOpen} onQuiz={openSchoolQuiz} onSchool={(i) => setIdx(() => i)} />
      <IdeaModal ideaIdx={ideaOpen} school={school} locale={locale} onClose={() => setIdeaOpen(null)} />
      <ContextModal open={ctxOpen} school={school} locale={locale} onClose={() => setCtxOpen(false)} />

      <TweaksPanel locale={locale} layout={layout} density={density} cardStyle={cardStyle}
        onLayout={tweak.layout} onDensity={tweak.density} onCardStyle={tweak.cardStyle} />
    </div>
  );
}
