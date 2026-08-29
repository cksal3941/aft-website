import { AftImage } from "@/components/ui/AftImage";
import { homeHeroVideo } from "@/config/media";

// Full-bleed HERO backdrop. Renders the activity reel when a video file exists,
// falls back to a poster still, then to the navy gradient — so the hero always
// looks intact until the edited video is dropped into public/videos/.
export function HeroVideo() {
  const overlay = (
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/85 to-black/40" />
  );

  if (homeHeroVideo.src) {
    const mobileSrc = homeHeroVideo.srcMobile;
    return (
      <>
        {/* Portrait (9:16) on phones */}
        {mobileSrc && (
          <video
            className="absolute inset-0 -z-10 h-full w-full object-cover sm:hidden"
            autoPlay
            muted
            loop
            playsInline
            poster={homeHeroVideo.poster ?? undefined}
          >
            <source src={mobileSrc} type="video/mp4" />
          </video>
        )}
        {/* Landscape (16:9) on tablet/desktop */}
        <video
          className={`absolute inset-0 -z-10 h-full w-full object-cover ${
            mobileSrc ? "hidden sm:block" : ""
          }`}
          autoPlay
          muted
          loop
          playsInline
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
