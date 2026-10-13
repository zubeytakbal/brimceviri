// Çelik profil tablosu sayfaları: genel tablo + IPE, HEA, HEB (HEM dahil), NPU (UPN), NPI (IPN).
// Metinlerdeki bütün sayılar katalog verisinden (steelSections.ts) okunur.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { formatTr } from "../../converter/metal/metalWeight";
import { radiusOfGyrationCm } from "../../converter/metal/steelSectionMath";
import { STEEL_SECTIONS, type SteelSection, type SteelSeriesId } from "../../converter/metal/steelSections";
import { buildSiteUrl } from "../../siteConfig";
import TimeToolPage from "../time/TimeToolPage";
import DataTable from "./DataTable";
import { sectionName } from "../../converter/metal/steelNames";
import SteelSectionTool from "./SteelSectionTool";

export type SteelPageId = "hub" | "IPE" | "HEA" | "HEB" | "UPN" | "IPN";

export const STEEL_PAGE_PATHS: Record<SteelPageId, string> = {
  hub: "/celik-profil-tablolari",
  IPE: "/ipe-profil-tablosu",
  HEA: "/hea-profil-tablosu",
  HEB: "/heb-profil-tablosu",
  UPN: "/npu-profil-tablosu",
  IPN: "/npi-profil-tablosu",
};

const PAGE_LABELS: Record<SteelPageId, string> = {
  hub: "Çelik Profil Tabloları",
  IPE: "IPE Profil Tablosu",
  HEA: "HEA Profil Tablosu",
  HEB: "HEB ve HEM Profil Tablosu",
  UPN: "NPU (UPN) Profil Tablosu",
  IPN: "NPI (IPN) Profil Tablosu",
};

const f = formatTr;
const get = (series: SteelSeriesId, size: number) => {
  const s = STEEL_SECTIONS[series].find((x) => x.size === size);
  if (!s) throw new Error(`steel: ${series} ${size} yok`);
  return s;
};
const first = (series: SteelSeriesId) => STEEL_SECTIONS[series][0];
const last = (series: SteelSeriesId) => STEEL_SECTIONS[series][STEEL_SECTIONS[series].length - 1];
const range = (series: SteelSeriesId) => `${sectionName(series, first(series).size)} – ${sectionName(series, last(series).size)}`;

/* ---------------- Tablolar ---------------- */

function DimensionTable({ series }: { series: SteelSeriesId }) {
  const tapered = series === "UPN" || series === "IPN";
  return (
    <DataTable
      caption={`${sectionName(series, first(series).size).split(" ")[0]} profil ölçüleri ve ağırlıkları`}
      head={["Profil", "kg/m", "h (mm)", "b (mm)", "tw (mm)", "tf (mm)", tapered ? "r1 (mm)" : "r (mm)", ...(tapered ? ["r2 (mm)"] : []), "A (cm²)", "Yüzey (m²/m)"]}
      rows={STEEL_SECTIONS[series].map((s) => [
        sectionName(series, s.size),
        f(s.G, 1),
        f(s.h, 1),
        f(s.b, 1),
        f(s.tw, 1),
        f(s.tf, 1),
        f(s.r, 1),
        ...(tapered ? [f(s.r2 ?? 0, 1)] : []),
        f(s.A, 1),
        f(s.AL, 3),
      ])}
    />
  );
}

function StaticTable({ series }: { series: SteelSeriesId }) {
  return (
    <DataTable
      caption={`${sectionName(series, first(series).size).split(" ")[0]} kesit değerleri (y: güçlü eksen, z: zayıf eksen)`}
      head={["Profil", "Iy (cm⁴)", "Wel,y (cm³)", "Wpl,y (cm³)", "iy (cm)", "Iz (cm⁴)", "Wel,z (cm³)", "Wpl,z (cm³)", "iz (cm)"]}
      rows={STEEL_SECTIONS[series].map((s) => [
        sectionName(series, s.size),
        f(s.Iy, 0),
        f(s.Wely, 1),
        f(s.Wply, 1),
        f(radiusOfGyrationCm(s.Iy, s.A), 2),
        f(s.Iz, 1),
        f(s.Welz, 1),
        f(s.Wplz, 1),
        f(radiusOfGyrationCm(s.Iz, s.A), 2),
      ])}
    />
  );
}

