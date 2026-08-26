"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";

const TYPES = [
  "general",
  "youth",
  "partner",
  "venue",
  "support",
  "media",
] as const;

export function ContactForm() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        type: z.string().min(1, t("validation.required")),
        name: z.string().min(1, t("validation.required")),
        email: z.string().email(t("validation.email")),
        org: z.string().optional().default(""),
        message: z.string().min(1, t("validation.required")),
      }),
    [t]
  );

  type FormValues = z.input<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      type: "general",
      name: "",
      email: "",
      org: "",
      message: "",
    },
  });

  // No backend yet — show a confirmation preview (기획서 §9.2 제출 후 화면).
  function onSubmit() {
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-2xl">
          ✓
        </div>
        <h2 className="mt-5 text-2xl font-bold text-ink">{t("done.title")}</h2>
        <p className="mt-3 text-muted">{t("done.body")}</p>
        <p className="mt-3 text-xs text-muted">{t("done.note")}</p>
        <button
          type="button"
          onClick={() => {
            reset();
            setSent(false);
          }}
          className="btn-text mt-5"
        >
          {t("done.again")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8"
    >
      <Field label={t("form.type")}>
        <select className={inputClass} {...register("type")}>
          {TYPES.map((ty) => (
            <option key={ty} value={ty}>
              {t(`form.types.${ty}`)}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form.name")} error={errors.name?.message}>
          <input className={inputClass} {...register("name")} />
        </Field>
        <Field label={t("form.email")} error={errors.email?.message}>
          <input className={inputClass} type="email" {...register("email")} />
        </Field>
      </div>

      <Field label={t("form.org")}>
        <input className={inputClass} {...register("org")} />
      </Field>

      <Field label={t("form.message")} error={errors.message?.message}>
        <textarea rows={5} className={inputClass} {...register("message")} />
      </Field>

      <button type="submit" className="btn-primary w-full sm:w-auto">
        {t("form.submit")}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

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
