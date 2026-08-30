import type { ReactNode } from "react";
import { SectionHeading } from "./SectionHeading";

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
    <div className="bg-[#f8fafc]">
      <section className="bg-navy py-16 text-white">
        <div className="container-aft">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{title}</h1>
          {description && (
            <p className="mt-4 max-w-2xl text-white/75">{description}</p>
          )}
        </div>
      </section>
      <section className="py-16">
        <div className="container-aft">
          {children ?? (
            <div className="rounded-xl border border-dashed border-line bg-surface p-10 text-center text-muted">
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
