'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/** Roman numerals for the HUD stat readouts. */
export function roman(num: number): string {
  if (!num || num < 1 || num > 3999) return String(num);
  const map: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let out = '';
  let n = num;
  for (const [v, s] of map) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
}

export type IconName =
  | 'close'
  | 'chevron'
  | 'arrow'
  | 'prev'
  | 'next'
  | 'sun'
  | 'moon'
  | 'scroll'
  | 'quote'
  | 'spark'
  | 'user'
  | 'target'
  | 'map'
  | 'check'
  | 'refresh'
  | 'info'
  | 'sliders'
  | 'sword'
  | 'flame'
  | 'lightbulb'
  | 'hammer'
  | 'alert'
  | 'layers';

const ICON_PATHS: Record<IconName, string> = {
  close: 'M18 6 6 18M6 6l12 12',
  chevron: 'm9 6 6 6-6 6',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  prev: 'm15 6-6 6 6 6',
  next: 'm9 6 6 6-6 6',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z',
  scroll:
    'M8 3h10a2 2 0 0 1 2 2v13a3 3 0 0 1-3 3H7M8 3a2 2 0 0 0-2 2v11H4a1 1 0 0 0-1 1 3 3 0 0 0 3 3M8 3a2 2 0 0 1 2 2v0M12 8h4M12 12h4',
  quote: 'M6 11c0-3 2-5 5-5M6 11v6H1v-6c0-3 2-5 5-5M18 11c0-3 2-5 5-5M18 11v6h-5v-6c0-3 2-5 5-5',
  spark:
    'M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M18.4 5.6l-4.2 4.2M9.8 14.2l-4.2 4.2',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0',
  target:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  map: 'M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2ZM9 4v14M15 6v14',
  check: 'M20 6 9 17l-5-5',
  refresh: 'M21 12a9 9 0 1 1-3-6.7M21 4v4h-4',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v5M12 8h.01',
  sliders: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  sword: 'M12 2l3 3-2 8-1 7-2-7-2-8 3-3M12 2v16',
  flame: 'M12 2c0 2-1 3-1 5 0 3 2 5 1 8-1-3 1-5 1-8 0-2-1-3-1-5ZM10 15c0 2 1 3 2 4 1-1 2-2 2-4',
  lightbulb:
    'M12 2a5 5 0 0 0-5 5c0 2 1 3 1 5 0 1-1 2-1 2h10c0 0-1-1-1-2 0-2 1-3 1-5a5 5 0 0 0-5-5ZM9 16h6M10 20h4',
  hammer: 'M7 17v3h3M7 17l4-11 2 2 4-4-1-1 4 4-2 2 11-4v-1M7 17v3',
  alert: 'M12 2L2 20h20L12 2ZM12 9v4M12 15h.01',
  layers: 'M12 2L2 6v5l10 4 10-4V6L12 2ZM2 11l10 4 10-4M2 16l10 4 10-4',
};

