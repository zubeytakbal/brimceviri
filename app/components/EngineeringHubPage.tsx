import Link from "@/app/components/SiteLink";
import { getElectricalHubPath } from "../converter/engineeringHubs";
import { germanStandaloneTools } from "../i18n/germanStandaloneTools";
import { DecorativeIcon, getCalculatorIconName, type SiteIconName } from "./siteIcons";

function CardIcon({ name }: { name: SiteIconName }) {
  return (
    <span className="home-category-icon-box" aria-hidden="true">
      <DecorativeIcon name={name} size={48} className="home-category-icon-svg" />
    </span>
  );
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
  focusDescription: string;
  focusCards: EngineeringFocusCard[];
  introTitle: string;
  introBody: string;
  groups: EngineeringGroup[];
  howToTitle: string;
  howToSteps: string[];
  guidesTitle: string;
  guidesDescription: string;
  guideLinks: EngineeringGuideLink[];
  relatedToolsTitle?: string;
  relatedToolsDescription?: string;
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
      "Elektrik, akışkanlar ve tesisat, ısı, makine ve imalat, malzeme, inşaat ve ısıtma-soğutma hesaplarını tek yerde toplayan mühendislik merkezi. Her araç birimleri SI tabanına çevirerek hesaplar ve kullandığı formülü gösterir.",
    focusTitle: "Mühendislik bölümleri",
    focusDescription:
      "Önce çalıştığınız alanı seçin, sonra o alandaki hesaplayıcıya geçin. Elektrik hesapları kendi alt merkezinde; diğer bölümler bu sayfanın içinde gruplandı.",
    focusCards: [
      {
        href: getElectricalHubPath("tr"),
        title: "Elektrik Hesapları",
        description:
          "Kablo kesiti, gerilim düşümü, kW-amper dönüşümleri ve motor akımı için ayrı alt merkez.",
        iconName: "energy",
        meta: "Alt merkez",
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
    introTitle: "Bu merkez nasıl düzenlendi?",
    introBody:
      "Sitedeki mühendislik araçları farklı sayfalara dağılmıştı; bu sayfa hepsini mühendislik dallarına göre bir araya getirir. Her grup, sahada ya da derste aynı iş akışında kullanılan hesapları birlikte gösterir: örneğin boru çapını seçtikten sonra aynı gruptaki basınç kaybı hesabına geçebilirsiniz. Hesaplayıcılar ön boyutlandırma ve kontrol içindir; proje, ruhsat veya güvenlik kararlarında ilgili standart ve yetkili mühendis onayı esas alınmalıdır.",
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
            slug: "boru-capi-donusum-hesaplama",
            href: "/boru-capi-donusum-hesaplama",
            title: "Boru Çapı Dönüşümü (DN-NPS)",
            icon: "pipeNominalSizeCalculator",
            description: "DN nominal ölçüsünü NPS (inç) karşılığına ve gerçek dış çapa çevirin.",
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
    howToTitle: "Bu hesaplayıcılar nasıl kullanılır?",
    howToSteps: [
      "Önce hangi büyüklüğü çözeceğinizi seçin ve yalnızca bilinen değerleri girin.",
      "Her girişte uygun birimi belirleyin; araçlar tüm değerleri önce SI tabanına çevirerek hesaplar.",
      "Ana sonucu, formülde yerine konmuş ifadeyi ve SI eşdeğerini birlikte kontrol ederek doğrulayın.",
      "Sonucu aynı gruptaki bir sonraki hesapla sınayın: örneğin kablo kesitini seçtikten sonra gerilim düşümünü, boru çapını seçtikten sonra basınç kaybını kontrol edin.",
    ],
    guidesTitle: "İlgili birim dönüşümleri ve rehberler",
    guidesDescription:
      "Hesaplarda en sık geçen büyüklüklerin dönüşüm sayfaları ve birim rehberleri.",
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
    relatedToolsTitle: "Mesleğe göre araç sayfaları",
    relatedToolsDescription:
      "Aynı hesapları meslek ve iş akışına göre gruplanmış olarak görmek için ilgili meslek sayfalarını açabilirsiniz.",
    relatedToolsLinks: [
      { href: "/elektrikci-araclari", label: "Elektrikçi Araçları" },
      { href: "/tesisatci-araclari", label: "Tesisatçı Araçları" },
      { href: "/kaynakci-araclari", label: "Kaynakçı Araçları" },
      { href: "/cnc-torna-araclari", label: "CNC / Torna Operatörü Araçları" },
      { href: "/insaatci-araclari", label: "İnşaatçı Araçları" },
      { href: "/klima-sogutma-teknisyeni-araclari", label: "Klima ve Soğutma Teknisyeni Araçları" },
      { href: "/mimar-araclari", label: "Mimar Araçları" },
      { href: "/marangoz-araclari", label: "Marangoz Araçları" },
      { href: "/otomotiv-araclari", label: "Otomotiv Araçları" },
      { href: "/amator-telsiz-araclari", label: "Amatör Telsiz Araçları" },
      { href: "/bilim-hesaplayicilari", label: "Bilim Hesaplayıcıları" },
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
      "Browse a broader engineering center that combines unit-aware electrical, fluid-flow, heat-transfer, mechanics and materials tools under clearer topic clusters.",
    focusTitle: "Engineering sections",
    focusDescription:
      "The engineering area is organized into dedicated topic hubs for electrical work, fluids and piping, dimensionless numbers, heat transfer, and mechanics and materials. Choose a branch first, then open the calculation that matches the task.",
    focusCards: [
      {
        href: getElectricalHubPath("en"),
        title: "Electrical Calculators",
        description:
          "Dedicated sub-hub for cable sizing, voltage-drop checks, power-current conversion and related electrical project tools.",
        iconName: "energy",
        meta: "Dedicated hub",
      },
      {
        href: "/en/engineering-calculators/fluids-piping",
        title: "Fluids & Piping",
        description:
          "Dedicated sub-hub for pipe flow, internal velocity, pressure-drop and pump-power checks.",
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
          "Dedicated sub-hub for thermal energy, conduction, expansion and heat-transfer screening.",
        iconName: "temperature",
        meta: "Dedicated hub",
      },
      {
        href: "/en/engineering-calculators/mechanics-materials",
        title: "Mechanics & Materials",
        description:
          "Dedicated sub-hub for stress and strain, beam deflection, shaft torsion, buckling and material-response checks.",
        iconName: "pressure",
        meta: "Dedicated hub",
      },
    ],
    introTitle: "A parent hub for clustered engineering tools",
    introBody:
      "This page groups the current engineering calculators by topic and now acts as the parent entry point for dedicated sub-hubs. People can choose the right engineering branch first, then move into the exact calculation flow they need without browsing a generic mixed list.",
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
          "Practical circuit tools built around voltage, current and resistance, grouped in a dedicated electrical sub-hub.",
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
    howToTitle: "How to use these calculators",
    howToSteps: [
      "Choose the variable you want to solve for and enter the known values only.",
      "Set the units for each input; every tool converts to SI first before running the calculation.",
      "Check the main result, substituted formula and SI equivalent together for a quick engineering sanity check.",
    ],
    guidesTitle: "Related unit guides",
    guidesDescription:
      "Open the unit guides if you want definitions, symbols and context for the base quantities used in these tools.",
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
      "Erkunden Sie ein ausgebautes Ingenieurzentrum, das elektrische Werkzeuge, Wärmeübertragung, Strömung, Druck und technische Einheiten in klaren Themenclustern verbindet.",
    focusTitle: "Ingenieurbereiche",
    focusDescription:
      "Der Ingenieurbereich wird von einer flachen Liste zu Themenzentren ausgebaut. Elektrorechner ist das erste eigene Teilzentrum; die anderen Gruppen bleiben weiterhin direkt erreichbar.",
    focusCards: [
      {
        href: getElectricalHubPath("de"),
        title: "Elektrorechner",
        description:
          "Eigenes Teilzentrum für Kabeldimensionierung, Spannungsfall und Leistungs-Strom-Umrechnung.",
        iconName: "energy",
        meta: "Neues Teilzentrum",
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
    introTitle: "Ein Elternzentrum für technische Rechencluster",
    introBody:
      "Diese Seite fasst die aktuellen Ingenieurrechner nach Themenfeldern zusammen und dient jetzt als übergeordnetes Zentrum für eigene Teil-Hubs. So können Nutzer zuerst das passende Fachgebiet und danach den genauen Rechenweg auswahlen.",
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
          "Werkzeuge für Spannung, Strom und Widerstand, ergänzt durch ein neues eigenes Teilzentrum für Elektrorechner.",
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
    howToTitle: "Wie verwendet man diese Rechner?",
    howToSteps: [
      "Wahlen Sie zuerst die gesuchte Zielgröße und tragen Sie nur die bekannten Werte ein.",
      "Legen Sie für jeden Eingabewert die richtige Einheit fest; alle Werkzeuge rechnen intern zuerst auf SI um.",
      "Prüfen Sie Hauptresultat, eingesetzte Formel und SI-Äquivalent gemeinsam, um Plausibilitätsfehler schnell zu erkennen.",
    ],
    guidesTitle: "Passende Einheitenleitfaden",
    guidesDescription:
      "Wenn Sie Definitionen, Symbole oder Hintergrundwissen zu den verwendeten Basisgrößen brauchen, öffnen Sie die passenden Einheitenleitfaden.",
    guideLinks: [
      { href: "/de/einheiten/pascal", label: "Pascal (Pa) Leitfaden" },
      { href: "/de/einheiten/meter", label: "Meter (m) Leitfaden" },
      { href: "/de/einheiten/kilogramm", label: "Kilogramm (kg) Leitfaden" },
    ],
    relatedToolsTitle: "Alltagsrechner",
    relatedToolsDescription:
      "Neben den SI- und Ingenieurrechnern finden Sie hier auch praktische Werkzeuge für Alltag, Einkauf, Bauen und Wohnen.",
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
          <section className="conversion-section">
            <h2>{content.focusTitle}</h2>
            <p>{content.focusDescription}</p>

            <div className="directory-tool-grid">
              {content.focusCards.map((card) => (
                <article className="directory-home-card" key={card.href}>
                  <Link
                    className="directory-card-stretch"
                    href={card.href}
                    aria-label={`${card.title} — ${card.description}`}
                  />

                  <div className="directory-card-body directory-card-body-icon">
                    <CardIcon name={card.iconName} />
                    <h3 className="home-category-title">{card.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="conversion-section">
            <h2>{content.introTitle}</h2>
            <p>{content.introBody}</p>
          </section>

          {content.groups.map((group) => (
            <section className="conversion-section" id={group.id} key={group.title}>
              <h2>{group.title}</h2>
              <p>{group.description}</p>

              <div className="directory-tool-grid">
                {group.tools.map((tool) => (
                  <article className="directory-home-card" key={tool.href}>
                    <Link
                      className="directory-card-stretch"
                      href={tool.href}
                      aria-label={`${tool.title} — ${tool.description}`}
                    />

                    <div className="directory-card-body directory-card-body-icon">
                      <CardIcon name={tool.icon ?? getCalculatorIconName(tool.slug)} />
                      <h3 className="home-category-title">{tool.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          <section className="conversion-section">
            <h2>{content.howToTitle}</h2>
            <ol className="engineering-hub-steps">
              {content.howToSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="conversion-section">
            <h2>{content.guidesTitle}</h2>
            <p>{content.guidesDescription}</p>
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
              <p>{content.relatedToolsDescription}</p>
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
