// Gökyüzü olayları takvimi: meteor yağmurlarının zirvesi, tutulmalar, dolunaylar, mevsim başlangıçları, gezegenlerin
// karşı konumu ve en büyük uzanımı, Ay–gezegen ve gezegen–gezegen yakınlaşmaları. Konumlar astronomy-engine (VSOP87,
// NASA JPL ile doğrulanmış) ile hesaplanır; meteor yağmurlarının değerleri IMO'nun görsel meteor yağmurları çalışma listesinden alınmıştır.
import * as A from "astronomy-engine";
import { LUNAR_ECLIPSES, SOLAR_ECLIPSES } from "./eclipses";
import { moonPosition } from "./moonPosition";
import { compassPoint } from "./moonRiseSet";

export type SkyEventKind = "meteor" | "eclipse" | "moon" | "planet" | "season";

/** when: tabloda saat yerine gösterilecek metin (ör. meteor yağmurlarında "13–14 Aralık gecesi"). */
export type SkyEvent = { at: Date; kind: SkyEventKind; title: string; detail: string; when?: string };

/** IMO çalışma listesi: zirve için Güneş boylamı (λ⊙, J2000), ZHR ve radyant (RA, Dec derece). */
export const METEOR_SHOWERS = [
  { id: "qua", name: "Kuadrantidler", lambda: 283.15, zhr: 80, ra: 230, dec: 49, active: "28 Aralık – 12 Ocak", parent: "2003 EH1 asteroidi" },
  { id: "lyr", name: "Liridler", lambda: 32.32, zhr: 18, ra: 271, dec: 34, active: "14 – 30 Nisan", parent: "C/1861 G1 (Thatcher) kuyrukluyıldızı" },
  { id: "eta", name: "Eta Akuaridler", lambda: 45.5, zhr: 50, ra: 338, dec: -1, active: "19 Nisan – 28 Mayıs", parent: "1P/Halley kuyrukluyıldızı" },
  { id: "sda", name: "Güney Delta Akuaridler", lambda: 128, zhr: 25, ra: 340, dec: -16, active: "12 Temmuz – 23 Ağustos", parent: "96P/Machholz kuyrukluyıldızı" },
  { id: "per", name: "Perseidler", lambda: 140.0, zhr: 100, ra: 48, dec: 58, active: "17 Temmuz – 24 Ağustos", parent: "109P/Swift-Tuttle kuyrukluyıldızı" },
  { id: "ori", name: "Orionidler", lambda: 208, zhr: 20, ra: 95, dec: 16, active: "2 Ekim – 7 Kasım", parent: "1P/Halley kuyrukluyıldızı" },
  { id: "leo", name: "Leonidler", lambda: 235.27, zhr: 15, ra: 152, dec: 22, active: "6 – 30 Kasım", parent: "55P/Tempel-Tuttle kuyrukluyıldızı" },
  { id: "gem", name: "Geminidler", lambda: 262.2, zhr: 150, ra: 112, dec: 33, active: "4 – 20 Aralık", parent: "3200 Phaethon asteroidi" },
  { id: "urs", name: "Ursidler", lambda: 270.7, zhr: 10, ra: 217, dec: 76, active: "17 – 26 Aralık", parent: "8P/Tuttle kuyrukluyıldızı" },
] as const;

export type MeteorPeak = {
  id: string;
  name: string;
  peak: Date;
  zhr: number;
  active: string;
  parent: string;
  /** Zirve anında Ay'ın aydınlanan yüzdesi. */
  moonPercent: number;
  /** Zirveye en yakın gecede, karanlıkta radyantın en yüksek olduğu an ve yüksekliği (Ankara). */
  best: { at: Date; altitude: number } | null;
  /** Zirveye en yakın gecenin ortası (UTC 21:00 = Türkiye'de gece yarısı). */
  nightMid: Date;
  /** ZHR × sin(radyant yüksekliği): karanlık ve açık gökte saatte beklenebilecek en yüksek sayı. */
  expected: number;
};

const ANKARA = new A.Observer(39.93, 32.85, 0);
const HOUR = 3600000;
const DAY = 24 * HOUR;
const trClock = (d: Date) => new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", hour: "2-digit", minute: "2-digit" }).format(d);

