"use client";

import {
  useId,
  useMemo,
  useState,
  useEffect,
  isValidElement,
  cloneElement,
  type ReactNode,
  type ReactElement,
} from "react";
import { useLocale } from "next-intl";
import type { UseFormRegisterReturn } from "react-hook-form";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { COUNTRY_CODES } from "@/lib/countries";

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
  "w-full rounded-md border border-slate-400 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

// Selects: hide the native arrow and draw our own chevron with breathing room
// on both sides (the native arrow sat flush against the right edge). `pr-10`
// keeps the value clear of the chevron, positioned 0.85rem from the edge.
export const selectClass =
  inputClass +
  " appearance-none bg-no-repeat pr-10 [background-position:right_0.85rem_center] [background-size:1rem]" +
  " bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20fill=%22none%22%20viewBox=%220%200%2024%2024%22%20stroke=%22%2364748b%22%20stroke-width=%222%22%3E%3Cpath%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')]";

// Country picker — localized labels, English name stored as the value so form
// emails read consistently regardless of the submitter's locale.
export function CountrySelect({
  field,
  placeholder,
}: {
  field: UseFormRegisterReturn;
  placeholder: string;
}) {
  const locale = useLocale();
  // Country names/order come from Intl.DisplayNames, whose ICU data differs
  // between Node (SSR) and the browser — rendering them during hydration causes
  // a mismatch. Populate on the client only; SSR + first client render show just
  // the placeholder, so the markup matches.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const options = useMemo(() => {
    if (!mounted) return [];
    const loc = new Intl.DisplayNames([locale], { type: "region" });
    const en = new Intl.DisplayNames(["en"], { type: "region" });
    return COUNTRY_CODES.map((c) => ({
      value: en.of(c) ?? c,
      label: loc.of(c) ?? c,
    })).sort((a, b) => a.label.localeCompare(b.label, locale));
  }, [mounted, locale]);

  return (
    <select className={selectClass} {...field}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Field({
  label,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  // Tie the hint/error text to the control so screen readers announce it with
  // the field, and mark the field invalid/required programmatically.
  const describedBy =
    [error ? errorId : null, hint && !error ? hintId : null]
      .filter(Boolean)
      .join(" ") || undefined;
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        "aria-required": required || undefined,
      })
    : children;

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required && (
          <span aria-hidden className="text-accent-hover">
            {" "}
            *
          </span>
        )}
      </span>
      {control}
      {hint && !error && (
        <span id={hintId} className="mt-1 block text-xs text-muted">
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} role="alert" className="mt-1 block text-sm text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

// A titled section within a single-page inquiry form (기획서 §9 폼 공통 구조).
export function FormSection({
  step,
  title,
  children,
  last = false,
}: {
  step: string;
  title: string;
  children: ReactNode;
  /** Drop the bottom divider — the CSS `last:` can't reach it when a submit
      button follows the sections, so the final section passes this explicitly. */
  last?: boolean;
}) {
  return (
    <section className={last ? "" : "border-b border-line pb-8"}>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
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
    <div className="mx-auto max-w-xl rounded-sm border border-line bg-white p-10 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
        <CheckIcon className="h-7 w-7" />
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
