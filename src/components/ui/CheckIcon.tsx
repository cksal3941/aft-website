// Single source of truth for the check mark used site-wide (list bullets,
// success badges). A clean, minimal stroke check that inherits `currentColor`;
// size it with `h-*/w-*` utilities on `className`.
export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
