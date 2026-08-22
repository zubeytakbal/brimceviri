import Link from "next/link";
import type { ReactNode } from "react";
import {
  currentUnitDefinitions,
  resistanceUnitDefinitions,
  voltageUnitDefinitions,
} from "../../converter/engineeringCalculatorUnits";
import { formatEngineeringValue } from "../../converter/pressureForceArea";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import OhmsLawCalculator from "./OhmsLawCalculator";

type UnitTableSection = {
  id: string;
  heading: string;
  siSymbol: string;
  units: ReadonlyArray<EngineeringUnitDefinition>;
};

function getUnitSections(): UnitTableSection[] {
  return [
    {
      id: "voltage-units",
      heading: "Gerilim birimleri",
      siSymbol: "V",
      units: voltageUnitDefinitions,
    },
    {
      id: "current-units",
      heading: "Akım birimleri",
      siSymbol: "A",
      units: currentUnitDefinitions,
    },
    {
      id: "resistance-units",
      heading: "Direnç birimleri",
      siSymbol: "Ω",
      units: resistanceUnitDefinitions,
    },
  ];
}

const copy = {
  breadcrumbs: [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hesaplayıcılar" },
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
  ],
  relatedConversions: [
    { label: "Kiloohm → Ohm", href: "/kiloohm-ohm" },
    { label: "Ohm → Kiloohm", href: "/ohm-kiloohm" },
  ],
};

function renderUnitName(unit: EngineeringUnitDefinition) {
  return unit.trName;
}

function renderTypicalUse(unit: EngineeringUnitDefinition) {
  return unit.typicalUseTr;
}

export default function OhmsLawPage({
  structuredData,
}: {
  structuredData?: ReactNode;
}) {
  const unitSections = getUnitSections();

  return (
    <main className="calculator-page">
      {structuredData}

      <div className="conversion-breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label={copy.breadcrumbLabel}>
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

      <OhmsLawCalculator
        locale="tr"
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
                          <td>{renderUnitName(unit)}</td>
                          <td>{unit.symbol}</td>
                          <td>
                            {formatEngineeringValue(unit.factorToSI, "tr")}{" "}
                            {section.siSymbol}
                          </td>
                          <td>{renderTypicalUse(unit)}</td>
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
