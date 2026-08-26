"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { track } from "@/lib/analytics";
import { Field, FormSection, SubmittedCard, inputClass } from "./fields";
import type { InquiryConfig, FieldConfig } from "./inquiryConfigs";

// One engine renders every inquiry form from its config (기획서 §7.1, §9 폼 공통 구조).
export function InquiryForm({ config }: { config: InquiryConfig }) {
  const t = useTranslations(config.namespace);
  const [ref, setRef] = useState("");

  const fields = useMemo(
    () => config.sections.flatMap((s) => s.fields),
    [config]
  );

  const schema = useMemo(() => {
    const shape: Record<string, z.ZodTypeAny> = {};
    for (const f of fields) {
      switch (f.type) {
        case "email":
          shape[f.name] = z.string().email(t("validation.email"));
          break;
        case "checkboxGroup":
          shape[f.name] = z.array(z.string()).default([]);
          break;
        case "consent":
          shape[f.name] = z
            .boolean()
            .refine((v) => v === true, t("validation.consent"));
          break;
        default:
          shape[f.name] = f.required
            ? z.string().min(1, t("validation.required"))
            : z.string().optional().default("");
      }
    }
    return z.object(shape);
  }, [fields, t]);

  type FormValues = Record<string, unknown>;

  const defaultValues = useMemo(() => {
    const dv: Record<string, string | string[] | boolean> = {};
    for (const f of fields) {
      if (f.type === "checkboxGroup") dv[f.name] = [];
      else if (f.type === "consent") dv[f.name] = false;
      else if ((f.type === "select" || f.type === "radio") && f.options?.length)
        dv[f.name] = f.options[0];
      else dv[f.name] = "";
    }
    return dv;
  }, [fields]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues,
  });

  function onSubmit() {
    setRef(`${config.refPrefix}-${Math.floor(Math.random() * 900000 + 100000)}`);
    track(config.event, { form: config.namespace });
  }

  if (ref) {
    return (
      <SubmittedCard
        title={t("done.title")}
        body={t("done.body")}
        note={t("done.note")}
        refId={ref}
        refLabel={t("done.ref")}
        onReset={() => {
          reset();
          setRef("");
        }}
        resetLabel={t("done.again")}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mx-auto max-w-2xl space-y-10 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8"
    >
      {config.sections.map((section, i) => (
        <FormSection
          key={section.key}
          step={String(i + 1)}
          title={t(`sections.${section.key}`)}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {section.fields.map((f) => (
              <FieldRenderer
                key={f.name}
                field={f}
                t={t}
                register={register}
                error={errors[f.name]?.message as string | undefined}
              />
            ))}
          </div>
        </FormSection>
      ))}

      <button type="submit" className="btn-primary w-full sm:w-auto">
        {t("submit")}
      </button>
    </form>
  );
}

type Register = ReturnType<typeof useForm>["register"];
type T = ReturnType<typeof useTranslations>;

function FieldRenderer({
  field: f,
  t,
  register,
  error,
}: {
  field: FieldConfig;
  t: T;
  register: Register;
  error?: string;
}) {
  const label = t(`fields.${f.name}`);
  // Half-width only for simple inputs; complex controls span full width.
  const full = !f.half || ["textarea", "radio", "checkboxGroup", "consent"].includes(f.type);
  const colClass = full ? "sm:col-span-2" : "";

  if (f.type === "consent") {
    return (
      <div className={colClass}>
        <div className="rounded-lg border border-line bg-surface p-4">
          <label className="flex items-start gap-3 text-sm text-ink">
            <input
              type="checkbox"
              {...register(f.name)}
              className="mt-1 accent-[var(--color-accent)]"
            />
            <span>
              {label}
              <span className="text-accent-hover"> *</span>
            </span>
          </label>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    );
  }

  if (f.type === "checkboxGroup") {
    return (
      <fieldset className={colClass}>
        <legend className="mb-2 text-sm font-semibold text-ink">{label}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {f.options?.map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-line p-3 hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent-soft"
            >
              <input
                type="checkbox"
                value={opt}
                {...register(f.name)}
                className="accent-[var(--color-accent)]"
              />
              <span className="text-sm text-ink">
                {t(`${f.optionsKey}.${opt}`)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (f.type === "radio") {
    return (
      <fieldset className={colClass}>
        <legend className="mb-2 text-sm font-semibold text-ink">{label}</legend>
        <div className="flex flex-wrap gap-3">
          {f.options?.map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-line px-4 py-2 hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent-soft"
            >
              <input
                type="radio"
                value={opt}
                {...register(f.name)}
                className="accent-[var(--color-accent)]"
              />
              <span className="text-sm text-ink">
                {t(`${f.optionsKey}.${opt}`)}
              </span>
            </label>
          ))}
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </fieldset>
    );
  }

  return (
    <div className={colClass}>
      <Field label={label} error={error}>
        {f.type === "textarea" ? (
          <textarea rows={4} className={inputClass} {...register(f.name)} />
        ) : f.type === "select" ? (
          <select className={inputClass} {...register(f.name)}>
            {f.options?.map((opt) => (
              <option key={opt} value={opt}>
                {t(`${f.optionsKey}.${opt}`)}
              </option>
            ))}
          </select>
        ) : (
          <input
            className={inputClass}
            type={f.type === "email" ? "email" : f.type === "date" ? "date" : "text"}
            inputMode={f.type === "number" ? "numeric" : undefined}
            {...register(f.name)}
          />
        )}
      </Field>
    </div>
  );
}
