"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { AftImage } from "@/components/ui/AftImage";

type Slide = {
  src?: string | null;
  alt?: string;
  no: string;
  title: string;
  body: string;
  objectPosition?: string;
};

// Multi-item auto-sliding carousel (Embla) for "Where Our Story Began".
// Shows 3 cards at once on desktop; each card binds a photo to its journey step.
export function StoryCarousel({ slides }: { slides: Slide[] }) {
  const t = useTranslations("carousel");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3200, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();

    const autoplay = emblaApi.plugins()?.autoplay;
    // WCAG 2.2.2: give users control over auto-moving content. Under
    // prefers-reduced-motion, don't autoplay at all — let them opt in.
    if (
      autoplay &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      autoplay.stop();
      setPlaying(false);
    }

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Our own `playing` flag is the source of truth (the plugin's isPlaying() can
  // report transient hover/background states). Flip it and drive the plugin to
  // match, so the button always reflects the user's explicit play/pause choice.
  const toggle = () => {
    setPlaying((prev) => {
      const next = !prev;
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (autoplay) {
        if (next) autoplay.play();
        else autoplay.stop();
      }
      return next;
    });
  };

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-5 flex">
          {slides.map((s, idx) => (
            <div
              key={idx}
              className="min-w-0 shrink-0 grow-0 basis-full pl-5 sm:basis-1/2 lg:basis-1/3"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-sm">
                <AftImage
                  src={s.src}
                  alt={s.alt}
                  className="h-full w-full"
                  objectPosition={s.objectPosition}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="mt-4">
                <span className="text-xl font-extrabold text-accent">{s.no}</span>
                <h3 className="mt-1 text-base font-bold uppercase tracking-wide text-ink">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pause/play control + dot indicators */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? t("pause") : t("play")}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="flex gap-2.5">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={t("slide", { n: i + 1 })}
              aria-current={i === selected ? "true" : undefined}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === selected ? "bg-accent" : "bg-line hover:bg-muted/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
