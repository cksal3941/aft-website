import { media } from "@/config/media";

// 06 · FROM SEOUL TO THE WORLD — dotted world map.
// When media.worldMap.src is set, renders the dotted world map (Pixabay Content
// License — GDJ; free, no attribution required) with Seoul highlighted.
// Falls back to a built-in dot-grid otherwise.
export function DottedWorldMap({ seoulLabel }: { seoulLabel: string }) {
  if (media.worldMap.src) {
    return (
      <div className="w-full overflow-hidden">
        <div className="relative aspect-[128/53] w-full -my-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={media.worldMap.src}
            alt={media.worldMap.alt}
            className="h-full w-full object-contain"
          />
          {/* Seoul highlight (~East Asia) */}
          <span className="absolute" style={{ left: "85%", top: "32%" }}>
            <span className="relative flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/50" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-accent ring-2 ring-white" />
            </span>
            <span className="absolute right-5 -top-2 whitespace-nowrap rounded bg-white/95 px-2 py-0.5 text-right text-xs font-bold uppercase tracking-wide text-accent-hover shadow-sm ring-1 ring-black/5">
              {seoulLabel}
            </span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[2/1] w-full">
      <div
        className="absolute inset-0 rounded-sm"
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
