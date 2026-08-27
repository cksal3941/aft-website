// AFT global network — REAL nodes only.
// A new city is added here strictly when real youth, schools or partners join.
// Never add speculative/placeholder branches (see redesign constraint).
export type NetworkStatus = "active" | "opening";

export type NetworkNode = {
  country: string;
  city: string;
  youthMembers: number;
  projects: number;
  partners: number;
  status: NetworkStatus;
  /** Year the chapter was founded, if it is the founding chapter. */
  founded?: string;
};

export const networkNodes: NetworkNode[] = [
  {
    country: "South Korea",
    city: "Seoul",
    youthMembers: 28,
    projects: 1,
    partners: 1,
    status: "active",
    founded: "2026",
  },
];
