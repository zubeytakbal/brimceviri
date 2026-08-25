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
import KwToAmpCalculator from "./KwToAmpCalculator";

type UnitTableSection = {
  id: string;
  heading: string;
  siSymbol: string;
  units: ReadonlyArray<EngineeringUnitDefinition>;
};

const unitSectionHeadings = {
  tr: {
    power: "Guc birimleri",
    voltage: "Gerilim birimleri",
    current: "Akim birimleri",
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
} as const;

function getUnitSections(locale: CalculatorLocale): UnitTableSection[] {
  const headings = unitSectionHeadings[locale];

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
        label: "Elektrik Hesaplari",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari",
      },
      { label: "kW to Amper Hesaplama" },
    ],
    breadcrumbLabel: "Sayfa yolu",
    title: "kW to Amper Hesaplama",
    description:
      "Tek faz, uc faz veya DC sistemlerde gucu akima cevirin. Sonuc, secilen gerilim, guc faktoru ve verime gore okunabilir akim birimiyle verilir.",
    heroEyebrow: "ELEKTRIK HESAPLAYICISI",
    heroResultHeading: "Hat akimi sonucu",
    introHeading: "Bu kW to amper araci ne icin kullanilir?",
    formulasHeading: "Kullanilan formuller",
    variablesHeading: "Degiskenler ve anlamlari",
    unitsHeading: "Birim tablolari",
    examplesHeading: "Ornek kullanim",
    applicationsHeading: "Tipik kullanim alanlari",
    limitationsHeading: "Varsayimlar ve sinirlamalar",
    sourcesHeading: "Kaynaklar",
    relatedHeading: "Ilgili baglantilar",
    relatedCalculatorsHeading: "Ilgili hesaplayicilar",
    relatedGuidesHeading: "Ilgili birim rehberleri",
    tableColumns: {
      unitName: "Birim adi",
      symbol: "Sembol",
      siEquivalent: "SI karsiligi",
      typicalUse: "Yaygin kullanim",
    },
    intro: [
      "Bu arac, aktif guc bilgisinden yaklasik hat akimini cikarmak icin kullanilir. Tek faz, uc faz ve DC secenekleri desteklenir.",
      "Ozellikle sigorta secimi, kablo kesiti on hesabi, pano yuk dagilimi ve saha kesiflerinde hizli ilk kontrol araci olarak faydalidir.",
    ],
    formulas: [
      "Tek faz: I = P / (V x cos phi x eta)",
      "Uc faz: I = P / (sqrt(3) x V x cos phi x eta)",
      "DC: I = P / (V x eta)",
    ],
    variables: [
      { term: "P", explanation: "Yukun aktif gucu veya cihaza ait giris/ cikis gucu bilgisidir." },
      { term: "V", explanation: "Hat veya fazlar arasi gerilim seviyesidir." },
      { term: "cos phi", explanation: "AC sistemlerde aktif gucun gorunen guce oranini gosteren guc faktorudur." },
      { term: "eta", explanation: "Verim katsayisidir; mekanik cikis gucunden elektriksel giris akimina gidiliyorsa hesaba dahil edilir." },
      { term: "I", explanation: "Hesaplanan hat akimidir." },
    ],
    examples: [
      {
        title: "5.5 kW, 400 V, uc faz, cos phi 0.9 ve verim 92 icin akim",
        body: "I = 5500 / (1.732 x 400 x 0.9 x 0.92) yaklasik 9.59 A.",
      },
      {
        title: "2 kW, 230 V tek faz, cos phi 0.95 ve verim 100 icin akim",
        body: "I = 2000 / (230 x 0.95) yaklasik 9.15 A.",
      },
    ],
    applications: [
      "Sigorta ve s alter on secimi",
      "Kablo kesiti on hesabi",
      "Yuk dagilim tablosu kontrolu",
      "Jenerator, UPS ve pano guc planlamasi",
    ],
    limitations: [
      "Bu arac yaklasik hat akimi verir; harmonik, kalkis akimi, ortam sicakligi ve kablo duzeltme katsayilari dahil degildir.",
      "Uc faz seceneginde gerilim degeri fazlar arasi hat gerilimi olarak yorumlanir.",
      "Verim varsayilan olarak kullanici girdisine baglidir; elektriksel giris gucunu zaten biliyorsaniz verimi 1 veya 100 olarak girebilirsiniz.",
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
        label: "Amper to kW Hesaplayicisi",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/amper-to-kw-hesaplama",
      },
      {
        label: "Ohm Yasasi Hesaplayicisi",
        href: "/hesaplayicilar/ohm-yasasi",
      },
      {
        label: "Elektrik Hesaplari merkezi",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari",
      },
    ],
    relatedGuides: [
      { label: "Kilowatt (kW) rehberi", href: "/birimler/kilowatt" },
      { label: "Volt (V) rehberi", href: "/birimler/volt" },
      { label: "Amper (A) rehberi", href: "/birimler/amper" },
    ],
  },
  en: {
    breadcrumbs: [
      { label: "Home", href: "/en" },
      {
        label: "Electrical Calculators",
        href: "/en/engineering-calculators/electrical-calculators",
      },
      { label: "kW to Ampere Calculator" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "kW to Ampere Calculator",
    description:
      "Convert power into current for single-phase, three-phase and DC systems. The result is shown in a readable current unit based on voltage, power factor and efficiency.",
    heroEyebrow: "ELECTRICAL CALCULATOR",
    heroResultHeading: "Line-current result",
    introHeading: "What is this kW to ampere tool used for?",
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
      "This tool estimates line current from active power for single-phase, three-phase and DC systems.",
      "It is useful for first-pass checks in breaker selection, preliminary cable sizing, panel load schedules and site surveys.",
    ],
    formulas: [
      "Single-phase: I = P / (V x cos phi x eta)",
      "Three-phase: I = P / (sqrt(3) x V x cos phi x eta)",
      "DC: I = P / (V x eta)",
    ],
    variables: [
      { term: "P", explanation: "Active load power or the power value associated with the equipment." },
      { term: "V", explanation: "Line voltage or system voltage level." },
      { term: "cos phi", explanation: "Power factor used in AC systems to relate active power to apparent power." },
      { term: "eta", explanation: "Efficiency factor; include it when converting output power into required input current." },
      { term: "I", explanation: "Calculated line current." },
    ],
    examples: [
      {
        title: "5.5 kW, 400 V, three-phase, 0.9 power factor and 92 efficiency",
        body: "I = 5500 / (1.732 x 400 x 0.9 x 0.92) which gives about 9.59 A.",
      },
      {
        title: "2 kW, 230 V single-phase, 0.95 power factor and 100 efficiency",
        body: "I = 2000 / (230 x 0.95) which gives about 9.15 A.",
      },
    ],
    applications: [
      "Preselection of breakers and fuses",
      "Preliminary cable-sizing checks",
      "Load-schedule validation",
      "Generator, UPS and switchboard planning",
    ],
    limitations: [
      "This tool gives an approximate line current and does not include harmonics, starting current, ambient-temperature derating or cable correction factors.",
      "In the three-phase mode, the voltage input is interpreted as line-to-line voltage.",
      "If the entered power already represents electrical input power, set efficiency to 1 or 100.",
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
        label: "Ampere to kW Calculator",
        href: "/en/engineering-calculators/electrical-calculators/ampere-to-kw-calculator",
      },
      {
        label: "Ohm's Law Calculator",
        href: "/en/calculators/ohms-law",
      },
      {
        label: "Electrical Calculators hub",
        href: "/en/engineering-calculators/electrical-calculators",
      },
    ],
    relatedGuides: [
      { label: "Kilowatt (kW) guide", href: "/en/units/kilowatt" },
      { label: "Volt (V) guide", href: "/en/units/volt" },
      { label: "Ampere (A) guide", href: "/en/units/ampere" },
    ],
  },
  de: {
    breadcrumbs: [
      { label: "Startseite", href: "/de" },
      {
        label: "Elektrorechner",
        href: "/de/ingenieurrechner/elektrorechner",
      },
      { label: "kW-zu-Ampere Rechner" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "kW-zu-Ampere Rechner",
    description:
      "Wandeln Sie Leistung fur Einphasen-, Dreiphasen- und DC-Systeme in Strom um. Das Ergebnis wird als gut lesbare Stromgroesse unter Berucksichtigung von Spannung, Leistungsfaktor und Wirkungsgrad gezeigt.",
    heroEyebrow: "ELEKTRORECHNER",
    heroResultHeading: "Leitungsstrom-Ergebnis",
    introHeading: "Wofur wird dieses kW-zu-Ampere Werkzeug verwendet?",
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
      siEquivalent: "SI-Aquivalent",
      typicalUse: "Typische Verwendung",
    },
    intro: [
      "Dieses Werkzeug schatzt den Leitungsstrom aus der Wirkleistung fur Einphasen-, Dreiphasen- und DC-Systeme ab.",
      "Es eignet sich fur erste Prufungen bei Schutzschalterwahl, vorlaufiger Kabeldimensionierung, Lastlisten und Baustellenaufnahmen.",
    ],
    formulas: [
      "Einphase: I = P / (V x cos phi x eta)",
      "Dreiphasig: I = P / (sqrt(3) x V x cos phi x eta)",
      "DC: I = P / (V x eta)",
    ],
    variables: [
      { term: "P", explanation: "Wirkleistung der Last oder Leistungswert des Gertes." },
      { term: "V", explanation: "Netz- oder Systemspannung." },
      { term: "cos phi", explanation: "Leistungsfaktor in AC-Systemen zur Verknupfung von Wirk- und Scheinleistung." },
      { term: "eta", explanation: "Wirkungsgrad; er wird verwendet, wenn aus Ausgangsleistung der benotigte Eingangsstrom bestimmt werden soll." },
      { term: "I", explanation: "Berechneter Leitungsstrom." },
    ],
    examples: [
      {
        title: "5.5 kW, 400 V, dreiphasig, Leistungsfaktor 0.9 und Wirkungsgrad 92",
        body: "I = 5500 / (1.732 x 400 x 0.9 x 0.92) und ergibt etwa 9.59 A.",
      },
      {
        title: "2 kW, 230 V einphasig, Leistungsfaktor 0.95 und Wirkungsgrad 100",
        body: "I = 2000 / (230 x 0.95) und ergibt etwa 9.15 A.",
      },
    ],
    applications: [
      "Vorauswahl von Sicherungen und Schutzschaltern",
      "Vorprufung fur Kabeldimensionierung",
      "Kontrolle von Lastlisten",
      "Planung von Generatoren, USV und Schaltschranken",
    ],
    limitations: [
      "Dieses Werkzeug liefert einen Naherungswert fur den Leitungsstrom und berucksichtigt keine Oberschwingungen, Anlaufstrome, Temperaturabminderung oder Korrekturfaktoren.",
      "Im Dreiphasenmodus wird die Spannung als Leiterspannung interpretiert.",
      "Falls die eingegebene Leistung bereits die elektrische Eingangsleistung darstellt, setzen Sie den Wirkungsgrad auf 1 oder 100.",
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
        label: "Ampere-zu-kW Rechner",
        href: "/de/ingenieurrechner/elektrorechner/ampere-zu-kw-rechner",
      },
      {
        label: "Ohmsches-Gesetz-Rechner",
        href: "/de/rechner/ohms-law",
      },
      {
        label: "Elektrorechner-Zentrum",
        href: "/de/ingenieurrechner/elektrorechner",
      },
    ],
    relatedGuides: [
      { label: "Kilowatt (kW) Leitfaden", href: "/de/einheiten/kilowatt" },
      { label: "Volt (V) Leitfaden", href: "/de/einheiten/volt" },
      { label: "Ampere (A) Leitfaden", href: "/de/einheiten/ampere" },
    ],
  },
};

function renderTypicalUse(
  unit: EngineeringUnitDefinition,
  locale: CalculatorLocale
) {
  return locale === "tr" ? unit.typicalUseTr : unit.typicalUseEn;
}

export default function KwToAmpPage({
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

      <KwToAmpCalculator
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