/** Inline icon set (geometric, Lucide-flavoured, self-contained). */
export function Icon({
  name,
  className,
  stroke = 1.6,
  size,
  style,
}: {
  name: IconName;
  className?: string;
  stroke?: number;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      width={size || 16}
      height={size || 16}
      style={style}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

/** Corner brackets — the signature HUD frame. */
export function Brackets() {
  return (
    <>
      <span className="panel__corner tl" />
      <span className="panel__corner tr" />
      <span className="panel__corner bl" />
      <span className="panel__corner br" />
    </>
  );
}

/** Panel with HUD header. */
export function Panel({
  glyph,
  label,
  count,
  className = '',
  tint,
  children,
  style,
  area,
}: {
  glyph?: string;
  label?: string;
  count?: string;
  className?: string;
  tint?: boolean;
  children: ReactNode;
  style?: CSSProperties;
  area?: string;
}) {
  return (
    <section
      className={`panel ${tint ? 'panel--tint' : ''} ${className}`}
      style={{ ...style, gridArea: area }}
    >
      <Brackets />
      {(label || glyph) && (
        <header className="panel__head">
          {glyph && (
            <span className="glyph" aria-hidden="true">
              {glyph}
            </span>
          )}
          <span className="mono">{label}</span>
          {count != null && <span className="count">{count}</span>}
        </header>
      )}
      {children}
    </section>
  );
}

/** Modal: backdrop click, ESC, scroll-lock, focus trap + focus return. */
export function Modal({
  open,
  onClose,
  children,
  variant = '',
  labelledby,
  closeLabel,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: string;
  labelledby?: string;
  closeLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const last = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      last.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        const el =
          ref.current?.querySelector<HTMLElement>('[data-autofocus]') ||
          ref.current?.querySelector<HTMLElement>('button');
        el?.focus();
      });
    } else {
      document.body.style.overflow = '';
      (last.current as HTMLElement | null)?.focus?.();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // pointerEvents is non-animatable, so Framer applies it the instant
          // the exit starts. Crucial on iOS PWAs: if the exit animation hangs
          // (rAF suspended on backgrounding), the invisible backdrop would
          // otherwise stay mounted over the whole app, eating every tap while
          // scroll still chains through — the page looks frozen.
          exit={{ opacity: 0, pointerEvents: 'none' }}
          transition={{ duration: 0.18 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className={`modal ${variant}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledby}
            ref={ref}
            // No opacity in this animation, only on purpose: if it were
            // interrupted mid-spring (the same rAF-suspension class of bug
            // fixed for the backdrop's exit above), the card would be left
            // rendering at partial opacity, letting the page behind bleed
            // through its always-solid background.
            initial={{ scale: 0.95, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 12 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.8 }}
          >
            <button className="modal__close" onClick={onClose} aria-label={closeLabel}>
              <Icon name="close" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export interface TabDef {
  label: string;
  icon?: IconName;
  render: () => ReactNode;
}

/** Tabs with roving focus + arrow-key navigation. */
export function Tabs({ tabs, idBase }: { tabs: TabDef[]; idBase: string }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      const next = (active + dir + tabs.length) % tabs.length;
      setActive(next);
      refs.current[next]?.focus();
    }
  };
  return (
    <div>
      <div className="tabs" role="tablist" onKeyDown={onKey}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            role="tab"
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`${idBase}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${idBase}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            className="tab"
            onClick={() => setActive(i)}
          >
            {tab.icon && <Icon name={tab.icon} className="tab__ic" />}
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={i}
          role="tabpanel"
          id={`${idBase}-panel-${i}`}
          aria-labelledby={`${idBase}-tab-${i}`}
          hidden={active !== i}
          className="tabpanel"
        >
          {active === i && tab.render()}
        </div>
      ))}
    </div>
  );
}

/** Accordion — all sections visible, expand/collapse individually. */
export function Accordion({ tabs, idBase }: { tabs: TabDef[]; idBase: string }) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  return (
    <div className="accordion">
      {tabs.map((tab, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} className={`acrd${isOpen ? ' acrd--open' : ''}`}>
            <button
              className="acrd__trigger"
              aria-expanded={isOpen}
              aria-controls={`${idBase}-acrd-${i}`}
              id={`${idBase}-acrd-btn-${i}`}
              onClick={() => toggle(i)}
            >
              <span className="acrd__label">
                {tab.icon && <Icon name={tab.icon} size={14} />}
                <span className="mono">{tab.label}</span>
              </span>
              <Icon name="chevron" size={14} className="acrd__chevron" />
            </button>
            <div
              id={`${idBase}-acrd-${i}`}
              role="region"
              aria-labelledby={`${idBase}-acrd-btn-${i}`}
              className="acrd__body"
              hidden={!isOpen}
            >
              <div className="acrd__content">{tab.render()}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
