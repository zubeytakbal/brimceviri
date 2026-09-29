import {
  GREG_MONTHS_AR,
  mawaidSana,
  mawidRatib,
  SA_SANAWAT,
  saMunasabaPath,
} from "../../converter/calendar/saTaqwim";
import { addDaysYmd, ymdKey } from "../../converter/time/dateMath";
import type { YMD } from "../../converter/time/calendars";
import { buildSiteUrl } from "../../siteConfig";

// تقويم قابل للاشتراك (webcal): المناسبات والإجازات الرسمية ومواعيد الرواتب، يُحدَّث يوميًا.
export const revalidate = 86400;

const esc = (t: string) =>
  t
    .replace(/\\/g, "\\\\")
    .replace(/[,;]/g, (c) => `\\${c}`)
    .replace(/\n/g, "\\n");
const tag = (d: YMD) => ymdKey(d).replace(/-/g, "");

export function GET() {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d+Z$/, "Z");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BirimCeviri.app//Saudi Calendar//AR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:التقويم السعودي",
    "X-WR-TIMEZONE:Asia/Riyadh",
    "REFRESH-INTERVAL;VALUE=DURATION:P1D",
  ];
  const hadath = (
    uid: string,
    min: YMD,
    ila: YMD,
    summary: string,
    desc: string,
    url: string,
  ) =>
    lines.push(
      "BEGIN:VEVENT",
      `UID:${uid}@birimceviri.app`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${tag(min)}`,
      `DTEND;VALUE=DATE:${tag(addDaysYmd(ila, 1))}`,
      `SUMMARY:${esc(summary)}`,
      `DESCRIPTION:${esc(desc)}`,
      `URL:${buildSiteUrl(url)}`,
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    );
  for (const y of SA_SANAWAT) {
    for (const t of mawaidSana(y)) {
      const url = saMunasabaPath(t.m.id);
      hadath(
        `sa-${t.m.id}-${ymdKey(t.tarikh)}`,
        t.tarikh,
        t.ila ?? t.tarikh,
        t.m.ism,
        t.m.mujaz,
        url,
      );
      if (
        t.ijazaMin &&
        t.ijazaIla &&
        (ymdKey(t.ijazaMin) !== ymdKey(t.tarikh) ||
          ymdKey(t.ijazaIla) !== ymdKey(t.ila ?? t.tarikh))
      )
        hadath(
          `sa-ijaza-${t.m.id}-${ymdKey(t.ijazaMin)}`,
          t.ijazaMin,
          t.ijazaIla,
          `إجازة ${t.m.ism}`,
          "إجازة رسمية للقطاع الخاص وفق نظام العمل. قد تختلف إجازة القطاع الحكومي.",
          url,
        );
    }
    for (let m = 1; m <= 12; m++) {
      const d = mawidRatib(y, m);
      hadath(
        `sa-ratib-${y}-${m}`,
        d,
        d,
        `صرف الرواتب (${GREG_MONTHS_AR[m - 1]})`,
        "موعد صرف رواتب القطاع الحكومي: يوم 27، ويُقدَّم إلى الخميس إذا وافق الجمعة ويؤخَّر إلى الأحد إذا وافق السبت.",
        "/ar/salary-dates",
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
      "Content-Disposition": 'inline; filename="saudi-calendar.ics"',
    },
  });
}
