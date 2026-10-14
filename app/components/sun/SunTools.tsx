"use client";

import { useEffect, useMemo, useState } from "react";
import { sunPosition, sunTimes, twilight } from "../../converter/time/solar";
import { trDative, trLocative } from "../../converter/turkishSuffix";
import { durationLabel, firstSunsetAtOrAfter, sunExtremes, sunYear, trClock, trDayLabel, trMinutes, trSeasons } from "../../converter/time/sunYear";

export type SunCity = { id: string; name: string; lat: number; lon: number };

const pad = (n: number) => String(n).padStart(2, "0");
const isoToday = () => {
  const now = new Date(Date.now() + 180 * 60000);
  return `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())}`;
};
const parseIso = (v: string) => {
  const [y, m, d] = v.split("-").map(Number);
  return y && m && d ? { y, m, d } : null;
};
const signedMinutes = (min: number) => {
  const total = Math.round(Math.abs(min) * 60);
  const text = total >= 60 ? `${Math.floor(total / 60)} dk ${total % 60} sn` : `${total} sn`;
  return `${min >= 0 ? "+" : "−"}${text}`;
};

function Card({ label, value, note, tone }: { label: string; value: string; note?: string; tone?: "golden" | "blue" }) {
  return (
    <div className={tone ? `golden-card is-${tone}` : "golden-card"}>
      <span>{label}</span>
      <strong>{value}</strong>
      {note ? <em className="sun-card-note">{note}</em> : null}
    </div>
  );
}

