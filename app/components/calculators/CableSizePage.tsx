import Link from "next/link";
import type { ReactNode } from "react";
import {
  calculatorLengthUnitDefinitions,
  currentUnitDefinitions,
  formatCalculatorUnitName,
  voltageUnitDefinitions,
} from "../../converter/engineeringCalculatorUnits";
import { formatEngineeringValue } from "../../converter/pressureForceArea";
import type { CalculatorLocale } from "../../converter/pressureForceArea";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import {
  resistivityReferenceTable,
  STANDARD_CROSS_SECTIONS_MM2,
} from "../../converter/electricalConductor";
import CableSizeCalculator from "./CableSizeCalculator";

type UnitTableSection = {
  id: string;
  heading: string;
  siSymbol: string;
  units: ReadonlyArray<EngineeringUnitDefinition>;
};

const unitSectionHeadings = {
  tr: {
    voltage: "Gerilim birimleri",
    current: "Akım birimleri",
    length: "Uzunluk birimleri",
  },
  en: {
    voltage: "Voltage units",
    current: "Current units",
    length: "Length units",
  },
  de: {
    voltage: "Spannungseinheiten",
    current: "Stromeinheiten",
    length: "Langeneinheiten",
  },
  ar: {
    voltage: "وحدات الجهد",
    current: "وحدات التيار",
    length: "وحدات الطول",
  },
} as const;

function getUnitSections(locale: CalculatorLocale): UnitTableSection[] {
  const headings =
    unitSectionHeadings[locale === "ar" ? "en" : locale];

  return [
    {
      id: "voltage-units",
      heading: headings.voltage,
      siSymbol: "V",
      units: voltageUnitDefinitions,
    },
    {
      id: "current-units",
      heading: headings.current,
      siSymbol: "A",
      units: currentUnitDefinitions,
    },
    {
      id: "length-units",
      heading: headings.length,
      siSymbol: "m",
      units: calculatorLengthUnitDefinitions,
    },
  ];
}

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
  unitsHeading: string;
  standardHeading: string;
  standardIntro: string;
  resistivityTableHeading: string;
  resistivityTableColumns: { material: string; resistivity: string };
  examplesHeading: string;
  applicationsHeading: string;
  limitationsHeading: string;
  sourcesHeading: string;
  relatedHeading: string;
  relatedCalculatorsHeading: string;
  relatedGuidesHeading: string;
  tableColumns: {
    unitName: string;
    symbol: string;
    siEquivalent: string;
    typicalUse: string;
  };
  intro: string[];
  formulas: string[];
  variables: Array<{ term: string; explanation: string }>;
  examples: Array<{ title: string; body: string }>;
  applications: string[];
  limitations: string[];
  sources: Array<{ label: string; href: string }>;
  relatedCalculators: Array<{ label: string; href: string }>;
  relatedGuides: Array<{ label: string; href: string }>;
};

