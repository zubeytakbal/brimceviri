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
type Lang = "tr" | "en";

const T = {
  tr: {
    copied: "Kopyalandı",
    copy: "Kopyala",
    latlon: "Enlem / boylam",
    input: "Koordinat (ondalık ya da derece-dakika-saniye)",
    placeholder: `39.92077, 32.85411  ·  39°55'15" K 32°51'15" D`,
    zone: "Dilim",
    hemi: "Yarım küre",
    north: "Kuzey (N)",
    south: "Güney (S)",
    easting: "Doğu (Easting, m)",
    northing: "Kuzey (Northing, m)",
    noGeo: "Tarayıcınız konum özelliğini desteklemiyor.",
    denied: "Konum izni verilmedi.",
    locate: "📍 Konumumu bul",
    geographic: "Coğrafi koordinat (WGS84)",
    dd: "Ondalık derece (DD)",
    dms: "Derece dakika saniye (DMS)",
    ddm: "Derece ondalık dakika (DDM)",
    utmTitle: "UTM (6° dilim, WGS84)",
    osm: "OpenStreetMap'te aç ↗",
    gmaps: "Google Haritalar'da aç ↗",
    invalid: "Koordinat okunamadı. Örnek:",
    invalidOr: "ya da",
    invalidExample: `39°55'15" K 32°51'15" D`,
    range: "Enlem −90 ile 90, boylam −180 ile 180 arasında olmalı.",
  },
  en: {
    copied: "Copied",
    copy: "Copy",
    latlon: "Latitude / longitude",
    input: "Coordinates (decimal or degrees, minutes, seconds)",
    placeholder: `40.68925, -74.04450  ·  40°41'21" N 74°02'40" W`,
    zone: "Zone",
    hemi: "Hemisphere",
    north: "North (N)",
    south: "South (S)",
    easting: "Easting (m)",
    northing: "Northing (m)",
    noGeo: "Your browser does not support geolocation.",
    denied: "Location permission was denied.",
    locate: "📍 Use my location",
    geographic: "Geographic coordinates (WGS84)",
    dd: "Decimal degrees (DD)",
    dms: "Degrees minutes seconds (DMS)",
    ddm: "Degrees decimal minutes (DDM)",
    utmTitle: "UTM (6° zones, WGS84)",
    osm: "Open in OpenStreetMap ↗",
    gmaps: "Open in Google Maps ↗",
    invalid: "Could not read the coordinates. Try",
    invalidOr: "or",
    invalidExample: `40°41'21" N 74°02'40" W`,
    range: "Latitude must be between −90 and 90 and longitude between −180 and 180.",
  },
};

const num = (s: string) => Number(s.replace(/\s/g, "").replace(",", "."));

function CopyRow({ label, value, lang }: { label: string; value: string; lang: Lang }) {
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
        {copied ? T[lang].copied : T[lang].copy}
      </button>
    </div>
  );
}

