import Link from "next/link";
import type { ReactNode } from "react";
import {
  diameterUnitDefinitions,
  reynoldsDensityUnitDefinitions,
  speedUnitDefinitions,
  viscosityUnitDefinitions,
  type CalculatorLocale,
} from "../../converter/engineeringCalculatorUnits";
import { formatEngineeringValue } from "../../converter/pressureForceArea";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import ReynoldsNumberCalculator from "./ReynoldsNumberCalculator";
import ReynoldsRegimeReference from "../technicalReferences/ReynoldsRegimeReference";
import WaterViscosityReference from "../technicalReferences/WaterViscosityReference";

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
  interpretationHeading: string;
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
  interpretationNotes: string[];
  examples: Array<{ title: string; body: string }>;
  applications: string[];
  limitations: string[];
  sources: Array<{ label: string; href: string }>;
  relatedCalculators: Array<{ label: string; href: string }>;
  relatedConversions: Array<{ label: string; href: string }>;
};

const unitSectionHeadings = {
  tr: {
    density: "Yoğunluk birimleri",
    speed: "Hız birimleri",
    diameter: "Karakteristik çap birimleri",
    viscosity: "Dinamik viskozite birimleri",
  },
  en: {
    density: "Density units",
    speed: "Velocity units",
    diameter: "Characteristic-diameter units",
    viscosity: "Dynamic-viscosity units",
  },
  de: {
    density: "Dichteeinheiten",
    speed: "Geschwindigkeitseinheiten",
    diameter: "Einheiten des charakteristischen Durchmessers",
    viscosity: "Einheiten der dynamischen Viskosität",
  },
} as const;

function getUnitSections(locale: CalculatorLocale): UnitTableSection[] {
  const headings = unitSectionHeadings[locale];

  return [
    {
      id: "density-units",
      heading: headings.density,
      siSymbol: "kg/m³",
      units: reynoldsDensityUnitDefinitions,
    },
    {
      id: "speed-units",
      heading: headings.speed,
      siSymbol: "m/s",
      units: speedUnitDefinitions,
    },
    {
      id: "diameter-units",
      heading: headings.diameter,
      siSymbol: "m",
      units: diameterUnitDefinitions,
    },
    {
      id: "viscosity-units",
      heading: headings.viscosity,
      siSymbol: "Pa·s",
      units: viscosityUnitDefinitions,
    },
  ];
}