function CompareTable({ size }: { size: number }) {
  const series: SteelSeriesId[] = ["IPE", "IPN", "UPN", "HEA", "HEB", "HEM"];
  return (
    <DataTable
      caption={`Aynı numaradaki (${size}) profillerin karşılaştırması`}
      head={["Profil", "kg/m", "h × b (mm)", "Iy (cm⁴)", "Iz (cm⁴)", "Wel,y / kg (cm³/kg·m⁻¹)"]}
      rows={series.map((id) => {
        const s = get(id, size);
        return [sectionName(id, size), f(s.G, 1), `${f(s.h, 0)} × ${f(s.b, 0)}`, f(s.Iy, 0), f(s.Iz, 0), f(s.Wely / s.G, 2)];
      })}
    />
  );
}

/* ---------------- İçerik ---------------- */

type Section = { id: string; title: string; body: ReactNode };
type Content = {
  metaTitle: string;
  description: string;
  h1: string;
  intro: string;
  series?: SteelSeriesId;
  defaultSize: number;
  sections: Section[];
  faq: FaqItem[];
};

const symbols: Section = {
  id: "semboller",
  title: "Tablodaki semboller ne anlama geliyor?",
  body: (
    <ul>
      <li>
        <strong>h</strong> profil yüksekliği, <strong>b</strong> başlık genişliği, <strong>tw</strong> gövde kalınlığı, <strong>tf</strong> başlık kalınlığıdır.
      </li>
      <li>
        <strong>r</strong> gövde ile başlık arasındaki köşe yarıçapıdır; NPU ve NPI&apos;da <strong>r2</strong> başlık ucundaki yuvarlaklıktır.
      </li>
      <li>
        <strong>A</strong> kesit alanı, <strong>Yüzey</strong> bir metre profilin boyanacak veya galvanizlenecek dış yüzey alanıdır.
      </li>
      <li>
        <strong>Iy, Iz</strong> atalet momentleridir: profilin eğilmeye karşı direncini gösterir. <strong>y</strong> güçlü eksen (gövdeye dik yükleme), <strong>z</strong> zayıf eksendir.
      </li>
      <li>
        <strong>Wel</strong> elastik, <strong>Wpl</strong> plastik kesit modülüdür; gerilme hesabında momentin bölündüğü değerdir. <strong>i</strong> atalet yarıçapıdır ve burkulma hesabında kullanılır.
      </li>
    </ul>
  ),
};

