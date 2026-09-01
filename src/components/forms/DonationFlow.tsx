"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { track } from "@/lib/analytics";

const PURPOSES = ["mission", "project", "scholarship", "product"] as const;
const PRESETS = [20000, 50000, 100000, 300000];

// Interactive preview of the donation flow (기획서 §8.1). Payment is UI-only for now.
export function DonationFlow() {
  const t = useTranslations("support");
  const [purpose, setPurpose] = useState<(typeof PURPOSES)[number]>("mission");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState<number>(50000);
  const [custom, setCustom] = useState("");

  const finalAmount = custom ? Number(custom) || 0 : amount;

  function proceed() {
    track("donate_start", {
      purpose,
      frequency,
      amount: finalAmount,
    });
  }

  return (
    <div className="mx-auto max-w-3xl rounded-sm border border-line bg-white p-6 shadow-sm sm:p-8">
      {/* PURPOSE */}
      <p className="eyebrow">{t("purpose.eyebrow")}</p>
      <h2 className="mt-1 text-xl font-bold text-ink">{t("purpose.title")}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {PURPOSES.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPurpose(p)}
            className={`rounded-md border p-4 text-left transition-colors ${
              purpose === p
                ? "border-accent bg-accent-soft"
                : "border-line hover:border-accent"
            }`}
          >
            <span className="block font-semibold text-ink">
              {t(`purpose.items.${p}.title`)}
            </span>
            <span className="mt-1 block text-sm text-muted">
              {t(`purpose.items.${p}.body`)}
            </span>
          </button>
        ))}
      </div>

      {/* FREQUENCY + AMOUNT */}
      <p className="eyebrow mt-8">{t("amount.eyebrow")}</p>
      <h2 className="mt-1 text-xl font-bold text-ink">{t("amount.title")}</h2>

      <div className="mt-4 inline-flex rounded-md border border-line p-1">
        {(["once", "monthly"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFrequency(f)}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
              frequency === f ? "bg-navy text-white" : "text-muted hover:text-ink"
            }`}
          >
            {t(`amount.${f}`)}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PRESETS.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => {
              setAmount(v);
              setCustom("");
            }}
            className={`rounded-md border px-4 py-3 text-sm font-semibold transition-colors ${
              !custom && amount === v
                ? "border-accent bg-accent-soft text-ink"
                : "border-line text-muted hover:border-accent"
            }`}
          >
            ₩{v.toLocaleString()}
          </button>
        ))}
      </div>

      <div className="mt-3">
        <input
          inputMode="numeric"
          value={custom}
          onChange={(e) => setCustom(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder={t("amount.custom")}
          className="w-full rounded-md border border-line px-3 py-2.5 text-sm focus:border-accent focus:outline-none"
        />
      </div>

      <div className="mt-6 flex flex-col items-start gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted">
          <span className="font-semibold text-ink">
            {t(`purpose.items.${purpose}.title`)}
          </span>{" "}
          · {t(`amount.${frequency}`)} · ₩{finalAmount.toLocaleString()}
        </div>
        <button type="button" onClick={proceed} className="btn-primary">
          {t("amount.continue")}
        </button>
      </div>
      <p className="mt-3 text-xs text-muted">{t("amount.note")}</p>
    </div>
  );
}