function usePlace(cities: SunCity[], initial: string) {
  const [id, setId] = useState(initial);
  const [custom, setCustom] = useState<SunCity | null>(null);
  const [error, setError] = useState("");
  const place = custom ?? cities.find((c) => c.id === id) ?? cities[0];
  const locate = () => {
    setError("");
    if (!navigator.geolocation) return setError("Tarayıcınız konum desteklemiyor; listeden il seçin.");
    navigator.geolocation.getCurrentPosition(
      (pos) => setCustom({ id: "__me", name: "Konumum", lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => setError("Konum alınamadı. Tarayıcı izni verip tekrar deneyin ya da listeden il seçin."),
      { timeout: 10000 },
    );
  };
  const select = (v: string) => {
    if (v === "__me") return;
    setCustom(null);
    setId(v);
  };
  return { place, custom, id, select, locate, error };
}

function CitySelect({ label, value, cities, onChange, withMe, withNone }: { label: string; value: string; cities: SunCity[]; onChange: (v: string) => void; withMe?: boolean; withNone?: boolean }) {
  return (
    <label>
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {withNone ? <option value="">Seçmeyin</option> : null}
        {withMe ? <option value="__me">Konumum</option> : null}
        {cities.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Gün şeridi: gece, astronomik/denizcilik/sivil alacakaranlık ve gündüz dilimleri (Türkiye saati). */
function DayStrip({ y, m, d, lat, lon }: { y: number; m: number; d: number; lat: number; lon: number }) {
  const tw = twilight(y, m, d, lat, lon);
  const s = sunTimes(y, m, d, lat, lon);
  if (s.kind !== "normal" || !tw.civil || !tw.nautical || !tw.astronomical) return null;
  const pts = [tw.astronomical[0], tw.nautical[0], tw.civil[0], s.sunrise, s.sunset, tw.civil[1], tw.nautical[1], tw.astronomical[1]].map(trMinutes);
  const kinds = ["night", "astro", "nautical", "civil", "day", "civil", "nautical", "astro", "night"] as const;
  const edges = [0, ...pts, 1440];
  return (
    <div>
      <div className="golden-strip sun-strip" role="img" aria-label="Günün aydınlık ve karanlık dilimleri">
        {kinds.map((k, i) =>
          edges[i + 1] > edges[i] ? <span key={i} className={`is-${k}`} style={{ left: `${(edges[i] / 1440) * 100}%`, width: `${((edges[i + 1] - edges[i]) / 1440) * 100}%` }} /> : null,
        )}
        {[0, 6, 12, 18, 24].map((h) => (
          <i key={h} style={{ left: `${(h / 24) * 100}%` }}>
            {pad(h % 24)}
          </i>
        ))}
      </div>
      <ul className="sun-legend">
        <li className="is-day">Gündüz</li>
        <li className="is-civil">Sivil alacakaranlık</li>
        <li className="is-nautical">Denizcilik alacakaranlığı</li>
        <li className="is-astro">Astronomik alacakaranlık</li>
        <li className="is-night">Gece</li>
      </ul>
    </div>
  );
}

/** Yıllık grafik: x ekseni günler, y ekseni Türkiye saati; doğuş ile batış arası gündüz. */
function YearChart({ year, lat, lon, mark }: { year: number; lat: number; lon: number; mark: { m: number; d: number } }) {
  const days = useMemo(() => sunYear(year, lat, lon), [year, lat, lon]);
  const W = 720;
  const H = 260;
  const L = 34;
  const T = 8;
  const pw = W - L - 8;
  const ph = H - T - 24;
  const x = (i: number) => L + (i / (days.length - 1)) * pw;
  const y = (min: number) => T + (min / 1440) * ph;
  const rise = days.map((d, i) => `${x(i).toFixed(1)},${y(trMinutes(d.sunrise)).toFixed(1)}`);
  const set = days.map((d, i) => `${x(i).toFixed(1)},${y(trMinutes(d.sunset)).toFixed(1)}`);
  const band = `M${rise.join(" L")} L${[...set].reverse().join(" L")} Z`;
  const markIndex = days.findIndex((d) => d.month === mark.m && d.day === mark.d);
  const monthStarts = days.map((d, i) => (d.day === 1 ? i : -1)).filter((i) => i >= 0);
  const MONTHS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
  return (
    <figure className="sun-chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${year} yılı boyunca güneş doğuş ve batış saatleri`}>
        <rect x={L} y={T} width={pw} height={ph} className="sun-chart-night" />
        <path d={band} className="sun-chart-day" />
        <polyline points={rise.join(" ")} className="sun-chart-line" />
        <polyline points={set.join(" ")} className="sun-chart-line" />
        {[0, 6, 12, 18, 24].map((h) => (
          <g key={h}>
            <line x1={L} x2={L + pw} y1={y(h * 60)} y2={y(h * 60)} className="sun-chart-grid" />
            <text x={L - 6} y={y(h * 60) + 4} textAnchor="end" className="sun-chart-label">
              {pad(h % 24)}
            </text>
          </g>
        ))}
        {monthStarts.map((i, k) => (
          <text key={i} x={x(i) + 4} y={H - 6} className="sun-chart-label">
            {MONTHS[k]}
          </text>
        ))}
        {markIndex >= 0 ? <line x1={x(markIndex)} x2={x(markIndex)} y1={T} y2={T + ph} className="sun-chart-mark" /> : null}
      </svg>
      <figcaption>Açık bölge gündüz; kırmızı çizgi seçilen tarih. Saatler Türkiye saatidir (UTC+3).</figcaption>
    </figure>
  );
}

/* ---------------- Güneş doğuşu ve batışı aracı ---------------- */

export function SunriseTool({ cities }: { cities: SunCity[] }) {
  const { place, custom, id, select, locate, error } = usePlace(cities, "ankara");
  const [cmpId, setCmpId] = useState("van");
  const [date, setDate] = useState("");
  useEffect(() => {
    const f = requestAnimationFrame(() => setDate(isoToday()));
    return () => cancelAnimationFrame(f);
  }, []);
  const p = useMemo(() => parseIso(date), [date]);
  const cmp = cities.find((c) => c.id === cmpId) ?? null;

  const r = useMemo(() => {
    if (!p) return null;
    const s = sunTimes(p.y, p.m, p.d, place.lat, place.lon);
    if (s.kind !== "normal") return null;
    const prev = new Date(Date.UTC(p.y, p.m - 1, p.d - 1));
    const sp = sunTimes(prev.getUTCFullYear(), prev.getUTCMonth() + 1, prev.getUTCDate(), place.lat, place.lon);
    const len = (s.sunset.getTime() - s.sunrise.getTime()) / 60000;
    const prevLen = sp.kind === "normal" ? (sp.sunset.getTime() - sp.sunrise.getTime()) / 60000 : len;
    const tw = twilight(p.y, p.m, p.d, place.lat, place.lon);
    const noonAlt = sunPosition(s.solarNoon, place.lat, place.lon).elevation;
    // Son gündönümünden bu yana değişim
    const seasonsThis = trSeasons(p.y);
    const dec = seasonsThis[3].date;
    const jun = seasonsThis[1].date;
    const day = Date.UTC(p.y, p.m - 1, p.d, 12);
    const ref = day >= dec.getTime() ? { label: "21 Aralık'tan", y: p.y, m: 12, d: 21 } : day >= jun.getTime() ? { label: "21 Haziran'dan", y: p.y, m: 6, d: 21 } : { label: "21 Aralık'tan", y: p.y - 1, m: 12, d: 21 };
    const sr = sunTimes(ref.y, ref.m, ref.d, place.lat, place.lon);
    const refLen = sr.kind === "normal" ? (sr.sunset.getTime() - sr.sunrise.getTime()) / 60000 : len;
    const after18 = firstSunsetAtOrAfter(p.y, place.lat, place.lon, 18);
    return { s, len, delta: len - prevLen, tw, noonAlt, ref, sinceRef: len - refLen, after18 };
  }, [p, place.lat, place.lon]);

  const c = useMemo(() => {
    if (!p || !cmp) return null;
    const a = sunTimes(p.y, p.m, p.d, place.lat, place.lon);
    const b = sunTimes(p.y, p.m, p.d, cmp.lat, cmp.lon);
    if (a.kind !== "normal" || b.kind !== "normal") return null;
    return { rise: (b.sunrise.getTime() - a.sunrise.getTime()) / 60000, set: (b.sunset.getTime() - a.sunset.getTime()) / 60000, b };
  }, [p, place.lat, place.lon, cmp]);

  const span = (pair: [Date, Date] | null) => (pair ? `${trClock(pair[0])} – ${trClock(pair[1])}` : "—");

  return (
    <div className="golden-tool sun-tool">
      <div className="golden-controls">
        <CitySelect label="İl" value={custom ? "__me" : id} cities={cities} onChange={select} withMe={!!custom} />
        <label>
          <span>Tarih</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <button type="button" className="time-tool-button is-secondary" onClick={locate}>
          📍 Konumumu kullan
        </button>
      </div>
      {error ? <p className="golden-error">{error}</p> : null}
      {p && r ? (
        <>
          <DayStrip y={p.y} m={p.m} d={p.d} lat={place.lat} lon={place.lon} />
          <div className="golden-cards">
            <Card tone="golden" label="Gün doğumu" value={trClock(r.s.sunrise)} />
            <Card tone="golden" label="Gün batımı" value={trClock(r.s.sunset)} />
            <Card label="Gün uzunluğu" value={durationLabel(r.len)} note={`Dünden ${signedMinutes(r.delta)}`} />
            <Card label="Güneş en tepede" value={trClock(r.s.solarNoon)} note={`Yükseklik ${r.noonAlt.toFixed(1).replace(".", ",")}°`} />
            <Card tone="blue" label="Sivil alacakaranlık" value={span(r.tw.civil)} note="Lamba gerekmeden görülebilir" />
            <Card tone="blue" label="Denizcilik alacakaranlığı" value={span(r.tw.nautical)} note="Ufuk çizgisi seçilebilir" />
            <Card tone="blue" label="Astronomik alacakaranlık" value={span(r.tw.astronomical)} note="Gökyüzü tamamen kararır" />
            <Card
              label={`${r.ref.label} bu yana`}
              value={`${r.sinceRef >= 0 ? "+" : "−"}${durationLabel(Math.abs(r.sinceRef))}`}
              note={r.sinceRef >= 0 ? "Günler uzadı" : "Günler kısaldı"}
            />
            {r.after18 ? <Card label={`${trLocative(p.y)} 18:00 sonrası ilk batış`} value={trDayLabel(r.after18.month, r.after18.day)} note={`Batış ${trClock(r.after18.sunset)}`} /> : null}
          </div>
          <YearChart year={p.y} lat={place.lat} lon={place.lon} mark={{ m: p.m, d: p.d }} />
          <div className="golden-controls sun-compare">
            <CitySelect label="Karşılaştırılacak il" value={cmpId} cities={cities} onChange={setCmpId} withNone />
          </div>
          {c && cmp ? (
            <p className="sun-compare-text">
              {trLocative(cmp.name)} doğuş saati {trClock(c.b.sunrise)}, batış saati {trClock(c.b.sunset)}. {trDative(place.name)} göre doğuş{" "}
              <strong>{Math.abs(Math.round(c.rise))} dakika {c.rise < 0 ? "erken" : "geç"}</strong>, batış{" "}
              <strong>{Math.abs(Math.round(c.set))} dakika {c.set < 0 ? "erken" : "geç"}</strong>.
            </p>
          ) : null}
        </>
      ) : (
        <p className="golden-error">Geçerli bir tarih seçin.</p>
      )}
      <p className="sun-foot">Saatler Türkiye saatidir (UTC+3), düz ufuk ve deniz seviyesi içindir. Namaz vakitleri için Diyanet&apos;in yayımladığı takvimi kullanın.</p>
    </div>
  );
}

/* ---------------- Gündönümü aracı ---------------- */

function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const f = requestAnimationFrame(() => setNow(Date.now()));
    const t = setInterval(() => setNow(Date.now()), 60000);
    return () => {
      cancelAnimationFrame(f);
      clearInterval(t);
    };
  }, []);
  return now;
}

const trFull = (d: Date) => {
  const t = new Date(d.getTime() + 180 * 60000);
  return `${t.getUTCDate()} ${["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"][t.getUTCMonth()]} ${t.getUTCFullYear()}, ${trClock(d)}`;
};

export function SolsticeTool({ cities }: { cities: SunCity[] }) {
  const now = useNow();
  const { place, custom, id, select, locate, error } = usePlace(cities, "ankara");
  const [yearOverride, setYearOverride] = useState<number | null>(null);
  const thisYear = now ? new Date(now + 180 * 60000).getUTCFullYear() : null;
  const year = yearOverride ?? thisYear;

  const next = useMemo(() => {
    if (!now || !thisYear) return null;
    const all = [...trSeasons(thisYear), ...trSeasons(thisYear + 1)];
    return all.find((s) => s.date.getTime() > now) ?? null;
  }, [now, thisYear]);
  const ex = useMemo(() => (year ? sunExtremes(year, place.lat, place.lon) : null), [year, place.lat, place.lon]);
  const list = year ? trSeasons(year) : [];

  const remaining = next && now ? next.date.getTime() - now : 0;
  const dd = Math.floor(remaining / 86400000);
  const hh = Math.floor((remaining % 86400000) / 3600000);
  const mm = Math.floor((remaining % 3600000) / 60000);

  return (
    <div className="golden-tool sun-tool">
      {next ? (
        <div className="sun-countdown">
          <span>Sıradaki: {next.label}</span>
          <strong>
            {dd} gün {hh} saat {mm} dakika
          </strong>
          <em>{trFull(next.date)} (Türkiye saati)</em>
        </div>
      ) : null}
      <div className="golden-controls">
        <CitySelect label="İl" value={custom ? "__me" : id} cities={cities} onChange={select} withMe={!!custom} />
        <label>
          <span>Yıl</span>
          <select value={year ?? ""} onChange={(e) => setYearOverride(Number(e.target.value))}>
            {thisYear
              ? Array.from({ length: 11 }, (_, i) => thisYear - 1 + i).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))
              : null}
          </select>
        </label>
        <button type="button" className="time-tool-button is-secondary" onClick={locate}>
          📍 Konumumu kullan
        </button>
      </div>
      {error ? <p className="golden-error">{error}</p> : null}
      {year && ex ? (
        <>
          <div className="golden-cards">
            {list.map((s) => (
              <Card key={s.key} tone={s.key === "june" || s.key === "december" ? "golden" : "blue"} label={s.label} value={trFull(s.date)} />
            ))}
          </div>
          <div className="golden-cards">
            <Card label="En uzun gün" value={durationLabel(ex.longest.dayLength)} note={trDayLabel(ex.longest.month, ex.longest.day)} />
            <Card label="En kısa gün" value={durationLabel(ex.shortest.dayLength)} note={trDayLabel(ex.shortest.month, ex.shortest.day)} />
            <Card tone="golden" label="En erken gün batımı" value={trClock(ex.earliestSunset.sunset)} note={trDayLabel(ex.earliestSunset.month, ex.earliestSunset.day)} />
            <Card tone="golden" label="En geç gün doğumu" value={trClock(ex.latestSunrise.sunrise)} note={trDayLabel(ex.latestSunrise.month, ex.latestSunrise.day)} />
            <Card label="En erken gün doğumu" value={trClock(ex.earliestSunrise.sunrise)} note={trDayLabel(ex.earliestSunrise.month, ex.earliestSunrise.day)} />
            <Card label="En geç gün batımı" value={trClock(ex.latestSunset.sunset)} note={trDayLabel(ex.latestSunset.month, ex.latestSunset.day)} />
          </div>
        </>
      ) : null}
      <p className="sun-foot">Gündönümü ve ekinoks anları ±1 dakika, gün doğuşu ve batışı ±1 dakika doğrulukla hesaplanır. Saatler Türkiye saatidir (UTC+3).</p>
    </div>
  );
}
