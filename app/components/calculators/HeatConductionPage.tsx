import Link from "next/link";
import type { ReactNode } from "react";
import {
  calculatorAreaUnitDefinitions,
  calculatorLengthUnitDefinitions,
  powerUnitDefinitions,
  temperatureDifferenceUnitDefinitions,
  thermalConductivityUnitDefinitions,
  type CalculatorLocale,
} from "../../converter/engineeringCalculatorUnits";
import { formatEngineeringValue } from "../../converter/pressureForceArea";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import { conductivityPresets } from "../../converter/heatConduction";
import HeatConductionCalculator from "./HeatConductionCalculator";

type UnitTableSection = {
  id: string;
  heading: string;
  siSymbol: string;
  units: ReadonlyArray<EngineeringUnitDefinition>;
};

type PageCopy = {
  breadcrumbs: Array<{ label: string; href?: string }>;
  breadcrumbLabel: string;
  title: string;
  description: string;
  heroEyebrow: string;
  heroResultHeading: string;
  introHeading: string;
  formulasHeading: string;
  variablesHeading: string;
  presetHeading: string;
  materialTableHeading: string;
  materialTableColumns: { material: string; conductivity: string };
  unitsHeading: string;
  examplesHeading: string;
  applicationsHeading: string;
  limitationsHeading: string;
  sourcesHeading: string;
  relatedHeading: string;
  relatedCalculatorsHeading: string;
  relatedConversionsHeading: string;
  tableColumns: {
    unitName: string;
    symbol: string;
    siEquivalent: string;
    typicalUse: string;
  };
  intro: string[];
  formulas: string[];
  variables: Array<{ term: string; explanation: string }>;
  presetNotes: string[];
  examples: Array<{ title: string; body: string }>;
  applications: string[];
  limitations: string[];
  sources: Array<{ label: string; href: string }>;
  relatedCalculators: Array<{ label: string; href: string }>;
  relatedConversions: Array<{ label: string; href: string }>;
};

const unitSectionHeadings = {
  tr: {
    power: "Güç birimleri",
    conductivity: "Isıl iletkenlik birimleri",
    area: "Alan birimleri",
    length: "Kalınlık birimleri",
    temperatureDifference: "Sıcaklık farkı birimleri",
  },
  en: {
    power: "Power units",
    conductivity: "Thermal-conductivity units",
    area: "Area units",
    length: "Thickness units",
    temperatureDifference: "Temperature-difference units",
  },
  de: {
    power: "Leistungseinheiten",
    conductivity: "Wärmeleitfähigkeitseinheiten",
    area: "Flächeneinheiten",
    length: "Dickeneinheiten",
    temperatureDifference: "Temperaturdifferenzeinheiten",
  },
} as const;

function getUnitSections(locale: CalculatorLocale): UnitTableSection[] {
  const headings =
    locale === "ar"
      ? {
          power: "وحدات القدرة",
          conductivity: "وحدات الموصلية الحرارية",
          area: "وحدات المساحة",
          length: "وحدات السمك",
          temperatureDifference: "وحدات فرق الحرارة",
        }
      : unitSectionHeadings[locale];

  return [
    {
      id: "power-units",
      heading: headings.power,
      siSymbol: "W",
      units: powerUnitDefinitions,
    },
    {
      id: "conductivity-units",
      heading: headings.conductivity,
      siSymbol: "W/(m·K)",
      units: thermalConductivityUnitDefinitions,
    },
    {
      id: "area-units",
      heading: headings.area,
      siSymbol: "m²",
      units: calculatorAreaUnitDefinitions,
    },
    {
      id: "length-units",
      heading: headings.length,
      siSymbol: "m",
      units: calculatorLengthUnitDefinitions,
    },
    {
      id: "temperature-difference-units",
      heading: headings.temperatureDifference,
      siSymbol: "K",
      units: temperatureDifferenceUnitDefinitions,
    },
  ];
}

