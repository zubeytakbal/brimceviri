import {
  TAKVIM_YILLARI,
  tarihliAd,
  yilEtkinlikleri,
} from "../converter/calendar/trTakvim";
import { addDaysYmd, ymdKey } from "../converter/time/dateMath";
import { buildSiteUrl } from "../siteConfig";

// Abone olunabilir Turkiye takvimi (webcal). Gunde bir yenilenir; yeni yillar eklendikce telefonlarda guncellenir.
export const revalidate = 86400;

const esc = (t: string) =>
  t
    .replace(/\\/g, "\\\\")
    .replace(/[,;]/g, (c) => `\\${c}`)
    .replace(/\n/g, "\\n");
const gun = (k: string) => k.replace(/-/g, "");

export function GET() {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d+Z$/, "Z");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BirimCeviri.app//Turkiye Takvimi//TR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Türkiye Takvimi",
    "X-WR-TIMEZONE:Europe/Istanbul",
    "REFRESH-INTERVAL;VALUE=DURATION:P1D",
  ];
  for (const y of TAKVIM_YILLARI) {
    for (const t of yilEtkinlikleri(y)) {
      const son = addDaysYmd(t.bitis ?? t.tarih, 1);
      lines.push(
        "BEGIN:VEVENT",
        `UID:${t.etkinlik.id}-${ymdKey(t.tarih)}@birimceviri.app`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${gun(ymdKey(t.tarih))}`,
        `DTEND;VALUE=DATE:${gun(ymdKey(son))}`,
        `SUMMARY:${esc(tarihliAd(t))}`,
        `DESCRIPTION:${esc(t.etkinlik.kisa)}`,
        `URL:${buildSiteUrl(`/ozel-gunler#${t.etkinlik.id}`)}`,
        "TRANSP:TRANSPARENT",
        "END:VEVENT",
      );
    }
  }
  lines.push("END:VCALENDAR");
  // RFC 5545: satirlar 75 oktette katlanir
  const fold = (l: string) => {
    const out: string[] = [];
    let cur = "";
    for (const ch of l) {
      if (Buffer.byteLength(cur + ch) > 74) {
        out.push(cur);
        cur = " ";
      }
      cur += ch;
    }
    out.push(cur);
    return out.join("\r\n");
  };
  return new Response(lines.map(fold).join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="turkiye-takvimi.ics"',
    },
  });
}
