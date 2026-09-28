// Koordinat donusumleri: ondalik derece (DD), derece-dakika-saniye (DMS), derece-ondalik dakika (DDM),
// UTM (6 derecelik, WGS84) ve Turkiye kadastrosunda kullanilan 3 derecelik TM (ITRF96/GRS80).
// Enine Merkator formulleri: Krüger serisi (Karney 2011), dilim icinde milimetre alti dogruluk.

export type LatLon = { lat: number; lon: number };

const WGS84 = { a: 6378137, f: 1 / 298.257223563 };
// GRS80 ile WGS84 elipsoidi arasindaki fark (f) koordinatta 0,1 mm'nin altindadir.
const GRS80 = { a: 6378137, f: 1 / 298.257222101 };

type Ellipsoid = typeof WGS84;

function tmSeries(ell: Ellipsoid) {
  const n = ell.f / (2 - ell.f);
  const n2 = n * n;
  const n3 = n2 * n;
  const n4 = n3 * n;
  const A = (ell.a / (1 + n)) * (1 + n2 / 4 + n4 / 64);
  const alpha = [
    n / 2 - (2 / 3) * n2 + (5 / 16) * n3 + (41 / 180) * n4,
    (13 / 48) * n2 - (3 / 5) * n3 + (557 / 1440) * n4,
    (61 / 240) * n3 - (103 / 140) * n4,
    (49561 / 161280) * n4,
  ];
  const beta = [
    n / 2 - (2 / 3) * n2 + (37 / 96) * n3 - (1 / 360) * n4,
    (1 / 48) * n2 + (1 / 15) * n3 - (437 / 1440) * n4,
    (17 / 480) * n3 - (37 / 840) * n4,
    (4397 / 161280) * n4,
  ];
  const e = Math.sqrt(ell.f * (2 - ell.f));
  return { A, alpha, beta, e, n };
}

const RAD = Math.PI / 180;

/** Enine Merkator ileri donusum: merkez boylamina gore x (dogu), y (kuzey) metre, olcek k0 ile. */
function tmForward(lat: number, lon: number, lon0: number, k0: number, ell: Ellipsoid) {
  const { A, alpha, e } = tmSeries(ell);
  const phi = lat * RAD;
  const dl = (lon - lon0) * RAD;
  const t = Math.sinh(Math.atanh(Math.sin(phi)) - e * Math.atanh(e * Math.sin(phi)));
  const xiP = Math.atan2(t, Math.cos(dl));
  const etaP = Math.atanh(Math.sin(dl) / Math.sqrt(1 + t * t));
  let xi = xiP;
  let eta = etaP;
  for (let j = 1; j <= 4; j++) {
    xi += alpha[j - 1] * Math.sin(2 * j * xiP) * Math.cosh(2 * j * etaP);
    eta += alpha[j - 1] * Math.cos(2 * j * xiP) * Math.sinh(2 * j * etaP);
  }
  return { x: k0 * A * eta, y: k0 * A * xi };
}

/** Enine Merkator ters donusum. */
function tmInverse(x: number, y: number, lon0: number, k0: number, ell: Ellipsoid): LatLon {
  const { A, beta, e } = tmSeries(ell);
  const xi = y / (k0 * A);
  const eta = x / (k0 * A);
  let xiP = xi;
  let etaP = eta;
  for (let j = 1; j <= 4; j++) {
    xiP -= beta[j - 1] * Math.sin(2 * j * xi) * Math.cosh(2 * j * eta);
    etaP -= beta[j - 1] * Math.cos(2 * j * xi) * Math.sinh(2 * j * eta);
  }
  const chi = Math.asin(Math.sin(xiP) / Math.cosh(etaP));
  // chi (konformal enlem) -> jeodezik enlem: Newton yinelemesi
  const tauP = Math.tan(chi);
  let tau = tauP;
  for (let i = 0; i < 6; i++) {
    const sigma = Math.sinh(e * Math.atanh((e * tau) / Math.sqrt(1 + tau * tau)));
    const tauI = tau * Math.sqrt(1 + sigma * sigma) - sigma * Math.sqrt(1 + tau * tau);
    const dTau =
      ((tauP - tauI) / Math.sqrt(1 + tauI * tauI)) *
      ((1 + (1 - e * e) * tau * tau) / ((1 - e * e) * Math.sqrt(1 + tau * tau)));
    tau += dTau;
    if (Math.abs(dTau) < 1e-12) break;
  }
  const lat = Math.atan(tau) / RAD;
  const lon = lon0 + Math.atan2(Math.sinh(etaP), Math.cos(xiP)) / RAD;
  return { lat, lon };
}

