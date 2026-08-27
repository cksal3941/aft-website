import { media } from "@/config/media";

// 06 · FROM SEOUL TO THE WORLD — dotted world map.
// When media.worldMap.src is set, renders the real dotted map (CC BY 3.0 —
// sNowFleikuN, via Wikimedia Commons; attribution shown below the map) with
// Seoul highlighted. Falls back to a built-in dot-grid otherwise.
export function DottedWorldMap({ seoulLabel }: { seoulLabel: string }) {
  if (media.worldMap.src) {
    return (
      <div className="w-full">
        <div className="relative aspect-[8/5] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={media.worldMap.src}
            alt={media.worldMap.alt}
            className="h-full w-full object-contain"
          />
          {/* Seoul highlight (~East Asia) */}
          <span className="absolute" style={{ left: "81%", top: "35%" }}>
            <span className="relative flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/50" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-accent ring-2 ring-white" />
            </span>
            <span className="absolute left-5 -top-1 whitespace-nowrap text-[11px] font-bold uppercase tracking-wide text-accent-hover">
              {seoulLabel}
            </span>
          </span>
        </div>
        {/* CC BY 3.0 attribution (required) */}
        <p className="mt-2 text-right text-[10px] text-muted/50">
          Map:{" "}
          <a
            href="https://commons.wikimedia.org/wiki/File:World_map_(blue_dots).svg"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-muted"
          >
            sNowFleikuN
          </a>{" "}
          ·{" "}
          <a
            href="https://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-muted"
          >
            CC BY 3.0
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="relative aspect-[2/1] w-full">
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1.3px, transparent 1.6px)",
          backgroundSize: "16px 16px",
          color: "#c3cede",
        }}
      />
      {/* Seoul highlight (~East Asia) */}
      <span className="absolute" style={{ left: "72%", top: "40%" }}>
        <span className="relative flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/50" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-accent ring-2 ring-white" />
        </span>
        <span className="absolute left-5 -top-1 whitespace-nowrap text-[11px] font-bold uppercase tracking-wide text-accent-hover">
          {seoulLabel}
        </span>
      </span>
    </div>
  );
}
