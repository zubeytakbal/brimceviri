"use client";

import Link from "@/app/components/SiteLink";
import { useEffect, useMemo, useState } from "react";
import { turkeyProvinces } from "../../converter/geo/turkeyProvinces";
import { dayOfYear, isoWeek } from "../../converter/time/dateMath";
import { sunTimes } from "../../converter/time/solar";
import { worldCities } from "../../converter/time/worldCities";

const TZ = "Europe/Istanbul";
const STRIP = ["new-york", "londra", "berlin", "moskova", "mekke", "dubai", "pekin", "tokyo", "sidney"];
const STORAGE_KEY = "saat-ve-tarih-il";

const timeFmt = new Intl.DateTimeFormat("tr-TR", { timeZone: TZ, hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });
const hmFmt = (timeZone: string) => new Intl.DateTimeFormat("tr-TR", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
const dateFmt = new Intl.DateTimeFormat("tr-TR", { timeZone: TZ, day: "numeric", month: "long", year: "numeric", weekday: "long" });

/** Bir saat diliminin o andaki UTC farkı (dakika). */
function offsetMinutes(timeZone: string, at: Date) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })
    .formatToParts(at)
    .reduce<Record<string, number>>((acc, p) => (p.type === "literal" ? acc : { ...acc, [p.type]: Number(p.value) }), {});
  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);
  return Math.round((asUtc - Math.floor(at.getTime() / 60000) * 60000) / 60000);
}

function turkeyYmd(at: Date) {
  const t = new Date(at.getTime() + 3 * 3600000); // Türkiye 2016'dan beri sürekli UTC+3.
  return { year: t.getUTCFullYear(), month: t.getUTCMonth() + 1, day: t.getUTCDate() };
}

function diffLabel(minutes: number) {
  if (minutes === 0) return "aynı saat";
  const sign = minutes > 0 ? "+" : "−";
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `${sign}${h}${m ? `:${String(m).padStart(2, "0")}` : ""} sa`;
}

/** Saat ve Tarih ana sayfasının canlı üst bölümü: büyük saat, tarih, güneş ve dünya şeridi. */
export default function TrTimeHero() {
  const [now, setNow] = useState<Date | null>(null);
  const [provinceId, setProvinceId] = useState("istanbul");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && turkeyProvinces.some((p) => p.id === saved)) setProvinceId(saved);
    } catch {
      // Depolama kapalıysa varsayılan İstanbul kalır.
    }
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const d = new Date();
      setNow(d);
      timer = setTimeout(tick, 1000 - d.getMilliseconds() + 5);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  const province = turkeyProvinces.find((p) => p.id === provinceId) ?? turkeyProvinces[0];
  const ymd = now ? turkeyYmd(now) : null;
  const dayKey = ymd ? `${ymd.year}-${ymd.month}-${ymd.day}` : "";

  const sun = useMemo(() => {
    if (!ymd) return null;
    const s = sunTimes(ymd.year, ymd.month, ymd.day, province.lat, province.lon);
    return s.kind === "normal" ? s : null;
    // dayKey günü temsil eder; saniyelik yeniden hesaplamayı önler.
  }, [dayKey, province.lat, province.lon]); // eslint-disable-line react-hooks/exhaustive-deps

  const strip = useMemo(() => STRIP.map((slug) => worldCities.find((c) => c.tr === slug)).filter((c) => c !== undefined), []);

  const chooseProvince = (id: string) => {
    setProvinceId(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // Tercih kaydedilemezse yalnızca bu ziyarette geçerli olur.
    }
  };

  const hm = hmFmt(TZ);
  const localTz = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : TZ;
  const abroad = now !== null && offsetMinutes(localTz, now) !== offsetMinutes(TZ, now);

  return (
    <section className="timehub-hero" aria-label="Şu anki saat">
      <p className="timehub-hero-label">Türkiye saati (UTC+3)</p>
      <p className="timehub-clock" aria-live="off">
        {now ? timeFmt.format(now) : "--:--:--"}
      </p>
      <p className="timehub-date">
        {now && ymd ? (
          <>
            {dateFmt.format(now)} · {isoWeek(ymd).week}. hafta · yılın {dayOfYear(ymd)}. günü
          </>
        ) : (
          " "
        )}
      </p>
      {abroad && now ? (
        <p className="timehub-local">
          Cihazınızın saati: {new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(now)} ({localTz})
        </p>
      ) : null}

      <div className="timehub-sun">
        <label>
          <span>Güneş</span>
          <select value={province.id} onChange={(event) => chooseProvince(event.target.value)} aria-label="İl seçin">
            {turkeyProvinces.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        {sun ? (
          <span className="timehub-sun-values">
            <span>↑ {hm.format(sun.sunrise)}</span>
            <span>↓ {hm.format(sun.sunset)}</span>
            <span>
              {Math.floor(sun.dayLengthMinutes / 60)} sa {sun.dayLengthMinutes % 60} dk gündüz
            </span>
          </span>
        ) : (
          <span className="timehub-sun-values">--:--</span>
        )}
      </div>

      <ul className="timehub-strip">
        {strip.map((city) => (
          <li key={city.tr}>
            <Link href={`/dunya-saatleri/${city.tr}`}>
              <strong>{city.nameTr}</strong>
              <span>{now ? hmFmt(city.timeZone).format(now) : "--:--"}</span>
              <em>{now ? diffLabel(offsetMinutes(city.timeZone, now) - offsetMinutes(TZ, now)) : " "}</em>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
