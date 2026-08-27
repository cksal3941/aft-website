import type { AftEvent } from "@/lib/analytics";

// Config-driven inquiry forms (기획서 §7.1). One engine (InquiryForm) renders all of
// these from data. Message keys follow a convention:
//   label   → `<namespace>.fields.<name>`
//   options → `<namespace>.<optionsKey>.<option>`
//   section → `<namespace>.sections.<key>`

export type FieldType =
  | "text"
  | "email"
  | "textarea"
  | "number"
  | "date"
  | "select"
  | "radio"
  | "checkboxGroup"
  | "consent";

export type FieldConfig = {
  name: string;
  type: FieldType;
  required?: boolean;
  /** messages subkey holding option labels (for select/radio/checkboxGroup) */
  optionsKey?: string;
  /** option value keys */
  options?: string[];
  /** render at half width on wide screens */
  half?: boolean;
};

export type SectionConfig = {
  key: string;
  fields: FieldConfig[];
};

export type InquiryConfig = {
  namespace: string;
  refPrefix: string;
  event: AftEvent;
  sections: SectionConfig[];
};

const consent = (name = "consent"): FieldConfig => ({ name, type: "consent" });

export const partnershipConfig: InquiryConfig = {
  namespace: "partnershipForm",
  refPrefix: "PTR",
  event: "partner_inquiry_submit",
  sections: [
    {
      key: "org",
      fields: [
        { name: "orgName", type: "text", required: true },
        { name: "contactName", type: "text", required: true, half: true },
        { name: "contactEmail", type: "email", half: true },
        { name: "country", type: "text", half: true },
      ],
    },
    {
      key: "partnership",
      fields: [
        {
          name: "partnershipType",
          type: "select",
          optionsKey: "typeOptions",
          options: ["corporate", "public", "community", "other"],
          half: true,
        },
        { name: "timeline", type: "text", half: true },
        {
          name: "budget",
          type: "select",
          optionsKey: "budgetOptions",
          options: ["under1m", "1to5m", "5to20m", "over20m", "flexible"],
          half: true,
        },
        { name: "goals", type: "textarea", required: true },
        consent(),
      ],
    },
  ],
};

export const sponsorConfig: InquiryConfig = {
  namespace: "sponsorForm",
  refPrefix: "SPN",
  event: "partner_inquiry_submit",
  sections: [
    {
      key: "org",
      fields: [
        { name: "orgName", type: "text", required: true },
        { name: "contactName", type: "text", required: true, half: true },
        { name: "contactEmail", type: "email", half: true },
      ],
    },
    {
      key: "sponsorship",
      fields: [
        { name: "issue", type: "textarea", required: true },
        {
          name: "budget",
          type: "select",
          optionsKey: "budgetOptions",
          options: ["under1m", "1to5m", "5to20m", "over20m", "flexible"],
          half: true,
        },
        { name: "period", type: "text", half: true },
        { name: "outcomeGoals", type: "textarea" },
        consent(),
      ],
    },
  ],
};

export const inkindConfig: InquiryConfig = {
  namespace: "inkindForm",
  refPrefix: "INK",
  event: "partner_inquiry_submit",
  sections: [
    {
      key: "org",
      fields: [
        { name: "orgName", type: "text", required: true },
        { name: "contactName", type: "text", required: true, half: true },
        { name: "contactEmail", type: "email", half: true },
      ],
    },
    {
      key: "inkind",
      fields: [
        {
          name: "categories",
          type: "checkboxGroup",
          optionsKey: "categoryOptions",
          options: ["printing", "materials", "shipping", "lodging", "media"],
        },
        { name: "details", type: "textarea", required: true },
        { name: "timeline", type: "text", half: true },
        consent(),
      ],
    },
  ],
};

export const expertConfig: InquiryConfig = {
  namespace: "expertForm",
  refPrefix: "EXP",
  event: "partner_inquiry_submit",
  sections: [
    {
      key: "person",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "email", type: "email", half: true },
        { name: "country", type: "text", half: true },
      ],
    },
    {
      key: "expertise",
      fields: [
        {
          name: "field",
          type: "select",
          optionsKey: "fieldOptions",
          options: ["design", "art", "publishing", "media", "education", "other"],
          half: true,
        },
        { name: "availability", type: "text", half: true },
        { name: "experience", type: "textarea" },
        consent("childSafety"),
      ],
    },
  ],
};

export const advisorConfig: InquiryConfig = {
  namespace: "advisorForm",
  refPrefix: "ADV",
  event: "join_submit",
  sections: [
    {
      key: "person",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "email", type: "email", half: true },
        { name: "country", type: "text", half: true },
      ],
    },
    {
      key: "advisor",
      fields: [
        {
          name: "field",
          type: "select",
          optionsKey: "fieldOptions",
          options: ["artist", "educator", "environment", "creativeLeader", "other"],
          half: true,
        },
        { name: "availability", type: "text", half: true },
        { name: "motivation", type: "textarea", required: true },
        consent(),
      ],
    },
  ],
};

export const inquiryConfigs = {
  partnership: partnershipConfig,
  sponsor: sponsorConfig,
  inkind: inkindConfig,
  expert: expertConfig,
  advisor: advisorConfig,
} as const;
