"use client";

import { useEffect, useMemo, useState } from "react";
import { worldCities } from "../../converter/time/worldCities";
import { useSecondNow, zoneOffsetMinutes } from "../world/useSecondNow";

type Mode = "longitude" | "cities" | "reverse";

const pad = (n: number) => String(n).padStart(2, "0");

function minutesText(total: number) {
  const m = Math.round(Math.abs(total));
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (!h) return `${r} dakika`;
  return r ? `${h} saat ${r} dakika` : `${h} saat`;
}

function lonText(lon: number) {
  return `${Math.abs(lon).toLocaleString("tr-TR", { maximumFractionDigits: 2 })}° ${lon >= 0 ? "D" : "B"}`;
}

/** "HH:MM" + dakika -> yeni saat ve gun kaymasi */
function shiftTime(time: string, minutes: number) {
  const [h, m] = time.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  const total = h * 60 + m + Math.round(minutes);
  const day = Math.floor(total / 1440);
  const norm = ((total % 1440) + 1440) % 1440;
  return { time: `${pad(Math.floor(norm / 60))}:${pad(norm % 60)}`, day };
}

function dayNote(day: number) {
  if (day === 0) return "";
  return day > 0 ? " (ertesi gün)" : " (önceki gün)";
}

/** Ortalama gunes zamani: UTC + boylam x 4 dakika */
function meanSolarTime(now: Date, lon: number) {
  const ms = now.getTime() + lon * 4 * 60000;
  const d = new Date(ms);
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
}

function LonInput({ label, value, east, onValue, onEast }: { label: string; value: string; east: boolean; onValue: (v: string) => void; onEast: (e: boolean) => void }) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <span className="date-calc-field-row">
        <input inputMode="decimal" value={value} onChange={(event) => onValue(event.target.value)} />
        <select value={east ? "D" : "B"} onChange={(event) => onEast(event.target.value === "D")} aria-label={`${label} yönü`}>
          <option value="D">Doğu (D)</option>
          <option value="B">Batı (B)</option>
        </select>
      </span>
    </label>
  );
}

const sortedCities = [...worldCities].sort((a, b) => a.nameTr.localeCompare(b.nameTr, "tr"));