function hubContent(): Content {
  const ipe200 = get("IPE", 200);
  const hea200 = get("HEA", 200);
  const ipe300 = get("IPE", 300);
  return {
    metaTitle: "Çelik Profil Tabloları: IPE, HEA, HEB, NPU, NPI",
    description: `IPE, HEA, HEB, HEM, NPU ve NPI çelik profillerin ölçü, ağırlık (kg/m) ve kesit değerleri tek yerde. Profil seçip boy girin, toplam ağırlığı ve boya yüzeyini hesaplayın.`,
    h1: "Çelik Profil Tabloları ve Ağırlık Hesaplama",
    intro:
      "Seriyi ve profili seçin, boyu ve adedi girin; toplam ağırlığı, boya/galvaniz yüzeyini ve profilin kesit değerlerini görün. Aşağıda altı serinin karşılaştırması ve her serinin ayrıntılı tablosuna bağlantılar var.",
    defaultSize: 200,
    sections: [
      {
        id: "seriler",
        title: "Profil serileri",
        body: (
          <>
            <ul>
              <li>
                <Link href={STEEL_PAGE_PATHS.IPE}>IPE profil tablosu</Link> ({range("IPE")}): dar başlıklı, paralel başlıklı I profil. Kirişlerde en sık görülen seri.
              </li>
              <li>
                <Link href={STEEL_PAGE_PATHS.HEA}>HEA profil tablosu</Link> ({range("HEA")}): geniş başlıklı H profilin hafif serisi.
              </li>
              <li>
                <Link href={STEEL_PAGE_PATHS.HEB}>HEB ve HEM profil tablosu</Link> ({range("HEB")}): geniş başlıklı H profilin normal (HEB) ve ağır (HEM) serileri.
              </li>
              <li>
                <Link href={STEEL_PAGE_PATHS.UPN}>NPU profil tablosu</Link> ({range("UPN")}): eğimli başlıklı U profil; Avrupa standardındaki adı UPN.
              </li>
              <li>
                <Link href={STEEL_PAGE_PATHS.IPN}>NPI profil tablosu</Link> ({range("IPN")}): eğimli başlıklı I profil; Avrupa standardındaki adı IPN.
              </li>
            </ul>
            <p>
              Türkiye&apos;de NPU ve NPI adları eski DIN gösteriminden gelir; Avrupa standardı EN 10365 aynı profilleri UPN ve IPN olarak adlandırır. HEA, HEB ve HEM ise standartta HE 300 A, HE 300 B gibi
              yazılır.
            </p>
          </>
        ),
      },
      {
        id: "karsilastirma",
        title: "Aynı numarada hangi profil ne kadar ağır?",
        body: (
          <>
            <p>
              Profil adındaki sayı yaklaşık yüksekliği gösterir, ama aynı numaradaki profiller çok farklı ağırlıktadır. Son sütun, bir kilogram çeliğin güçlü eksende ne kadar kesit modülü sağladığını gösterir;
              yüksek değer, eğilmeye çalışan bir kirişte malzemenin daha verimli kullanıldığı anlamına gelir.
            </p>
            <CompareTable size={200} />
            <p>
              Örneğin {sectionName("IPE", 300)} ({f(ipe300.G, 1)} kg/m) ile {sectionName("HEA", 200)} ({f(hea200.G, 1)} kg/m) neredeyse aynı ağırlıktadır. IPE 300&apos;ün güçlü eksen atalet momenti{" "}
              {f(ipe300.Iy, 0)} cm⁴, HEA 200&apos;ünki {f(hea200.Iy, 0)} cm⁴; buna karşılık zayıf eksende HEA 200 {f(hea200.Iz, 0)} cm⁴ ile IPE 300&apos;ün {f(ipe300.Iz, 0)} cm⁴ değerini geçer. Tek yönde
              eğilen kirişlerde IPE, iki yönde yük ve burkulma etkisi taşıyan kolonlarda HE serisi bu yüzden öne çıkar.
            </p>
          </>
        ),
      },
      symbols,
      {
        id: "agirlik",
        title: "Profil ağırlığı nasıl hesaplanır?",
        body: (
          <p>
            Toplam ağırlık = metre ağırlığı (kg/m) × boy (m) × adet. Örneğin 12 metrelik 5 adet {sectionName("IPE", 200)}: {f(ipe200.G, 1)} × 12 × 5 = {f(ipe200.G * 60, 0)} kg. Tablolardaki metre ağırlıkları kesit
            alanı × 7850 kg/m³ yoğunlukla hesaplanmış nominal değerlerdir; standart, üretimde kütle için küçük bir tolerans tanır.
          </p>
        ),
      },
    ],
    faq: [
      { question: "IPE 200 profilin metresi kaç kg?", answer: `IPE 200 ${f(ipe200.G, 1)} kg/m'dir; 12 metrelik bir boy ${f(ipe200.G * 12, 1)} kg gelir.` },
      { question: "NPU ile UPN aynı mı?", answer: "Evet. NPU Türkiye'de kullanılan eski DIN adıdır; Avrupa standardı EN 10365 aynı U profilleri UPN olarak adlandırır. NPI ve IPN için de durum aynıdır." },
      { question: "HEA, HEB ve HEM arasındaki fark nedir?", answer: `Üçü de geniş başlıklı H profildir. HEA hafif, HEB normal, HEM ağır seridir. Örneğin 300 numarada ağırlıklar ${f(get("HEA", 300).G, 1)}, ${f(get("HEB", 300).G, 0)} ve ${f(get("HEM", 300).G, 0)} kg/m'dir.` },
      { question: "Tablodaki değerler hangi standarda göre?", answer: "Ölçüler EN 10365:2017'ye göredir ve ArcelorMittal'in güncel profil kataloğundan alınmıştır." },
    ],
  };
}