export type Utm = { zone: number; hemisphere: "N" | "S"; easting: number; northing: number; band: string };

const BANDS = "CDEFGHJKLMNPQRSTUVWX";

export function utmZone(lat: number, lon: number) {
  let zone = Math.floor((lon + 180) / 6) + 1;
  if (zone > 60) zone = 60;
  // Norvec ve Svalbard istisnalari
  if (lat >= 56 && lat < 64 && lon >= 3 && lon < 12) zone = 32;
  if (lat >= 72 && lat < 84) {
    if (lon >= 0 && lon < 9) zone = 31;
    else if (lon >= 9 && lon < 21) zone = 33;
    else if (lon >= 21 && lon < 33) zone = 35;
    else if (lon >= 33 && lon < 42) zone = 37;
  }
  return zone;
}

export function latLonToUtm({ lat, lon }: LatLon, forceZone?: number): Utm | null {
  if (lat < -80 || lat > 84) return null;
  const zone = forceZone ?? utmZone(lat, lon);
  const lon0 = (zone - 1) * 6 - 180 + 3;
  const { x, y } = tmForward(lat, lon, lon0, 0.9996, WGS84);
  const band = BANDS[Math.min(19, Math.max(0, Math.floor((lat + 80) / 8)))];
  return { zone, hemisphere: lat >= 0 ? "N" : "S", easting: 500000 + x, northing: lat >= 0 ? y : 10000000 + y, band };
}

export function utmToLatLon(zone: number, hemisphere: "N" | "S", easting: number, northing: number): LatLon {
  const lon0 = (zone - 1) * 6 - 180 + 3;
  return tmInverse(easting - 500000, hemisphere === "N" ? northing : northing - 10000000, lon0, 0.9996, WGS84);
}

/** Turkiye 3 derecelik dilim merkez boylamlari (ITRF96 / TUREF, olcek 1). */
export const TM3_MERIDIANS = [27, 30, 33, 36, 39, 42, 45] as const;

export function tm3Meridian(lon: number) {
  return TM3_MERIDIANS.reduce((best, m) => (Math.abs(lon - m) < Math.abs(lon - best) ? m : best), TM3_MERIDIANS[0]);
}

export function latLonToTm3({ lat, lon }: LatLon, meridian = tm3Meridian(lon)) {
  const { x, y } = tmForward(lat, lon, meridian, 1, GRS80);
  return { meridian, easting: 500000 + x, northing: y };
}

export function tm3ToLatLon(meridian: number, easting: number, northing: number): LatLon {
  return tmInverse(easting - 500000, northing, meridian, 1, GRS80);
}

/* ---------------- Bicimlendirme ve ayristirma ---------------- */

export function toDms(value: number, decimals = 2) {
  const sign = value < 0 ? -1 : 1;
  const abs = Math.abs(value);
  let d = Math.floor(abs);
  let m = Math.floor((abs - d) * 60);
  let s = (abs - d - m / 60) * 3600;
  // Yuvarlama 60"'a tasarsa bir ust birime aktar.
  if (Number(s.toFixed(decimals)) >= 60) {
    s = 0;
    m += 1;
  }
  if (m >= 60) {
    m = 0;
    d += 1;
  }
  return { sign, d, m, s };
}

export function toDdm(value: number) {
  const sign = value < 0 ? -1 : 1;
  const abs = Math.abs(value);
  const d = Math.floor(abs);
  return { sign, d, m: (abs - d) * 60 };
}

