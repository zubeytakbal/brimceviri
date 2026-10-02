"use client";

import { useEffect, useState } from "react";
import {
  BUYUKBAS_MAX_HISSE,
  CUZ_SAYISI,
  hatimDagit,
  hatimPlani,
  kabeMesafesi,
  kazaNamazi,
  kazaNamaziGun,
  kibleAcisi,
  kurbanHissesi,
  maasZekat,
  manyetikSapma,
  MUSHAF_SAYFA,
  NISAP_ALTIN_GRAM,
  okumaSuresiDakika,
  pusulaKibleAcisi,
  yonAdi,
  zekatHesapla,
} from "../../converter/diniHesaplar";
import { turkeyProvinces } from "../../converter/geo/turkeyProvinces";
import { HIJRI_MONTHS_TR, type YMD } from "../../converter/time/calendars";
import { diffDays, parseYmd } from "../../converter/time/dateMath";
import { hisabUmr } from "../../converter/time/hijriAge";

export const fmt = (n: number, d = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: d });
export const tl = (n: number) => `${n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`;
export const sayi = (raw: string) => {
  const s = raw.trim().replace(/\s|TL|₺/gi, "");
  if (!s) return Number.NaN;
  let norm = s;
  if (s.includes(",")) norm = s.replace(/\./g, "").replace(",", ".");
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) norm = s.replace(/\./g, "");
  const n = Number(norm);
  return Number.isFinite(n) ? n : Number.NaN;
};
export const sayi0 = (raw: string) => (raw.trim() === "" ? 0 : sayi(raw));

