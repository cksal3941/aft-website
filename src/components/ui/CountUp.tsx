"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Scroll-triggered number count-up (GSAP + ScrollTrigger). Animates from 0 up to
// the numeric part of `value` when the element scrolls into view, once.
//
// `value` is a display string that may carry a non-numeric prefix and/or suffix
// around the number — e.g. "28", "158", "₩1,000,000", "500+". We parse those
// affixes out, tween the number, and re-assemble on every frame so currency
// symbols, thousands separators, and trailing marks are preserved.
//
// The number is rendered server-side as its FINAL value, so crawlers and the
// no-JS / prefers-reduced-motion path always see the real figure — the effect
// only rewrites it downward-to-up once the client tween takes over.
export function CountUp({
  value,
  className,
  duration = 1.8,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Split into: prefix (non-digits) · digits+commas · suffix (rest).
    const match = value.match(/^(\D*)([\d,]+)(.*)$/);
    if (!match) return; // no number to animate — leave the SSR text as-is
    const [, prefix, numStr, suffix] = match;
    const target = Number(numStr.replace(/,/g, ""));
    if (!Number.isFinite(target)) return;

    const grouped = numStr.includes(",");
    const format = (n: number) => {
      const rounded = Math.round(n);
      const body = grouped ? rounded.toLocaleString("en-US") : String(rounded);
      return `${prefix}${body}${suffix}`;
    };

    // Respect reduced-motion — keep the final value, no animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const counter = { v: 0 };
    el.textContent = format(0);

    const tween = gsap.to(counter, {
      v: target,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = format(counter.v);
      },
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      el.textContent = value; // restore final value on cleanup / locale change
    };
  }, [value, duration]);

  // Reserve the final value's width (hidden twin) and overlay the animating
  // number centered on top of it. This keeps the box a fixed size for the whole
  // count-up, so the label and icon below never shift. `tabular-nums` gives each
  // digit an equal advance width, killing the sub-pixel jitter between frames.
  return (
    <span className={`relative inline-block tabular-nums ${className ?? ""}`}>
      <span aria-hidden className="invisible">
        {value}
      </span>
      <span
        ref={ref}
        className="absolute inset-0 flex items-center justify-center"
      >
        {value}
      </span>
    </span>
  );
}
