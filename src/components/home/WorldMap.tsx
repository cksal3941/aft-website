import { AftImage } from "@/components/ui/AftImage";
import { media } from "@/config/media";

// 09 · FROM SEOUL TO THE WORLD.
// Honest "open network" motif — Seoul is the one real, highlighted node.
// The other dots are intentionally UNLABELED: they signal an open world, not
// claimed AFT branches. Drop a real map into media.worldMap to replace this.
export function WorldMap({ seoulLabel }: { seoulLabel: string }) {
  if (media.worldMap.src) {
    return (
      <AftImage
        src={media.worldMap.src}
        alt={media.worldMap.alt}
        sizes="100vw"
        className="aspect-[16/7] w-full rounded-sm"
        noZoom
      />
    );
  }

  // viewBox is 100 (x) × 44 (y) to match the 16:7 container.
  const seoul = { x: 74, y: 22 };
  const nodes = [
    { x: 14, y: 16 },
    { x: 26, y: 30 },
    { x: 40, y: 12 },
    { x: 52, y: 26 },
    { x: 60, y: 34 },
    { x: 86, y: 30 },
    { x: 66, y: 19 },
    { x: 20, y: 38 },
  ];

  return (
    <div className="relative aspect-[16/7] w-full overflow-hidden rounded-sm bg-white ring-1 ring-line">
      <svg
        viewBox="0 0 100 44"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {nodes.map((n, i) => (
          <line
            key={`l${i}`}
            x1={seoul.x}
            y1={seoul.y}
            x2={n.x}
            y2={n.y}
            className="stroke-navy/15"
            strokeWidth="0.2"
          />
        ))}
        {nodes.map((n, i) => (
          <circle key={`n${i}`} cx={n.x} cy={n.y} r="0.7" className="fill-navy/30" />
        ))}
        <circle cx={seoul.x} cy={seoul.y} r="2.6" className="fill-accent/25" />
        <circle cx={seoul.x} cy={seoul.y} r="1.1" className="fill-accent" />
      </svg>
      <span
        className="absolute -translate-x-1/2 text-[11px] font-bold uppercase tracking-wide text-accent"
        style={{ left: "74%", top: "58%" }}
      >
        {seoulLabel}
      </span>
    </div>
  );
}
