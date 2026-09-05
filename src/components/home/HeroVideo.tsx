"use client";

import { useEffect, useRef } from "react";
import { AftImage } from "@/components/ui/AftImage";
import { homeHeroVideo } from "@/config/media";

// Full-bleed HERO backdrop. Renders the activity reel when a video file exists,
// falls back to a poster still, then to the navy gradient — so the hero always
// looks intact until the edited video is dropped into public/videos/.
export function HeroVideo() {
  const mobileRef = useRef<HTMLVideoElement>(null);
  const desktopRef = useRef<HTMLVideoElement>(null);

  // muted + playsInline autoplays in most browsers, but iOS low-power mode and
  // some Android browsers still block it. Retry on mount and on the first user
  // interaction so the reel starts as soon as it's allowed.
  useEffect(() => {
    const tryPlay = () => {
      for (const v of [mobileRef.current, desktopRef.current]) {
        v?.play?.().catch(() => {});
      }
    };
    tryPlay();
    const onInteract = () => {
      tryPlay();
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("click", onInteract);
      window.removeEventListener("scroll", onInteract);
    };
    window.addEventListener("touchstart", onInteract, { passive: true });
    window.addEventListener("click", onInteract);
    window.addEventListener("scroll", onInteract, { passive: true });
    return cleanup;
  }, []);

  const overlay = (
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/50 to-black/40 lg:from-black lg:via-black/85 lg:to-black/40" />
  );

  if (homeHeroVideo.src) {
    const mobileSrc = homeHeroVideo.srcMobile;
    return (
      <>
        {/* Portrait (9:16) on phones */}
        {mobileSrc && (
          <video
            ref={mobileRef}
            className="absolute inset-0 -z-10 h-full w-full object-cover sm:hidden"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={homeHeroVideo.posterMobile ?? homeHeroVideo.poster ?? undefined}
          >
            <source src={mobileSrc} type="video/mp4" />
          </video>
        )}
        {/* Landscape (16:9) on tablet/desktop */}
        <video
          ref={desktopRef}
          className={`absolute inset-0 -z-10 h-full w-full object-cover ${
            mobileSrc ? "hidden sm:block" : ""
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={homeHeroVideo.poster ?? undefined}
        >
          <source src={homeHeroVideo.src} type="video/mp4" />
        </video>
        {overlay}
      </>
    );
  }

  if (homeHeroVideo.poster) {
    return (
      <>
        <AftImage
          src={homeHeroVideo.poster}
          alt="AFT youth turning creativity into action"
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 h-full w-full rounded-none"
        />
        {overlay}
      </>
    );
  }

  return (
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-deep via-navy to-navy-soft" />
  );
}