/** "39°55'15.2\"K" gibi DMS metni; lang: TR'de K/G/D/B, EN'de N/S/E/W. */
export function formatDms(value: number, axis: "lat" | "lon", lang: "tr" | "en" = "tr", decimals = 2) {
  const { sign, d, m, s } = toDms(value, decimals);
  const hemi =
    axis === "lat" ? (sign >= 0 ? (lang === "tr" ? "K" : "N") : lang === "tr" ? "G" : "S") : sign >= 0 ? (lang === "tr" ? "D" : "E") : lang === "tr" ? "B" : "W";
  return `${d}°${String(m).padStart(2, "0")}′${s.toFixed(decimals).padStart(decimals + 3, "0")}″ ${hemi}`;
}

export function formatDdm(value: number, axis: "lat" | "lon", lang: "tr" | "en" = "tr") {
  const { sign, d, m } = toDdm(value);
  const hemi =
    axis === "lat" ? (sign >= 0 ? (lang === "tr" ? "K" : "N") : lang === "tr" ? "G" : "S") : sign >= 0 ? (lang === "tr" ? "D" : "E") : lang === "tr" ? "B" : "W";
  return `${d}°${m.toFixed(4).padStart(7, "0")}′ ${hemi}`;
}

/**
 * Tek bir eksen degerini okur: "39.9208", "39,9208", "-32.5", "39°55'15\"", "39 55 15.2 N", "32°51.25' D".
 * Yarikure harfi (N/S/E/W, K/G/D/B) isareti belirler.
 */
export function parseAxis(input: string): { value: number; hemi?: string } | null {
  let s = input.trim().toUpperCase().replace(/,(?=\d)/g, ".");
  if (!s) return null;
  const hemiMatch = s.match(/[NSEWKGDB]/g);
  const hemi = hemiMatch ? hemiMatch[hemiMatch.length - 1] : undefined;
  s = s.replace(/[NSEWKGDB]/g, " ");
  const negative = /^\s*-/.test(s);
  const nums = s.match(/\d+(?:\.\d+)?/g);
  if (!nums || nums.length > 3) return null;
  const [d, m = "0", sec = "0"] = nums;
  const mm = Number(m);
  const ss = Number(sec);
  if (mm >= 60 || ss >= 60) return null;
  let value = Number(d) + mm / 60 + ss / 3600;
  if (negative || hemi === "S" || hemi === "W" || hemi === "G" || hemi === "B") value = -value;
  return { value, hemi };
}

/** "enlem, boylam" ya da "39°55'N 32°51'E" gibi tam koordinat metnini okur. */
export function parseCoordinate(input: string): LatLon | null {
  const text = input.trim();
  if (!text) return null;
  let parts: string[] = [];
  // Yarikure harfleriyle bolunmus DMS: harfin ardindan ayir
  const byHemi = text.toUpperCase().match(/[^NSEWKGDB]*[NSEWKGDB]/g);
  // "39,92, 32,85" ya da "39,92 32,85" gibi ondalik virgullu yazim
  const decimalComma = text.match(/^\s*(-?\d+,\d+)\s*[,;\s]\s*(-?\d+,\d+)\s*$/);
  if (byHemi && byHemi.length === 2) parts = byHemi;
  else if (decimalComma) parts = [decimalComma[1], decimalComma[2]];
  else if (text.includes(";")) parts = text.split(";");
  else if ((text.match(/,/g) ?? []).length === 1) parts = text.split(/,\s*/);
  else parts = text.split(/\s+/).length === 2 ? text.split(/\s+/) : [];
  if (parts.length !== 2) return null;
  const a = parseAxis(parts[0]);
  const b = parseAxis(parts[1]);
  if (!a || !b) return null;
  // Yarikure harfi boylami gosteriyorsa sirayi degistir
  const aIsLon = a.hemi && "EWDB".includes(a.hemi);
  const [lat, lon] = aIsLon ? [b.value, a.value] : [a.value, b.value];
  if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;
  return { lat, lon };
}
