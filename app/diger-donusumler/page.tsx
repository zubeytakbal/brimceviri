import type { Metadata } from "next";
import OtherCategoriesPage from "../components/OtherCategoriesPage";
import { getCategoryIconName } from "../components/siteIcons";
import { categoryPages } from "../converter/categoryPages";
import { conversionPages } from "../converter/conversionPages";
import { homeCategoryOrder } from "../converter/homeCategoryOrder";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Di\u011fer D\u00f6n\u00fc\u015f\u00fcmler",
  description:
    "Yo\u011funluk, kuvvet, tork, momentum ve viskozite gibi ana sayfada yer almayan birim \u00e7evirme kategorilerini ke\u015ffedin.",
  alternates: {
    canonical: "/diger-donusumler",
    languages: {
      tr: "/diger-donusumler",
      en: "/en/other-conversions",
      "x-default": "/diger-donusumler",
    },
  },
  openGraph: {
    title: "Di\u011fer D\u00f6n\u00fc\u015f\u00fcmler",
    description:
      "Yo\u011funluk, kuvvet, tork, momentum ve viskozite gibi birim \u00e7evirme kategorilerini ke\u015ffedin.",
    url: buildSiteUrl("/diger-donusumler"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function normalizeSearchTextServer(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0131/g, "i")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export default function DigerDonusumlerPage() {
  const secondaryCategoryPages = categoryPages.filter(
    (page) =>
      !(homeCategoryOrder as readonly string[]).includes(page.category)
  );

  const secondaryCategorySet = new Set(
    secondaryCategoryPages.map((page) => page.category)
  );

  const conversions = conversionPages
    .filter((page) => secondaryCategorySet.has(page.category))
    .map((page) => ({
      id: page.slug,
      href: `/${page.slug}`,
      label: `${page.fromName} -> ${page.toName}`,
      description: `${page.fromUnit} -> ${page.toUnit}`,
      searchText: normalizeSearchTextServer(
        [
          page.fromName,
          page.toName,
          page.fromUnit,
          page.toUnit,
          page.slug,
        ].join(" ")
      ),
    }));

  const categories = secondaryCategoryPages.map((page) => ({
    id: page.category,
    href: `/kategoriler/${page.slug}`,
    title: page.title,
    description: page.description,
    iconName: getCategoryIconName(page.category),
  }));

  const tools = [
    {
      id: "elektrikli-arac-karsilastirma",
      href: "/elektrikli-arac-maliyet-karsilastirma",
      title: "Elektrikli Araç mı Benzinli Araç mı?",
      description:
        "Kendi kilometren ve fiyat farkınla elektrikli aracın kaç yılda kendini amorti ettiğini hesaplayın.",
      iconName: "evVsIceComparisonCalculator" as const,
      group: "Tasarruf ve Karar Hesaplayıcıları",
    },
    {
      id: "lpg-donusum-amortisman",
      href: "/lpg-donusum-amortisman-hesaplama",
      title: "LPG Dönüşüm Amortisman Hesaplama",
      description:
        "Kendi kilometren, tüketimin ve dönüşüm maliyetinle LPG'nin kaç yılda kendini çıkardığını hesaplayın.",
      iconName: "lpgConversionPaybackCalculator" as const,
      group: "Tasarruf ve Karar Hesaplayıcıları",
    },
    {
      id: "yalitim-amortisman",
      href: "/yalitim-amortisman-hesaplama",
      title: "Yalıtım Amortisman Hesaplama",
      description:
        "Duvar alanı ve yalıtım malzemesiyle yıllık enerji tasarrufunu ve kaç yılda kendini çıkardığını hesaplayın.",
      iconName: "insulationPaybackCalculator" as const,
      group: "Tasarruf ve Karar Hesaplayıcıları",
    },
    {
      id: "led-tasarruf",
      href: "/led-ampul-tasarruf-hesaplama",
      title: "LED Ampul Tasarruf Hesaplama",
      description:
        "Ampul sayın ve kullanım sürenle LED ampule geçişin yıllık tasarrufunu ve amortisman süresini hesaplayın.",
      iconName: "ledSavingsCalculator" as const,
      group: "Tasarruf ve Karar Hesaplayıcıları",
    },
    {
      id: "kombi-klima-karsilastirma",
      href: "/kombi-klima-isitma-maliyeti-karsilastirma",
      title: "Kombi mi Klima mı?",
      description:
        "Doğalgaz ve elektrik fiyatınla, kombi ile klimanın ısıtma maliyetini kıyaslayıp hangisinin daha ucuz olduğunu görün.",
      iconName: "heatingCostComparisonCalculator" as const,
      group: "Tasarruf ve Karar Hesaplayıcıları",
    },
    {
      id: "isi-pompasi-kombi-karsilastirma",
      href: "/isi-pompasi-kombi-karsilastirma",
      title: "Isı Pompası mı Kombi mi?",
      description:
        "Doğalgaz/elektrik fiyatın ve kurulum maliyeti farkınla, ısı pompasının kombiye göre kaç yılda kendini çıkardığını hesaplayın.",
      iconName: "heatPumpVsBoilerCalculator" as const,
      group: "Tasarruf ve Karar Hesaplayıcıları",
    },
    {
      id: "gunes-paneli-amortisman",
      href: "/gunes-paneli-amortisman-hesaplama",
      title: "Güneş Paneli Amortisman Hesaplama",
      description:
        "Sistem gücün, bölgen ve elektrik fiyatınla güneş panelinin kaç yılda kendini çıkardığını hesaplayın.",
      iconName: "solarPanelPaybackCalculator" as const,
      group: "Tasarruf ve Karar Hesaplayıcıları",
    },
    {
      id: "doviz-cevirici",
      href: "/doviz-cevirici",
      title: "Döviz Çevirici",
      description:
        "Güncel kurlarla dolar, euro, sterlin ve TL arasında anlık dönüşüm yapın.",
      iconName: "currencyConverterCalculator" as const,
      group: "Tasarruf ve Karar Hesaplayıcıları",
    },
    {
      id: "malzeme-ozellikleri",
      href: "/malzeme-ozellikleri",
      title: "Malzeme Özellikleri (Yoğunluk, Isıl İletkenlik...)",
      description:
        "100'den fazla metal, sıvı, plastik, ahşap ve yapı malzemesinin yoğunluğunu ve mühendislik özelliklerini gör, canlı birim çevirici ile dönüştür.",
      iconName: "materialsHubCalculator" as const,
      group: "Mühendislik Referans Araçları",
    },
    {
      id: "hafriyat",
      href: "/hafriyat-hesaplama",
      title: "Hafriyat ve Kazı Hesaplama",
      description:
        "Kazı hacmini, gevşeme payı eklenmiş hacmi ve gereken kamyon yükü sayısını hesaplayın.",
      iconName: "excavationCalculator" as const,
      group: "Mühendislik Referans Araçları",
    },
    {
      id: "boru-capi",
      href: "/boru-capi-hesaplama",
      title: "Boru Çapı, Debi ve Akış Hızı Hesaplama",
      description:
        "Süreklilik denklemiyle boru çapı, debi veya akış hızını hesaplayın.",
      iconName: "pipeFlowCalculator" as const,
      group: "Mühendislik Referans Araçları",
    },
    {
      id: "basinc-kaybi",
      href: "/basinc-kaybi-hesaplama",
      title: "Basınç Kaybı Hesaplama",
      description:
        "Hazen-Williams formülüyle boru hattındaki basınç kaybını hesaplayın.",
      iconName: "pressureLossCalculator" as const,
      group: "Mühendislik Referans Araçları",
    },
    {
      id: "kaynak-amperaji",
      href: "/kaynak-amperaji-hesaplama",
      title: "Kaynak Amperajı Hesaplama",
      description:
        "Elektrot çekirdek çapı ve örtü tipinden önerilen amperaj aralığını hesaplayın.",
      iconName: "weldingCurrentCalculator" as const,
      group: "Mühendislik Referans Araçları",
    },
    {
      id: "kaynak-isi-girdisi",
      href: "/kaynak-isi-girdisi-hesaplama",
      title: "Kaynak Isı Girdisi Hesaplama",
      description:
        "Voltaj, akım ve kaynak hızından ısı girdisini (kJ/mm) hesaplayın.",
      iconName: "heatInputCalculator" as const,
      group: "Mühendislik Referans Araçları",
    },
    {
      id: "kesme-hizi-devir",
      href: "/kesme-hizi-devir-hesaplama",
      title: "Kesme Hızı - Devir Hesaplama",
      description:
        "Kesme hızı, çap ve devirden ikisini girerek üçüncüsünü hesaplayın.",
      iconName: "cuttingSpeedCalculator" as const,
      group: "Mühendislik Referans Araçları",
    },
    {
      id: "superheat-subcooling",
      href: "/superheat-subcooling-hesaplama",
      title: "Superheat ve Subcooling Hesaplama",
      description:
        "Ölçülen sıcaklık ve doyma sıcaklığından superheat ve subcooling değerlerini hesaplayın.",
      iconName: "superheatSubcoolingCalculator" as const,
      group: "Mühendislik Referans Araçları",
    },
    {
      id: "anten-uzunlugu",
      href: "/anten-uzunlugu-hesaplama",
      title: "Anten Uzunluğu Hesaplama",
      description:
        "Frekanstan dipol/vertikal anten uzunluğu, ya da anten uzunluğundan rezonans frekansı hesaplayın.",
      iconName: "antennaCalculator" as const,
      group: "Mühendislik Referans Araçları",
    },
    {
      id: "malzeme-agirligi",
      href: "/malzeme-agirligi-hesaplama",
      title: "Malzeme Yoğunlukları Tablosu ve Ağırlık Hesaplama",
      description:
        "Malzeme seçip hacimden ağırlığı, ya da ağırlıktan hacmi hesaplayın.",
      iconName: "materialWeightCalculator" as const,
      group: "Mühendislik Referans Araçları",
    },
    {
      id: "awg-mm2",
      href: "/awg-mm2-cevirici",
      title: "AWG - mm² Çevirici",
      description:
        "AWG değerinden çap ve kesit alanını, ya da kesit alanından en yakın AWG değerini hesaplayın.",
      iconName: "awgConverter" as const,
      group: "Mühendislik Referans Araçları",
    },
    {
      id: "isil-genlesme",
      href: "/isil-genlesme-hesaplama",
      title: "Isıl Genleşme Hesaplama",
      description:
        "Malzeme, başlangıç uzunluğu ve sıcaklık farkından ısıl genleşme miktarını hesaplayın.",
      iconName: "thermalExpansionCalculator" as const,
      group: "Mühendislik Referans Araçları",
    },
    {
      id: "elastik-uzama",
      href: "/elastik-uzama-hesaplama",
      title: "Elastik Uzama Hesaplama",
      description:
        "Malzeme, kuvvet, kesit alanı ve uzunluktan Hooke Yasası ile gerilme ve elastik uzamayı hesaplayın.",
      iconName: "elongationCalculator" as const,
      group: "Mühendislik Referans Araçları",
    },
    {
      id: "civata-torku",
      href: "/civata-torku-hesaplama",
      title: "Cıvata Torku Hesaplama",
      description:
        "Cıvata ölçüsü ve dayanım sınıfından önerilen sıkma torkunu ve tahmini sıkma kuvvetini hesaplayın.",
      iconName: "boltTorqueCalculator" as const,
      group: "Mühendislik Referans Araçları",
    },
    {
      id: "erime-kaynama-noktasi",
      href: "/erime-kaynama-noktasi-hesaplama",
      title: "Element Erime ve Kaynama Noktası Çevirici",
      description:
        "Element seçip erime ve kaynama noktasını °C, °F ve Kelvin cinsinden aynı anda görün.",
      iconName: "elementMeltingBoilingCalculator" as const,
      group: "Mühendislik Referans Araçları",
    },
    {
      id: "sertlik-donusum",
      href: "/sertlik-donusum-hesaplama",
      title: "Sertlik Dönüşüm Hesaplama",
      description:
        "Brinell, Rockwell (C/B) veya Vickers sertlik değerini girip diğer ölçeklerdeki en yakın eşdeğerini görün.",
      iconName: "hardnessConversionCalculator" as const,
      group: "Mühendislik Referans Araçları",
    },
    {
      id: "boru-capi-donusum",
      href: "/boru-capi-donusum-hesaplama",
      title: "Boru Çapı Dönüşüm Hesaplama",
      description:
        "Nominal boru çapı (DN) seçip NPS (inç) karşılığını ve gerçek dış çapını (mm) görün.",
      iconName: "pipeNominalSizeCalculator" as const,
      group: "Mühendislik Referans Araçları",
    },
    {
      id: "mantolama",
      href: "/mantolama-hesaplama",
      title: "Mantolama Hesaplama",
      description:
        "Dış cephe alanından, fire payı dahil gereken yalıtım levhası adedini hesaplayın.",
      iconName: "insulationCalculator" as const,
      group: "İnşaat ve Yapı Malzemesi Hesaplayıcıları",
    },
    {
      id: "boya",
      href: "/boya-hesaplama",
      title: "Boya Hesaplama",
      description:
        "Oda ölçülerinden net duvar alanını ve gereken boya litresini hesaplayın.",
      iconName: "paintCalculator" as const,
      group: "İnşaat ve Yapı Malzemesi Hesaplayıcıları",
    },
    {
      id: "fayans",
      href: "/fayans-hesaplama",
      title: "Fayans Hesaplama",
      description:
        "Kaplanacak alan ve fayans ebadından, fire payı dahil gereken fayans adedini hesaplayın.",
      iconName: "tileCalculator" as const,
      group: "İnşaat ve Yapı Malzemesi Hesaplayıcıları",
    },
    {
      id: "tugla",
      href: "/tugla-hesaplama",
      title: "Tuğla Hesaplama",
      description:
        "Duvar alanı ve tuğla ölçüsünden, derz ve fire payı dahil gereken tuğla adedini hesaplayın.",
      iconName: "brickCalculator" as const,
      group: "İnşaat ve Yapı Malzemesi Hesaplayıcıları",
    },
    {
      id: "beton",
      href: "/beton-hesaplama",
      title: "Beton Hesaplama",
      description:
        "Temel, döşeme veya kolon için gereken beton hacmini, çimento torba sayısını, kum ve çakıl miktarını fire payı dahil hesaplayın.",
      iconName: "concreteCalculator" as const,
      group: "İnşaat ve Yapı Malzemesi Hesaplayıcıları",
    },
    {
      id: "siva",
      href: "/siva-hesaplama",
      title: "Sıva Hesaplama",
      description:
        "Sıvanacak alan ve kalınlığa göre gereken alçı veya çimento esaslı sıva miktarını fire payı dahil hesaplayın.",
      iconName: "plasterCalculator" as const,
      group: "İnşaat ve Yapı Malzemesi Hesaplayıcıları",
    },
    {
      id: "merdiven",
      href: "/merdiven-hesaplama",
      title: "Merdiven Hesaplama",
      description:
        "Toplam yükseklik ve istenen rıht yüksekliğine göre basamak sayısını ve Blondel formülüyle basamak derinliğini hesaplayın.",
      iconName: "stairCalculator" as const,
      group: "İnşaat ve Yapı Malzemesi Hesaplayıcıları",
    },
    {
      id: "parke",
      href: "/parke-hesaplama",
      title: "Parke Hesaplama",
      description:
        "Kaplanacak alandan, fire payı dahil gereken laminat parke paketi sayısını hesaplayın.",
      iconName: "laminateCalculator" as const,
      group: "İnşaat ve Yapı Malzemesi Hesaplayıcıları",
    },
    {
      id: "duvar-kagidi",
      href: "/duvar-kagidi-hesaplama",
      title: "Duvar Kağıdı Hesaplama",
      description:
        "Oda ölçülerinden ve rulo boyutlarından gereken duvar kağıdı rulosu sayısını hesaplayın.",
      iconName: "wallpaperCalculator" as const,
      group: "İnşaat ve Yapı Malzemesi Hesaplayıcıları",
    },
    {
      id: "emsal-kaks",
      href: "/emsal-kaks-hesaplama",
      title: "Emsal (KAKS) Hesaplama",
      description:
        "Arsa alanı ve KAKS/TAKS değerinden toplam inşaat alanı ve tahmini kat sayısını hesaplayın.",
      iconName: "zoningCalculator" as const,
      group: "İnşaat ve Yapı Malzemesi Hesaplayıcıları",
    },
    {
      id: "kereste",
      href: "/kereste-hesaplama",
      title: "Kereste Metreküp Hesaplama",
      description:
        "Kereste parçalarının boyut ve adedinden toplam hacmi ve fire dahil toplamı hesaplayın.",
      iconName: "keresteCalculator" as const,
      group: "İnşaat ve Yapı Malzemesi Hesaplayıcıları",
    },
    {
      id: "vucut-yuzey-alani",
      href: "/vucut-yuzey-alani-hesaplama",
      title: "Vücut Yüzey Alanı Hesaplama",
      description:
        "Mosteller formülüyle boy ve kilodan vücut yüzey alanını (BSA) hesaplayın.",
      iconName: "bsaCalculator" as const,
      group: "Tıbbi Skorlama Araçları",
    },
    {
      id: "kreatinin-klirensi",
      href: "/kreatinin-klirensi-hesaplama",
      title: "Kreatinin Klirensi Hesaplama",
      description:
        "Cockcroft-Gault formülüyle tahmini kreatinin klirensini hesaplayın.",
      iconName: "creatinineClearanceCalculator" as const,
      group: "Tıbbi Skorlama Araçları",
    },
    {
      id: "iv-damla-hizi",
      href: "/iv-damla-hizi-hesaplama",
      title: "IV Damla Hızı Hesaplama",
      description:
        "Hacim, süre ve damla faktöründen damla/dakika hızını hesaplayın.",
      iconName: "ivDripRateCalculator" as const,
      group: "Tıbbi Skorlama Araçları",
    },
    {
      id: "gks",
      href: "/glasgow-koma-skalasi-hesaplama",
      title: "Glasgow Koma Skalası Hesaplama",
      description:
        "Göz açma, sözel ve motor yanıttan bilinç düzeyi puanını hesaplayın.",
      iconName: "gcsCalculator" as const,
      group: "Tıbbi Skorlama Araçları",
    },
    {
      id: "apgar",
      href: "/apgar-skoru-hesaplama",
      title: "APGAR Skoru Hesaplama",
      description:
        "Yenidoğanın doğum sonrası ilk değerlendirme puanını hesaplayın.",
      iconName: "apgarCalculator" as const,
      group: "Tıbbi Skorlama Araçları",
    },
    {
      id: "cha2ds2",
      href: "/cha2ds2-vasc-skoru-hesaplama",
      title: "CHA2DS2-VASc Skoru Hesaplama",
      description:
        "Atriyal fibrilasyonda inme riski skorunu hesaplayın.",
      iconName: "cha2ds2Calculator" as const,
      group: "Tıbbi Skorlama Araçları",
    },
    {
      id: "wells",
      href: "/wells-skoru-hesaplama",
      title: "Wells Skoru Hesaplama",
      description:
        "Pulmoner emboli klinik olasılık skorunu hesaplayın.",
      iconName: "wellsScoreCalculator" as const,
      group: "Tıbbi Skorlama Araçları",
    },
    {
      id: "qsofa",
      href: "/qsofa-hesaplama",
      title: "qSOFA Hesaplama",
      description:
        "Sepsis şüphesinde hızlı yatak başı tarama puanını hesaplayın.",
      iconName: "qsofaCalculator" as const,
      group: "Tıbbi Skorlama Araçları",
    },
    {
      id: "sofa",
      href: "/sofa-skoru-hesaplama",
      title: "SOFA Skoru Hesaplama",
      description:
        "Yoğun bakımda 6 organ sisteminin yetmezlik skorunu hesaplayın.",
      iconName: "sofaCalculator" as const,
      group: "Tıbbi Skorlama Araçları",
    },
    {
      id: "meld",
      href: "/meld-skoru-hesaplama",
      title: "MELD Skoru Hesaplama",
      description:
        "Karaciğer hastalığının ciddiyet skorunu hesaplayın.",
      iconName: "meldCalculator" as const,
      group: "Tıbbi Skorlama Araçları",
    },
    {
      id: "morse",
      href: "/morse-dusme-skalasi-hesaplama",
      title: "Morse Düşme Skalası Hesaplama",
      description:
        "Hastanede düşme riski skorunu hesaplayın.",
      iconName: "morseFallScaleCalculator" as const,
      group: "Tıbbi Skorlama Araçları",
    },
    {
      id: "braden",
      href: "/braden-skalasi-hesaplama",
      title: "Braden Skalası Hesaplama",
      description:
        "Basınç yarası gelişme riski skorunu hesaplayın.",
      iconName: "bradenScaleCalculator" as const,
      group: "Tıbbi Skorlama Araçları",
    },
    {
      id: "seyir-suresi",
      href: "/seyir-suresi-hesaplama",
      title: "Seyir Süresi Hesaplama",
      description:
        "Mesafe ve hızdan, klasik navigasyon formülüyle seyir süresini hesaplayın.",
      iconName: "transitTimeCalculator" as const,
      group: "Havacılık Hesaplayıcıları",
    },
    {
      id: "yogunluk-irtifasi",
      href: "/yogunluk-irtifasi-hesaplama",
      title: "Yoğunluk İrtifası Hesaplama",
      description:
        "Basınç irtifası ve dış hava sıcaklığından yoğunluk irtifasını (density altitude) hesaplayın.",
      iconName: "densityAltitudeCalculator" as const,
      group: "Havacılık Hesaplayıcıları",
    },
    {
      id: "yan-ruzgar",
      href: "/yan-ruzgar-hesaplama",
      title: "Yan Rüzgar Bileşeni Hesaplama",
      description:
        "Rüzgar yönü, hızı ve pist yönünden yan rüzgar ve baş/kuyruk rüzgar bileşenini hesaplayın.",
      iconName: "crosswindCalculator" as const,
      group: "Havacılık Hesaplayıcıları",
    },
    {
      id: "inis-orani",
      href: "/inis-orani-hesaplama",
      title: "İniş Oranı Hesaplama",
      description:
        "Yer hızı ve iniş açısından, dakikadaki fit cinsinden iniş oranını (rate of descent) hesaplayın.",
      iconName: "descentRateCalculator" as const,
      group: "Havacılık Hesaplayıcıları",
    },
    {
      id: "agirlik-denge",
      href: "/agirlik-denge-hesaplama",
      title: "Ağırlık ve Denge Hesaplama",
      description:
        "Yük kalemlerinin ağırlığı ve kolundan, toplam ağırlık merkezini (CG) hesaplayın.",
      iconName: "weightBalanceCalculator" as const,
      group: "Havacılık Hesaplayıcıları",
    },
    {
      id: "buyuk-daire",
      href: "/buyuk-daire-mesafesi-hesaplama",
      title: "Büyük Daire Mesafesi Hesaplama",
      description:
        "İki koordinat arasındaki büyük daire mesafesini ve başlangıç rotasını hesaplayın.",
      iconName: "greatCircleCalculator" as const,
      group: "Havacılık Hesaplayıcıları",
    },
    {
      id: "vucut-yag-orani",
      href: "/vucut-yag-orani-hesaplama",
      title: "Vücut Yağ Oranı Hesaplama",
      description:
        "US Navy yöntemiyle, bant metre ölçüleriyle vücut yağ oranını hesaplayın.",
      iconName: "bodyFatCalculator" as const,
      group: "Sağlık ve Fitness Hesaplayıcıları",
    },
    {
      id: "ideal-kilo",
      href: "/ideal-kilo-hesaplama",
      title: "İdeal Kilo Hesaplama",
      description:
        "Devine formülüyle, boy ve cinsiyete göre ideal kiloyu hesaplayın.",
      iconName: "idealWeightCalculator" as const,
      group: "Sağlık ve Fitness Hesaplayıcıları",
    },
    {
      id: "bmi",
      href: "/bmi-hesaplama",
      title: "BMI Hesaplama",
      description:
        "Vücut kitle indeksini (BMI) ve günlük kalori ihtiyacını hesaplayın.",
      iconName: "bmiCalculator" as const,
      group: "Sağlık ve Fitness Hesaplayıcıları",
    },
    {
      id: "gebelik",
      href: "/gebelik-haftasi-hesaplama",
      title: "Gebelik Haftası Hesaplama",
      description:
        "Son adet tarihinden gebelik haftasını ve tahmini doğum tarihini hesaplayın.",
      iconName: "pregnancyCalculator" as const,
      group: "Sağlık ve Fitness Hesaplayıcıları",
    },
    {
      id: "uyku",
      href: "/uyku-hesaplama",
      title: "Uyku Hesaplama",
      description:
        "90 dakikalık uyku döngülerine göre ideal yatış ve kalkış saatlerini hesaplayın.",
      iconName: "sleepCalculator" as const,
      group: "Sağlık ve Fitness Hesaplayıcıları",
    },
    {
      id: "1rm",
      href: "/1rm-hesaplama",
      title: "1RM Hesaplama",
      description:
        "Kaldırdığınız ağırlık ve tekrar sayısından tahmini 1RM'i ve antrenman yüzdesi tablosunu hesaplayın.",
      iconName: "oneRepMaxCalculator" as const,
      group: "Sağlık ve Fitness Hesaplayıcıları",
    },
    {
      id: "kosu-pace",
      href: "/kosu-pace-hesaplama",
      title: "Koşu Pace Hesaplama",
      description:
        "Mesafe, süre ve tempo arasında hesaplama yapın; yarış mesafeleri için tahmini bitiş süresi görün.",
      iconName: "paceCalculator" as const,
      group: "Sağlık ve Fitness Hesaplayıcıları",
    },
    {
      id: "gubre-ihtiyaci",
      href: "/gubre-ihtiyaci-hesaplama",
      title: "Gübre İhtiyacı Hesaplama",
      description:
        "Hedef besin dozu ve gübrenin besin içeriğinden, dekara ve toplam alana gereken gübre miktarını hesaplayın.",
      iconName: "fertilizerCalculator" as const,
      group: "Tarım ve Veterinerlik Hesaplayıcıları",
    },
    {
      id: "gubre-seyreltme",
      href: "/gubre-seyreltme-hesaplama",
      title: "Gübre Seyreltme Hesaplama",
      description:
        "Sıvı gübre etiketindeki oran veya dozla, hazırlaman gereken su/gübre miktarını hesaplayın.",
      iconName: "fertilizerDilutionCalculator" as const,
      group: "Tarım ve Veterinerlik Hesaplayıcıları",
    },
    {
      id: "tohum-miktari",
      href: "/tohum-miktari-hesaplama",
      title: "Tohum Miktarı Hesaplama",
      description:
        "Hedef bitki sayısı, bin dane ağırlığı, çimlenme ve saflık oranından tohumluk miktarını hesaplayın.",
      iconName: "seedRateCalculator" as const,
      group: "Tarım ve Veterinerlik Hesaplayıcıları",
    },
    {
      id: "sulama-suresi",
      href: "/sulama-suresi-hesaplama",
      title: "Sulama Süresi Hesaplama",
      description:
        "Hedef sulama miktarı, alan ve sistem debisinden sulama süresini hesaplayın.",
      iconName: "irrigationCalculator" as const,
      group: "Tarım ve Veterinerlik Hesaplayıcıları",
    },
    {
      id: "veteriner-doz",
      href: "/veteriner-ilac-dozu-hesaplama",
      title: "Veteriner İlaç Dozu ve Hacmi Hesaplama",
      description:
        "Reçete edilen mg/kg dozunu, ağırlık ve konsantrasyonla birlikte uygulanacak mL hacme çevirin.",
      iconName: "vetDoseCalculator" as const,
      group: "Tarım ve Veterinerlik Hesaplayıcıları",
    },
    {
      id: "alkol-seyreltme",
      href: "/alkol-seyreltme-hesaplama",
      title: "Alkol Seyreltme Hesaplama",
      description:
        "Stok ve hedef alkol derişimi/hacminden eksik değeri yüzde (%) derişim cinsinden hesaplayın.",
      iconName: "alcoholDilutionCalculator" as const,
      group: "Bar ve Mutfak Hesaplayıcıları",
    },
    {
      id: "kokteyl-olcusu",
      href: "/kokteyl-olcusu-cevirici",
      title: "Kokteyl Ölçüsü Çevirici",
      description:
        "Oz, mL ve cl arasında kokteyl ölçüsü çevirin.",
      iconName: "barVolumeCalculator" as const,
      group: "Bar ve Mutfak Hesaplayıcıları",
    },
    {
      id: "abv-standart-icki",
      href: "/abv-standart-icki-hesaplama",
      title: "ABV ve Standart İçki Hesaplama",
      description:
        "İçecek hacmi ve alkol yüzdesinden saf alkol miktarını ve standart içki sayısını hesaplayın.",
      iconName: "abvCalculator" as const,
      group: "Bar ve Mutfak Hesaplayıcıları",
    },
    {
      id: "havuz-hacmi",
      href: "/havuz-hacmi-hesaplama",
      title: "Havuz Hacmi Hesaplama",
      description:
        "Dikdörtgen veya yuvarlak havuzun ölçülerinden su hacmini (m³) hesaplayın.",
      iconName: "poolVolumeCalculator" as const,
      group: "Havuz ve Su Sistemleri",
    },
    {
      id: "klor-dozaji",
      href: "/klor-dozaji-hesaplama",
      title: "Klor Dozajı Hesaplama",
      description:
        "Havuz hacmi, mevcut/hedef klor ve ürün yüzdesinden gereken klor miktarını hesaplayın.",
      iconName: "chlorineDoseCalculator" as const,
      group: "Havuz ve Su Sistemleri",
    },
    {
      id: "pozlama-esdegeri",
      href: "/pozlama-esdegeri-hesaplama",
      title: "Pozlama Eşdeğeri Hesaplama",
      description:
        "ISO, diyafram ve enstantaneden ikisini girerek aynı pozlamayı koruyacak üçüncüsünü hesaplayın.",
      iconName: "exposureCalculator" as const,
      group: "Fotoğrafçılık Hesaplayıcıları",
    },
    {
      id: "odak-uzakligi-esdegeri",
      href: "/odak-uzakligi-esdegeri-hesaplama",
      title: "Odak Uzaklığı Eşdeğeri Hesaplama (Crop Factor)",
      description:
        "Lensin gerçek odak uzaklığından, sensör formatına göre tam kare eşdeğerini hesaplayın.",
      iconName: "focalLengthCalculator" as const,
      group: "Fotoğrafçılık Hesaplayıcıları",
    },
    {
      id: "unix-zaman-damgasi",
      href: "/unix-zaman-damgasi-cevirici",
      title: "Unix Zaman Damgası Çevirici",
      description:
        "Epoch (saniye/milisaniye) ile tarih arasında, Türkiye saatine göre çevrim yapın.",
      iconName: "unixTimestampCalculator" as const,
      group: "Elektronik, Yazılım ve Medya Araçları",
    },
    {
      id: "renk-kodu",
      href: "/renk-kodu-cevirici",
      title: "Renk Kodu Çevirici",
      description:
        "HEX, RGB ve HSL renk kodları arasında canlı önizlemeyle çevrim yapın.",
      iconName: "colorCodeCalculator" as const,
      group: "Elektronik, Yazılım ve Medya Araçları",
    },
    {
      id: "piksel-cm-dpi",
      href: "/piksel-cm-dpi-hesaplama",
      title: "Piksel, CM ve DPI Hesaplama",
      description:
        "Piksel sayısı, fiziksel boyut veya DPI değerinden ikisini girerek üçüncüsünü hesaplayın.",
      iconName: "pixelCalculator" as const,
      group: "Elektronik, Yazılım ve Medya Araçları",
    },
    {
      id: "bpm-ms",
      href: "/bpm-ms-hesaplama",
      title: "BPM - MS Hesaplama",
      description:
        "Tempodan dörtlük, sekizlik gibi nota değerlerinin düz, noktalı ve triole milisaniye karşılığını hesaplayın.",
      iconName: "bpmCalculator" as const,
      group: "Elektronik, Yazılım ve Medya Araçları",
    },
    {
      id: "psu-guc",
      href: "/psu-guc-hesaplama",
      title: "PSU Güç Kaynağı Hesaplama",
      description:
        "CPU, GPU ve diğer bileşenlerin gücünden önerilen PSU wattajını hesaplayın.",
      iconName: "psuCalculator" as const,
      group: "Elektronik, Yazılım ve Medya Araçları",
    },
    {
      id: "video-bit-hizi",
      href: "/video-bit-hizi-hesaplama",
      title: "Video Bit Hızı ve Dosya Boyutu Hesaplama",
      description:
        "Bit hızı ve süreden dosya boyutunu, ya da hedef dosya boyutundan bit hızını hesaplayın.",
      iconName: "videoBitrateCalculator" as const,
      group: "Elektronik, Yazılım ve Medya Araçları",
    },
    {
      id: "sosyal-medya-gorsel-boyutlari",
      href: "/sosyal-medya-gorsel-boyutlari-hesaplama",
      title: "Sosyal Medya Görsel Boyutları Hesaplama",
      description:
        "Instagram, YouTube, Facebook, X, LinkedIn ve TikTok için doğru görsel boyutunu ve gereken kırpmayı hesaplayın.",
      iconName: "socialMediaSizeCalculator" as const,
      group: "Elektronik, Yazılım ve Medya Araçları",
    },
    {
      id: "ping-gecikme-hesaplama",
      href: "/ping-gecikme-hesaplama",
      title: "Ping / Gecikme Hesaplama",
      description:
        "İki konum arasındaki mesafeye göre fiziksel olarak mümkün olan en düşük ping süresini hesaplayın.",
      iconName: "theoreticalLatencyCalculator" as const,
      group: "Elektronik, Yazılım ve Medya Araçları",
    },
    {
      id: "yakit-tuketimi",
      href: "/yakit-tuketimi-hesaplama",
      title: "Yakıt Tüketimi Hesaplama",
      description:
        "km/lt, lt/100km ve mpg arasında çevirin; yolculuk mesafesi ve yakıt fiyatına göre maliyeti hesaplayın.",
      iconName: "fuelConsumptionCalculator" as const,
      group: "Ev, Enerji ve Ulaşım Hesaplayıcıları",
    },
    {
      id: "tasinma-kutusu",
      href: "/tasinma-kutusu-hesaplama",
      title: "Taşınma Kutusu Hesaplama",
      description:
        "Ev tipine göre tahmini taşınma kolisi sayısını ve kamyon hacmini görün.",
      iconName: "movingBoxCalculator" as const,
      group: "Ev, Enerji ve Ulaşım Hesaplayıcıları",
    },
    {
      id: "dogalgaz-tuketimi",
      href: "/dogalgaz-tuketimi-hesaplama",
      title: "Doğalgaz Tüketimi Hesaplama",
      description:
        "m³ cinsinden doğalgaz tüketiminden toplam maliyeti ve yaklaşık kWh karşılığını hesaplayın.",
      iconName: "naturalGasCalculator" as const,
      group: "Ev, Enerji ve Ulaşım Hesaplayıcıları",
    },
    {
      id: "elektrikli-arac-sarj",
      href: "/elektrikli-arac-sarj-hesaplama",
      title: "Elektrikli Araç Şarj Hesaplama",
      description:
        "Batarya kapasitesi ve şarj gücünden tahmini şarj süresini, tüketimden tahmini menzili hesaplayın.",
      iconName: "evChargingCalculator" as const,
      group: "Ev, Enerji ve Ulaşım Hesaplayıcıları",
    },
    {
      id: "klima-btu",
      href: "/klima-btu-hesaplama",
      title: "Klima BTU Hesaplama",
      description:
        "Oda alanı, kişi sayısı ve güneş/kat durumundan uygun klima soğutma kapasitesini hesaplayın.",
      iconName: "acCapacityCalculator" as const,
      group: "Ev, Enerji ve Ulaşım Hesaplayıcıları",
    },
    {
      id: "elektrik-tuketimi",
      href: "/elektrik-tuketimi-hesaplama",
      title: "Elektrik Tüketimi Hesaplama",
      description:
        "Cihaz gücünden günlük, aylık ve yıllık elektrik tüketimini (kWh) ve maliyetini hesaplayın.",
      iconName: "electricityConsumptionCalculator" as const,
      group: "Ev, Enerji ve Ulaşım Hesaplayıcıları",
    },
    {
      id: "cbm",
      href: "/cbm-hesaplama",
      title: "CBM ve Hacimsel Ağırlık Hesaplama",
      description:
        "Koli/palet ölçülerinden CBM ve ücrete esas ağırlığı hesaplayın.",
      iconName: "cbmCalculator" as const,
      group: "Ev, Enerji ve Ulaşım Hesaplayıcıları",
    },
    {
      id: "seyahat-priz-voltaj",
      href: "/seyahat-priz-voltaj-hesaplama",
      title: "Seyahat Priz ve Voltaj Uyumluluk Hesaplama",
      description:
        "Gideceğin ülkeye göre adaptöre veya voltaj dönüştürücüye ihtiyacın olup olmadığını hesaplayın.",
      iconName: "travelPlugVoltageCalculator" as const,
      group: "Ev, Enerji ve Ulaşım Hesaplayıcıları",
    },
    {
      id: "has-hesaplama",
      href: "/has-hesaplama",
      title: "Has Altın ve Gümüş Hesaplama",
      description:
        "Gram ve ayar (milyem) girerek has (saf) metal içeriğini, farklı ayarları karıştırarak sonuç ayarını hesaplayın.",
      iconName: "hasCalculator" as const,
      group: "Finans, Eğitim ve Günlük Yaşam Araçları",
    },
    {
      id: "emlak-komisyonu",
      href: "/emlak-komisyonu-hesaplama",
      title: "Emlak Komisyonu Hesaplama",
      description:
        "Satış veya kiralama bedelinden, yasal tavan oranlarına göre emlak komisyonunu hesaplayın.",
      iconName: "commissionCalculator" as const,
      group: "Finans, Eğitim ve Günlük Yaşam Araçları",
    },
    {
      id: "amortisman",
      href: "/amortisman-hesaplama",
      title: "Amortisman Hesaplama",
      description:
        "Normal veya azalan bakiyeler usulüyle yıllara göre amortisman tablosu hesaplayın.",
      iconName: "amortismanCalculator" as const,
      group: "Finans, Eğitim ve Günlük Yaşam Araçları",
    },
    {
      id: "devamsizlik",
      href: "/devamsizlik-hesaplama",
      title: "Devamsızlık Hesaplama",
      description:
        "Okul (gün bazlı) veya üniversite (yüzde/saat bazlı) devamsızlık limitine göre kalan hakkınızı hesaplayın.",
      iconName: "attendanceCalculator" as const,
      group: "Finans, Eğitim ve Günlük Yaşam Araçları",
    },
    {
      id: "yas",
      href: "/yas-hesaplama",
      title: "Yaş Hesaplama",
      description:
        "Doğum tarihinden yaşını yıl-ay-gün olarak, ya da iki tarih arasındaki farkı hesaplayın.",
      iconName: "dateCalculator" as const,
      group: "Finans, Eğitim ve Günlük Yaşam Araçları",
    },
    {
      id: "kdv",
      href: "/kdv-hesaplama",
      title: "KDV Hesaplama",
      description:
        "KDV dahil veya KDV hariç tutarı, KDV miktarını oran bazında hesaplayın.",
      iconName: "vatCalculator" as const,
      group: "Finans, Eğitim ve Günlük Yaşam Araçları",
    },
    {
      id: "harf-notu",
      href: "/harf-notu-hesaplama",
      title: "Harf Notu Hesaplama",
      description:
        "100'lük puanı harf notuna ve 4'lük sisteme çevirin.",
      iconName: "letterGradeCalculator" as const,
      group: "Finans, Eğitim ve Günlük Yaşam Araçları",
    },
    {
      id: "reklam-metrikleri",
      href: "/reklam-metrikleri-hesaplama",
      title: "Reklam Metrikleri Hesaplama",
      description:
        "Maliyet, gösterim ve tıklamadan CPM, CTR, CPC ve ROI hesaplayın.",
      iconName: "adMetricsCalculator" as const,
      group: "Finans, Eğitim ve Günlük Yaşam Araçları",
    },
    {
      id: "yuzuk",
      href: "/yuzuk-olcusu-cevirici",
      title: "Yüzük Ölçüsü Çevirici",
      description:
        "Yüzük ölçüsünü TR, Avrupa, ABD ve İngiltere sistemleri arasında çevirin.",
      iconName: "ringSize" as const,
      group: "Ölçü Çeviricileri ve Eğlenceli Karşılaştırmalar",
    },
    {
      id: "lastik-ebati",
      href: "/lastik-ebati-hesaplama",
      title: "Lastik Ebatı Hesaplama",
      description:
        "Lastik ebat kodundan dış çapı, çevreyi ve hız göstergesi sapmasını hesaplayın.",
      iconName: "tireSizeCalculator" as const,
      group: "Ölçü Çeviricileri ve Eğlenceli Karşılaştırmalar",
    },
    {
      id: "beden-olcusu",
      href: "/beden-olcusu-cevirici",
      title: "Beden Ölçüsü Çevirici",
      description:
        "Kadın ve erkek giyim bedenini TR/EU, US ve UK sistemleri arasında çevirin.",
      iconName: "clothingSizeCalculator" as const,
      group: "Ölçü Çeviricileri ve Eğlenceli Karşılaştırmalar",
    },
    {
      id: "birim-felaketleri",
      href: "/birim-cevirme-felaketleri",
      title: "Birim Çevirme Felaketleri",
      description:
        "Yanlış birim kullanımı yüzünden yaşanan gerçek, doğrulanmış olaylar — Mars Climate Orbiter ve daha fazlası.",
      iconName: "unitDisaster" as const,
      group: "Ölçü Çeviricileri ve Eğlenceli Karşılaştırmalar",
    },
    {
      id: "uzunluk-karsilastirma",
      href: "/uzunluk-karsilastirma",
      title: "Uzunluk Karşılaştırma",
      description:
        "Bir uzunluk değerini zürafa boyu, otobüs, futbol sahası gibi tanıdık nesnelerle karşılaştırın.",
      iconName: "length" as const,
      group: "Ölçü Çeviricileri ve Eğlenceli Karşılaştırmalar",
    },
    {
      id: "agirlik-karsilastirma",
      href: "/agirlik-karsilastirma",
      title: "Ağırlık Karşılaştırma",
      description:
        "Bir ağırlık değerini kedi, insan, at, fil gibi tanıdık nesnelerle karşılaştırın.",
      iconName: "mass" as const,
      group: "Ölçü Çeviricileri ve Eğlenceli Karşılaştırmalar",
    },
    {
      id: "meslekler",
      href: "/meslekler",
      title: "Mesleğe Göre Araçlar",
      description:
        "Kuyumcu, elektrikçi gibi mesleklere özel hesaplayıcıların ve referans tablolarının toplandığı sayfalar.",
      iconName: "jewelerHub" as const,
      group: "Diğer Hesaplama Merkezleri",
    },
    {
      id: "kimya",
      href: "/bilim-hesaplayicilari",
      title: "Bilim Hesaplayıcıları",
      description:
        "Mol hesaplama ile başlayan kimya hesaplayıcıları; liste zamanla büyüyecek.",
      iconName: "chemistryCalculator" as const,
      group: "Diğer Hesaplama Merkezleri",
    },
    {
      id: "sayi-tabani",
      href: "/bilim-hesaplayicilari/matematik",
      title: "Matematik Hesaplayıcıları",
      description:
        "EBOB-EKOK, sayı tabanı çevirici ve daha fazlası; liste zamanla büyüyecek.",
      iconName: "numberBaseCalculator" as const,
      group: "Diğer Hesaplama Merkezleri",
    },
  ];

  return (
    <OtherCategoriesPage
      conversions={conversions}
      categories={categories}
      tools={tools}
      locale="tr"
      alternateLink={{
        href: "/en/other-conversions",
        hrefLang: "en",
        label: "View the English version",
      }}
    />
  );
}
