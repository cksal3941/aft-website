import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  centered = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : undefined}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}
