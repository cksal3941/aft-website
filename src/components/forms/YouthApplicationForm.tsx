"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routes } from "@/config/nav";
import { track } from "@/lib/analytics";
import { makeRef } from "./fields";
import { CheckIcon } from "@/components/ui/CheckIcon";

const ROLES = ["artist", "author", "designer", "planner", "leader"] as const;
const MODES = ["online", "offline", "either"] as const;
const INTERESTS = [
  "environment",
  "marine",
  "product",
  "publishing",
  "publicDesign",
  "performance",
] as const;

const DRAFT_KEY = "aft-youth-application";

// Fields validated when leaving each step (기획서 §3.1, §9.1).
const STEP_FIELDS = [
  ["role"],
  ["name", "birthYear", "country", "city", "language"],
  ["mode"],
  ["guardianName", "guardianEmail", "consentData"],
  [],
] as const;

export function YouthApplicationForm() {
  const t = useTranslations("apply");
  const tForms = useTranslations("forms");
  const tRoles = useTranslations("join.roles.items");
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [ref, setRef] = useState("");

  const schema = useMemo(
    () =>
      z.object({
        role: z.string().min(1, t("validation.required")),
        name: z.string().min(1, t("validation.required")),
        nameEn: z.string().optional().default(""),
        birthYear: z
          .string()
          .regex(/^(19|20)\d{2}$/, t("validation.birthYear")),
        country: z.string().min(1, t("validation.required")),
        city: z.string().min(1, t("validation.required")),
        language: z.string().min(1, t("validation.required")),
        interests: z.array(z.string()).default([]),
        mode: z.string().min(1, t("validation.required")),
        affiliation: z.string().optional().default(""),
        referral: z.string().optional().default(""),
        guardianName: z.string().min(1, t("validation.required")),
        guardianEmail: z.string().email(t("validation.email")),
        consentData: z
          .boolean()
          .refine((v) => v === true, t("fields.consentRequired")),
        consentMedia: z.boolean().default(false),
      }),
    [t]
  );

  type FormValues = z.input<typeof schema>;

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      role: "",
      name: "",
      nameEn: "",
      birthYear: "",
      country: "",
      city: "",
      language: "",
      interests: [],
      mode: "",
      affiliation: "",
      referral: "",
      guardianName: "",
      guardianEmail: "",
      consentData: false,
      consentMedia: false,
    },
  });

  // Restore draft (기획서 §9: 단계별 임시저장, §10.2: 뒤로가기 시 작성값 유지).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) reset({ ...getValues(), ...JSON.parse(raw) });
    } catch {
      /* ignore corrupt draft */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function persist() {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(getValues()));
    } catch {
      /* storage unavailable */
    }
  }

  async function next() {
    const fields = STEP_FIELDS[step] as unknown as (keyof FormValues)[];
    const ok = await trigger(fields);
    if (!ok) return;
    persist();
    setStep((s) => Math.min(s + 1, STEP_FIELDS.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 600));
    const birthYear = getValues("birthYear") || "0000";
    setRef(makeRef(`AFT-${birthYear}`, 4));
    setSubmitted(true);
    track("join_submit", { role: getValues("role") });
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-sm border border-line bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h2 className="mt-5 text-2xl font-bold text-ink">{t("done.title")}</h2>
        <p className="mt-3 text-muted">{t("done.body")}</p>
        <p className="mt-4 text-sm">
          {t("done.ref")}: <span className="font-mono font-bold">{ref}</span>
        </p>
        <div className="mt-6">
          <Link href={routes.projects} className="btn-primary">
            {t("done.cta")}
          </Link>
        </div>
      </div>
    );
  }

  const stepKeys = ["role", "basics", "interests", "consent", "review"] as const;
  const total = stepKeys.length;

  return (
    <div className="mx-auto max-w-2xl">
      {/* PROGRESS */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm font-semibold text-muted">
          <span>{t(`steps.${stepKeys[step]}`)}</span>
          <span>{t("progress", { current: step + 1, total })}</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${((step + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* STEP 1 — ROLE */}
        {step === 0 && (
          <Fieldset legend={t("fields.role")} error={errors.role?.message}>
            <div className="grid gap-3 sm:grid-cols-2">
              {ROLES.map((r) => (
                <label
                  key={r}
                  className="flex cursor-pointer items-start gap-3 rounded-md border border-slate-400 p-4 hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent-soft"
                >
                  <input
                    type="radio"
                    value={r}
                    {...register("role")}
                    className="mt-1 accent-[var(--color-accent)]"
                  />
                  <span>
                    <span className="block font-semibold text-ink">
                      {tRoles(`${r}.title`)}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </Fieldset>
        )}

        {/* STEP 2 — BASICS */}
        {step === 1 && (
          <div className="space-y-5">
            <Field label={t("fields.name")} error={errors.name?.message}>
              <input className={inputClass} {...register("name")} />
            </Field>
            <Field label={t("fields.nameEn")}>
              <input className={inputClass} {...register("nameEn")} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={t("fields.birthYear")}
                error={errors.birthYear?.message}
              >
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder="2010"
                  {...register("birthYear")}
                />
              </Field>
              <Field
                label={t("fields.language")}
                error={errors.language?.message}
              >
                <input className={inputClass} {...register("language")} />
              </Field>
              <Field label={t("fields.country")} error={errors.country?.message}>
                <input className={inputClass} {...register("country")} />
              </Field>
              <Field label={t("fields.city")} error={errors.city?.message}>
                <input className={inputClass} {...register("city")} />
              </Field>
            </div>
          </div>
        )}

        {/* STEP 3 — INTERESTS */}
        {step === 2 && (
          <div className="space-y-6">
            <Fieldset legend={t("fields.interests")}>
              <div className="grid gap-2 sm:grid-cols-2">
                {INTERESTS.map((i) => (
                  <label
                    key={i}
                    className="flex cursor-pointer items-center gap-3 rounded-md border border-slate-400 p-3 hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent-soft"
                  >
                    <input
                      type="checkbox"
                      value={i}
                      {...register("interests")}
                      className="accent-[var(--color-accent)]"
                    />
                    <span className="text-sm text-ink">
                      {t(`interestOptions.${i}`)}
                    </span>
                  </label>
                ))}
              </div>
            </Fieldset>

            <Fieldset legend={t("fields.mode")} error={errors.mode?.message}>
              <div className="flex flex-wrap gap-3">
                {MODES.map((m) => (
                  <label
                    key={m}
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-400 px-4 py-2 hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent-soft"
                  >
                    <input
                      type="radio"
                      value={m}
                      {...register("mode")}
                      className="accent-[var(--color-accent)]"
                    />
                    <span className="text-sm text-ink">{t(`mode.${m}`)}</span>
                  </label>
                ))}
              </div>
            </Fieldset>

            <Field label={t("fields.affiliation")}>
              <input className={inputClass} {...register("affiliation")} />
            </Field>
            <Field label={t("fields.referral")}>
              <input className={inputClass} {...register("referral")} />
            </Field>
          </div>
        )}

        {/* STEP 4 — GUARDIAN CONSENT */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={t("fields.guardianName")}
                error={errors.guardianName?.message}
              >
                <input className={inputClass} {...register("guardianName")} />
              </Field>
              <Field
                label={t("fields.guardianEmail")}
                error={errors.guardianEmail?.message}
              >
                <input
                  className={inputClass}
                  type="email"
                  {...register("guardianEmail")}
                />
              </Field>
            </div>
            <div className="space-y-3">
              <label className="flex items-start gap-3 text-sm text-ink">
                <input
                  type="checkbox"
                  {...register("consentData")}
                  className="mt-1 accent-[var(--color-accent)]"
                />
                <span>
                  {t("fields.consentData")}
                  <span className="text-accent-hover"> *</span>
                </span>
              </label>
              {errors.consentData?.message && (
                <p className="text-sm text-red-600">
                  {errors.consentData.message}
                </p>
              )}
              <label className="flex items-start gap-3 text-sm text-ink">
                <input
                  type="checkbox"
                  {...register("consentMedia")}
                  className="mt-1 accent-[var(--color-accent)]"
                />
                <span>{t("fields.consentMedia")}</span>
              </label>
            </div>
          </div>
        )}

        {/* STEP 5 — REVIEW */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold text-ink">{t("review.title")}</h2>
            <dl className="mt-6 divide-y divide-line rounded-md border border-line">
              <ReviewRow label={t("fields.name")} value={watch("name")} />
              <ReviewRow label={t("fields.birthYear")} value={watch("birthYear")} />
              <ReviewRow
                label={t("fields.country")}
                value={`${watch("country")}, ${watch("city")}`}
              />
              <ReviewRow
                label={t("fields.mode")}
                value={watch("mode") ? t(`mode.${watch("mode")}` as never) : ""}
              />
              <ReviewRow
                label={t("fields.guardianEmail")}
                value={watch("guardianEmail")}
              />
            </dl>
          </div>
        )}

        {/* NAV */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="btn-secondary-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("nav.back")}
          </button>
          {step < total - 1 ? (
            <button type="button" onClick={next} className="btn-primary">
              {t("nav.saveContinue")}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? tForms("submitting") : t("nav.submit")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-slate-400 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </label>
  );
}

function Fieldset({
  legend,
  error,
  children,
}: {
  legend: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-ink">{legend}</legend>
      {children}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </fieldset>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 px-4 py-3 text-sm">
      <dt className="font-semibold text-muted">{label}</dt>
      <dd className="text-right text-ink">{value || "—"}</dd>
    </div>
  );
}
