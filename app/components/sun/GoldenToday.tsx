// Altın saat sayfasının "bugün" bölümleri (Türkçe): bugünkü altın ve mavi saatler en üstte, gün içi ışık şeridi
// çizimi ve 81 ilin bugünkü altın saatleri. Site her gece yeniden derlendiği için kendiliğinden güncellenir.
import Link from "@/app/components/SiteLink";
import { lightWindows, sunTimes } from "../../converter/time/solar";
import { trClock } from "../../converter/time/sunYear";
import { trLocative } from "../../converter/turkishSuffix";
import { trDayText, type TodayPlace, type TrDay } from "./SunToday";

const span = (pair: [Date, Date] | null) => (pair ? `${trClock(pair[0])} – ${trClock(pair[1])}` : "—");

export function goldenToday(place: TodayPlace, t: TrDay) {
  return lightWindows(t.y, t.m, t.d, place.lat, place.lon);
}

/** 24 saatlik şerit: gece, mavi saat, altın saat ve gündüz renkleri, Türkiye saatiyle. */
function LightStrip({ place, t }: { place: TodayPlace; t: TrDay }) {
  const w = goldenToday(place, t);
  const s = sunTimes(t.y, t.m, t.d, place.lat, place.lon);
  const W = 640;
  const dayStart = Date.UTC(t.y, t.m - 1, t.d) - 180 * 60000;
  const x = (d: Date) => ((d.getTime() - dayStart) / 86400000) * W;
  const seg = (pair: [Date, Date] | null, color: string, key: string) =>
    pair ? <rect key={key} x={x(pair[0])} y="10" width={Math.max(1, x(pair[1]) - x(pair[0]))} height="44" fill={color} /> : null;
  return (
    <figure className="sun-path">
      <svg viewBox={`0 0 ${W} 90`} role="img" aria-label={`${place.name} için bugün ışık şeridi: sabah altın saat ${span(w.morningGolden)}, akşam altın saat ${span(w.eveningGolden)}`}>
        <rect x="0" y="10" width={W} height="44" fill="#1f2d4a" rx="6" />
        {s.kind === "normal" && <rect x={x(s.sunrise)} y="10" width={x(s.sunset) - x(s.sunrise)} height="44" fill="#fde68a" />}
        {seg(w.morningBlue, "#3b6fd8", "mb")}
        {seg(w.eveningBlue, "#3b6fd8", "eb")}
        {seg(w.morningGolden, "#f59e0b", "mg")}
        {seg(w.eveningGolden, "#f59e0b", "eg")}
        {[0, 3, 6, 9, 12, 15, 18, 21, 24].map((h) => (
          <text key={h} x={(h / 24) * W} y="76" textAnchor={h === 0 ? "start" : h === 24 ? "end" : "middle"} fontSize="11" fill="#57534e">
            {String(h).padStart(2, "0")}:00
          </text>
        ))}
      </svg>
      <figcaption>
        <span className="sun-legend is-blue">Mavi saat</span> <span className="sun-legend is-golden">Altın saat</span> <span className="sun-legend is-day">Gündüz</span>{" "}
        <span className="sun-legend is-night">Gece</span>
      </figcaption>
    </figure>
  );
}

export function GoldenTodayHero({ places, t }: { places: TodayPlace[]; t: TrDay }) {
  const main = places[0];
  const w = goldenToday(main, t);
  return (
    <section className="sun-today" aria-labelledby="golden-today-title">
      <h2 id="golden-today-title">Bugün, {trDayText(t)}</h2>
      <p className="sun-today-lead">
        {trLocative(main.name)} akşam altın saat <strong>{span(w.eveningGolden)}</strong>, akşam mavi saat <strong>{span(w.eveningBlue)}</strong>. Sabah altın saat{" "}
        {span(w.morningGolden)}.
      </p>
      <div className="sun-today-cards">
        {places.map((p) => {
          const v = goldenToday(p, t);
          return (
            <div className="golden-card is-golden" key={p.id}>
              <span>{p.name}</span>
              <strong>{span(v.eveningGolden)}</strong>
              <em className="sun-card-note">Akşam altın saat · sabah {span(v.morningGolden)}</em>
            </div>
          );
        })}
      </div>
      <LightStrip place={main} t={t} />
    </section>
  );
}

export function GoldenProvinceTable({ places, t }: { places: TodayPlace[]; t: TrDay }) {
  return (
    <div className="holiday-table-wrap">
      <table className="holiday-table">
        <caption>81 ilde bugün ({trDayText(t)}) altın saat ve mavi saat</caption>
        <thead>
          <tr>
            <th scope="col">İl</th>
            <th scope="col">Sabah altın saat</th>
            <th scope="col">Akşam altın saat</th>
            <th scope="col">Akşam mavi saat</th>
          </tr>
        </thead>
        <tbody>
          {places.map((p) => {
            const w = goldenToday(p, t);
            return (
              <tr key={p.id}>
                <th scope="row">
                  <Link href={`/il-rakimlari/${p.id}`}>{p.name}</Link>
                </th>
                <td>{span(w.morningGolden)}</td>
                <td>{span(w.eveningGolden)}</td>
                <td>{span(w.eveningBlue)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
