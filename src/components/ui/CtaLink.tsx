"use client";

import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { CtaArrow } from "@/components/ui/CtaArrow";
import { track, type AftEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "secondary-dark" | "text";

const classes: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  "secondary-dark": "btn-secondary-dark",
  text: "btn-text",
};

// A CTA that optionally fires a 기획서 §11.1 conversion event on click.
export function CtaLink({
  href,
  children,
  variant = "primary",
  event,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  event?: AftEvent;
}) {
  return (
    <Link
      href={href}
      className={classes[variant]}
      onClick={event ? () => track(event, { source: "cta" }) : undefined}
    >
      {children}
      {variant === "text" && <CtaArrow />}
    </Link>
  );
}
