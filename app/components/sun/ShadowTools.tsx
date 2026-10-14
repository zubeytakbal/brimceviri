"use client";

import { useEffect, useMemo, useState } from "react";
import { formatTr } from "../../converter/metal/metalWeight";
import { sunPosition } from "../../converter/time/solar";
import {
  compass,
  compassName,
  directSunMinutes,
  FACADES,
  heightByReference,
  heightFromShadow,
  hourlySun,
  noonElevation,
  perpendicularTilt,
  shadowLength,
  trDate,
} from "../../converter/time/sunGeometry";
import { ayAdi, durationLabel, trClock } from "../../converter/time/sunYear";
import type { SunCity } from "./SunTools";

const f = formatTr;
const pad = (n: number) => String(n).padStart(2, "0");
const num = (v: string) => {
  const n = Number(v.replace(/\s/g, "").replace(",", "."));
  return v.trim() !== "" && Number.isFinite(n) ? n : null;
};
const deg = (v: number) => `${f(v, 1)}°`;
const meters = (v: number) => (v >= 100 ? `${f(v, 0)} m` : `${f(v, 2)} m`);

function nowParts() {
  const t = new Date(Date.now() + 180 * 60000);
  return { date: `${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(t.getUTCDate())}`, time: `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}` };
}

function Card({ label, value, note, tone }: { label: string; value: string; note?: string; tone?: "golden" | "blue" }) {
  return (
    <div className={tone ? `golden-card is-${tone}` : "golden-card"}>
      <span>{label}</span>
      <strong>{value}</strong>
      {note ? <em className="sun-card-note">{note}</em> : null}
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label>
      <span>{label}</span>
      <input type={type} inputMode={type === "text" ? "decimal" : undefined} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

type Mode = "shadow" | "height" | "winter" | "panel";
const MODES: Array<{ id: Mode; label: string }> = [
  { id: "shadow", label: "Güneş açısı ve gölge" },
  { id: "height", label: "Gölgeden yükseklik" },
  { id: "winter", label: "Evim güneş alır mı?" },
  { id: "panel", label: "Panel eğimi" },
];

export function ShadowTool({ cities }: { cities: SunCity[] }) {
  const [mode, setMode] = useState<Mode>("shadow");
  const [cityId, setCityId] = useState("ankara");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [height, setHeight] = useState("1,8");
  const [shadow, setShadow] = useState("12");
  const [stick, setStick] = useState("1");
  const [stickShadow, setStickShadow] = useState("1,5");
  const [refShadow, setRefShadow] = useState("18");
  const [obstacle, setObstacle] = useState("15");
  const [windowH, setWindowH] = useState("3");
  const [distance, setDistance] = useState("20");
  const [facade, setFacade] = useState("G");
  useEffect(() => {
    const f2 = requestAnimationFrame(() => {
      const n = nowParts();
      setDate(n.date);
      setTime(n.time);
    });
    return () => cancelAnimationFrame(f2);
  }, []);

  const city = cities.find((c) => c.id === cityId) ?? cities[0];
  const ymd = useMemo(() => {
    const [y, m, d] = date.split("-").map(Number);
    return y && m && d ? { y, m, d } : null;
  }, [date]);
  const hm = useMemo(() => {
    const [h, mi] = time.split(":").map(Number);
    return Number.isFinite(h) && Number.isFinite(mi) ? { h, mi } : null;
  }, [time]);
  const pos = ymd && hm ? sunPosition(trDate(ymd.y, ymd.m, ymd.d, hm.h, hm.mi), city.lat, city.lon) : null;

  const placeControls = (withTime: boolean) => (
    <div className="golden-controls sun-geo-controls">
      <label>
        <span>İl</span>
        <select value={cityId} onChange={(e) => setCityId(e.target.value)}>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <Field label="Tarih" type="date" value={date} onChange={setDate} />
      {withTime ? <Field label="Saat" type="time" value={time} onChange={setTime} /> : null}
    </div>
  );

  return (
    <div className="golden-tool sun-tool">
      <div className="date-converter-modes" role="tablist">
        {MODES.map((o) => (
          <button key={o.id} type="button" role="tab" aria-selected={mode === o.id} className={mode === o.id ? "is-active" : undefined} onClick={() => setMode(o.id)}>
            {o.label}
          </button>
        ))}
      </div>

      {mode === "shadow" ? renderShadow() : null}
      {mode === "height" ? renderHeight() : null}
      {mode === "winter" ? renderWinter() : null}
      {mode === "panel" ? renderPanel() : null}
      <p className="sun-foot">Saatler Türkiye saatidir (UTC+3). Hesap düz zemin ve açık gökyüzü içindir; güneş konumu NOAA formülleriyle bulunur.</p>
    </div>
  );

  function renderShadow() {
    const h = num(height);
    const rows = ymd && h !== null && h > 0 ? hourlySun(ymd.y, ymd.m, ymd.d, city.lat, city.lon, h) : [];
    const len = pos && h !== null ? shadowLength(h, pos.elevation) : null;
    return (
      <>
        {placeControls(true)}
        <div className="golden-controls sun-geo-controls">
          <Field label="Cismin boyu (m)" value={height} onChange={setHeight} />
        </div>
        {pos ? (
          <div className="golden-cards">
            <Card tone="golden" label="Güneşin yüksekliği" value={deg(pos.elevation)} note={pos.elevation > 0 ? "Ufuktan açı" : "Güneş ufkun altında"} />
            <Card label="Güneşin yönü" value={`${deg(pos.azimuth)} ${compass(pos.azimuth)}`} note={`Güneş ${compassName(pos.azimuth)} yönünde`} />
            <Card tone="golden" label="Gölge boyu" value={len !== null ? meters(len) : "Gölge yok"} note={len !== null ? `Gölge ${compassName(pos.azimuth + 180)} yönüne düşer` : undefined} />
          </div>
        ) : null}
        {rows.length ? (
          <div className="holiday-table-wrap sun-table">
            <table className="holiday-table">
              <caption>Gün boyunca güneş ve {f(h ?? 0, 2)} m boyundaki cismin gölgesi</caption>
              <thead>
                <tr>
                  <th scope="col">Saat</th>
                  <th scope="col">Yükseklik</th>
                  <th scope="col">Yön</th>
                  <th scope="col">Gölge boyu</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.date.getTime()}>
                    <th scope="row">{trClock(r.date)}</th>
                    <td>{deg(r.elevation)}</td>
                    <td>
                      {f(r.azimuth, 0)}° {compass(r.azimuth)}
                    </td>
                    <td>{r.shadow !== null ? meters(r.shadow) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </>
    );
  }

  function renderHeight() {
    const s = num(shadow);
    const byAngle = pos && s !== null && s > 0 ? heightFromShadow(s, pos.elevation) : null;
    const st = num(stick);
    const ss = num(stickShadow);
    const rs = num(refShadow);
    const byRef = st !== null && ss !== null && rs !== null && ss > 0 ? heightByReference(st, ss, rs) : null;
    return (
      <>
        <p className="sun-foot">Yöntem 1: Ölçtüğünüz anın tarih ve saatini girin; güneş açısı hesaplanır.</p>
        {placeControls(true)}
        <div className="golden-controls sun-geo-controls">
          <Field label="Ölçülen gölge boyu (m)" value={shadow} onChange={setShadow} />
        </div>
        {pos ? (
          <div className="golden-cards">
            <Card tone="golden" label="Cismin yüksekliği" value={byAngle !== null ? meters(byAngle) : "Güneş ufkun altında"} note={`Güneş açısı ${deg(pos.elevation)}`} />
          </div>
        ) : null}
        <p className="sun-foot">Yöntem 2: Boyu bilinen bir çubuğu dik tutun ve iki gölgeyi aynı anda ölçün; saat ve konum gerekmez.</p>
        <div className="golden-controls sun-geo-controls">
          <Field label="Çubuğun boyu (m)" value={stick} onChange={setStick} />
          <Field label="Çubuğun gölgesi (m)" value={stickShadow} onChange={setStickShadow} />
          <Field label="Cismin gölgesi (m)" value={refShadow} onChange={setRefShadow} />
        </div>
        {byRef !== null ? (
          <div className="golden-cards">
            <Card tone="golden" label="Cismin yüksekliği (oranla)" value={meters(byRef)} note={`${f(rs!, 2)} × ${f(st!, 2)} / ${f(ss!, 2)}`} />
          </div>
        ) : null}
      </>
    );
  }

  function renderWinter() {
    const ob = num(obstacle);
    const w = num(windowH);
    const dist = num(distance);
    const fac = FACADES.find((x) => x.id === facade)!;
    const ok = ymd && ob !== null && w !== null && dist !== null && dist > 0;
    const above = ok ? ob! - w! : 0;
    const need = ok && above > 0 ? (Math.atan(above / dist!) * 180) / Math.PI : 0;
    const months = ok
      ? Array.from({ length: 12 }, (_, i) => {
          const r = directSunMinutes(ymd!.y, i + 1, 21, city.lat, city.lon, fac.az, above, dist!);
          return { m: i + 1, ...r, noon: noonElevation(ymd!.y, i + 1, 21, city.lat, city.lon) };
        })
      : [];
    return (
      <>
        <div className="golden-controls sun-geo-controls">
          <label>
            <span>İl</span>
            <select value={cityId} onChange={(e) => setCityId(e.target.value)}>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Pencerenin baktığı yön</span>
            <select value={facade} onChange={(e) => setFacade(e.target.value)}>
              {FACADES.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="golden-controls sun-geo-controls">
          <Field label="Karşı binanın yüksekliği (m)" value={obstacle} onChange={setObstacle} />
          <Field label="Pencerenizin yerden yüksekliği (m)" value={windowH} onChange={setWindowH} />
          <Field label="Binalar arası mesafe (m)" value={distance} onChange={setDistance} />
        </div>
        {ok ? (
          <>
            <div className="golden-cards">
              <Card
                tone="golden"
                label="Gereken güneş açısı"
                value={above > 0 ? deg(need) : "Engel yok"}
                note={above > 0 ? `Karşı bina pencerenizden ${f(above, 1)} m yüksek` : "Karşı bina pencerenizden alçak"}
              />
              <Card label="21 Aralık'ta öğle güneşi" value={deg(months[11].noon)} note={months[11].minutes > 0 ? "Pencereye ulaşıyor" : "Pencereye ulaşmıyor"} />
            </div>
            <div className="holiday-table-wrap sun-table">
              <table className="holiday-table">
                <caption>Her ayın 21&apos;inde pencerenin doğrudan güneş aldığı süre (açık gökyüzü)</caption>
                <thead>
                  <tr>
                    <th scope="col">Ay</th>
                    <th scope="col">Öğle güneşi</th>
                    <th scope="col">Güneş alma süresi</th>
                    <th scope="col">Aralık</th>
                  </tr>
                </thead>
                <tbody>
                  {months.map((r) => (
                    <tr key={r.m}>
                      <th scope="row">{ayAdi(r.m)}</th>
                      <td>{deg(r.noon)}</td>
                      <td>{r.minutes ? durationLabel(r.minutes) : "Güneş almaz"}</td>
                      <td>{r.first && r.last ? `${trClock(r.first)} – ${trClock(r.last)}` : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="sun-foot">
              Karşı bina cepheye paralel ve iki yana uzun kabul edilir; ağaçlar, balkon çıkıntıları ve arazi eğimi hesaba katılmaz. Pencerenin ortası ölçü alınır.
            </p>
          </>
        ) : (
          <p className="golden-error">Yükseklikleri ve mesafeyi metre olarak girin.</p>
        )}
      </>
    );
  }

  function renderPanel() {
    const y = ymd?.y ?? new Date().getUTCFullYear();
    const months = Array.from({ length: 12 }, (_, i) => {
      const e = noonElevation(y, i + 1, 15, city.lat, city.lon);
      return { m: i + 1, e, tilt: perpendicularTilt(e) };
    });
    const avg = months.reduce((s, r) => s + r.tilt, 0) / 12;
    return (
      <>
        {placeControls(false)}
        <div className="golden-cards">
          <Card tone="golden" label="Yıllık ortalama dik eğim" value={deg(avg)} note={`Enlem ${f(city.lat, 1)}°`} />
          <Card label="Haziran" value={deg(months[5].tilt)} note="Öğle güneşi yüksek, panel yatık" />
          <Card label="Aralık" value={deg(months[11].tilt)} note="Öğle güneşi alçak, panel dik" />
        </div>
        <div className="holiday-table-wrap sun-table">
          <table className="holiday-table">
            <caption>Güneye bakan panelin öğle güneşine dik olması için eğim (her ayın 15&apos;i)</caption>
            <thead>
              <tr>
                <th scope="col">Ay</th>
                <th scope="col">Öğle güneş yüksekliği</th>
                <th scope="col">Panel eğimi (yataydan)</th>
              </tr>
            </thead>
            <tbody>
              {months.map((r) => (
                <tr key={r.m}>
                  <th scope="row">{ayAdi(r.m)}</th>
                  <td>{deg(r.e)}</td>
                  <td>{deg(r.tilt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="sun-foot">
          Bu açılar geometriktir: panel her ayın ortasında öğle güneşine tam dik bakar. Yıllık üretimi en yükselten sabit açı yerel iklime (bulutluluk, dağınık ışık) bağlıdır; kurulumdan önce üreticinin ya da
          PVGIS gibi bir üretim hesaplayıcısının önerisine bakın.
        </p>
      </>
    );
  }
}
