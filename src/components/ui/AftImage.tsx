import Image from "next/image";

// Drop-in image slot. When `src` points to a real file (e.g. /images/home-hero.jpg)
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
}: {
  src?: string | null;
  alt?: string;
  label?: string;
  className?: string;
  tone?: "default" | "ocean";
  priority?: boolean;
  sizes?: string;
}) {
  const alternative = alt ?? label ?? "AFT";

  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alternative}
          fill
          sizes={sizes}
          className="object-cover"
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
