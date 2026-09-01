import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  centered = false,
  onDark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  centered?: boolean;
  /** Use on dark (navy) sections: white title + a lighter eyebrow for contrast. */
  onDark?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : undefined}>
      {eyebrow && (
        <p
          className={
            onDark
              ? "text-base font-bold uppercase tracking-[0.18em] text-emerald-300"
              : "eyebrow"
          }
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-2 text-2xl font-bold tracking-tight sm:text-3xl ${
          onDark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
