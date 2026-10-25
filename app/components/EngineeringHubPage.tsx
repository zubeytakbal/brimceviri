import Link from "@/app/components/SiteLink";
import { getElectricalHubPath } from "../converter/engineeringHubs";
import { germanStandaloneTools } from "../i18n/germanStandaloneTools";
import type { SiteIconName } from "./siteIcons";

const KIND_LABELS: Record<Locale, Record<"table" | "converter" | "calculator", string>> = {
  tr: { table: "Tablo", converter: "Dönüştürücü", calculator: "Hesaplayıcı" },
  en: { table: "Table", converter: "Converter", calculator: "Calculator" },
  de: { table: "Tabelle", converter: "Umrechner", calculator: "Rechner" },
};

/** Araç türü adresinden çıkarılır: tablo sayfaları, çeviriciler ve geri kalan hesaplayıcılar. */
function toolKind(slug: string, locale: Locale) {
  const kind = /tablo|table|tabelle|ozellikleri|properties/.test(slug)
    ? "table"
    : /cevirici|converter|umrechner|donusum/.test(slug)
      ? "converter"
      : "calculator";
  return KIND_LABELS[locale][kind];
}

type Locale = "tr" | "en" | "de";

type EngineeringTool = {
  slug: string;
  href: string;
  title: string;
  formula?: string;
  description: string;
  icon?: SiteIconName;
};

type EngineeringGuideLink = {
  href: string;
  label: string;
};

type EngineeringGroup = {
  id: string;
  title: string;
  description: string;
  tools: EngineeringTool[];
};

type EngineeringFocusCard = {
  href: string;
  title: string;
  description: string;
  iconName: SiteIconName;
  meta: string;
};

type EngineeringHubContent = {
  breadcrumbAriaLabel: string;
  breadcrumbs: Array<{
    label: string;
    href?: string;
  }>;
  title: string;
  description: string;
  focusTitle: string;
  focusCards: EngineeringFocusCard[];
  groups: EngineeringGroup[];
  guidesTitle: string;
  guideLinks: EngineeringGuideLink[];
  relatedToolsTitle?: string;
  relatedToolsLinks?: EngineeringGuideLink[];
  alternateTitle: string;
  alternateLink: {
    href: string;
    hrefLang: string;
    label: string;
  };
};