function todayIstanbul(): YMD {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return parseYmd(parts)!;
}
const ymdText = (d: YMD) => `${String(d.day).padStart(2, "0")}.${String(d.month).padStart(2, "0")}.${d.year}`;
const ymdIso = (d: YMD) => `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;

export function Field({
  label,
  value,
  onChange,
  suffix,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  type?: "text" | "date";
}) {
  return (
    <label className="date-calc-field">
      <span>
        {label}
        {suffix ? ` (${suffix})` : ""}
      </span>
      <input type={type} inputMode={type === "text" ? "decimal" : undefined} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

export function Modes<T extends string>({ value, onChange, options, label }: { value: T; onChange: (v: T) => void; options: Array<[T, string]>; label: string }) {
  return (
    <div className="date-converter-modes is-light" role="tablist" aria-label={label}>
      {options.map(([v, text]) => (
        <button key={v} type="button" role="tab" aria-selected={value === v} className={value === v ? "is-active" : undefined} onClick={() => onChange(v)}>
          {text}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Kaza namazı ---------------- */

export function KazaNamaziHesaplama() {
  const [mod, setMod] = useState<"sure" | "tarih">("sure");
  const [yil, setYil] = useState("1");
  const [ay, setAy] = useState("0");
  const [gun, setGun] = useState("0");
  const [bas, setBas] = useState("2015-01-01");
  const [bit, setBit] = useState("2016-01-01");
  const [vitir, setVitir] = useState(true);
  const [gunluk, setGunluk] = useState("5");

  const basY = parseYmd(bas);
  const bitY = parseYmd(bit);
  const gunFark = basY && bitY ? diffDays(basY, bitY) : Number.NaN;
  const r =
    mod === "sure"
      ? kazaNamazi(sayi0(yil), sayi0(ay), sayi0(gun), vitir, sayi(gunluk))
      : gunFark > 0
        ? kazaNamaziGun(gunFark, vitir, sayi(gunluk))
        : null;

  return (
    <div className="date-calc">
      <Modes
        label="Hesaplama yöntemi"
        value={mod}
        onChange={setMod}
        options={[
          ["sure", "Süre gir (yıl, ay, gün)"],
          ["tarih", "Tarih aralığı gir"],
        ]}
      />
      <div className="date-calc-input">
        {mod === "sure" ? (
          <div className="date-calc-fields">
            <Field label="Yıl" value={yil} onChange={setYil} />
            <Field label="Ay" value={ay} onChange={setAy} />
            <Field label="Gün" value={gun} onChange={setGun} />
          </div>
        ) : (
          <div className="date-calc-fields">
            <Field label="Kılınmayan dönemin başı" type="date" value={bas} onChange={setBas} />
            <Field label="Düzenli kılmaya başlanan gün" type="date" value={bit} onChange={setBit} />
          </div>
        )}
        <div className="date-calc-fields">
          <Field label="Günde kaç vakit kaza kılınacak" value={gunluk} onChange={setGunluk} />
        </div>
        <label className="date-calc-check">
          <input type="checkbox" checked={vitir} onChange={(event) => setVitir(event.target.checked)} />
          Vitir namazı dahil (Hanefî mezhebinde vâcip)
        </label>
      </div>

      {r ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Kaza namazı borcu</span>
            <strong>{fmt(r.vakit)} vakit</strong>
            <em>
              {fmt(r.gun)} gün · {fmt(r.rekat)} rekât
            </em>
          </div>
          <div className="date-calc-stat">
            <span>Bitiş süresi</span>
            <strong>{fmt(r.bitisGun)} gün</strong>
            <em>
              günde {fmt(sayi(gunluk))} vakit ile, yaklaşık {fmt(r.bitisGun / 365, 1)} yıl
            </em>
          </div>
          <div className="date-calc-stat">
            <span>Her vakitten</span>
            <strong>{fmt(r.gun)} adet</strong>
            <em>sabah, öğle, ikindi, akşam, yatsı{vitir ? ", vitir" : ""}</em>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">Geçerli bir süre ya da tarih aralığı ve günde en az 1 vakit girin.</p>
      )}
    </div>
  );
}

/* ---------------- Hatim ---------------- */

export function HatimHesaplama() {
  const [gun, setGun] = useState("30");
  const [okunan, setOkunan] = useState("0");
  const [hatim, setHatim] = useState("1");
  const [dakika, setDakika] = useState("2");
  const [kisi, setKisi] = useState("7");
  const plan = hatimPlani(sayi(gun), sayi0(okunan), sayi(hatim));
  const sure = plan ? okumaSuresiDakika(plan.gunlukSayfa, sayi(dakika)) : Number.NaN;
  const toplamSure = okumaSuresiDakika(MUSHAF_SAYFA, sayi(dakika));
  const dagitim = hatimDagit(sayi(kisi));

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-chips" aria-label="Süre seç">
          {[7, 15, 30, 40, 60, 90].map((g) => (
            <button key={g} type="button" onClick={() => setGun(String(g))}>
              {g} gün
            </button>
          ))}
        </div>
        <div className="date-calc-fields is-amounts">
          <Field label="Kaç günde" value={gun} onChange={setGun} />
          <Field label="Okunan sayfa" value={okunan} onChange={setOkunan} />
          <Field label="Hatim sayısı" value={hatim} onChange={setHatim} />
          <Field label="Bir sayfa okuma süresi" suffix="dakika" value={dakika} onChange={setDakika} />
        </div>
      </div>

      {plan ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Günde okunacak</span>
            <strong>{fmt(plan.gunlukSayfa)} sayfa</strong>
            <em>
              yaklaşık {fmt(plan.gunlukCuz, 2)} cüz · vakit başına {fmt(plan.vakitBasinaSayfa)} sayfa
            </em>
          </div>
          <div className="date-calc-stat">
            <span>Günlük okuma süresi</span>
            <strong>{Number.isFinite(sure) ? `${fmt(sure)} dakika` : "—"}</strong>
          </div>
          <div className="date-calc-stat">
            <span>Bir hatmin süresi</span>
            <strong>{Number.isFinite(toplamSure) ? `${fmt(toplamSure / 60, 1)} saat` : "—"}</strong>
            <em>{MUSHAF_SAYFA} sayfa</em>
          </div>
          <div className="date-calc-stat">
            <span>Kalan</span>
            <strong>{fmt(plan.kalanSayfa)} sayfa</strong>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">Gün sayısı 1 ya da daha fazla olmalı; okunan sayfa toplam sayfadan az olmalı.</p>
      )}

      <div className="date-calc-input">
        <strong className="date-calc-input-title">Grup hatmi: cüzleri kişilere dağıt</strong>
        <div className="date-calc-fields">
          <Field label="Kişi sayısı" suffix={`1–${CUZ_SAYISI}`} value={kisi} onChange={setKisi} />
        </div>
      </div>
      {dagitim.length > 0 && (
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Kişi</th>
                <th scope="col">Cüzler</th>
                <th scope="col">Cüz sayısı</th>
              </tr>
            </thead>
            <tbody>
              {dagitim.map((p) => (
                <tr key={p.kisi}>
                  <td>{p.kisi}. kişi</td>
                  <td>{p.ilkCuz === p.sonCuz ? `${p.ilkCuz}. cüz` : `${p.ilkCuz}–${p.sonCuz}. cüzler`}</td>
                  <td>{p.cuzSayisi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ---------------- Kıble ---------------- */

const sortedProvinces = [...turkeyProvinces].sort((a, b) => a.name.localeCompare(b.name, "tr"));

const SABIT_TARIH = new Date(Date.UTC(2026, 9, 1));

type PusulaDurumu = "kapali" | "bekliyor" | "acik" | "desteklenmiyor" | "izin-yok";

type IosOrientationEvent = DeviceOrientationEvent & { webkitCompassHeading?: number; webkitCompassAccuracy?: number };
type OrientationPermission = { requestPermission?: () => Promise<"granted" | "denied"> };

/** Telefonun baktığı yön (manyetik kuzeyden saat yönünde) ya da null. */
function manyetikYon(event: IosOrientationEvent): number | null {
  if (typeof event.webkitCompassHeading === "number") return event.webkitCompassHeading;
  if (event.absolute && typeof event.alpha === "number") {
    const ekran = typeof screen !== "undefined" && screen.orientation ? screen.orientation.angle : 0;
    return (360 - event.alpha + ekran + 360) % 360;
  }
  return null;
}

export function KibleHesaplama() {
  const [il, setIl] = useState(34);
  const [konum, setKonum] = useState<{ lat: number; lon: number } | null>(null);
  const [durum, setDurum] = useState<string | null>(null);
  const [pusula, setPusula] = useState<PusulaDurumu>("kapali");
  const [yon, setYon] = useState<number | null>(null);
  const p = turkeyProvinces[il - 1];
  const nokta = konum ?? { lat: p.lat, lon: p.lon };
  const aci = kibleAcisi(nokta.lat, nokta.lon);
  // Sunucu ve ilk istemci çizimi aynı sabit tarihle hesaplar (hydration
  // uyumu); sayfa açılınca bugünün tarihine geçilir.
  const [simdi, setSimdi] = useState<Date>(SABIT_TARIH);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setSimdi(new Date()));
    return () => cancelAnimationFrame(frame);
  }, []);
  const sapma = manyetikSapma(nokta.lat, nokta.lon, simdi);
  const pusulaAcisi = pusulaKibleAcisi(nokta.lat, nokta.lon, simdi);

  useEffect(() => {
    if (pusula !== "acik" && pusula !== "bekliyor") return;
    const dinle = (event: Event) => {
      const m = manyetikYon(event as IosOrientationEvent);
      if (m === null) return;
      setYon(m);
      setPusula("acik");
    };
    const olay = "ondeviceorientationabsolute" in window ? "deviceorientationabsolute" : "deviceorientation";
    window.addEventListener(olay, dinle);
    const zaman = window.setTimeout(() => setPusula((d) => (d === "bekliyor" ? "desteklenmiyor" : d)), 3000);
    return () => {
      window.removeEventListener(olay, dinle);
      window.clearTimeout(zaman);
    };
  }, [pusula]);

  // Kıble ile telefonun gerçek yönü arasındaki fark (−180…180).
  const gercekYon = yon === null ? null : (yon + sapma + 360) % 360;
  const fark = gercekYon === null ? null : ((aci - gercekYon + 540) % 360) - 180;
  const hizali = fark !== null && Math.abs(fark) <= 3;

  useEffect(() => {
    if (hizali && "vibrate" in navigator) navigator.vibrate(60);
  }, [hizali]);

  const pusulaBaslat = async () => {
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) {
      setPusula("desteklenmiyor");
      return;
    }
    const izin = (DeviceOrientationEvent as unknown as OrientationPermission).requestPermission;
    if (izin) {
      try {
        if ((await izin()) !== "granted") {
          setPusula("izin-yok");
          return;
        }
      } catch {
        setPusula("izin-yok");
        return;
      }
    }
    setPusula("bekliyor");
  };

  const konumAl = () => {
    if (!("geolocation" in navigator)) {
      setDurum("Tarayıcınız konum özelliğini desteklemiyor.");
      return;
    }
    setDurum("Konum alınıyor…");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setKonum({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setDurum(null);
      },
      () => setDurum("Konum izni verilmedi; il seçerek devam edebilirsiniz."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Canlı pusulada ok, ekranın üstü telefonun baktığı yön olacak şekilde döner.
  const okAcisi = fark !== null ? fark : aci;
  const harfDonus = gercekYon !== null ? -gercekYon : 0;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>İl</span>
            <select
              value={il}
              onChange={(event) => {
                setIl(Number(event.target.value));
                setKonum(null);
              }}
            >
              {sortedProvinces.map((x) => (
                <option key={x.plate} value={x.plate}>
                  {x.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="date-calc-chips">
          <button type="button" onClick={konumAl}>
            Konumumu kullan
          </button>
          <button type="button" onClick={pusulaBaslat}>
            {pusula === "acik" ? "Canlı pusula açık" : "Canlı pusulayı başlat"}
          </button>
        </div>
        {durum && <p className="zins-ziel-ergebnis">{durum}</p>}
        {pusula === "desteklenmiyor" && (
          <p className="zins-ziel-ergebnis">Bu cihazda yön sensörü bulunamadı. Canlı pusula telefon ve tabletlerde çalışır.</p>
        )}
        {pusula === "izin-yok" && <p className="zins-ziel-ergebnis">Pusula için hareket ve yön izni gerekiyor; tarayıcı ayarlarından izin verebilirsiniz.</p>}
      </div>

      <div className={`kible-sonuc${hizali ? " is-hizali" : ""}`}>
        <svg viewBox="-110 -110 220 220" className="kible-pusula" role="img" aria-label={`Kıble ${fmt(aci, 1)} derece`}>
          <circle r="100" className="kible-daire" />
          <g transform={`rotate(${harfDonus})`}>
            {["K", "D", "G", "B"].map((h, i) => {
              const x = Math.sin((i * Math.PI) / 2) * 84;
              const y = -Math.cos((i * Math.PI) / 2) * 84;
              // Harf, pusula dönse de dik kalsın diye kendi merkezinde ters döndürülür.
              return (
                <text key={h} x={x} y={y + 5} textAnchor="middle" className="kible-harf" transform={`rotate(${-harfDonus} ${x} ${y})`}>
                  {h}
                </text>
              );
            })}
          </g>
          <g transform={`rotate(${okAcisi})`}>
            <line x1="0" y1="12" x2="0" y2="-72" className="kible-ok" />
            <polygon points="0,-88 -9,-66 9,-66" className="kible-uc" />
          </g>
          <circle r="5" className="kible-merkez" />
        </svg>
        <div className="date-calc-results">
          {fark !== null ? (
            <div className="date-calc-stat is-main">
              <span>Canlı pusula</span>
              <strong>{hizali ? "Kıbleye dönüksünüz" : fark > 0 ? `${fmt(fark)}° sağa dönün` : `${fmt(-fark)}° sola dönün`}</strong>
              <em>Telefonu yere paralel tutun; metal eşyalardan ve mıknatıslardan uzak durun.</em>
            </div>
          ) : (
            <div className="date-calc-stat is-main">
              <span>{konum ? "Bulunduğunuz konumdan" : `${p.name} il merkezinden`} kıble</span>
              <strong>{fmt(aci, 1)}°</strong>
              <em>gerçek (coğrafi) kuzeyden saat yönünde · {yonAdi(aci)}</em>
            </div>
          )}
          <div className="date-calc-stat">
            <span>Pusula ile kıble açısı</span>
            <strong>{fmt(pusulaAcisi, 1)}°</strong>
            <em>manyetik kuzeyden; sapma {sapma >= 0 ? "+" : ""}{fmt(sapma, 1)}° (WMM2025)</em>
          </div>
          <div className="date-calc-stat">
            <span>Kâbe'ye uzaklık</span>
            <strong>{fmt(kabeMesafesi(nokta.lat, nokta.lon))} km</strong>
            <em>kuş uçuşu</em>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Zekât ---------------- */

export function ZekatHesaplama() {
  const [altinFiyat, setAltinFiyat] = useState("");
  const [nakit, setNakit] = useState("");
  const [banka, setBanka] = useState("");
  const [doviz, setDoviz] = useState("");
  const [ticari, setTicari] = useState("");
  const [alacak, setAlacak] = useState("");
  const [borc, setBorc] = useState("");
  const [altinGram, setAltinGram] = useState("");
  const [ayar, setAyar] = useState("22");
  const [mod, setMod] = useState<"varlik" | "maas">("varlik");
  const [mevcut, setMevcut] = useState("");
  const [aylik, setAylik] = useState("");
  const m = maasZekat(sayi0(mevcut), sayi0(aylik), sayi(altinFiyat));
  const r = zekatHesapla({
    nakit: sayi0(nakit),
    banka: sayi0(banka),
    doviz: sayi0(doviz),
    ticariMal: sayi0(ticari),
    alacak: sayi0(alacak),
    borc: sayi0(borc),
    altinGram: sayi0(altinGram),
    altinAyar: sayi(ayar),
    altinGramFiyati: sayi(altinFiyat),
  });

  return (
    <div className="date-calc">
      <Modes
        label="Zekât hesabı türü"
        value={mod}
        onChange={setMod}
        options={[
          ["varlik", "Varlıklarım"],
          ["maas", "Maaştan biriken (aylık plan)"],
        ]}
      />
      <div className="date-calc-input">
        <strong className="date-calc-input-title">Güncel has altın gram fiyatı (24 ayar) – nisabı hesaplamak için gerekli</strong>
        <div className="date-calc-fields">
          <Field label="Has altın gram fiyatı" suffix="TL" value={altinFiyat} onChange={setAltinFiyat} />
        </div>
        {mod === "maas" ? (
          <>
            <strong className="date-calc-input-title">Birikim (TL)</strong>
            <div className="date-calc-fields is-amounts">
              <Field label="Şu anki birikim" value={mevcut} onChange={setMevcut} />
              <Field label="Maaştan ayda biriken" value={aylik} onChange={setAylik} />
            </div>
          </>
        ) : (
          <>
            <strong className="date-calc-input-title">Varlıklarınız (TL)</strong>
            <div className="date-calc-fields is-amounts">
              <Field label="Nakit" value={nakit} onChange={setNakit} />
              <Field label="Banka mevduatı" value={banka} onChange={setBanka} />
              <Field label="Döviz (TL karşılığı)" value={doviz} onChange={setDoviz} />
              <Field label="Ticari mal" value={ticari} onChange={setTicari} />
              <Field label="Tahsili umulan alacak" value={alacak} onChange={setAlacak} />
              <Field label="Borçlar (düşülür)" value={borc} onChange={setBorc} />
            </div>
            <strong className="date-calc-input-title">Altın</strong>
            <div className="date-calc-fields">
              <Field label="Altın" suffix="gram" value={altinGram} onChange={setAltinGram} />
              <label className="date-calc-field">
                <span>Ayar</span>
                <select value={ayar} onChange={(event) => setAyar(event.target.value)}>
                  {["24", "22", "18", "14"].map((a) => (
                    <option key={a} value={a}>
                      {a} ayar
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </>
        )}
      </div>

      {mod === "maas" ? (
        m ? (
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>{m.nisapUstunde ? "Aylık zekât taksiti" : "Nisaba ulaşmıyor"}</span>
              <strong>{tl(m.aylikTaksit)}</strong>
              <em>{m.nisapUstunde ? `yıllık ${tl(m.zekat)} ÷ 12` : "yıl sonunda zekât gerekmez"}</em>
            </div>
            <div className="date-calc-stat">
              <span>Yıl sonunda tahmini birikim</span>
              <strong>{tl(m.yilSonuBirikim)}</strong>
              <em>şu anki birikim + 12 × aylık birikim</em>
            </div>
            <div className="date-calc-stat">
              <span>Nisap ({fmt(NISAP_ALTIN_GRAM, 2)} g altın)</span>
              <strong>{tl(m.nisapDegeri)}</strong>
            </div>
            <p className="date-calc-note">Taksitler peşin ödenen zekâttır: yıl dolunca elinizdeki gerçek tutarla yeniden hesaplayıp eksik kalanı tamamlayın.</p>
          </div>
        ) : (
          <p className="date-calc-note">Önce has altının güncel gram fiyatını yazın; nisap bu fiyatla hesaplanır.</p>
        )
      ) : r ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>{r.nisapUstunde ? "Verilecek zekât" : "Nisaba ulaşmıyor"}</span>
            <strong>{tl(r.zekat)}</strong>
            <em>{r.nisapUstunde ? "net varlığın kırkta biri (%2,5)" : "zekât gerekmez"}</em>
          </div>
          <div className="date-calc-stat">
            <span>Net zekâta tabi varlık</span>
            <strong>{tl(r.netVarlik)}</strong>
          </div>
          <div className="date-calc-stat">
            <span>Nisap ({fmt(NISAP_ALTIN_GRAM, 2)} g altın)</span>
            <strong>{tl(r.nisapDegeri)}</strong>
          </div>
          <div className="date-calc-stat">
            <span>Altının değeri</span>
            <strong>{tl(r.altinDegeri)}</strong>
            <em>{fmt(r.safAltinGram, 2)} g has altın</em>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">Önce has altının güncel gram fiyatını yazın; nisap bu fiyatla hesaplanır.</p>
      )}
    </div>
  );
}

/* ---------------- Hicri yaş ---------------- */

export function HicriYasHesaplama() {
  const [dogum, setDogum] = useState("1995-06-15");
  const [bugun, setBugun] = useState<YMD | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setBugun(todayIstanbul()));
    return () => cancelAnimationFrame(frame);
  }, []);
  const d = parseYmd(dogum);
  const r = d && bugun ? hisabUmr(d, bugun) : null;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="Doğum tarihi" type="date" value={dogum} onChange={setDogum} />
        </div>
      </div>
      {r ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Hicri yaşınız</span>
            <strong>
              {r.hijri.years} yaş, {r.hijri.months} ay, {r.hijri.days} gün
            </strong>
            <em>
              Miladi yaşınız {r.miladi.years} yaş, {r.miladi.months} ay, {r.miladi.days} gün
            </em>
          </div>
          <div className="date-calc-stat">
            <span>Hicri doğum tarihiniz</span>
            <strong>
              {r.miladHijri.day} {HIJRI_MONTHS_TR[r.miladHijri.month - 1]} {r.miladHijri.year}
            </strong>
          </div>
          <div className="date-calc-stat">
            <span>Sonraki Hicri doğum gününüz</span>
            <strong>{ymdText(r.qadimHijri.tarikh)}</strong>
            <em>{r.qadimHijri.umr} yaşına girersiniz</em>
          </div>
          <div className="date-calc-stat">
            <span>Yaşadığınız gün</span>
            <strong>{fmt(r.ayyam)} gün</strong>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">{bugun ? "Bugünden önceki geçerli bir doğum tarihi girin." : "Hesaplanıyor…"}</p>
      )}
      {bugun && <p className="date-calc-note">Bugün: {ymdIso(bugun) && ymdText(bugun)} (Türkiye saati)</p>}
    </div>
  );
}

/* ---------------- Kurban hissesi ---------------- */

export function KurbanHissesiHesaplama() {
  const [fiyat, setFiyat] = useState("");
  const [masraf, setMasraf] = useState("");
  const [hisse, setHisse] = useState("7");
  const [et, setEt] = useState("");
  const r = kurbanHissesi(sayi(fiyat), sayi0(masraf), sayi(hisse), et.trim() ? sayi(et) : undefined);

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-chips" aria-label="Hisse sayısı">
          {Array.from({ length: BUYUKBAS_MAX_HISSE }, (_, i) => i + 1).map((h) => (
            <button key={h} type="button" onClick={() => setHisse(String(h))}>
              {h} hisse
            </button>
          ))}
        </div>
        <div className="date-calc-fields is-amounts">
          <Field label="Hayvanın bedeli" suffix="TL" value={fiyat} onChange={setFiyat} />
          <Field label="Kesim, bakım, nakliye" suffix="TL" value={masraf} onChange={setMasraf} />
          <Field label="Hisse sayısı" suffix={`en çok ${BUYUKBAS_MAX_HISSE}`} value={hisse} onChange={setHisse} />
          <Field label="Toplam et (isteğe bağlı)" suffix="kg" value={et} onChange={setEt} />
        </div>
      </div>
      {r ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Hisse başına</span>
            <strong>{tl(r.hisseBasiTutar)}</strong>
            <em>toplam {tl(r.toplamTutar)} ÷ {fmt(sayi(hisse))} hisse</em>
          </div>
          {r.hisseBasiEt !== null && (
            <div className="date-calc-stat">
              <span>Hisse başına et</span>
              <strong>{fmt(r.hisseBasiEt, 1)} kg</strong>
              <em>eşit paylaştırma</em>
            </div>
          )}
        </div>
      ) : (
        <p className="date-calc-note">Hayvanın bedelini girin; büyükbaşta hisse sayısı 1 ile {BUYUKBAS_MAX_HISSE} arasında olmalı.</p>
      )}
    </div>
  );
}
