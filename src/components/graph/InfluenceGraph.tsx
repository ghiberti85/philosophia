'use client';

// The philosopher dossier modal and quiz share the dashboard skin.
import '@/components/dashboard/dashboard.css';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { PhilosopherModal } from '@/components/dashboard/Philosopher';
import { QuizModal } from '@/components/dashboard/QuizModal';
import { SectionHeading } from '@/components/SectionHeading';
import { dict } from '@/data/dictionary';
import { getQuestionsFor } from '@/data/quizzes';
import { schools } from '@/data/schools';
import type { Philosopher } from '@/data/types';
import type { GraphLink, GraphNode } from '@/lib/influence-graph';
import { influencedList, lineageOf } from '@/lib/influence-graph';
import { t, type Locale } from '@/lib/i18n';

/**
 * Force-directed influence map rendered on a raw <canvas> — no graph library.
 *
 * Visual language mirrors the rest of the app: nodes are the philosophers'
 * AI-generated figure images (the same WebP used on cards, modals and detail
 * pages) ringed in their school's accent; the school filter uses the
 * isometric scene art; the frame, hint caption and controls reuse the same
 * rounded panel, glyphs and label styles as the philosopher/school pages —
 * no new icon set, no new corner treatment.
 *
 * Layout: nodes repel each other, influence links act as springs, and a weak
 * horizontal force pulls each philosopher toward their chronological slot, so
 * the graph settles into a readable antiquity→modernity flow. Hovering (or
 * selecting) a node highlights its full lineage — every intellectual ancestor
 * and heir — with animated dashes running along the arrows.
 */

interface SimNode extends GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const NODE_RADIUS = 15;
const LABEL_GAP = 18;
const EDGE_PAD = 64;

function nodeRadius(node: GraphNode): number {
  return NODE_RADIUS + Math.min(7, node.degree * 1.2);
}

/** Deterministic pseudo-random in [0,1) so SSR/CSR and reloads agree. */
function jitter(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}