function ipeContent(): Content {
  const s200 = get("IPE", 200);
  const n200 = get("IPN", 200);
  const s300 = get("IPE", 300);
  const minRatio = Math.min(...STEEL_SECTIONS.IPE.map((s) => s.b / s.h));
  const maxRatio = Math.max(...STEEL_SECTIONS.IPE.map((s) => s.b / s.h));
  return {
    metaTitle: "IPE Profil Tablosu: Ölçüler ve Ağırlıklar",
    description: `IPE 80 – IPE 600 profil tablosu: kg/m ağırlık, h, b, tw, tf ölçüleri, kesit alanı, Iy, Wel ve Wpl değerleri. IPE 200 = ${f(s200.G, 1)} kg/m. Boy girerek toplam ağırlığı hesaplayın.`,
    h1: "IPE Profil Tablosu",
    intro: `IPE profilin ölçülerini, metre ağırlığını ve kesit değerlerini bulun; boy ve adet girerek toplam ağırlığı ve boya yüzeyini hesaplayın. Tablo ${range("IPE")} aralığındaki ${STEEL_SECTIONS.IPE.length} profili kapsar.`,
    series: "IPE",
    defaultSize: 200,
    sections: [
      { id: "olculer", title: "IPE profil ölçüleri ve ağırlık tablosu", body: <DimensionTable series="IPE" /> },
      { id: "kesit", title: "IPE kesit değerleri (atalet momenti ve kesit modülü)", body: <StaticTable series="IPE" /> },
      symbols,
      {
        id: "adlandirma",
        title: "IPE profil adı neyi gösterir?",
        body: (
          <p>
            IPE&apos;den sonraki sayı profil yüksekliğidir: {sectionName("IPE", 200)} {f(s200.h, 0)} mm, {sectionName("IPE", 300)} {f(s300.h, 0)} mm yüksekliktedir. Başlık genişliği yüksekliğin yaklaşık{" "}
            %{f(minRatio * 100, 0)}–%{f(maxRatio * 100, 0)}&apos;i kadardır; bu yüzden IPE dar başlıklı bir profildir. Başlıkların iç yüzeyleri paraleldir, bu da bağlantı ve kaynak işlerini kolaylaştırır.
          </p>
        ),
      },
      {
        id: "ipe-npi",
        title: "IPE ile NPI arasındaki fark",
        body: (
          <p>
            NPI (IPN) aynı yükseklikte bir I profildir ama başlıklarının iç yüzü eğimlidir. Aynı numarada NPI daha ağırdır: {sectionName("IPN", 200)} {f(n200.G, 1)} kg/m, {sectionName("IPE", 200)} ise {f(s200.G, 1)} kg/m.
            Güçlü eksen kesit modülünün ağırlığa oranı IPE 200&apos;de {f(s200.Wely / s200.G, 2)}, NPI 200&apos;de {f(n200.Wely / n200.G, 2)} cm³/(kg/m)&apos;dir; yani IPE aynı eğilme dayanımını daha az çelikle verir.
          </p>
        ),
      },
      {
        id: "kullanim",
        title: "IPE nerede kullanılır?",
        body: (
          <p>
            IPE&apos;nin güçlü eksen atalet momenti zayıf eksenin çok üstündedir ({sectionName("IPE", 200)} için Iy {f(s200.Iy, 0)} cm⁴, Iz {f(s200.Iz, 1)} cm⁴). Bu yüzden tek yönde eğilen döşeme ve çatı kirişlerinde,
            aşıklarda ve asma katlarda yaygındır. İki yönde eğilme ve burkulma taşıyan kolonlarda genellikle geniş başlıklı{" "}
            <Link href={STEEL_PAGE_PATHS.HEA}>HEA</Link> ve <Link href={STEEL_PAGE_PATHS.HEB}>HEB</Link> profiller tercih edilir. Profil seçimi statik hesapla yapılmalıdır.
          </p>
        ),
      },
    ],
    faq: [
      { question: "IPE 200 kaç kg?", answer: `IPE 200 ${f(s200.G, 1)} kg/m'dir. 6 metre ${f(s200.G * 6, 1)} kg, 12 metre ${f(s200.G * 12, 1)} kg gelir.` },
      { question: "IPE 300 ölçüleri nedir?", answer: `IPE 300: h = ${f(s300.h, 0)} mm, b = ${f(s300.b, 0)} mm, gövde ${f(s300.tw, 1)} mm, başlık ${f(s300.tf, 1)} mm, ağırlık ${f(s300.G, 1)} kg/m.` },
      { question: "IPE profilin boya alanı nasıl bulunur?", answer: `Tablodaki "Yüzey" sütunu bir metrenin dış yüzeyidir. IPE 200 için ${f(s200.AL, 3)} m²/m; 12 metrelik boy ${f(s200.AL * 12, 2)} m² eder.` },
    ],
  };
}

