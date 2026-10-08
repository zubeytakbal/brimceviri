import { moonCalendarResponse } from "../converter/time/moonIcs";

// Ay evreleri takvim aboneligi (webcal); site her gece yeniden yayinlanir.
export const revalidate = 86400;

export function GET() {
  return moonCalendarResponse({ lang: "tr", fullOnly: true });
}
