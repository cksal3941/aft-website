// Thin analytics wrapper. The event names map to 기획서 §11.1 "필수 전환 이벤트".
// Swap the sink (console) for GA4 / Plausible / etc. later without touching call sites.

export type AftEvent =
  | "join_click"
  | "join_start"
  | "join_submit"
  | "project_view"
  | "apply_start"
  | "donate_start"
  | "donate_complete"
  | "partner_inquiry_submit"
  | "venue_offer_submit"
  | "report_download"
  | "language_switch";

type EventProps = Record<string, string | number | boolean | undefined>;

export function track(event: AftEvent, props: EventProps = {}): void {
  if (typeof window === "undefined") return;

  // Forward to a global analytics queue if present (e.g. GA4 dataLayer).
  const w = window as typeof window & {
    dataLayer?: unknown[];
  };
  w.dataLayer?.push({ event, ...props });

  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, props);
  }
}
