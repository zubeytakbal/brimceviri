import Link from "next/link";
import { getElectricalHubPath } from "../converter/engineeringHubs";
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
  formula: string;
  description: string;
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
  iconName: "energy" | "pressure" | "temperature";
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
      { label: "M\u00fchendislik Hesaplay\u0131c\u0131lar\u0131" },
    ],
    title: "M\u00fchendislik Hesaplay\u0131c\u0131lar\u0131",
    description:
      "Birim d\u00f6n\u00fc\u015f\u00fcmleriyle birlikte elektrik, \u0131s\u0131 transferi, ak\u0131\u015fkanlar ve bas\u0131n\u00e7 hesaplar\u0131n\u0131 konu k\u00fcmeleri halinde sunan m\u00fchendislik merkezini inceleyin.",
    focusTitle: "M\u00fchendislik b\u00f6l\u00fcmleri",
    focusDescription:
      "M\u00fchendislik hesaplay\u0131c\u0131lar\u0131n\u0131 art\u0131k tek liste yerine konu merkezleri halinde b\u00fcy\u00fct\u00fcyoruz. Elektrik hesaplar\u0131 ilk aktif alt merkez olarak ayr\u0131ld\u0131; di\u011fer gruplar da ayn\u0131 yap\u0131yla geni\u015fleyecek.",
    focusCards: [
      {
        href: getElectricalHubPath("tr"),
        title: "Elektrik Hesaplar\u0131",
        description:
          "Kablo kesiti, gerilim d\u00fc\u015f\u00fcm\u00fc, g\u00fc\u00e7-ak\u0131m d\u00f6n\u00fc\u015f\u00fcmleri ve motor \u00f6n hesaplar\u0131 i\u00e7in ayr\u0131 merkez.",
        iconName: "energy",
        meta: "Yeni alt merkez",
      },
      {
        href: "#basinc-ve-akiskanlar",
        title: "Bas\u0131n\u00e7 ve Ak\u0131\u015fkanlar",
        description:
          "Bas\u0131n\u00e7, hidrostatik y\u00fck ve boru i\u00e7i ak\u0131\u015f kontrol\u00fc i\u00e7in mevcut ara\u00e7 grubu.",
        iconName: "pressure",
        meta: "Mevcut grup",
      },
      {
        href: "#isi-transferi",
        title: "Is\u0131 Transferi",
        description:
          "Is\u0131 enerjisi ve \u0131s\u0131 iletimi hesaplar\u0131n\u0131 birlikte toplayan termal ara\u00e7 grubu.",
        iconName: "temperature",
        meta: "Mevcut grup",
      },
    ],
    introTitle: "Teknik hesaplamalar i\u00e7in k\u00fcmeli bir merkez",
    introBody:
      "Bu sayfa, mevcut m\u00fchendislik hesaplay\u0131c\u0131lar\u0131n\u0131 konu ba\u015fl\u0131klar\u0131na g\u00f6re toplar ve yeni alt merkezlere ge\u00e7i\u015f noktas\u0131 olarak davran\u0131r. Kullan\u0131c\u0131 \u00f6nce do\u011fru m\u00fchendislik alan\u0131n\u0131, sonra tekil hesab\u0131 se\u00e7ebilir; b\u00f6ylece i\u00e7erik mimarisi hem kullan\u0131c\u0131 hem arama motoru i\u00e7in daha net hale gelir.",
    groups: [
      {
        id: "basinc-ve-akiskanlar",
        title: "Bas\u0131n\u00e7 ve Ak\u0131\u015fkanlar",
        description:
          "Bas\u0131n\u00e7, hidrostatik y\u00fck ve boru i\u00e7i ak\u0131\u015f davran\u0131\u015f\u0131 i\u00e7in kullan\u0131lan temel hesaplay\u0131c\u0131lar.",
        tools: [
          {
            slug: "basinc-kuvvet-alan",
            href: "/hesaplayicilar/basinc-kuvvet-alan",
            title: "Bas\u0131n\u00e7, Kuvvet ve Alan",
            formula: "P = F / A",
            description:
              "Bas\u0131nc\u0131, kuvveti veya alan\u0131 ger\u00e7ek birim d\u00f6n\u00fc\u015f\u00fcmleriyle hesaplay\u0131n.",
          },
          {
            slug: "hidrostatik-basinc",
            href: "/hesaplayicilar/hidrostatik-basinc",
            title: "Hidrostatik Bas\u0131n\u00e7",
            formula: "\u0394P = \u03c1gh",
            description:
              "Yo\u011funluk, derinlik ve yer\u00e7ekimi ivmesine g\u00f6re hidrostatik bas\u0131n\u00e7 fark\u0131n\u0131 bulun.",
          },
          {
            slug: "reynolds-sayisi",
            href: "/hesaplayicilar/reynolds-sayisi",
            title: "Reynolds Say\u0131s\u0131",
            formula: "Re = \u03c1 x v x D / \u03bc",
            description:
              "Ak\u0131\u015f h\u0131z\u0131 ve karakteristik boyut ile yakla\u015f\u0131k ak\u0131\u015f rejimini de\u011ferlendirin.",
          },
        ],
      },
      {
        id: "isi-transferi",
        title: "Is\u0131 Transferi",
        description:
          "Enerji miktar\u0131, malzeme iletkenli\u011fi ve s\u0131cakl\u0131k fark\u0131 \u00fczerinden \u00e7al\u0131\u015fan \u0131s\u0131l hesap ara\u00e7lar\u0131.",
        tools: [
          {
            slug: "isi-enerjisi",
            href: "/hesaplayicilar/isi-enerjisi",
            title: "Is\u0131 Enerjisi",
            formula: "Q = m x c x \u0394T",
            description:
              "Is\u0131 enerjisini, k\u00fctleyi, \u00f6zg\u00fcl \u0131s\u0131y\u0131 veya s\u0131cakl\u0131k fark\u0131n\u0131 SI taban\u0131nda hesaplay\u0131n.",
          },
          {
            slug: "isi-iletimi",
            href: "/hesaplayicilar/isi-iletimi",
            title: "Is\u0131 \u0130letimi",
            formula: "Qdot = k x A x \u0394T / L",
            description:
              "Malzeme iletkenli\u011fi, alan ve kal\u0131nl\u0131k \u00fczerinden \u0131s\u0131 ge\u00e7i\u015f h\u0131z\u0131n\u0131 kar\u015f\u0131la\u015ft\u0131r\u0131n.",
          },
        ],
      },
      {
        id: "elektrik",
        title: "Elektrik",
        description:
          "Gerilim, ak\u0131m ve diren\u00e7 ili\u015fkileriyle ba\u015flayan ve ayr\u0131 elektrik hesaplar\u0131 merkezine do\u011fru geni\u015fleyen devre hesaplay\u0131c\u0131lar\u0131.",
        tools: [
          {
            slug: "kw-to-amper-hesaplama",
            href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama",
            title: "kW to Amper",
            formula: "I = P / (\u221a3 x V x cos phi x eta)",
            description:
              "Uc faz, tek faz ve DC secenekleriyle gucu yaklasik hat akimina cevirin.",
          },
          {
            slug: "amper-to-kw-hesaplama",
            href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/amper-to-kw-hesaplama",
            title: "Amper to kW",
            formula: "P = \u221a3 x V x I x cos phi x eta",
            description:
              "Hat akimindan uc faz, tek faz ve DC secenekleriyle yaklasik gucu hesaplayin.",
          },
          {
            slug: "ohm-yasasi",
            href: "/hesaplayicilar/ohm-yasasi",
            title: "Ohm Yasas\u0131",
            formula: "V = I x R",
            description:
              "Gerilimi, ak\u0131m\u0131 veya direnci Ohm Yasas\u0131 ile hesaplay\u0131n.",
          },
        ],
      },
    ],
    howToTitle: "Bu hesaplay\u0131c\u0131lar nas\u0131l kullan\u0131l\u0131r?",
    howToSteps: [
      "\u00d6nce hangi b\u00fcy\u00fckl\u00fc\u011f\u00fc \u00e7\u00f6zece\u011finizi se\u00e7in ve yaln\u0131zca bilinen de\u011ferleri girin.",
      "Her giri\u015fte uygun birimi belirleyin; ara\u00e7lar t\u00fcm de\u011ferleri \u00f6nce SI taban\u0131na \u00e7evirerek hesaplar.",
      "Ana sonucu, form\u00fclde yerine koyulmu\u015f ifadeyi ve SI e\u015fde\u011ferini birlikte kontrol ederek do\u011frulama yap\u0131n.",
    ],
    guidesTitle: "\u0130lgili birim rehberleri",
    guidesDescription:
      "Temel m\u00fchendislik birimlerinin tan\u0131m\u0131n\u0131, sembollerini ve kullan\u0131m alanlar\u0131n\u0131 g\u00f6rmek i\u00e7in rehber sayfalar\u0131n\u0131 a\u00e7abilirsiniz.",
    guideLinks: [
      { href: "/birimler/pascal", label: "Pascal (Pa) rehberi" },
      { href: "/birimler/metre", label: "Metre (m) rehberi" },
      { href: "/birimler/kilogram", label: "Kilogram (kg) rehberi" },
    ],
    relatedToolsTitle: "G\u00fcndelik hesaplay\u0131c\u0131lar",
    relatedToolsDescription:
      "Bu m\u00fchendislik/SI hesaplay\u0131c\u0131lar\u0131n\u0131n d\u0131\u015f\u0131nda, ev ve g\u00fcndelik ihtiya\u00e7lar i\u00e7in haz\u0131rlanan pratik hesap ara\u00e7lar\u0131na da g\u00f6z atabilirsiniz.",
    relatedToolsLinks: [
      { href: "/boya-hesaplama", label: "Boya Hesaplama" },
      { href: "/fayans-hesaplama", label: "Fayans Hesaplama" },
      { href: "/tugla-hesaplama", label: "Tuğla Hesaplama" },
      { href: "/yas-hesaplama", label: "Yaş Hesaplama" },
      { href: "/kdv-hesaplama", label: "KDV Hesaplama" },
      { href: "/bmi-hesaplama", label: "BMI Hesaplama" },
      { href: "/gebelik-haftasi-hesaplama", label: "Gebelik Haftası Hesaplama" },
      { href: "/klima-btu-hesaplama", label: "Klima BTU Hesaplama" },
      { href: "/elektrik-tuketimi-hesaplama", label: "Elektrik Tüketimi Hesaplama" },
      { href: "/uyku-hesaplama", label: "Uyku Hesaplama" },
      { href: "/kosu-pace-hesaplama", label: "Koşu Pace Hesaplama" },
      { href: "/yakit-tuketimi-hesaplama", label: "Yakıt Tüketimi Hesaplama" },
      { href: "/parke-hesaplama", label: "Parke Hesaplama" },
      { href: "/duvar-kagidi-hesaplama", label: "Duvar Kağıdı Hesaplama" },
      { href: "/tasinma-kutusu-hesaplama", label: "Taşınma Kutusu Hesaplama" },
      { href: "/dogalgaz-tuketimi-hesaplama", label: "Doğalgaz Tüketimi Hesaplama" },
      { href: "/elektrikli-arac-sarj-hesaplama", label: "Elektrikli Araç Şarj Hesaplama" },
    ],
    alternateTitle: "Di\u011fer diller",
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
      "Browse a broader engineering center that combines unit-aware electrical, heat-transfer, fluid-flow and pressure tools under clearer topic clusters.",
    focusTitle: "Engineering sections",
    focusDescription:
      "We are expanding the engineering area from a flat list into topic hubs. Electrical Calculators is the first dedicated sub-hub, while the other groups remain accessible from this parent center.",
    focusCards: [
      {
        href: getElectricalHubPath("en"),
        title: "Electrical Calculators",
        description:
          "Dedicated sub-hub for cable sizing, voltage-drop checks, power-current conversion and related electrical project tools.",
        iconName: "energy",
        meta: "New sub-hub",
      },
      {
        href: "#pressure-and-fluids",
        title: "Pressure and Fluids",
        description:
          "Current tool group for pressure relationships, hydrostatic loading and internal-flow screening.",
        iconName: "pressure",
        meta: "Current group",
      },
      {
        href: "#heat-transfer",
        title: "Heat Transfer",
        description:
          "Current thermal group for heat-energy and conduction calculations.",
        iconName: "temperature",
        meta: "Current group",
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
        ],
      },
      {
        id: "electricity",
        title: "Electricity",
        description:
          "Practical circuit tools built around voltage, current and resistance, with a dedicated electrical sub-hub now being expanded.",
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
      "Erkunden Sie ein ausgebautes Ingenieurzentrum, das elektrische Werkzeuge, Warmeubertragung, Stromung, Druck und technische Einheiten in klaren Themenclustern verbindet.",
    focusTitle: "Ingenieurbereiche",
    focusDescription:
      "Der Ingenieurbereich wird von einer flachen Liste zu Themenzentren ausgebaut. Elektrorechner ist das erste eigene Teilzentrum; die anderen Gruppen bleiben weiterhin direkt erreichbar.",
    focusCards: [
      {
        href: getElectricalHubPath("de"),
        title: "Elektrorechner",
        description:
          "Eigenes Teilzentrum fur Kabeldimensionierung, Spannungsfall und Leistungs-Strom-Umrechnung.",
        iconName: "energy",
        meta: "Neues Teilzentrum",
      },
      {
        href: "#druck-und-stromung",
        title: "Druck und Stromung",
        description:
          "Aktuelle Werkzeuge fur Druckbeziehungen, hydrostatische Lasten und Stromungsprufungen.",
        iconName: "pressure",
        meta: "Aktuelle Gruppe",
      },
      {
        href: "#warmeubertragung",
        title: "Warmeubertragung",
        description:
          "Aktuelle thermische Gruppe fur Warmeenergie und Warmeleitung.",
        iconName: "temperature",
        meta: "Aktuelle Gruppe",
      },
    ],
    introTitle: "Ein Elternzentrum fur technische Rechencluster",
    introBody:
      "Diese Seite fasst die aktuellen Ingenieurrechner nach Themenfeldern zusammen und dient jetzt als ubergeordnetes Zentrum fur eigene Teil-Hubs. So konnen Nutzer zuerst das passende Fachgebiet und danach den genauen Rechenweg auswahlen.",
    groups: [
      {
        id: "druck-und-stromung",
        title: "Druck und Stromung",
        description:
          "Werkzeuge fur Druckbeziehungen, hydrostatische Lasten und erste Stromungsbewertungen in Leitungen.",
        tools: [
          {
            slug: "druck-kraft-flaeche",
            href: "/de/rechner/druck-kraft-flaeche",
            title: "Druck, Kraft und Flache",
            formula: "P = F / A",
            description:
              "Berechnen Sie Druck, Kraft oder Flache mit technischen Einheiten und SI-Bezug.",
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
              "Bewerten Sie das Stromungsregime uber Dichte, Geschwindigkeit, Durchmesser und Viskositat.",
          },
        ],
      },
      {
        id: "warmeubertragung",
        title: "Warmeubertragung",
        description:
          "Werkzeuge fur gespeicherte Warmeenergie, Warmeleitung und thermische Materialvergleiche.",
        tools: [
          {
            slug: "waermeenergie",
            href: "/de/rechner/waermeenergie",
            title: "Warmeenergie",
            formula: "Q = m x c x \u0394T",
            description:
              "Berechnen Sie Warmeenergie, Masse, spezifische Warmekapazitat oder Temperaturdifferenz.",
          },
          {
            slug: "waermeleitung",
            href: "/de/rechner/waermeleitung",
            title: "Warmeleitung",
            formula: "Qdot = k x A x \u0394T / L",
            description:
              "Vergleichen Sie Warmestrom aus Leitfahigkeit, Flache, Temperaturdifferenz und Schichtdicke.",
          },
        ],
      },
      {
        id: "elektrizitat",
        title: "Elektrizitat",
        description:
          "Werkzeuge fur Spannung, Strom und Widerstand, erganzt durch ein neues eigenes Teilzentrum fur Elektrorechner.",
        tools: [
          {
            slug: "kw-to-amper-hesaplama",
            href: "/de/ingenieurrechner/elektrorechner/kw-zu-ampere-rechner",
            title: "kW-zu-Ampere",
            formula: "I = P / (\u221a3 x V x cos phi x eta)",
            description:
              "Wandeln Sie Leistung fur Dreiphasen-, Einphasen- und DC-Systeme in einen naherungsweisen Leitungsstrom um.",
          },
          {
            slug: "amper-to-kw-hesaplama",
            href: "/de/ingenieurrechner/elektrorechner/ampere-zu-kw-rechner",
            title: "Ampere-zu-kW",
            formula: "P = \u221a3 x V x I x cos phi x eta",
            description:
              "Wandeln Sie Leitungsstrom fur Dreiphasen-, Einphasen- und DC-Systeme in eine naherungsweise Leistung um.",
          },
          {
            slug: "ohms-law",
            href: "/de/rechner/ohms-law",
            title: "Ohmsches Gesetz",
            formula: "V = I x R",
            description:
              "Berechnen Sie Spannung, Strom oder Widerstand fur grundlegende Elektrokontrollen.",
          },
        ],
      },
    ],
    howToTitle: "Wie verwendet man diese Rechner?",
    howToSteps: [
      "Wahlen Sie zuerst die gesuchte Zielgrosse und tragen Sie nur die bekannten Werte ein.",
      "Legen Sie fur jeden Eingabewert die richtige Einheit fest; alle Werkzeuge rechnen intern zuerst auf SI um.",
      "Prufen Sie Hauptresultat, eingesetzte Formel und SI-Aquivalent gemeinsam, um Plausibilitatsfehler schnell zu erkennen.",
    ],
    guidesTitle: "Passende Einheitenleitfaden",
    guidesDescription:
      "Wenn Sie Definitionen, Symbole oder Hintergrundwissen zu den verwendeten Basisgrossen brauchen, offnen Sie die passenden Einheitenleitfaden.",
    guideLinks: [
      { href: "/de/einheiten/pascal", label: "Pascal (Pa) Leitfaden" },
      { href: "/de/einheiten/meter", label: "Meter (m) Leitfaden" },
      { href: "/de/einheiten/kilogramm", label: "Kilogramm (kg) Leitfaden" },
    ],
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
                      <CardIcon name={getCalculatorIconName(tool.slug)} />
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
