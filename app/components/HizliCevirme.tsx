"use client";

// Ana sayfadaki hızlı çeviri kartları: her kartta tek çevirici, büyük sonuç, yer değiştirme ve kopyalama düğmesi.
// Dişli düğmesiyle kart başka bir türe (döviz ya da herhangi bir birim kategorisi) çevrilir; seçim tarayıcıda saklanır.
// İlk görünüm sunucuda örnek değerlerle derlenir, yani sonuçlar sayfa açılır açılmaz görünür.
import { useEffect, useState } from "react";
import Link from "@/app/components/SiteLink";
import type { HizliVeri } from "../converter/hizliCevirmeVeri";
import { birimCevir } from "../converter/hizliCevir";

type Kart = { tur: string; from: string; to: string; deger: string };

const DOVIZ = "doviz";
const SAKLAMA = "hizliKartlar.v1";
const VARSAYILAN: Kart[] = [
  { tur: DOVIZ, from: "USD", to: "TRY", deger: "1" },
  { tur: "uzunluk", from: "in", to: "cm", deger: "1" },
  { tur: "sicaklik", from: "C", to: "F", deger: "30" },
];
const YEDEK: Kart = { tur: "kutle", from: "kg", to: "lb", deger: "1" };

const sayiOku = (s: string) => Number(s.replace(/\s/g, "").replace(",", "."));

function bicimle(x: number) {
  if (!Number.isFinite(x)) return "—";
  if (x !== 0 && (Math.abs(x) >= 1e12 || Math.abs(x) < 1e-6)) return x.toExponential(4).replace(".", ",");
  return Number(x.toPrecision(7)).toLocaleString("tr-TR", { maximumFractionDigits: 10 });
}

/** Kartı veriye göre doğrular; bulunamayan tür ya da birimi geçerli bir varsayılanla değiştirir. */
function duzelt(k: Kart, veri: HizliVeri): Kart {
  if (k.tur === DOVIZ) {
    if (!veri.doviz) return duzelt(YEDEK, veri);
    const kodlar = Object.keys(veri.doviz.kurlar);
    return { ...k, from: kodlar.includes(k.from) ? k.from : "USD", to: kodlar.includes(k.to) ? k.to : "TRY" };
  }
  const kat = veri.kategoriler.find((c) => c.key === k.tur) ?? veri.kategoriler[0];
  const var_ = (s: string) => kat.birimler.some((b) => b.s === s);
  return {
    ...k,
    tur: kat.key,
    from: var_(k.from) ? k.from : kat.birimler[0].s,
    to: var_(k.to) ? k.to : kat.birimler[1].s,
  };
}

function Ikon({ ad }: { ad: "degistir" | "kopyala" }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {ad === "degistir" ? (
        <path d="M4 8h14m0 0-3-3m3 3-3 3M20 16H6m0 0 3-3m-3 3 3 3" />
      ) : (
        <path d="M9 9h10v11H9zM5 15H4V4h11v1" />
      )}
    </svg>
  );
}

