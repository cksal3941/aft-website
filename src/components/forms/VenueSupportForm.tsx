"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { track } from "@/lib/analytics";
import { Field, FormSection, SubmittedCard, inputClass, makeRef } from "./fields";

const SPACE_TYPES = ["gallery", "hall", "outdoor", "other"] as const;
const EQUIPMENT = ["projector", "sound", "lighting", "wifi", "seating"] as const;
const SUPPORT_TYPES = ["free", "discounted", "partnership"] as const;

export function VenueSupportForm() {
  const t = useTranslations("venueForm");
  const tForms = useTranslations("forms");
  const [ref, setRef] = useState("");

  const schema = useMemo(
    () =>
      z.object({
        orgName: z.string().min(1, t("validation.required")),
        contactName: z.string().min(1, t("validation.required")),
        contactEmail: z.string().email(t("validation.email")),
        country: z.string().optional().default(""),
        address: z.string().min(1, t("validation.required")),
        city: z.string().optional().default(""),
        spaceType: z.string().optional().default("gallery"),
        area: z.string().optional().default(""),
        capacity: z.string().min(1, t("validation.required")),
        equipment: z.array(z.string()).default([]),
        accessible: z.boolean().default(false),
        availableFrom: z.string().optional().default(""),
        availableTo: z.string().optional().default(""),
        availabilityNote: z.string().optional().default(""),
        supportType: z.string().optional().default("free"),
        message: z.string().optional().default(""),
        consent: z.boolean().refine((v) => v === true, t("validation.consent")),
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
      orgName: "",
      contactName: "",
      contactEmail: "",
      country: "",
      address: "",
      city: "",
      spaceType: "gallery",
      area: "",
      capacity: "",
      equipment: [],
      accessible: false,
      availableFrom: "",
      availableTo: "",
      availabilityNote: "",
      supportType: "free",
      message: "",
      consent: false,
    },
  });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 600));
    setRef(makeRef("VNU"));
    track("venue_offer_submit", {});
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
      className="mx-auto max-w-2xl space-y-10 rounded-sm border border-line bg-white p-6 shadow-sm sm:p-8"
    >
      {/* 1. ORGANIZATION */}
      <FormSection step="1" title={t("sections.org")}>
        <Field label={t("fields.orgName")} error={errors.orgName?.message}>
          <input className={inputClass} {...register("orgName")} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t("fields.contactName")} error={errors.contactName?.message}>
            <input className={inputClass} {...register("contactName")} />
          </Field>
          <Field label={t("fields.contactEmail")} error={errors.contactEmail?.message}>
            <input className={inputClass} type="email" {...register("contactEmail")} />
          </Field>
          <Field label={t("fields.country")}>
            <input className={inputClass} {...register("country")} />
          </Field>
        </div>
      </FormSection>

      {/* 2. SPACE */}
      <FormSection step="2" title={t("sections.space")}>
        <Field label={t("fields.address")} error={errors.address?.message}>
          <input className={inputClass} {...register("address")} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t("fields.city")}>
            <input className={inputClass} {...register("city")} />
          </Field>
          <Field label={t("fields.spaceType")}>
            <select className={inputClass} {...register("spaceType")}>
              {SPACE_TYPES.map((s) => (
                <option key={s} value={s}>
                  {t(`spaceTypes.${s}`)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t("fields.area")}>
            <input className={inputClass} inputMode="numeric" {...register("area")} />
          </Field>
        </div>
      </FormSection>

      {/* 3. FACILITIES */}
      <FormSection step="3" title={t("sections.facilities")}>
        <Field label={t("fields.capacity")} error={errors.capacity?.message}>
          <input className={inputClass} inputMode="numeric" {...register("capacity")} />
        </Field>
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink">
            {t("fields.equipment")}
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {EQUIPMENT.map((e) => (
              <label
                key={e}
                className="flex cursor-pointer items-center gap-3 rounded-md border border-line p-3 hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent-soft"
              >
                <input
                  type="checkbox"
                  value={e}
                  {...register("equipment")}
                  className="accent-[var(--color-accent)]"
                />
                <span className="text-sm text-ink">{t(`equipmentOptions.${e}`)}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="flex items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            {...register("accessible")}
            className="accent-[var(--color-accent)]"
          />
          {t("fields.accessible")}
        </label>
      </FormSection>

      {/* 4. AVAILABILITY */}
      <FormSection step="4" title={t("sections.dates")}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t("fields.availableFrom")}>
            <input className={inputClass} type="date" {...register("availableFrom")} />
          </Field>
          <Field label={t("fields.availableTo")}>
            <input className={inputClass} type="date" {...register("availableTo")} />
          </Field>
        </div>
        <Field label={t("fields.availabilityNote")}>
          <textarea rows={2} className={inputClass} {...register("availabilityNote")} />
        </Field>
      </FormSection>

      {/* 5. SUPPORT SCOPE */}
      <FormSection step="5" title={t("sections.scope")}>
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink">
            {t("fields.supportType")}
          </legend>
          <div className="flex flex-wrap gap-3">
            {SUPPORT_TYPES.map((s) => (
              <label
                key={s}
                className="flex cursor-pointer items-center gap-2 rounded-md border border-line px-4 py-2 hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent-soft"
              >
                <input
                  type="radio"
                  value={s}
                  {...register("supportType")}
                  className="accent-[var(--color-accent)]"
                />
                <span className="text-sm text-ink">{t(`supportTypes.${s}`)}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <Field label={t("fields.message")}>
          <textarea rows={3} className={inputClass} {...register("message")} />
        </Field>
        <div className="rounded-md border border-line bg-surface p-4">
          <label className="flex items-start gap-3 text-sm text-ink">
            <input
              type="checkbox"
              {...register("consent")}
              className="mt-1 accent-[var(--color-accent)]"
            />
            <span>
              {t("fields.consent")}
              <span className="text-accent-hover"> *</span>
            </span>
          </label>
          {errors.consent?.message && (
            <p className="mt-2 text-sm text-red-600">{errors.consent.message}</p>
          )}
        </div>
      </FormSection>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? tForms("submitting") : t("submit")}
      </button>
    </form>
  );
}