const contentByLocale: Record<Locale, EngineeringHubContent> = {
  tr: {
    breadcrumbAriaLabel: "Sayfa yolu",
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Mühendislik Hesaplayıcıları" },
    ],
    title: "Mühendislik Hesaplayıcıları",
    description:
      "Kablo kesiti ve gerilim düşümü, boru basınç kaybı, kiriş sehimi, metrik vida ölçüleri, petek dilim sayısı, beton metrajı ve klima kapasitesi gibi elektrik, akışkanlar, ısı, makine, malzeme, inşaat ve ısıtma-soğutma hesapları; her sonuçta kullanılan formül de gösterilir.",
    focusTitle: "Mühendislik bölümleri",
    focusCards: [
      {
        href: getElectricalHubPath("tr"),
        title: "Elektrik Hesapları",
        description:
          "Kablo kesiti, gerilim düşümü, kW-amper dönüşümleri ve motor akımı.",
        iconName: "energy",
        meta: "Bölüm",
      },
      {
        href: "#basinc-ve-akiskanlar",
        title: "Akışkanlar ve Tesisat",
        description: "Basınç, hidrostatik yük, boru çapı, debi ve basınç kaybı hesapları.",
        iconName: "flowRate",
        meta: "Bölüm",
      },
      {
        href: "#isi-transferi",
        title: "Isı ve Termodinamik",
        description: "Isı enerjisi, ısı iletimi, ısıl genleşme ve soğutma devresi hesapları.",
        iconName: "temperature",
        meta: "Bölüm",
      },
      {
        href: "#makine-ve-imalat",
        title: "Makine ve İmalat",
        description: "Cıvata torku, kesme hızı, kaynak ve elastik uzama hesapları.",
        iconName: "torque",
        meta: "Bölüm",
      },
      {
        href: "#statik-mukavemet",
        title: "Statik ve Mukavemet",
        description: "Kiriş sehimi, atalet momenti, burkulma ve mil burulması.",
        iconName: "pressureForceArea",
        meta: "Bölüm",
      },
      {
        href: "#malzeme",
        title: "Malzeme",
        description: "Malzeme özellikleri, yoğunluk, ağırlık ve sertlik dönüşümleri.",
        iconName: "density",
        meta: "Bölüm",
      },
      {
        href: "#insaat",
        title: "İnşaat",
        description: "Beton, tuğla, sıva, hafriyat, merdiven ve kereste metrajları.",
        iconName: "concreteCalculator",
        meta: "Bölüm",
      },
      {
        href: "#isitma-sogutma",
        title: "Isıtma ve Soğutma",
        description: "Klima kapasitesi, yalıtım, doğalgaz tüketimi ve ısıtma maliyeti hesapları.",
        iconName: "acCapacityCalculator",
        meta: "Bölüm",
      },
    ],
    groups: [
      {
        id: "elektrik",
        title: "Elektrik",
        description:
          "Güç-akım dönüşümleri, kablo seçimi, gerilim düşümü ve temel devre hesapları.",
        tools: [
          {
            slug: "kw-to-amper-hesaplama",
            href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama",
            title: "kW to Amper",
            formula: "I = P / (√3 x V x cos phi x eta)",
            description: "Üç faz, tek faz ve DC seçenekleriyle gücü yaklaşık hat akımına çevirin.",
          },
          {
            slug: "amper-to-kw-hesaplama",
            href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/amper-to-kw-hesaplama",
            title: "Amper to kW",
            formula: "P = √3 x V x I x cos phi x eta",
            description: "Hat akımından üç faz, tek faz ve DC seçenekleriyle yaklaşık gücü hesaplayın.",
          },
          {
            slug: "gerilim-dusumu-hesaplama",
            href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/gerilim-dusumu-hesaplama",
            title: "Gerilim Düşümü",
            description: "Hat uzunluğu, kesit ve akıma göre gerilim düşümünü ve yüzdesini bulun.",
          },
          {
            slug: "kablo-kesiti-hesaplama",
            href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/kablo-kesiti-hesaplama",
            title: "Kablo Kesiti",
            description: "Yük akımı ve izin verilen gerilim düşümüne göre kablo kesitini ön boyutlandırın.",
          },
          {
            slug: "motor-akimi-hesaplama",
            href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/motor-akimi-hesaplama",
            title: "Motor Akımı",
            description: "Motor gücü, gerilim, güç faktörü ve verimden çalışma akımını hesaplayın.",
          },
          {
            slug: "ohm-yasasi",
            href: "/hesaplayicilar/ohm-yasasi",
            title: "Ohm Yasası",
            formula: "V = I x R",
            description: "Gerilimi, akımı veya direnci Ohm Yasası ile hesaplayın.",
          },
          {
            slug: "kva-kw-hesaplama",
            href: "/kva-kw-hesaplama",
            title: "kVA kW Hesaplama",
            icon: "energy",
            formula: "P = S · cos φ",
            description: "kVA, kW, kVAr ve hat akımı arasında dönüşüm.",
          },
          {
            slug: "kompanzasyon-hesaplama",
            href: "/kompanzasyon-hesaplama",
            title: "Kompanzasyon",
            icon: "capacitance",
            formula: "Qc = P(tan φ1 − tan φ2)",
            description: "Güç faktörü düzeltmesi için kVAr ve kondansatör µF değeri.",
          },
          {
            slug: "motor-devir-hesaplama",
            href: "/motor-devir-hesaplama",
            title: "Motor Devri",
            icon: "speed",
            formula: "ns = 120 f / p",
            description: "Kutup sayısı ve frekanstan senkron devir ve kayma.",
          },
          {
            slug: "direnc-renk-kodu",
            href: "/direnc-renk-kodu",
            title: "Direnç Renk Kodu",
            icon: "resistance",
            description: "4, 5 ve 6 bantlı dirençlerde renkten değer, değerden renk.",
          },
          {
            slug: "awg-mm2-cevirici",
            href: "/awg-mm2-cevirici",
            title: "AWG - mm² Çevirici",
            icon: "awgConverter",
            description: "Amerikan tel numarasını (AWG) mm² kesite ve çapa çevirin.",
          },
          {
            slug: "psu-guc-hesaplama",
            href: "/psu-guc-hesaplama",
            title: "PSU Güç Kaynağı",
            icon: "psuCalculator",
            description: "CPU, GPU ve diğer bileşenlerin gücünden güvenlik payı dahil PSU wattajını bulun.",
          },
          {
            slug: "anten-uzunlugu-hesaplama",
            href: "/anten-uzunlugu-hesaplama",
            title: "Anten Uzunluğu",
            icon: "antennaCalculator",
            description: "Frekansa göre dipol ve çeyrek dalga anten boylarını bulun.",
          },
        ],
      },
      {
        id: "basinc-ve-akiskanlar",
        title: "Akışkanlar ve Tesisat",
        description:
          "Basınç, hidrostatik yük, akış rejimi, boru çapı ve borulardaki basınç kaybı için birbirini izleyen hesaplar.",
        tools: [
          {
            slug: "basinc-kuvvet-alan",
            href: "/hesaplayicilar/basinc-kuvvet-alan",
            title: "Basınç, Kuvvet ve Alan",
            formula: "P = F / A",
            description: "Basıncı, kuvveti veya alanı gerçek birim dönüşümleriyle hesaplayın.",
          },
          {
            slug: "hidrostatik-basinc",
            href: "/hesaplayicilar/hidrostatik-basinc",
            title: "Hidrostatik Basınç",
            formula: "ΔP = ρgh",
            description: "Yoğunluk, derinlik ve yerçekimi ivmesine göre hidrostatik basınç farkını bulun.",
          },
          {
            slug: "reynolds-sayisi",
            href: "/hesaplayicilar/reynolds-sayisi",
            title: "Reynolds Sayısı",
            formula: "Re = ρ x v x D / μ",
            description: "Akış hızı ve karakteristik boyut ile yaklaşık akış rejimini değerlendirin.",
          },
          {
            slug: "boru-capi-hesaplama",
            href: "/boru-capi-hesaplama",
            title: "Boru Çapı, Debi ve Akış Hızı",
            icon: "pipeFlowCalculator",
            formula: "Q = A x v",
            description: "Debi, akış hızı veya iç çaptan birini diğer ikisinden hesaplayın.",
          },
          {
            slug: "basinc-kaybi-hesaplama",
            href: "/basinc-kaybi-hesaplama",
            title: "Basınç Kaybı",
            icon: "pressureLossCalculator",
            description: "Boru boyu, çapı, debi ve malzeme katsayısından Hazen-Williams ile basınç kaybını hesaplayın.",
          },
          {
            slug: "pompa-gucu-hesaplama",
            href: "/pompa-gucu-hesaplama",
            title: "Pompa Gücü",
            icon: "energy",
            formula: "P = ρ·g·Q·H / η",
            description: "Debi ve basma yüksekliğinden hidrolik güç, mil gücü ve motor gücü.",
          },
          {
            slug: "hidrolik-silindir-hesaplama",
            href: "/hidrolik-silindir-hesaplama",
            title: "Hidrolik Silindir",
            icon: "pressureForceArea",
            formula: "F = p · A",
            description: "İtme ve çekme kuvveti, hız, strok süresi ve yağ hacmi.",
          },
          {
            slug: "pnomatik-silindir-hesaplama",
            href: "/pnomatik-silindir-hesaplama",
            title: "Pnömatik Silindir",
            icon: "pressure",
            description: "Silindir kuvveti ve kompresörden çekilen hava tüketimi (NL/dk).",
          },
          {
            slug: "boru-capi-donusum-hesaplama",
            href: "/boru-capi-donusum-hesaplama",
            title: "Boru Çapı Dönüşümü (DN-NPS)",
            icon: "pipeNominalSizeCalculator",
            description: "DN nominal ölçüsünü NPS (inç) karşılığına ve gerçek dış çapa çevirin.",
          },
          {
            slug: "pis-su-borusu-egimi-hesaplama",
            href: "/pis-su-borusu-egimi-hesaplama",
            title: "Pis Su Borusu Eğimi",
            icon: "flowRate",
            formula: "Prandtl-Colebrook",
            description: "Atık su borusunun eğime göre kapasitesi ve gereken en az eğim.",
          },
          {
            slug: "tank-hacmi-hesaplama",
            href: "/tank-hacmi-hesaplama",
            title: "Tank Hacmi ve Doluluk",
            icon: "flowRate",
            formula: "V = A(h) × L",
            description: "Yatay, dikey ve dikdörtgen tankta seviyeye göre litre; ölçü çubuğu tablosu.",
          },
        ],
      },
      {
        id: "isi-transferi",
        title: "Isı ve Termodinamik",
        description:
          "Enerji miktarı, ısı iletimi, sıcaklıkla boyut değişimi ve soğutma devresi ölçümleri.",
        tools: [
          {
            slug: "isi-enerjisi",
            href: "/hesaplayicilar/isi-enerjisi",
            title: "Isı Enerjisi",
            formula: "Q = m x c x ΔT",
            description: "Isı enerjisini, kütleyi, özgül ısıyı veya sıcaklık farkını SI tabanında hesaplayın.",
          },
          {
            slug: "isi-iletimi",
            href: "/hesaplayicilar/isi-iletimi",
            title: "Isı İletimi",
            formula: "Qdot = k x A x ΔT / L",
            description: "Malzeme iletkenliği, alan ve kalınlık üzerinden ısı geçiş hızını karşılaştırın.",
          },
          {
            slug: "isil-genlesme-hesaplama",
            href: "/isil-genlesme-hesaplama",
            title: "Isıl Genleşme",
            icon: "thermalExpansionCalculator",
            formula: "ΔL = α x L x ΔT",
            description: "Sıcaklık değişimiyle boy uzamasını malzemeye göre hesaplayın.",
          },
          {
            slug: "u-degeri-hesaplama",
            href: "/u-degeri-hesaplama",
            title: "U Değeri",
            icon: "insulationCalculator",
            formula: "U = 1 / ΣR",
            description: "Katmanlı duvar, çatı ve döşemenin U değeri ve ısı kaybı.",
          },
          {
            slug: "lmtd-hesaplama",
            href: "/lmtd-hesaplama",
            title: "LMTD ve Eşanjör Alanı",
            icon: "temperature",
            formula: "A = Q / (U·LMTD)",
            description: "Karşı ve paralel akışlı ısı eşanjöründe LMTD ve gereken alan.",
          },
          {
            slug: "debi-isi-yuku-hesaplama",
            href: "/debi-isi-yuku-hesaplama",
            title: "Debiden Isı Yükü",
            icon: "flowRate",
            formula: "Q = ṁ·cp·ΔT",
            description: "Hava ve su debisinden ısıtma-soğutma gücü ya da gereken debi.",
          },
          {
            slug: "su-ozellikleri-tablosu",
            href: "/su-ozellikleri-tablosu",
            title: "Su Özellikleri Tablosu",
            icon: "flowRate",
            formula: "ρ, μ, cp (0–100 °C)",
            description: "Sıcaklığa göre suyun yoğunluğu, viskozitesi, özgül ısısı ve buhar basıncı.",
          },
          {
            slug: "doymus-buhar-tablosu",
            href: "/doymus-buhar-tablosu",
            title: "Doymuş Buhar Tablosu",
            icon: "temperature",
            formula: "p ↔ Tsat, hfg",
            description: "Basınç veya sıcaklıktan doyma değerleri, entalpi ve özgül hacim.",
          },
          {
            slug: "suyun-kaynama-noktasi-hesaplama",
            href: "/suyun-kaynama-noktasi-hesaplama",
            title: "Suyun Kaynama Noktası",
            icon: "mountainsHubCalculator",
            formula: "Tb = f(p rakım)",
            description: "Rakıma ya da hava basıncına göre kaynama sıcaklığı; 81 il tablosu.",
          },
          {
            slug: "hava-ozellikleri-tablosu",
            href: "/hava-ozellikleri-tablosu",
            title: "Hava Özellikleri Tablosu",
            icon: "densityAltitudeCalculator",
            formula: "ρ = p / (R·T)",
            description: "Sıcaklık ve rakıma göre havanın yoğunluğu, viskozitesi ve özgül ısısı.",
          },
          {
            slug: "superheat-subcooling-hesaplama",
            href: "/superheat-subcooling-hesaplama",
            title: "Superheat ve Subcooling",
            icon: "superheatSubcoolingCalculator",
            description: "Ölçülen boru sıcaklığı ve doyma sıcaklığından superheat ve subcooling değerlerini bulun.",
          },
          {
            slug: "erime-kaynama-noktasi-hesaplama",
            href: "/erime-kaynama-noktasi-hesaplama",
            title: "Erime ve Kaynama Noktası",
            icon: "elementMeltingBoilingCalculator",
            description: "27 elementin erime ve kaynama noktalarını °C, °F ve K cinsinden görün.",
          },
        ],
      },
      {
        id: "makine-ve-imalat",
        title: "Makine ve İmalat",
        description:
          "Bağlantı elemanları, talaşlı imalat, kaynak ve yük altındaki uzama için atölye hesapları.",
        tools: [
          {
            slug: "civata-torku-hesaplama",
            href: "/civata-torku-hesaplama",
            title: "Cıvata Torku",
            icon: "boltTorqueCalculator",
            description: "Cıvata ölçüsü ve dayanım sınıfından önerilen sıkma torkunu ve tahmini sıkma kuvvetini hesaplayın.",
          },
          {
            slug: "metrik-vida-tablosu",
            href: "/metrik-vida-tablosu",
            title: "Metrik Vida ve Kılavuz Matkap",
            icon: "boltTorqueCalculator",
            formula: "matkap ≈ d − P",
            description: "M1–M64 adım, kılavuz matkap, geçiş deliği, anahtar ağzı ve alyan ölçüleri.",
          },
          {
            slug: "civata-mukavemet-siniflari",
            href: "/civata-mukavemet-siniflari",
            title: "Cıvata Mukavemet Sınıfları",
            icon: "boltTorqueCalculator",
            formula: "F = As × Rm",
            description: "8.8, 10.9, 12.9 ne demek; ölçüye göre kopma, akma ve deneme yükü.",
          },
          {
            slug: "boru-disi-olculeri",
            href: "/boru-disi-olculeri",
            title: "Boru Dişi Ölçüleri",
            icon: "flowRate",
            description: "BSP (G, R) ve NPT dış çap, diş sayısı ve DN karşılığı; dişi ölçerek tanıma.",
          },
          {
            slug: "kesme-hizi-devir-hesaplama",
            href: "/kesme-hizi-devir-hesaplama",
            title: "Kesme Hızı - Devir",
            icon: "cuttingSpeedCalculator",
            description: "Takım çapı ve kesme hızından torna ve freze devrini bulun.",
          },
          {
            slug: "kaynak-amperaji-hesaplama",
            href: "/kaynak-amperaji-hesaplama",
            title: "Kaynak Amperajı",
            icon: "weldingCurrentCalculator",
            description: "Elektrot çekirdek çapı ve örtü tipine göre önerilen kaynak akımı aralığını bulun.",
          },
          {
            slug: "kaynak-isi-girdisi-hesaplama",
            href: "/kaynak-isi-girdisi-hesaplama",
            title: "Kaynak Isı Girdisi",
            icon: "heatInputCalculator",
            description: "Akım, gerilim ve ilerleme hızından kaynak ısı girdisini (kJ/mm) bulun.",
          },
          {
            slug: "elastik-uzama-hesaplama",
            href: "/elastik-uzama-hesaplama",
            title: "Elastik Uzama",
            icon: "elongationCalculator",
            formula: "ΔL = F x L / (A x E)",
            description: "Kuvvet, kesit ve elastisite modülünden çubuktaki uzamayı hesaplayın.",
          },
        ],
      },
      {
        id: "statik-mukavemet",
        title: "Statik ve Mukavemet",
        description:
          "Kiriş sehimi ve momenti, kesit özellikleri, burkulma ve mil burulması; çelik profil tablolarıyla birlikte çalışır.",
        tools: [
          {
            slug: "kiris-hesaplama",
            href: "/kiris-hesaplama",
            title: "Kiriş Hesabı",
            icon: "pressureForceArea",
            formula: "δ = PL³ / 48EI",
            description: "Basit mesnetli, konsol ve ankastre kirişte sehim, moment ve gerilme.",
          },
          {
            slug: "atalet-momenti-hesaplama",
            href: "/atalet-momenti-hesaplama",
            title: "Atalet Momenti",
            icon: "geometryCalculator",
            formula: "I = bh³ / 12",
            description: "Dikdörtgen, daire, boru, kutu ve I kesitin atalet momenti ve kesit modülü.",
          },
          {
            slug: "burkulma-hesaplama",
            href: "/burkulma-hesaplama",
            title: "Burkulma Hesabı",
            icon: "force",
            formula: "Pcr = π²EI / (KL)²",
            description: "Euler kritik yükü, burkulma boyu ve narinlik.",
          },
          {
            slug: "mil-burulma-hesaplama",
            href: "/mil-burulma-hesaplama",
            title: "Mil Burulma Hesabı",
            icon: "torque",
            formula: "τ = 16T / πd³",
            description: "Güç ve devirden tork, kayma gerilmesi, burulma açısı ve mil çapı.",
          },
        ],
      },
      {
        id: "malzeme",
        title: "Malzeme",
        description:
          "Metal, polimer, ahşap, yapı malzemesi ve sıvıların yoğunluk ve mühendislik özellikleri ile bunlara dayalı ağırlık hesapları.",
        tools: [
          {
            slug: "malzeme-ozellikleri",
            href: "/malzeme-ozellikleri",
            title: "Malzeme Özellikleri",
            icon: "materialsHubCalculator",
            description: "100'den fazla malzemenin yoğunluk, ısıl iletkenlik ve elastisite değerleri.",
          },
          {
            slug: "malzeme-agirligi-hesaplama",
            href: "/malzeme-agirligi-hesaplama",
            title: "Malzeme Ağırlığı",
            icon: "materialWeightCalculator",
            formula: "m = ρ x V",
            description: "Malzeme ve hacimden ağırlığı, ağırlıktan hacmi hesaplayın.",
          },
          {
            slug: "demir-agirlik-hesaplama",
            href: "/demir-agirlik-hesaplama",
            title: "İnşaat Demiri Ağırlığı",
            icon: "materialWeightCalculator",
            formula: "kg/m = π/4 x d² x 7850",
            description: "Çap, boy ve adetten demir tonajını; 1 tonun kaç metre ettiğini hesaplayın.",
          },
          {
            slug: "sac-agirlik-hesaplama",
            href: "/sac-agirlik-hesaplama",
            title: "Sac Ağırlığı",
            icon: "materialWeightCalculator",
            description: "Levha ölçüsü, kalınlık ve malzemeden sac ağırlığını ve kg/m² değerini bulun.",
          },
          {
            slug: "boru-agirlik-hesaplama",
            href: "/boru-agirlik-hesaplama",
            title: "Boru Ağırlığı",
            icon: "pipeNominalSizeCalculator",
            description: "Dış çap ve et kalınlığından borunun boş ve su dolu metre ağırlığını hesaplayın.",
          },
          {
            slug: "kutu-profil-agirlik-hesaplama",
            href: "/kutu-profil-agirlik-hesaplama",
            title: "Kutu Profil Ağırlığı",
            icon: "materialWeightCalculator",
            description: "Kare ve dikdörtgen profilin metre ağırlığını köşe yarıçapı etkisiyle bulun.",
          },
          {
            slug: "celik-profil-tablolari",
            href: "/celik-profil-tablolari",
            title: "Çelik Profil Tabloları",
            icon: "materialWeightCalculator",
            description: "IPE, HEA, HEB, HEM, NPU ve NPI profillerin ölçü, ağırlık ve kesit değerleri.",
          },
          {
            slug: "sertlik-donusum-hesaplama",
            href: "/sertlik-donusum-hesaplama",
            title: "Sertlik Dönüşümü",
            icon: "hardnessConversionCalculator",
            description: "Brinell, Vickers ve Rockwell sertlik değerlerini yaklaşık olarak birbirine çevirin.",
          },
        ],
      },
      {
        id: "insaat",
        title: "İnşaat",
        description: "Şantiyede malzeme siparişi ve metraj için kullanılan miktar hesapları.",
        tools: [
          {
            slug: "beton-hesaplama",
            href: "/beton-hesaplama",
            title: "Beton Hesaplama",
            icon: "concreteCalculator",
            description: "Döşeme, kolon ve temel için beton hacmini ve malzeme miktarını bulun.",
          },
          {
            slug: "tugla-hesaplama",
            href: "/tugla-hesaplama",
            title: "Tuğla Hesaplama",
            icon: "brickCalculator",
            description: "Duvar alanı ve tuğla ölçüsünden derz payı ve fire dahil tuğla adedini hesaplayın.",
          },
          {
            slug: "siva-hesaplama",
            href: "/siva-hesaplama",
            title: "Sıva Hesaplama",
            icon: "plasterCalculator",
            description: "Yüzey alanı ve kalınlığa göre sıva miktarını bulun.",
          },
          {
            slug: "hafriyat-hesaplama",
            href: "/hafriyat-hesaplama",
            title: "Hafriyat ve Kazı",
            icon: "excavationCalculator",
            description: "Kazı hacmini, gevşeme payı eklenmiş hacmi ve gereken kamyon sayısını hesaplayın.",
          },
          {
            slug: "merdiven-hesaplama",
            href: "/merdiven-hesaplama",
            title: "Merdiven Hesaplama",
            icon: "stairCalculator",
            description: "Toplam yükseklikten basamak sayısını, rıht yüksekliğini ve Blondel kuralıyla basamak derinliğini bulun.",
          },
          {
            slug: "kereste-hesaplama",
            href: "/kereste-hesaplama",
            title: "Kereste Metreküp",
            icon: "keresteCalculator",
            description: "Kereste ölçülerinden metreküp hacmini hesaplayın.",
          },
        ],
      },
      {
        id: "isitma-sogutma",
        title: "Isıtma ve Soğutma",
        description:
          "Klima kapasitesi, ısı yalıtımı ve ısıtma enerjisi tüketimiyle ilgili hesaplar.",
        tools: [
          {
            slug: "klima-btu-hesaplama",
            href: "/klima-btu-hesaplama",
            title: "Klima BTU Hesaplama",
            icon: "acCapacityCalculator",
            description: "Oda alanı ve koşullarına göre gereken klima kapasitesini bulun.",
          },
          {
            slug: "petek-dilim-hesaplama",
            href: "/petek-dilim-hesaplama",
            title: "Petek Dilim Hesabı",
            icon: "temperature",
            formula: "Φ = Φ50 × (ΔT/49,83)ⁿ",
            description: "Odanın ısı kaybından dilim sayısı ve panel boyu; su sıcaklığına göre EN 442 düzeltmesi.",
          },
          {
            slug: "kombi-kac-kw-hesaplama",
            href: "/kombi-kac-kw-hesaplama",
            title: "Kombi Kaç kW Olmalı?",
            icon: "flowRate",
            formula: "P = Q/60 × 4,186 × ΔT",
            description: "Isıtma ve sıcak su ihtiyacından kombi gücü; kombinin dakikada verdiği sıcak su.",
          },
          {
            slug: "mantolama-hesaplama",
            href: "/mantolama-hesaplama",
            title: "Mantolama Hesaplama",
            icon: "insulationCalculator",
            description: "Dış cephe alanı ve levha ebadından fire dahil yalıtım levhası adedini hesaplayın.",
          },
          {
            slug: "dogalgaz-tuketimi-hesaplama",
            href: "/dogalgaz-tuketimi-hesaplama",
            title: "Doğalgaz Tüketimi",
            icon: "naturalGasCalculator",
            description: "Tüketilen m³ ve birim fiyattan toplam maliyeti ve yaklaşık kWh karşılığını bulun.",
          },
          {
            slug: "isi-pompasi-kombi-karsilastirma",
            href: "/isi-pompasi-kombi-karsilastirma",
            title: "Isı Pompası - Kombi",
            icon: "heatPumpVsBoilerCalculator",
            description: "Isı pompasının kombiye göre kendini kaç yılda çıkardığını hesaplayın.",
          },
          {
            slug: "yalitim-amortisman-hesaplama",
            href: "/yalitim-amortisman-hesaplama",
            title: "Yalıtım Amortismanı",
            icon: "insulationPaybackCalculator",
            description: "Yalıtım yatırımının kendini kaç yılda geri ödediğini hesaplayın.",
          },
        ],
      },
    ],
    guidesTitle: "İlgili birim dönüşümleri ve rehberler",
    guideLinks: [
      { href: "/kategoriler/basinc", label: "Basınç dönüşümleri" },
      { href: "/kategoriler/guc", label: "Güç dönüşümleri" },
      { href: "/kategoriler/enerji", label: "Enerji dönüşümleri" },
      { href: "/kategoriler/tork", label: "Tork dönüşümleri" },
      { href: "/kategoriler/kuvvet", label: "Kuvvet dönüşümleri" },
      { href: "/kategoriler/debi", label: "Debi dönüşümleri" },
      { href: "/kategoriler/viskozite", label: "Viskozite dönüşümleri" },
      { href: "/kategoriler/isil-iletkenlik", label: "Isıl iletkenlik dönüşümleri" },
      { href: "/kategoriler/elektrik", label: "Elektrik birimi dönüşümleri" },
      { href: "/birimler/pascal", label: "Pascal (Pa) rehberi" },
      { href: "/birimler/newton-metre", label: "Newton metre (N·m) rehberi" },
      { href: "/birimler/watt", label: "Watt (W) rehberi" },
    ],
    relatedToolsTitle: "İlgili sayfalar",
    relatedToolsLinks: [
      { href: "/hesaplayicilar#teknik", label: "Teknik ve Mühendislik Araçları" },
      { href: "/hesaplayicilar#matematik", label: "Matematik ve Kimya Hesaplayıcıları" },
    ],
    alternateTitle: "Diğer diller",
    alternateLink: {
      href: "/en/engineering-calculators",
      hrefLang: "en",
      label: "English version",
    },
  },
  en: {
    breadcrumbAriaLabel: "Breadcrumb",
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Engineering Calculators" },
    ],
    title: "Engineering Calculators",
    description:
      "Cable size and voltage drop, pipe pressure loss, heat conduction, beam deflection, shaft torsion and dimensionless-number calculators, each showing the formula behind the result.",
    focusTitle: "Engineering sections",
    focusCards: [
      {
        href: getElectricalHubPath("en"),
        title: "Electrical Calculators",
        description:
          "Cable sizing, voltage-drop checks and power-current conversion.",
        iconName: "energy",
        meta: "Dedicated hub",
      },
      {
        href: "/en/engineering-calculators/fluids-piping",
        title: "Fluids & Piping",
        description:
          "Pipe flow, internal velocity, pressure drop and pump power.",
        iconName: "flowRate",
        meta: "Dedicated hub",
      },
      {
        href: "/en/engineering-calculators/dimensionless-numbers",
        title: "Dimensionless Numbers",
        description:
          "Focused calculators for Reynolds, Prandtl and the physical ratios behind flow and heat transfer.",
        iconName: "temperature",
        meta: "Dedicated hub",
      },
      {
        href: "/en/engineering-calculators/heat-transfer",
        title: "Heat Transfer",
        description:
          "Thermal energy, conduction, expansion and heat transfer.",
        iconName: "temperature",
        meta: "Dedicated hub",
      },
      {
        href: "/en/engineering-calculators/mechanics-materials",
        title: "Mechanics & Materials",
        description:
          "Stress and strain, beam deflection, shaft torsion and buckling.",
        iconName: "pressure",
        meta: "Dedicated hub",
      },
    ],
    groups: [
      {
        id: "pressure-and-fluids",
        title: "Pressure and Fluids",
        description:
          "Core tools for pressure relationships, hydrostatic loading and internal flow screening.",
        tools: [
          {
            slug: "pipe-flow-calculator",
            href: "/en/engineering-calculators/fluids-piping/pipe-flow-calculator",
            title: "Pipe Flow Rate & Velocity",
            formula: "Q = A x v",
            description:
              "Solve volumetric flow rate, mean velocity or internal pipe diameter with metric and Imperial units.",
          },
          {
            slug: "pressure-force-area",
            href: "/en/calculators/pressure-force-area",
            title: "Pressure, Force and Area",
            formula: "P = F / A",
            description:
              "Calculate pressure, force or area with proper engineering unit conversions.",
          },
          {
            slug: "hydrostatic-pressure",
            href: "/en/calculators/hydrostatic-pressure",
            title: "Hydrostatic Pressure",
            formula: "\u0394P = \u03c1gh",
            description:
              "Find hydrostatic pressure difference from density, depth and gravitational acceleration.",
          },
          {
            slug: "reynolds-number",
            href: "/en/calculators/reynolds-number",
            title: "Reynolds Number",
            formula: "Re = \u03c1 x v x D / \u03bc",
            description:
              "Estimate the flow regime from density, velocity, characteristic size and viscosity.",
          },
        ],
      },
      {
        id: "heat-transfer",
        title: "Heat Transfer",
        description:
          "Thermal tools for stored energy, conduction rate and material comparison.",
        tools: [
          {
            slug: "heat-energy",
            href: "/en/calculators/heat-energy",
            title: "Heat Energy",
            formula: "Q = m x c x \u0394T",
            description:
              "Solve for heat energy, mass, specific heat or temperature difference on an SI basis.",
          },
          {
            slug: "heat-conduction",
            href: "/en/calculators/heat-conduction",
            title: "Heat Conduction",
            formula: "Qdot = k x A x \u0394T / L",
            description:
              "Compare conduction rate from conductivity, area, temperature difference and thickness.",
          },
          {
            slug: "thermal-expansion",
            href: "/en/calculators/thermal-expansion",
            title: "Thermal Expansion",
            formula: "\u0394L = L\u2080 x \u03b1 x \u0394T",
            description:
              "Estimate a material's unconstrained length change from a temperature swing.",
          },
          {
            slug: "elastic-elongation",
            href: "/en/calculators/elastic-elongation",
            title: "Elastic Elongation",
            formula: "\u0394L = F x L\u2080 / (A x E)",
            description:
              "Estimate axial stress and linear-elastic elongation for a uniform member.",
          },
        ],
      },
      {
        id: "dimensionless-numbers",
        title: "Dimensionless Numbers",
        description:
          "Focused ratios for screening flow regime, diffusion and heat-transfer behavior before applying a correlation.",
        tools: [
          {
            slug: "reynolds-number",
            href: "/en/calculators/reynolds-number",
            title: "Reynolds Number",
            formula: "Re = ρ x v x L / μ",
            description:
              "Compare inertial and viscous effects, with an internal-flow regime interpretation.",
          },
          {
            slug: "prandtl-number-calculator",
            href: "/en/engineering-calculators/dimensionless-numbers/prandtl-number-calculator",
            title: "Prandtl Number",
            formula: "Pr = μ x Cp / k",
            description:
              "Compare momentum and thermal diffusion from fluid properties or diffusivities.",
          },
          {
            slug: "biot-number-calculator",
            href: "/en/engineering-calculators/dimensionless-numbers/biot-number-calculator",
            title: "Biot Number",
            formula: "Bi = h x Lc / ks",
            description:
              "Screen internal versus surface thermal resistance before a transient lumped-capacitance estimate.",
          },
          {
            slug: "fourier-number-calculator",
            href: "/en/engineering-calculators/dimensionless-numbers/fourier-number-calculator",
            title: "Fourier Number",
            formula: "Fo = α x t / L²",
            description:
              "Calculate dimensionless time for a transient-conduction problem.",
          },
          {
            slug: "nusselt-number-calculator",
            href: "/en/engineering-calculators/dimensionless-numbers/nusselt-number-calculator",
            title: "Nusselt Number",
            formula: "Nu = h x L / k",
            description:
              "Solve Nusselt number or convection coefficient, with a scope-checked turbulent-pipe correlation mode.",
          },
          {
            slug: "mach-number-calculator",
            href: "/en/engineering-calculators/dimensionless-numbers/mach-number-calculator",
            title: "Mach Number",
            formula: "M = V / a",
            description:
              "Calculate speed relative to the local speed of sound using a known value or an ideal-gas model.",
          },
          {
            slug: "froude-number-calculator",
            href: "/en/engineering-calculators/dimensionless-numbers/froude-number-calculator",
            title: "Froude Number",
            formula: "Fr = V / √(gD)",
            description:
              "Screen shallow-water and open-channel flow as subcritical, critical or supercritical.",
          },
          {
            slug: "grashof-number-calculator",
            href: "/en/engineering-calculators/dimensionless-numbers/grashof-number-calculator",
            title: "Grashof Number",
            formula: "Gr = gβΔTL³ / ν²",
            description:
              "Compare buoyancy and viscous effects before selecting a natural-convection correlation.",
          },
          {
            slug: "rayleigh-number-calculator",
            href: "/en/engineering-calculators/dimensionless-numbers/rayleigh-number-calculator",
            title: "Rayleigh Number",
            formula: "Ra = Gr x Pr",
            description:
              "Combine buoyancy, viscous and thermal-diffusion effects for natural-convection screening.",
          },
        ],
      },
      {
        id: "electricity",
        title: "Electricity",
        description:
          "Circuit tools built around voltage, current and resistance.",
        tools: [
          {
            slug: "kw-to-amper-hesaplama",
            href: "/en/engineering-calculators/electrical-calculators/kw-to-ampere-calculator",
            title: "kW to Ampere",
            formula: "I = P / (\u221a3 x V x cos phi x eta)",
            description:
              "Convert power into approximate line current for three-phase, single-phase and DC systems.",
          },
          {
            slug: "amper-to-kw-hesaplama",
            href: "/en/engineering-calculators/electrical-calculators/ampere-to-kw-calculator",
            title: "Ampere to kW",
            formula: "P = \u221a3 x V x I x cos phi x eta",
            description:
              "Convert line current into approximate power for three-phase, single-phase and DC systems.",
          },
          {
            slug: "ohms-law",
            href: "/en/calculators/ohms-law",
            title: "Ohm's Law",
            formula: "V = I x R",
            description:
              "Calculate voltage, current or resistance for basic electrical circuit checks.",
          },
        ],
      },
    ],
    guidesTitle: "Related unit guides",
    guideLinks: [
      { href: "/en/units/pascal", label: "Pascal (Pa) guide" },
      { href: "/en/units/meter", label: "Meter (m) guide" },
      { href: "/en/units/kilogram", label: "Kilogram (kg) guide" },
    ],
    alternateTitle: "Other languages",
    alternateLink: {
      href: "/muhendislik-hesaplayicilari",
      hrefLang: "tr",
      label: "Turkish version",
    },
  },
  de: {
    breadcrumbAriaLabel: "Breadcrumb",
    breadcrumbs: [
      { label: "Startseite", href: "/de" },
      { label: "Ingenieurrechner" },
    ],
    title: "Ingenieurrechner",
    description:
      "Rechner für Kabelquerschnitt und Spannungsfall, Druckverlust in Rohren, Wärmeleitung und Strömung, jeweils mit der Formel hinter dem Ergebnis.",
    focusTitle: "Ingenieurbereiche",
    focusCards: [
      {
        href: getElectricalHubPath("de"),
        title: "Elektrorechner",
        description:
          "Kabeldimensionierung, Spannungsfall und Leistungs-Strom-Umrechnung.",
        iconName: "energy",
        meta: "Bereich",
      },
      {
        href: "#druck-und-stromung",
        title: "Druck und Strömung",
        description:
          "Aktuelle Werkzeuge für Druckbeziehungen, hydrostatische Lasten und Strömungsprüfungen.",
        iconName: "pressure",
        meta: "Aktuelle Gruppe",
      },
      {
        href: "#warmeubertragung",
        title: "Wärmeübertragung",
        description:
          "Aktuelle thermische Gruppe für Wärmeenergie und Wärmeleitung.",
        iconName: "temperature",
        meta: "Aktuelle Gruppe",
      },
    ],
    groups: [
      {
        id: "druck-und-stromung",
        title: "Druck und Strömung",
        description:
          "Werkzeuge für Druckbeziehungen, hydrostatische Lasten und erste Strömungsbewertungen in Leitungen.",
        tools: [
          {
            slug: "druck-kraft-flaeche",
            href: "/de/rechner/druck-kraft-flaeche",
            title: "Druck, Kraft und Fläche",
            formula: "P = F / A",
            description:
              "Berechnen Sie Druck, Kraft oder Fläche mit technischen Einheiten und SI-Bezug.",
          },
          {
            slug: "hydrostatischer-druck",
            href: "/de/rechner/hydrostatischer-druck",
            title: "Hydrostatischer Druck",
            formula: "\u0394P = \u03c1gh",
            description:
              "Berechnen Sie hydrostatische Druckdifferenz, Dichte, Tiefe oder Erdbeschleunigung.",
          },
          {
            slug: "reynolds-zahl",
            href: "/de/rechner/reynolds-zahl",
            title: "Reynolds-Zahl",
            formula: "Re = \u03c1 x v x D / \u03bc",
            description:
              "Bewerten Sie das Strömungsregime über Dichte, Geschwindigkeit, Durchmesser und Viskosität.",
          },
        ],
      },
      {
        id: "warmeubertragung",
        title: "Wärmeübertragung",
        description:
          "Werkzeuge für gespeicherte Wärmeenergie, Wärmeleitung und thermische Materialvergleiche.",
        tools: [
          {
            slug: "waermeenergie",
            href: "/de/rechner/waermeenergie",
            title: "Wärmeenergie",
            formula: "Q = m x c x \u0394T",
            description:
              "Berechnen Sie Wärmeenergie, Masse, spezifische Wärmekapazität oder Temperaturdifferenz.",
          },
          {
            slug: "waermeleitung",
            href: "/de/rechner/waermeleitung",
            title: "Wärmeleitung",
            formula: "Qdot = k x A x \u0394T / L",
            description:
              "Vergleichen Sie Wärmestrom aus Leitfähigkeit, Fläche, Temperaturdifferenz und Schichtdicke.",
          },
        ],
      },
      {
        id: "elektrizitat",
        title: "Elektrizität",
        description:
          "Werkzeuge für Spannung, Strom und Widerstand.",
        tools: [
          {
            slug: "kw-to-amper-hesaplama",
            href: "/de/ingenieurrechner/elektrorechner/kw-zu-ampere-rechner",
            title: "kW-zu-Ampere",
            formula: "I = P / (\u221a3 x V x cos phi x eta)",
            description:
              "Wandeln Sie Leistung für Dreiphasen-, Einphasen- und DC-Systeme in einen näherungsweisen Leitungsstrom um.",
          },
          {
            slug: "amper-to-kw-hesaplama",
            href: "/de/ingenieurrechner/elektrorechner/ampere-zu-kw-rechner",
            title: "Ampere-zu-kW",
            formula: "P = \u221a3 x V x I x cos phi x eta",
            description:
              "Wandeln Sie Leitungsstrom für Dreiphasen-, Einphasen- und DC-Systeme in eine näherungsweise Leistung um.",
          },
          {
            slug: "ohms-law",
            href: "/de/rechner/ohms-law",
            title: "Ohmsches Gesetz",
            formula: "V = I x R",
            description:
              "Berechnen Sie Spannung, Strom oder Widerstand für grundlegende Elektrokontrollen.",
          },
        ],
      },
    ],
    guidesTitle: "Passende Einheitenleitfaden",
    guideLinks: [
      { href: "/de/einheiten/pascal", label: "Pascal (Pa) Leitfaden" },
      { href: "/de/einheiten/meter", label: "Meter (m) Leitfaden" },
      { href: "/de/einheiten/kilogramm", label: "Kilogramm (kg) Leitfaden" },
    ],
    relatedToolsTitle: "Alltagsrechner",
    relatedToolsLinks: germanStandaloneTools.map((tool) => ({
      href: tool.germanPath,
      label: tool.title,
    })),
    alternateTitle: "Weitere Sprachen",
    alternateLink: {
      href: "/en/engineering-calculators",
      hrefLang: "en",
      label: "English version",
    },
  },
};

