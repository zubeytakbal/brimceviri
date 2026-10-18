// Güneş doğuşu sayfasının "bugün" bölümleri. Site her gece yeniden derlendiği için derleme günü Türkiye'deki bugündür;
// cevap (doğuş, batış, gün uzunluğu), güneşin gökyüzündeki yolu ve 81 ilin bugünkü saatleri ham HTML'de yer alır.
import Link from "@/app/components/SiteLink";
import { sunPosition, sunTimes } from "../../converter/time/solar";
import { durationLabel, sunYear, trClock } from "../../converter/time/sunYear";
import { compassName } from "../../converter/time/sunGeometry";
import { trLocative } from "../../converter/turkishSuffix";

export type TodayPlace = { id: string; name: string; lat: number; lon: number };
export type TrDay = { y: number; m: number; d: number };

const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
export const trDayText = (t: TrDay) => `${t.d} ${AYLAR[t.m - 1]} ${t.y}`;

/** Türkiye'de bugünün tarihi (UTC+3). */
export function trToday(now = new Date()): TrDay {
  const t = new Date(now.getTime() + 180 * 60000);
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
}

function day(place: TodayPlace, t: TrDay) {
  const s = sunTimes(t.y, t.m, t.d, place.lat, place.lon);
  if (s.kind !== "normal") throw new Error("Türkiye'de kutup günü olmaz");
  return s;
}

/** Bugünün gün uzunluğunun düne göre farkı, dakika (eksi: kısalıyor). */
export function dayLengthChange(place: TodayPlace, t: TrDay) {
  const prev = new Date(Date.UTC(t.y, t.m - 1, t.d - 1));
  const p = sunTimes(prev.getUTCFullYear(), prev.getUTCMonth() + 1, prev.getUTCDate(), place.lat, place.lon);
  const today = day(place, t);
  return p.kind === "normal" ? today.dayLengthMinutes - p.dayLengthMinutes : 0;
}

const changeText = (min: number) => {
  const sec = Math.round(Math.abs(min) * 60);
  const text = sec >= 60 ? `${Math.floor(sec / 60)} dk${sec % 60 ? ` ${sec % 60} sn` : ""}` : `${sec} sn`;
  return min < 0 ? `dünden ${text} kısa` : min > 0 ? `dünden ${text} uzun` : "dünle aynı";
};

export function todaySummary(place: TodayPlace, t: TrDay) {
  const s = day(place, t);
  return { ...s, change: dayLengthChange(place, t), rise: sunPosition(s.sunrise, place.lat, place.lon), set: sunPosition(s.sunset, place.lat, place.lon), noon: sunPosition(s.solarNoon, place.lat, place.lon) };
}

