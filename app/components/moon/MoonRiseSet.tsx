"use client";

import { useEffect, useState } from "react";
import { compassPoint, moonEventsForDay, moonHorizontal } from "../../converter/time/moonRiseSet";
import { zoneOffsetMinutes } from "../world/useSecondNow";

// Secilen sehirde ay dogusu, batisi, en yuksek noktasi ve Ay'in su anki konumu.
// Sehir ?sehir= ile ya da "Konumumu kullan" ile secilir; hesap tarayicida yapilir.

export type MoonPlace = { id: string; label: string; group: string; lat: number; lon: number; timeZone: string };

const DAY = 86400000;

const T = {
  tr: {
    choose: "Şehir seçin",
    locate: "Konumumu kullan",
    myLocation: "Konumum",
    locateFail: "Konum alınamadı; listeden bir şehir seçebilirsiniz.",
    headline: (place: string) => `${place} için ay doğuş ve batış saatleri`,
    nowUp: (alt: string, dir: string) => `Ay şu an ufkun üstünde: yüksekliği ${alt}°, ${dir} yönünde.`,
    nowDown: (dir: string) => `Ay şu an ufkun altında (${dir} yönünde); görmek için doğmasını bekleyin.`,
    today: "Bugün",
    date: "Tarih",
    rise: "Ay doğuşu",
    transit: "En yüksek nokta",
    set: "Ay batışı",
    none: "—",
    alwaysUp: "Gün boyu ufkun üstünde",
    alwaysDown: "Gün boyu ufkun altında",
    note:
      "Saatler seçilen şehrin yerel saatidir ve düz bir ufuk için hesaplanır; dağlar ve binalar ayı birkaç dakika geç gösterebilir. Ay her gün ortalama 50 dakika geç doğduğu için ayda bir gün hiç doğuş ya da batış olmaz; tabloda bu günler “—” ile gösterilir.",
  },
  en: {
    choose: "Choose a city",
    locate: "Use my location",
    myLocation: "My location",
    locateFail: "Location unavailable; pick a city from the list instead.",
    headline: (place: string) => `Moonrise and moonset in ${place}`,
    nowUp: (alt: string, dir: string) => `The Moon is above the horizon now: ${alt}° high, towards the ${dir}.`,
    nowDown: (dir: string) => `The Moon is below the horizon now (towards the ${dir}); wait for it to rise.`,
    today: "Today",
    date: "Date",
    rise: "Moonrise",
    transit: "Highest point",
    set: "Moonset",
    none: "—",
    alwaysUp: "Above the horizon all day",
    alwaysDown: "Below the horizon all day",
    note:
      "Times are local to the chosen city and assume a flat horizon; hills and buildings can delay the view by a few minutes. The Moon rises about 50 minutes later each day, so once a month there is a day with no moonrise or no moonset, shown as “—”.",
  },
} as const;

function localMidnight(date: Date, timeZone: string, addDays = 0) {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const get = (type: string) => Number(p.find((x) => x.type === type)!.value);
  const utc = Date.UTC(get("year"), get("month") - 1, get("day") + addDays);
  const offset = zoneOffsetMinutes(timeZone, new Date(utc + 12 * 3600000));
  return new Date(utc - offset * 60000);
}

export default function MoonRiseSet({
  lang,
  places,
  defaultId,
  initialNow,
}: {
  lang: "tr" | "en";
  places: MoonPlace[];
  defaultId: string;
  initialNow: number;
}) {
  const t = T[lang];
  const locale = lang === "tr" ? "tr-TR" : "en-US";
  const [placeId, setPlaceId] = useState(defaultId);
  const [custom, setCustom] = useState<MoonPlace | null>(null);
  const [nowMs, setNowMs] = useState(initialNow);
  const [locError, setLocError] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setNowMs(Date.now());
      const q = new URLSearchParams(window.location.search).get("sehir") ?? new URLSearchParams(window.location.search).get("city");
      if (q && places.some((p) => p.id === q)) setPlaceId(q);
    });
    const timer = window.setInterval(() => setNowMs(Date.now()), 60000);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, [places]);

  const place = custom ?? places.find((p) => p.id === placeId) ?? places[0];

  const choose = (id: string) => {
    setCustom(null);
    setPlaceId(id);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("sehir", id);
      window.history.replaceState(null, "", url);
    } catch {
      // adres guncellenemezse secim yine de calisir
    }
  };

  const locate = () => {
    setLocError(false);
    if (!navigator.geolocation) {
      setLocError(true);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setCustom({
          id: "konum",
          label: t.myLocation,
          group: "",
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      () => setLocError(true),
      { timeout: 10000 },
    );
  };

  const groups = [...new Set(places.map((p) => p.group))];
  const now = new Date(nowMs);
  const fmtTime = (d: Date | null) => (d ? new Intl.DateTimeFormat(locale, { timeZone: place.timeZone, hour: "2-digit", minute: "2-digit" }).format(d) : t.none);
  const rows = Array.from({ length: 7 }, (_, i) => {
    const start = localMidnight(now, place.timeZone, i);
    return { start, ev: moonEventsForDay(start, place.lat, place.lon) };
  });
  const pos = moonHorizontal(now, place.lat, place.lon);

  return (
    <div className="date-calc moon-riseset">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>{t.choose}</span>
            <select value={custom ? "" : place.id} onChange={(e) => choose(e.target.value)}>
              {custom && <option value="">{t.myLocation}</option>}
              {groups.map((g) => (
                <optgroup key={g} label={g}>
                  {places
                    .filter((p) => p.group === g)
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>
          <button type="button" className="moon-locate" onClick={locate}>
            {t.locate}
          </button>
        </div>
        {locError && <p className="date-calc-note">{t.locateFail}</p>}
      </div>

      <div className="moon-riseset-body">
        <h3>{t.headline(place.label)}</h3>
        <p>
          {pos.altitude > 0
            ? t.nowUp(pos.altitude.toLocaleString(locale, { maximumFractionDigits: 0 }), compassPoint(pos.azimuth, lang))
            : t.nowDown(compassPoint(pos.azimuth, lang))}
        </p>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <thead>
              <tr>
                <th>{t.date}</th>
                <th>{t.rise}</th>
                <th>{t.transit}</th>
                <th>{t.set}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ start, ev }, i) => (
                <tr key={start.getTime()}>
                  <td>
                    {i === 0
                      ? t.today
                      : new Intl.DateTimeFormat(locale, { timeZone: place.timeZone, weekday: "short", day: "numeric", month: "short" }).format(
                          new Date(start.getTime() + DAY / 2),
                        )}
                  </td>
                  {ev.always ? (
                    <td colSpan={3}>{ev.always === "up" ? t.alwaysUp : t.alwaysDown}</td>
                  ) : (
                    <>
                      <td>{fmtTime(ev.rise)}</td>
                      <td>
                        {ev.transit ? `${fmtTime(ev.transit)} (${Math.round(ev.transitAltitude ?? 0)}°)` : t.none}
                      </td>
                      <td>{fmtTime(ev.set)}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="moon-strip-note">{t.note}</p>
      </div>
    </div>
  );
}