function heaContent(): Content {
  const a300 = get("HEA", 300);
  const a200 = get("HEA", 200);
  const b300 = get("HEB", 300);
  return {
    metaTitle: "HEA Profil Tablosu: Ölçüler ve Ağırlıklar",
    description: `HEA 100 – HEA 1000 profil tablosu: kg/m ağırlık, gerçek yükseklik, başlık genişliği, kesit alanı ve atalet momentleri. HEA 200 = ${f(a200.G, 1)} kg/m. Toplam ağırlığı hesaplayın.`,
    h1: "HEA Profil Tablosu",
    intro: `HEA profilin gerçek ölçülerini, metre ağırlığını ve kesit değerlerini bulun; boy ve adet girerek toplam ağırlığı hesaplayın. Tablo ${range("HEA")} aralığındaki ${STEEL_SECTIONS.HEA.length} profili kapsar.`,
    series: "HEA",
    defaultSize: 200,
    sections: [
      { id: "olculer", title: "HEA profil ölçüleri ve ağırlık tablosu", body: <DimensionTable series="HEA" /> },
      { id: "kesit", title: "HEA kesit değerleri", body: <StaticTable series="HEA" /> },
      symbols,
      {
        id: "yukseklik",
        title: "HEA'nın yüksekliği neden adındaki sayıdan küçük?",
        body: (
          <p>
            HEA&apos;da addaki sayı nominal boyuttur; profilin gerçek yüksekliği her boyda bu sayıdan küçüktür. {sectionName("HEA", 300)} {f(a300.h, 0)} mm, {sectionName("HEA", 200)} {f(a200.h, 0)} mm
            yüksekliktedir. Aynı numaradaki <Link href={STEEL_PAGE_PATHS.HEB}>HEB</Link> ise tam {f(b300.h, 0)} mm&apos;dir. Çizimde veya kesim listesinde HEA&apos;nın yüksekliğini addan okumak bu farkı
            gözden kaçırır; ölçüyü tablodaki h sütunundan alın.
          </p>
        ),
      },
      {
        id: "hea-heb",
        title: "HEA mı HEB mi?",
        body: (
          <p>
            HEA, HEB&apos;nin hafif serisidir: başlık ve gövde daha incedir. 300 numarada HEA {f(a300.G, 1)} kg/m, HEB {f(b300.G, 0)} kg/m gelir; HEA yaklaşık %{f((1 - a300.G / b300.G) * 100, 0)} daha hafiftir.
            Buna karşılık HEB&apos;nin güçlü eksen atalet momenti ({f(b300.Iy, 0)} cm⁴) HEA&apos;nınkinden ({f(a300.Iy, 0)} cm⁴) yüksektir. Hangisinin yeterli olduğunu yük ve burkulma boyu belirler.
          </p>
        ),
      },
    ],
    faq: [
      { question: "HEA 200 kaç kg?", answer: `HEA 200 ${f(a200.G, 1)} kg/m'dir; 12 metrelik boy ${f(a200.G * 12, 0)} kg gelir.` },
      { question: "HEA 300'ün yüksekliği kaç mm?", answer: `HEA 300'ün gerçek yüksekliği ${f(a300.h, 0)} mm, başlık genişliği ${f(a300.b, 0)} mm'dir.` },
      { question: "HEA ile HEB arasındaki fark nedir?", answer: `HEA hafif seridir; aynı numarada daha ince başlık ve gövdeye sahiptir. 300 numarada HEA ${f(a300.G, 1)} kg/m, HEB ${f(b300.G, 0)} kg/m'dir.` },
    ],
  };
}