const trDay = (d: Date, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" }) =>
  new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", ...opts }).format(d);
/** Akşam başlayan gecenin adı: "13–14 Aralık gecesi" ya da "31 Aralık – 1 Ocak gecesi". */
export function nightName(nightMid: Date) {
  const a = new Date(nightMid.getTime() - 6 * HOUR);
  const b = new Date(nightMid.getTime() + 6 * HOUR);
  const sameMonth = trDay(a, { month: "long" }) === trDay(b, { month: "long" });
  return sameMonth ? `${trDay(a, { day: "numeric" })}–${trDay(b)} gecesi` : `${trDay(a)} – ${trDay(b)} gecesi`;
}

const moonPercent = (d: Date) => Math.round(A.Illumination(A.Body.Moon, d).phase_fraction * 100);
const sunAltitude = (d: Date) => {
  const eq = A.Equator(A.Body.Sun, d, ANKARA, true, true);
  return A.Horizon(d, ANKARA, eq.ra, eq.dec, "normal").altitude;
};

/** Verilen yıldaki zirve; peak, yılın 1 Ocak'ından itibaren Güneş'in λ boylamına geldiği an. */
export function meteorPeak(shower: (typeof METEOR_SHOWERS)[number], year: number): MeteorPeak {
  const peak = A.SearchSunLongitude(shower.lambda, new Date(Date.UTC(year, 0, 1)), 366)!.date;
  // Zirveye en yakın gece: zirveden önceki 18 saat içindeki gün batımından başlar (Türkiye'de gece yarısı ~21:00 UTC).
  const nightMid = new Date(Math.round((peak.getTime() - 21 * HOUR) / DAY) * DAY + 21 * HOUR);
  let best: MeteorPeak["best"] = null;
  for (let ms = nightMid.getTime() - 8 * HOUR; ms <= nightMid.getTime() + 8 * HOUR; ms += 15 * 60000) {
    const d = new Date(ms);
    if (sunAltitude(d) > -12) continue;
    const altitude = A.Horizon(d, ANKARA, shower.ra / 15, shower.dec).altitude;
    if (!best || altitude > best.altitude) best = { at: d, altitude };
  }
  const expected = best && best.altitude > 0 ? Math.round(shower.zhr * Math.sin((best.altitude * Math.PI) / 180)) : 0;
  return { id: shower.id, name: shower.name, peak, nightMid, zhr: shower.zhr, active: shower.active, parent: shower.parent, moonPercent: moonPercent(peak), best, expected };
}

const PLANETS = [
  { body: A.Body.Mercury, name: "Merkür" },
  { body: A.Body.Venus, name: "Venüs" },
  { body: A.Body.Mars, name: "Mars" },
  { body: A.Body.Jupiter, name: "Jüpiter" },
  { body: A.Body.Saturn, name: "Satürn" },
] as const;

const separation = (a: A.Body, b: A.Body, d: Date) => A.AngleBetween(A.GeoVector(a, d, true), A.GeoVector(b, d, true));
/** Güneş'in doğusundaki cisim akşam, batısındaki sabah görülür. */
const deg = (v: number) => v.toLocaleString("tr-TR", { maximumFractionDigits: 1 });

/** f'nin step aralıklı örneklerde yerel minimumları (sınır altındakiler), komşu örneklerle parabolle inceltilmiş. */
function minima(from: number, to: number, step: number, f: (d: Date) => number, limit: number) {
  const out: { at: Date; value: number }[] = [];
  let a = f(new Date(from));
  let b = f(new Date(from + step));
  for (let ms = from + step; ms + step <= to; ms += step) {
    const c = f(new Date(ms + step));
    if (b < a && b <= c && b < limit) {
      const denom = a - 2 * b + c;
      const shift = denom > 0 ? (0.5 * (a - c)) / denom : 0;
      const at = new Date(ms + shift * step);
      out.push({ at, value: f(at) });
    }
    a = b;
    b = c;
  }
  return out;
}

function topo(body: A.Body, d: Date) {
  const eq = A.Equator(body, d, ANKARA, true, true);
  const hor = A.Horizon(d, ANKARA, eq.ra, eq.dec, "normal");
  return { eq, alt: hor.altitude, az: hor.azimuth };
}

/**
 * En yakın konumun ±14 saati içinde Ankara'da alacakaranlıkta ya da gece (Güneş −4°'nin altında) iki cismin de ufkun 3° üstünde olduğu
 * an. Ay hızlı hareket ettiği için Ay'lı çiftlerde birbirine en yakın göründüğü, gezegen çiftlerinde en yüksekte olduğu an seçilir.
 */
function bestView(a: A.Body, b: A.Body, around: Date) {
  let best: { at: Date; separation: number; az: number; alt: number; score: number } | null = null;
  for (let ms = around.getTime() - 14 * HOUR; ms <= around.getTime() + 14 * HOUR; ms += 15 * 60000) {
    const d = new Date(ms);
    if (sunAltitude(d) > -4) continue;
    const pa = topo(a, d);
    const pb = topo(b, d);
    if (pa.alt < 3 || pb.alt < 3) continue;
    const separation = A.AngleBetween(pa.eq.vec, pb.eq.vec);
    const score = a === A.Body.Moon ? separation : -Math.min(pa.alt, pb.alt);
    if (!best || score < best.score) best = { at: d, separation, az: pb.az, alt: Math.min(pa.alt, pb.alt), score };
  }
  return best && best.separation < 4 ? best : null;
}
const where = (v: { at: Date; az: number; alt: number }) =>
  `${trClock(v.at)} civarında ${compassPoint(v.az, "tr")} yönünde${v.alt < 10 ? `, ufka yakın (${Math.round(v.alt)}°)` : ""}`;

const ECLIPSE_LUNAR = { total: "Tam ay tutulması", partial: "Parçalı ay tutulması", penumbral: "Yarı gölge ay tutulması" } as const;
const ECLIPSE_SOLAR = { total: "Tam güneş tutulması", annular: "Halkalı güneş tutulması", partial: "Parçalı güneş tutulması", hybrid: "Melez güneş tutulması" } as const;
const LUNAR_TURKEY = { full: "Türkiye'den baştan sona görülür.", partly: "Türkiye'den kısmen görülür (Ay doğarken ya da batarken).", none: "Türkiye'den görülmez." } as const;

/** [from, to) aralığındaki tüm olaylar, zaman sırasıyla. */
export function skyEvents(from: Date, to: Date): SkyEvent[] {
  const events: SkyEvent[] = [];
  const inRange = (d: Date) => d >= from && d < to;
  const years: number[] = [];
  for (let y = from.getUTCFullYear(); y <= to.getUTCFullYear(); y++) years.push(y);

  for (const y of years) {
    for (const s of METEOR_SHOWERS) {
      const m = meteorPeak(s, y);
      if (!inRange(m.peak)) continue;
      const sky = m.best && m.expected > 0 ? `En iyi saat ${trClock(m.best.at)} civarı; açık ve karanlık gökte saatte en çok ~${m.expected} meteor.` : "Radyant Türkiye'den karanlıkta ufkun altında kalır.";
      events.push({ at: m.peak, kind: "meteor", title: `${m.name} meteor yağmuru zirvesi`, detail: `${sky} Ay %${m.moonPercent} aydınlık.`, when: nightName(m.nightMid) });
    }

    const seasons = A.Seasons(y);
    for (const [t, title] of [
      [seasons.mar_equinox, "İlkbahar ekinoksu (gece-gündüz eşitliği)"],
      [seasons.jun_solstice, "Yaz gündönümü (yılın en uzun günü)"],
      [seasons.sep_equinox, "Sonbahar ekinoksu (gece-gündüz eşitliği)"],
      [seasons.dec_solstice, "Kış gündönümü (yılın en kısa günü)"],
    ] as const) {
      if (inRange(t.date)) events.push({ at: t.date, kind: "season", title, detail: "Güneş'in gök ekvatoruna ve dönencelere göre konumu; astronomik mevsim başlangıcı." });
    }

    // Dolunaylar: her takvim yılının en yakın ve en uzak dolunayı işaretlenir (ay evreleri sayfasıyla aynı yöntem).
    const fulls: { date: Date; km: number }[] = [];
    let t = A.SearchMoonPhase(180, new Date(Date.UTC(y, 0, 1) - 3 * HOUR), 40);
    while (t && t.date < new Date(Date.UTC(y + 1, 0, 1) - 3 * HOUR)) {
      fulls.push({ date: t.date, km: moonPosition(t.date).distance });
      t = A.SearchMoonPhase(180, new Date(t.date.getTime() + 20 * DAY), 40);
    }
    const near = fulls.reduce((a, b) => (b.km < a.km ? b : a));
    const far = fulls.reduce((a, b) => (b.km > a.km ? b : a));
    for (const f of fulls) {
      if (!inRange(f.date)) continue;
      const km = Math.round(f.km).toLocaleString("tr-TR");
      const title = f === near ? `Süper ay: ${y} yılının en büyük dolunayı` : f === far ? `Mikro ay: ${y} yılının en küçük dolunayı` : "Dolunay";
      events.push({ at: f.date, kind: "moon", title, detail: `Ay'ın Dünya'ya uzaklığı ${km} km.` });
    }
  }

  // Dünya'nın Güneş'e en yakın ve en uzak noktası.
  let apsis = A.SearchPlanetApsis(A.Body.Earth, new Date(from.getTime() - 200 * DAY));
  while (apsis.time.date < to) {
    if (inRange(apsis.time.date)) {
      const km = Math.round(apsis.dist_km / 1e3) * 1e3;
      events.push({
        at: apsis.time.date,
        kind: "season",
        title: apsis.kind === 0 ? "Dünya Güneş'e en yakın noktada (günberi)" : "Dünya Güneş'e en uzak noktada (günöte)",
        detail: `Güneş'e uzaklık yaklaşık ${km.toLocaleString("tr-TR")} km.`,
      });
    }
    apsis = A.NextPlanetApsis(A.Body.Earth, apsis);
  }

  for (const e of LUNAR_ECLIPSES) {
    const at = new Date(e.peak);
    if (!inRange(at)) continue;
    const length = e.totalMinutes ? ` Tam evre ${e.totalMinutes} dakika.` : e.partialMinutes ? ` Parçalı evre ${e.partialMinutes} dakika.` : "";
    events.push({ at, kind: "eclipse", title: ECLIPSE_LUNAR[e.kind], detail: `${LUNAR_TURKEY[e.turkey]}${length}` });
  }
  for (const e of SOLAR_ECLIPSES) {
    const at = new Date(e.peak);
    if (!inRange(at)) continue;
    const o = e.obscuration;
    const detail =
      o.istanbul || o.ankara || o.izmir || o.van
        ? `Türkiye'den görülür: Güneş diskinin örtülen kısmı İstanbul %${o.istanbul}, Ankara %${o.ankara}, İzmir %${o.izmir}, Van %${o.van}. Güneş'e korumasız bakmayın.`
        : "Türkiye'den görülmez.";
    events.push({ at, kind: "eclipse", title: ECLIPSE_SOLAR[e.kind], detail });
  }

  for (const p of PLANETS.slice(2)) {
    let t = A.SearchRelativeLongitude(p.body, 0, new Date(from.getTime() - 400 * DAY));
    while (t.date < to) {
      if (inRange(t.date)) {
        const mag = A.Illumination(p.body, t).mag;
        events.push({
          at: t.date,
          kind: "planet",
          title: `${p.name} karşı konumda`,
          detail: `${p.name} Güneş'in tam karşısında: gün batımında doğar, bütün gece görülür ve yılın en parlak hâlindedir (kadir ${deg(mag)}).`,
        });
      }
      t = A.SearchRelativeLongitude(p.body, 0, new Date(t.date.getTime() + 30 * DAY));
    }
  }
  for (const p of PLANETS.slice(0, 2)) {
    let e = A.SearchMaxElongation(p.body, new Date(from.getTime() - 200 * DAY));
    while (e.time.date < to) {
      if (inRange(e.time.date)) {
        const evening = e.visibility === "evening";
        events.push({
          at: e.time.date,
          kind: "planet",
          title: `${p.name} en büyük ${evening ? "doğu" : "batı"} uzanımında`,
          detail: `${p.name} Güneş'ten ${deg(e.elongation)}° uzakta; ${evening ? "gün batımından sonra batı ufkunda" : "gün doğumundan önce doğu ufkunda"} görmek için en uygun günler.`,
        });
      }
      e = A.SearchMaxElongation(p.body, new Date(e.time.date.getTime() + 10 * DAY));
    }
  }

  // Ay–gezegen yakınlaşmaları (yer merkezli 3°'den yakın). Gösterilen an, en yakın konumun ±14 saati içinde Ankara'da
  // Türkiye'den görülebildiği ve birbirine en yakın göründüğü andır (bestView).
  for (const p of PLANETS.slice(1)) {
    for (const m of minima(from.getTime(), to.getTime(), HOUR, (d) => separation(A.Body.Moon, p.body, d), 3)) {
      const view = bestView(A.Body.Moon, p.body, m.at);
      if (!view) continue;
      events.push({
        at: view.at,
        kind: "planet",
        title: `Ay ve ${p.name} yan yana`,
        detail: `${where(view)}, aralarında yaklaşık ${deg(view.separation)}°. Ay %${moonPercent(view.at)} aydınlık.`,
      });
    }
  }
  // Gezegen–gezegen yakınlaşmaları (2°'den yakın, ikisi de Güneş'ten en az 15° uzakta).
  for (let i = 0; i < PLANETS.length; i++) {
    for (let j = i + 1; j < PLANETS.length; j++) {
      const a = PLANETS[i];
      const b = PLANETS[j];
      for (const m of minima(from.getTime(), to.getTime(), 6 * HOUR, (d) => separation(a.body, b.body, d), 2)) {
        const view = bestView(a.body, b.body, m.at);
        if (!view) continue;
        events.push({
          at: view.at,
          kind: "planet",
          title: `${a.name} ve ${b.name} yakınlaşması`,
          detail: `${where(view)}, aralarında yaklaşık ${deg(m.value)}°. İki gezegen birkaç gün boyunca yakın görünür.`,
        });
      }
    }
  }

  return events.sort((x, y) => x.at.getTime() - y.at.getTime());
}
