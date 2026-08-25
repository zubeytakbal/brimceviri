import Link from "next/link";
import type { ReactNode } from "react";
import {
  currentUnitDefinitions,
  formatCalculatorUnitName,
  resistanceUnitDefinitions,
  voltageUnitDefinitions,
} from "../../converter/engineeringCalculatorUnits";
import { formatEngineeringValue } from "../../converter/pressureForceArea";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import OhmsLawCalculator from "./OhmsLawCalculator";
import type { CalculatorLocale } from "../../converter/pressureForceArea";

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
    resistance: "Direnç birimleri",
  },
  en: {
    voltage: "Voltage units",
    current: "Current units",
    resistance: "Resistance units",
  },
  de: {
    voltage: "Spannungseinheiten",
    current: "Stromeinheiten",
    resistance: "Widerstandseinheiten",
  },
} as const;

function getUnitSections(locale: CalculatorLocale): UnitTableSection[] {
  const headings = unitSectionHeadings[locale];

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
      id: "resistance-units",
      heading: headings.resistance,
      siSymbol: "Ω",
      units: resistanceUnitDefinitions,
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
  examples: Array<{ title: string; body: string }>;
  applications: string[];
  limitations: string[];
  sources: Array<{ label: string; href: string }>;
  relatedCalculators: Array<{ label: string; href: string }>;
  relatedConversions: Array<{ label: string; href: string }>;
};

