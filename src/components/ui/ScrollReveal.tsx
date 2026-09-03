"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Site-wide scroll animation (GSAP + ScrollTrigger). For every <section> under
// <main>, its top-level content BOXES fade up in a gentle stagger as the section
// scrolls into view. Sections already on the first screen are left untouched.
//
// The reveal unit is a whole box, never the individual text/icons inside it — so
// a card's icon + title + body (or a step's number + text) always move together
// instead of appearing one by one and looking disconnected.
//
// Uses fromTo (explicit start AND end) so the target opacity is always 1 — under
// React StrictMode's double-invoke a plain from: can record a prior tween's
// opacity:0 as its "natural" end and strand the content hidden. Cleanup kills
// every tween + its ScrollTrigger and clears inline props for a clean re-run.

// The reveal units for a section: the top-level content blocks (direct children
// of its `.container-aft`, or the section itself). A block that is itself a
// grid/list of items expands to those items, so cards/steps fade in as whole
// units and can stagger between each other — but everything INSIDE each box
// animates together (the box is the single animated element; its descendants
// simply ride along).
function revealTargets(section: HTMLElement): HTMLElement[] {
  const content =
    section.querySelector<HTMLElement>(".container-aft") ?? section;
  const children = Array.from(content.children).filter(
    (n): n is HTMLElement => n instanceof HTMLElement
  );

  const units: HTMLElement[] = [];
  for (const block of children) {
    const isGrid =
      block.tagName === "UL" ||
      block.tagName === "OL" ||
      /\bgrid\b/.test(block.className);
    const items = Array.from(block.children).filter(
      (n): n is HTMLElement => n instanceof HTMLElement
    );
    if (isGrid && items.length > 1) {
      units.push(...items);
    } else {
      units.push(block);
    }
  }
  return units.length ? units : [section];
}

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const tweens: gsap.core.Tween[] = [];
    const sections = gsap.utils.toArray<HTMLElement>("main section");

    sections.forEach((section, i) => {
      // Skip only the hero — the first section, and/or any section running its
      // own entrance ([data-hero], e.g. PageHero). Every other section fades up
      // on scroll, including the first content section directly below a short
      // sub-page hero (it enters as it comes into view, not with a flash).
      const isHero = i === 0 || section.querySelector("[data-hero]") !== null;
      if (isHero) return;

      const targets = revealTargets(section);

      tweens.push(
        gsap.fromTo(
          targets,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: { amount: 0.5, from: "start" },
            overwrite: "auto",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          }
        )
      );
    });

    // Recalculate positions once layout/fonts/images have settled.
    ScrollTrigger.refresh();

    // If the component initialised while the tab was in the background, Chrome
    // pauses the render lifecycle (IntersectionObserver / rAF), so ScrollTrigger
    // may have measured stale positions. Recalculate when the tab becomes
    // visible so the reveal is accurate the moment the user actually looks.
    const onVisible = () => {
      if (document.visibilityState === "visible") ScrollTrigger.refresh();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      tweens.forEach((tw) => {
        const targets = tw.targets() as HTMLElement[];
        tw.scrollTrigger?.kill();
        tw.kill();
        if (targets.length) {
          gsap.set(targets, { clearProps: "opacity,transform" });
        }
      });
    };
  }, [pathname]);

  return null;
}
