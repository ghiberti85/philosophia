export function SectionHeading({
  children,
  as: Tag = 'h2',
}: {
  children: React.ReactNode;
  /** Heading level — use "h1" for the page title so every page has exactly one h1. */
  as?: 'h1' | 'h2';
}) {
  return (
    <div className="ornament flex items-center gap-4">
      <Tag className="shrink-0 text-center font-display text-2xl tracking-wide md:text-3xl">
        {children}
      </Tag>
    </div>
  );
}