/** Güneşin bugünkü yolu: yatay eksen saat (05:00–21:00), dikey eksen yükseklik; ufuk çizgisi ve en yüksek nokta. */
function SunPath({ place, t }: { place: TodayPlace; t: TrDay }) {
  const W = 640;
  const H = 230;
  const top = 20;
  const horizon = 160;
  const start = Date.UTC(t.y, t.m - 1, t.d, 2, 0); // 05:00 TSİ
  const end = Date.UTC(t.y, t.m - 1, t.d, 18, 0); // 21:00 TSİ
  const s = todaySummary(place, t);
  const maxEl = 80;
  const x = (ms: number) => ((ms - start) / (end - start)) * W;
  const y = (el: number) => horizon - (el / maxEl) * (horizon - top);
  // Yalnızca ufkun üstündeki yol çizilir (doğuştan batışa).
  const pts: string[] = [];
  for (let ms = s.sunrise.getTime(); ms <= s.sunset.getTime(); ms += 5 * 60000) {
    const el = sunPosition(new Date(ms), place.lat, place.lon).elevation;
    pts.push(`${x(ms).toFixed(1)},${y(Math.max(el, 0)).toFixed(1)}`);
  }
  pts.push(`${x(s.sunset.getTime()).toFixed(1)},${y(0).toFixed(1)}`);
  const hours = [6, 9, 12, 15, 18].map((h) => ({ h, ms: Date.UTC(t.y, t.m - 1, t.d, h - 3, 0) }));
  const noonX = x(s.solarNoon.getTime());
  const noonY = y(s.noon.elevation);
  return (
    <figure className="sun-path">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${place.name} için bugün güneşin yüksekliği: ${trClock(s.sunrise)} doğuş, ${trClock(s.solarNoon)} en yüksek (${Math.round(s.noon.elevation)}°), ${trClock(s.sunset)} batış`}>
        <defs>
          <linearGradient id="sky-day" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#bfe3f7" />
            <stop offset="1" stopColor="#eef7fc" />
          </linearGradient>
        </defs>
        <rect x={x(s.sunrise.getTime())} y={top - 10} width={x(s.sunset.getTime()) - x(s.sunrise.getTime())} height={horizon - top + 10} fill="url(#sky-day)" />
        <rect x="0" y={top - 10} width={x(s.sunrise.getTime())} height={horizon - top + 10} fill="#1f2d4a" opacity="0.85" />
        <rect x={x(s.sunset.getTime())} y={top - 10} width={W - x(s.sunset.getTime())} height={horizon - top + 10} fill="#1f2d4a" opacity="0.85" />
        <rect x="0" y={horizon} width={W} height={H - horizon} fill="#e7e1d2" />
        <line x1="0" x2={W} y1={horizon} y2={horizon} stroke="#8a7f66" strokeWidth="1.5" />
        <polyline points={pts.join(" ")} fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinejoin="round" />
        <circle cx={noonX} cy={noonY} r="11" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <text x={noonX} y={noonY - 18} textAnchor="middle" fontSize="13" fill="#0f172a">
          {trClock(s.solarNoon)} · {Math.round(s.noon.elevation)}°
        </text>
        <text x={x(s.sunrise.getTime())} y={horizon + 20} textAnchor="middle" fontSize="13" fill="#0f172a">
          ↑ {trClock(s.sunrise)}
        </text>
        <text x={x(s.sunset.getTime())} y={horizon + 20} textAnchor="middle" fontSize="13" fill="#0f172a">
          ↓ {trClock(s.sunset)}
        </text>
        {hours.map(({ h, ms }) => (
          <text key={h} x={x(ms)} y={H - 8} textAnchor="middle" fontSize="11" fill="#57534e">
            {String(h).padStart(2, "0")}:00
          </text>
        ))}
      </svg>
      <figcaption>
        {place.name}, {trDayText(t)}: güneş {compassName(s.rise.azimuth).toLowerCase()} yönünden doğar, öğlen ufkun {Math.round(s.noon.elevation)}° üstüne çıkar ve{" "}
        {compassName(s.set.azimuth).toLowerCase()} yönünde batar. Koyu alanlar gece ve alacakaranlıktır.
      </figcaption>
    </figure>
  );
}

/** Aracın üstünde: bugünün cevabı ve güneşin yolu. */
export function SunTodayHero({ places, t }: { places: TodayPlace[]; t: TrDay }) {
  const main = places[0];
  const s = todaySummary(main, t);
  return (
    <section className="sun-today" aria-labelledby="sun-today-title">
      <h2 id="sun-today-title">Bugün, {trDayText(t)}</h2>
      <p className="sun-today-lead">
        {trLocative(main.name)} bugün gün doğumu <strong>{trClock(s.sunrise)}</strong>, gün batımı <strong>{trClock(s.sunset)}</strong>. Gün{" "}
        {durationLabel(s.dayLengthMinutes)} sürüyor ({changeText(s.change)}).
      </p>
      <div className="sun-today-cards">
        {places.map((p) => {
          const v = todaySummary(p, t);
          return (
            <div className="golden-card" key={p.id}>
              <span>{p.name}</span>
              <strong>
                {trClock(v.sunrise)} – {trClock(v.sunset)}
              </strong>
              <em className="sun-card-note">
                Gün {durationLabel(v.dayLengthMinutes)} · {changeText(v.change)}
              </em>
            </div>
          );
        })}
      </div>
      <SunPath place={main} t={t} />
    </section>
  );
}

/** Yıl boyunca gün uzunluğu (İstanbul) ve bugünün yeri. */
export function DayLengthYear({ place, t }: { place: TodayPlace; t: TrDay }) {
  const W = 640;
  const H = 200;
  const days = sunYear(t.y, place.lat, place.lon);
  const minL = Math.min(...days.map((d) => d.dayLength));
  const maxL = Math.max(...days.map((d) => d.dayLength));
  const lo = Math.floor(minL / 60) * 60;
  const hi = Math.ceil(maxL / 60) * 60;
  const x = (i: number) => 40 + (i / (days.length - 1)) * (W - 50);
  const y = (min: number) => 15 + (1 - (min - lo) / (hi - lo)) * (H - 45);
  const todayIndex = days.findIndex((d) => d.month === t.m && d.day === t.d);
  const today = days[todayIndex];
  const ticks: number[] = [];
  for (let v = lo; v <= hi; v += 60) ticks.push(v);
  return (
    <figure className="sun-path">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${place.name} için ${t.y} yılı boyunca gün uzunluğu; en kısa ${durationLabel(minL)}, en uzun ${durationLabel(maxL)}`}>
        {ticks.map((v) => (
          <g key={v}>
            <line x1="40" x2={W - 10} y1={y(v)} y2={y(v)} stroke="#e2e8f0" />
            <text x="34" y={y(v) + 4} textAnchor="end" fontSize="11" fill="#57534e">
              {v / 60} sa
            </text>
          </g>
        ))}
        {AYLAR.map((a, i) => {
          const idx = days.findIndex((d) => d.month === i + 1 && d.day === 1);
          return (
            <text key={a} x={x(idx) + 4} y={H - 8} fontSize="10" fill="#57534e">
              {a.slice(0, 3)}
            </text>
          );
        })}
        <polyline points={days.map((d, i) => `${x(i).toFixed(1)},${y(d.dayLength).toFixed(1)}`).join(" ")} fill="none" stroke="#0f766e" strokeWidth="2.5" />
        {today && (
          <>
            <line x1={x(todayIndex)} x2={x(todayIndex)} y1="10" y2={H - 25} stroke="#f59e0b" strokeDasharray="4 3" />
            <circle cx={x(todayIndex)} cy={y(today.dayLength)} r="6" fill="#f59e0b" />
            <text x={x(todayIndex) + 8} y={y(today.dayLength) - 8} fontSize="12" fill="#0f172a">
              Bugün: {durationLabel(today.dayLength)}
            </text>
          </>
        )}
      </svg>
      <figcaption>
        {trLocative(place.name)} gün uzunluğu {t.y} boyunca {durationLabel(minL)} ile {durationLabel(maxL)} arasında değişir. Ayrıntı için{" "}
        <Link href="/en-uzun-gun-ve-en-kisa-gun">en uzun ve en kısa gün</Link> sayfasına bakın.
      </figcaption>
    </figure>
  );
}

/** 81 ilde bugünkü doğuş, batış ve gün uzunluğu. */
export function TodayProvinceTable({ places, t }: { places: TodayPlace[]; t: TrDay }) {
  return (
    <div className="holiday-table-wrap">
      <table className="holiday-table">
        <caption>81 ilde bugün ({trDayText(t)}) gün doğumu ve gün batımı</caption>
        <thead>
          <tr>
            <th scope="col">İl</th>
            <th scope="col">Gün doğumu</th>
            <th scope="col">Gün batımı</th>
            <th scope="col">Gün uzunluğu</th>
          </tr>
        </thead>
        <tbody>
          {places.map((p) => {
            const s = day(p, t);
            return (
              <tr key={p.id}>
                <th scope="row">
                  <Link href={`/il-rakimlari/${p.id}`}>{p.name}</Link>
                </th>
                <td>{trClock(s.sunrise)}</td>
                <td>{trClock(s.sunset)}</td>
                <td>{durationLabel(s.dayLengthMinutes)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