export function getEngineeringHubContent(locale: Locale) {
  return contentByLocale[locale];
}

export function getEngineeringHubCollectionItems(locale: Locale) {
  return contentByLocale[locale].groups.flatMap((group) => group.tools);
}

export default function EngineeringHubPage({
  locale,
}: {
  locale: Locale;
}) {
  const content = getEngineeringHubContent(locale);

  return (
    <main className="unit-information-page" lang={locale}>
      <article className="unit-page-shell">
        <nav className="breadcrumbs" aria-label={content.breadcrumbAriaLabel}>
          {content.breadcrumbs.map((item, index) => (
            <span key={`${item.label}-${index}`}>
              {index > 0 ? <span aria-hidden="true"> &rsaquo; </span> : null}
              {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
            </span>
          ))}
        </nav>

        <header className="unit-page-header">
          <h1>{content.title}</h1>
          <p>{content.description}</p>
        </header>

        <div className="unit-page-content">
          <div className="section-layout">
            <nav className="section-nav" aria-label={content.focusTitle}>
              <p className="section-nav-title">{content.focusTitle}</p>
              <ul>
                {content.focusCards
                  .filter((card) => !card.href.startsWith("#"))
                  .map((card) => (
                    <li key={card.href}>
                      <Link href={card.href}>{card.title}</Link>
                    </li>
                  ))}
                {content.groups.map((group) => (
                  <li key={group.id}>
                    <a href={`#${group.id}`}>
                      {group.title} <span>{group.tools.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="section-main">
              {content.groups.map((group) => (
                <section className="tool-list-section" id={group.id} key={group.title}>
                  <h2>{group.title}</h2>
                  <p className="tool-list-lead">{group.description}</p>
                  <ul className="tool-list">
                    {group.tools.map((tool) => (
                      <li key={tool.href}>
                        <Link href={tool.href} className="tool-list-title">
                          {tool.title}
                        </Link>
                        <span className="tool-list-kind">{toolKind(tool.slug, locale)}</span>
                        <p>
                          {tool.description}
                          {tool.formula ? <code className="tool-list-formula">{tool.formula}</code> : null}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>

          <section className="conversion-section">
            <h2>{content.guidesTitle}</h2>
            <ul className="related-conversion-list engineering-hub-guides">
              {content.guideLinks.map((guide) => (
                <li key={guide.href}>
                  <Link href={guide.href}>{guide.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          {content.relatedToolsLinks && content.relatedToolsLinks.length > 0 && (
            <section className="conversion-section">
              <h2>{content.relatedToolsTitle}</h2>
              <ul className="related-conversion-list engineering-hub-guides">
                {content.relatedToolsLinks.map((tool) => (
                  <li key={tool.href}>
                    <Link href={tool.href}>{tool.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="conversion-section language-alternatives">
            <h2>{content.alternateTitle}</h2>
            <Link
              className="text-link"
              href={content.alternateLink.href}
              hrefLang={content.alternateLink.hrefLang}
            >
              {content.alternateLink.label}
            </Link>
          </section>
        </div>
      </article>
    </main>
  );
}
