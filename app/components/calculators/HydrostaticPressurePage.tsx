import Link from "next/link";
import type { ReactNode } from "react";
import {
  densityUnitDefinitions,
  depthUnitDefinitions,
  gravityUnitDefinitions,
  KILOGRAM_PER_CUBIC_METRE_UNIT,
  METRE_PER_SECOND_SQUARED_UNIT,
  pressureUnitDefinitions,
  type EngineeringUnitDefinition,
} from "../../converter/engineeringUnits";
import { formatEngineeringValue } from "../../converter/pressureForceArea";
import HydrostaticPressureCalculator from "./HydrostaticPressureCalculator";

type Locale = "tr" | "en";

type UnitTableSection = {
  id: string;
  heading: string;
  siSymbol: string;
  units: ReadonlyArray<EngineeringUnitDefinition>;
};

type PageCopy = {
  breadcrumbs: Array<{
    label: string;
    href?: string;
  }>;
  breadcrumbLabel: string;
  title: string;
  description: string;
  heroEyebrow: string;
  heroResultHeading: string;
  introHeading: string;
  formulasHeading: string;
  variablesHeading: string;
  absoluteHeading: string;
  densityHeading: string;
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
  variables: Array<{
    term: string;
    explanation: string;
  }>;
  absolutePressure: string[];
  densityNotes: string[];
  examples: Array<{
    title: string;
    body: string;
  }>;
  applications: string[];
  limitations: string[];
  sources: Array<{
    label: string;
    href: string;
  }>;
  relatedCalculators: Array<{
    label: string;
    href: string;
  }>;
  relatedConversions: Array<{
    label: string;
    href: string;
  }>;
};

function getUnitSections(locale: Locale): UnitTableSection[] {
  return [
    {
      id: "pressure-units",
      heading:
        locale === "tr"
          ? "Basınç birimleri"
          : "Pressure units",
      siSymbol: "Pa",
      units: pressureUnitDefinitions,
    },
    {
      id: "density-units",
      heading:
        locale === "tr"
          ? "Yoğunluk birimleri"
          : "Density units",
      siSymbol: KILOGRAM_PER_CUBIC_METRE_UNIT,
      units: densityUnitDefinitions,
    },
    {
      id: "depth-units",
      heading:
        locale === "tr" ? "Derinlik birimleri" : "Depth units",
      siSymbol: "m",
      units: depthUnitDefinitions,
    },
    {
      id: "gravity-units",
      heading:
        locale === "tr"
          ? "Yerçekimi ivmesi birimleri"
          : "Gravitational acceleration units",
      siSymbol: METRE_PER_SECOND_SQUARED_UNIT,
      units: gravityUnitDefinitions,
    },
  ];
}

