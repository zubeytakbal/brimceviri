import Link from "@/app/components/SiteLink";
import { deTagesKarte, deTagPfad } from "../../converter/calendar/deKalender";
import type { YMD } from "../../converter/time/calendars";
import {
  addDaysYmd,
  daysInMonth,
  weekdayOf,
  ymdKey,
} from "../../converter/time/dateMath";
import { kalenderwoche } from "../../converter/time/germanDates";
import {
  germanHolidaysCached,
  type StateCode,
} from "../../converter/time/germanHolidays";

const KOPF = ["KW", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

/** Monatsraster mit Kalenderwochen. land = null: bundesweite Feiertage rot, regionale orange. */
export function DeMonatsGitter({
  year,
  month,
  land,
  heute,
  gross = false,
  verlinken = true,
}: {
  year: number;
  month: number;
  land: StateCode | null;
  heute?: YMD;
  gross?: boolean;
  verlinken?: boolean;
}) {
  const karte = deTagesKarte(year);
  const feiertage = new Map<
    string,
    { name: string; art: "voll" | "regional" }
  >();
  for (const h of germanHolidaysCached(year)) {
    if (h.sunday) continue;
    const key = ymdKey(h.date);
    if (land) {
      if (h.states.includes(land))
        feiertage.set(key, { name: h.name, art: "voll" });
      else if (h.partialStates?.includes(land))
        feiertage.set(key, { name: `${h.name} (regional)`, art: "regional" });
    } else if (h.states.length === 16)
      feiertage.set(key, { name: h.name, art: "voll" });
    else if (h.states.length || h.partialStates?.length) {
      if (!feiertage.has(key))
        feiertage.set(key, {
          name: `${h.name} (nur in einigen Ländern)`,
          art: "regional",
        });
    }
  }
  const erster = { year, month, day: 1 };
  const lead = (weekdayOf(erster) + 6) % 7;
  const tage = daysInMonth(year, month);
  const zeilen = Math.ceil((lead + tage) / 7);
  const zellen: Array<YMD | null> = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: tage }, (_, i) => ({ year, month, day: i + 1 })),
  ];
  while (zellen.length < zeilen * 7) zellen.push(null);

  return (
    <div className={`takvim-ay mit-kw${gross ? " is-buyuk" : ""}`}>
      {KOPF.map((k) => (
        <b key={k}>{k}</b>
      ))}
      {Array.from({ length: zeilen }, (_, z) => {
        const reihe = zellen.slice(z * 7, z * 7 + 7);
        const erstesDatum = reihe.find(Boolean) ?? addDaysYmd(erster, z * 7);
        return [
          <span key={`kw${z}`} className="is-kw">
            {kalenderwoche(erstesDatum as YMD).week}
          </span>,
          ...reihe.map((d, i) => {
            if (!d) return <span key={`e${z}${i}`} className="is-bos" />;
            const key = ymdKey(d);
            const f = feiertage.get(key);
            const ev = karte.get(key) ?? [];
            const cls = [
              i >= 5 ? "is-weekend" : "",
              f ? (f.art === "voll" ? "is-holiday" : "is-half") : "",
              ev.length ? "has-event" : "",
              heute && ymdKey(heute) === key ? "is-today" : "",
            ]
              .filter(Boolean)
              .join(" ");
            const title =
              [f?.name, ...ev.map((t) => t.tag.name)]
                .filter((v, j, a) => v && a.indexOf(v) === j)
                .join(" · ") || undefined;
            const inhalt = (
              <>
                <em>{d.day}</em>
                {gross && ev.length ? (
                  <small>
                    {ev.slice(0, 2).map((t) => (
                      <i key={t.tag.id} className={`de-kat-${t.tag.kategorie}`}>
                        {t.tag.name}
                      </i>
                    ))}
                  </small>
                ) : null}
              </>
            );
            return ev.length && verlinken ? (
              <Link
                key={key}
                href={deTagPfad(d)}
                prefetch={false}
                className={cls}
                title={title}
              >
                {inhalt}
              </Link>
            ) : (
              <span key={key} className={cls || undefined} title={title}>
                {inhalt}
              </span>
            );
          }),
        ];
      })}
    </div>
  );
}

export function DeLegende({ land }: { land: boolean }) {
  return (
    <p className="holiday-legend">
      <span className="is-holiday" />{" "}
      {land ? "Feiertag" : "Bundesweiter Feiertag"} <span className="is-half" />{" "}
      {land ? "Regional" : "Feiertag in einigen Ländern"}{" "}
      <span className="takvim-lejant-etkinlik" /> Besonderer Tag{" "}
      <span className="is-weekend" /> Wochenende
    </p>
  );
}