const pageCopy: Record<
  Exclude<CalculatorLocale, "ar">,
  PageCopy
> = {
  tr: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Hesaplayıcılar", href: "/muhendislik-hesaplayicilari" },
      { label: "Isı İletimi Hesaplayıcısı" },
    ],
    breadcrumbLabel: "Sayfa yolu",
    title: "Isı İletimi Hesaplayıcısı",
    description:
      "Q̇ = k × A × ΔT / L bağıntısıyla ısı geçiş hızını, ısıl iletkenliği, alanı, sıcaklık farkını veya kalınlığı hesaplayın. Sonuç SI eşdeğeri ve yerine koyulmuş formülle birlikte aynı mavi-turkuaz hesaplayıcı düzeninde gösterilir.",
    heroEyebrow: "MÜHENDİSLİK HESAPLAYICISI",
    heroResultHeading: "Hesaplama sonucu",
    introHeading: "Isı iletimi hesabı neyi temsil eder?",
    formulasHeading: "Kullanılan formüller",
    variablesHeading: "Değişkenler ve SI birimleri",
    presetHeading: "Malzeme ön ayarları hakkında",
    materialTableHeading: "Malzeme Isıl İletkenlik Tablosu",
    materialTableColumns: {
      material: "Malzeme",
      conductivity: "Isıl İletkenlik (W/(m·K))",
    },
    unitsHeading: "Birim tabloları",
    examplesHeading: "Örnek kullanım",
    applicationsHeading: "Tipik kullanım alanları",
    limitationsHeading: "Varsayımlar ve sınırlamalar",
    sourcesHeading: "Kaynaklar",
    relatedHeading: "İlgili bağlantılar",
    relatedCalculatorsHeading: "İlgili hesaplayıcılar",
    relatedConversionsHeading: "İlgili dönüşümler",
    tableColumns: {
      unitName: "Birim adı",
      symbol: "Sembol",
      siEquivalent: "SI karşılığı",
      typicalUse: "Yaygın kullanım",
    },
    intro: [
      "Bu araç düzlemsel ve tek boyutlu iletim yaklaşımı altında ısı geçiş hızını ya da formüldeki ters değişkenleri çözer.",
      "Yalıtım kalınlığı, plaka ısı kaybı, malzeme karşılaştırması ve ilk tasarım değerlendirmelerinde hızlı kontrol sağlar.",
    ],
    formulas: [
      "Q̇ = k × A × ΔT / L",
      "k = Q̇ × L / (A × ΔT)",
      "A = Q̇ × L / (k × ΔT)",
      "ΔT = Q̇ × L / (k × A)",
      "L = k × A × ΔT / Q̇",
    ],
    variables: [
      {
        term: "Q̇",
        explanation: "Isı geçiş hızı veya ısı akısıdır. SI birimi W.",
      },
      {
        term: "k",
        explanation: "Malzemenin ısıl iletkenliğidir. SI birimi W/(m·K).",
      },
      {
        term: "A",
        explanation: "Isı transferine katılan kesit veya yüzey alanıdır. SI birimi m².",
      },
      {
        term: "ΔT",
        explanation: "İki yüzey veya iki taraf arasındaki sıcaklık farkıdır. SI birimi K.",
      },
      {
        term: "L",
        explanation: "Isı iletim yönündeki kalınlıktır. SI birimi m.",
      },
    ],
    presetNotes: [
      "Bakır, alüminyum, çelik, cam, beton, ahşap ve hava ön ayarları yaklaşık oda koşulu değerleriyle sunulur.",
      "Gerçek iletkenlik; sıcaklık, lif yönü, nem, alaşım oranı ve üretim yöntemine göre belirgin biçimde değişebilir.",
      "Cam yünü, taş yünü, EPS, XPS ve poliüretan köpük değerleri TS 825 kapsamındaki tipik hesap değerleridir; yoğunluğa ve üreticiye göre gerçek değer değişebilir.",
    ],
    examples: [
      {
        title: "Bakır levha ile ısı geçişi",
        body:
          "k = 401 W/(m·K), A = 0.02 m², ΔT = 15 °C ve L = 0.02 m için ısı geçiş hızı 6.015 kW olur.",
      },
      {
        title: "Bilinen yük için gerekli yalıtım kalınlığı",
        body:
          "Q̇ = 200 W, k = 0.04 W/(m·K), A = 4 m² ve ΔT = 25 °C için gerekli kalınlık yaklaşık 20 mm bulunur.",
      },
    ],
    applications: [
      "Duvar ve yalıtım katmanı ilk boyutlandırmaları",
      "Plaka veya levha üzerinden ısı kaybı tahminleri",
      "Malzeme değişiminin iletim üzerindeki etkisini hızlı karşılaştırma",
      "Basit bir boyutlu iletim varsayımıyla eğitim ve ön proje hesapları",
    ],
    limitations: [
      "Bu formül tek boyutlu, kararlı ve sabit özellikli iletim varsayar.",
      "Temas direnci, çok katmanlı yapı, radyasyon ve taşınım etkileri bu temel çözümde yer almaz.",
      "Malzeme ön ayarları yaklaşık değerlerdir; kesin tasarım için üretici veya deneysel veri kullanılmalıdır.",
    ],
    sources: [
      {
        label: "OpenStax University Physics - Temperature and Heat",
        href: "https://openstax.org/books/university-physics-volume-2/pages/1-introduction",
      },
      {
        label: "BIPM SI Brochure",
        href: "https://www.bipm.org/en/publications/si-brochure",
      },
      {
        label: "NIST Guide to the SI",
        href: "https://www.nist.gov/pml/special-publication-811",
      },
    ],
    relatedCalculators: [
      {
        label: "Isı Enerjisi Hesaplayıcısı",
        href: "/hesaplayicilar/isi-enerjisi",
      },
      {
        label: "Reynolds Sayısı Hesaplayıcısı",
        href: "/hesaplayicilar/reynolds-sayisi",
      },
      {
        label: "Mühendislik Hesaplayıcıları merkezi",
        href: "/muhendislik-hesaplayicilari",
      },
    ],
    relatedConversions: [
      { label: "Metre → Santimetre", href: "/metre-santimetre" },
      { label: "Santimetre → İnç", href: "/santimetre-inc" },
    ],
  },
  en: {
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Calculators", href: "/en/engineering-calculators" },
      { label: "Heat Conduction Calculator" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Heat Conduction Calculator",
    description:
      "Use Q̇ = k × A × ΔT / L to solve heat-transfer rate, thermal conductivity, area, temperature difference or thickness. The result is shown with an SI equivalent and substituted formula in the existing blue-turquoise calculator layout.",
    heroEyebrow: "ENGINEERING CALCULATOR",
    heroResultHeading: "Calculation result",
    introHeading: "What does this conduction tool represent?",
    formulasHeading: "Formulas used",
    variablesHeading: "Variables and SI units",
    presetHeading: "About the material presets",
    materialTableHeading: "Material Thermal Conductivity Table",
    materialTableColumns: {
      material: "Material",
      conductivity: "Thermal Conductivity (W/(m·K))",
    },
    unitsHeading: "Unit reference tables",
    examplesHeading: "Worked examples",
    applicationsHeading: "Typical applications",
    limitationsHeading: "Assumptions and limitations",
    sourcesHeading: "Sources",
    relatedHeading: "Related links",
    relatedCalculatorsHeading: "Related calculators",
    relatedConversionsHeading: "Related conversions",
    tableColumns: {
      unitName: "Unit name",
      symbol: "Symbol",
      siEquivalent: "SI equivalent",
      typicalUse: "Typical use",
    },
    intro: [
      "This tool solves a steady one-dimensional conduction relationship for heat-transfer rate or any inverse variable in the formula.",
      "It is helpful for insulation thickness checks, wall heat-loss estimates, material comparisons and first-pass thermal sizing.",
    ],
    formulas: [
      "Q̇ = k × A × ΔT / L",
      "k = Q̇ × L / (A × ΔT)",
      "A = Q̇ × L / (k × ΔT)",
      "ΔT = Q̇ × L / (k × A)",
      "L = k × A × ΔT / Q̇",
    ],
    variables: [
      {
        term: "Q̇",
        explanation: "Heat-transfer rate. SI unit: W.",
      },
      {
        term: "k",
        explanation: "Thermal conductivity of the material. SI unit: W/(m·K).",
      },
      {
        term: "A",
        explanation: "Area participating in the heat transfer. SI unit: m².",
      },
      {
        term: "ΔT",
        explanation: "Temperature difference across the layer. SI unit: K.",
      },
      {
        term: "L",
        explanation: "Thickness in the direction of heat flow. SI unit: m.",
      },
    ],
    presetNotes: [
      "Copper, aluminum, steel, glass, concrete, wood and air presets are provided as approximate room-condition values.",
      "Real conductivity can change significantly with temperature, fiber direction, moisture, alloy content and manufacturing method.",
      "Glass wool, rock wool, EPS, XPS and polyurethane foam values are typical calculation values under the TS 825 standard; actual values vary by density and manufacturer.",
    ],
    examples: [
      {
        title: "Heat flow through a copper plate",
        body:
          "For k = 401 W/(m·K), A = 0.02 m², ΔT = 15 °C and L = 0.02 m, the heat-transfer rate is 6.015 kW.",
      },
      {
        title: "Required insulation thickness for a known load",
        body:
          "With Q̇ = 200 W, k = 0.04 W/(m·K), A = 4 m² and ΔT = 25 °C, the required thickness is about 20 mm.",
      },
    ],
    applications: [
      "Preliminary wall and insulation sizing",
      "Heat-loss estimates through plates and flat layers",
      "Quick comparison of material conductivity choices",
      "Educational and concept-stage one-dimensional conduction checks",
    ],
    limitations: [
      "The formula assumes steady one-dimensional conduction with constant properties.",
      "Contact resistance, multilayer walls, radiation and convection are not included in this basic solution.",
      "Preset material values are approximate; use supplier or test data for final design work.",
    ],
    sources: [
      {
        label: "OpenStax University Physics - Temperature and Heat",
        href: "https://openstax.org/books/university-physics-volume-2/pages/1-introduction",
      },
      {
        label: "BIPM SI Brochure",
        href: "https://www.bipm.org/en/publications/si-brochure",
      },
      {
        label: "NIST Guide to the SI",
        href: "https://www.nist.gov/pml/special-publication-811",
      },
    ],
    relatedCalculators: [
      {
        label: "Heat Energy Calculator",
        href: "/en/calculators/heat-energy",
      },
      {
        label: "Reynolds Number Calculator",
        href: "/en/calculators/reynolds-number",
      },
      {
        label: "Engineering Calculators hub",
        href: "/en/engineering-calculators",
      },
    ],
    relatedConversions: [
      { label: "Meters to Centimeters", href: "/en/meters-to-centimeters" },
      { label: "Centimeters to Inches", href: "/en/centimeters-to-inches" },
    ],
  },
  de: {
    breadcrumbs: [
      { label: "Startseite", href: "/de" },
      { label: "Rechner", href: "/de/ingenieurrechner" },
      { label: "Wärmeleitungsrechner" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Wärmeleitungsrechner",
    description:
      "Berechnen Sie mit Q̇ = k × A × ΔT / L die Wärmestromrate, die Wärmeleitfähigkeit, die Fläche, die Temperaturdifferenz oder die Dicke. Das Ergebnis wird mit SI-Äquivalent und eingesetzter Formel im selben blau-türkisen Rechner-Layout angezeigt.",
    heroEyebrow: "INGENIEURRECHNER",
    heroResultHeading: "Berechnungsergebnis",
    introHeading: "Wofür steht diese Wärmeleitungsberechnung?",
    formulasHeading: "Verwendete Formeln",
    variablesHeading: "Variablen und SI-Einheiten",
    presetHeading: "Über die Materialvoreinstellungen",
    materialTableHeading: "Wärmeleitfähigkeitstabelle für Materialien",
    materialTableColumns: {
      material: "Material",
      conductivity: "Wärmeleitfähigkeit (W/(m·K))",
    },
    unitsHeading: "Einheitentabellen",
    examplesHeading: "Anwendungsbeispiele",
    applicationsHeading: "Typische Anwendungsbereiche",
    limitationsHeading: "Annahmen und Einschränkungen",
    sourcesHeading: "Quellen",
    relatedHeading: "Verwandte Links",
    relatedCalculatorsHeading: "Verwandte Rechner",
    relatedConversionsHeading: "Verwandte Umrechnungen",
    tableColumns: {
      unitName: "Einheitenname",
      symbol: "Symbol",
      siEquivalent: "SI-Äquivalent",
      typicalUse: "Typische Verwendung",
    },
    intro: [
      "Dieses Werkzeug löst eine stationäre, eindimensionale Wärmeleitungsbeziehung für die Wärmestromrate oder jede andere Variable in der Formel.",
      "Es ist hilfreich für die Kontrolle von Dämmstärken, Wärmeverlustschätzungen an Wänden, Materialvergleiche und erste thermische Auslegungen.",
    ],
    formulas: [
      "Q̇ = k × A × ΔT / L",
      "k = Q̇ × L / (A × ΔT)",
      "A = Q̇ × L / (k × ΔT)",
      "ΔT = Q̇ × L / (k × A)",
      "L = k × A × ΔT / Q̇",
    ],
    variables: [
      {
        term: "Q̇",
        explanation: "Wärmestromrate. SI-Einheit: W.",
      },
      {
        term: "k",
        explanation:
          "Wärmeleitfähigkeit des Materials. SI-Einheit: W/(m·K).",
      },
      {
        term: "A",
        explanation:
          "An der Wärmeübertragung beteiligte Fläche. SI-Einheit: m².",
      },
      {
        term: "ΔT",
        explanation:
          "Temperaturdifferenz über die Schicht. SI-Einheit: K.",
      },
      {
        term: "L",
        explanation:
          "Dicke in Richtung des Wärmestroms. SI-Einheit: m.",
      },
    ],
    presetNotes: [
      "Die Voreinstellungen für Kupfer, Aluminium, Stahl, Glas, Beton, Holz und Luft sind ungefähre Werte bei Raumbedingungen.",
      "Die tatsächliche Leitfähigkeit kann sich mit Temperatur, Faserrichtung, Feuchtigkeit, Legierungsanteil und Herstellungsverfahren deutlich ändern.",
      "Die Werte für Glaswolle, Steinwolle, EPS, XPS und Polyurethanschaum sind typische Berechnungswerte nach TS 825; die tatsächlichen Werte variieren je nach Dichte und Hersteller.",
    ],
    examples: [
      {
        title: "Wärmestrom durch eine Kupferplatte",
        body:
          "Für k = 401 W/(m·K), A = 0,02 m², ΔT = 15 °C und L = 0,02 m beträgt die Wärmestromrate 6,015 kW.",
      },
      {
        title: "Erforderliche Dämmstärke bei bekannter Last",
        body:
          "Bei Q̇ = 200 W, k = 0,04 W/(m·K), A = 4 m² und ΔT = 25 °C ergibt sich eine erforderliche Dicke von etwa 20 mm.",
      },
    ],
    applications: [
      "Erste Auslegung von Wand- und Dämmschichten",
      "Wärmeverlustschätzungen durch Platten und flache Schichten",
      "Schneller Vergleich von Materialleitfähigkeiten",
      "Lehr- und Konzeptbeispiele für eindimensionale Wärmeleitung",
    ],
    limitations: [
      "Die Formel setzt stationäre, eindimensionale Wärmeleitung mit konstanten Eigenschaften voraus.",
      "Kontaktwiderstand, mehrschichtige Wände, Strahlung und Konvektion sind in dieser Basislösung nicht enthalten.",
      "Die Materialvoreinstellungen sind Näherungswerte; für die endgültige Auslegung sollten Herstellerangaben oder Messdaten verwendet werden.",
    ],
    sources: [
      {
        label: "OpenStax University Physics - Temperature and Heat",
        href: "https://openstax.org/books/university-physics-volume-2/pages/1-introduction",
      },
      {
        label: "BIPM SI Brochure",
        href: "https://www.bipm.org/en/publications/si-brochure",
      },
      {
        label: "NIST Guide to the SI",
        href: "https://www.nist.gov/pml/special-publication-811",
      },
    ],
    relatedCalculators: [
      {
        label: "Wärmeenergie-Rechner",
        href: "/de/rechner/waermeenergie",
      },
      {
        label: "Reynolds-Zahl-Rechner",
        href: "/de/rechner/reynolds-zahl",
      },
      {
        label: "Ingenieurrechner-Zentrum",
        href: "/de/ingenieurrechner",
      },
    ],
    relatedConversions: [
      { label: "Meter → Zentimeter", href: "/de/meter-zentimeter" },
      { label: "Zentimeter → Zoll", href: "/de/zentimeter-zoll" },
    ],
  },
};

const arabicCopy: PageCopy = {
  breadcrumbs: [
    { label: "الرئيسية", href: "/ar" },
    { label: "الحاسبات الهندسية", href: "/ar/engineering-calculators" },
    { label: "حاسبة انتقال الحرارة بالتوصيل" },
  ],
  breadcrumbLabel: "مسار التنقل",
  title: "حاسبة انتقال الحرارة بالتوصيل",
  description:
    "استخدم Q̇ = k × A × ΔT / L لحساب معدل انتقال الحرارة أو الموصلية أو المساحة أو فرق الحرارة أو السماكة بواجهة عربية متسقة.",
  heroEyebrow: "حاسبة هندسية",
  heroResultHeading: "نتيجة الحساب",
  introHeading: "ماذا تمثل هذه الأداة؟",
  formulasHeading: "المعادلات المستخدمة",
  variablesHeading: "المتغيرات ووحدات SI",
  presetHeading: "حول القيم الجاهزة للمواد",
  materialTableHeading: "جدول الموصلية الحرارية للمواد",
  materialTableColumns: {
    material: "المادة",
    conductivity: "الموصلية الحرارية (W/(m·K))",
  },
  unitsHeading: "جداول الوحدات",
  examplesHeading: "أمثلة سريعة",
  applicationsHeading: "استخدامات شائعة",
  limitationsHeading: "الافتراضات والقيود",
  sourcesHeading: "المراجع",
  relatedHeading: "روابط مرتبطة",
  relatedCalculatorsHeading: "حاسبات مرتبطة",
  relatedConversionsHeading: "تحويلات مرتبطة",
  tableColumns: {
    unitName: "اسم الوحدة",
    symbol: "الرمز",
    siEquivalent: "مكافئ SI",
    typicalUse: "الاستخدام الشائع",
  },
  intro: [
    "تحل هذه الأداة علاقة التوصيل الحراري الأحادي البعد في الحالة المستقرة.",
    "وهي مفيدة في فحوص العزل الأولية وفقد الحرارة عبر الجدران والمقارنات بين المواد.",
  ],
  formulas: [
    "Q̇ = k × A × ΔT / L",
    "k = Q̇ × L / (A × ΔT)",
    "A = Q̇ × L / (k × ΔT)",
    "ΔT = Q̇ × L / (k × A)",
    "L = k × A × ΔT / Q̇",
  ],
  variables: [
    { term: "Q̇", explanation: "معدل انتقال الحرارة بوحدة W." },
    { term: "k", explanation: "الموصلية الحرارية للمادة بوحدة W/(m·K)." },
    { term: "A", explanation: "المساحة المشاركة في انتقال الحرارة بوحدة m²." },
    { term: "ΔT", explanation: "فرق الحرارة عبر الطبقة بوحدة K." },
    { term: "L", explanation: "السماكة في اتجاه انتقال الحرارة بوحدة m." },
  ],
  presetNotes: [
    "القيم الجاهزة للنحاس والألمنيوم والفولاذ والزجاج والخرسانة والخشب والهواء تقريبية ومناسبة للمراجعات الأولية.",
    "تتغير الموصلية الحرارية فعليا مع الحرارة والرطوبة والبنية الداخلية وطريقة التصنيع.",
    "قيم الصوف الزجاجي والصوف الصخري وEPS وXPS ورغوة البولي يوريثان هي قيم حسابية نموذجية ضمن معيار TS 825؛ قد تختلف القيمة الفعلية حسب الكثافة والمصنّع.",
  ],
  examples: [
    {
      title: "انتقال الحرارة عبر لوح نحاسي",
      body: "عند k = 401 W/(m·K) وA = 0.02 m² وΔT = 15 °C وL = 0.02 m تكون النتيجة 6.015 kW.",
    },
    {
      title: "سماكة عزل مطلوبة لحمل معروف",
      body: "إذا كان Q̇ = 200 W وk = 0.04 W/(m·K) وA = 4 m² وΔT = 25 °C فالسماكة المطلوبة تقارب 20 mm.",
    },
  ],
  applications: [
    "تقدير سماكات العزل",
    "فحوص فقد الحرارة عبر الجدران والصفائح",
    "مقارنة أثر تغيير المادة",
    "حسابات تعليمية وتمهيدية في انتقال الحرارة",
  ],
  limitations: [
    "يفترض النموذج توصيلا أحادي البعد وثابتا مع الزمن والخواص.",
    "لا يشمل مقاومة التلامس أو الإشعاع أو الحمل الحراري أو الجدران متعددة الطبقات.",
    "القيم الجاهزة تقريبية ويجب استبدالها ببيانات موثوقة في التصميم النهائي.",
  ],
  sources: [
    {
      label: "OpenStax University Physics - Temperature and Heat",
      href: "https://openstax.org/books/university-physics-volume-2/pages/1-introduction",
    },
    {
      label: "BIPM SI Brochure",
      href: "https://www.bipm.org/en/publications/si-brochure",
    },
    {
      label: "NIST Guide to the SI",
      href: "https://www.nist.gov/pml/special-publication-811",
    },
  ],
  relatedCalculators: [
    {
      label: "حاسبة الطاقة الحرارية",
      href: "/ar/calculators/heat-energy",
    },
    {
      label: "حاسبة عدد رينولدز",
      href: "/ar/calculators/reynolds-number",
    },
    {
      label: "مركز الحاسبات الهندسية",
      href: "/ar/engineering-calculators",
    },
  ],
  relatedConversions: [
    { label: "Meters إلى Centimeters", href: "/ar/meters-to-centimeters" },
    { label: "Centimeters إلى Inches", href: "/ar/centimeters-to-inches" },
  ],
};

function renderUnitName(
  unit: EngineeringUnitDefinition,
  locale: CalculatorLocale
) {
  return locale === "tr" ? unit.trName : unit.enName;
}

function renderTypicalUse(
  unit: EngineeringUnitDefinition,
  locale: CalculatorLocale
) {
  return locale === "tr" ? unit.typicalUseTr : unit.typicalUseEn;
}

export default function HeatConductionPage({
  locale,
  structuredData,
}: {
  locale: CalculatorLocale;
  structuredData?: ReactNode;
}) {
  const copy = locale === "ar" ? arabicCopy : pageCopy[locale];
  const unitSections = getUnitSections(locale);

  return (
    <main className="calculator-page">
      {structuredData}

      <div className="conversion-breadcrumb-wrap">
        <nav
          className="breadcrumbs"
          aria-label={copy.breadcrumbLabel}
        >
          {copy.breadcrumbs.map((breadcrumb, index) => (
            <span key={`${breadcrumb.label}-${index}`}>
              {index > 0 && <span aria-hidden="true">›</span>}
              {breadcrumb.href ? (
                <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
              ) : (
                <span>{breadcrumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>

      <HeatConductionCalculator
        locale={locale}
        eyebrow={copy.heroEyebrow}
        title={copy.title}
        description={copy.description}
        resultHeading={copy.heroResultHeading}
      />

      <article className="conversion-content calculator-content">
        <section className="conversion-section">
          <h2>{copy.introHeading}</h2>
          {copy.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="conversion-section">
          <h2>{copy.formulasHeading}</h2>
          <ul className="calculator-bullet-list">
            {copy.formulas.map((formula) => (
              <li key={formula}>{formula}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section">
          <h2>{copy.presetHeading}</h2>
          <div className="engineering-note-box">
            <ul className="calculator-bullet-list">
              {copy.presetNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>{copy.materialTableHeading}</caption>
              <thead>
                <tr>
                  <th scope="col">{copy.materialTableColumns.material}</th>
                  <th scope="col">{copy.materialTableColumns.conductivity}</th>
                </tr>
              </thead>
              <tbody>
                {conductivityPresets[locale]
                  .filter((preset) => preset.id !== "custom")
                  .map((preset) => (
                    <tr key={preset.id}>
                      <td>{preset.label}</td>
                      <td>{preset.value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="conversion-section">
          <h2>{copy.unitsHeading}</h2>
          <div className="calculator-unit-sections">
            {unitSections.map((section) => (
              <section
                className="calculator-unit-section"
                id={section.id}
                key={section.id}
              >
                <h3>{section.heading}</h3>

                <div className="conversion-table-wrap">
                  <table className="conversion-table">
                    <thead>
                      <tr>
                        <th>{copy.tableColumns.unitName}</th>
                        <th>{copy.tableColumns.symbol}</th>
                        <th>{copy.tableColumns.siEquivalent}</th>
                        <th>{copy.tableColumns.typicalUse}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.units.map((unit) => (
                        <tr key={`${section.id}-${unit.symbol}`}>
                          <td>{renderUnitName(unit, locale)}</td>
                          <td>{unit.symbol}</td>
                          <td>
                            {formatEngineeringValue(unit.factorToSI, locale)}{" "}
                            {section.siSymbol}
                          </td>
                          <td>{renderTypicalUse(unit, locale)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="conversion-section">
          <h2>{copy.examplesHeading}</h2>
          <div className="calculator-example-list">
            {copy.examples.map((example) => (
              <article key={example.title}>
                <h3>{example.title}</h3>
                <p>{example.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="conversion-section">
          <h2>{copy.applicationsHeading}</h2>
          <ul className="calculator-bullet-list">
            {copy.applications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section">
          <h2>{copy.limitationsHeading}</h2>
          <ul className="calculator-bullet-list">
            {copy.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section unit-sources">
          <h2>{copy.sourcesHeading}</h2>
          <ol>
            {copy.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noreferrer">
                  {source.label}
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className="conversion-section">
          <h2>{copy.relatedHeading}</h2>

          <h3>{copy.relatedCalculatorsHeading}</h3>
          <ul className="related-conversion-list">
            {copy.relatedCalculators.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <h3>{copy.relatedConversionsHeading}</h3>
          <ul className="related-conversion-list">
            {copy.relatedConversions.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
