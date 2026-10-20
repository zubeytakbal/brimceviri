"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { kibleAcisi, manyetikSapma } from "../../converter/diniHesaplar";
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

export default function CanliPusula() {
  const [durum, setDurum] = useState<Durum>("kapali");
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
    const frame = requestAnimationFrame(() => setSimdi(new Date()));
    return () => cancelAnimationFrame(frame);
  }, []);

  const nokta = konum ?? VARSAYILAN;
  const sapma = manyetikSapma(nokta.lat, nokta.lon, simdi);
  const gercekYon = yon === null ? null : norm360(yon + sapma);
  const gosterilen = gercekYon ?? 0;
  const kible = kibleAcisi(nokta.lat, nokta.lon);
  const harita = useMemo(() => haritaYolu(nokta.lat, nokta.lon), [nokta.lat, nokta.lon]);
  // Sunucu ve tarayıcı son basamakta farklı yuvarlayabiliyor (hydration uyumsuzluğu); bir ondalık yeterli.
  const kabeNokta = useMemo(
    () => izdusum(nokta.lat, nokta.lon)(KABE.lon, KABE.lat).map((v) => Math.round(v * 10) / 10),
    [nokta.lat, nokta.lon]
  );

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
  const kibleHizali = kibleGoster && kibleFark !== null && Math.abs(kibleFark) <= 3;
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
      () => setKonumMesaji("Konum izni verilmedi; harita ve sapma İstanbul'a göre gösteriliyor."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const ad = yonAdi(gosterilen);
  const derece = Math.round(gosterilen) % 360;
  const kalibrasyon = dogruluk !== null && (dogruluk < 0 || dogruluk > 20);
  const terazi = Math.hypot(egim.x, egim.y) <= 4;

  return (
    <section className={`pusula${durum === "acik" ? " is-acik" : ""}${kibleHizali ? " is-kible" : ""}`} aria-label="Canlı pusula">
      <div className="pusula-okuma" aria-live="polite">
        {durum === "acik" ? (
          <>
            <strong>{derece}°</strong>
            <span>
              {ad.kisa} · {ad.uzun}
            </span>
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
        {kibleHizali && <em>Kıbleye dönüksünüz</em>}
      </div>

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
                <circle r={R_HARITA} className="pusula-deniz" />
                <path d={harita} className="pusula-kara" />
                {[30, 60, 90].map((a) => (
                  <circle key={a} r={(R_HARITA * a) / HARITA_ACI} className="pusula-halka" />
                ))}
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

              {kibleGoster && (
                <g transform={`rotate(${kible})`} className="pusula-kible">
                  <line x1="0" y1="-14" x2="0" y2={-(R_HARITA - 2)} className="pusula-kible-cizgi" />
                  <rect x="-7" y={-(R_DIS - 4)} width="14" height="14" rx="2" className="pusula-kabe" />
                  <rect x="-7" y={-(R_DIS - 8)} width="14" height="3" className="pusula-kabe-serit" />
                </g>
              )}
              {kibleGoster && <circle cx={kabeNokta[0]} cy={kabeNokta[1]} r="3.5" className="pusula-kabe-nokta" />}

              {kilit !== null && (
                <g transform={`rotate(${kilit})`}>
                  <polygon points={`0,${-(R_DIS - 2)} -7,${-(R_DIS - 16)} 7,${-(R_DIS - 16)}`} className="pusula-kilit" />
                </g>
              )}
            </g>

            <g className="pusula-igne" filter="url(#pusula-golge)" style={{ transform: `rotate(${donus}deg)` }}>
              <polygon points="0,-96 11,0 0,6 -11,0" fill="url(#pusula-kuzey)" />
              <polygon points="0,96 11,0 0,-6 -11,0" fill="url(#pusula-guney)" />
            </g>

            <circle r="15" className="pusula-terazi" />
            <circle
              cx={(egim.x / 30) * 10}
              cy={(egim.y / 30) * 10}
              r="5"
              className={`pusula-kabarcik${terazi ? " is-duz" : ""}`}
            />
            <circle r="3" className="pusula-merkez" />

            <polygon points={`0,${-(R_DIS + 4)} -9,${-(R_DIS + 20)} 9,${-(R_DIS + 20)}`} className="pusula-isaret" />
            <circle r={R_DIS + 6} fill="url(#pusula-cam)" pointerEvents="none" />
          </svg>
        </div>
      </div>

      <div className="pusula-dugmeler">
        <button type="button" onClick={konumAl} aria-pressed={konum !== null}>
          {konum ? "Konum kullanılıyor" : "Konumumu kullan"}
        </button>
        <button type="button" onClick={() => setKibleGoster((x) => !x)} aria-pressed={kibleGoster}>
          Kıble {kibleGoster ? "açık" : "kapalı"}
        </button>
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
        <div>
          <dt>Kuzey</dt>
          <dd>Gerçek (coğrafi) kuzey</dd>
        </div>
        <div>
          <dt>Manyetik sapma</dt>
          <dd>
            {Math.abs(sapma).toLocaleString("tr-TR", { maximumFractionDigits: 1 })}° {sapma >= 0 ? "doğu" : "batı"}
          </dd>
        </div>
        <div>
          <dt>Kıble</dt>
          <dd>{kible.toLocaleString("tr-TR", { maximumFractionDigits: 1 })}°</dd>
        </div>
        <div>
          <dt>Konum</dt>
          <dd>
            {konum
              ? `${konum.lat.toLocaleString("tr-TR", { maximumFractionDigits: 3 })}, ${konum.lon.toLocaleString("tr-TR", { maximumFractionDigits: 3 })}`
              : `${VARSAYILAN.ad} (varsayılan)`}
          </dd>
        </div>
      </dl>

      {konumMesaji && <p className="pusula-not">{konumMesaji}</p>}
      {durum === "desteklenmiyor" && (
        <p className="pusula-not">
          Bu cihazda yön sensörü bulunamadı. Canlı pusula telefon ve tabletlerde çalışır; bilgisayarlarda pusula sensörü yoktur. Bu sayfayı telefonunuzda açın.
        </p>
      )}
      {durum === "izin-yok" && (
        <p className="pusula-not">Pusula için hareket ve yön izni gerekiyor. iPhone'da Safari'yi kapatıp sayfayı yeniden açın ve izin isteğine &quot;İzin Ver&quot; deyin.</p>
      )}
      {kalibrasyon && <p className="pusula-not">Ölçüm hassasiyeti düşük: telefonu havada birkaç kez 8 çizerek kalibre edin ve metal eşyalardan uzaklaşın.</p>}
      {durum === "acik" && !terazi && <p className="pusula-not is-hafif">En doğru okuma için telefonu yere paralel tutun; ortadaki kabarcık yeşile döner.</p>}
    </section>
  );
}
