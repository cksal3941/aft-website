// ISO 3166-1 alpha-2 codes for the country dropdown. Names are resolved at
// render time via Intl.DisplayNames (localized label shown to the user, English
// name stored as the submitted value so staff read a consistent name).
export const COUNTRY_CODES = [
  "KR", "US", "GB", "CA", "AU", "NZ", "JP", "CN", "TW", "HK",
  "SG", "MY", "TH", "VN", "PH", "ID", "IN", "AE", "SA", "IL",
  "TR", "DE", "FR", "IT", "ES", "PT", "NL", "BE", "LU", "CH",
  "AT", "SE", "NO", "DK", "FI", "IE", "PL", "CZ", "HU", "GR",
  "RO", "RU", "UA", "MX", "BR", "AR", "CL", "CO", "ZA", "EG",
  "NG", "KE",
] as const;