function hebContent(): Content {
  const b200 = get("HEB", 200);
  const b300 = get("HEB", 300);
  const b400 = get("HEB", 400);
  const m300 = get("HEM", 300);
  return {
    metaTitle: "HEB Profil Tablosu: Ölçüler ve Ağırlıklar",
    description: `HEB 100 – HEB 1000 ve ağır seri HEM profil tablosu: kg/m ağırlık, ölçüler, kesit alanı, Iy, Iz, Wel, Wpl. HEB 200 = ${f(b200.G, 1)} kg/m. Boy girerek toplam ağırlığı hesaplayın.`,
    h1: "HEB ve HEM Profil Tablosu",
    intro: `HEB ve ağır seri HEM profillerin ölçülerini, metre ağırlığını ve kesit değerlerini bulun; boy ve adet girerek toplam ağırlığı hesaplayın. Tablolar ${range("HEB")} ve ${range("HEM")} aralığını kapsar.`,
    series: "HEB",
    defaultSize: 200,
    sections: [
      { id: "olculer", title: "HEB profil ölçüleri ve ağırlık tablosu", body: <DimensionTable series="HEB" /> },
      { id: "kesit", title: "HEB kesit değerleri", body: <StaticTable series="HEB" /> },
      {
        id: "geometri",
        title: "HEB'de yükseklik ve genişlik",
        body: (
          <p>
            HEB&apos;de addaki sayı gerçek yüksekliğe eşittir. 300 numaraya kadar başlık genişliği de yükseklik kadardır; {sectionName("HEB", 200)} {f(b200.h, 0)} × {f(b200.b, 0)} mm, {sectionName("HEB", 300)}{" "}
            {f(b300.h, 0)} × {f(b300.b, 0)} mm&apos;dir. Daha büyük boylarda genişlik {f(b400.b, 0)} mm&apos;de sabit kalır ({sectionName("HEB", 400)}: {f(b400.h, 0)} × {f(b400.b, 0)} mm). Kare kesite yakın
            oluşu iki eksende de dengeli dayanım verir.
          </p>
        ),
      },
      {
        id: "hem",
        title: "HEM: ağır seri",
        body: (
          <>
            <p>
              HEM, HE serisinin en kalın etli halidir ve gerçek yüksekliği addaki sayıdan büyüktür: {sectionName("HEM", 300)} {f(m300.h, 0)} × {f(m300.b, 0)} mm, {f(m300.G, 0)} kg/m&apos;dir. Aynı numaradaki
              HEB&apos;nin ({f(b300.G, 0)} kg/m) yaklaşık {f(m300.G / b300.G, 1)} katı ağırlıktadır. Büyük eksenel yük taşıyan kolonlarda ve sınırlı yükseklikte yüksek dayanım gereken yerlerde kullanılır.
            </p>
            <DimensionTable series="HEM" />
          </>
        ),
      },
      symbols,
    ],
    faq: [
      { question: "HEB 200 kaç kg?", answer: `HEB 200 ${f(b200.G, 1)} kg/m'dir; 12 metrelik boy ${f(b200.G * 12, 0)} kg gelir.` },
      { question: "HEB 300 ölçüleri nedir?", answer: `HEB 300: ${f(b300.h, 0)} × ${f(b300.b, 0)} mm, gövde ${f(b300.tw, 1)} mm, başlık ${f(b300.tf, 1)} mm, ${f(b300.G, 0)} kg/m.` },
      { question: "HEM 300 ile HEB 300 arasındaki fark nedir?", answer: `HEM 300 ${f(m300.h, 0)} mm yüksekliğinde ve ${f(m300.G, 0)} kg/m, HEB 300 ise ${f(b300.h, 0)} mm ve ${f(b300.G, 0)} kg/m'dir.` },
    ],
  };
}

