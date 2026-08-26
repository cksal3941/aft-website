import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { routes } from "@/config/nav";

export function Footer() {
  const t = useTranslations("footer");

  const columns = [
    {
      title: t("about"),
      links: [
        { label: t("about"), href: routes.about },
        { label: t("contact"), href: routes.contact },
      ],
    },
    {
      title: t("privacy"),
      links: [{ label: t("privacy"), href: routes.about }],
    },
  ];

  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="container-aft grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm text-white/60">{t("legalNote")}</p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-aft py-5 text-xs text-white/50">
          © 2026 {t("rights")}
        </div>
      </div>
    </footer>
  );
}
