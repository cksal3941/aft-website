import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  centered = false,
  centerOnMobile = false,
  onDark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  centered?: boolean;
  /** Center on mobile, left-align from md up. Ignored when `centered` is set. */
  centerOnMobile?: boolean;
  /** Use on dark (navy) sections: white title + a lighter eyebrow for contrast. */
  onDark?: boolean;
}) {
  const align = centered
    ? "text-center"
    : centerOnMobile
      ? "text-center md:text-left"
      : undefined;
  return (
    <div className={align}>
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
        className={`mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-4xl ${
          onDark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
