"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Site-wide scroll animation (GSAP + ScrollTrigger). For every <section> under
// <main>, its text blocks (headings, paragraphs, eyebrows, list items) AND its
// images fade up in a gentle stagger as the section scrolls into view. Sections
// already on the first screen are left untouched (no flash).
//
// Uses fromTo (explicit start AND end) so the target opacity is always 1 — under
// React StrictMode's double-invoke a plain from: can record a prior tween's
// opacity:0 as its "natural" end and strand the text hidden. Cleanup kills every
// tween + its ScrollTrigger and clears inline props for a clean re-run.
const TEXT_SELECTOR = [
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "li",
  "blockquote",
  "[data-reveal]",
  "[class*='eyebrow']",
].join(", ");

// The elements to fade up in a section, in document order for a coherent stagger.
// For images we animate the AftImage WRAPPER (the div that holds a `fill`
// <img>), never the <img> itself — the image is absolutely positioned inside an
// overflow-hidden box, so moving it would reveal a gap; moving the box is safe.
function revealTargets(section: HTMLElement): HTMLElement[] {
  const set = new Set<HTMLElement>(
    Array.from(section.querySelectorAll<HTMLElement>(TEXT_SELECTOR))
  );
  section.querySelectorAll("img").forEach((img) => {
    const wrapper = img.parentElement;
    // Only animate dedicated image boxes (e.g. the AftImage wrapper). Skip a
    // wrapper that also holds text — that container's text animates on its own,
    // and moving the whole box would double-transform / fight the layout.
    if (wrapper && wrapper !== section && !wrapper.querySelector(TEXT_SELECTOR)) {
      set.add(wrapper);
    }
  });
  const targets = Array.from(set);
  targets.sort((a, b) =>
    a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
  );
  return targets.length ? targets : [section];
}

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const tweens: gsap.core.Tween[] = [];
    const sections = gsap.utils.toArray<HTMLElement>("main section");

    sections.forEach((section) => {
      // Leave the first screen as-is — animating it would flash on load.
      if (section.getBoundingClientRect().top < window.innerHeight * 0.85) {
        return;
      }

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
