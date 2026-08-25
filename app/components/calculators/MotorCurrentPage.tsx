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
      { label: "Motor Akimi Hesaplama" },
    ],
    breadcrumbLabel: "Sayfa yolu",
    title: "Motor Akimi Hesaplama",
    description:
      "Motor gucu, gerilim, guc faktoru ve verimden yaklasik tam yuk akimini (FLA) hesaplayin; secilen emniyet payiyla kontaktor, termik ve kablo secimi icin tasarim akimini gorun.",
    heroEyebrow: "ELEKTRIK HESAPLAYICISI",
    heroResultHeading: "Tam yuk akimi sonucu",
    introHeading: "Bu motor akimi araci ne icin kullanilir?",
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
      "Bu arac, motor etiket gucunden yaklasik tam yuk akimini (FLA) cikarir ve girilen bir emniyet payiyla kontaktor, termik role ve motor kablosu seciminde kullanilacak tasarim akimini gosterir.",
      "kW to Amper aracindan farki, motor secim akisina odaklanmasi ve sonuca dogrudan bir tasarim marjini eklemesidir; genel yuk gucu hesaplari icin kW to Amper aracini kullanabilirsiniz.",
    ],
    formulas: [
      "Tek faz: I = P / (V x cos phi x eta)",
      "Uc faz: I = P / (sqrt(3) x V x cos phi x eta)",
      "Tasarim akimi: I_tasarim = FLA x (1 + emniyet payi)",
    ],
    variables: [
      { term: "P", explanation: "Motor etiketindeki nominal guc degeridir." },
      { term: "V", explanation: "Besleme gerilimi veya faz-faz gerilimidir." },
      { term: "cos phi", explanation: "Motorun guc faktorudur; etiket veya katalog degerinden alinir." },
      { term: "eta", explanation: "Motor verimidir; etiket veya katalog degerinden alinir." },
      { term: "FLA", explanation: "Hesaplanan yaklasik tam yuk akimidir (full-load amps)." },
      { term: "Emniyet payi", explanation: "Kontaktor, termik role ve kablo seciminde bırakılan ek tasarim marjidir." },
    ],
    examples: [
      {
        title: "5.5 kW, 400 V, uc faz, cos phi 0.85, verim 90, emniyet %15",
        body: "FLA = 5500 / (1.732 x 400 x 0.85 x 0.9) yaklasik 10.38 A. Tasarim akimi yaklasik 11.93 A olur.",
      },
      {
        title: "1.1 kW, 230 V, tek faz, cos phi 0.8, verim 75, emniyet %15",
        body: "FLA = 1100 / (230 x 0.8 x 0.75) yaklasik 7.97 A. Tasarim akimi yaklasik 9.17 A olur.",
      },
    ],
    applications: [
      "Kontaktor ve termik role on secimi",
      "Motor kablo ve sigorta boyutlandirmasi",
      "Proje kesiflerinde hizli tam yuk akimi kontrolu",
      "Mevcut bir motorun etiket degerlerinden akim dogrulamasi",
    ],
    limitations: [
      "Bu arac yaklasik tam yuk akimi (FLA) verir; motor kalkis (rotor kilitli) akimi tipik olarak FLA'nin 6-8 katina kadar cikabilir ve bu hesaba dahil degildir.",
      "Sonuc, motor etiketindeki gercek cos phi ve verim degerleri yerine kullanicinin girdigi tahmini degerlere baglidir; mumkunse motor etiket bilgilerini kullanin.",
      "Kontaktor, termik role ve kablo secimi icin nihai karar, ilgili urun katalogu ve elektrik tesisat yonetmeligine gore verilmelidir.",
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
        label: "Kablo Kesiti Hesaplayicisi",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/kablo-kesiti-hesaplama",
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
      "Schatzen Sie den Motor-Nennstrom (FLA) aus Motorleistung, Spannung, Leistungsfaktor und Wirkungsgrad ab und ermitteln Sie mit einer Reserve den Auslegungsstrom fur Schutz-, Motorschutz- und Kabelauswahl.",
    heroEyebrow: "ELEKTRORECHNER",
    heroResultHeading: "Nennstrom-Ergebnis",
    introHeading: "Wofur wird dieses Motorstrom-Werkzeug verwendet?",
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
      "Dieses Werkzeug schatzt den Motor-Nennstrom (FLA) aus der Typenschildleistung ab und wendet eine eingegebene Reserve an, um den Auslegungsstrom fur Schutz-, Motorschutz- und Kabelauswahl zu ermitteln.",
      "Der Unterschied zum kW-zu-Ampere Rechner liegt im Fokus auf die Motorauswahl und der direkt eingerechneten Reserve; fur allgemeine Leistungs-Strom-Prufungen nutzen Sie den kW-zu-Ampere Rechner.",
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
      { term: "FLA", explanation: "Berechneter naherungsweiser Nennstrom." },
      { term: "Reserve", explanation: "Zusatzlicher Auslegungsspielraum fur Schutz-, Motorschutz- und Kabelauswahl." },
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
      "Vorauswahl von Schutzen und Motorschutzrelais",
      "Motor-Kabel- und Sicherungsdimensionierung",
      "Schnelle Kontrolle des Nennstroms in der Projektphase",
      "Stromprufung anhand der Typenschildwerte eines vorhandenen Motors",
    ],
    limitations: [
      "Dieses Werkzeug liefert einen naherungsweisen Nennstrom (FLA); der Anlaufstrom bei blockiertem Rotor kann typischerweise das 6- bis 8-Fache des FLA erreichen und ist hier nicht enthalten.",
      "Das Ergebnis hangt von den eingegebenen Werten fur Leistungsfaktor und Wirkungsgrad ab, nicht von den tatsachlichen Typenschildwerten; nutzen Sie nach Moglichkeit die Typenschilddaten.",
      "Die endgueltige Auswahl von Schutz, Motorschutzrelais und Kabel muss anhand des jeweiligen Produktkatalogs und der geltenden Elektrovorschrift erfolgen.",
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
