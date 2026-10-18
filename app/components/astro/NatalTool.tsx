"use client";

import { useState } from "react";
import { degreeInSign, localToUtc, natalChart } from "../../converter/time/natalChart";
import { ZODIAC_TR } from "../../converter/time/moonPosition";

export type NatalCity = { id: string; name: string; lat: number; lon: number };

const pad = (n: number) => String(n).padStart(2, "0");
const pos = (l: number) => {
  const d = degreeInSign(l);
  return { name: ZODIAC_TR[d.sign], text: `${d.deg}° ${pad(d.min)}′` };
};

export default function NatalTool({ cities, defaultCity }: { cities: NatalCity[]; defaultCity: string }) {
  const [date, setDate] = useState("1995-06-15");
  const [time, setTime] = useState("14:30");
  const [unknown, setUnknown] = useState(false);
  const [cityId, setCityId] = useState(defaultCity);

  const city = cities.find((c) => c.id === cityId) ?? cities[0];
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = (unknown ? "12:00" : time).split(":").map(Number);
  const valid = y >= 1900 && y <= 2100 && m >= 1 && d >= 1 && Number.isFinite(hh) && Number.isFinite(mm);
  const utc = valid ? localToUtc(y, m, d, hh, mm) : null;
  const dayStart = valid ? localToUtc(y, m, d, 0, 0) : null;
  const r = utc && dayStart ? natalChart(utc, city.lat, city.lon, dayStart) : null;
  const offsetH = utc ? (Date.UTC(y, m - 1, d, hh, mm) - utc.getTime()) / 3600000 : 0;

  const sun = r ? pos(r.sun) : null;
  const moon = r ? pos(r.moon) : null;
  const asc = r ? pos(r.asc) : null;
  const mc = r ? pos(r.mc) : null;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Doğum tarihi</span>
            <input type="date" value={date} min="1900-01-01" max="2100-12-31" onChange={(e) => setDate(e.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>Doğum saati</span>
            <input type="time" value={time} disabled={unknown} onChange={(e) => setTime(e.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>Doğum yeri</span>
            <select value={city.id} onChange={(e) => setCityId(e.target.value)}>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="date-calc-checks">
          <label className="date-calc-check">
            <input type="checkbox" checked={unknown} onChange={(e) => setUnknown(e.target.checked)} /> Doğum saatimi bilmiyorum
          </label>
        </div>
      </div>
      <div className="date-calc-results" aria-live="polite">
        {r && sun && moon && asc && mc ? (
          <>
            <div className="date-calc-stat is-main">
              <span>Yükselen burç</span>
              <strong>{unknown ? "Doğum saati gerekli" : `${asc.name} ${asc.text}`}</strong>
              <em>
                {unknown
                  ? "Yükselen burç yaklaşık 2 saatte bir değişir; doğum saati olmadan hesaplanamaz."
                  : r.ascRange.length > 1
                    ? `Burç sınırına yakın: doğum saatiniz 15 dakika farklıysa yükselen ${r.ascRange.slice(1).map((s) => ZODIAC_TR[s]).join(" ya da ")} olabilir.`
                    : "Doğum saatinde 15 dakikalık bir fark yükseleni değiştirmez."}
              </em>
            </div>
            <div className="date-calc-stat">
              <span>Güneş burcu</span>
              <strong>{sun.name}</strong>
              <em>{sun.text}</em>
            </div>
            <div className="date-calc-stat">
              <span>Ay burcu</span>
              <strong>{unknown && r.moonDay.length > 1 ? r.moonDay.map((s) => ZODIAC_TR[s]).join(" / ") : moon.name}</strong>
              <em>{unknown && r.moonDay.length > 1 ? "Ay o gün burç değiştirdi; kesin sonuç için doğum saati gerekir." : moon.text}</em>
            </div>
            {!unknown && (
              <div className="date-calc-stat">
                <span>Gökyüzü ortası (MC)</span>
                <strong>{mc.name}</strong>
                <em>{mc.text}</em>
              </div>
            )}
            <div className="date-calc-stat">
              <span>Hesaplanan an</span>
              <strong>
                {pad(utc!.getUTCHours())}:{pad(utc!.getUTCMinutes())} UTC
              </strong>
              <em>
                {unknown ? "Saat bilinmediği için 12:00 kabul edildi · " : ""}
                {city.name} · o tarihte Türkiye saati UTC{offsetH >= 0 ? "+" : ""}
                {offsetH}
              </em>
            </div>
          </>
        ) : (
          <div className="date-calc-stat is-main">
            <span>Yükselen burç</span>
            <strong>—</strong>
            <em>1900–2100 arasında geçerli bir tarih girin.</em>
          </div>
        )}
      </div>
    </div>
  );
}