const copy: Record<CalculatorLocale, PageCopy> = {
  tr: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      {
        label: "Elektrik Hesapları",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari",
      },
      { label: "Kablo Kesiti Hesaplama" },
    ],
    breadcrumbLabel: "Sayfa yolu",
    title: "Kablo Kesiti Hesaplama",
    description:
      "Akım, mesafe, faz tipi ve izin verilen gerilim dusumune göre gerekli minimum iletken kesitini hesaplayın; sonuç en yakın standart keside de yuvarlanır.",
    heroEyebrow: "ELEKTRIK HESAPLAYICISI",
    heroResultHeading: "Kesit sonucu",
    introHeading: "Bu kablo kesiti aracı ne için kullanılır?",
    formulasHeading: "Kullanılan formül",
    variablesHeading: "Değişkenler ve anlamları",
    unitsHeading: "Birim tabloları",
    standardHeading: "Standart kesit tablosu",
    standardIntro:
      "Sonuç, aşağıdaki yaygın ticari kesit değerlerinden hesaplanan minimuma eşit veya ondan büyük olan ilk değere yuvarlanır (mm²):",
    resistivityTableHeading: "İletken Özdirenç Tablosu",
    resistivityTableColumns: {
      material: "Malzeme",
      resistivity: "Özdirenç (Ohm*mm2/m)",
    },
    examplesHeading: "Örnek kullanım",
    applicationsHeading: "Tipik kullanım alanları",
    limitationsHeading: "Varsayımlar ve sınırlamalar",
    sourcesHeading: "Kaynaklar",
    relatedHeading: "İlgili bağlantılar",
    relatedCalculatorsHeading: "İlgili hesaplayıcılar",
    relatedGuidesHeading: "İlgili birim rehberleri",
    tableColumns: {
      unitName: "Birim adı",
      symbol: "Sembol",
      siEquivalent: "SI karşılığı",
      typicalUse: "Yaygın kullanım",
    },
    intro: [
      "Bu araç, hat akımı, kablo uzunluğu, iletken malzemesi ve izin verilen gerilim düşümü yüzdesinden yola çıkarak gerilim düşümü sınırını karşılayan minimum iletken kesitini hesaplar.",
      "Pano besleme hatları, motor ve sürücü bağlantıları ve uzak saha ekipmanı beslemeleri için ilk kesit tahmini olarak kullanılabilir.",
    ],
    formulas: [
      "Genel: A = k x I x L x ρ / ΔU",
      "Bu, gerilim düşümü formülünün (ΔU = k x I x L x ρ / A) kesit için çözülmüş halidir.",
    ],
    variables: [
      { term: "I", explanation: "Hat akımıdır." },
      { term: "L", explanation: "Kablonun tek yön uzunluğudur." },
      { term: "ρ", explanation: "İletken malzemesinin özgül direncidir (yaklaşık 20°C için bakır 0.0175, alüminyum 0.028 Ω·mm²/m)." },
      { term: "ΔU", explanation: "Kaynak geriliminden ve izin verilen yüzdeden hesaplanan izin verilen volt dusumudur." },
      { term: "k", explanation: "Sistem tipine göre gidiş-dönüş veya üç faz katsayısıdır." },
      { term: "A", explanation: "Hesaplanan gerekli minimum kesittir." },
    ],
    examples: [
      {
        title: "400 V, 20 A, 50 m, %3 izin verilen düşüm, bakır, üç faz",
        body: "ΔU_izin = 400 x 0.03 = 12 V. A = 1.732 x 20 x 50 x 0.0175 / 12 yaklaşık 2.53 mm². En yakın standart kesit 4 mm² olur.",
      },
      {
        title: "230 V, 16 A, 25 m, %3 izin verilen düşüm, bakır, tek faz",
        body: "ΔU_izin = 230 x 0.03 = 6.9 V. A = 2 x 16 x 25 x 0.0175 / 6.9 yaklaşık 2.03 mm². En yakın standart kesit 2.5 mm² olur.",
      },
    ],
    applications: [
      "Pano besleme hatları",
      "Motor ve sürücü bağlantıları",
      "Uzak saha ekipmanı beslemeleri",
      "Proje keşiflerinde hızlı kesit on tahmini",
    ],
    limitations: [
      "Bu hesap yalnızca gerilim düşümü sınırına göre kesit önerir; akım taşıma kapasitesi (ampacity), dosema yöntemi, gruplama ve ortam sıcaklığı düzeltmeleri dahil değildir.",
      "Önerilen kesit, seçilen elektrik tesisat yönetmeliğine (örn. TS, IEC veya yerel yönetmelikler) göre ayrıca ampacity tablolarıyla doğrulanmalıdır.",
      "Kullanılan özgül direnç değerleri (bakır 0.0175, alüminyum 0.028 Ω·mm²/m) yaklaşık 20°C referans değerleridir.",
      "Hesaplanan kesit 300 mm² standart tablosunun üzerindeyse araç bir standart değer önermez; özel kesit veya paralel iletken çözümü değerlendirilmelidir.",
    ],
    sources: [
      {
        label: "IEC electrotechnical concepts and symbols",
        href: "https://www.iec.ch",
      },
      {
        label: "NIST Guide to the SI",
        href: "https://www.nist.gov/pml/special-publication-811",
      },
    ],
    relatedCalculators: [
      {
        label: "Gerilim Düşümü Hesaplayıcısı",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/gerilim-dusumu-hesaplama",
      },
      {
        label: "kW to Amper Hesaplayıcısı",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama",
      },
      {
        label: "Elektrik Hesapları merkezi",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari",
      },
    ],
    relatedGuides: [
      { label: "Amper (A) rehberi", href: "/birimler/amper" },
      { label: "Volt (V) rehberi", href: "/birimler/volt" },
      { label: "Metre (m) rehberi", href: "/birimler/metre" },
    ],
  },
  en: {
    breadcrumbs: [
      { label: "Home", href: "/en" },
      {
        label: "Electrical Calculators",
        href: "/en/engineering-calculators/electrical-calculators",
      },
      { label: "Cable Size Calculator" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Cable Size Calculator",
    description:
      "Calculate the minimum required conductor cross-section from current, distance, phase type and allowable voltage drop; the result is also rounded up to the nearest standard cross-section.",
    heroEyebrow: "ELECTRICAL CALCULATOR",
    heroResultHeading: "Cross-section result",
    introHeading: "What is this cable size tool used for?",
    formulasHeading: "Formula used",
    variablesHeading: "Variables and meaning",
    unitsHeading: "Unit reference tables",
    standardHeading: "Standard cross-section table",
    standardIntro:
      "The result is rounded up to the first value at or above the calculated minimum from these common commercial cross-sections (mm²):",
    resistivityTableHeading: "Conductor Resistivity Table",
    resistivityTableColumns: {
      material: "Material",
      resistivity: "Resistivity (Ω·mm²/m)",
    },
    examplesHeading: "Worked examples",
    applicationsHeading: "Typical applications",
    limitationsHeading: "Assumptions and limitations",
    sourcesHeading: "Sources",
    relatedHeading: "Related links",
    relatedCalculatorsHeading: "Related calculators",
    relatedGuidesHeading: "Related unit guides",
    tableColumns: {
      unitName: "Unit name",
      symbol: "Symbol",
      siEquivalent: "SI equivalent",
      typicalUse: "Typical use",
    },
    intro: [
      "This tool calculates the minimum conductor cross-section that satisfies a chosen voltage-drop limit, based on line current, cable length, conductor material and allowable voltage-drop percentage.",
      "It can be used as a first-pass cross-section estimate for panel feeder circuits, motor and drive connections and remote field-equipment feeds.",
    ],
    formulas: [
      "General: A = k x I x L x ρ / ΔU",
      "This is the voltage-drop formula (ΔU = k x I x L x ρ / A) solved for cross-section.",
    ],
    variables: [
      { term: "I", explanation: "Line current." },
      { term: "L", explanation: "One-way cable length." },
      { term: "ρ", explanation: "Conductor resistivity (approximate values at 20°C: copper 0.0175, aluminum 0.028 Ω·mm²/m)." },
      { term: "ΔU", explanation: "Allowable voltage drop, computed from source voltage and the allowed percentage." },
      { term: "k", explanation: "Return-conductor or three-phase factor depending on system type." },
      { term: "A", explanation: "Calculated required minimum cross-section." },
    ],
    examples: [
      {
        title: "400 V, 20 A, 50 m, 3% allowable drop, copper, three-phase",
        body: "ΔU_allowed = 400 x 0.03 = 12 V. A = 1.732 x 20 x 50 x 0.0175 / 12 which gives about 2.53 mm². The nearest standard cross-section is 4 mm².",
      },
      {
        title: "230 V, 16 A, 25 m, 3% allowable drop, copper, single-phase",
        body: "ΔU_allowed = 230 x 0.03 = 6.9 V. A = 2 x 16 x 25 x 0.0175 / 6.9 which gives about 2.03 mm². The nearest standard cross-section is 2.5 mm².",
      },
    ],
    applications: [
      "Panel feeder circuits",
      "Motor and drive connections",
      "Remote field-equipment feeds",
      "Quick cross-section estimates during project estimation",
    ],
    limitations: [
      "This calculation recommends a cross-section based on the voltage-drop limit only; current-carrying capacity (ampacity), installation method, grouping and ambient-temperature corrections are not included.",
      "The recommended cross-section must be verified separately against ampacity tables in the applicable electrical code (e.g. IEC, national or local regulations).",
      "The resistivity values used (copper 0.0175, aluminum 0.028 Ω·mm²/m) are approximate 20°C reference values.",
      "If the calculated cross-section exceeds the 300 mm² standard table, the tool does not suggest a standard value; a custom cross-section or parallel conductors should be evaluated.",
    ],
    sources: [
      {
        label: "IEC electrotechnical concepts and symbols",
        href: "https://www.iec.ch",
      },
      {
        label: "NIST Guide to the SI",
        href: "https://www.nist.gov/pml/special-publication-811",
      },
    ],
    relatedCalculators: [
      {
        label: "Voltage Drop Calculator",
        href: "/en/engineering-calculators/electrical-calculators/voltage-drop-calculator",
      },
      {
        label: "kW to Ampere Calculator",
        href: "/en/engineering-calculators/electrical-calculators/kw-to-ampere-calculator",
      },
      {
        label: "Electrical Calculators hub",
        href: "/en/engineering-calculators/electrical-calculators",
      },
    ],
    relatedGuides: [
      { label: "Ampere (A) guide", href: "/en/units/ampere" },
      { label: "Volt (V) guide", href: "/en/units/volt" },
      { label: "Meter (m) guide", href: "/en/units/meter" },
    ],
  },
  de: {
    breadcrumbs: [
      { label: "Startseite", href: "/de" },
      {
        label: "Elektrorechner",
        href: "/de/ingenieurrechner/elektrorechner",
      },
      { label: "Kabelquerschnitt Rechner" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Kabelquerschnitt Rechner",
    description:
      "Berechnen Sie den erforderlichen Mindestquerschnitt aus Strom, Entfernung, Phasentyp und zulässigem Spannungsfall; das Ergebnis wird zusätzlich auf den nächsten Normquerschnitt aufgerundet.",
    heroEyebrow: "ELEKTRORECHNER",
    heroResultHeading: "Querschnittsergebnis",
    introHeading: "Wofür wird dieses Kabelquerschnitt-Werkzeug verwendet?",
    formulasHeading: "Verwendete Formel",
    variablesHeading: "Variablen und Bedeutung",
    unitsHeading: "Einheitentabellen",
    standardHeading: "Normquerschnitt-Tabelle",
    standardIntro:
      "Das Ergebnis wird auf den ersten Wert aufgerundet, der größer oder gleich dem berechneten Minimum ist, aus diesen gängigen Handelsquerschnitten (mm²):",
    resistivityTableHeading: "Tabelle des spezifischen Widerstands von Leitern",
    resistivityTableColumns: {
      material: "Material",
      resistivity: "Spezifischer Widerstand (Ω·mm²/m)",
    },
    examplesHeading: "Anwendungsbeispiele",
    applicationsHeading: "Typische Anwendungen",
    limitationsHeading: "Annahmen und Grenzen",
    sourcesHeading: "Quellen",
    relatedHeading: "Verwandte Links",
    relatedCalculatorsHeading: "Verwandte Rechner",
    relatedGuidesHeading: "Passende Einheitenleitfaden",
    tableColumns: {
      unitName: "Einheitenname",
      symbol: "Symbol",
      siEquivalent: "SI-Äquivalent",
      typicalUse: "Typische Verwendung",
    },
    intro: [
      "Dieses Werkzeug berechnet den Mindestquerschnitt, der eine gewählte Spannungsfallgrenze einhalt, basierend auf Leitungsstrom, Kabellange, Leitermaterial und zulässigem Spannungsfall in Prozent.",
      "Es eignet sich als erste Querschnittsabschätzung für Zuleitungen zu Schaltschranken, Motor- und Umrichteranschlüsse sowie Versorgung entfernter Feldgerate.",
    ],
    formulas: [
      "Allgemein: A = k x I x L x ρ / ΔU",
      "Dies ist die nach dem Querschnitt aufgeloste Spannungsfallformel (ΔU = k x I x L x ρ / A).",
    ],
    variables: [
      { term: "I", explanation: "Leitungsstrom." },
      { term: "L", explanation: "Einfache Leitungslange." },
      { term: "ρ", explanation: "Spezifischer Widerstand des Leiters (Näherungswerte bei 20°C: Kupfer 0.0175, Aluminium 0.028 Ω·mm²/m)." },
      { term: "ΔU", explanation: "Zulässiger Spannungsfall, berechnet aus Versorgungsspannung und zulässigem Prozentsatz." },
      { term: "k", explanation: "Ruckleiter- oder Dreiphasenfaktor je nach Systemtyp." },
      { term: "A", explanation: "Berechneter erforderlicher Mindestquerschnitt." },
    ],
    examples: [
      {
        title: "400 V, 20 A, 50 m, 3 % zulässiger Fall, Kupfer, dreiphasig",
        body: "ΔU_zulässig = 400 x 0.03 = 12 V. A = 1.732 x 20 x 50 x 0.0175 / 12 und ergibt etwa 2.53 mm². Der nächste Normquerschnitt ist 4 mm².",
      },
      {
        title: "230 V, 16 A, 25 m, 3 % zulässiger Fall, Kupfer, einphasig",
        body: "ΔU_zulässig = 230 x 0.03 = 6.9 V. A = 2 x 16 x 25 x 0.0175 / 6.9 und ergibt etwa 2.03 mm². Der nächste Normquerschnitt ist 2.5 mm².",
      },
    ],
    applications: [
      "Zuleitungen zu Schaltschranken",
      "Motor- und Umrichteranschlüsse",
      "Versorgung entfernter Feldgerate",
      "Schnelle Querschnittsabschätzung in der Projektphase",
    ],
    limitations: [
      "Diese Berechnung empfiehlt einen Querschnitt nur anhand der Spannungsfallgrenze; Strombelastbarkeit (Ampacity), Verlegeart, Häufung und Temperaturkorrekturen sind nicht enthalten.",
      "Der empfohlene Querschnitt muss separat anhand von Ampacity-Tabellen der geltenden Elektrovorschrift (z. B. IEC, nationale oder lokale Vorschriften) bestätigt werden.",
      "Die verwendeten spezifischen Widerstande (Kupfer 0.0175, Aluminium 0.028 Ω·mm²/m) sind Näherungswerte bei 20°C.",
      "Überschreitet der berechnete Querschnitt die 300-mm²-Normtabelle, schlagt das Werkzeug keinen Normwert vor; ein Sonderquerschnitt oder parallele Leiter sollten geprüft werden.",
    ],
    sources: [
      {
        label: "IEC electrotechnical concepts and symbols",
        href: "https://www.iec.ch",
      },
      {
        label: "NIST Guide to the SI",
        href: "https://www.nist.gov/pml/special-publication-811",
      },
    ],
    relatedCalculators: [
      {
        label: "Spannungsfall Rechner",
        href: "/de/ingenieurrechner/elektrorechner/spannungsfall-rechner",
      },
      {
        label: "kW-zu-Ampere Rechner",
        href: "/de/ingenieurrechner/elektrorechner/kw-zu-ampere-rechner",
      },
      {
        label: "Elektrorechner-Zentrum",
        href: "/de/ingenieurrechner/elektrorechner",
      },
    ],
    relatedGuides: [
      { label: "Ampere (A) Leitfaden", href: "/de/einheiten/ampere" },
      { label: "Volt (V) Leitfaden", href: "/de/einheiten/volt" },
      { label: "Meter (m) Leitfaden", href: "/de/einheiten/meter" },
    ],
  },
  ar: {
    breadcrumbs: [
      { label: "الرئيسية", href: "/ar" },
      {
        label: "الحاسبات الكهربائية",
        href: "/ar/engineering-calculators/electrical-calculators",
      },
      { label: "حاسبة مقطع الكابل" },
    ],
    breadcrumbLabel: "مسار التنقل",
    title: "حاسبة مقطع الكابل",
    description:
      "احسب الحد الأدنى المطلوب لمساحة مقطع الموصل بناء على التيار والطول ونسبة هبوط الجهد المسموحة.",
    heroEyebrow: "حاسبة كهربائية",
    heroResultHeading: "نتيجة المقطع",
    introHeading: "متى تستخدم هذه الأداة؟",
    formulasHeading: "المعادلة المستخدمة",
    variablesHeading: "المتغيرات ومعناها",
    unitsHeading: "جداول الوحدات",
    standardHeading: "المقاطع القياسية",
    standardIntro:
      "بعد الحساب، تتم مقارنة النتيجة مع المقاطع التجارية الشائعة لاختيار أقرب مقطع قياسي أعلى أو مساوي للقيمة المطلوبة:",
    resistivityTableHeading: "جدول المقاومية النوعية للموصلات",
    resistivityTableColumns: {
      material: "المادة",
      resistivity: "المقاومية النوعية (Ω·mm²/m)",
    },
    examplesHeading: "أمثلة سريعة",
    applicationsHeading: "استخدامات شائعة",
    limitationsHeading: "افتراضات وحدود",
    sourcesHeading: "المراجع",
    relatedHeading: "روابط مرتبطة",
    relatedCalculatorsHeading: "حاسبات مرتبطة",
    relatedGuidesHeading: "أدلة وحدات مرتبطة",
    tableColumns: {
      unitName: "اسم الوحدة",
      symbol: "الرمز",
      siEquivalent: "مكافئ SI",
      typicalUse: "الاستخدام الشائع",
    },
    intro: [
      "تساعدك هذه الأداة على تقدير المقطع الأدنى المطلوب للكابل وفق حد هبوط الجهد الذي تقبله في المشروع.",
      "وهي مفيدة في المرحلة الأولى من الاختيار قبل مراجعة سعة التيار وطريقة التمديد ومتطلبات الكود.",
    ],
    formulas: [
      "A = k x I x L x ρ / ΔU",
      "وهي إعادة ترتيب لمعادلة هبوط الجهد لحل المقطع مباشرة.",
    ],
    variables: [
      { term: "I", explanation: "تيار الخط." },
      { term: "L", explanation: "طول الكابل في اتجاه واحد." },
      { term: "ρ", explanation: "المقاومية النوعية لمادة الموصل." },
      { term: "ΔU", explanation: "هبوط الجهد المسموح." },
      { term: "A", explanation: "المقطع الأدنى المطلوب." },
    ],
    examples: [
      {
        title: "400 V و20 A وطول 50 m وحد هبوط 3%",
        body: "في نظام ثلاثي الطور نحاسي تكون النتيجة التقريبية 2.53 mm² ويقترح عادة المقطع القياسي 4 mm².",
      },
      {
        title: "230 V و16 A وطول 25 m وحد هبوط 3%",
        body: "في نظام أحادي الطور نحاسي تكون النتيجة التقريبية 2.03 mm² ويقترح عادة 2.5 mm².",
      },
    ],
    applications: [
      "تقدير أولي لمقاطع الكابلات",
      "فحص خطوط التغذية القصيرة والطويلة",
      "مراجعة مشاريع المحركات والمعدات البعيدة",
      "إعداد سريع قبل الدراسة التفصيلية",
    ],
    limitations: [
      "لا تكفي الأداة وحدها للتحقق من سعة التيار الحرارية أو طريقة التمديد.",
      "تعتمد على مقاومية تقريبية لمادة الموصل عند درجة مرجعية.",
      "يجب اعتماد المقاطع النهائية بعد مراجعة المتطلبات النظامية المحلية.",
    ],
    sources: [
      {
        label: "IEC electrotechnical concepts and symbols",
        href: "https://www.iec.ch",
      },
      {
        label: "NIST Guide to the SI",
        href: "https://www.nist.gov/pml/special-publication-811",
      },
    ],
    relatedCalculators: [
      {
        label: "حاسبة هبوط الجهد",
        href: "/ar/engineering-calculators/electrical-calculators/voltage-drop-calculator",
      },
      {
        label: "تحويل kW إلى أمبير",
        href: "/ar/engineering-calculators/electrical-calculators/kw-to-ampere-calculator",
      },
      {
        label: "مركز الحاسبات الكهربائية",
        href: "/ar/engineering-calculators/electrical-calculators",
      },
    ],
    relatedGuides: [
      { label: "دليل الأمبير", href: "/ar/unit-guides/ampere" },
      { label: "دليل الفولت", href: "/ar/unit-guides/volt" },
      { label: "دليل المتر", href: "/ar/unit-guides/meter" },
    ],
  },
};

function renderTypicalUse(
  unit: EngineeringUnitDefinition,
  locale: CalculatorLocale
) {
  return locale === "tr" ? unit.typicalUseTr : unit.typicalUseEn;
}

export default function CableSizePage({
  locale = "tr",
  structuredData,
}: {
  locale?: CalculatorLocale;
  structuredData?: ReactNode;
}) {
  const unitSections = getUnitSections(locale);
  const strings = copy[locale];

  return (
    <main className="calculator-page">
      {structuredData}

      <div className="conversion-breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label={strings.breadcrumbLabel}>
          {strings.breadcrumbs.map((breadcrumb, index) => (
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

      <CableSizeCalculator
        locale={locale}
        eyebrow={strings.heroEyebrow}
        title={strings.title}
        description={strings.description}
        resultHeading={strings.heroResultHeading}
      />

      <article className="conversion-content calculator-content">
        <section className="conversion-section">
          <h2>{strings.introHeading}</h2>
          {strings.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="conversion-section">
          <h2>{strings.formulasHeading}</h2>
          <ul className="calculator-bullet-list">
            {strings.formulas.map((formula) => (
              <li key={formula}>{formula}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section">
          <h2>{strings.variablesHeading}</h2>
          <dl className="unit-facts">
            {strings.variables.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.explanation}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="conversion-section">
          <h2>{strings.standardHeading}</h2>
          <p>{strings.standardIntro}</p>
          <ul className="calculator-bullet-list">
            <li>{STANDARD_CROSS_SECTIONS_MM2.join(", ")}</li>
          </ul>
        </section>

        <section className="conversion-section">
          <h2>{strings.resistivityTableHeading}</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th scope="col">{strings.resistivityTableColumns.material}</th>
                  <th scope="col">{strings.resistivityTableColumns.resistivity}</th>
                </tr>
              </thead>
              <tbody>
                {resistivityReferenceTable[locale].map((row) => (
                  <tr key={row.id}>
                    <td>{row.label}</td>
                    <td>{row.resistivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="conversion-section">
          <h2>{strings.unitsHeading}</h2>
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
                        <th>{strings.tableColumns.unitName}</th>
                        <th>{strings.tableColumns.symbol}</th>
                        <th>{strings.tableColumns.siEquivalent}</th>
                        <th>{strings.tableColumns.typicalUse}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.units.map((unit) => (
                        <tr key={`${section.id}-${unit.symbol}`}>
                          <td>{formatCalculatorUnitName(unit, locale)}</td>
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
          <h2>{strings.examplesHeading}</h2>
          <div className="calculator-example-list">
            {strings.examples.map((example) => (
              <article key={example.title}>
                <h3>{example.title}</h3>
                <p>{example.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="conversion-section">
          <h2>{strings.applicationsHeading}</h2>
          <ul className="calculator-bullet-list">
            {strings.applications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section">
          <h2>{strings.limitationsHeading}</h2>
          <ul className="calculator-bullet-list">
            {strings.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section unit-sources">
          <h2>{strings.sourcesHeading}</h2>
          <ol>
            {strings.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noreferrer">
                  {source.label}
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className="conversion-section">
          <h2>{strings.relatedHeading}</h2>

          <h3>{strings.relatedCalculatorsHeading}</h3>
          <ul className="related-conversion-list">
            {strings.relatedCalculators.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <h3>{strings.relatedGuidesHeading}</h3>
          <ul className="related-conversion-list">
            {strings.relatedGuides.map((item) => (
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
