"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { AftImage } from "@/components/ui/AftImage";

type Slide = {
  src?: string | null;
  alt?: string;
  no: string;
  title: string;
  body: string;
};

// Multi-item auto-sliding carousel (Embla) for "Where Our Story Began".
// Shows 3 cards at once on desktop; each card binds a photo to its journey step.
export function StoryCarousel({ slides }: { slides: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3200, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

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

      {/* Dot indicators */}
      <div className="mt-6 flex justify-center gap-2.5">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`슬라이드 ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === selected ? "bg-accent" : "bg-line hover:bg-muted/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
