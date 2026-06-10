export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="ornament flex items-center gap-4">
      <h2 className="shrink-0 text-center font-display text-2xl tracking-wide md:text-3xl">{children}</h2>
    </div>
  );
}