const copy: Record<CalculatorLocale, PageCopy> = {
  tr: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Hesaplayıcılar", href: "/muhendislik-hesaplayicilari" },
      { label: "Ohm Yasası Hesaplayıcısı" },
    ],
    breadcrumbLabel: "Sayfa yolu",
    title: "Ohm Yasası Hesaplayıcısı",
    description:
      "V = I × R bağıntısıyla gerilimi, akımı veya direnci hesaplayın. Sonuç okunabilir birimle, SI eşdeğeri ve yerine koyulmuş formülle birlikte gösterilir.",
    heroEyebrow: "MÜHENDİSLİK HESAPLAYICISI",
    heroResultHeading: "Hesaplama sonucu",
    introHeading: "Ohm Yasası hesabı ne için kullanılır?",
    formulasHeading: "Kullanılan formüller",
    variablesHeading: "Değişkenler ve anlamları",
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
      "Bu araç, bir devredeki gerilim, akım ve direnç arasındaki temel ilişkiyi (Ohm Yasası) kullanarak bilinen iki değerden üçüncüsünü hesaplar.",
      "Devre tasarımı, direnç seçimi, sigorta/kablo boyutlandırma ve elektronik hobi projelerinde hızlı bir kontrol aracı olarak kullanılabilir.",
    ],
    formulas: ["V = I × R", "I = V / R", "R = V / I"],
    variables: [
      { term: "V", explanation: "Devre üzerindeki gerilim (voltaj) farkıdır." },
      { term: "I", explanation: "Devreden geçen elektrik akımıdır." },
      {
        term: "R",
        explanation: "Devrenin veya elemanın akıma gösterdiği dirençtir.",
      },
    ],
    examples: [
      {
        title: "10 Ω dirençten 2 A akım geçerse gerilim ne olur?",
        body: "V = I × R = 2 A × 10 Ω = 20 V.",
      },
      {
        title: "12 V'luk bir kaynak 4 Ω dirence bağlanırsa akım ne olur?",
        body: "I = V / R = 12 V / 4 Ω = 3 A.",
      },
    ],
    applications: [
      "Direnç etiketi doğrulama ve devre kartı tasarımı",
      "LED/sensör devrelerinde akım sınırlama direnci hesaplama",
      "Kablo ve sigorta boyutlandırma ön kontrolleri",
      "Elektronik eğitimi ve hobi projeleri",
    ],
    limitations: [
      "Formül, direncin sabit kaldığı (doğrusal, ohmik) elemanlar için geçerlidir; diyot, transistör gibi doğrusal olmayan elemanlarda doğrudan uygulanamaz.",
      "Sıcaklığa bağlı direnç değişimi bu temel hesaba dahil değildir.",
      "Ters hesaplamalarda (akım veya direnç çözümü) ilgili bölen değer sıfır olamaz.",
    ],
    sources: [
      {
        label: "NIST Guide to the SI",
        href: "https://www.nist.gov/pml/special-publication-811",
      },
      {
        label: "BIPM SI Brochure",
        href: "https://www.bipm.org/en/publications/si-brochure",
      },
    ],
    relatedCalculators: [
      {
        label: "Isı Enerjisi Hesaplayıcısı",
        href: "/hesaplayicilar/isi-enerjisi",
      },
      {
        label: "Mühendislik Hesaplayıcıları merkezi",
        href: "/muhendislik-hesaplayicilari",
      },
    ],
    relatedConversions: [
      { label: "Kiloohm → Ohm", href: "/kiloohm-ohm" },
      { label: "Ohm → Kiloohm", href: "/ohm-kiloohm" },
    ],
  },
  en: {
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Calculators", href: "/en/engineering-calculators" },
      { label: "Ohm's Law Calculator" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Ohm's Law Calculator",
    description:
      "Calculate voltage, current or resistance with V = I × R. The result is shown in a readable unit with its SI equivalent and substituted formula.",
    heroEyebrow: "ENGINEERING CALCULATOR",
    heroResultHeading: "Calculation result",
    introHeading: "What is this Ohm's law tool used for?",
    formulasHeading: "Formulas used",
    variablesHeading: "Variables and meaning",
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
      "This tool uses the basic relationship between voltage, current and resistance in an electrical circuit to solve the third variable from the two known values.",
      "It is useful for quick checks in circuit design, resistor selection, fuse and cable sizing, and electronics hobby projects.",
    ],
    formulas: ["V = I × R", "I = V / R", "R = V / I"],
    variables: [
      { term: "V", explanation: "Voltage, or electric potential difference across the circuit." },
      { term: "I", explanation: "Electric current flowing through the circuit." },
      {
        term: "R",
        explanation: "Resistance opposing the current in the circuit or component.",
      },
    ],
    examples: [
      {
        title: "What voltage appears across a 10 Ω resistor at 2 A?",
        body: "V = I × R = 2 A × 10 Ω = 20 V.",
      },
      {
        title: "What current flows if a 12 V source is connected to 4 Ω?",
        body: "I = V / R = 12 V / 4 Ω = 3 A.",
      },
    ],
    applications: [
      "Circuit-board checks and resistor verification",
      "Current-limiting resistor sizing for LEDs and sensors",
      "Preliminary cable and fuse sizing checks",
      "Electronics education and hobby projects",
    ],
    limitations: [
      "The formula applies to elements with approximately constant resistance; it is not directly valid for nonlinear devices such as diodes and transistors.",
      "Temperature-dependent resistance change is not included in this basic calculation.",
      "In reverse calculations, the denominator cannot be zero when solving for current or resistance.",
    ],
    sources: [
      {
        label: "NIST Guide to the SI",
        href: "https://www.nist.gov/pml/special-publication-811",
      },
      {
        label: "BIPM SI Brochure",
        href: "https://www.bipm.org/en/publications/si-brochure",
      },
    ],
    relatedCalculators: [
      {
        label: "Heat Energy Calculator",
        href: "/en/calculators/heat-energy",
      },
      {
        label: "Engineering Calculators hub",
        href: "/en/engineering-calculators",
      },
    ],
    relatedConversions: [
      { label: "Kiloohms to Ohms", href: "/en/kiloohms-to-ohms" },
      { label: "Ohms to Kiloohms", href: "/en/ohms-to-kiloohms" },
    ],
  },
  de: {
    breadcrumbs: [
      { label: "Startseite", href: "/de" },
      { label: "Rechner", href: "/de/ingenieurrechner" },
      { label: "Ohmsches-Gesetz-Rechner" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Ohmsches-Gesetz-Rechner",
    description:
      "Berechnen Sie Spannung, Strom oder Widerstand mit V = I × R. Das Ergebnis wird in einer lesbaren Einheit mit SI-Äquivalent und eingesetzter Formel angezeigt.",
    heroEyebrow: "INGENIEURRECHNER",
    heroResultHeading: "Berechnungsergebnis",
    introHeading: "Wofür wird dieser Ohmsche-Gesetz-Rechner verwendet?",
    formulasHeading: "Verwendete Formeln",
    variablesHeading: "Variablen und Bedeutung",
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
      "Dieses Werkzeug nutzt die grundlegende Beziehung zwischen Spannung, Strom und Widerstand in einem Stromkreis, um aus zwei bekannten Werten die dritte Größe zu berechnen.",
      "Es eignet sich für schnelle Kontrollen bei Schaltungsentwurf, Widerstandsauswahl, Sicherungs- und Kabelauslegung sowie Elektronikprojekten.",
    ],
    formulas: ["V = I × R", "I = V / R", "R = V / I"],
    variables: [
      { term: "V", explanation: "Spannung beziehungsweise elektrische Potentialdifferenz im Stromkreis." },
      { term: "I", explanation: "Elektrischer Strom durch den Stromkreis." },
      {
        term: "R",
        explanation: "Widerstand des Stromkreises oder Bauteils gegen den Stromfluss.",
      },
    ],
    examples: [
      {
        title: "Welche Spannung liegt an 10 Ω bei 2 A an?",
        body: "V = I × R = 2 A × 10 Ω = 20 V.",
      },
      {
        title: "Welcher Strom fließt bei 12 V und 4 Ω?",
        body: "I = V / R = 12 V / 4 Ω = 3 A.",
      },
    ],
    applications: [
      "Kontrollen in Schaltungsdesign und Bauteilauswahl",
      "Berechnung von Vorwiderständen für LEDs und Sensoren",
      "Erste Abschätzungen für Kabel- und Sicherungsdimensionierung",
      "Elektronikausbildung und Hobbyprojekte",
    ],
    limitations: [
      "Die Formel gilt für näherungsweise lineare ohmsche Bauteile und nicht direkt für nichtlineare Elemente wie Dioden oder Transistoren.",
      "Temperaturabhängige Widerstandsänderungen sind in dieser Grundrechnung nicht enthalten.",
      "Bei Rückwärtsberechnungen darf der Nenner beim Lösen nach Strom oder Widerstand nicht null sein.",
    ],
    sources: [
      {
        label: "NIST Guide to the SI",
        href: "https://www.nist.gov/pml/special-publication-811",
      },
      {
        label: "BIPM SI Brochure",
        href: "https://www.bipm.org/en/publications/si-brochure",
      },
    ],
    relatedCalculators: [
      {
        label: "Wärmeenergie-Rechner",
        href: "/de/rechner/waermeenergie",
      },
      {
        label: "Ingenieurrechner-Zentrum",
        href: "/de/ingenieurrechner",
      },
    ],
    relatedConversions: [
      { label: "Kiloohm zu Ohm", href: "/de/kiloohm-ohm" },
      { label: "Ohm zu Kiloohm", href: "/de/ohm-kiloohm" },
    ],
  },
};

function renderTypicalUse(
  unit: EngineeringUnitDefinition,
  locale: CalculatorLocale
) {
  return locale === "tr" ? unit.typicalUseTr : unit.typicalUseEn;
}

export default function OhmsLawPage({
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

      <OhmsLawCalculator
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

          <h3>{strings.relatedConversionsHeading}</h3>
          <ul className="related-conversion-list">
            {strings.relatedConversions.map((item) => (
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