function upnContent(): Content {
  const u100 = get("UPN", 100);
  const u200 = get("UPN", 200);
  const u300 = get("UPN", 300);
  return {
    metaTitle: "NPU Profil Tablosu (UPN): Ölçü ve Ağırlık",
    description: `NPU (UPN) 50 – 400 U profil tablosu: kg/m ağırlık, h, b, tw, tf ölçüleri, kesit alanı ve atalet momentleri. NPU 100 = ${f(u100.G, 1)} kg/m, NPU 200 = ${f(u200.G, 1)} kg/m.`,
    h1: "NPU (UPN) Profil Tablosu",
    intro: `NPU (Avrupa standardında UPN) U profilin ölçülerini, metre ağırlığını ve kesit değerlerini bulun; boy ve adet girerek toplam ağırlığı hesaplayın. Tablo ${range("UPN")} aralığındaki ${STEEL_SECTIONS.UPN.length} profili kapsar.`,
    series: "UPN",
    defaultSize: 100,
    sections: [
      { id: "olculer", title: "NPU profil ölçüleri ve ağırlık tablosu", body: <DimensionTable series="UPN" /> },
      { id: "kesit", title: "NPU kesit değerleri", body: <StaticTable series="UPN" /> },
      {
        id: "npu-upn",
        title: "NPU ile UPN aynı profil mi?",
        body: (
          <p>
            Evet. NPU, Türkiye&apos;de yerleşmiş eski DIN adıdır; Avrupa standardı EN 10365 aynı profilleri UPN olarak listeler. Addaki sayı yüksekliktir: {sectionName("UPN", 200)} {f(u200.h, 0)} mm yüksekliğinde,{" "}
            {f(u200.b, 0)} mm başlık genişliğindedir. Başlıkların iç yüzü eğimlidir; bu yüzden tabloda iki ayrı yarıçap vardır: gövde köşesi r1 ve başlık ucu r2.
          </p>
        ),
      },
      {
        id: "u-kesit",
        title: "U profilde nelere dikkat edilir?",
        body: (
          <p>
            U kesit simetrik değildir: zayıf eksende başlıklar tek tarafa açılır. {sectionName("UPN", 200)} için güçlü eksen atalet momenti {f(u200.Iy, 0)} cm⁴, zayıf eksen {f(u200.Iz, 0)} cm⁴&apos;tür. Yük
            gövde düzleminden geçmediğinde profil burulmaya zorlanır; tek başına kiriş olarak kullanılırken bağlantı ve yanal destek detayına dikkat edilir. İki NPU&apos;nun sırt sırta ya da karşılıklı birleştirilmesi
            simetrik bir kesit oluşturur.
          </p>
        ),
      },
      symbols,
    ],
    faq: [
      { question: "NPU 100 kaç kg?", answer: `NPU 100 ${f(u100.G, 1)} kg/m'dir; 6 metre ${f(u100.G * 6, 1)} kg, 12 metre ${f(u100.G * 12, 1)} kg gelir.` },
      { question: "NPU 200 ölçüleri nedir?", answer: `NPU 200: h = ${f(u200.h, 0)} mm, b = ${f(u200.b, 0)} mm, gövde ${f(u200.tw, 1)} mm, başlık ${f(u200.tf, 1)} mm, ${f(u200.G, 1)} kg/m.` },
      { question: "NPU 300 kaç kg?", answer: `NPU 300 ${f(u300.G, 1)} kg/m'dir.` },
    ],
  };
}

function ipnContent(): Content {
  const n200 = get("IPN", 200);
  const e200 = get("IPE", 200);
  const n100 = get("IPN", 100);
  return {
    metaTitle: "NPI Profil Tablosu (IPN): Ölçü ve Ağırlık",
    description: `NPI (IPN) 80 – 600 I profil tablosu: kg/m ağırlık, ölçüler, kesit alanı, Iy, Iz ve kesit modülleri. NPI 200 = ${f(n200.G, 1)} kg/m. IPE ile farkı ve toplam ağırlık hesabı.`,
    h1: "NPI (IPN) Profil Tablosu",
    intro: `NPI (Avrupa standardında IPN) profilin ölçülerini, metre ağırlığını ve kesit değerlerini bulun; boy ve adet girerek toplam ağırlığı hesaplayın. Tablo ${range("IPN")} aralığındaki ${STEEL_SECTIONS.IPN.length} profili kapsar.`,
    series: "IPN",
    defaultSize: 200,
    sections: [
      { id: "olculer", title: "NPI profil ölçüleri ve ağırlık tablosu", body: <DimensionTable series="IPN" /> },
      { id: "kesit", title: "NPI kesit değerleri", body: <StaticTable series="IPN" /> },
      {
        id: "egimli-baslik",
        title: "NPI'nın eğimli başlığı",
        body: (
          <p>
            NPI&apos;da başlık kalınlığı gövdeden uca doğru azalır; tablodaki tf, standartta tanımlanan ölçüm noktasındaki kalınlıktır. Bu yüzden başlık üstüne cıvatalı bağlantı yapılırken eğimli pul (konik rondela) gerekir. Paralel başlıklı{" "}
            <Link href={STEEL_PAGE_PATHS.IPE}>IPE</Link> bu sorunu taşımaz.
          </p>
        ),
      },
      {
        id: "npi-ipe",
        title: "NPI mı IPE mi?",
        body: (
          <p>
            Aynı yükseklikte NPI daha ağırdır: {sectionName("IPN", 200)} {f(n200.G, 1)} kg/m, {sectionName("IPE", 200)} {f(e200.G, 1)} kg/m. NPI&apos;nın güçlü eksen atalet momenti biraz daha yüksektir (
            {f(n200.Iy, 0)} ve {f(e200.Iy, 0)} cm⁴), ama kilogram başına sağladığı kesit modülü daha düşüktür ({f(n200.Wely / n200.G, 2)} ve {f(e200.Wely / e200.G, 2)} cm³/(kg/m)). Yükseklik sınırlı ve
            daha rijit bir kesit gerektiğinde NPI, malzeme ekonomisi önemli olduğunda IPE öne çıkar.
          </p>
        ),
      },
      symbols,
    ],
    faq: [
      { question: "NPI 200 kaç kg?", answer: `NPI 200 ${f(n200.G, 1)} kg/m'dir; 12 metrelik boy ${f(n200.G * 12, 1)} kg gelir.` },
      { question: "NPI 100 ölçüleri nedir?", answer: `NPI 100: h = ${f(n100.h, 0)} mm, b = ${f(n100.b, 0)} mm, gövde ${f(n100.tw, 1)} mm, ${f(n100.G, 1)} kg/m.` },
      { question: "NPI ile IPN aynı mı?", answer: "Evet. NPI Türkiye'de kullanılan eski DIN adıdır; Avrupa standardı EN 10365 aynı profili IPN olarak adlandırır." },
    ],
  };
}

