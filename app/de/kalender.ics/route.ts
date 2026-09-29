import {
  DE_JAHRE,
  deBesondererTagPfad,
  deJahresTermine,
} from "../../converter/calendar/deKalender";
import { addDaysYmd, ymdKey } from "../../converter/time/dateMath";
import { buildSiteUrl } from "../../siteConfig";

// Abonnierbarer Kalender (webcal) mit Feiertagen und besonderen Tagen; täglich aktualisiert.
export const revalidate = 86400;

const esc = (t: string) =>
  t
    .replace(/\\/g, "\\\\")
    .replace(/[,;]/g, (c) => `\\${c}`)
    .replace(/\n/g, "\\n");
const tag = (k: string) => k.replace(/-/g, "");

export function GET() {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d+Z$/, "Z");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BirimCeviri.app//Kalender Deutschland//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Kalender Deutschland",
    "X-WR-TIMEZONE:Europe/Berlin",
    "REFRESH-INTERVAL;VALUE=DURATION:P1D",
  ];
  for (const y of DE_JAHRE) {
    for (const t of deJahresTermine(y)) {
      const ende = addDaysYmd(t.bis ?? t.datum, 1);
      const laender =
        t.laender && t.laender.length < 16
          ? ` (${t.laender.map((s) => s.toUpperCase()).join(", ")})`
          : "";
      lines.push(
        "BEGIN:VEVENT",
        `UID:de-${t.tag.id}-${ymdKey(t.datum)}@birimceviri.app`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${tag(ymdKey(t.datum))}`,
        `DTEND;VALUE=DATE:${tag(ymdKey(ende))}`,
        `SUMMARY:${esc(t.tag.name + laender)}`,
        `DESCRIPTION:${esc(t.tag.kurz)}`,
        `URL:${buildSiteUrl(deBesondererTagPfad(t.tag.id))}`,
        "TRANSP:TRANSPARENT",
        "END:VEVENT",
      );
    }
  }
  lines.push("END:VCALENDAR");
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
      "Content-Disposition": 'inline; filename="kalender-deutschland.ics"',
    },
  });
}
