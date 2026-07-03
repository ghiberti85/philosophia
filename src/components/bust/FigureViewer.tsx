import Image from 'next/image';

/**
 * Hero panel of the philosopher detail page: the AI-generated figure image
 * over the same museum plaque used by the legacy 3D bust viewer. Rendering a
 * static image keeps the page fast and identical on every device — no WebGL,
 * no three.js chunk — which matters for the installed PWA.
 */
export function FigureViewer({ src, label, years }: { src: string; label: string; years: string }) {
  return (
    <figure className="w-full">
      <div className="bust-stage relative h-[300px] w-full overflow-hidden rounded-t-2xl border border-b-0 border-gold-500/25 sm:h-[380px] md:h-[480px] lg:h-[540px]">
        <Image
          src={src}
          alt={label}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain p-4"
        />
      </div>
      {/* Engraved museum plaque */}
      <figcaption className="bust-plaque rounded-b-2xl px-6 py-3 text-center">
        <span className="block font-display text-lg uppercase tracking-[0.3em] text-midnight-900 sm:text-xl">
          {label}
        </span>
        <span className="block text-[11px] uppercase tracking-[0.35em] text-midnight-900/70">
          {years}
        </span>
      </figcaption>
    </figure>
  );
}
