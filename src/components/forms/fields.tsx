"use client";

import type { ReactNode } from "react";

// Generate a submission reference like "PTR-123456". Kept at module scope
// (not inside a component) so React Compiler's purity rule doesn't flag the
// Math.random() call. Placeholder until the form backend issues real refs.
export function makeRef(prefix: string, digits = 6): string {
  const max = 10 ** digits;
  const min = max / 10;
  return `${prefix}-${Math.floor(Math.random() * (max - min) + min)}`;
}

// Shared form primitives reused across inquiry forms (Venue, Partnership, etc.).
export const inputClass =
  "w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

export function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      {children}
      {hint && !error && (
        <span className="mt-1 block text-xs text-muted">{hint}</span>
      )}
      {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </label>
  );
}

// A titled section within a single-page inquiry form (기획서 §9 폼 공통 구조).
export function FormSection({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-line pb-8 last:border-0 last:pb-0">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-accent text-xs font-bold text-ink">
          {step}
        </span>
        <h2 className="text-lg font-bold text-ink">{title}</h2>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export function SubmittedCard({
  title,
  body,
  note,
  refId,
  refLabel,
  onReset,
  resetLabel,
}: {
  title: string;
  body: string;
  note?: string;
  refId?: string;
  refLabel?: string;
  onReset?: () => void;
  resetLabel?: string;
}) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-10 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-2xl">
        ✓
      </div>
      <h2 className="mt-5 text-2xl font-bold text-ink">{title}</h2>
      <p className="mt-3 text-muted">{body}</p>
      {refId && (
        <p className="mt-4 text-sm">
          {refLabel}: <span className="font-mono font-bold">{refId}</span>
        </p>
      )}
      {note && <p className="mt-3 text-xs text-muted">{note}</p>}
      {onReset && (
        <button type="button" onClick={onReset} className="btn-text mt-5">
          {resetLabel}
        </button>
      )}
    </div>
  );
}
