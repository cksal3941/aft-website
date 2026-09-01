"use client";

import type { ReactNode } from "react";

// "전달식 영상 보기" trigger. Plays the donation-section video (referenced by id),
// unmutes it, and scrolls it into view — so the button in the text column and the
// <video> in the media column stay decoupled (no shared ref / layout change).
export function DonationWatchButton({
  videoId,
  className,
  children,
}: {
  videoId: string;
  className?: string;
  children: ReactNode;
}) {
  const handleClick = () => {
    const video = document.getElementById(videoId) as HTMLVideoElement | null;
    if (!video) return;
    video.scrollIntoView({ behavior: "smooth", block: "center" });
    video.muted = false;
    video.controls = true;
    void video.play().catch(() => {
      // Autoplay-with-sound can be blocked; fall back to muted playback.
      video.muted = true;
      void video.play().catch(() => {});
    });
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
