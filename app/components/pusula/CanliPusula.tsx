"use client";

import { useEffect, useRef, useState } from "react";
import { kabeMesafesi, kibleAcisi, kibleSaati, manyetikSapma } from "../../converter/diniHesaplar";
import { turkeyProvinces } from "../../converter/geo/turkeyProvinces";
import { sunPosition } from "../../converter/time/solar";
import { WORLD_LAND_RINGS } from "../../converter/geo/worldLand";

type Durum = "kapali" | "bekliyor" | "acik" | "desteklenmiyor" | "izin-yok";

type IosOrientationEvent = DeviceOrientationEvent & { webkitCompassHeading?: number; webkitCompassAccuracy?: number };
type OrientationPermission = { requestPermission?: () => Promise<"granted" | "denied"> };
type WakeLockSentinelLike = { release: () => Promise<void> };

// Konum izni yokken harita ve manyetik sapma İstanbul'a göre hesaplanır.
const VARSAYILAN = { lat: 41.01, lon: 28.98, ad: "İstanbul" };
const KABE = { lat: 21.4225, lon: 39.8262 };
// Sunucu ve ilk istemci çizimi aynı sabit tarihle hesaplar (hydration uyumu).
const SABIT_TARIH = new Date(Date.UTC(2026, 9, 1));

// Kadran ölçüleri (SVG birimi). Harita, merkezden 100° uzaklığa kadar olan yeri gösterir.
const R_DIS = 150;
const R_HARITA = 104;
const HARITA_ACI = 100;

const YON_KISA = ["K", "KD", "D", "GD", "G", "GB", "B", "KB"];
const YON_UZUN = ["Kuzey", "Kuzeydoğu", "Doğu", "Güneydoğu", "Güney", "Güneybatı", "Batı", "Kuzeybatı"];
const ANA_HARFLER = [
  { aci: 0, harf: "K" },
  { aci: 45, harf: "KD" },
  { aci: 90, harf: "D" },
  { aci: 135, harf: "GD" },
  { aci: 180, harf: "G" },
  { aci: 225, harf: "GB" },
  { aci: 270, harf: "B" },
  { aci: 315, harf: "KB" },
];

const SIRALI_ILLER = [...turkeyProvinces].sort((a, b) => a.name.localeCompare(b.name, "tr"));

const norm360 = (a: number) => ((a % 360) + 360) % 360;
const fark180 = (a: number) => ((a + 540) % 360) - 180;

export function yonAdi(derece: number) {
  const d = norm360(derece);
  const i = Math.round(d / 45) % 8;
  return { kisa: YON_KISA[i], uzun: YON_UZUN[i] };
}

/** Telefonun baktığı yön (manyetik kuzeyden saat yönünde) ya da null. */
function manyetikYon(event: IosOrientationEvent): number | null {
  if (typeof event.webkitCompassHeading === "number") return event.webkitCompassHeading;
  if (event.absolute && typeof event.alpha === "number") {
    const ekran = typeof screen !== "undefined" && screen.orientation ? screen.orientation.angle : 0;
    return norm360(360 - event.alpha + ekran);
  }
  return null;
}

/** Konuma ortalanmış eş uzaklıklı azimut izdüşümü: her yer, gerçek yönünde ve uzaklığıyla orantılı durur. */
function izdusum(lat0: number, lon0: number) {
  const f0 = (lat0 * Math.PI) / 180;
  const l0 = (lon0 * Math.PI) / 180;
  const k = R_HARITA / ((HARITA_ACI * Math.PI) / 180);
  return (lon: number, lat: number): [number, number] => {
    const f = (lat * Math.PI) / 180;
    const dl = (lon * Math.PI) / 180 - l0;
    const cosc = Math.sin(f0) * Math.sin(f) + Math.cos(f0) * Math.cos(f) * Math.cos(dl);
    const c = Math.acos(Math.max(-1, Math.min(1, cosc)));
    if (c < 1e-9) return [0, 0];
    const kp = (k * c) / Math.sin(c);
    const x = kp * Math.cos(f) * Math.sin(dl);
    const y = kp * (Math.cos(f0) * Math.sin(f) - Math.sin(f0) * Math.cos(f) * Math.cos(dl));
    return [x, -y];
  };
}