const pageCopy: Record<CalculatorLocale, PageCopy> = {
  tr: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Hesaplayıcılar", href: "/muhendislik-hesaplayicilari" },
      { label: "Reynolds Sayısı Hesaplayıcısı" },
    ],
    breadcrumbLabel: "Sayfa yolu",
    title: "Reynolds Sayısı Hesaplayıcısı",
    description:
      "Re = ρ × v × D / μ bağıntısıyla Reynolds sayısını, hızı veya karakteristik çapı hesaplayın. Sonuç aynı tasarım dilinde, SI eşdeğeri ve boru içi akış için yaklaşık rejim yorumu ile sunulur.",
    heroEyebrow: "MÜHENDİSLİK HESAPLAYICISI",
    heroResultHeading: "Hesaplama sonucu",
    introHeading: "Reynolds sayısı neden önemlidir?",
    formulasHeading: "Kullanılan formüller",
    variablesHeading: "Değişkenler ve SI birimleri",
    interpretationHeading: "Akış rejimi yorumu",
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
      "Reynolds sayısı, atalet kuvvetleri ile viskoz kuvvetlerin oranını temsil eden boyutsuz bir büyüklüktür.",
      "Özellikle boru içi akışta akışın laminer, geçiş bölgesinde veya türbülanslı olup olmadığını yaklaşık olarak yorumlamak için kullanılır.",
    ],
    formulas: [
      "Re = ρ × v × D / μ",
      "v = Re × μ / (ρ × D)",
      "D = Re × μ / (ρ × v)",
    ],
    variables: [
      {
        term: "Re",
        explanation: "Boyutsuz Reynolds sayısıdır. SI birimi yoktur.",
      },
      {
        term: "ρ",
        explanation: "Akışkan yoğunluğudur. SI birimi kg/m³.",
      },
      {
        term: "v",
        explanation: "Ortalama akış hızıdır. SI birimi m/s.",
      },
      {
        term: "D",
        explanation: "Karakteristik boru veya kanal çapıdır. SI birimi m.",
      },
      {
        term: "μ",
        explanation: "Dinamik viskozitedir. SI birimi Pa·s.",
      },
    ],
    interpretationNotes: [
      "Re < 2300 için akış yaklaşık laminer kabul edilir.",
      "2300 ile 4000 arası geçiş bölgesi olarak yorumlanır.",
      "Re > 4000 için akış yaklaşık türbülanslı kabul edilir.",
      "Bu sınırlar özellikle düzgün boru içi akış için yaklaşık rehber niteliğindedir; geometri ve giriş koşulları sonucu değiştirebilir.",
      "Su ve hava ön ayarları yaklaşık oda koşulu değerleri sağlar; gerçek koşul verisi sonuçları değiştirebilir.",
    ],
    examples: [
      {
        title: "Su için Re hesabı",
        body:
          "ρ = 1000 kg/m³, v = 2 m/s, D = 50 mm ve μ = 1 mPa·s için Reynolds sayısı 100000 olur; bu değer türbülanslı bölgededir.",
      },
      {
        title: "Hedef Re ile gerekli hız",
        body:
          "Re = 2000, ρ = 1000 kg/m³, D = 20 mm ve μ = 1 mPa·s için hız yaklaşık 0.1 m/s bulunur.",
      },
    ],
    applications: [
      "Boru içi akışın ilk rejim sınıflandırması",
      "Laboratuvar düzeneklerinde karakteristik hız tahminleri",
      "Kanal ve boru çapı ön seçimi",
      "Akışkan özelliklerinin rejime etkisini hızlı karşılaştırma",
    ],
    limitations: [
      "Bu hesap boyutsuz Reynolds sayısının temel tanımını kullanır ve giriş/çıkış etkilerini, pürüzlülüğü veya özel geometrileri ayrı olarak modellemez.",
      "Akış rejimi yorumu boru içi akış için yaklaşık sınırlar sunar; açık kanal, kanat profili veya karmaşık kanallarda farklı eşikler kullanılabilir.",
      "Dinamik viskozite ve yoğunluk değerleri sıcaklığa güçlü biçimde bağlı olabilir; gerçek koşullara yakın veri seçilmelidir.",
    ],
    sources: [
      {
        label: "OpenStax College Physics - Viscosity and Laminar Flow",
        href: "https://openstax.org/books/college-physics/pages/12-2-viscosity-and-laminar-flow-poiseuilles-law",
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
        label: "Isı İletimi Hesaplayıcısı",
        href: "/hesaplayicilar/isi-iletimi",
      },
      {
        label: "Hidrostatik Basınç Hesaplayıcısı",
        href: "/hesaplayicilar/hidrostatik-basinc",
      },
      {
        label: "Mühendislik Hesaplayıcıları merkezi",
        href: "/muhendislik-hesaplayicilari",
      },
    ],
    relatedConversions: [
      { label: "Santimetre → İnç", href: "/santimetre-inc" },
      { label: "Metre → Fit", href: "/metre-fit" },
    ],
  },
  en: {
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Calculators", href: "/en/engineering-calculators" },
      { label: "Reynolds Number Calculator" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Reynolds Number Calculator",
    description:
      "Use Re = ρ × v × D / μ to calculate Reynolds number, velocity or characteristic diameter. The result is presented in the same design language with an SI equivalent and an approximate internal-pipe-flow regime interpretation.",
    heroEyebrow: "ENGINEERING CALCULATOR",
    heroResultHeading: "Calculation result",
    introHeading: "Why is Reynolds number important?",
    formulasHeading: "Formulas used",
    variablesHeading: "Variables and SI units",
    interpretationHeading: "Flow-regime interpretation",
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
      "The Reynolds number is a dimensionless ratio that compares inertial effects with viscous effects in a flow.",
      "It is commonly used for a first-pass interpretation of whether internal pipe flow is approximately laminar, transitional or turbulent.",
    ],
    formulas: [
      "Re = ρ × v × D / μ",
      "v = Re × μ / (ρ × D)",
      "D = Re × μ / (ρ × v)",
    ],
    variables: [
      {
        term: "Re",
        explanation: "Dimensionless Reynolds number. No SI unit.",
      },
      {
        term: "ρ",
        explanation: "Fluid density. SI unit: kg/m³.",
      },
      {
        term: "v",
        explanation: "Average flow velocity. SI unit: m/s.",
      },
      {
        term: "D",
        explanation: "Characteristic pipe or channel diameter. SI unit: m.",
      },
      {
        term: "μ",
        explanation: "Dynamic viscosity. SI unit: Pa·s.",
      },
    ],
    interpretationNotes: [
      "Re < 2300 is commonly treated as approximately laminar.",
      "Re between 2300 and 4000 is commonly treated as transitional.",
      "Re > 4000 is commonly treated as approximately turbulent.",
      "These limits are only approximate guides for internal pipe flow; geometry and inlet conditions can shift the effective regime boundaries.",
      "Water and air presets provide approximate room-condition properties; real operating data can change the outcome.",
    ],
    examples: [
      {
        title: "Re calculation for water",
        body:
          "With ρ = 1000 kg/m³, v = 2 m/s, D = 50 mm and μ = 1 mPa·s, the Reynolds number is 100000, which falls in the turbulent range.",
      },
      {
        title: "Required velocity for a target Re",
        body:
          "For Re = 2000, ρ = 1000 kg/m³, D = 20 mm and μ = 1 mPa·s, the velocity is about 0.1 m/s.",
      },
    ],
    applications: [
      "First-pass regime checks for internal pipe flow",
      "Estimating characteristic velocities in lab setups",
      "Preliminary channel and pipe diameter selection",
      "Comparing how fluid properties affect flow regime",
    ],
    limitations: [
      "The calculation uses the base Reynolds-number definition and does not separately model entry effects, roughness or special geometries.",
      "The flow-regime interpretation uses approximate internal-pipe-flow limits; open channels, airfoils and complex ducts may require different criteria.",
      "Dynamic viscosity and density can vary strongly with temperature, so realistic property data should be selected whenever possible.",
    ],
    sources: [
      {
        label: "OpenStax College Physics - Viscosity and Laminar Flow",
        href: "https://openstax.org/books/college-physics/pages/12-2-viscosity-and-laminar-flow-poiseuilles-law",
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
        label: "Heat Conduction Calculator",
        href: "/en/calculators/heat-conduction",
      },
      {
        label: "Hydrostatic Pressure Calculator",
        href: "/en/calculators/hydrostatic-pressure",
      },
      {
        label: "Engineering Calculators hub",
        href: "/en/engineering-calculators",
      },
    ],
    relatedConversions: [
      { label: "Centimeters to Inches", href: "/en/centimeters-to-inches" },
      { label: "Meters to Feet", href: "/en/meters-to-feet" },
    ],
  },
  de: {
    breadcrumbs: [
      { label: "Startseite", href: "/de" },
      { label: "Rechner", href: "/de/ingenieurrechner" },
      { label: "Reynolds-Zahl-Rechner" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Reynolds-Zahl-Rechner",
    description:
      "Berechnen Sie mit Re = ρ × v × D / μ die Reynolds-Zahl, die Geschwindigkeit oder den charakteristischen Durchmesser. Das Ergebnis wird in derselben Gestaltungssprache mit SI-Äquivalent und einer ungefähren Interpretation des Strömungsregimes für die Rohrströmung angezeigt.",
    heroEyebrow: "INGENIEURRECHNER",
    heroResultHeading: "Berechnungsergebnis",
    introHeading: "Warum ist die Reynolds-Zahl wichtig?",
    formulasHeading: "Verwendete Formeln",
    variablesHeading: "Variablen und SI-Einheiten",
    interpretationHeading: "Interpretation des Strömungsregimes",
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
      "Die Reynolds-Zahl ist eine dimensionslose Kennzahl, die Trägheitskräfte mit viskosen Kräften in einer Strömung vergleicht.",
      "Sie wird häufig für eine erste Einschätzung verwendet, ob eine Rohrströmung näherungsweise laminar, im Übergangsbereich oder turbulent ist.",
    ],
    formulas: [
      "Re = ρ × v × D / μ",
      "v = Re × μ / (ρ × D)",
      "D = Re × μ / (ρ × v)",
    ],
    variables: [
      {
        term: "Re",
        explanation: "Dimensionslose Reynolds-Zahl. Keine SI-Einheit.",
      },
      {
        term: "ρ",
        explanation: "Dichte des Fluids. SI-Einheit: kg/m³.",
      },
      {
        term: "v",
        explanation: "Mittlere Strömungsgeschwindigkeit. SI-Einheit: m/s.",
      },
      {
        term: "D",
        explanation:
          "Charakteristischer Rohr- oder Kanaldurchmesser. SI-Einheit: m.",
      },
      {
        term: "μ",
        explanation: "Dynamische Viskosität. SI-Einheit: Pa·s.",
      },
    ],
    interpretationNotes: [
      "Re < 2300 gilt üblicherweise als näherungsweise laminar.",
      "Re zwischen 2300 und 4000 gilt üblicherweise als Übergangsbereich.",
      "Re > 4000 gilt üblicherweise als näherungsweise turbulent.",
      "Diese Grenzwerte sind nur ungefähre Richtwerte für die Rohrströmung; Geometrie und Einlaufbedingungen können die tatsächlichen Grenzen verschieben.",
      "Die Voreinstellungen für Wasser und Luft liefern ungefähre Werte bei Raumbedingungen; reale Betriebsdaten können das Ergebnis verändern.",
    ],
    examples: [
      {
        title: "Re-Berechnung für Wasser",
        body:
          "Mit ρ = 1000 kg/m³, v = 2 m/s, D = 50 mm und μ = 1 mPa·s ergibt sich eine Reynolds-Zahl von 100000, die im turbulenten Bereich liegt.",
      },
      {
        title: "Erforderliche Geschwindigkeit für eine Ziel-Re",
        body:
          "Für Re = 2000, ρ = 1000 kg/m³, D = 20 mm und μ = 1 mPa·s ergibt sich eine Geschwindigkeit von etwa 0,1 m/s.",
      },
    ],
    applications: [
      "Erste Einschätzung des Strömungsregimes bei Rohrströmung",
      "Abschätzung charakteristischer Geschwindigkeiten in Laboraufbauten",
      "Vorauswahl von Kanal- und Rohrdurchmessern",
      "Vergleich, wie Fluideigenschaften das Strömungsregime beeinflussen",
    ],
    limitations: [
      "Die Berechnung verwendet die grundlegende Definition der Reynolds-Zahl und modelliert Einlaufeffekte, Rauheit oder spezielle Geometrien nicht gesondert.",
      "Die Interpretation des Strömungsregimes nutzt ungefähre Grenzwerte für die Rohrströmung; offene Kanäle, Tragflächenprofile und komplexe Kanäle können andere Kriterien erfordern.",
      "Dynamische Viskosität und Dichte können stark temperaturabhängig sein; nach Möglichkeit sollten realistische Stoffdaten gewählt werden.",
    ],
    sources: [
      {
        label: "OpenStax College Physics - Viscosity and Laminar Flow",
        href: "https://openstax.org/books/college-physics/pages/12-2-viscosity-and-laminar-flow-poiseuilles-law",
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
        label: "Wärmeleitungsrechner",
        href: "/de/rechner/waermeleitung",
      },
      {
        label: "Hydrostatischer-Druck-Rechner",
        href: "/de/rechner/hydrostatischer-druck",
      },
      {
        label: "Ingenieurrechner-Zentrum",
        href: "/de/ingenieurrechner",
      },
    ],
    relatedConversions: [
      { label: "Zentimeter → Zoll", href: "/de/zentimeter-zoll" },
      { label: "Meter → Fuß", href: "/de/meter-fuss" },
    ],
  },
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

export default function ReynoldsNumberPage({
  locale,
  structuredData,
}: {
  locale: CalculatorLocale;
  structuredData?: ReactNode;
}) {
  const copy = pageCopy[locale];
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

      <ReynoldsNumberCalculator
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
          <h2>{copy.variablesHeading}</h2>
          <dl className="unit-facts">
            {copy.variables.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.explanation}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="conversion-section">
          <h2>{copy.interpretationHeading}</h2>
          <div className="engineering-note-box">
            <ul className="calculator-bullet-list">
              {copy.interpretationNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
          <ReynoldsRegimeReference locale={locale} />
        </section>

        <section className="conversion-section">
          <h2>
            {locale === "tr"
              ? "Suyun dinamik viskozitesi referansı"
              : locale === "de"
                ? "Referenz zur dynamischen Viskosität von Wasser"
                : "Water dynamic-viscosity reference"}
          </h2>
          <WaterViscosityReference locale={locale} />
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
