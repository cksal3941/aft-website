import Image from "next/image";
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
      <Image
        src="/images/aft-symbol.png"
        alt=""
        width={180}
        height={180}
        priority
        className="h-11 w-auto"
      />
      <span className="text-3xl font-extrabold tracking-tight">AFT</span>
      <span className="hidden leading-tight sm:block">
        <span className="block text-xs font-bold uppercase tracking-[0.15em]">
          Arts For Tomorrow
        </span>
        <span className="block text-[10px] font-medium tracking-tight">
          Global Youth Arts &amp; Impact Network
        </span>
      </span>
    </Link>
  );
}
