import { buildSiteUrl } from "../../siteConfig";
import { moonPhasesBetween, type PhaseKind } from "./moon";

// Ay evreleri icin abone olunabilir takvim (RFC 5545). Derleme anindan 1 ay oncesi
// ile 2 yil sonrasi; site her gece yeniden yayinlandigi icin takvim kendini yeniler.

const NAMES: Record<"tr" | "en", Record<PhaseKind, string>> = {
  tr: { new: "🌑 Yeni ay", first: "🌓 İlk dördün", full: "🌕 Dolunay", last: "🌗 Son dördün" },
  en: { new: "🌑 New Moon", first: "🌓 First Quarter", full: "🌕 Full Moon", last: "🌗 Third Quarter" },
};

const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");

function fold(line: string) {
  const out: string[] = [];
  let cur = "";
  for (const ch of line) {
    if (Buffer.byteLength(cur + ch) > 74) {
      out.push(cur);
      cur = " ";
    }
    cur += ch;
  }
  out.push(cur);
  return out.join("\r\n");
}

export function moonCalendarResponse({ lang, fullOnly }: { lang: "tr" | "en"; fullOnly: boolean }) {
  const tr = lang === "tr";
  const now = new Date();
  const events = moonPhasesBetween(new Date(now.getTime() - 31 * 86400000), new Date(now.getTime() + 731 * 86400000)).filter(
    (e) => !fullOnly || e.kind === "full",
  );
  const calName = tr ? (fullOnly ? "Dolunaylar" : "Ay Evreleri") : fullOnly ? "Full Moons" : "Moon Phases";
  const page = buildSiteUrl(tr ? "/ay-evreleri" : "/en/moon-phases");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//BirimCeviri.app//${calName}//${tr ? "TR" : "EN"}`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${calName}`,
    "REFRESH-INTERVAL;VALUE=DURATION:P1D",
    "X-PUBLISHED-TTL:P1D",
  ];
  for (const e of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:moon-${e.kind}-${stamp(e.date)}@birimceviri.app`,
      `DTSTAMP:${stamp(now)}`,
      `DTSTART:${stamp(e.date)}`,
      `DTEND:${stamp(new Date(e.date.getTime() + 30 * 60000))}`,
      `SUMMARY:${NAMES[lang][e.kind]}`,
      `DESCRIPTION:${tr ? "Ay doğuş ve batış saatleri: " : "Moonrise and moonset times: "}${page}`,
      `URL:${page}`,
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  const file = tr ? (fullOnly ? "dolunaylar.ics" : "ay-evreleri.ics") : fullOnly ? "full-moons.ics" : "moon-phases.ics";
  return new Response(lines.map(fold).join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `inline; filename="${file}"`,
    },
  });
}