function HizliKart({ kart, veri, degis }: { kart: Kart; veri: HizliVeri; degis: (k: Kart) => void }) {
  const [kopyalandi, setKopyalandi] = useState(false);
  const doviz = kart.tur === DOVIZ && veri.doviz ? veri.doviz : null;
  const kat = doviz ? null : veri.kategoriler.find((c) => c.key === kart.tur)!;
  const v = sayiOku(kart.deger);
  const gecerli = kart.deger.trim() !== "" && Number.isFinite(v);

  let sonuc = NaN;
  let hedefSimge = kart.to;
  let secenekler: Array<{ deger: string; ad: string }>;
  if (doviz) {
    sonuc = gecerli ? (v / doviz.kurlar[kart.from]) * doviz.kurlar[kart.to] : NaN;
    secenekler = Object.keys(doviz.kurlar).map((c) => ({ deger: c, ad: `${doviz.adlar[c]} (${c})` }));
  } else {
    const from = kat!.birimler.find((b) => b.s === kart.from)!;
    const to = kat!.birimler.find((b) => b.s === kart.to)!;
    sonuc = gecerli ? birimCevir(kat!, v, from, to) : NaN;
    hedefSimge = to.d ?? to.s;
    secenekler = kat!.birimler.map((b) => ({ deger: b.s, ad: `${b.n} (${b.d ?? b.s})` }));
  }
  const sonucMetni = `${bicimle(sonuc)} ${hedefSimge}`;

  const kopyala = async () => {
    try {
      await navigator.clipboard.writeText(bicimle(sonuc));
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 1500);
    } catch {
      /* pano izni yoksa sessizce geç */
    }
  };

  return (
    <div className="hizli-kart">
      <label className="hizli-kart-baslik hizli-tur">
        <span className="gorunmez">Kart türü</span>
        <select
          value={kart.tur}
          onChange={(e) => degis(duzelt({ tur: e.target.value, from: "", to: "", deger: "1" }, veri))}
        >
          {veri.doviz ? <option value={DOVIZ}>Döviz</option> : null}
          {veri.kategoriler.map((c) => (
            <option key={c.key} value={c.key}>
              {c.ad}
            </option>
          ))}
        </select>
      </label>
      <label className="hizli-alan">
        <span>Değer</span>
        <input type="text" inputMode="decimal" value={kart.deger} onChange={(e) => degis({ ...kart, deger: e.target.value })} />
      </label>
      <div className="hizli-birimler">
        <label className="hizli-alan">
          <span>Kimden</span>
          <select value={kart.from} onChange={(e) => degis({ ...kart, from: e.target.value })}>
            {secenekler.map((o) => (
              <option key={o.deger} value={o.deger}>
                {o.ad}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="hizli-ikon" aria-label="Birimlerin yerini değiştir" onClick={() => degis({ ...kart, from: kart.to, to: kart.from })}>
          <Ikon ad="degistir" />
        </button>
        <label className="hizli-alan">
          <span>Kime</span>
          <select value={kart.to} onChange={(e) => degis({ ...kart, to: e.target.value })}>
            {secenekler.map((o) => (
              <option key={o.deger} value={o.deger}>
                {o.ad}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="hizli-sonuc" aria-live="polite">
        <button type="button" className="hizli-ikon" aria-label="Sonucu kopyala" onClick={kopyala} disabled={!Number.isFinite(sonuc)}>
          <Ikon ad="kopyala" />
        </button>
        <strong>{kopyalandi ? "Kopyalandı" : sonucMetni}</strong>
      </div>
      <p className="hizli-alt">
        {doviz ? (
          <>
            <span>
              Kur: {new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Istanbul" }).format(doviz.tarih * 1000)}
            </span>
            <Link href="/doviz-cevirici">Döviz çevirici</Link>
          </>
        ) : (
          <Link href={kat!.href}>Tüm {kat!.ad.toLocaleLowerCase("tr")} dönüşümleri</Link>
        )}
      </p>
    </div>
  );
}

export default function HizliCevirme({ veri }: { veri: HizliVeri }) {
  const [kartlar, setKartlar] = useState<Kart[]>(() => VARSAYILAN.map((k) => duzelt(k, veri)));

  // Kullanıcının daha önce seçtiği kart türleri (yalnızca bu tarayıcıda).
  useEffect(() => {
    try {
      const kayit = JSON.parse(localStorage.getItem(SAKLAMA) ?? "null") as Kart[] | null;
      if (Array.isArray(kayit) && kayit.length === 3) setKartlar(kayit.map((k) => duzelt({ ...k, deger: k.deger ?? "1" }, veri))); // eslint-disable-line react-hooks/set-state-in-effect
    } catch {
      /* depolama kapalıysa varsayılan kartlar kalır */
    }
  }, [veri]);

  const degis = (i: number, k: Kart) =>
    setKartlar((eski) => {
      const yeni = eski.map((x, j) => (j === i ? k : x));
      try {
        localStorage.setItem(SAKLAMA, JSON.stringify(yeni));
      } catch {
        /* depolama kapalı */
      }
      return yeni;
    });

  return (
    <section className="hizli-cevirme" aria-labelledby="hizli-cevirme-baslik">
      <div className="hizli-cevirme-ust">
        <h2 id="hizli-cevirme-baslik">Hızlı çeviri</h2>
        <p>Değeri yazın, sonuç anında çıksın. Kartın başlığından türünü değiştirin: döviz ya da {veri.kategoriler.length} birim türünden biri.</p>
      </div>
      <div className="hizli-kartlar">
        {kartlar.map((k, i) => (
          <HizliKart key={i} kart={k} veri={veri} degis={(yeni) => degis(i, yeni)} />
        ))}
      </div>
    </section>
  );
}
