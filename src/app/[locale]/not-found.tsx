import Link from 'next/link';

/**
 * Bilingual 404 — rendered inside the locale layout, but since the segment
 * params are not available in not-found pages we show both languages.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 pt-24 text-center">
      <p className="font-display text-7xl text-gold-500">Φ</p>
      <h1 className="font-display text-3xl">Lost in thought? · Perdido em pensamentos?</h1>
      <p className="max-w-md opacity-70">
        This page does not exist — or perhaps it has already changed. · Esta página não existe — ou
        talvez já tenha mudado.
      </p>
      <div className="flex gap-4">
        <Link href="/en" className="rounded-full border border-gold-500/50 px-6 py-2 uppercase tracking-wider hover:bg-gold-500/10">
          Return home
        </Link>
        <Link href="/pt" className="rounded-full border border-gold-500/50 px-6 py-2 uppercase tracking-wider hover:bg-gold-500/10">
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
