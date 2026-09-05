"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { AftImage } from "@/components/ui/AftImage";
import type { MediaSlot } from "@/config/media";

// Shared sub-page title header: full-bleed background image + black overlay,
// sitting behind the transparent header. Kept to a clean two-part hierarchy —
// the page NAME as the title and ONE supporting message — with a subtle
// staggered fade-up entrance (GSAP). The longer `subtitle` is intentionally not
// rendered so the hero stays uncluttered.
export function PageHero({
  eyebrow,
  title,
  image,
  children,
  animate = true,
}: {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  image?: MediaSlot;
  children?: ReactNode;
  /** Set false to render the hero statically (no staggered entrance). */
  animate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>("[data-hero]");
    const tween = gsap.fromTo(
      targets,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        overwrite: "auto",
      }
    );
    return () => {
      tween.kill();
      gsap.set(targets, { clearProps: "opacity,transform" });
    };
  }, [animate]);

  return (
    <section className="relative isolate -mt-20 flex min-h-[360px] items-center overflow-hidden bg-navy text-white md:min-h-[440px]">
      {image?.src && (
        <AftImage
          {...image}
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full rounded-none"
        />
      )}
      {/* Black transparent overlay for legibility over the photo */}
      <div className="absolute inset-0 bg-black/60" aria-hidden />
      {/* Fixed min-height + vertical centering keeps every sub-page hero the same
          size regardless of how much copy it holds. The top padding offsets the
          fixed 80px header the hero sits behind. */}
      <div
        ref={ref}
        className="relative z-10 w-full container-aft pt-20 pb-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          {/* Page name = the title */}
          <h1
            data-hero
            className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl"
          >
            {eyebrow ?? title}
          </h1>
          {/* One supporting message */}
          {eyebrow && title && (
            <p
              data-hero
              className="mt-4 text-base font-light leading-snug text-white/85 sm:text-lg"
            >
              {title}
            </p>
          )}
          {children && (
            <div
              data-hero
              className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
