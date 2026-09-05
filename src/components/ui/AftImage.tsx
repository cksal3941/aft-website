import Image from "next/image";

// Drop-in image slot. When `src` points to a real file (e.g. /images/home-featured.jpg)
// it renders an optimized next/image; otherwise it shows the gradient placeholder,
// so screens look intact until real youth artwork photos are added.
export function AftImage({
  src,
  alt,
  label,
  className = "",
  tone = "default",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  objectPosition,
  noZoom = false,
  zoomOnGroupHover = false,
}: {
  src?: string | null;
  alt?: string;
  label?: string;
  className?: string;
  tone?: "default" | "ocean";
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
  /** Opt out of the default hover zoom (e.g. maps, diagrams). */
  noZoom?: boolean;
  /** Zoom when the nearest `group` ancestor is hovered (whole card), rather
      than only when the image itself is hovered. */
  zoomOnGroupHover?: boolean;
}) {
  const alternative = alt ?? label ?? "AFT";

  if (src) {
    // `fill` needs a positioned ancestor. Default to `relative`, but if the
    // caller already positions the box (e.g. `absolute inset-0` background),
    // don't add `relative` — it would override the absolute and break the fill.
    const positioned = /\b(absolute|fixed)\b/.test(className);
    // Content images get a subtle zoom on hover (the wrapper's overflow-hidden
    // clips the growth). Title/hero images are marked `priority` and stay put.
    const hoverZoom =
      priority || noZoom
        ? ""
        : ` transition-transform duration-500 ease-out ${
            zoomOnGroupHover ? "group-hover:scale-105" : "hover:scale-105"
          }`;
    return (
      <div
        className={`${positioned ? "" : "relative"} overflow-hidden ${className}`}
      >
        <Image
          src={src}
          alt={alternative}
          fill
          sizes={sizes}
          className={`object-cover${hoverZoom}`}
          style={objectPosition ? { objectPosition } : undefined}
          priority={priority}
        />
      </div>
    );
  }

  const bg =
    tone === "ocean"
      ? "from-sky-600 to-cyan-800"
      : "from-slate-300 to-slate-400";
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br ${bg} ${className}`}
      role="img"
      aria-label={alternative}
    >
      {label && (
        <span className="px-4 text-center text-sm font-medium text-white/90">
          {label}
        </span>
      )}
    </div>
  );
}
