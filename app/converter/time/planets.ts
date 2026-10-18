// Çıplak gözle görülen beş gezegenin bir gecedeki görünürlüğü: astronomy-engine (VSOP87 ve NASA JPL
// verileriyle doğrulanmış açık kaynak kütüphane). Bir gece, seçilen günün gün batımından ertesi sabahın gün doğumuna kadardır.
import * as A from "astronomy-engine";
import { compassPoint } from "./moonRiseSet";

export const PLANETS = [
  { body: A.Body.Mercury, id: "merkur", name: "Merkür" },
  { body: A.Body.Venus, id: "venus", name: "Venüs" },
  { body: A.Body.Mars, id: "mars", name: "Mars" },
  { body: A.Body.Jupiter, id: "jupiter", name: "Jüpiter" },
  { body: A.Body.Saturn, id: "saturn", name: "Satürn" },
] as const;

const CONSTELLATIONS_TR: Record<string, string> = {
  Ari: "Koç", Tau: "Boğa", Gem: "İkizler", Cnc: "Yengeç", Leo: "Aslan", Vir: "Başak", Lib: "Terazi", Sco: "Akrep",
  Oph: "Yılancı", Sgr: "Yay", Cap: "Oğlak", Aqr: "Kova", Psc: "Balık", Cet: "Balina", Ori: "Avcı", Sex: "Sekstant",
  Crt: "Kupa", Aur: "Arabacı", Peg: "Kanatlı At", Lep: "Tavşan", Hya: "Suyılanı",
};

export type Visibility = "all-night" | "evening" | "morning" | "late" | "none";

export type PlanetNight = {
  id: string;
  name: string;
  visibility: Visibility;
  rise: Date | null;
  set: Date | null;
  magnitude: number;
  elongation: number;
  constellation: string;
  best: { at: Date; altitude: number; direction: string } | null;
  /** Karanlıkta ufkun 5° üstünde olduğu ilk ve son an. */
  window: { from: Date; to: Date } | null;
};

export type NightInfo = { sunset: Date | null; sunrise: Date | null; planets: PlanetNight[] };

const MIN_ALT = 5;
const MIN_ELONGATION = 10;

function altAz(body: A.Body, date: Date, obs: A.Observer) {
  const t = A.MakeTime(date);
  const eq = A.Equator(body, t, obs, true, true);
  const hor = A.Horizon(t, obs, eq.ra, eq.dec, "normal");
  return { altitude: hor.altitude, azimuth: hor.azimuth, ra: eq.ra, dec: eq.dec };
}

/** Yerel gece: dayStart (yerel gün başlangıcının UTC karşılığı) gününün gün batımı ile ertesi gün doğumu arası. */
export function planetNight(dayStart: Date, lat: number, lon: number): NightInfo {
  const obs = new A.Observer(lat, lon, 0);
  const t0 = A.MakeTime(dayStart);
  const sunsetT = A.SearchRiseSet(A.Body.Sun, obs, -1, t0, 1.2);
  const sunset = sunsetT ? sunsetT.date : null;
  const sunriseT = sunset ? A.SearchRiseSet(A.Body.Sun, obs, +1, A.MakeTime(sunset), 1.2) : null;
  const sunrise = sunriseT ? sunriseT.date : null;

  const planets = PLANETS.map(({ body, id, name }) => {
    const mid = sunset && sunrise ? new Date((sunset.getTime() + sunrise.getTime()) / 2) : new Date(dayStart.getTime() + 24 * 3600000);
    const t = A.MakeTime(mid);
    const elong = A.Elongation(body, t);
    const mag = A.Illumination(body, t).mag;
    const pos = altAz(body, mid, obs);
    const con = A.Constellation(pos.ra, pos.dec);
    const rise = A.SearchRiseSet(body, obs, +1, t0, 1.5)?.date ?? null;
    const set = A.SearchRiseSet(body, obs, -1, t0, 1.5)?.date ?? null;

    let visibility: Visibility = "none";
    let best: PlanetNight["best"] = null;
    let window: PlanetNight["window"] = null;
    if (sunset && sunrise && elong.elongation >= MIN_ELONGATION) {
      // Karanlık: gün batımından 45 dk sonra ile gün doğumundan 45 dk önce arası, 10 dakikalık adımlarla.
      const start = sunset.getTime() + 45 * 60000;
      const end = sunrise.getTime() - 45 * 60000;
      let total = 0;
      let visible = 0;
      for (let ms = start; ms <= end; ms += 10 * 60000) {
        total++;
        const p = altAz(body, new Date(ms), obs);
        if (p.altitude <= MIN_ALT) continue;
        visible++;
        if (!window) window = { from: new Date(ms), to: new Date(ms) };
        else window.to = new Date(ms);
        if (!best || p.altitude > best.altitude) best = { at: new Date(ms), altitude: p.altitude, direction: compassPoint(p.azimuth, "tr") };
      }
      if (window) {
        const atStart = window.from.getTime() - start < 30 * 60000;
        const atEnd = end - window.to.getTime() < 30 * 60000;
        visibility = visible / total >= 0.75 || (atStart && atEnd) ? "all-night" : atStart ? "evening" : atEnd ? "morning" : "late";
      }
    }
    return { id, name, visibility, rise, set, magnitude: mag, elongation: elong.elongation, constellation: CONSTELLATIONS_TR[con.symbol] ?? con.name, best, window };
  });
  return { sunset, sunrise, planets };
}

export const VISIBILITY_TR: Record<Visibility, string> = {
  "all-night": "Gecenin büyük bölümünde görünür",
  evening: "Akşam, gün batımından sonra",
  morning: "Sabah, gün doğumundan önce",
  late: "Gece yarısına doğru",
  none: "Görünmez (Güneş'e yakın ya da ufkun altında)",
};
