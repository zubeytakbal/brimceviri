"use client";

// Ana sayfadaki "Mühendislik ve bilim" kartları. Her kartın başlığındaki listeden araç seçilir (menüdeki Mühendislik ve
// Bilim başlıklarının sık kullanılan hesapları); seçim tarayıcıda saklanır. Her kart ilgili aracın tam sayfasına bağlanır
// ve hesaplar tam sayfalardakiyle aynıdır.
import { useEffect, useState, type ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import { betonHacmi, demirKg, ebobEkok, kvaKw, kwAmper } from "../converter/hizliCevir";

export type KartMalzeme = { id: string; ad: string; yogunluk: number };
export type KartGezegen = { id: string; ad: string; oran: number };

type Arac = "beton" | "kw-amper" | "litre-kilo" | "kva-kw" | "ohm" | "demir" | "yuzde" | "ebob" | "pisagor" | "gezegen";

const ARACLAR: Array<{ id: Arac; ad: string }> = [
  { id: "beton", ad: "Beton hesaplama" },
  { id: "kw-amper", ad: "kW → Amper" },
  { id: "litre-kilo", ad: "Litre kaç kilo?" },
  { id: "kva-kw", ad: "kVA → kW" },
  { id: "ohm", ad: "Ohm kanunu" },
  { id: "demir", ad: "İnşaat demiri ağırlığı" },
  { id: "yuzde", ad: "Yüzde hesaplama" },
  { id: "ebob", ad: "EBOB – EKOK" },
  { id: "pisagor", ad: "Pisagor teoremi" },
  { id: "gezegen", ad: "Gezegenlerde kaç kilo?" },
];
const VARSAYILAN: Arac[] = ["beton", "kw-amper", "litre-kilo"];
const SAKLAMA = "muhendislikKartlari.v1";

const sayiOku = (s: string) => Number(s.replace(/\s/g, "").replace(",", "."));
const bicim = (x: number, basamak = 2) => (Number.isFinite(x) ? x.toLocaleString("tr-TR", { maximumFractionDigits: basamak }) : "—");

function Alan({ etiket, deger, degis, birim }: { etiket: string; deger: string; degis: (v: string) => void; birim?: string }) {
  return (
    <label className="hizli-alan">
      <span>
        {etiket}
        {birim ? ` (${birim})` : ""}
      </span>
      <input type="text" inputMode="decimal" value={deger} onChange={(e) => degis(e.target.value)} />
    </label>
  );
}

function Sonuc({ metin }: { metin: string }) {
  return (
    <div className="hizli-sonuc" aria-live="polite">
      <strong>{metin}</strong>
    </div>
  );
}

function Alt({ not, href, etiket }: { not?: ReactNode; href: string; etiket: string }) {
  return (
    <p className="hizli-alt">
      <span>{not}</span>
      <Link href={href}>{etiket}</Link>
    </p>
  );
}

function Beton() {
  const [en, setEn] = useState("5");
  const [boy, setBoy] = useState("4");
  const [kal, setKal] = useState("15");
  return (
    <>
      <div className="hizli-ikili">
        <Alan etiket="En" birim="m" deger={en} degis={setEn} />
        <Alan etiket="Boy" birim="m" deger={boy} degis={setBoy} />
      </div>
      <Alan etiket="Kalınlık" birim="cm" deger={kal} degis={setKal} />
      <Sonuc metin={`${bicim(betonHacmi(sayiOku(en), sayiOku(boy), sayiOku(kal), 5))} m³`} />
      <Alt not="%5 fire dahil" href="/beton-hesaplama" etiket="Beton hesaplama" />
    </>
  );
}

function KwAmper() {
  const [kw, setKw] = useState("5,5");
  const [sistem, setSistem] = useState("400-3");
  const [cos, setCos] = useState("0,9");
  const [volt, faz] = sistem.split("-");
  return (
    <>
      <Alan etiket="Güç" birim="kW" deger={kw} degis={setKw} />
      <div className="hizli-ikili">
        <label className="hizli-alan">
          <span>Şebeke</span>
          <select value={sistem} onChange={(e) => setSistem(e.target.value)}>
            <option value="230-1">230 V tek faz</option>
            <option value="400-3">400 V üç faz</option>
          </select>
        </label>
        <Alan etiket="cos φ" deger={cos} degis={setCos} />
      </div>
      <Sonuc metin={`${bicim(kwAmper(sayiOku(kw), Number(volt), faz === "3", sayiOku(cos)))} A`} />
      <Alt not="Verim %100 kabul edilir" href="/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama" etiket="kW to amper" />
    </>
  );
}

function LitreKilo({ malzemeler }: { malzemeler: KartMalzeme[] }) {
  const [id, setId] = useState(malzemeler.some((m) => m.id === "pekmez") ? "pekmez" : malzemeler[0].id);
  const [litre, setLitre] = useState("1");
  const m = malzemeler.find((x) => x.id === id)!;
  return (
    <>
      <label className="hizli-alan">
        <span>Malzeme</span>
        <select value={id} onChange={(e) => setId(e.target.value)}>
          {malzemeler.map((x) => (
            <option key={x.id} value={x.id}>
              {x.ad}
            </option>
          ))}
        </select>
      </label>
      <Alan etiket="Hacim" birim="litre" deger={litre} degis={setLitre} />
      <Sonuc metin={`${bicim((sayiOku(litre) / 1000) * m.yogunluk, 3)} kg`} />
      <Alt not={`Yoğunluk ${bicim(m.yogunluk, 0)} kg/m³`} href={`/malzeme-ozellikleri/${m.id}`} etiket={`${m.ad} özellikleri`} />
    </>
  );
}

function KvaKw() {
  const [kva, setKva] = useState("100");
  const [cos, setCos] = useState("0,8");
  return (
    <>
      <Alan etiket="Görünür güç" birim="kVA" deger={kva} degis={setKva} />
      <Alan etiket="Güç faktörü (cos φ)" deger={cos} degis={setCos} />
      <Sonuc metin={`${bicim(kvaKw(sayiOku(kva), sayiOku(cos)))} kW`} />
      <Alt not="kW = kVA × cos φ" href="/kva-kw-hesaplama" etiket="kVA kW hesaplama" />
    </>
  );
}

function Ohm() {
  const [bul, setBul] = useState<"V" | "I" | "R">("V");
  const [a, setA] = useState("2");
  const [b, setB] = useState("110");
  const x = sayiOku(a);
  const y = sayiOku(b);
  const alanlar = { V: ["Akım", "A", "Direnç", "Ω"], I: ["Gerilim", "V", "Direnç", "Ω"], R: ["Gerilim", "V", "Akım", "A"] }[bul];
  const sonuc = bul === "V" ? `${bicim(x * y)} V` : bul === "I" ? `${bicim(x / y, 4)} A` : `${bicim(x / y, 3)} Ω`;
  return (
    <>
      <label className="hizli-alan">
        <span>Bulunacak</span>
        <select value={bul} onChange={(e) => setBul(e.target.value as "V" | "I" | "R")}>
          <option value="V">Gerilim (V = I × R)</option>
          <option value="I">Akım (I = V / R)</option>
          <option value="R">Direnç (R = V / I)</option>
        </select>
      </label>
      <div className="hizli-ikili">
        <Alan etiket={alanlar[0]} birim={alanlar[1]} deger={a} degis={setA} />
        <Alan etiket={alanlar[2]} birim={alanlar[3]} deger={b} degis={setB} />
      </div>
      <Sonuc metin={sonuc} />
      <Alt href="/muhendislik-hesaplayicilari/elektrik-hesaplari" etiket="Elektrik hesapları" />
    </>
  );
}

function Demir() {
  const [cap, setCap] = useState("12");
  const [boy, setBoy] = useState("12");
  const [adet, setAdet] = useState("10");
  return (
    <>
      <Alan etiket="Çap" birim="mm" deger={cap} degis={setCap} />
      <div className="hizli-ikili">
        <Alan etiket="Boy" birim="m" deger={boy} degis={setBoy} />
        <Alan etiket="Adet" deger={adet} degis={setAdet} />
      </div>
      <Sonuc metin={`${bicim(demirKg(sayiOku(cap), sayiOku(boy), sayiOku(adet)))} kg`} />
      <Alt not="Çelik 7850 kg/m³" href="/demir-agirlik-hesaplama" etiket="Demir ağırlığı" />
    </>
  );
}

function Yuzde() {
  const [sayi, setSayi] = useState("250");
  const [oran, setOran] = useState("18");
  const x = sayiOku(sayi);
  const p = sayiOku(oran);
  return (
    <>
      <div className="hizli-ikili">
        <Alan etiket="Sayı" deger={sayi} degis={setSayi} />
        <Alan etiket="Yüzde" birim="%" deger={oran} degis={setOran} />
      </div>
      <Sonuc metin={bicim((x * p) / 100)} />
      <p className="zaman-not">
        {bicim(x)} sayısının %{bicim(p)} kadarı. Eklenince {bicim(x * (1 + p / 100))}, çıkarılınca {bicim(x * (1 - p / 100))}.
      </p>
      <Alt href="/bilim-hesaplayicilari/matematik/yuzde-hesaplama" etiket="Yüzde hesaplama" />
    </>
  );
}

function Ebob() {
  const [a, setA] = useState("24");
  const [b, setB] = useState("36");
  const x = Math.trunc(sayiOku(a));
  const y = Math.trunc(sayiOku(b));
  const gecerli = Number.isFinite(x) && Number.isFinite(y) && x > 0 && y > 0;
  const r = gecerli ? ebobEkok(x, y) : null;
  return (
    <>
      <div className="hizli-ikili">
        <Alan etiket="1. sayı" deger={a} degis={setA} />
        <Alan etiket="2. sayı" deger={b} degis={setB} />
      </div>
      <Sonuc metin={r ? `EBOB ${bicim(r.ebob, 0)} · EKOK ${bicim(r.ekok, 0)}` : "—"} />
      <Alt not="Pozitif tam sayılar" href="/bilim-hesaplayicilari/matematik/ebob-ekok-hesaplama" etiket="EBOB – EKOK" />
    </>
  );
}

function Pisagor() {
  const [a, setA] = useState("3");
  const [b, setB] = useState("4");
  return (
    <>
      <div className="hizli-ikili">
        <Alan etiket="a kenarı" deger={a} degis={setA} />
        <Alan etiket="b kenarı" deger={b} degis={setB} />
      </div>
      <Sonuc metin={`c = ${bicim(Math.hypot(sayiOku(a), sayiOku(b)), 4)}`} />
      <Alt not="c² = a² + b²" href="/bilim-hesaplayicilari/geometri/pisagor-teoremi-hesaplama" etiket="Pisagor teoremi" />
    </>
  );
}

function Gezegen({ gezegenler }: { gezegenler: KartGezegen[] }) {
  const [kg, setKg] = useState("70");
  const [id, setId] = useState(gezegenler.some((g) => g.id === "mars") ? "mars" : gezegenler[0].id);
  const g = gezegenler.find((x) => x.id === id)!;
  return (
    <>
      <Alan etiket="Dünya'daki kilonuz" birim="kg" deger={kg} degis={setKg} />
      <label className="hizli-alan">
        <span>Gök cismi</span>
        <select value={id} onChange={(e) => setId(e.target.value)}>
          {gezegenler.map((x) => (
            <option key={x.id} value={x.id}>
              {x.ad}
            </option>
          ))}
        </select>
      </label>
      <Sonuc metin={`${bicim(sayiOku(kg) * g.oran, 1)} kg`} />
      <Alt not={`Yerçekimi Dünya'nın ${bicim(g.oran, 2)} katı`} href="/gezegenlerde-kac-kilo-gelirim" etiket="Gezegenlerde kilo" />
    </>
  );
}

function Kart({
  arac,
  degis,
  malzemeler,
  gezegenler,
}: {
  arac: Arac;
  degis: (a: Arac) => void;
  malzemeler: KartMalzeme[];
  gezegenler: KartGezegen[];
}) {
  return (
    <div className="hizli-kart">
      <label className="hizli-kart-baslik hizli-tur">
        <span className="gorunmez">Kart türü</span>
        <select value={arac} onChange={(e) => degis(e.target.value as Arac)}>
          {ARACLAR.map((a) => (
            <option key={a.id} value={a.id}>
              {a.ad}
            </option>
          ))}
        </select>
      </label>
      {arac === "beton" ? <Beton /> : null}
      {arac === "kw-amper" ? <KwAmper /> : null}
      {arac === "litre-kilo" ? <LitreKilo malzemeler={malzemeler} /> : null}
      {arac === "kva-kw" ? <KvaKw /> : null}
      {arac === "ohm" ? <Ohm /> : null}
      {arac === "demir" ? <Demir /> : null}
      {arac === "yuzde" ? <Yuzde /> : null}
      {arac === "ebob" ? <Ebob /> : null}
      {arac === "pisagor" ? <Pisagor /> : null}
      {arac === "gezegen" ? <Gezegen gezegenler={gezegenler} /> : null}
    </div>
  );
}

export default function MuhendislikKartlari({ malzemeler, gezegenler }: { malzemeler: KartMalzeme[]; gezegenler: KartGezegen[] }) {
  const [kartlar, setKartlar] = useState<Arac[]>(VARSAYILAN);

  useEffect(() => {
    try {
      const kayit = JSON.parse(localStorage.getItem(SAKLAMA) ?? "null") as Arac[] | null;
      if (Array.isArray(kayit) && kayit.length === 3 && kayit.every((k) => ARACLAR.some((a) => a.id === k))) setKartlar(kayit); // eslint-disable-line react-hooks/set-state-in-effect
    } catch {
      /* depolama kapalıysa varsayılan kartlar kalır */
    }
  }, []);

  const degis = (i: number, a: Arac) =>
    setKartlar((eski) => {
      const yeni = eski.map((x, j) => (j === i ? a : x));
      try {
        localStorage.setItem(SAKLAMA, JSON.stringify(yeni));
      } catch {
        /* depolama kapalı */
      }
      return yeni;
    });

  return (
    <section className="hizli-cevirme" aria-labelledby="muhendislik-kartlari-baslik">
      <div className="hizli-cevirme-ust">
        <h2 id="muhendislik-kartlari-baslik">Mühendislik ve bilim</h2>
        <p>Kartın başlığından hesabı seçin: beton, elektrik, demir ağırlığı, yüzde, EBOB–EKOK, Pisagor ve daha fazlası.</p>
      </div>
      <div className="hizli-kartlar">
        {kartlar.map((a, i) => (
          <Kart key={i} arac={a} degis={(yeni) => degis(i, yeni)} malzemeler={malzemeler} gezegenler={gezegenler} />
        ))}
      </div>
    </section>
  );
}