const CONTENT: Record<SteelPageId, () => Content> = {
  hub: hubContent,
  IPE: ipeContent,
  HEA: heaContent,
  HEB: hebContent,
  UPN: upnContent,
  IPN: ipnContent,
};

export function steelPageMetadata(id: SteelPageId): Metadata {
  const c = CONTENT[id]();
  const path = STEEL_PAGE_PATHS[id];
  return {
    title: c.metaTitle,
    description: c.description,
    alternates: { canonical: path },
    openGraph: { title: c.metaTitle, description: c.description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

export default function SteelSectionPage({ id }: { id: SteelPageId }) {
  const c = CONTENT[id]();
  const path = STEEL_PAGE_PATHS[id];
  const crumbs = [
    { href: "/", label: "Ana Sayfa" },
    { href: "/muhendislik-hesaplayicilari", label: "Mühendislik Hesaplayıcıları" },
    ...(id === "hub" ? [] : [{ href: STEEL_PAGE_PATHS.hub, label: PAGE_LABELS.hub }]),
    { href: path, label: c.h1 },
  ];
  const siblings = (Object.keys(STEEL_PAGE_PATHS) as SteelPageId[]).filter((k) => k !== id).map((k) => ({ href: STEEL_PAGE_PATHS[k], label: PAGE_LABELS[k] }));

  return (
    <TimeToolPage
      crumbs={crumbs}
      crumbLabel="Sayfa yolu"
      title={c.h1}
      intro={c.intro}
      tool={<SteelSectionTool series={c.series} defaultSize={c.defaultSize} />}
      related={{
        title: "İlgili tablolar ve hesaplar",
        links: [...siblings, { href: "/kutu-profil-agirlik-hesaplama", label: "Kutu Profil Ağırlık Hesaplama" }, { href: "/demir-agirlik-hesaplama", label: "İnşaat Demiri Ağırlık Hesaplama" }],
      }}
      tocTitle="Bu sayfada"
      tocItems={[...c.sections.map((s) => ({ id: s.id, label: s.title })), { id: "kaynaklar", label: "Kaynaklar" }, { id: "faq", label: "Sık sorulan sorular" }]}
      faqTitle="Sık sorulan sorular"
      faqItems={c.faq}
    >
      {c.sections.map((s) => (
        <section key={s.id}>
          <h2 id={s.id}>{s.title}</h2>
          {s.body}
        </section>
      ))}
      <h2 id="kaynaklar">Kaynaklar ve doğrulama</h2>
      <p>
        Ölçüler ve kesit değerleri: ArcelorMittal Europe, &quot;Sections and Merchant Bars – Sales Programme&quot; (2026) ve IPN eki; boyut standardı EN 10365:2017. Her profil için kesit alanı, metre ağırlığı,
        atalet momentleri ve elastik kesit modülleri ölçülerden formülle yeniden hesaplanıp katalog değerleriyle karşılaştırılmıştır (en büyük fark %1&apos;in altında). Atalet yarıçapları (i) √(I/A) ile
        hesaplanmıştır.
      </p>
      <p>Tablolar ön boyutlandırma ve malzeme hesabı içindir; taşıyıcı sistem kararları yetkili mühendisin statik hesabıyla verilmelidir.</p>
    </TimeToolPage>
  );
}

export type { SteelSection };
