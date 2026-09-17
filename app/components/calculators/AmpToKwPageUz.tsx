import Link from "next/link";
import type { ReactNode } from "react";
import {
  currentUnitDefinitions,
  voltageUnitDefinitions,
} from "../../converter/engineeringCalculatorUnits";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import { currentUnitNamesUz, voltageUnitNamesUz } from "../../converter/electricalUnitNamesUz";
import { formatUzValue } from "../../converter/pressureForceAreaUz";
import AmpToKwCalculatorUz from "./AmpToKwCalculatorUz";

type UnitTableSection = {
  id: string;
  heading: string;
  siSymbol: string;
  units: ReadonlyArray<EngineeringUnitDefinition>;
  names: Record<string, { name: string; use: string }>;
};

function getUnitTableSections(): UnitTableSection[] {
  return [
    {
      id: "current-units",
      heading: "Tok birliklari",
      siSymbol: "A",
      units: currentUnitDefinitions,
      names: currentUnitNamesUz,
    },
    {
      id: "voltage-units",
      heading: "Kuchlanish birliklari",
      siSymbol: "V",
      units: voltageUnitDefinitions,
      names: voltageUnitNamesUz,
    },
  ];
}

const strings = {
  breadcrumbs: [
    { label: "Bosh sahifa", href: "/uz" },
    { label: "Amperdan kVt ga Aylantirgich" },
  ],
  breadcrumbLabel: "Sahifa yo'li",
  title: "Amperdan kVt ga Aylantirgich",
  description:
    "Hat tokini bir fazali, uch fazali va DC tizimlar uchun taxminiy quvvatga aylantiring. Natija kuchlanish, quvvat koeffitsienti va samaradorlikka asoslangan o'qish uchun qulay quvvat birligida ko'rsatiladi.",
  heroEyebrow: "ELEKTR HISOBLAGICHI",
  heroResultHeading: "Quvvat natijasi",
  introHeading: "Bu Amperdan kVt ga vositasi nima uchun ishlatiladi?",
  formulasHeading: "Ishlatilgan formulalar",
  variablesHeading: "O'zgaruvchilar va ma'nolari",
  unitsHeading: "Birlik ma'lumotnoma jadvallari",
  examplesHeading: "Yechilgan misollar",
  applicationsHeading: "Odatiy qo'llanish sohalari",
  limitationsHeading: "Taxminlar va cheklovlar",
  sourcesHeading: "Manbalar",
  relatedHeading: "Tegishli havolalar",
  relatedCalculatorsHeading: "Tegishli hisoblagichlar",
  tableColumns: {
    unitName: "Birlik nomi",
    symbol: "Belgi",
    siEquivalent: "SI ekvivalenti",
    typicalUse: "Odatiy qo'llanish",
  },
  intro: [
    "Bu vosita bir fazali, uch fazali va DC tizimlar uchun o'lchangan yoki dalada o'qilgan hat tokidan quvvatni baholaydi.",
    "Mavjud fider quvvatini baholash, yuk balansini tekshirish va dastlabki generator yoki UPS o'lchamlashda foydali.",
  ],
  formulas: [
    "Bir fazali: P = V x I x cos φ x η",
    "Uch fazali: P = √3 x V x I x cos φ x η",
    "DC: P = V x I x η",
  ],
  variables: [
    { term: "I", explanation: "O'lchangan yoki kiritilgan hat toki." },
    { term: "V", explanation: "Hat kuchlanishi yoki tizim kuchlanish darajasi." },
    { term: "cos φ", explanation: "AC tizimlarda aktiv quvvatni to'liq quvvatga bog'lash uchun ishlatiladigan quvvat koeffitsienti." },
    { term: "η", explanation: "Samaradorlik koeffitsienti; tokni chiqish quvvatiga aylantirishda hisobga oling." },
    { term: "P", explanation: "Hisoblangan taxminiy quvvat." },
  ],
  examples: [
    {
      title: "9,59 A, 400 V, uch fazali, 0,9 quvvat koeffitsienti va 92 samaradorlik",
      body: "P = 1,732 x 400 x 9,59 x 0,9 x 0,92 taxminan 5,5 kVt beradi. Bu mos kVt dan Amperga misolining teskarisidir.",
    },
    {
      title: "9,15 A, 230 V bir fazali, 0,95 quvvat koeffitsienti va 100 samaradorlik",
      body: "P = 230 x 9,15 x 0,95 taxminan 2 kVt beradi.",
    },
  ],
  applications: [
    "Dalada mavjud fiderning quvvatini baholash",
    "Yuk balansi va panel tekshiruvlari",
    "Generator yoki UPS rejalashtirish",
    "O'lchagich yoki qisqich-ampermetr o'qishlaridan tezkor quvvat tekshiruvlari",
  ],
  limitations: [
    "Bu vosita taxminiy quvvatni beradi va garmonikalar, ishga tushish tokini, atrof-muhit harorati ta'sirlarini yoki o'lchov toleranslarini o'z ichiga olmaydi.",
    "Uch fazali rejimda kiritilgan kuchlanish hat-hatga kuchlanish sifatida talqin qilinadi.",
    "Agar kiritilgan tok allaqachon elektr kirish tokini ifodalasa, samaradorlikni 1 yoki 100 ga o'rnating.",
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
      label: "kVt dan Amperga Aylantirgich",
      href: "/uz/kvt-dan-amperga-aylantirgich",
    },
    {
      label: "Om Qonuni Hisoblagichi",
      href: "/uz/om-qonuni-hisoblash",
    },
    {
      label: "Muhandislik Hisoblagichlari markazi",
      href: "/muhendislik-hesaplayicilari",
    },
  ],
};

export default function AmpToKwPageUz({
  structuredData,
}: {
  structuredData?: ReactNode;
}) {
  const unitTableSections = getUnitTableSections();

  return (
    <main className="calculator-page" lang="uz">
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

      <AmpToKwCalculatorUz
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
            {unitTableSections.map((section) => (
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
                          <td>{section.names[unit.enName]?.name ?? unit.enName}</td>
                          <td>{unit.symbol}</td>
                          <td>
                            {formatUzValue(unit.factorToSI)} {section.siSymbol}
                          </td>
                          <td>{section.names[unit.enName]?.use ?? unit.typicalUseEn}</td>
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
            {strings.relatedCalculators.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
