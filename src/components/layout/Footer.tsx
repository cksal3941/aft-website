import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { routes } from "@/config/nav";

export function Footer() {
  const t = useTranslations("footer");
  // Link labels reuse the `nav` namespace so footer and header never drift apart.
  const nav = useTranslations("nav");

  const columns = [
    {
      title: t("explore"),
      links: [
        { label: nav("about"), href: routes.about },
        { label: nav("projects"), href: routes.projects },
        { label: nav("impact"), href: routes.impact },
        { label: nav("globalNetwork"), href: routes.globalNetwork },
        { label: nav("news"), href: routes.stories },
      ],
    },
    {
      title: t("getInvolved"),
      links: [
        { label: nav("youth"), href: routes.join },
        { label: nav("sub.advisor"), href: routes.advisor },
        { label: nav("partners"), href: routes.partners },
        { label: nav("donate"), href: routes.support },
        { label: nav("contact"), href: routes.contact },
      ],
    },
  ];

  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="container-aft grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:gap-10">
        <div className="col-span-2 md:col-span-1">
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm text-white/60">{t("legalNote")}</p>
          <a
            href={`mailto:${t("email")}`}
            className="mt-4 inline-block text-sm text-white/60 hover:text-white"
          >
            {t("emailLabel")}: {t("email")}
          </a>
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
        <div className="container-aft flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 {t("rights")}</span>
          <div className="flex gap-5">
            <Link href={routes.privacy} className="hover:text-white">
              {t("privacy")}
            </Link>
            <Link href={routes.terms} className="hover:text-white">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
