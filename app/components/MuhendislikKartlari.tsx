"use client";

// Ana sayfadaki "Mühendislik ve bilim" kartları. Her kartın başlığındaki listeden araç seçilir (menüdeki Mühendislik ve
// Bilim başlıklarının sık kullanılan hesapları); seçim tarayıcıda saklanır. Her kart ilgili aracın tam sayfasına bağlanır
// ve hesaplar tam sayfalardakiyle aynıdır.
import { useEffect, useState, type ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import { betonHacmi, demirKg, denklem2, ebobEkok, kvaKw, kwAmper } from "../converter/hizliCevir";
import { calculateTileNeeds } from "../converter/tileCalculator";
import { calculatePaintNeeds } from "../converter/paintCalculator";
import { calculateLaminateNeeds } from "../converter/laminateCalculator";
import { calculateStairs } from "../converter/stairCalculator";
import { calculateExcavation } from "../converter/excavationCalculator";
import { calculateKerestehacmi } from "../converter/keresteCalculator";
import { calculateZoningArea } from "../converter/zoningCalculator";
import { calculateElectricityConsumption } from "../converter/electricityConsumptionCalculator";
import { calculateWeldingCurrent, electrodeCoatingLabels, type ElectrodeCoating } from "../converter/weldingCalculator";
import { calculatePsuWattage } from "../converter/psuCalculator";
import { boltTorqueTable, calculateClampForce, type BoltGrade } from "../converter/boltTorque";
import { calculatePipeFlow } from "../converter/pipeFlowCalculator";
import { calculatePressureLoss } from "../converter/pressureLossCalculator";
import { calculateRpmFromCuttingSpeed } from "../converter/cuttingSpeedCalculator";
import { calculateThermalExpansion, thermalExpansionTable } from "../converter/thermalExpansion";
import { calculateMassFromVolumeCm3, materialDensityTable } from "../converter/materialDensity";
import { calculateMol } from "../converter/molCalculator";
import { parseMolecularFormula } from "../converter/molecularFormulaParser";
import { calculateAverageAtomicMass } from "../converter/atomicMassCalculator";

export type KartMalzeme = { id: string; ad: string; yogunluk: number };
export type KartGezegen = { id: string; ad: string; oran: number };

type Arac =
  | "beton" | "demir" | "fayans" | "boya" | "parke" | "merdiven" | "hafriyat" | "kereste" | "emsal"
  | "kw-amper" | "kva-kw" | "ohm" | "tuketim" | "kaynak" | "psu"
  | "civata" | "boru" | "basinc" | "kesme" | "genlesme" | "malzeme" | "litre-kilo"
  | "yuzde" | "ebob" | "pisagor" | "mol" | "denklem" | "atom" | "isi" | "gezegen";

// Menüdeki Mühendislik ve Bilim başlıklarının kartta hesaplanabilen araçları, konulara göre gruplu.
const GRUPLAR: Array<{ ad: string; araclar: Array<{ id: Arac; ad: string }> }> = [
  {
    ad: "İnşaat",
    araclar: [
      { id: "beton", ad: "Beton hesaplama" },
      { id: "demir", ad: "İnşaat demiri ağırlığı" },
      { id: "fayans", ad: "Fayans hesaplama" },
      { id: "boya", ad: "Boya hesaplama" },
      { id: "parke", ad: "Parke hesaplama" },
      { id: "merdiven", ad: "Merdiven hesaplama" },
      { id: "hafriyat", ad: "Hafriyat hesaplama" },
      { id: "kereste", ad: "Kereste hesaplama" },
      { id: "emsal", ad: "Emsal (KAKS) hesaplama" },
    ],
  },
  {
    ad: "Elektrik",
    araclar: [
      { id: "kw-amper", ad: "kW → Amper" },
      { id: "kva-kw", ad: "kVA → kW" },
      { id: "ohm", ad: "Ohm kanunu" },
      { id: "tuketim", ad: "Elektrik tüketimi" },
      { id: "kaynak", ad: "Kaynak amperajı" },
      { id: "psu", ad: "PC güç kaynağı (PSU)" },
    ],
  },
  {
    ad: "Makine ve tesisat",
    araclar: [
      { id: "civata", ad: "Cıvata torku" },
      { id: "boru", ad: "Boru çapı" },
      { id: "basinc", ad: "Basınç kaybı" },
      { id: "kesme", ad: "Kesme hızı → devir" },
      { id: "genlesme", ad: "Isıl genleşme" },
      { id: "malzeme", ad: "Malzeme ağırlığı" },
      { id: "litre-kilo", ad: "Litre kaç kilo?" },
    ],
  },
  {
    ad: "Bilim ve matematik",
    araclar: [
      { id: "yuzde", ad: "Yüzde hesaplama" },
      { id: "ebob", ad: "EBOB – EKOK" },
      { id: "pisagor", ad: "Pisagor teoremi" },
      { id: "mol", ad: "Mol hesaplama" },
      { id: "denklem", ad: "2 bilinmeyenli denklem" },
      { id: "atom", ad: "Ortalama atom kütlesi" },
      { id: "isi", ad: "Isı enerjisi (Q = m·c·ΔT)" },
      { id: "gezegen", ad: "Gezegenlerde kaç kilo?" },
    ],
  },
];
const ARACLAR = GRUPLAR.flatMap((g) => g.araclar);
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

function Secim({ etiket, deger, degis, secenekler }: { etiket: string; deger: string; degis: (v: string) => void; secenekler: Array<[string, string]> }) {
  return (
    <label className="hizli-alan">
      <span>{etiket}</span>
      <select value={deger} onChange={(e) => degis(e.target.value)}>
        {secenekler.map(([v, ad]) => (
          <option key={v} value={v}>
            {ad}
          </option>
        ))}
      </select>
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
      <Alt not="V = I × R" href="/hesaplayicilar/ohm-yasasi" etiket="Ohm yasası" />
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

function Fayans() {
  const [alan, setAlan] = useState("20");
  const [en, setEn] = useState("60");
  const [boy, setBoy] = useState("60");
  const [fire, setFire] = useState("10");
  const r = calculateTileNeeds({ area: sayiOku(alan), tileWidthCm: sayiOku(en), tileHeightCm: sayiOku(boy), wastePercent: sayiOku(fire) });
  return (
    <>
      <div className="hizli-ikili">
        <Alan etiket="Alan" birim="m²" deger={alan} degis={setAlan} />
        <Alan etiket="Fire" birim="%" deger={fire} degis={setFire} />
      </div>
      <div className="hizli-ikili">
        <Alan etiket="Fayans eni" birim="cm" deger={en} degis={setEn} />
        <Alan etiket="Fayans boyu" birim="cm" deger={boy} degis={setBoy} />
      </div>
      <Sonuc metin={r ? `${bicim(r.requiredTileCount, 0)} adet` : "—"} />
      <Alt not={r ? `Fire dahil ${bicim(r.requiredAreaWithWaste)} m²` : undefined} href="/fayans-hesaplama" etiket="Fayans hesaplama" />
    </>
  );
}

function Boya() {
  const [uzunluk, setUzunluk] = useState("4");
  const [genislik, setGenislik] = useState("3,5");
  const [yukseklik, setYukseklik] = useState("2,7");
  const [kat, setKat] = useState("2");
  const r = calculatePaintNeeds({ length: sayiOku(uzunluk), width: sayiOku(genislik), height: sayiOku(yukseklik), doorCount: 1, windowCount: 1, coats: kat === "1" ? 1 : 2, coverage: 10, includeCeiling: false });
  return (
    <>
      <div className="hizli-ikili">
        <Alan etiket="Oda uzunluğu" birim="m" deger={uzunluk} degis={setUzunluk} />
        <Alan etiket="Oda genişliği" birim="m" deger={genislik} degis={setGenislik} />
      </div>
      <div className="hizli-ikili">
        <Alan etiket="Tavan yüksekliği" birim="m" deger={yukseklik} degis={setYukseklik} />
        <Secim etiket="Kat" deger={kat} degis={setKat} secenekler={[["1", "1 kat"], ["2", "2 kat"]]} />
      </div>
      <Sonuc metin={r ? `${bicim(r.litersNeeded, 1)} litre` : "—"} />
      <Alt not={r ? `${bicim(r.netWallArea, 1)} m² duvar · 1 kapı, 1 pencere düşüldü · 10 m²/L` : undefined} href="/boya-hesaplama" etiket="Boya hesaplama" />
    </>
  );
}

function Parke() {
  const [alan, setAlan] = useState("20");
  const [paket, setPaket] = useState("2,222");
  const [fire, setFire] = useState("10");
  const r = calculateLaminateNeeds({ area: sayiOku(alan), packageAreaM2: sayiOku(paket), wastePercent: sayiOku(fire) });
  return (
    <>
      <Alan etiket="Alan" birim="m²" deger={alan} degis={setAlan} />
      <div className="hizli-ikili">
        <Alan etiket="Bir paket" birim="m²" deger={paket} degis={setPaket} />
        <Alan etiket="Fire" birim="%" deger={fire} degis={setFire} />
      </div>
      <Sonuc metin={r ? `${bicim(r.requiredPackageCount, 0)} paket` : "—"} />
      <Alt not={r ? `Fire dahil ${bicim(r.requiredAreaWithWaste)} m²` : undefined} href="/parke-hesaplama" etiket="Parke hesaplama" />
    </>
  );
}

function Merdiven() {
  const [yukseklik, setYukseklik] = useState("280");
  const [riht, setRiht] = useState("17,5");
  const o = calculateStairs({ totalHeightCm: sayiOku(yukseklik), desiredRiserCm: sayiOku(riht), availableRunCm: Number.NaN });
  const r = o.success ? o.result : null;
  return (
    <>
      <div className="hizli-ikili">
        <Alan etiket="Kat yüksekliği" birim="cm" deger={yukseklik} degis={setYukseklik} />
        <Alan etiket="İstenen rıht" birim="cm" deger={riht} degis={setRiht} />
      </div>
      <Sonuc metin={r ? `${r.stepCount} basamak` : "—"} />
      <p className="zaman-not">{r ? `Rıht ${bicim(r.riserCm, 1)} cm, basamak derinliği ${bicim(r.treadCm, 1)} cm, merdiven boyu ${bicim(r.totalRunCm / 100)} m.` : o.success ? "" : o.message}</p>
      <Alt not="2 rıht + basamak = 63 cm" href="/merdiven-hesaplama" etiket="Merdiven hesaplama" />
    </>
  );
}

function Hafriyat() {
  const [uzunluk, setUzunluk] = useState("10");
  const [genislik, setGenislik] = useState("8");
  const [derinlik, setDerinlik] = useState("1,5");
  const r = calculateExcavation({ length: sayiOku(uzunluk), width: sayiOku(genislik), depth: sayiOku(derinlik), swellPercent: 25, truckCapacityM3: 10 });
  return (
    <>
      <div className="hizli-ikili">
        <Alan etiket="Uzunluk" birim="m" deger={uzunluk} degis={setUzunluk} />
        <Alan etiket="Genişlik" birim="m" deger={genislik} degis={setGenislik} />
      </div>
      <Alan etiket="Derinlik" birim="m" deger={derinlik} degis={setDerinlik} />
      <Sonuc metin={r ? `${bicim(r.looseVolumeM3, 1)} m³` : "—"} />
      <Alt not={r ? `Yerinde ${bicim(r.bankVolumeM3, 1)} m³ · %25 kabarma · 10 m³ ile ${r.truckLoadCount} kamyon` : undefined} href="/hafriyat-hesaplama" etiket="Hafriyat hesaplama" />
    </>
  );
}

function Kereste() {
  const [boy, setBoy] = useState("3");
  const [en, setEn] = useState("10");
  const [kal, setKal] = useState("5");
  const [adet, setAdet] = useState("10");
  const r = calculateKerestehacmi([{ lengthM: sayiOku(boy), widthCm: sayiOku(en), thicknessCm: sayiOku(kal), quantity: sayiOku(adet) }], 5);
  return (
    <>
      <div className="hizli-ikili">
        <Alan etiket="Boy" birim="m" deger={boy} degis={setBoy} />
        <Alan etiket="Adet" deger={adet} degis={setAdet} />
      </div>
      <div className="hizli-ikili">
        <Alan etiket="En" birim="cm" deger={en} degis={setEn} />
        <Alan etiket="Kalınlık" birim="cm" deger={kal} degis={setKal} />
      </div>
      <Sonuc metin={r ? `${bicim(r.totalVolumeM3, 3)} m³` : "—"} />
      <Alt not={r ? `%5 fire ile ${bicim(r.totalVolumeWithWasteM3, 3)} m³` : undefined} href="/kereste-hesaplama" etiket="Kereste hesaplama" />
    </>
  );
}

function Emsal() {
  const [arsa, setArsa] = useState("1000");
  const [kaks, setKaks] = useState("2");
  const [taks, setTaks] = useState("0,3");
  const t = sayiOku(taks);
  const r = calculateZoningArea({ parcelAreaM2: sayiOku(arsa), kaks: sayiOku(kaks), taks: taks.trim() && Number.isFinite(t) ? t : null });
  return (
    <>
      <Alan etiket="Arsa alanı" birim="m²" deger={arsa} degis={setArsa} />
      <div className="hizli-ikili">
        <Alan etiket="KAKS (emsal)" deger={kaks} degis={setKaks} />
        <Alan etiket="TAKS" deger={taks} degis={setTaks} />
      </div>
      <Sonuc metin={r ? `${bicim(r.totalConstructionAreaM2, 0)} m²` : "—"} />
      <Alt not={r?.maxFootprintM2 ? `Taban ${bicim(r.maxFootprintM2, 0)} m² · yaklaşık ${bicim(r.estimatedFloors!, 1)} kat` : "Toplam inşaat alanı"} href="/emsal-kaks-hesaplama" etiket="Emsal hesaplama" />
    </>
  );
}

function Tuketim() {
  const [watt, setWatt] = useState("1500");
  const [saat, setSaat] = useState("2");
  const [gun, setGun] = useState("30");
  const r = calculateElectricityConsumption({ powerWatt: sayiOku(watt), hoursPerDay: sayiOku(saat), daysPerMonth: sayiOku(gun), kwhPrice: null });
  return (
    <>
      <Alan etiket="Cihaz gücü" birim="W" deger={watt} degis={setWatt} />
      <div className="hizli-ikili">
        <Alan etiket="Günde" birim="saat" deger={saat} degis={setSaat} />
        <Alan etiket="Ayda" birim="gün" deger={gun} degis={setGun} />
      </div>
      <Sonuc metin={r ? `${bicim(r.monthlyKwh, 1)} kWh / ay` : "—"} />
      <Alt not={r ? `Günde ${bicim(r.dailyKwh)} kWh · yılda ${bicim(r.yearlyKwh, 0)} kWh` : undefined} href="/elektrik-tuketimi-hesaplama" etiket="Elektrik tüketimi" />
    </>
  );
}

function Kaynak() {
  const [cap, setCap] = useState("3,25");
  const [ortu, setOrtu] = useState<ElectrodeCoating>("kalin");
  const r = calculateWeldingCurrent(sayiOku(cap), ortu);
  return (
    <>
      <Alan etiket="Elektrot çapı" birim="mm" deger={cap} degis={setCap} />
      <Secim etiket="Örtü" deger={ortu} degis={(v) => setOrtu(v as ElectrodeCoating)} secenekler={Object.entries(electrodeCoatingLabels)} />
      <Sonuc metin={r ? `${bicim(r.min, 0)} – ${bicim(r.max, 0)} A` : "—"} />
      <Alt not="Çap × örtü katsayısı" href="/kaynak-amperaji-hesaplama" etiket="Kaynak amperajı" />
    </>
  );
}

function Psu() {
  const [cpu, setCpu] = useState("125");
  const [gpu, setGpu] = useState("220");
  const [diger, setDiger] = useState("80");
  const [pay, setPay] = useState("25");
  const w = calculatePsuWattage({ cpuWatt: sayiOku(cpu), gpuWatt: sayiOku(gpu), otherWatt: sayiOku(diger), headroomPercent: sayiOku(pay) });
  return (
    <>
      <div className="hizli-ikili">
        <Alan etiket="İşlemci" birim="W" deger={cpu} degis={setCpu} />
        <Alan etiket="Ekran kartı" birim="W" deger={gpu} degis={setGpu} />
      </div>
      <div className="hizli-ikili">
        <Alan etiket="Diğer" birim="W" deger={diger} degis={setDiger} />
        <Alan etiket="Pay" birim="%" deger={pay} degis={setPay} />
      </div>
      <Sonuc metin={w === null ? "—" : `${bicim(w, 0)} W`} />
      <Alt not="Önerilen en düşük güç" href="/psu-guc-hesaplama" etiket="PSU güç hesaplama" />
    </>
  );
}

function Civata() {
  const [boyut, setBoyut] = useState(boltTorqueTable[4].size);
  const [sinif, setSinif] = useState<BoltGrade>("8.8");
  const satir = boltTorqueTable.find((b) => b.size === boyut)!;
  const tork = satir.torqueByGrade[sinif];
  const kuvvet = calculateClampForce(tork, satir.diameterMm);
  return (
    <>
      <div className="hizli-ikili">
        <Secim etiket="Cıvata" deger={boyut} degis={setBoyut} secenekler={boltTorqueTable.map((b) => [b.size, b.size])} />
        <Secim etiket="Kalite sınıfı" deger={sinif} degis={(v) => setSinif(v as BoltGrade)} secenekler={[["8.8", "8.8"], ["10.9", "10.9"], ["12.9", "12.9"]]} />
      </div>
      <Sonuc metin={`${bicim(tork, 1)} Nm`} />
      <Alt not={kuvvet ? `Sıkma kuvveti ≈ ${bicim(kuvvet / 1000, 1)} kN (K = 0,2)` : undefined} href="/civata-torku-hesaplama" etiket="Cıvata torku" />
    </>
  );
}

function Boru() {
  const [debi, setDebi] = useState("1,5");
  const [hiz, setHiz] = useState("1,5");
  const r = calculatePipeFlow({ solveFor: "diameter", flowValue: sayiOku(debi), flowUnit: "lps", velocityMs: sayiOku(hiz), diameterMm: 0 });
  return (
    <>
      <div className="hizli-ikili">
        <Alan etiket="Debi" birim="L/s" deger={debi} degis={setDebi} />
        <Alan etiket="Akış hızı" birim="m/s" deger={hiz} degis={setHiz} />
      </div>
      <Sonuc metin={r ? `Ø ${bicim(r.diameterMm, 1)} mm` : "—"} />
      <Alt not={r ? `${bicim(r.diameterIn, 2)} inç iç çap · Q = A × v` : undefined} href="/boru-capi-hesaplama" etiket="Boru çapı hesaplama" />
    </>
  );
}

const HAZEN: Array<[string, string]> = [
  ["150", "PVC / PE (plastik)"],
  ["140", "Bakır"],
  ["120", "Yeni çelik boru"],
  ["100", "Paslı çelik / dökme demir"],
  ["130", "Beton boru"],
];

function Basinc() {
  const [uzunluk, setUzunluk] = useState("100");
  const [cap, setCap] = useState("50");
  const [debi, setDebi] = useState("2");
  const [c, setC] = useState("150");
  const r = calculatePressureLoss({ lengthM: sayiOku(uzunluk), diameterMm: sayiOku(cap), flowLps: sayiOku(debi), hazenWilliamsC: Number(c) });
  return (
    <>
      <div className="hizli-ikili">
        <Alan etiket="Boru boyu" birim="m" deger={uzunluk} degis={setUzunluk} />
        <Alan etiket="İç çap" birim="mm" deger={cap} degis={setCap} />
      </div>
      <div className="hizli-ikili">
        <Alan etiket="Debi" birim="L/s" deger={debi} degis={setDebi} />
        <Secim etiket="Malzeme" deger={c} degis={setC} secenekler={HAZEN} />
      </div>
      <Sonuc metin={r ? `${bicim(r.pressureLossBar, 3)} bar` : "—"} />
      <Alt not={r ? `${bicim(r.headLossM)} m su sütunu · Hazen-Williams` : undefined} href="/basinc-kaybi-hesaplama" etiket="Basınç kaybı" />
    </>
  );
}

function Kesme() {
  const [hiz, setHiz] = useState("200");
  const [cap, setCap] = useState("40");
  const rpm = calculateRpmFromCuttingSpeed(sayiOku(hiz), sayiOku(cap));
  return (
    <>
      <div className="hizli-ikili">
        <Alan etiket="Kesme hızı" birim="m/dk" deger={hiz} degis={setHiz} />
        <Alan etiket="Çap" birim="mm" deger={cap} degis={setCap} />
      </div>
      <Sonuc metin={rpm === null ? "—" : `${bicim(rpm, 0)} dev/dk`} />
      <Alt not="n = Vc × 1000 / (π × D)" href="/kesme-hizi-devir-hesaplama" etiket="Kesme hızı ve devir" />
    </>
  );
}

function Genlesme() {
  const [id, setId] = useState(thermalExpansionTable[0].id);
  const [boy, setBoy] = useState("10");
  const [dt, setDt] = useState("40");
  const m = thermalExpansionTable.find((x) => x.id === id)!;
  const d = calculateThermalExpansion(sayiOku(boy), m.coefficientPerMillionK, sayiOku(dt));
  return (
    <>
      <Secim etiket="Malzeme" deger={id} degis={setId} secenekler={thermalExpansionTable.map((x) => [x.id, x.label])} />
      <div className="hizli-ikili">
        <Alan etiket="Boy" birim="m" deger={boy} degis={setBoy} />
        <Alan etiket="Sıcaklık farkı" birim="°C" deger={dt} degis={setDt} />
      </div>
      <Sonuc metin={d === null ? "—" : `${bicim(d * 1000, 2)} mm`} />
      <Alt not={`α = ${bicim(m.coefficientPerMillionK, 1)} × 10⁻⁶ /K`} href="/isil-genlesme-hesaplama" etiket="Isıl genleşme" />
    </>
  );
}

function Malzeme() {
  const [id, setId] = useState(materialDensityTable[0].id);
  const [hacim, setHacim] = useState("1000");
  const m = materialDensityTable.find((x) => x.id === id)!;
  const kg = calculateMassFromVolumeCm3(m.densityKgM3, sayiOku(hacim));
  return (
    <>
      <Secim etiket="Malzeme" deger={id} degis={setId} secenekler={materialDensityTable.map((x) => [x.id, x.label])} />
      <Alan etiket="Hacim" birim="cm³" deger={hacim} degis={setHacim} />
      <Sonuc metin={kg === null ? "—" : `${bicim(kg, 3)} kg`} />
      <Alt not={`Yoğunluk ${bicim(m.densityKgM3, 0)} kg/m³`} href="/malzeme-agirligi-hesaplama" etiket="Malzeme ağırlığı" />
    </>
  );
}

function Mol() {
  const [formul, setFormul] = useState("H2O");
  const [kutle, setKutle] = useState("36");
  const f = parseMolecularFormula(formul);
  const r = f ? calculateMol({ target: "moles", massGrams: sayiOku(kutle), molarMass: f.molarMass, moles: 0 }) : null;
  return (
    <>
      <div className="hizli-ikili">
        <label className="hizli-alan">
          <span>Formül</span>
          <input type="text" value={formul} onChange={(e) => setFormul(e.target.value)} />
        </label>
        <Alan etiket="Kütle" birim="g" deger={kutle} degis={setKutle} />
      </div>
      <Sonuc metin={r ? `${bicim(r.moles, 4)} mol` : "—"} />
      <Alt not={f ? `Mol kütlesi ${bicim(f.molarMass, 3)} g/mol` : "Formül tanınmadı (ör. NaCl, CO2)"} href="/bilim-hesaplayicilari/kimya/mol-hesaplama" etiket="Mol hesaplama" />
    </>
  );
}

function Denklem() {
  const [d, setD] = useState(["1", "1", "10", "1", "-1", "4"]);
  const n = d.map(sayiOku);
  const r = denklem2(n[0], n[1], n[2], n[3], n[4], n[5]);
  const kutu = (i: number) => (
    <input type="text" inputMode="decimal" aria-label={["a₁", "b₁", "c₁", "a₂", "b₂", "c₂"][i]} value={d[i]} onChange={(e) => setD(d.map((x, j) => (j === i ? e.target.value : x)))} />
  );
  return (
    <>
      <div className="denklem-satir">{kutu(0)}<span>x +</span>{kutu(1)}<span>y =</span>{kutu(2)}</div>
      <div className="denklem-satir">{kutu(3)}<span>x +</span>{kutu(4)}<span>y =</span>{kutu(5)}</div>
      <Sonuc metin={r ? `x = ${bicim(r.x, 4)} · y = ${bicim(r.y, 4)}` : "Tek çözüm yok"} />
      <Alt not="Cramer kuralı" href="/bilim-hesaplayicilari/matematik/2-bilinmeyenli-denklem-sistemi-cozme" etiket="Denklem sistemi" />
    </>
  );
}

function Atom() {
  const [m1, setM1] = useState("34,969");
  const [p1, setP1] = useState("75,77");
  const [m2, setM2] = useState("36,966");
  const [p2, setP2] = useState("24,23");
  const r = calculateAverageAtomicMass([
    { mass: sayiOku(m1), abundancePercent: sayiOku(p1) },
    { mass: sayiOku(m2), abundancePercent: sayiOku(p2) },
  ]);
  return (
    <>
      <div className="hizli-ikili">
        <Alan etiket="1. izotop kütlesi" birim="u" deger={m1} degis={setM1} />
        <Alan etiket="Bolluk" birim="%" deger={p1} degis={setP1} />
      </div>
      <div className="hizli-ikili">
        <Alan etiket="2. izotop kütlesi" birim="u" deger={m2} degis={setM2} />
        <Alan etiket="Bolluk" birim="%" deger={p2} degis={setP2} />
      </div>
      <Sonuc metin={r === null ? "—" : `${bicim(r, 3)} u`} />
      <Alt not="Örnek: klor (³⁵Cl, ³⁷Cl)" href="/bilim-hesaplayicilari/kimya/atom-kutlesi-hesaplama" etiket="Atom kütlesi" />
    </>
  );
}

function Isi() {
  const [kg, setKg] = useState("1");
  const [c, setC] = useState("4186");
  const [dt, setDt] = useState("10");
  const q = sayiOku(kg) * sayiOku(c) * sayiOku(dt);
  return (
    <>
      <div className="hizli-ikili">
        <Alan etiket="Kütle" birim="kg" deger={kg} degis={setKg} />
        <Alan etiket="Sıcaklık farkı" birim="K" deger={dt} degis={setDt} />
      </div>
      <Alan etiket="Özgül ısı" birim="J/(kg·K)" deger={c} degis={setC} />
      <Sonuc metin={Number.isFinite(q) ? `${bicim(q / 1000, 2)} kJ` : "—"} />
      <Alt not="Su ≈ 4186 J/(kg·K)" href="/hesaplayicilar/isi-enerjisi" etiket="Isı enerjisi" />
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
          {GRUPLAR.map((g) => (
            <optgroup key={g.ad} label={g.ad}>
              {g.araclar.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.ad}
                </option>
              ))}
            </optgroup>
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
      {arac === "fayans" ? <Fayans /> : null}
      {arac === "boya" ? <Boya /> : null}
      {arac === "parke" ? <Parke /> : null}
      {arac === "merdiven" ? <Merdiven /> : null}
      {arac === "hafriyat" ? <Hafriyat /> : null}
      {arac === "kereste" ? <Kereste /> : null}
      {arac === "emsal" ? <Emsal /> : null}
      {arac === "tuketim" ? <Tuketim /> : null}
      {arac === "kaynak" ? <Kaynak /> : null}
      {arac === "psu" ? <Psu /> : null}
      {arac === "civata" ? <Civata /> : null}
      {arac === "boru" ? <Boru /> : null}
      {arac === "basinc" ? <Basinc /> : null}
      {arac === "kesme" ? <Kesme /> : null}
      {arac === "genlesme" ? <Genlesme /> : null}
      {arac === "malzeme" ? <Malzeme /> : null}
      {arac === "mol" ? <Mol /> : null}
      {arac === "denklem" ? <Denklem /> : null}
      {arac === "atom" ? <Atom /> : null}
      {arac === "isi" ? <Isi /> : null}
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
        <p>Kartın başlığından hesabı seçin: inşaat, elektrik, makine ve tesisat, bilim ve matematikten {ARACLAR.length} hesap.</p>
      </div>
      <div className="hizli-kartlar">
        {kartlar.map((a, i) => (
          <Kart key={i} arac={a} degis={(yeni) => degis(i, yeni)} malzemeler={malzemeler} gezegenler={gezegenler} />
        ))}
      </div>
    </section>
  );
}
