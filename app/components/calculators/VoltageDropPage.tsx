import Link from "next/link";
import type { ReactNode } from "react";
import {
  calculatorAreaUnitDefinitions,
  calculatorLengthUnitDefinitions,
  currentUnitDefinitions,
  formatCalculatorUnitName,
  voltageUnitDefinitions,
} from "../../converter/engineeringCalculatorUnits";
import { formatEngineeringValue } from "../../converter/pressureForceArea";
import type { CalculatorLocale } from "../../converter/pressureForceArea";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import VoltageDropCalculator from "./VoltageDropCalculator";

type UnitTableSection = {
  id: string;
  heading: string;
  siSymbol: string;
  units: ReadonlyArray<EngineeringUnitDefinition>;
};

const unitSectionHeadings = {
  tr: {
    voltage: "Gerilim birimleri",
    current: "Akim birimleri",
    length: "Uzunluk birimleri",
    area: "Kesit birimleri",
  },
  en: {
    voltage: "Voltage units",
    current: "Current units",
    length: "Length units",
    area: "Cross-section units",
  },
  de: {
    voltage: "Spannungseinheiten",
    current: "Stromeinheiten",
    length: "Langeneinheiten",
    area: "Querschnittseinheiten",
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
      id: "length-units",
      heading: headings.length,
      siSymbol: "m",
      units: calculatorLengthUnitDefinitions,
    },
    {
      id: "area-units",
      heading: headings.area,
      siSymbol: "m²",
      units: calculatorAreaUnitDefinitions,
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
      { label: "Gerilim Dusumu Hesaplama" },
    ],
    breadcrumbLabel: "Sayfa yolu",
    title: "Gerilim Dusumu Hesaplama",
    description:
      "Secili kablo kesitinde volt kaybini, yuzdesel dusumu ve hat sonu gerilimini hesaplayin. Tek faz, uc faz ve DC sistemler ile bakir veya aluminyum iletken destekler.",
    heroEyebrow: "ELEKTRIK HESAPLAYICISI",
    heroResultHeading: "Gerilim dusumu sonucu",
    introHeading: "Bu gerilim dusumu araci ne icin kullanilir?",
    formulasHeading: "Kullanilan formul",
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
      "Bu arac, secilen bakir veya aluminyum iletken kesitinde olusacak volt kaybini, bu kaybin kaynak gerilimine oranini ve hat sonundaki gerilimi hesaplar.",
      "Ic tesisat kontrolu, motor besleme hatlari ve uzak saha panolarinda secilen kesitin yeterli olup olmadigini hizlica dogrulamak icin kullanilabilir.",
    ],
    formulas: [
      "Genel: ΔU = k x I x L x ρ / A",
      "Tek faz ve DC icin k = 2 (gidis-donus iletkeni)",
      "Uc faz icin k = √3",
    ],
    variables: [
      { term: "I", explanation: "Hat akimidir." },
      { term: "L", explanation: "Kablonun tek yon uzunlugudur." },
      { term: "ρ", explanation: "Iletken malzemesinin ozgul direncidir (yaklasik 20°C icin bakir 0.0175, aluminyum 0.028 Ω·mm²/m)." },
      { term: "A", explanation: "Iletken kesit alanidir." },
      { term: "k", explanation: "Sistem tipine gore gidis-donus veya uc faz katsayisidir." },
      { term: "ΔU", explanation: "Hesaplanan gerilim dusumudur." },
    ],
    examples: [
      {
        title: "400 V, 20 A, 50 m, 6 mm², bakir, uc faz",
        body: "ΔU = 1.732 x 20 x 50 x 0.0175 / 6 yaklasik 5.05 V, yani %1.26 dusum. Hat sonu gerilimi yaklasik 394.95 V olur.",
      },
      {
        title: "230 V, 16 A, 30 m, 2.5 mm², bakir, tek faz",
        body: "ΔU = 2 x 16 x 30 x 0.0175 / 2.5 yaklasik 6.72 V, yani %2.92 dusum. Hat sonu gerilimi yaklasik 223.28 V olur.",
      },
    ],
    applications: [
      "Ic tesisat kontrolu",
      "Motor besleme hatlari",
      "Uzak sensor veya saha panolari",
      "Mevcut bir kesitin secilen mesafede yeterli olup olmadiginin dogrulanmasi",
    ],
    limitations: [
      "Bu hesap yalnizca dirence bagli gerilim dusumunu kapsar; reaktans (endüktif dusum), harmonikler ve kalkis akimlari dahil degildir.",
      "Kullanilan ozgul direnc degerleri (bakir 0.0175, aluminyum 0.028 Ω·mm²/m) yaklasik 20°C referans degerleridir; gercek iletken sicakligi sonucu etkiler.",
      "Bu arac akim tasima kapasitesini (ampacity) kontrol etmez. Secilen kesitin dosema yontemine, ortam sicakligina ve ilgili elektrik tesisat yonetmeligine gore ayrica dogrulanmasi gerekir.",
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
        label: "Kablo Kesiti Hesaplayicisi",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/kablo-kesiti-hesaplama",
      },
      {
        label: "kW to Amper Hesaplayicisi",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama",
      },
      {
        label: "Elektrik Hesaplari merkezi",
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari",
      },
    ],
    relatedGuides: [
      { label: "Volt (V) rehberi", href: "/birimler/volt" },
      { label: "Amper (A) rehberi", href: "/birimler/amper" },
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
      { label: "Voltage Drop Calculator" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Voltage Drop Calculator",
    description:
      "Calculate the voltage loss, percent drop and end-of-line voltage for a selected conductor cross-section. Supports single-phase, three-phase and DC systems with copper or aluminum conductors.",
    heroEyebrow: "ELECTRICAL CALCULATOR",
    heroResultHeading: "Voltage-drop result",
    introHeading: "What is this voltage drop tool used for?",
    formulasHeading: "Formula used",
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
      "This tool calculates the voltage loss for a selected copper or aluminum conductor cross-section, the resulting percent drop and the voltage remaining at the end of the run.",
      "It is useful for checking internal wiring, motor feeder circuits and remote field panels to confirm a chosen cross-section is adequate.",
    ],
    formulas: [
      "General: ΔU = k x I x L x ρ / A",
      "For single-phase and DC, k = 2 (outgoing and return conductor)",
      "For three-phase, k = √3",
    ],
    variables: [
      { term: "I", explanation: "Line current." },
      { term: "L", explanation: "One-way cable length." },
      { term: "ρ", explanation: "Conductor resistivity (approximate values at 20°C: copper 0.0175, aluminum 0.028 Ω·mm²/m)." },
      { term: "A", explanation: "Conductor cross-sectional area." },
      { term: "k", explanation: "Return-conductor or three-phase factor depending on system type." },
      { term: "ΔU", explanation: "Calculated voltage drop." },
    ],
    examples: [
      {
        title: "400 V, 20 A, 50 m, 6 mm², copper, three-phase",
        body: "ΔU = 1.732 x 20 x 50 x 0.0175 / 6 which gives about 5.05 V, a 1.26% drop. The end-of-line voltage is about 394.95 V.",
      },
      {
        title: "230 V, 16 A, 30 m, 2.5 mm², copper, single-phase",
        body: "ΔU = 2 x 16 x 30 x 0.0175 / 2.5 which gives about 6.72 V, a 2.92% drop. The end-of-line voltage is about 223.28 V.",
      },
    ],
    applications: [
      "Internal wiring checks",
      "Motor feeder circuits",
      "Remote sensor or field-panel runs",
      "Confirming whether an existing cross-section is adequate at a given distance",
    ],
    limitations: [
      "This calculation covers resistive voltage drop only; reactance (inductive drop), harmonics and starting currents are not included.",
      "The resistivity values used (copper 0.0175, aluminum 0.028 Ω·mm²/m) are approximate 20°C reference values; actual conductor temperature affects the result.",
      "This tool does not check current-carrying capacity (ampacity). Verify the chosen cross-section separately against the installation method, ambient temperature and applicable electrical code.",
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
        label: "Cable Size Calculator",
        href: "/en/engineering-calculators/electrical-calculators/cable-size-calculator",
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
      { label: "Volt (V) guide", href: "/en/units/volt" },
      { label: "Ampere (A) guide", href: "/en/units/ampere" },
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
      { label: "Spannungsfall Rechner" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Spannungsfall Rechner",
    description:
      "Berechnen Sie Spannungsverlust, prozentualen Spannungsfall und Endspannung fur einen gewahlten Leiterquerschnitt. Unterstutzt Einphasen-, Dreiphasen- und DC-Systeme mit Kupfer- oder Aluminiumleitern.",
    heroEyebrow: "ELEKTRORECHNER",
    heroResultHeading: "Spannungsfall-Ergebnis",
    introHeading: "Wofur wird dieses Spannungsfall-Werkzeug verwendet?",
    formulasHeading: "Verwendete Formel",
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
      "Dieses Werkzeug berechnet den Spannungsverlust fur einen gewahlten Kupfer- oder Aluminiumquerschnitt, den daraus folgenden prozentualen Spannungsfall und die am Leitungsende verbleibende Spannung.",
      "Es eignet sich zur Prufung interner Elektroinstallationen, Motorzuleitungen und entfernter Feldschranke, um zu bestatigen, dass ein gewahlter Querschnitt ausreicht.",
    ],
    formulas: [
      "Allgemein: ΔU = k x I x L x ρ / A",
      "Fur Einphasen- und DC-Systeme gilt k = 2 (Hin- und Ruckleiter)",
      "Fur Dreiphasensysteme gilt k = √3",
    ],
    variables: [
      { term: "I", explanation: "Leitungsstrom." },
      { term: "L", explanation: "Einfache Leitungslange." },
      { term: "ρ", explanation: "Spezifischer Widerstand des Leiters (Naherungswerte bei 20°C: Kupfer 0.0175, Aluminium 0.028 Ω·mm²/m)." },
      { term: "A", explanation: "Leiterquerschnittsflache." },
      { term: "k", explanation: "Ruckleiter- oder Dreiphasenfaktor je nach Systemtyp." },
      { term: "ΔU", explanation: "Berechneter Spannungsfall." },
    ],
    examples: [
      {
        title: "400 V, 20 A, 50 m, 6 mm², Kupfer, dreiphasig",
        body: "ΔU = 1.732 x 20 x 50 x 0.0175 / 6 und ergibt etwa 5.05 V, also 1.26 % Fall. Die Endspannung betragt etwa 394.95 V.",
      },
      {
        title: "230 V, 16 A, 30 m, 2.5 mm², Kupfer, einphasig",
        body: "ΔU = 2 x 16 x 30 x 0.0175 / 2.5 und ergibt etwa 6.72 V, also 2.92 % Fall. Die Endspannung betragt etwa 223.28 V.",
      },
    ],
    applications: [
      "Prufung interner Elektroinstallationen",
      "Motorzuleitungen",
      "Leitungen zu entfernten Sensoren oder Feldschranken",
      "Kontrolle, ob ein vorhandener Querschnitt bei gegebener Entfernung ausreicht",
    ],
    limitations: [
      "Diese Berechnung deckt nur den ohmschen Spannungsfall ab; Reaktanz (induktiver Fall), Oberschwingungen und Anlaufstrome sind nicht enthalten.",
      "Die verwendeten spezifischen Widerstande (Kupfer 0.0175, Aluminium 0.028 Ω·mm²/m) sind Naherungswerte bei 20°C; die tatsachliche Leitertemperatur beeinflusst das Ergebnis.",
      "Dieses Werkzeug pruft nicht die Strombelastbarkeit (Ampacity). Der gewahlte Querschnitt muss separat anhand von Verlegeart, Umgebungstemperatur und geltender Elektrovorschrift bestatigt werden.",
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
        label: "Kabelquerschnitt Rechner",
        href: "/de/ingenieurrechner/elektrorechner/kabelquerschnitt-rechner",
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
      { label: "Volt (V) Leitfaden", href: "/de/einheiten/volt" },
      { label: "Ampere (A) Leitfaden", href: "/de/einheiten/ampere" },
      { label: "Meter (m) Leitfaden", href: "/de/einheiten/meter" },
    ],
  },
};

function renderTypicalUse(
  unit: EngineeringUnitDefinition,
  locale: CalculatorLocale
) {
  return locale === "tr" ? unit.typicalUseTr : unit.typicalUseEn;
}

export default function VoltageDropPage({
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

      <VoltageDropCalculator
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
