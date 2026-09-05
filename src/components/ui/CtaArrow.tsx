import { FiChevronRight } from "react-icons/fi";

// Shared CTA affordance arrow — a single simple chevron (>), used everywhere a
// link/row points forward. The `cta-arrow` class provides the hover nudge
// (see globals.css). Inline-sized to the surrounding text by default; pass
// `className` to resize/recolor (e.g. standalone list rows).
export function CtaArrow({ className = "" }: { className?: string }) {
  return (
    <FiChevronRight
      aria-hidden
      className={`cta-arrow inline-block shrink-0 align-[-0.125em] ${className}`}
    />
  );
}