export default function CoordinateConverter({ lang = "tr" }: { lang?: Lang }) {
  const t = T[lang];
  const en = lang === "en";
  const fixed = (n: number, d: number) => n.toLocaleString(en ? "en-US" : "tr-TR", { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: false });
  const [mode, setMode] = useState<Mode>("latlon");
  const [text, setText] = useState(en ? "40.68925, -74.04450" : "39.92077, 32.85411");
  const [utm, setUtm] = useState(
    en ? { zone: "18", hemi: "N" as "N" | "S", e: "580735.8", n: "4504700.7" } : { zone: "36", hemi: "N" as "N" | "S", e: "487532.5", n: "4418973.7" }
  );
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
    const tm3 = latLonToTm3(point);
    return { u, t: tm3 };
  }, [point]);

  const locate = () => {
    if (!navigator.geolocation) {
      setGeoError(t.noGeo);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMode("latlon");
        setText(`${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`);
        setGeoError("");
      },
      () => setGeoError(t.denied),
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  const inTurkey = !en && point && point.lat > 35.5 && point.lat < 42.5 && point.lon > 25.5 && point.lon < 45;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-converter-modes" role="tablist">
          {[
            { id: "latlon" as const, label: t.latlon },
            { id: "utm" as const, label: "UTM" },
            ...(en ? [] : [{ id: "tm3" as const, label: "3° TM (ITRF96)" }]),
          ].map((m) => (
            <button key={m.id} type="button" role="tab" aria-selected={mode === m.id} className={mode === m.id ? "is-active" : undefined} onClick={() => setMode(m.id)}>
              {m.label}
            </button>
          ))}
        </div>

        {mode === "latlon" && (
          <div className="date-calc-fields">
            <label className="date-calc-field coord-text">
              <span>{t.input}</span>
              <input value={text} onChange={(event) => setText(event.target.value)} placeholder={t.placeholder} />
            </label>
          </div>
        )}

        {mode === "utm" && (
          <div className="date-calc-fields">
            <label className="date-calc-field">
              <span>{t.zone}</span>
              <span className="date-calc-field-row">
                <input inputMode="numeric" value={utm.zone} onChange={(event) => setUtm({ ...utm, zone: event.target.value })} style={{ maxWidth: 70 }} />
                <select value={utm.hemi} onChange={(event) => setUtm({ ...utm, hemi: event.target.value as "N" | "S" })} aria-label={t.hemi}>
                  <option value="N">{t.north}</option>
                  <option value="S">{t.south}</option>
                </select>
              </span>
            </label>
            <label className="date-calc-field">
              <span>{t.easting}</span>
              <input inputMode="decimal" value={utm.e} onChange={(event) => setUtm({ ...utm, e: event.target.value })} />
            </label>
            <label className="date-calc-field">
              <span>{t.northing}</span>
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
            {t.locate}
          </button>
          {geoError && <span>{geoError}</span>}
        </div>
      </div>

      {point && out ? (
        <>
          <div className="coord-results">
            <h3>{t.geographic}</h3>
            <CopyRow lang={lang} label={t.dd} value={`${point.lat.toFixed(6)}, ${point.lon.toFixed(6)}`} />
            <CopyRow lang={lang} label={t.dms} value={`${formatDms(point.lat, "lat", lang)}  ${formatDms(point.lon, "lon", lang)}`} />
            <CopyRow lang={lang} label={t.ddm} value={`${formatDdm(point.lat, "lat", lang)}  ${formatDdm(point.lon, "lon", lang)}`} />
            {out.u && (
              <>
                <h3>{t.utmTitle}</h3>
                <CopyRow lang={lang} label={`${t.zone} ${out.u.zone}${out.u.band}`} value={`${out.u.zone}${out.u.band} ${fixed(out.u.easting, 1)} E ${fixed(out.u.northing, 1)} N`} />
              </>
            )}
            {inTurkey && (
              <>
                <h3>3° TM (ITRF96, DOM {out.t.meridian}°)</h3>
                <CopyRow lang={lang} label="Y (sağa) · X (yukarı)" value={`Y ${fixed(out.t.easting, 2)}  X ${fixed(out.t.northing, 2)}`} />
              </>
            )}
          </div>
          <p className="date-calc-links">
            <a href={`https://www.openstreetmap.org/?mlat=${point.lat.toFixed(6)}&mlon=${point.lon.toFixed(6)}#map=15/${point.lat.toFixed(5)}/${point.lon.toFixed(5)}`} target="_blank" rel="noopener noreferrer">
              {t.osm}
            </a>
            <a href={`https://www.google.com/maps?q=${point.lat.toFixed(6)},${point.lon.toFixed(6)}`} target="_blank" rel="noopener noreferrer">
              {t.gmaps}
            </a>
          </p>
        </>
      ) : (
        <p className="date-calc-note">
          {t.invalid} <code>{en ? "40.68925, -74.04450" : "39.92077, 32.85411"}</code> {t.invalidOr} <code>{t.invalidExample}</code>. {t.range}
        </p>
      )}
    </div>
  );
}
