import {
  GREG_MONTHS_AR,
  kharitatSana,
  shahrHijri,
} from "../../converter/calendar/saTaqwim";
import type { YMD } from "../../converter/time/calendars";
import {
  addDaysYmd,
  diffDays,
  weekdayOf,
  ymdKey,
} from "../../converter/time/dateMath";

const RUUS = ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

/** شبكة شهر هجري: الرقم الكبير لليوم الهجري والصغير للميلادي. الأسبوع يبدأ الأحد، والعطلة الجمعة والسبت. */
export function SaShahrGrid({
  hy,
  hm,
  yawm,
  kabir = false,
  dirasi,
}: {
  hy: number;
  hm: number;
  yawm?: YMD;
  kabir?: boolean;
  /** مفاتيح الأيام الدراسية (YYYY-MM-DD) لتمييزها. */
  dirasi?: Set<string>;
}) {
  const { bidaya, nihaya } = shahrHijri(hy, hm);
  const lead = weekdayOf(bidaya);
  const ayyam: YMD[] = [];
  for (let d = bidaya; diffDays(d, nihaya) >= 0; d = addDaysYmd(d, 1))
    ayyam.push(d);
  return (
    <div className={`takvim-ay${kabir ? " is-buyuk" : ""}`}>
      {RUUS.map((r) => (
        <b key={r}>{r}</b>
      ))}
      {Array.from({ length: lead }, (_, i) => (
        <span key={`e${i}`} className="is-bos" />
      ))}
      {ayyam.map((d, i) => {
        const k = kharitatSana(d.year);
        const key = ymdKey(d);
        const ev = k.munasabat.get(key) ?? [];
        const ijaza = k.ijazat.get(key);
        const w = weekdayOf(d);
        const cls = [
          w === 5 || w === 6 ? "is-weekend" : "",
          ijaza ? "is-holiday" : "",
          ev.length ? "has-event" : "",
          yawm && ymdKey(yawm) === key ? "is-today" : "",
          dirasi?.has(key) ? "is-okul" : "",
        ]
          .filter(Boolean)
          .join(" ");
        const title =
          [ijaza ? `إجازة: ${ijaza}` : "", ...ev.map((t) => t.m.ism)]
            .filter(Boolean)
            .join(" · ") || undefined;
        return (
          <span key={key} className={cls || undefined} title={title}>
            <em>
              {i + 1}
              <sup>
                {d.day === 1 || i === 0
                  ? `${d.day} ${GREG_MONTHS_AR[d.month - 1]}`
                  : d.day}
              </sup>
            </em>
            {kabir && ev.length ? (
              <small>
                {ev.slice(0, 2).map((t) => (
                  <i key={t.m.id} className={`sa-feah-${t.m.feah}`}>
                    {t.m.ism}
                  </i>
                ))}
              </small>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}

export function SaMiftah() {
  return (
    <p className="holiday-legend">
      <span className="is-holiday" /> إجازة رسمية (القطاع الخاص){" "}
      <span className="takvim-lejant-etkinlik" /> مناسبة{" "}
      <span className="is-weekend" /> عطلة نهاية الأسبوع (الجمعة والسبت) · الرقم
      الصغير هو اليوم الميلادي
    </p>
  );
}
