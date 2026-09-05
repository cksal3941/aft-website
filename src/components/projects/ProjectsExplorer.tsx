"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ProjectCard } from "./ProjectCard";
import type {
  LocalizedProject,
  ProjectStatus,
  ProjectMode,
} from "@/content/projects";

type Filters = {
  field: string;
  country: string;
  mode: string;
  status: string;
};

const EMPTY: Filters = { field: "", country: "", mode: "", status: "" };
const GROUP_ORDER: ProjectStatus[] = [
  "coming-soon",
  "open",
  "ongoing",
  "completed",
];

export function ProjectsExplorer({ items }: { items: LocalizedProject[] }) {
  const t = useTranslations("projects");
  const [filters, setFilters] = useState<Filters>(EMPTY);

  // Filter options derived from the data (기획서 §4: 분야·국가·형식·상태).
  const options = useMemo(() => {
    const uniq = (vals: string[]) => Array.from(new Set(vals));
    // Coming-soon teasers carry no real field/country/mode, so derive those
    // options from real projects only (keeps "—" out of the dropdowns). The
    // status filter still includes coming-soon so users can filter to it.
    const real = items.filter((p) => p.status !== "coming-soon");
    return {
      field: uniq(real.map((p) => p.field)),
      country: uniq(real.map((p) => p.country)),
      mode: uniq(real.map((p) => p.mode)),
      status: uniq(items.map((p) => p.status)),
    };
  }, [items]);

  const filtered = useMemo(
    () =>
      items.filter(
        (p) =>
          (!filters.field || p.field === filters.field) &&
          (!filters.country || p.country === filters.country) &&
          (!filters.mode || p.mode === filters.mode) &&
          (!filters.status || p.status === filters.status)
      ),
    [items, filters]
  );

  const grouped = useMemo(
    () =>
      GROUP_ORDER.map((status) => ({
        status,
        list: filtered.filter((p) => p.status === status),
      })).filter((g) => g.list.length > 0),
    [filtered]
  );

  const hasFilters = Object.values(filters).some(Boolean);

  function set<K extends keyof Filters>(key: K, value: string) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

  return (
    <div>
      {/* FILTER BAR — no background/border (sits directly on the page) */}
      <div className="flex flex-wrap items-end gap-4">
        <Select
          label={t("filter.field")}
          value={filters.field}
          onChange={(v) => set("field", v)}
          allLabel={t("filter.all")}
          options={options.field.map((v) => ({ value: v, label: v }))}
        />
        <Select
          label={t("filter.country")}
          value={filters.country}
          onChange={(v) => set("country", v)}
          allLabel={t("filter.all")}
          options={options.country.map((v) => ({ value: v, label: v }))}
        />
        <Select
          label={t("filter.mode")}
          value={filters.mode}
          onChange={(v) => set("mode", v)}
          allLabel={t("filter.all")}
          options={options.mode.map((v) => ({
            value: v,
            label: t(`mode.${v as ProjectMode}`),
          }))}
        />
        <Select
          label={t("filter.status")}
          value={filters.status}
          onChange={(v) => set("status", v)}
          allLabel={t("filter.all")}
          options={options.status.map((v) => ({
            value: v,
            label: t(`status.${v as ProjectStatus}`),
          }))}
        />
        <div className="ml-auto flex items-center gap-4">
          <span className="text-sm text-muted">
            {t("count", { count: filtered.length })}
          </span>
          {hasFilters && (
            <button
              type="button"
              onClick={() => setFilters(EMPTY)}
              className="btn-text"
            >
              {t("filter.reset")}
            </button>
          )}
        </div>
      </div>

      {/* RESULTS grouped by status */}
      {grouped.length === 0 ? (
        <p className="mt-12 text-center text-muted">{t("filter.empty")}</p>
      ) : (
        <div className="mt-10 space-y-12">
          {grouped.map((group) => (
            <section key={group.status}>
              <h2 className="mb-5 text-xl font-bold text-ink">
                {t(`groups.${group.status}`)}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.list.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  allLabel: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-semibold text-ink/70">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-[9rem] appearance-none rounded-md border border-slate-400 bg-white bg-no-repeat py-2 pl-3 pr-10 text-sm font-normal text-ink [background-position:right_0.85rem_center] [background-size:1rem] focus:border-accent focus:outline-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20fill=%22none%22%20viewBox=%220%200%2024%2024%22%20stroke=%22%2364748b%22%20stroke-width=%222%22%3E%3Cpath%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')]"
      >
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
