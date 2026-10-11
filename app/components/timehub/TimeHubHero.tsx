"use client";

import Link from "@/app/components/SiteLink";
import { useEffect, useMemo, useState } from "react";
import { dayOfYear, isoWeek } from "../../converter/time/dateMath";
import { sunTimes } from "../../converter/time/solar";

/** timeZone: yerin kendi dilimi; verilmezse güneş saatleri sayfanın diliminde yazılır. */
export type HubPlace = { id: string; name: string; lat: number; lon: number; timeZone?: string };
export type HubStripCity = { name: string; timeZone: string; href: string };
export type HubHeroCopy = {
  ariaLabel: string;
  zoneLabel: string;
  /** Yer tutucular: {date} {week} {doy}. Sunucudan gelir, bu yüzden fonksiyon değil metin. */
  dateLine: string;
  /** Yer tutucular: {time} {zone} */
  deviceTime: string;
  sun: string;
  placeLabel: string;
  /** Yer tutucular: {h} {m} */
  dayLength: string;
  same: string;
  hourAbbr: string;
  /** Kutup bölgeleri: güneş hiç batmıyor / hiç doğmuyor. */
  polarDay?: string;
  polarNight?: string;
};

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

/** Bir saat diliminin o andaki UTC farkı (dakika). */
function offsetMinutes(timeZone: string, at: Date) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })
    .formatToParts(at)
    .reduce<Record<string, number>>((acc, p) => (p.type === "literal" ? acc : { ...acc, [p.type]: Number(p.value) }), {});
  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);
  return Math.round((asUtc - Math.floor(at.getTime() / 60000) * 60000) / 60000);
}

/** Saat dilimindeki takvim günü. */
function ymdInZone(timeZone: string, at: Date) {
  const shifted = new Date(at.getTime() + offsetMinutes(timeZone, at) * 60000);
  return { year: shifted.getUTCFullYear(), month: shifted.getUTCMonth() + 1, day: shifted.getUTCDate() };
}

/**
 * Tarih ve saat bölüm ana sayfalarının canlı üst bölümü: büyük saat, tarih,
 * seçilebilir yer için güneş saatleri ve dünya şeridi. Dilden bağımsızdır.
 */
export default function TimeHubHero({
  intlLocale,
  timeZone: configuredZone,
  copy,
  places,
  defaultPlace,
  storageKey,
  strip,
  hourCycle = "h23",
}: {
  /** İngilizce (ABD) için 12 saatlik gösterim. */
  hourCycle?: "h12" | "h23";
  intlLocale: string;
  /** Boş bırakılırsa ziyaretçinin kendi saat dilimi kullanılır (İngilizce sayfa). */
  timeZone: string;
  copy: HubHeroCopy;
  places: HubPlace[];
  defaultPlace: string;
  storageKey: string;
  strip: HubStripCity[];
}) {
  const [now, setNow] = useState<Date | null>(null);
  const [placeId, setPlaceId] = useState(defaultPlace);
  // Sunucuda cihaz dilimi bilinmez; ilk çizimde saat zaten "--:--:--" olduğundan UTC yeterli.
  const timeZone = configuredZone || (now ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved && places.some((p) => p.id === saved)) setPlaceId(saved);
    } catch {
      // Depolama kapalıysa varsayılan yer kalır.
    }
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const d = new Date();
      setNow(d);
      timer = setTimeout(tick, 1000 - d.getMilliseconds() + 5);
    };
    tick();
    return () => clearTimeout(timer);
  }, [places, storageKey]);

  const fmt = useMemo(
    () => ({
      time: new Intl.DateTimeFormat(intlLocale, { timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle }),
      hm: (zone: string) => new Intl.DateTimeFormat(intlLocale, { timeZone: zone, hour: hourCycle === "h12" ? "numeric" : "2-digit", minute: "2-digit", hourCycle }),
      date: new Intl.DateTimeFormat(intlLocale, { timeZone, day: "numeric", month: "long", year: "numeric", weekday: "long" }),
    }),
    [intlLocale, timeZone, hourCycle],
  );

  const place = places.find((p) => p.id === placeId) ?? places[0];
  const ymd = now ? ymdInZone(timeZone, now) : null;
  // Güneş saatleri seçilen yerin kendi takvim gününe göre hesaplanır.
  const sunDay = now ? ymdInZone(place.timeZone ?? timeZone, now) : null;
  const dayKey = sunDay ? `${sunDay.year}-${sunDay.month}-${sunDay.day}` : "";

  const sun = useMemo(() => {
    if (!sunDay) return null;
    return sunTimes(sunDay.year, sunDay.month, sunDay.day, place.lat, place.lon);
    // dayKey günü temsil eder; saniyelik yeniden hesaplamayı önler.
  }, [dayKey, place.lat, place.lon]); // eslint-disable-line react-hooks/exhaustive-deps

  const choosePlace = (id: string) => {
    setPlaceId(id);
    try {
      localStorage.setItem(storageKey, id);
    } catch {
      // Tercih kaydedilemezse yalnızca bu ziyarette geçerli olur.
    }
  };

  const diffLabel = (minutes: number) => {
    if (minutes === 0) return copy.same;
    const abs = Math.abs(minutes);
    const m = abs % 60;
    return `${minutes > 0 ? "+" : "−"}${Math.floor(abs / 60)}${m ? `:${String(m).padStart(2, "0")}` : ""} ${copy.hourAbbr}`;
  };

  const deviceZone = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : timeZone;
  const abroad = now !== null && offsetMinutes(deviceZone, now) !== offsetMinutes(timeZone, now);
  const hm = fmt.hm(place.timeZone ?? timeZone);

  return (
    <section className="timehub-hero" aria-label={copy.ariaLabel}>
      <p className="timehub-hero-label">{copy.zoneLabel}</p>
      <p className="timehub-clock">{now ? fmt.time.format(now) : "--:--:--"}</p>
      <p className="timehub-date">{now && ymd ? fill(copy.dateLine, { date: fmt.date.format(now), week: isoWeek(ymd).week, doy: dayOfYear(ymd) }) : " "}</p>
      {abroad && now ? <p className="timehub-local">{fill(copy.deviceTime, { time: new Intl.DateTimeFormat(intlLocale, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(now), zone: deviceZone })}</p> : null}

      <div className="timehub-sun">
        <label>
          <span>{copy.sun}</span>
          <select value={place.id} onChange={(event) => choosePlace(event.target.value)} aria-label={copy.placeLabel}>
            {places.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <span className="timehub-sun-values">
          {sun?.kind === "normal" ? (
            <>
              <span>↑ {hm.format(sun.sunrise)}</span>
              <span>↓ {hm.format(sun.sunset)}</span>
              <span>{fill(copy.dayLength, { h: Math.floor(sun.dayLengthMinutes / 60), m: sun.dayLengthMinutes % 60 })}</span>
            </>
          ) : sun ? (
            <span>{sun.kind === "polar-day" ? (copy.polarDay ?? "☀") : (copy.polarNight ?? "☾")}</span>
          ) : (
            "--:--"
          )}
        </span>
      </div>

      <ul className="timehub-strip">
        {strip.map((city) => (
          <li key={city.href}>
            <Link href={city.href}>
              <strong>{city.name}</strong>
              <span>{now ? fmt.hm(city.timeZone).format(now) : "--:--"}</span>
              <em>{now ? diffLabel(offsetMinutes(city.timeZone, now) - offsetMinutes(timeZone, now)) : " "}</em>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
