import { Link } from "@/i18n/navigation";
import { routes } from "@/config/nav";

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const color = variant === "light" ? "text-white" : "text-navy";
  return (
    <Link
      href={routes.home}
      className={`flex items-center gap-2 ${color}`}
      aria-label="AFT — Arts For Tomorrow, home"
    >
      <span className="text-xl font-extrabold tracking-tight">AFT</span>
      <span className="hidden text-[10px] font-medium uppercase leading-tight tracking-[0.15em] opacity-70 sm:block">
        Arts For
        <br />
        Tomorrow
      </span>
    </Link>
  );
}
