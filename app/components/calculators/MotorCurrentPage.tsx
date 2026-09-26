import Link from "next/link";
import type { ReactNode } from "react";
import {
  currentUnitDefinitions,
  formatCalculatorUnitName,
  powerUnitDefinitions,
  voltageUnitDefinitions,
} from "../../converter/engineeringCalculatorUnits";
import { formatEngineeringValue } from "../../converter/pressureForceArea";
import type { CalculatorLocale } from "../../converter/pressureForceArea";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import MotorCurrentCalculator from "./MotorCurrentCalculator";

type UnitTableSection = {
  id: string;
  heading: string;
  siSymbol: string;
  units: ReadonlyArray<EngineeringUnitDefinition>;
};

const unitSectionHeadings = {
  tr: {
    power: "Güç birimleri",
    voltage: "Gerilim birimleri",
    current: "Akım birimleri",
  },
  en: {
    power: "Power units",
    voltage: "Voltage units",
    current: "Current units",
  },
  de: {
    power: "Leistungseinheiten",
    voltage: "Spannungseinheiten",
    current: "Stromeinheiten",
  },
  ar: {
    power: "وحدات القدرة",
    voltage: "وحدات الجهد",
    current: "وحدات التيار",
  },
} as const;

function getUnitSections(locale: CalculatorLocale): UnitTableSection[] {
  const headings =
    unitSectionHeadings[locale === "ar" ? "en" : locale];

  return [
    {
      id: "power-units",
      heading: headings.power,
      siSymbol: "W",
      units: powerUnitDefinitions,
    },
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
      { label: "Motor Akımı Hesaplama" },
    ],
    breadcrumbLabel: "Sayfa yolu",
    title: "Motor Akımı Hesaplama",
    description:
      "Motor gücü, gerilim, güç faktörü ve verimden yaklaşık tam yük akımını (FLA) hesaplayın; seçilen emniyet payıyla kontaktor, termik ve kablo seçimi için tasarım akımını görün.",
    heroEyebrow: "ELEKTRIK HESAPLAYICISI",
    heroResultHeading: "Tam yük akımı sonucu",
    introHeading: "Bu motor akımı aracı ne için kullanılır?",
    formulasHeading: "Kullanılan formüller",
    variablesHeading: "Değişkenler ve anlamları",
    unitsHeading: "Birim tabloları",
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
      "Bu araç, motor etiket gücünden yaklaşık tam yük akımını (FLA) çıkarır ve girilen bir emniyet payıyla kontaktor, termik role ve motor kablosu seçiminde kullanılacak tasarım akımını gösterir.",
      "kW to Amper aracından farkı, motor seçim akışına odaklanması ve sonuca doğrudan bir tasarım marjı eklemesidir; genel yük gücü hesapları için kW to Amper aracını kullanabilirsiniz.",
    ],
    formulas: [
      "Tek faz: I = P / (V x cos phi x eta)",
      "Üç faz: I = P / (sqrt(3) x V x cos phi x eta)",
      "Tasarım akımı: I_tasarım = FLA x (1 + emniyet payı)",
    ],
    variables: [
      { term: "P", explanation: "Motor etiketindeki nominal güç değeridir." },
      { term: "V", explanation: "Besleme gerilimi veya faz-faz gerilimidir." },
      { term: "cos phi", explanation: "Motorun güç faktörüdür; etiket veya katalog değerinden alınır." },
      { term: "eta", explanation: "Motor verimidir; etiket veya katalog değerinden alınır." },
      { term: "FLA", explanation: "Hesaplanan yaklaşık tam yük akımıdır (full-load amps)." },
      { term: "Emniyet payı", explanation: "Kontaktor, termik role ve kablo seçiminde bırakılan ek tasarım marjidir." },
    ],
    examples: [
      {
        title: "5.5 kW, 400 V, üç faz, cos phi 0.85, verim 90, emniyet %15",
        body: "FLA = 5500 / (1.732 x 400 x 0.85 x 0.9) yaklaşık 10.38 A. Tasarım akımı yaklaşık 11.93 A olur.",
      },
      {
        title: "1.1 kW, 230 V, tek faz, cos phi 0.8, verim 75, emniyet %15",
        body: "FLA = 1100 / (230 x 0.8 x 0.75) yaklaşık 7.97 A. Tasarım akımı yaklaşık 9.17 A olur.",
      },
    ],
    applications: [
      "Kontaktor ve termik role on seçimi",
      "Motor kablo ve sigorta boyutlandırması",
      "Proje keşiflerinde hızlı tam yük akımı kontrolü",
      "Mevcut bir motorun etiket değerlerinden akım doğrulaması",
    ],
    limitations: [
      "Bu araç yaklaşık tam yük akımı (FLA) verir; motor kalkış (rotor kilitli) akımı tipik olarak FLA'nin 6-8 katına kadar çıkabilir ve bu hesaba dahil değildir.",
      "Sonuç, motor etiketindeki gerçek cos phi ve verim değerleri yerine kullanıcının girdiği tahmini değerlere bağlıdır; mümkünse motor etiket bilgilerini kullanın.",
      "Kontaktor, termik role ve kablo seçimi için nihai karar, ilgili ürün kataloğu ve elektrik tesisat yönetmeliğine göre verilmelidir.",
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
        label: "kW to Amper Hesaplayıcısı",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama",
      },
      {
        label: "Kablo Kesiti Hesaplayıcısı",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/kablo-kesiti-hesaplama",
      },
      {
        label: "Elektrik Hesapları merkezi",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari",
      },
    ],
    relatedGuides: [
      { label: "Amper (A) rehberi", href: "/birimler/amper" },
      { label: "Volt (V) rehberi", href: "/birimler/volt" },
      { label: "Kilowatt (kW) rehberi", href: "/birimler/kilowatt" },
    ],
  },
  en: {
    breadcrumbs: [
      { label: "Home", href: "/en" },
      {
        label: "Electrical Calculators",
        href: "/en/engineering-calculators/electrical-calculators",
      },
      { label: "Motor Current Calculator" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Motor Current Calculator",
    description:
      "Estimate full-load motor current (FLA) from motor power, voltage, power factor and efficiency, then see the design current for contactor, overload relay and cable selection with an added safety margin.",
    heroEyebrow: "ELECTRICAL CALCULATOR",
    heroResultHeading: "Full-load current result",
    introHeading: "What is this motor current tool used for?",
    formulasHeading: "Formulas used",
    variablesHeading: "Variables and meaning",
    unitsHeading: "Unit reference tables",
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
      "This tool estimates full-load current (FLA) from a motor's nameplate power, then applies an entered design margin to give the design current used for contactor, overload relay and motor cable selection.",
      "It differs from the kW to Ampere tool by focusing on the motor selection workflow and adding a design margin directly to the result; use the kW to Ampere tool for general load-power checks.",
    ],
    formulas: [
      "Single-phase: I = P / (V x cos phi x eta)",
      "Three-phase: I = P / (sqrt(3) x V x cos phi x eta)",
      "Design current: I_design = FLA x (1 + margin)",
    ],
    variables: [
      { term: "P", explanation: "Rated power from the motor nameplate." },
      { term: "V", explanation: "Supply voltage or line-to-line voltage." },
      { term: "cos phi", explanation: "Motor power factor, taken from the nameplate or catalog value." },
      { term: "eta", explanation: "Motor efficiency, taken from the nameplate or catalog value." },
      { term: "FLA", explanation: "Calculated approximate full-load current." },
      { term: "Design margin", explanation: "Extra design headroom applied for contactor, overload relay and cable selection." },
    ],
    examples: [
      {
        title: "5.5 kW, 400 V, three-phase, 0.85 power factor, 90 efficiency, 15% margin",
        body: "FLA = 5500 / (1.732 x 400 x 0.85 x 0.9) which gives about 10.38 A. The design current is about 11.93 A.",
      },
      {
        title: "1.1 kW, 230 V, single-phase, 0.8 power factor, 75 efficiency, 15% margin",
        body: "FLA = 1100 / (230 x 0.8 x 0.75) which gives about 7.97 A. The design current is about 9.17 A.",
      },
    ],
    applications: [
      "Preselection of contactors and overload relays",
      "Motor cable and fuse sizing",
      "Quick full-load current checks during project estimation",
      "Verifying current from an existing motor's nameplate values",
    ],
    limitations: [
      "This tool gives an approximate full-load current (FLA); locked-rotor starting current can typically reach 6-8 times FLA and is not included here.",
      "The result depends on the power factor and efficiency values entered rather than the motor's actual nameplate figures; use nameplate data when available.",
      "Final contactor, overload relay and cable selection should follow the relevant product catalog and applicable electrical code.",
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
        label: "kW to Ampere Calculator",
        href: "/en/engineering-calculators/electrical-calculators/kw-to-ampere-calculator",
      },
      {
        label: "Cable Size Calculator",
        href: "/en/engineering-calculators/electrical-calculators/cable-size-calculator",
      },
      {
        label: "Electrical Calculators hub",
        href: "/en/engineering-calculators/electrical-calculators",
      },
    ],
    relatedGuides: [
      { label: "Ampere (A) guide", href: "/en/units/ampere" },
      { label: "Volt (V) guide", href: "/en/units/volt" },
      { label: "Kilowatt (kW) guide", href: "/en/units/kilowatt" },
    ],
  },
  de: {
    breadcrumbs: [
      { label: "Startseite", href: "/de" },
      {
        label: "Elektrorechner",
        href: "/de/ingenieurrechner/elektrorechner",
      },
      { label: "Motorstrom Rechner" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Motorstrom Rechner",
    description:
      "Schätzen Sie den Motor-Nennstrom (FLA) aus Motorleistung, Spannung, Leistungsfaktor und Wirkungsgrad ab und ermitteln Sie mit einer Reserve den Auslegungsstrom für Schutz-, Motorschutz- und Kabelauswahl.",
    heroEyebrow: "ELEKTRORECHNER",
    heroResultHeading: "Nennstrom-Ergebnis",
    introHeading: "Wofür wird dieses Motorstrom-Werkzeug verwendet?",
    formulasHeading: "Verwendete Formeln",
    variablesHeading: "Variablen und Bedeutung",
    unitsHeading: "Einheitentabellen",
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
      "Dieses Werkzeug schätzt den Motor-Nennstrom (FLA) aus der Typenschildleistung ab und wendet eine eingegebene Reserve an, um den Auslegungsstrom für Schutz-, Motorschutz- und Kabelauswahl zu ermitteln.",
      "Der Unterschied zum kW-zu-Ampere Rechner liegt im Fokus auf die Motorauswahl und der direkt eingerechneten Reserve; für allgemeine Leistungs-Strom-Prüfungen nutzen Sie den kW-zu-Ampere Rechner.",
    ],
    formulas: [
      "Einphase: I = P / (V x cos phi x eta)",
      "Dreiphasig: I = P / (sqrt(3) x V x cos phi x eta)",
      "Auslegungsstrom: I_Auslegung = FLA x (1 + Reserve)",
    ],
    variables: [
      { term: "P", explanation: "Nennleistung vom Motor-Typenschild." },
      { term: "V", explanation: "Versorgungsspannung oder Leiterspannung." },
      { term: "cos phi", explanation: "Leistungsfaktor des Motors, aus Typenschild oder Katalog." },
      { term: "eta", explanation: "Wirkungsgrad des Motors, aus Typenschild oder Katalog." },
      { term: "FLA", explanation: "Berechneter näherungsweiser Nennstrom." },
      { term: "Reserve", explanation: "Zusätzlicher Auslegungsspielraum für Schutz-, Motorschutz- und Kabelauswahl." },
    ],
    examples: [
      {
        title: "5.5 kW, 400 V, dreiphasig, Leistungsfaktor 0.85, Wirkungsgrad 90, 15 % Reserve",
        body: "FLA = 5500 / (1.732 x 400 x 0.85 x 0.9) und ergibt etwa 10.38 A. Der Auslegungsstrom betragt etwa 11.93 A.",
      },
      {
        title: "1.1 kW, 230 V, einphasig, Leistungsfaktor 0.8, Wirkungsgrad 75, 15 % Reserve",
        body: "FLA = 1100 / (230 x 0.8 x 0.75) und ergibt etwa 7.97 A. Der Auslegungsstrom betragt etwa 9.17 A.",
      },
    ],
    applications: [
      "Vorauswahl von Schützen und Motorschutzrelais",
      "Motor-Kabel- und Sicherungsdimensionierung",
      "Schnelle Kontrolle des Nennstroms in der Projektphase",
      "Stromprüfung anhand der Typenschildwerte eines vorhandenen Motors",
    ],
    limitations: [
      "Dieses Werkzeug liefert einen näherungsweisen Nennstrom (FLA); der Anlaufstrom bei blockiertem Rotor kann typischerweise das 6- bis 8-Fache des FLA erreichen und ist hier nicht enthalten.",
      "Das Ergebnis hängt von den eingegebenen Werten für Leistungsfaktor und Wirkungsgrad ab, nicht von den tatsachlichen Typenschildwerten; nutzen Sie nach Möglichkeit die Typenschilddaten.",
      "Die endgültige Auswahl von Schutz, Motorschutzrelais und Kabel muss anhand des jeweiligen Produktkatalogs und der geltenden Elektrovorschrift erfolgen.",
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
        label: "kW-zu-Ampere Rechner",
        href: "/de/ingenieurrechner/elektrorechner/kw-zu-ampere-rechner",
      },
      {
        label: "Kabelquerschnitt Rechner",
        href: "/de/ingenieurrechner/elektrorechner/kabelquerschnitt-rechner",
      },
      {
        label: "Elektrorechner-Zentrum",
        href: "/de/ingenieurrechner/elektrorechner",
      },
    ],
    relatedGuides: [
      { label: "Ampere (A) Leitfaden", href: "/de/einheiten/ampere" },
      { label: "Volt (V) Leitfaden", href: "/de/einheiten/volt" },
      { label: "Kilowatt (kW) Leitfaden", href: "/de/einheiten/kilowatt" },
    ],
  },
  ar: {
    breadcrumbs: [
      { label: "الرئيسية", href: "/ar" },
      {
        label: "الحاسبات الكهربائية",
        href: "/ar/engineering-calculators/electrical-calculators",
      },
      { label: "حاسبة تيار المحرك" },
    ],
    breadcrumbLabel: "مسار التنقل",
    title: "حاسبة تيار المحرك",
    description:
      "احسب تيار الحمل الكامل للمحرك وتيار التصميم بعد إضافة هامش الأمان المطلوب.",
    heroEyebrow: "حاسبة كهربائية",
    heroResultHeading: "نتيجة تيار الحمل الكامل",
    introHeading: "متى تستخدم هذه الأداة؟",
    formulasHeading: "المعادلات المستخدمة",
    variablesHeading: "المتغيرات ومعناها",
    unitsHeading: "جداول الوحدات",
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
      "تعطيك هذه الأداة تقديرا أوليا لتيار الحمل الكامل للمحرك انطلاقا من القدرة والجهد ومعامل القدرة والكفاءة.",
      "كما تضيف هامش أمان لتكوين تيار تصميم مفيد عند اختيار الحماية والكابل والعناصر المرافقة.",
    ],
    formulas: [
      "أحادي الطور: I = P / (V x cos phi x eta)",
      "ثلاثي الطور: I = P / (sqrt(3) x V x cos phi x eta)",
      "تيار التصميم = FLA x (1 + هامش الأمان)",
    ],
    variables: [
      { term: "P", explanation: "قدرة المحرك." },
      { term: "V", explanation: "جهد التغذية." },
      { term: "cos phi", explanation: "معامل قدرة المحرك." },
      { term: "eta", explanation: "كفاءة المحرك." },
      { term: "FLA", explanation: "تيار الحمل الكامل الناتج من الحساب." },
    ],
    examples: [
      {
        title: "محرك 5.5 kW عند 400 V ثلاثي الطور",
        body: "مع معامل قدرة 0.85 وكفاءة 90% تكون قيمة FLA التقريبية مفيدة كبداية للاختيار.",
      },
      {
        title: "إضافة هامش أمان 15%",
        body: "يُستخدم التيار الناتج بعد إضافة الهامش كمؤشر أولي لتيار التصميم.",
      },
    ],
    applications: [
      "اختيار أولي للحماية",
      "تقدير مقطع كابل المحرك",
      "مراجعات التصميم المبكرة",
      "التحقق السريع أثناء العروض والقياسات",
    ],
    limitations: [
      "النتيجة تقريبية ولا تغني عن لوحة بيانات المحرك ومتطلبات الشركة المصنعة.",
      "لا تشمل الأداة تيارات الإقلاع أو ظروف التشغيل الخاصة.",
      "يجب مراجعة اختيار الحماية والكابل وفق الكود والظروف الفعلية.",
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
        label: "تحويل kW إلى أمبير",
        href: "/ar/engineering-calculators/electrical-calculators/kw-to-ampere-calculator",
      },
      {
        label: "حاسبة مقطع الكابل",
        href: "/ar/engineering-calculators/electrical-calculators/cable-size-calculator",
      },
      {
        label: "مركز الحاسبات الكهربائية",
        href: "/ar/engineering-calculators/electrical-calculators",
      },
    ],
    relatedGuides: [
      { label: "دليل الأمبير", href: "/ar/unit-guides/ampere" },
      { label: "دليل الفولت", href: "/ar/unit-guides/volt" },
      { label: "دليل الكيلوواط", href: "/ar/unit-guides/kilowatt" },
    ],
  },
};

function renderTypicalUse(
  unit: EngineeringUnitDefinition,
  locale: CalculatorLocale
) {
  return locale === "tr" ? unit.typicalUseTr : unit.typicalUseEn;
}

export default function MotorCurrentPage({
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

      <MotorCurrentCalculator
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
