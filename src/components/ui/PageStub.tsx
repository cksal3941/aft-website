import type { ReactNode } from "react";
import { SectionHeading } from "./SectionHeading";
import { PageHero } from "./PageHero";
import { media } from "@/config/media";

// Temporary scaffold for screens not yet built out. Keeps navigation and the
// build valid while each 기획서 screen is implemented in priority order.
export function PageStub({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="bg-white">
      <PageHero
        image={media.aboutHero}
        eyebrow={eyebrow}
        title={title}
        subtitle={description}
      />
      <section className="py-16">
        <div className="container-aft">
          {children ?? (
            <div className="rounded-sm border border-dashed border-line bg-surface p-10 text-center text-muted">
              <SectionHeading title="화면 준비 중" centered />
              <p className="mt-3 text-sm">
                이 화면은 기획서 순서에 따라 곧 구현됩니다.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
