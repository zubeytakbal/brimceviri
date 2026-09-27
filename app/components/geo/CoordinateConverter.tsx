"use client";

import { useEffect, useMemo, useState } from "react";
import {
  formatDdm,
  formatDms,
  latLonToTm3,
  latLonToUtm,
  parseCoordinate,
  TM3_MERIDIANS,
  tm3ToLatLon,
  utmToLatLon,
  type LatLon,
} from "../../converter/geo/coordinates";

type Mode = "latlon" | "utm" | "tm3";

const num = (s: string) => Number(s.replace(/\s/g, "").replace(",", "."));
const fixed = (n: number, d: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: false });

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="coord-row">
      <span>{label}</span>
      <code>{value}</code>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1500);
          } catch {
            /* pano erisimi yoksa sessizce gec */
          }
        }}
      >
        {copied ? "Kopyalandı" : "Kopyala"}
      </button>
    </div>
  );
}

export default function CoordinateConverter() {
  const [mode, setMode] = useState<Mode>("latlon");
  const [text, setText] = useState("39.92077, 32.85411");
  const [utm, setUtm] = useState({ zone: "36", hemi: "N" as "N" | "S", e: "487532.5", n: "4418973.7" });
  const [tm, setTm] = useState({ meridian: "33", y: "487527.50", x: "4420742.01" });
  const [geoError, setGeoError] = useState("");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const q = new URLSearchParams(window.location.search).get("q");
      if (q && parseCoordinate(q)) setText(q);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const point: LatLon | null = useMemo(() => {
    if (mode === "latlon") return parseCoordinate(text);
    if (mode === "utm") {
      const zone = Math.round(num(utm.zone));
      const e = num(utm.e);
      const n = num(utm.n);
      if (!(zone >= 1 && zone <= 60) || !Number.isFinite(e) || !Number.isFinite(n) || e < 100000 || e > 900000) return null;
      return utmToLatLon(zone, utm.hemi, e, n);
    }
    const m = Number(tm.meridian);
    const y = num(tm.y);
    const x = num(tm.x);
    if (!Number.isFinite(y) || !Number.isFinite(x) || y < 100000 || y > 900000) return null;
    return tm3ToLatLon(m, y, x);
  }, [mode, text, utm, tm]);

  const out = useMemo(() => {
    if (!point) return null;
    const u = latLonToUtm(point);
    const t = latLonToTm3(point);
    return { u, t };
  }, [point]);

  const locate = () => {
    if (!navigator.geolocation) {
      setGeoError("Tarayıcınız konum özelliğini desteklemiyor.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMode("latlon");
        setText(`${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`);
        setGeoError("");
      },
      () => setGeoError("Konum izni verilmedi."),
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  const inTurkey = point && point.lat > 35.5 && point.lat < 42.5 && point.lon > 25.5 && point.lon < 45;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-converter-modes" role="tablist">
          {[
            { id: "latlon" as const, label: "Enlem / boylam" },
            { id: "utm" as const, label: "UTM" },
            { id: "tm3" as const, label: "3° TM (ITRF96)" },
          ].map((m) => (
            <button key={m.id} type="button" role="tab" aria-selected={mode === m.id} className={mode === m.id ? "is-active" : undefined} onClick={() => setMode(m.id)}>
              {m.label}
            </button>
          ))}
        </div>

        {mode === "latlon" && (
          <div className="date-calc-fields">
            <label className="date-calc-field coord-text">
              <span>Koordinat (ondalık ya da derece-dakika-saniye)</span>
              <input value={text} onChange={(event) => setText(event.target.value)} placeholder={`39.92077, 32.85411  ·  39°55'15" K 32°51'15" D`} />
            </label>
          </div>
        )}

        {mode === "utm" && (
          <div className="date-calc-fields">
            <label className="date-calc-field">
              <span>Dilim</span>
              <span className="date-calc-field-row">
                <input inputMode="numeric" value={utm.zone} onChange={(event) => setUtm({ ...utm, zone: event.target.value })} style={{ maxWidth: 70 }} />
                <select value={utm.hemi} onChange={(event) => setUtm({ ...utm, hemi: event.target.value as "N" | "S" })} aria-label="Yarım küre">
                  <option value="N">Kuzey (N)</option>
                  <option value="S">Güney (S)</option>
                </select>
              </span>
            </label>
            <label className="date-calc-field">
              <span>Doğu (Easting, m)</span>
              <input inputMode="decimal" value={utm.e} onChange={(event) => setUtm({ ...utm, e: event.target.value })} />
            </label>
            <label className="date-calc-field">
              <span>Kuzey (Northing, m)</span>
              <input inputMode="decimal" value={utm.n} onChange={(event) => setUtm({ ...utm, n: event.target.value })} />
            </label>
          </div>
        )}

        {mode === "tm3" && (
          <div className="date-calc-fields">
            <label className="date-calc-field">
              <span>Dilim orta meridyeni (DOM)</span>
              <select value={tm.meridian} onChange={(event) => setTm({ ...tm, meridian: event.target.value })}>
                {TM3_MERIDIANS.map((m) => (
                  <option key={m} value={m}>
                    {m}°
                  </option>
                ))}
              </select>
            </label>
            <label className="date-calc-field">
              <span>Y (sağa değer, m)</span>
              <input inputMode="decimal" value={tm.y} onChange={(event) => setTm({ ...tm, y: event.target.value })} />
            </label>
            <label className="date-calc-field">
              <span>X (yukarı değer, m)</span>
              <input inputMode="decimal" value={tm.x} onChange={(event) => setTm({ ...tm, x: event.target.value })} />
            </label>
          </div>
        )}

        <div className="date-calc-checks">
          <button type="button" className="date-calc-geo" onClick={locate}>
            📍 Konumumu bul
          </button>
          {geoError && <span>{geoError}</span>}
        </div>
      </div>

      {point && out ? (
        <>
          <div className="coord-results">
            <h3>Coğrafi koordinat (WGS84)</h3>
            <CopyRow label="Ondalık derece (DD)" value={`${point.lat.toFixed(6)}, ${point.lon.toFixed(6)}`} />
            <CopyRow label="Derece dakika saniye (DMS)" value={`${formatDms(point.lat, "lat")}  ${formatDms(point.lon, "lon")}`} />
            <CopyRow label="Derece ondalık dakika (DDM)" value={`${formatDdm(point.lat, "lat")}  ${formatDdm(point.lon, "lon")}`} />
            {out.u && (
              <>
                <h3>UTM (6° dilim, WGS84)</h3>
                <CopyRow label={`Dilim ${out.u.zone}${out.u.band}`} value={`${out.u.zone}${out.u.band} ${fixed(out.u.easting, 1)} E ${fixed(out.u.northing, 1)} N`} />
              </>
            )}
            {inTurkey && (
              <>
                <h3>3° TM (ITRF96, DOM {out.t.meridian}°)</h3>
                <CopyRow label="Y (sağa) · X (yukarı)" value={`Y ${fixed(out.t.easting, 2)}  X ${fixed(out.t.northing, 2)}`} />
              </>
            )}
          </div>
          <p className="date-calc-links">
            <a href={`https://www.openstreetmap.org/?mlat=${point.lat.toFixed(6)}&mlon=${point.lon.toFixed(6)}#map=15/${point.lat.toFixed(5)}/${point.lon.toFixed(5)}`} target="_blank" rel="noopener noreferrer">
              OpenStreetMap&apos;te aç ↗
            </a>
            <a href={`https://www.google.com/maps?q=${point.lat.toFixed(6)},${point.lon.toFixed(6)}`} target="_blank" rel="noopener noreferrer">
              Google Haritalar&apos;da aç ↗
            </a>
          </p>
        </>
      ) : (
        <p className="date-calc-note">
          Koordinat okunamadı. Örnek: <code>39.92077, 32.85411</code> ya da <code>39°55&apos;15&quot; K 32°51&apos;15&quot; D</code>. Enlem −90 ile 90, boylam −180 ile
          180 arasında olmalı.
        </p>
      )}
    </div>
  );
}
