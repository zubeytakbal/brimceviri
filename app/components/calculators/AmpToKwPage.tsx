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
import AmpToKwCalculator from "./AmpToKwCalculator";

type UnitTableSection = {
  id: string;
  heading: string;
  siSymbol: string;
  units: ReadonlyArray<EngineeringUnitDefinition>;
};

const unitSectionHeadings = {
  tr: {
    current: "Akim birimleri",
    voltage: "Gerilim birimleri",
    power: "Guc birimleri",
  },
  en: {
    current: "Current units",
    voltage: "Voltage units",
    power: "Power units",
  },
  de: {
    current: "Stromeinheiten",
    voltage: "Spannungseinheiten",
    power: "Leistungseinheiten",
  },
} as const;

function getUnitSections(locale: CalculatorLocale): UnitTableSection[] {
  const headings = unitSectionHeadings[locale];

  return [
    {
      id: "current-units",
      heading: headings.current,
      siSymbol: "A",
      units: currentUnitDefinitions,
    },
    {
      id: "voltage-units",
      heading: headings.voltage,
      siSymbol: "V",
      units: voltageUnitDefinitions,
    },
    {
      id: "power-units",
      heading: headings.power,
      siSymbol: "W",
      units: powerUnitDefinitions,
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
      { label: "Amper to kW Hesaplama" },
    ],
    breadcrumbLabel: "Sayfa yolu",
    title: "Amper to kW Hesaplama",
    description:
      "Tek faz, uc faz veya DC sistemlerde hat akimini yaklasik guce cevirin. Sonuc, secilen gerilim, guc faktoru ve verime gore okunabilir guc birimiyle verilir.",
    heroEyebrow: "ELEKTRIK HESAPLAYICISI",
    heroResultHeading: "Guc sonucu",
    introHeading: "Bu amper to kW araci ne icin kullanilir?",
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
      "Bu arac, olculen veya sahada okunan hat akimindan yaklasik gucu cikarmak icin kullanilir. Tek faz, uc faz ve DC secenekleri desteklenir.",
      "Ozellikle mevcut bir hattin guc tahmini, yuk dengeleme kontrolu, jenerator veya UPS boyutlandirma calismalarinda hizli ilk kontrol araci olarak faydalidir.",
    ],
    formulas: [
      "Tek faz: P = V x I x cos phi x eta",
      "Uc faz: P = sqrt(3) x V x I x cos phi x eta",
      "DC: P = V x I x eta",
    ],
    variables: [
      { term: "I", explanation: "Olculen veya girilen hat akimidir." },
      { term: "V", explanation: "Hat veya fazlar arasi gerilim seviyesidir." },
      { term: "cos phi", explanation: "AC sistemlerde aktif gucun gorunen guce oranini gosteren guc faktorudur." },
      { term: "eta", explanation: "Verim katsayisidir; akimdan cikis gucune gidiliyorsa hesaba dahil edilir." },
      { term: "P", explanation: "Hesaplanan yaklasik guctur." },
    ],
    examples: [
      {
        title: "9.59 A, 400 V, uc faz, cos phi 0.9 ve verim 92 icin guc",
        body: "P = 1.732 x 400 x 9.59 x 0.9 x 0.92 yaklasik 5.5 kW. Bu sonuc, kW to Amper aracindaki ayni ornegin tersidir.",
      },
      {
        title: "9.15 A, 230 V tek faz, cos phi 0.95 ve verim 100 icin guc",
        body: "P = 230 x 9.15 x 0.95 yaklasik 2 kW.",
      },
    ],
    applications: [
      "Sahada mevcut hattin guc tahmini",
      "Yuk dengeleme ve pano kontrolu",
      "Jenerator veya UPS planlamasi",
      "Sayac veya pens ampermetre okumalarindan hizli guc kontrolu",
    ],
    limitations: [
      "Bu arac yaklasik guc verir; harmonik, kalkis akimi, ortam sicakligi ve olcum toleranslari dahil degildir.",
      "Uc faz seceneginde gerilim degeri fazlar arasi hat gerilimi olarak yorumlanir.",
      "Verim varsayilan olarak kullanici girdisine baglidir; akim zaten elektriksel giris akimiysa verimi 1 veya 100 olarak girebilirsiniz.",
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
        label: "kW to Amper Hesaplayicisi",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama",
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
      { label: "Ampere to kW Calculator" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Ampere to kW Calculator",
    description:
      "Convert line current into approximate power for single-phase, three-phase and DC systems. The result is shown in a readable power unit based on voltage, power factor and efficiency.",
    heroEyebrow: "ELECTRICAL CALCULATOR",
    heroResultHeading: "Power result",
    introHeading: "What is this ampere to kW tool used for?",
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
      "This tool estimates power from a measured or field-read line current for single-phase, three-phase and DC systems.",
      "It is useful for estimating the power of an existing feeder, load-balancing checks and first-pass generator or UPS sizing.",
    ],
    formulas: [
      "Single-phase: P = V x I x cos phi x eta",
      "Three-phase: P = sqrt(3) x V x I x cos phi x eta",
      "DC: P = V x I x eta",
    ],
    variables: [
      { term: "I", explanation: "Measured or entered line current." },
      { term: "V", explanation: "Line voltage or system voltage level." },
      { term: "cos phi", explanation: "Power factor used in AC systems to relate active power to apparent power." },
      { term: "eta", explanation: "Efficiency factor; include it when converting current into output power." },
      { term: "P", explanation: "Calculated approximate power." },
    ],
    examples: [
      {
        title: "9.59 A, 400 V, three-phase, 0.9 power factor and 92 efficiency",
        body: "P = 1.732 x 400 x 9.59 x 0.9 x 0.92 which gives about 5.5 kW. This is the reverse of the matching kW to Ampere example.",
      },
      {
        title: "9.15 A, 230 V single-phase, 0.95 power factor and 100 efficiency",
        body: "P = 230 x 9.15 x 0.95 which gives about 2 kW.",
      },
    ],
    applications: [
      "Power estimate of an existing feeder in the field",
      "Load balancing and panel checks",
      "Generator or UPS planning",
      "Quick power checks from meter or clamp-ammeter readings",
    ],
    limitations: [
      "This tool gives an approximate power and does not include harmonics, starting current, ambient-temperature effects or measurement tolerances.",
      "In the three-phase mode, the voltage input is interpreted as line-to-line voltage.",
      "If the entered current already represents electrical input current, set efficiency to 1 or 100.",
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
        label: "Ohm's Law Calculator",
        href: "/en/calculators/ohms-law",
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
      { label: "Ampere-zu-kW Rechner" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Ampere-zu-kW Rechner",
    description:
      "Wandeln Sie Leitungsstrom fur Einphasen-, Dreiphasen- und DC-Systeme in eine Naherungsleistung um. Das Ergebnis wird als gut lesbare Leistungsgroesse unter Berucksichtigung von Spannung, Leistungsfaktor und Wirkungsgrad gezeigt.",
    heroEyebrow: "ELEKTRORECHNER",
    heroResultHeading: "Leistungsergebnis",
    introHeading: "Wofur wird dieses Ampere-zu-kW Werkzeug verwendet?",
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
      "Dieses Werkzeug schatzt die Leistung aus einem gemessenen oder vor Ort abgelesenen Leitungsstrom fur Einphasen-, Dreiphasen- und DC-Systeme ab.",
      "Es eignet sich zur Leistungsabschatzung bestehender Leitungen, zur Lastverteilungskontrolle und zur ersten Planung von Generatoren oder USV.",
    ],
    formulas: [
      "Einphase: P = V x I x cos phi x eta",
      "Dreiphasig: P = sqrt(3) x V x I x cos phi x eta",
      "DC: P = V x I x eta",
    ],
    variables: [
      { term: "I", explanation: "Gemessener oder eingegebener Leitungsstrom." },
      { term: "V", explanation: "Netz- oder Systemspannung." },
      { term: "cos phi", explanation: "Leistungsfaktor in AC-Systemen zur Verknupfung von Wirk- und Scheinleistung." },
      { term: "eta", explanation: "Wirkungsgrad; er wird verwendet, wenn aus Strom die Ausgangsleistung bestimmt werden soll." },
      { term: "P", explanation: "Berechnete Naherungsleistung." },
    ],
    examples: [
      {
        title: "9.59 A, 400 V, dreiphasig, Leistungsfaktor 0.9 und Wirkungsgrad 92",
        body: "P = 1.732 x 400 x 9.59 x 0.9 x 0.92 und ergibt etwa 5.5 kW. Dies ist die Umkehrung des passenden kW-zu-Ampere Beispiels.",
      },
      {
        title: "9.15 A, 230 V einphasig, Leistungsfaktor 0.95 und Wirkungsgrad 100",
        body: "P = 230 x 9.15 x 0.95 und ergibt etwa 2 kW.",
      },
    ],
    applications: [
      "Leistungsabschatzung bestehender Leitungen vor Ort",
      "Lastverteilung und Schaltschrankkontrolle",
      "Planung von Generator oder USV",
      "Schnelle Leistungskontrolle aus Zahler- oder Zangenamperemeter-Werten",
    ],
    limitations: [
      "Dieses Werkzeug liefert eine Naherungsleistung und berucksichtigt keine Oberschwingungen, Anlaufstrome, Temperatureffekte oder Messtoleranzen.",
      "Im Dreiphasenmodus wird die Spannung als Leiterspannung interpretiert.",
      "Falls der eingegebene Strom bereits den elektrischen Eingangsstrom darstellt, setzen Sie den Wirkungsgrad auf 1 oder 100.",
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
        label: "Ohmsches-Gesetz-Rechner",
        href: "/de/rechner/ohms-law",
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
};

function renderTypicalUse(
  unit: EngineeringUnitDefinition,
  locale: CalculatorLocale
) {
  return locale === "tr" ? unit.typicalUseTr : unit.typicalUseEn;
}

export default function AmpToKwPage({
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

      <AmpToKwCalculator
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