export default function LocalTimeCalculator() {
  const [mode, setMode] = useState<Mode>("longitude");
  const [lonA, setLonA] = useState("26");
  const [eastA, setEastA] = useState(true);
  const [lonB, setLonB] = useState("45");
  const [eastB, setEastB] = useState(true);
  const [timeA, setTimeA] = useState("12:00");
  const [cityA, setCityA] = useState("istanbul");
  const [cityB, setCityB] = useState("new-york");
  const [myLon, setMyLon] = useState<number | null>(null);
  const [geoError, setGeoError] = useState("");
  const [diffMinutes, setDiffMinutes] = useState("76");
  const now = useSecondNow();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const a = params.get("a");
      const b = params.get("b");
      if (a && worldCities.some((c) => c.en === a) && b && worldCities.some((c) => c.en === b)) {
        setMode("cities");
        setCityA(a);
        setCityB(b);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const num = (s: string) => Number(s.replace(",", "."));

  const longitudeResult = useMemo(() => {
    const a = num(lonA) * (eastA ? 1 : -1);
    const b = num(lonB) * (eastB ? 1 : -1);
    if (!Number.isFinite(a) || !Number.isFinite(b) || Math.abs(a) > 180 || Math.abs(b) > 180) return null;
    let delta = b - a;
    // 180 derece meridyenini asan en kisa fark
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const minutes = delta * 4;
    const shifted = shiftTime(timeA, minutes);
    return { a, b, delta, minutes, shifted, sameSide: eastA === eastB };
  }, [lonA, eastA, lonB, eastB, timeA]);

  const cityResult = useMemo(() => {
    const A = worldCities.find((c) => c.en === cityA);
    const B = worldCities.find((c) => c.en === cityB);
    if (!A || !B) return null;
    let delta = B.lon - A.lon;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    return { A, B, delta, solarMinutes: delta * 4 };
  }, [cityA, cityB]);

  const officialDiff = cityResult && now ? zoneOffsetMinutes(cityResult.B.timeZone, now) - zoneOffsetMinutes(cityResult.A.timeZone, now) : null;

  const reverseResult = useMemo(() => {
    const m = num(diffMinutes);
    if (!Number.isFinite(m) || m < 0 || m > 1440) return null;
    return { degrees: m / 4 };
  }, [diffMinutes]);

  const locate = () => {
    if (!navigator.geolocation) {
      setGeoError("Tarayıcınız konum özelliğini desteklemiyor.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMyLon(pos.coords.longitude);
        setGeoError("");
      },
      () => setGeoError("Konum izni verilmedi."),
      { maximumAge: 600000, timeout: 10000 }
    );
  };

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-converter-modes" role="tablist">
          {[
            { id: "longitude" as const, label: "Boylamdan yerel saat" },
            { id: "cities" as const, label: "İki şehir" },
            { id: "reverse" as const, label: "Saat farkından boylam" },
          ].map((m) => (
            <button key={m.id} type="button" role="tab" aria-selected={mode === m.id} className={mode === m.id ? "is-active" : undefined} onClick={() => setMode(m.id)}>
              {m.label}
            </button>
          ))}
        </div>

        {mode === "longitude" && (
          <div className="date-calc-fields">
            <LonInput label="A noktasının boylamı" value={lonA} east={eastA} onValue={setLonA} onEast={setEastA} />
            <label className="date-calc-field">
              <span>A noktasında yerel saat</span>
              <input type="time" value={timeA} onChange={(event) => setTimeA(event.target.value)} />
            </label>
            <LonInput label="B noktasının boylamı" value={lonB} east={eastB} onValue={setLonB} onEast={setEastB} />
          </div>
        )}

        {mode === "cities" && (
          <div className="date-calc-fields">
            {[
              { label: "Birinci şehir", value: cityA, set: setCityA },
              { label: "İkinci şehir", value: cityB, set: setCityB },
            ].map((f) => (
              <label className="date-calc-field" key={f.label}>
                <span>{f.label}</span>
                <select value={f.value} onChange={(event) => f.set(event.target.value)}>
                  {sortedCities.map((c) => (
                    <option key={c.en} value={c.en}>
                      {c.nameTr} ({c.countryTr})
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        )}

        {mode === "reverse" && (
          <div className="date-calc-fields">
            <label className="date-calc-field">
              <span>Yerel saat farkı (dakika)</span>
              <input inputMode="decimal" value={diffMinutes} onChange={(event) => setDiffMinutes(event.target.value)} />
            </label>
          </div>
        )}
      </div>

      {mode === "longitude" && longitudeResult && (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>B noktasında yerel saat</span>
              <strong>
                {longitudeResult.shifted ? `${longitudeResult.shifted.time}${dayNote(longitudeResult.shifted.day)}` : "—"}
              </strong>
              <em>
                B noktası A&apos;nın {longitudeResult.delta >= 0 ? "doğusunda, saati ileride" : "batısında, saati geride"}
              </em>
            </div>
            <div className="date-calc-stat">
              <span>Boylam (meridyen) farkı</span>
              <strong>{Math.abs(longitudeResult.delta).toLocaleString("tr-TR", { maximumFractionDigits: 2 })}°</strong>
            </div>
            <div className="date-calc-stat">
              <span>Yerel saat farkı</span>
              <strong>{minutesText(longitudeResult.minutes)}</strong>
            </div>
          </div>
          <ol className="calc-steps">
            <li>
              {longitudeResult.sameSide
                ? `İki boylam da ${eastA ? "doğu" : "batı"} yarım kürede olduğu için çıkarılır: ${lonText(longitudeResult.b)} − ${lonText(longitudeResult.a)}.`
                : "Boylamlardan biri doğu, diğeri batı yarım kürede olduğu için toplanır."}{" "}
              Meridyen farkı = {Math.abs(longitudeResult.delta).toLocaleString("tr-TR", { maximumFractionDigits: 2 })}°.
            </li>
            <li>
              Her meridyen 4 dakikalık fark yaratır: {Math.abs(longitudeResult.delta).toLocaleString("tr-TR", { maximumFractionDigits: 2 })} × 4 ={" "}
              {Math.round(Math.abs(longitudeResult.minutes))} dakika = {minutesText(longitudeResult.minutes)}.
            </li>
            <li>
              Dünya batıdan doğuya döndüğü için doğudaki yerin saati ileridedir: {timeA}{" "}
              {longitudeResult.delta >= 0 ? "+" : "−"} {minutesText(longitudeResult.minutes)} ={" "}
              {longitudeResult.shifted ? `${longitudeResult.shifted.time}${dayNote(longitudeResult.shifted.day)}` : "—"}.
            </li>
          </ol>
        </>
      )}

      {mode === "cities" && cityResult && (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>Yerel (güneş) saati farkı</span>
              <strong>{minutesText(cityResult.solarMinutes)}</strong>
              <em>
                {cityResult.B.nameTr}, {cityResult.A.nameTr} şehrinin {cityResult.delta >= 0 ? "doğusunda" : "batısında"}; meridyen farkı{" "}
                {Math.abs(cityResult.delta).toLocaleString("tr-TR", { maximumFractionDigits: 2 })}°
              </em>
            </div>
            <div className="date-calc-stat">
              <span>Resmî saat (saat dilimi) farkı</span>
              <strong>{officialDiff === null ? "—" : officialDiff === 0 ? "Aynı saat" : minutesText(officialDiff)}</strong>
              <em>{officialDiff === null || officialDiff === 0 ? "" : officialDiff > 0 ? `${cityResult.B.nameTr} ileride` : `${cityResult.B.nameTr} geride`}</em>
            </div>
            {now &&
              [cityResult.A, cityResult.B].map((c) => (
                <div className="date-calc-stat" key={c.en}>
                  <span>{c.nameTr}: güneşe göre şu an</span>
                  <strong>{meanSolarTime(now, c.lon)}</strong>
                  <em>Boylam {lonText(c.lon)}</em>
                </div>
              ))}
          </div>
          <p className="date-calc-note">
            Yerel saat Güneş&apos;in konumuna göredir ve her meridyende 4 dakika değişir. Günlük hayatta kullanılan resmî saat ise saat
            dilimine göre belirlenir; bu yüzden iki fark genellikle birbirini tutmaz.
          </p>
        </>
      )}

      {mode === "reverse" && reverseResult && (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>Boylam (meridyen) farkı</span>
              <strong>{reverseResult.degrees.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}°</strong>
              <em>{diffMinutes} dakika ÷ 4 dakika</em>
            </div>
            <div className="date-calc-stat">
              <span>Yaklaşık doğu-batı uzaklığı (Ekvator&apos;da)</span>
              <strong>{Math.round(reverseResult.degrees * 111.32).toLocaleString("tr-TR")} km</strong>
              <em>1° boylam Ekvator&apos;da ≈ 111 km; kutuplara doğru kısalır</em>
            </div>
          </div>
        </>
      )}

      <div className="local-time-me">
        <button type="button" className="time-tool-button is-secondary" onClick={locate}>
          📍 Konumumun güneş saatini göster
        </button>
        {geoError && <span className="date-calc-note">{geoError}</span>}
        {myLon !== null && now && (
          <p>
            Boylamınız {lonText(myLon)}. Güneşe göre (ortalama güneş zamanı) saat şu an <strong>{meanSolarTime(now, myLon)}</strong>; saatinizdeki
            resmî saatten{" "}
            {(() => {
              const official = -now.getTimezoneOffset();
              const diff = myLon * 4 - official;
              return `${minutesText(diff)} ${diff >= 0 ? "ileride" : "geride"}`;
            })()}
            .
          </p>
        )}
      </div>
    </div>
  );
}