export function InfluenceGraph({
  nodes,
  links,
  locale,
}: {
  nodes: GraphNode[];
  links: GraphLink[];
  locale: Locale;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<SimNode[]>([]);
  const alphaRef = useRef(1);
  const hoverRef = useRef<string | null>(null);
  const dragRef = useRef<{ slug: string; moved: boolean } | null>(null);
  const dashRef = useRef(0);
  const figuresRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const redrawRef = useRef<(() => void) | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [schoolFilter, setSchoolFilter] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  // Full dossier card + quiz, same components the dashboard uses — the
  // dedicated /philosophers/[slug] page is not part of this flow.
  const [profile, setProfile] = useState<Philosopher | null>(null);
  const [quizFor, setQuizFor] = useState<Philosopher | null>(null);

  const selectedNode = useMemo(
    () => nodes.find((n) => n.slug === selected) ?? null,
    [nodes, selected],
  );

  const schoolSet = useMemo(() => {
    if (!schoolFilter) return null;
    return new Set(
      nodes.filter((n) => n.philosopher.schoolSlugs.includes(schoolFilter)).map((n) => n.slug),
    );
  }, [schoolFilter, nodes]);

  // The theme is class-based (next-themes); watch the <html> class so the
  // canvas also reacts to system changes.
  useEffect(() => {
    const html = document.documentElement;
    const update = () => setIsDark(html.classList.contains('dark'));
    update();
    const observer = new MutationObserver(update);
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Preload the figure images once; each arrival repaints the current frame.
  useEffect(() => {
    for (const n of nodes) {
      if (!n.philosopher.figureImage || figuresRef.current.has(n.slug)) continue;
      const img = new window.Image();
      img.src = n.philosopher.figureImage;
      img.onload = () => redrawRef.current?.();
      figuresRef.current.set(n.slug, img);
    }
  }, [nodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const labelFont = getComputedStyle(container).fontFamily || 'serif';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let raf = 0;

    const linkPairs = links.map((l) => ({
      source: () => simRef.current.find((n) => n.slug === l.source),
      target: () => simRef.current.find((n) => n.slug === l.target),
      key: `${l.source}→${l.target}`,
      sourceSlug: l.source,
      targetSlug: l.target,
    }));

    function seed() {
      simRef.current = nodes.map((n) => ({
        ...n,
        x: EDGE_PAD + n.chrono * Math.max(1, width - EDGE_PAD * 2),
        y: height * (0.25 + 0.5 * jitter(n.slug)),
        vx: 0,
        vy: 0,
      }));
      alphaRef.current = 1;
    }

    function tick() {
      const sim = simRef.current;
      const alpha = alphaRef.current;

      for (let i = 0; i < sim.length; i++) {
        const a = sim[i];
        // Pairwise repulsion — 23 nodes, O(n²) is nothing.
        for (let j = i + 1; j < sim.length; j++) {
          const b = sim[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = Math.max(140, dx * dx + dy * dy);
          const f = (4200 / d2) * alpha;
          const d = Math.sqrt(d2);
          a.vx += (dx / d) * f;
          a.vy += (dy / d) * f;
          b.vx -= (dx / d) * f;
          b.vy -= (dy / d) * f;
        }
        // Pull toward the chronological slot (strong enough to keep the
        // antiquity→modernity reading against the image nodes' repulsion)
        // and weakly toward the vertical center.
        const targetX = EDGE_PAD + a.chrono * Math.max(1, width - EDGE_PAD * 2);
        a.vx += (targetX - a.x) * 0.075 * alpha;
        a.vy += (height / 2 - a.y) * 0.004 * alpha;
      }

      // Springs along influence links.
      for (const link of linkPairs) {
        const s = link.source();
        const p = link.target();
        if (!s || !p) continue;
        const dx = p.x - s.x;
        const dy = p.y - s.y;
        const d = Math.max(1, Math.sqrt(dx * dx + dy * dy));
        const f = ((d - 125) / d) * 0.06 * alpha;
        s.vx += dx * f;
        s.vy += dy * f;
        p.vx -= dx * f;
        p.vy -= dy * f;
      }

      for (const n of sim) {
        if (dragRef.current?.slug === n.slug) {
          n.vx = 0;
          n.vy = 0;
          continue;
        }
        n.vx *= 0.86;
        n.vy *= 0.86;
        n.x += n.vx;
        n.y += n.vy;
        const r = nodeRadius(n) + 4;
        n.x = Math.min(width - r, Math.max(r, n.x));
        n.y = Math.min(height - LABEL_GAP - 16, Math.max(r + 6, n.y));
      }

      alphaRef.current = Math.max(0, alpha - 0.0035);
    }

    function drawNode(n: SimNode, emphasized: boolean, isActive: boolean) {
      const r = nodeRadius(n);
      ctx!.globalAlpha = emphasized ? 1 : 0.26;

      if (isActive) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r + 7, 0, Math.PI * 2);
        ctx!.fillStyle = n.accent;
        ctx!.globalAlpha = 0.25;
        ctx!.fill();
        ctx!.globalAlpha = emphasized ? 1 : 0.26;
      }

      const img = figuresRef.current.get(n.slug);
      if (img?.complete && img.naturalWidth > 0) {
        // The same figure art used on cards and dossiers, cover-cropped to a
        // circle biased toward the top of the statue (head and shoulders).
        const s = Math.min(img.naturalWidth, img.naturalHeight);
        const sx = (img.naturalWidth - s) / 2;
        const sy = Math.min(img.naturalHeight - s, img.naturalHeight * 0.04);
        ctx!.save();
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx!.clip();
        ctx!.drawImage(img, sx, sy, s, s, n.x - r, n.y - r, r * 2, r * 2);
        ctx!.restore();
      } else {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = n.accent;
        ctx!.fill();
      }

      // School-accent ring — the graph's colour key, matching card borders.
      ctx!.beginPath();
      ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx!.lineWidth = isActive ? 3 : 2;
      ctx!.strokeStyle = n.accent;
      ctx!.stroke();
    }

    function draw() {
      const sim = simRef.current;
      ctx!.clearRect(0, 0, width, height);

      const activeSlug = hoverRef.current ?? selected;
      const highlight = activeSlug ? lineageOf(activeSlug, links) : null;
      const filter = schoolSet;

      const baseLine = isDark ? 'rgba(232, 226, 212, 0.16)' : 'rgba(58, 42, 18, 0.14)';
      const baseText = isDark ? 'rgba(240, 234, 220, 0.82)' : 'rgba(44, 32, 12, 0.85)';
      const dimText = isDark ? 'rgba(240, 234, 220, 0.25)' : 'rgba(44, 32, 12, 0.25)';
      const labelHalo = isDark ? 'rgba(16, 12, 6, 0.85)' : 'rgba(250, 247, 242, 0.9)';

      dashRef.current -= 0.35;

      // Edges first.
      for (const link of linkPairs) {
        const s = link.source();
        const p = link.target();
        if (!s || !p) continue;

        const inLineage =
          highlight !== null && highlight.has(link.sourceSlug) && highlight.has(link.targetSlug);
        const inFilter =
          filter !== null && filter.has(link.sourceSlug) && filter.has(link.targetSlug);
        const emphasized = highlight ? inLineage : filter ? inFilter : false;
        const dimmed = (highlight !== null || filter !== null) && !emphasized;

        const dx = p.x - s.x;
        const dy = p.y - s.y;
        const d = Math.max(1, Math.sqrt(dx * dx + dy * dy));
        const ux = dx / d;
        const uy = dy / d;
        const x1 = s.x + ux * (nodeRadius(s) + 3);
        const y1 = s.y + uy * (nodeRadius(s) + 3);
        const x2 = p.x - ux * (nodeRadius(p) + 7);
        const y2 = p.y - uy * (nodeRadius(p) + 7);

        ctx!.beginPath();
        ctx!.moveTo(x1, y1);
        // Slight curve so mutual influences (Sartre ⇄ Beauvoir) don't overlap.
        const mx = (x1 + x2) / 2 - uy * 14;
        const my = (y1 + y2) / 2 + ux * 14;
        ctx!.quadraticCurveTo(mx, my, x2, y2);

        if (emphasized) {
          const gradient = ctx!.createLinearGradient(x1, y1, x2, y2);
          gradient.addColorStop(0, s.accent);
          gradient.addColorStop(1, p.accent);
          ctx!.strokeStyle = gradient;
          ctx!.lineWidth = 2;
          ctx!.setLineDash([7, 5]);
          ctx!.lineDashOffset = dashRef.current;
        } else {
          ctx!.strokeStyle = baseLine;
          ctx!.lineWidth = 1.2;
          ctx!.setLineDash([]);
          ctx!.globalAlpha = dimmed ? 0.25 : 1;
        }
        ctx!.stroke();
        ctx!.setLineDash([]);
        ctx!.globalAlpha = 1;

        // Arrowhead at the influenced end.
        const angle = Math.atan2(y2 - my, x2 - mx);
        ctx!.beginPath();
        ctx!.moveTo(x2, y2);
        ctx!.lineTo(x2 - 8 * Math.cos(angle - 0.42), y2 - 8 * Math.sin(angle - 0.42));
        ctx!.lineTo(x2 - 8 * Math.cos(angle + 0.42), y2 - 8 * Math.sin(angle + 0.42));
        ctx!.closePath();
        ctx!.fillStyle = emphasized ? p.accent : baseLine;
        ctx!.globalAlpha = dimmed ? 0.25 : 1;
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }

      // Nodes on top of the edges…
      const emphasis = sim.map((n) => {
        const inHighlight = highlight?.has(n.slug) ?? false;
        const inFilter = filter?.has(n.slug) ?? false;
        return highlight ? inHighlight : filter ? inFilter : true;
      });
      sim.forEach((n, i) => drawNode(n, emphasis[i], n.slug === activeSlug));

      // …and labels on top of every node, so no neighbour can cover a name.
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'top';
      ctx!.globalAlpha = 1;
      sim.forEach((n, i) => {
        const isActive = n.slug === activeSlug;
        const label = t(n.philosopher.name, locale);
        ctx!.font = `${isActive ? '600 12px' : '500 11px'} ${labelFont}`;
        // Halo behind the text keeps names legible over edges and figures.
        ctx!.lineWidth = 3;
        ctx!.strokeStyle = labelHalo;
        ctx!.strokeText(label, n.x, n.y + nodeRadius(n) + 6);
        ctx!.fillStyle = emphasis[i] ? baseText : dimText;
        ctx!.fillText(label, n.x, n.y + nodeRadius(n) + 6);
      });
    }

    function loop() {
      if (alphaRef.current > 0) tick();
      draw();
      // Keep animating while forces are alive or dashed lineage arrows run.
      const needsMotion = alphaRef.current > 0 || hoverRef.current !== null || selected !== null;
      if (needsMotion && !reducedMotion) {
        raf = requestAnimationFrame(loop);
      } else if (alphaRef.current > 0 && reducedMotion) {
        // Reduced motion: settle instantly, render once.
        while (alphaRef.current > 0) tick();
        draw();
      }
    }

    redrawRef.current = () => {
      cancelAnimationFrame(raf);
      loop();
    };

    function resize() {
      const rect = container!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (simRef.current.length === 0) {
        seed();
      } else {
        alphaRef.current = Math.max(alphaRef.current, 0.3);
      }
      cancelAnimationFrame(raf);
      loop();
    }

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    const hitTest = (event: PointerEvent): SimNode | null => {
      const rect = canvas!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      let best: SimNode | null = null;
      let bestD = Infinity;
      for (const n of simRef.current) {
        const d = Math.hypot(n.x - x, n.y - y);
        if (d < nodeRadius(n) + 8 && d < bestD) {
          best = n;
          bestD = d;
        }
      }
      return best;
    };

    const onPointerDown = (event: PointerEvent) => {
      const node = hitTest(event);
      if (node) {
        dragRef.current = { slug: node.slug, moved: false };
        canvas!.setPointerCapture(event.pointerId);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (drag) {
        const rect = canvas!.getBoundingClientRect();
        const node = simRef.current.find((n) => n.slug === drag.slug);
        if (node) {
          node.x = Math.min(width - 12, Math.max(12, event.clientX - rect.left));
          node.y = Math.min(height - 24, Math.max(12, event.clientY - rect.top));
          drag.moved = true;
          alphaRef.current = Math.max(alphaRef.current, 0.25);
          cancelAnimationFrame(raf);
          loop();
        }
        return;
      }
      const node = hitTest(event);
      hoverRef.current = node?.slug ?? null;
      canvas!.style.cursor = node ? 'pointer' : 'default';
      cancelAnimationFrame(raf);
      loop();
    };

    const onPointerUp = (event: PointerEvent) => {
      const drag = dragRef.current;
      dragRef.current = null;
      if (drag && !drag.moved) {
        setSelected((current) => (current === drag.slug ? null : drag.slug));
      } else if (!drag) {
        const node = hitTest(event);
        if (!node) setSelected(null);
      }
      cancelAnimationFrame(raf);
      loop();
    };

    const onPointerLeave = () => {
      hoverRef.current = null;
      cancelAnimationFrame(raf);
      loop();
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      redrawRef.current = null;
      observer.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [nodes, links, locale, isDark, selected, schoolSet]);

  const influencedByNodes = selectedNode
    ? selectedNode.philosopher.influencedBy
        .map((slug) => nodes.find((n) => n.slug === slug))
        .filter((n): n is GraphNode => Boolean(n))
    : [];
  const influencedNodes = selectedNode
    ? nodes.filter((n) => n.philosopher.influencedBy.includes(selectedNode.slug))
    : [];

  return (
    <div className="space-y-3">
      {/* School filter — the same isometric scene art used by the dashboard hero. */}
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label={t(dict.schools, locale)}
      >
        {schools.map((school) => {
          const active = schoolFilter === school.slug;
          return (
            <button
              key={school.slug}
              type="button"
              onClick={() => setSchoolFilter(active ? null : school.slug)}
              aria-pressed={active}
              className={`flex items-center gap-2 rounded border py-1 pl-1 pr-2.5 text-[11px] uppercase tracking-wider transition-all ${
                active
                  ? 'border-transparent text-white shadow-card'
                  : 'border-gold-500/30 opacity-80 hover:opacity-100'
              }`}
              style={active ? { backgroundColor: school.accent } : undefined}
            >
              <Image
                src={`/scenes/${school.slug}.png`}
                alt=""
                width={22}
                height={22}
                className="h-[22px] w-[22px] rounded border object-cover"
                style={{ borderColor: active ? 'rgba(255,255,255,0.7)' : school.accent }}
              />
              {t(school.name, locale)}
            </button>
          );
        })}
      </div>

      <div
        ref={containerRef}
        className="relative h-[480px] w-full overflow-hidden rounded-md border border-gold-500/25 bg-white/40 shadow-card dark:bg-midnight-800/40 sm:h-[540px] md:h-[600px]"
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full touch-none"
          role="img"
          aria-label={t(dict.graphCanvasAlt, locale)}
        />
        {/* Same overlay-hint pattern as the philosopher hero's caption. */}
        {!selectedNode && (
          <>
            <p className="pointer-events-none absolute bottom-3 left-0 right-0 hidden text-center text-[10px] uppercase tracking-[0.25em] opacity-50 sm:block">
              {t(dict.graphHint, locale)}
            </p>
            <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[10px] uppercase tracking-[0.25em] opacity-50 sm:hidden">
              {t(dict.graphHintMobile, locale)}
            </p>
          </>
        )}

        {selectedNode && (
          <aside
            className="absolute bottom-3 left-3 right-3 max-w-md animate-fade-up rounded-md border border-gold-500/30 bg-parchment-50 p-4 shadow-plinth dark:bg-midnight-900 sm:right-auto"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              {selectedNode.philosopher.figureImage && (
                <Image
                  src={selectedNode.philosopher.figureImage}
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 rounded border object-cover"
                  style={{ borderColor: selectedNode.accent }}
                />
              )}
              <div className="min-w-0">
                <p className="font-display text-lg leading-tight">
                  {t(selectedNode.philosopher.name, locale)}
                </p>
                <p className="truncate text-xs italic opacity-70">
                  {t(selectedNode.philosopher.epithet, locale)}
                </p>
                <p className="text-[10px] uppercase tracking-[0.18em] opacity-50">
                  {t(selectedNode.philosopher.years, locale)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label={t(dict.close, locale)}
                className="ml-auto shrink-0 rounded border border-gold-500/40 px-2 py-0.5 text-xs hover:bg-gold-500/10"
              >
                ✕
              </button>
            </div>

            <dl className="mt-3 space-y-1.5 text-xs">
              <div className="flex flex-wrap items-baseline gap-1.5">
                <dt className="uppercase tracking-wider opacity-50">
                  {t(dict.influencedByLabel, locale)}:
                </dt>
                <dd className="flex flex-wrap gap-1">
                  {influencedByNodes.length > 0 ? (
                    influencedByNodes.map((n) => (
                      <button
                        key={n.slug}
                        type="button"
                        onClick={() => setSelected(n.slug)}
                        className="rounded border border-gold-500/30 px-2 py-0.5 hover:bg-gold-500/10"
                      >
                        {t(n.philosopher.name, locale)}
                      </button>
                    ))
                  ) : (
                    <span className="opacity-60">{t(dict.noInfluences, locale)}</span>
                  )}
                </dd>
              </div>
              {influencedNodes.length > 0 && (
                <div className="flex flex-wrap items-baseline gap-1.5">
                  <dt className="uppercase tracking-wider opacity-50">
                    {t(dict.influencedLabel, locale)}:
                  </dt>
                  <dd className="flex flex-wrap gap-1">
                    {influencedNodes.map((n) => (
                      <button
                        key={n.slug}
                        type="button"
                        onClick={() => setSelected(n.slug)}
                        className="rounded border border-gold-500/30 px-2 py-0.5 hover:bg-gold-500/10"
                      >
                        {t(n.philosopher.name, locale)}
                      </button>
                    ))}
                  </dd>
                </div>
              )}
            </dl>

            <button
              type="button"
              onClick={() => setProfile(selectedNode.philosopher)}
              className="mt-3 inline-block rounded bg-gold-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105 dark:bg-gold-400 dark:text-midnight-900"
            >
              {t(dict.viewProfile, locale)} →
            </button>
          </aside>
        )}
      </div>

      {/* Dossier card + quiz — the dashboard's own modals, tinted with the
          philosopher's school accent. */}
      <div
        style={
          {
            '--accent-base':
              nodes.find((n) => n.slug === (profile ?? quizFor)?.slug)?.accent ?? '#c2922f',
            '--panel-pad': 'clamp(22px, 2vw, 32px)',
          } as CSSProperties
        }
      >
        <PhilosopherModal
          p={profile}
          open={!!profile}
          onClose={() => setProfile(null)}
          onQuiz={(p) => {
            setProfile(null);
            setQuizFor(p);
          }}
          locale={locale}
        />
        <QuizModal
          open={!!quizFor}
          onClose={() => setQuizFor(null)}
          pool={quizFor ? getQuestionsFor(quizFor.slug) : []}
          title={quizFor ? t(quizFor.name, locale) : ''}
          scoreKey={quizFor?.slug ?? ''}
          locale={locale}
        />
      </div>

      {/* Accessible / crawlable mirror of the graph: every relation as a
          button that opens the same dossier card as the canvas nodes —
          no navigation to a dedicated page. */}
      <section className="space-y-6">
        <SectionHeading>{t(dict.lineageIndex, locale)}</SectionHeading>
        <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {nodes.map((n) => {
            const heirs = influencedList(n.slug);
            const influencedByNodes = n.philosopher.influencedBy
              .map((slug) => nodes.find((other) => other.slug === slug))
              .filter((other): other is GraphNode => Boolean(other));
            return (
              <li
                key={n.slug}
                className="rounded-md border border-gold-500/20 bg-white/50 p-4 text-sm shadow-card dark:bg-midnight-800/50"
              >
                <button
                  type="button"
                  onClick={() => setProfile(n.philosopher)}
                  className="font-display text-base hover:text-gold-600 dark:hover:text-gold-300"
                >
                  {t(n.philosopher.name, locale)}
                </button>
                <dl className="mt-2 space-y-1 text-xs">
                  <div>
                    <dt className="inline uppercase tracking-wider opacity-50">
                      {t(dict.influencedByLabel, locale)}:{' '}
                    </dt>
                    <dd className="inline">
                      {influencedByNodes.length > 0 ? (
                        influencedByNodes.map((other, i) => (
                          <span key={other.slug}>
                            {i > 0 && ', '}
                            <button
                              type="button"
                              onClick={() => setProfile(other.philosopher)}
                              className="underline decoration-gold-500/40 underline-offset-2 hover:text-gold-600"
                            >
                              {t(other.philosopher.name, locale)}
                            </button>
                          </span>
                        ))
                      ) : (
                        <span className="opacity-60">{t(dict.noInfluences, locale)}</span>
                      )}
                    </dd>
                  </div>
                  {heirs.length > 0 && (
                    <div>
                      <dt className="inline uppercase tracking-wider opacity-50">
                        {t(dict.influencedLabel, locale)}:{' '}
                      </dt>
                      <dd className="inline">
                        {heirs.map((other, i) => (
                          <span key={other.slug}>
                            {i > 0 && ', '}
                            <button
                              type="button"
                              onClick={() => setProfile(other)}
                              className="underline decoration-gold-500/40 underline-offset-2 hover:text-gold-600"
                            >
                              {t(other.name, locale)}
                            </button>
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
