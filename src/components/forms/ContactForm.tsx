"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Field, inputClass } from "./fields";

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
    formState: { errors, isSubmitting },
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
  // Keep the handler async so react-hook-form drives `isSubmitting`; the short
  // delay stands in for the real API call and lets the loading state show.
  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-sm border border-line bg-white p-8 text-center shadow-sm">
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
      className="space-y-5 rounded-sm border border-line bg-white p-6 shadow-sm sm:p-8"
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
        <Field label={t("form.name")} error={errors.name?.message} required>
          <input className={inputClass} autoComplete="name" {...register("name")} />
        </Field>
        <Field label={t("form.email")} error={errors.email?.message} required>
          <input
            className={inputClass}
            type="email"
            inputMode="email"
            autoComplete="email"
            {...register("email")}
          />
        </Field>
      </div>

      <Field label={t("form.org")}>
        <input className={inputClass} autoComplete="organization" {...register("org")} />
      </Field>

      <Field label={t("form.message")} error={errors.message?.message} required>
        <textarea rows={5} className={inputClass} {...register("message")} />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? t("form.submitting") : t("form.submit")}
      </button>
    </form>
  );
}