function haritaYolu(lat0: number, lon0: number) {
  const p = izdusum(lat0, lon0);
  const sinir = R_HARITA * 1.6;
  let d = "";
  for (const halka of WORLD_LAND_RINGS) {
    let parca = "";
    let kopuk = true;
    for (let i = 0; i < halka.length; i += 2) {
      const [x, y] = p(halka[i] / 10, halka[i + 1] / 10);
      // Ufkun çok ötesindeki noktalar (antipoda yakın) çizilmez; kırpma dairesi zaten dışını gizler.
      if (Math.hypot(x, y) > sinir) {
        kopuk = true;
        continue;
      }
      parca += `${kopuk ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
      kopuk = false;
    }
    d += parca;
  }
  return d;
}

const saatYaz = (t: Date, ilSaati: boolean) =>
  t.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", ...(ilSaati ? { timeZone: "Europe/Istanbul" } : {}) });

const secilenIlAdi = (konum: { lat: number; lon: number } | null, il: string) => (konum ? "konumunuz" : il);

const koordinatYaz = (lat: number, lon: number) => {
  const f = (v: number) => Math.abs(v).toLocaleString("tr-TR", { maximumFractionDigits: 3 });
  return `${f(lat)}° ${lat >= 0 ? "K" : "G"} · ${f(lon)}° ${lon >= 0 ? "D" : "B"}`;
};

/**
 * mod "pusula": genel pusula (/canli-pusula). mod "kible": kıble bulma (/kible-yonu-hesaplama); okuma kıbleye
 * kaç derece dönüleceğini söyler, il seçilebilir, kıble her zaman açıktır.
 */
// Harita yolu ve kıble saati pahalı; yön sensörü saniyede onlarca kez çizim tetiklediği için konuma göre saklanır.
const ONBELLEK = new Map<string, unknown>();
function onbellek<T>(anahtar: string, hesapla: () => T): T {
  if (!ONBELLEK.has(anahtar)) {
    if (ONBELLEK.size > 50) ONBELLEK.clear();
    ONBELLEK.set(anahtar, hesapla());
  }
  return ONBELLEK.get(anahtar) as T;
}

/**
 * Kıble modunda haritanın yerine Mescid-i Haram'ın metaf zemini: mermer ve saat yönünün tersine yavaşça dönen
 * tavaf halkaları. Kadranla birlikte döner.
 */
function MetafZemini() {
  return (
    <g>
      <circle r={R_HARITA} fill="url(#haram-mermer)" />
      {[
        { r: 48, renk: "#ffffff", hiz: "haram-tavaf-1" },
        { r: 57, renk: "#d9d2c3", hiz: "haram-tavaf-2" },
        { r: 66, renk: "#ffffff", hiz: "haram-tavaf-1" },
        { r: 75, renk: "#cfc7b6", hiz: "haram-tavaf-2" },
        { r: 84, renk: "#ffffff", hiz: "haram-tavaf-3" },
        { r: 93, renk: "#d9d2c3", hiz: "haram-tavaf-3" },
      ].map(({ r, renk, hiz }) => (
        <circle key={r} r={r} className={`haram-tavaf ${hiz}`} stroke={renk} />
      ))}
    </g>
  );
}

/**
 * Kâbe: hafif yukarıdan, eğik izdüşümle çizilmiş küp. Kadran dönse de dik durur (sabit katman). Siyah örtü (kisve),
 * altın kuşak (hizam), altın kapı, Hacerülesved köşesi ve Hicr-i İsmail duvarı.
 */
function KabeCizimi() {
  // Ön yüz: x -20..16, y -6..24; derinlik (9, -9).
  return (
    <g className="kabe" filter="url(#pusula-golge)" transform="translate(5 -8) scale(1.35)">
      <ellipse cx="2" cy="27" rx="30" ry="6" className="kabe-golge" />
      <path d="M -20 10 C -40 8 -44 30 -24 34 L -20 30 C -34 27 -31 14 -20 15 Z" className="kabe-hicr" />
      <polygon points="-20,-6 16,-6 25,-15 -11,-15" fill="url(#kabe-cati)" />
      <polygon points="16,-6 25,-15 25,15 16,24" fill="url(#kabe-yan)" />
      <rect x="-20" y="-6" width="36" height="30" fill="url(#kabe-on)" />
      <rect x="-20" y="-1" width="36" height="4.2" className="kabe-kusak" />
      <polygon points="16,-1 25,-10 25,-5.8 16,3.2" className="kabe-kusak is-yan" />
      {[-16, -11, -6, -1, 4, 9].map((x) => (
        <rect key={x} x={x} y="0.1" width="3" height="2" rx="0.4" className="kabe-yazi" />
      ))}
      <rect x="5" y="7" width="7" height="12" rx="0.8" className="kabe-kapi" />
      <rect x="6.3" y="8.3" width="4.4" height="9.4" rx="0.5" className="kabe-kapi-ic" />
      <circle cx="-18.8" cy="21" r="1.6" className="kabe-tas" />
    </g>
  );
}

export default function CanliPusula({ mod = "pusula" }: { mod?: "pusula" | "kible" }) {
  const kibleModu = mod === "kible";
  const [durum, setDurum] = useState<Durum>("kapali");
  const [ilId, setIlId] = useState("istanbul");
  // Bilgisayarda yön sensörü yoktur; dokunmatik olmayan ve ince işaretçili cihazlarda güneş yöntemi baştan gösterilir.
  const [masaustu, setMasaustu] = useState(false);
  const [yon, setYon] = useState<number | null>(null);
  const [dogruluk, setDogruluk] = useState<number | null>(null);
  const [egim, setEgim] = useState({ x: 0, y: 0 });
  const [konum, setKonum] = useState<{ lat: number; lon: number } | null>(null);
  const [konumMesaji, setKonumMesaji] = useState<string | null>(null);
  const [kibleGoster, setKibleGoster] = useState(true);
  const [kilit, setKilit] = useState<number | null>(null);
  const [simdi, setSimdi] = useState<Date>(SABIT_TARIH);
  // Kadran 359°→0° geçişinde ters yönde tam tur atmasın diye açı sarılmadan biriktirilir.
  const [donus, setDonus] = useState(0);
  const sonDonus = useRef(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setSimdi(new Date());
      setMasaustu(!("ontouchstart" in window) && window.matchMedia("(pointer: fine)").matches);
    });
    // Güneşin yeri dakikada bir güncellenir.
    const aralik = window.setInterval(() => setSimdi(new Date()), 60000);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(aralik);
    };
  }, []);

  const secilenIl = turkeyProvinces.find((p) => p.id === ilId) ?? turkeyProvinces[0];
  const lat = konum ? konum.lat : kibleModu ? secilenIl.lat : VARSAYILAN.lat;
  const lon = konum ? konum.lon : kibleModu ? secilenIl.lon : VARSAYILAN.lon;
  const nokta = { lat, lon };
  const ilSaati = konum === null;
  const gunes = sunPosition(simdi, lat, lon);
  const gunesGorunur = gunes.elevation > -1;
  // Kıble saati günde bir hesaplanır (dakikalık güncellemede yeniden aranmaz).
  const gun = simdi.toISOString().slice(0, 10);
  const kibleAni = onbellek(`kible:${lat},${lon},${gun}`, () => kibleSaati(lat, lon, new Date(`${gun}T12:00:00Z`)));
  const sapma = manyetikSapma(nokta.lat, nokta.lon, simdi);
  const gercekYon = yon === null ? null : norm360(yon + sapma);
  const gosterilen = gercekYon ?? 0;
  const kible = kibleAcisi(nokta.lat, nokta.lon);
  const harita = onbellek(`harita:${lat},${lon}`, () => haritaYolu(lat, lon));
  // Sunucu ve tarayıcı son basamakta farklı yuvarlayabiliyor (hydration uyumsuzluğu); bir ondalık yeterli.
  const kabeNokta = izdusum(lat, lon)(KABE.lon, KABE.lat).map((v) => Math.round(v * 10) / 10);

  useEffect(() => {
    if (gercekYon === null) return;
    const yeni = sonDonus.current + fark180(-gercekYon - sonDonus.current);
    sonDonus.current = yeni;
    const frame = requestAnimationFrame(() => setDonus(yeni));
    return () => cancelAnimationFrame(frame);
  }, [gercekYon]);

  useEffect(() => {
    if (durum !== "acik" && durum !== "bekliyor") return;
    let onceki: number | null = null;
    const dinle = (event: Event) => {
      const e = event as IosOrientationEvent;
      const m = manyetikYon(e);
      if (m === null) return;
      // Titremeyi azaltan yumuşatma: yeni okumanın %25'i alınır.
      onceki = onceki === null ? m : norm360(onceki + fark180(m - onceki) * 0.25);
      setYon(onceki);
      if (typeof e.webkitCompassAccuracy === "number") setDogruluk(e.webkitCompassAccuracy);
      if (typeof e.beta === "number" && typeof e.gamma === "number") {
        setEgim({ x: Math.max(-30, Math.min(30, e.gamma)), y: Math.max(-30, Math.min(30, e.beta)) });
      }
      setDurum("acik");
    };
    const olay = "ondeviceorientationabsolute" in window ? "deviceorientationabsolute" : "deviceorientation";
    window.addEventListener(olay, dinle);
    const zaman = window.setTimeout(() => setDurum((d) => (d === "bekliyor" ? "desteklenmiyor" : d)), 3000);
    return () => {
      window.removeEventListener(olay, dinle);
      window.clearTimeout(zaman);
    };
  }, [durum]);

  // Pusula açıkken ekran kararmasın.
  useEffect(() => {
    if (durum !== "acik") return;
    const wl = (navigator as Navigator & { wakeLock?: { request: (t: "screen") => Promise<WakeLockSentinelLike> } }).wakeLock;
    if (!wl) return;
    let kilitNesnesi: WakeLockSentinelLike | null = null;
    wl.request("screen")
      .then((k) => {
        kilitNesnesi = k;
      })
      .catch(() => undefined);
    return () => {
      kilitNesnesi?.release().catch(() => undefined);
    };
  }, [durum]);

  const kibleFark = gercekYon === null ? null : fark180(kible - gercekYon);
  const kibleAcik = kibleModu || kibleGoster;
  const kibleHizali = kibleAcik && kibleFark !== null && Math.abs(kibleFark) <= 3;
  const kilitFark = kilit === null || gercekYon === null ? null : fark180(kilit - gercekYon);

  useEffect(() => {
    if (kibleHizali && "vibrate" in navigator) navigator.vibrate(60);
  }, [kibleHizali]);

  const baslat = async () => {
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) {
      setDurum("desteklenmiyor");
      return;
    }
    const izin = (DeviceOrientationEvent as unknown as OrientationPermission).requestPermission;
    if (izin) {
      try {
        if ((await izin()) !== "granted") {
          setDurum("izin-yok");
          return;
        }
      } catch {
        setDurum("izin-yok");
        return;
      }
    }
    setDurum("bekliyor");
  };

  const konumAl = () => {
    if (!("geolocation" in navigator)) {
      setKonumMesaji("Tarayıcınız konum özelliğini desteklemiyor.");
      return;
    }
    setKonumMesaji("Konum alınıyor…");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setKonum({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setKonumMesaji(null);
      },
      () => setKonumMesaji(kibleModu ? "Konum izni verilmedi; listeden ilinizi seçin." : "Konum izni verilmedi; harita ve sapma İstanbul'a göre gösteriliyor."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const ad = yonAdi(gosterilen);
  const derece = Math.round(gosterilen) % 360;
  const kalibrasyon = dogruluk !== null && (dogruluk < 0 || dogruluk > 20);
  const terazi = Math.hypot(egim.x, egim.y) <= 4;
  const fmt1 = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const gunesKibleFark = fark180(kible - gunes.azimuth);
  const sensorYok = masaustu || durum === "desteklenmiyor";

  return (
    <section className={`pusula${kibleModu ? " is-kible-modu" : ""}${durum === "acik" ? " is-acik" : ""}${kibleHizali ? " is-kible" : ""}`} aria-label="Canlı pusula">
      <div className="pusula-okuma" aria-live="polite">
        {durum === "acik" && kibleModu && kibleFark !== null ? (
          kibleHizali ? (
            <>
              <strong>Kıble</strong>
              <span>Kıbleye dönüksünüz</span>
            </>
          ) : (
            <>
              <strong>{Math.abs(Math.round(kibleFark))}°</strong>
              <span>
                {kibleFark > 0 ? "sağa" : "sola"} dönün · telefon {derece}° {ad.kisa}
              </span>
            </>
          )
        ) : durum === "acik" ? (
          <>
            <strong>{derece}°</strong>
            <span>
              {ad.kisa} · {ad.uzun}
            </span>
          </>
        ) : masaustu && durum === "kapali" ? (
          <>
            <strong>{kibleModu ? `${fmt1(kible)}°` : gunesGorunur ? `${Math.round(gunes.azimuth)}°` : "—"}</strong>
            <span>{kibleModu ? "Kıble, gerçek kuzeye göre" : gunesGorunur ? `Güneşin yönü · ${yonAdi(gunes.azimuth).uzun}` : "Bilgisayarda pusula sensörü yok"}</span>
          </>
        ) : (
          <button type="button" className="pusula-baslat" onClick={baslat}>
            Pusulayı başlat
          </button>
        )}
        {kilitFark !== null && (
          <em>
            {Math.abs(kilitFark) <= 2 ? "Hedef yöndesiniz" : `Hedefe ${Math.abs(Math.round(kilitFark))}° ${kilitFark > 0 ? "sağa" : "sola"} dönün`}
          </em>
        )}
        {kibleHizali && !kibleModu && <em>Kıbleye dönüksünüz</em>}
        {durum !== "acik" && kibleModu && !masaustu && <span>Kıble {fmt1(kible)}° · {secilenIlAdi(konum, secilenIl.name)}</span>}
      </div>

      {kibleModu && (
        <label className="pusula-il">
          <span>İl</span>
          <select
            value={ilId}
            onChange={(event) => {
              setIlId(event.target.value);
              setKonum(null);
            }}
          >
            {SIRALI_ILLER.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </label>
      )}

      <div className="pusula-sahne">
        <div
          className="pusula-govde"
          style={{ transform: `rotateX(${(-egim.y * 0.35).toFixed(1)}deg) rotateY(${(egim.x * 0.35).toFixed(1)}deg)` }}
        >
          <svg viewBox="-160 -160 320 320" className="pusula-svg" role="img" aria-label={`Pusula: ${derece} derece, ${ad.uzun}`}>
            <defs>
              <radialGradient id="pusula-cerceve" cx="35%" cy="30%" r="80%">
                <stop offset="0%" stopColor="#f4f7f9" />
                <stop offset="45%" stopColor="#b9c6cf" />
                <stop offset="100%" stopColor="#5d6f7c" />
              </radialGradient>
              <radialGradient id="pusula-yuz" cx="50%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#1f6f8b" />
                <stop offset="100%" stopColor="#0b2a3c" />
              </radialGradient>
              <linearGradient id="pusula-cam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.34" />
                <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="pusula-kuzey" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff5a4e" />
                <stop offset="50%" stopColor="#d7261e" />
                <stop offset="100%" stopColor="#a5170f" />
              </linearGradient>
              <linearGradient id="pusula-guney" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#c8d3db" />
              </linearGradient>
              <radialGradient id="haram-mermer" cx="50%" cy="45%" r="60%">
                <stop offset="0%" stopColor="#fbfaf6" />
                <stop offset="100%" stopColor="#e2dccd" />
              </radialGradient>
              <linearGradient id="kabe-on" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2b2b2b" />
                <stop offset="60%" stopColor="#111111" />
                <stop offset="100%" stopColor="#050505" />
              </linearGradient>
              <linearGradient id="kabe-yan" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0a0a0a" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
              <linearGradient id="kabe-cati" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#5a5a5a" />
                <stop offset="100%" stopColor="#8d8d8d" />
              </linearGradient>
              <clipPath id="pusula-harita-kirp">
                <circle r={R_HARITA} />
              </clipPath>
              <filter id="pusula-golge" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#04121c" floodOpacity="0.45" />
              </filter>
            </defs>

            <circle r={R_DIS + 6} fill="url(#pusula-cerceve)" filter="url(#pusula-golge)" />
            <circle r={R_DIS - 2} fill="url(#pusula-yuz)" />

            <g className="pusula-kart" style={{ transform: `rotate(${donus}deg)` }}>
              <g clipPath="url(#pusula-harita-kirp)">
                {kibleModu ? (
                  <MetafZemini />
                ) : (
                  <>
                    <circle r={R_HARITA} className="pusula-deniz" />
                    <path d={harita} className="pusula-kara" />
                    {[30, 60, 90].map((a) => (
                      <circle key={a} r={(R_HARITA * a) / HARITA_ACI} className="pusula-halka" />
                    ))}
                  </>
                )}
              </g>
              <circle r={R_HARITA} className="pusula-harita-kenar" />

              {Array.from({ length: 72 }, (_, i) => i * 5).map((a) => {
                const uzun = a % 30 === 0;
                const orta = a % 10 === 0;
                return (
                  <line
                    key={a}
                    x1="0"
                    y1={-(R_DIS - 6)}
                    x2="0"
                    y2={-(R_DIS - (uzun ? 20 : orta ? 14 : 10))}
                    className={uzun ? "pusula-cizgi is-uzun" : "pusula-cizgi"}
                    transform={`rotate(${a})`}
                  />
                );
              })}
              {Array.from({ length: 12 }, (_, i) => i * 30).map((a) => (
                <text key={a} y={-(R_DIS - 31)} className="pusula-sayi" transform={`rotate(${a})`} textAnchor="middle">
                  {a}
                </text>
              ))}
              {ANA_HARFLER.map(({ aci, harf }) => (
                <text
                  key={harf}
                  y={-(R_HARITA - (harf.length === 1 ? 20 : 15))}
                  className={`pusula-harf${harf.length === 1 ? " is-ana" : ""}${harf === "K" ? " is-kuzey" : ""}`}
                  transform={`rotate(${aci})`}
                  textAnchor="middle"
                >
                  {harf}
                </text>
              ))}

              {kibleAcik && (
                <g transform={`rotate(${kible})`} className="pusula-kible">
                  {kibleModu ? (
                    <>
                      <line x1="0" y1="-46" x2="0" y2={-(R_HARITA - 16)} className="pusula-kible-ok" />
                      <polygon points={`0,${-(R_HARITA - 2)} -10,${-(R_HARITA - 20)} 10,${-(R_HARITA - 20)}`} className="pusula-kible-uc" />
                    </>
                  ) : (
                    <line x1="0" y1="-14" x2="0" y2={-(R_HARITA - 2)} className="pusula-kible-cizgi" />
                  )}
                  <rect x="-7" y={-(R_DIS - 4)} width="14" height="14" rx="2" className="pusula-kabe" />
                  <rect x="-7" y={-(R_DIS - 8)} width="14" height="3" className="pusula-kabe-serit" />
                </g>
              )}
              {kibleAcik && !kibleModu && <circle cx={kabeNokta[0]} cy={kabeNokta[1]} r="3.5" className="pusula-kabe-nokta" />}

              {gunesGorunur && (
                <g transform={`rotate(${gunes.azimuth.toFixed(1)})`} className="pusula-gunes">
                  <circle cy={-R_HARITA} r="9" className="pusula-gunes-hale" />
                  <circle cy={-R_HARITA} r="5.5" className="pusula-gunes-ic" />
                </g>
              )}

              {kilit !== null && (
                <g transform={`rotate(${kilit})`}>
                  <polygon points={`0,${-(R_DIS - 2)} -7,${-(R_DIS - 16)} 7,${-(R_DIS - 16)}`} className="pusula-kilit" />
                </g>
              )}
            </g>

            {/* Kıble modunda iğne yok: ortadaki Kâbe çizimi görünsün, yönü yeşil kıble oku gösterir. */}
            <g className="pusula-igne" filter="url(#pusula-golge)" style={{ transform: `rotate(${donus}deg)` }} display={kibleModu ? "none" : undefined}>
              <polygon points="0,-96 11,0 0,6 -11,0" fill="url(#pusula-kuzey)" />
              <polygon points="0,96 11,0 0,-6 -11,0" fill="url(#pusula-guney)" />
            </g>

            {kibleModu && <KabeCizimi />}

            {/* Su terazisi: kıble modunda ortadaki Kâbe çizimini kapatmasın diye aşağıda durur. */}
            <g transform={`translate(0 ${kibleModu ? 72 : 0})`} display={masaustu && durum !== "acik" ? "none" : undefined}>
              <circle r={kibleModu ? 11 : 15} className="pusula-terazi" />
              <circle
                cx={((egim.x / 30) * 10 * (kibleModu ? 0.7 : 1)).toFixed(1)}
                cy={((egim.y / 30) * 10 * (kibleModu ? 0.7 : 1)).toFixed(1)}
                r={kibleModu ? 4 : 5}
                className={`pusula-kabarcik${terazi ? " is-duz" : ""}`}
              />
              {!kibleModu && <circle r="3" className="pusula-merkez" />}
            </g>

            <polygon points={`0,${-(R_DIS + 4)} -9,${-(R_DIS + 20)} 9,${-(R_DIS + 20)}`} className="pusula-isaret" />
            <circle r={R_DIS + 6} fill="url(#pusula-cam)" pointerEvents="none" />
          </svg>
        </div>
      </div>

      <div className="pusula-dugmeler">
        <button type="button" onClick={konumAl} aria-pressed={konum !== null}>
          {konum ? "Konum kullanılıyor" : "Konumumu kullan"}
        </button>
        {!kibleModu && (
          <button type="button" onClick={() => setKibleGoster((x) => !x)} aria-pressed={kibleGoster}>
            Kıble {kibleGoster ? "açık" : "kapalı"}
          </button>
        )}
        <button
          type="button"
          onClick={() => setKilit((k) => (k === null && gercekYon !== null ? Math.round(gercekYon) : null))}
          aria-pressed={kilit !== null}
          disabled={durum !== "acik" && kilit === null}
        >
          {kilit === null ? "Yönü kilitle" : `Kilit: ${kilit}° (kaldır)`}
        </button>
      </div>

      <dl className="pusula-bilgi">
        {kibleModu ? (
          <>
            <div>
              <dt>Kıble (gerçek kuzey)</dt>
              <dd>{fmt1(kible)}°</dd>
            </div>
            <div>
              <dt>Pusulada</dt>
              <dd>{fmt1(norm360(kible - sapma))}°</dd>
            </div>
            <div>
              <dt>Kâbe&apos;ye uzaklık</dt>
              <dd>{Math.round(kabeMesafesi(nokta.lat, nokta.lon)).toLocaleString("tr-TR")} km</dd>
            </div>
            <div>
              <dt>Bugün kıble saati</dt>
              <dd>{kibleAni ? saatYaz(kibleAni, ilSaati) : "—"}</dd>
            </div>
          </>
        ) : (
          <>
            <div>
              <dt>Kuzey</dt>
              <dd>Gerçek (coğrafi) kuzey</dd>
            </div>
            <div>
              <dt>Manyetik sapma</dt>
              <dd>
                {fmt1(Math.abs(sapma))}° {sapma >= 0 ? "doğu" : "batı"}
              </dd>
            </div>
            <div>
              <dt>Güneş</dt>
              <dd>{gunesGorunur ? `${Math.round(gunes.azimuth)}° ${yonAdi(gunes.azimuth).uzun}` : "Ufkun altında"}</dd>
            </div>
            <div>
              <dt>Konum</dt>
              <dd>{konum ? koordinatYaz(konum.lat, konum.lon) : `${VARSAYILAN.ad} (varsayılan)`}</dd>
            </div>
          </>
        )}
      </dl>

      <div className="pusula-notlar">
        {konumMesaji && <p className="pusula-not">{konumMesaji}</p>}
        {sensorYok && (
          <div className="pusula-not pusula-gunes-yontemi">
            <strong>Bilgisayarda pusula sensörü yoktur</strong>
            <p>
              Canlı pusula telefondaki manyetik alan sensörüyle çalışır; dizüstü ve masaüstü bilgisayarlarda bu sensör bulunmadığı için hiçbir site
              bilgisayarda canlı pusula gösteremez. Sayfayı telefonunuzda açın ya da yönü güneşle bulun:
            </p>
            {gunes.elevation > 0 ? (
              <p>
                Güneş şu an <b>{Math.round(gunes.azimuth)}°</b> ({yonAdi(gunes.azimuth).uzun}) yönünde, kadranda sarı daire.
                {kibleAcik &&
                  (Math.abs(gunesKibleFark) <= 3
                    ? " Güneş şu an tam kıble yönünde: güneşe dönün."
                    : ` Güneşe dönün; kıble güneşin ${Math.abs(Math.round(gunesKibleFark))}° ${gunesKibleFark > 0 ? "sağında" : "solunda"}.`)}
              </p>
            ) : (
              <p>Güneş şu an ufkun altında.</p>
            )}
            {kibleAcik && kibleAni && (
              <p>
                Bugün kıble saati <b>{saatYaz(kibleAni, ilSaati)}</b>: o anda güneş tam kıble yönündedir, güneşe dönen kıbleye dönmüş olur.
              </p>
            )}
          </div>
        )}
        {durum === "izin-yok" && (
          <p className="pusula-not">Pusula için hareket ve yön izni gerekiyor. iPhone'da Safari'yi kapatıp sayfayı yeniden açın ve izin isteğine &quot;İzin Ver&quot; deyin.</p>
        )}
        {kalibrasyon && <p className="pusula-not">Ölçüm hassasiyeti düşük: telefonu havada birkaç kez 8 çizerek kalibre edin ve metal eşyalardan uzaklaşın.</p>}
        {durum === "acik" && !terazi && <p className="pusula-not is-hafif">En doğru okuma için telefonu yere paralel tutun; ortadaki kabarcık yeşile döner.</p>}
        {masaustu && durum === "kapali" && (
          <button type="button" className="pusula-ikincil" onClick={baslat}>
            Telefon ya da tabletteyseniz: pusulayı başlat
          </button>
        )}
      </div>
    </section>
  );
}