const pageCopy: Record<Locale, PageCopy> = {
  tr: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Hesaplayıcılar" },
      { label: "Hidrostatik Basınç Hesaplayıcısı" },
    ],
    breadcrumbLabel: "Sayfa yolu",
    title: "Hidrostatik Basınç Hesaplayıcısı",
    description:
      "Durgun bir akışkandaki basınç farkını, yoğunluğu, derinliği veya yerçekimi ivmesini SI taban birimlerinden hareketle hesaplayın. Aynı hero tasarımında çalışan araç; mühendislik, dalış, depolama ve manometre uygulamaları için uygun bir başlangıç hesabı sunar.",
    heroEyebrow: "MÜHENDİSLİK HESAPLAYICISI",
    heroResultHeading: "Hesaplama sonucu",
    introHeading: "Hidrostatik basınç nedir?",
    formulasHeading: "ΔP = ρgh formülü",
    variablesHeading: "Değişkenler ve SI birimleri",
    absoluteHeading:
      "Basınç farkı ile mutlak basınç arasındaki fark",
    densityHeading: "Yoğunluğun sıcaklığa bağlılığı",
    unitsHeading: "Birim tabloları",
    examplesHeading: "Çözülmüş örnekler",
    applicationsHeading: "Uygulama alanları",
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
      "Hidrostatik basınç, durgun bir akışkan içinde derinlik arttıkça oluşan basınç farkıdır. Basınç farkı; akışkan yoğunluğu, yerçekimi ivmesi ve düşey derinlik farkının çarpımıyla bulunur.",
      "Bu hesaplayıcı özellikle su tankı, baraj, dalış, piezometre ve manometre yorumlarında hızlı mühendislik kontrolü için uygundur.",
    ],
    formulas: [
      "ΔP = ρ × g × h",
      "ρ = ΔP / (g × h)",
      "g = ΔP / (ρ × h)",
      "h = ΔP / (ρ × g)",
    ],
    variables: [
      {
        term: "ΔP",
        explanation:
          "Hidrostatik basınç farkıdır ve SI sisteminde pascal (Pa) ile ifade edilir.",
      },
      {
        term: "ρ",
        explanation:
          `Akışkan yoğunluğudur. SI tabanı kilogram/metreküp (${KILOGRAM_PER_CUBIC_METRE_UNIT}) olarak kullanılır.`,
      },
      {
        term: "g",
        explanation:
          `Yerçekimi ivmesidir. SI tabanı metre/saniyekare (${METRE_PER_SECOND_SQUARED_UNIT}) kabul edilir.`,
      },
      {
        term: "h",
        explanation:
          "Düşey derinlik veya sıvı sütunu yüksekliğidir. SI tabanı metre (m) kullanılır.",
      },
    ],
    absolutePressure: [
      "Formülün doğrudan verdiği büyüklük, yüzey ile hesaplanan nokta arasındaki hidrostatik basınç farkıdır.",
      "Mutlak basınç isteniyorsa yüzey basıncı ayrıca eklenir: P_absolute = P_surface + ρgh.",
    ],
    densityNotes: [
      "Yoğunluk sıcaklık, basınç, tuzluluk ve akışkan bileşimine göre değişebilir. Özellikle su ve deniz suyu için hassas hesaplarda uygun sıcaklık değerleri seçilmelidir.",
      "Gazlarda büyük yükseklik aralıklarında sabit yoğunluk varsayımı zayıflayabilir; bu durumda katmanlı veya integralli yaklaşım gerekir.",
    ],
    examples: [
      {
        title: `1000 ${KILOGRAM_PER_CUBIC_METRE_UNIT} × 9.80665 ${METRE_PER_SECOND_SQUARED_UNIT} × 10 m = 98.0665 kPa`,
        body:
          "Yuvarlatılmış mühendislik suyu için 10 metre derinlikteki hidrostatik basınç farkı 98066.5 Pa, yani 98.0665 kPa olur.",
      },
      {
        title: `1 g/cm\u00B3 × 9.80665 ${METRE_PER_SECOND_SQUARED_UNIT} × 100 cm = 9.80665 kPa`,
        body:
          `1 g/cm\u00B3 yoğunluk, 1000 ${KILOGRAM_PER_CUBIC_METRE_UNIT} ile aynıdır. 100 cm derinlik ise 1 m olduğundan sonuç 9806.65 Pa, yani 9.80665 kPa bulunur.`,
      },
      {
        title: `98.0665 kPa / (1000 ${KILOGRAM_PER_CUBIC_METRE_UNIT} × 9.80665 ${METRE_PER_SECOND_SQUARED_UNIT}) = 10 m`,
        body:
          "Verilen basınç farkı için su kolonunun düşey yüksekliği 10 metre olarak geri hesaplanır.",
      },
    ],
    applications: [
      "Su tankı ve depo taban basıncı tahminleri",
      "Baraj ve kapak sistemlerinde ilk basınç farkı kontrolleri",
      "Dalışta derinliğe bağlı basınç artışını yorumlama",
      "Manometre ve sıvı sütunu temelli ölçüm düzenekleri",
    ],
    limitations: [
      "Formül, durgun ve yaklaşık sabit yoğunluklu akışkan için kullanılır.",
      "h, eğik yol uzunluğu değil düşey derinlik farkıdır.",
      "Yoğunluk derinlikle önemli ölçüde değişiyorsa integralli yaklaşım gerekir.",
      "Gazlarda büyük yükseklik değişimlerinde sabit yoğunluk varsayımı uygun olmayabilir.",
      "Sonuç başlangıçta basınç farkıdır; mutlak basınç için yüzey basıncı ayrıca eklenir.",
    ],
    sources: [
      {
        label:
          "OpenStax University Physics, Fluids, Density and Pressure",
        href: "https://openstax.org/books/university-physics-volume-1/pages/14-1-fluids-density-and-pressure",
      },
      {
        label: "BIPM SI Brochure",
        href: "https://www.bipm.org/en/publications/si-brochure",
      },
      {
        label: "NIST SI conversion factors",
        href: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors",
      },
    ],
    relatedCalculators: [
      {
        label: "Basınç, Kuvvet ve Alan Hesaplayıcısı",
        href: "/hesaplayicilar/basinc-kuvvet-alan",
      },
    ],
    relatedConversions: [
      { label: "PSI → Bar", href: "/psi-bar" },
      { label: "Kilopascal → Bar", href: "/kilopascal-bar" },
    ],
  },
  en: {
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Calculators" },
      { label: "Hydrostatic Pressure Calculator" },
    ],
    breadcrumbLabel: "Breadcrumb",
    title: "Hydrostatic Pressure Calculator",
    description:
      "Calculate hydrostatic pressure difference, density, depth or gravitational acceleration from SI base units. The tool keeps the same blue-turquoise hero identity as the rest of the engineering calculator pages and works well for tanks, diving and manometer checks.",
    heroEyebrow: "ENGINEERING CALCULATOR",
    heroResultHeading: "Calculation result",
    introHeading: "What is hydrostatic pressure?",
    formulasHeading: "The ΔP = ρgh formula",
    variablesHeading: "Variables and SI units",
    absoluteHeading:
      "Difference between pressure rise and absolute pressure",
    densityHeading: "How temperature affects density",
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
      "Hydrostatic pressure is the pressure increase inside a stationary fluid as depth rises. The pressure difference is found from the product of density, gravitational acceleration and vertical depth difference.",
      "This calculator is suitable for quick engineering checks in tanks, dams, diving, piezometers and manometer readings.",
    ],
    formulas: [
      "ΔP = ρ × g × h",
      "ρ = ΔP / (g × h)",
      "g = ΔP / (ρ × h)",
      "h = ΔP / (ρ × g)",
    ],
    variables: [
      {
        term: "ΔP",
        explanation:
          "Hydrostatic pressure difference, expressed in pascal (Pa) in SI.",
      },
      {
        term: "ρ",
        explanation:
          `Fluid density. The SI base unit used here is kilogram per cubic meter (${KILOGRAM_PER_CUBIC_METRE_UNIT}).`,
      },
      {
        term: "g",
        explanation:
          `Gravitational acceleration. The SI base unit is meter per second squared (${METRE_PER_SECOND_SQUARED_UNIT}).`,
      },
      {
        term: "h",
        explanation:
          "Vertical depth or liquid-column height. The SI base unit is meter (m).",
      },
    ],
    absolutePressure: [
      "The direct output of the formula is the hydrostatic pressure difference between the reference surface and the point of interest.",
      "If you need absolute pressure, add the surface pressure separately: P_absolute = P_surface + ρgh.",
    ],
    densityNotes: [
      "Density changes with temperature, pressure, salinity and fluid composition. For more precise water or seawater calculations, use a density that matches the actual conditions.",
      "For gases over large height changes, the constant-density assumption can become weak and a layered or integral approach may be more appropriate.",
    ],
    examples: [
      {
        title: `1000 ${KILOGRAM_PER_CUBIC_METRE_UNIT} × 9.80665 ${METRE_PER_SECOND_SQUARED_UNIT} × 10 m = 98.0665 kPa`,
        body:
          "Using rounded engineering water, the hydrostatic pressure rise at 10 meters of depth is 98066.5 Pa, or 98.0665 kPa.",
      },
      {
        title: `1 g/cm\u00B3 × 9.80665 ${METRE_PER_SECOND_SQUARED_UNIT} × 100 cm = 9.80665 kPa`,
        body:
          `A density of 1 g/cm\u00B3 equals 1000 ${KILOGRAM_PER_CUBIC_METRE_UNIT}. A depth of 100 cm equals 1 m, so the result is 9806.65 Pa, or 9.80665 kPa.`,
      },
      {
        title: `98.0665 kPa / (1000 ${KILOGRAM_PER_CUBIC_METRE_UNIT} × 9.80665 ${METRE_PER_SECOND_SQUARED_UNIT}) = 10 m`,
        body:
          "For the given pressure difference in water, the vertical liquid height back-calculates to 10 meters.",
      },
    ],
    applications: [
      "Bottom pressure estimates in water tanks and reservoirs",
      "First-pass pressure checks for dams and gate systems",
      "Pressure rise with depth in diving contexts",
      "Manometers and other liquid-column measurement setups",
    ],
    limitations: [
      "The formula is intended for a stationary fluid with approximately constant density.",
      "h is the vertical depth difference, not the length of an inclined path.",
      "If density changes significantly with depth, an integral approach is required.",
      "For gases across large altitude changes, the constant-density assumption may not be suitable.",
      "The base result is a pressure difference; add surface pressure if absolute pressure is required.",
    ],
    sources: [
      {
        label:
          "OpenStax University Physics, Fluids, Density and Pressure",
        href: "https://openstax.org/books/university-physics-volume-1/pages/14-1-fluids-density-and-pressure",
      },
      {
        label: "BIPM SI Brochure",
        href: "https://www.bipm.org/en/publications/si-brochure",
      },
      {
        label: "NIST SI conversion factors",
        href: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors",
      },
    ],
    relatedCalculators: [
      {
        label: "Pressure, Force and Area Calculator",
        href: "/en/calculators/pressure-force-area",
      },
    ],
    relatedConversions: [
      { label: "PSI to Bar", href: "/en/psi-to-bars" },
      {
        label: "Kilopascal to Bar",
        href: "/en/kilopascals-to-bars",
      },
    ],
  },
};

function renderUnitName(
  unit: EngineeringUnitDefinition,
  locale: Locale
) {
  return locale === "tr" ? unit.trName : unit.enName;
}

function renderTypicalUse(
  unit: EngineeringUnitDefinition,
  locale: Locale
) {
  return locale === "tr"
    ? unit.typicalUseTr
    : unit.typicalUseEn;
}

export default function HydrostaticPressurePage({
  locale,
  structuredData,
}: {
  locale: Locale;
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

      <HydrostaticPressureCalculator
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
          <h2>{copy.absoluteHeading}</h2>
          {copy.absolutePressure.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="conversion-section">
          <h2>{copy.densityHeading}</h2>
          {copy.densityNotes.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
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
                            {formatEngineeringValue(
                              unit.factorToSI,
                              locale
                            )}{" "}
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
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                >
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
