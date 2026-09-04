// AFT global network — REAL nodes only.
// A new city is added here strictly when real youth, schools or partners join.
// Never add speculative/placeholder branches (see redesign constraint).
// This is the single source for BOTH the network table and the map markers,
// so every node carries its map coordinates (lng, lat).
export type NetworkStatus = "active" | "opening";

export type NetworkNode = {
  country: string;
  city: string;
  /** Stats are optional — unknown values render as "—" and place no map claim. */
  youthMembers?: number;
  projects?: number;
  partners?: number;
  status: NetworkStatus;
  /** Year the chapter was founded, if it is the founding chapter. */
  founded?: string;
  /** Map marker position. */
  lng: number;
  lat: number;
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
    lng: 126.98,
    lat: 37.57,
  },
  {
    country: "Austria",
    city: "Vienna",
    status: "active",
    lng: 16.37,
    lat: 48.21,
  },
];
