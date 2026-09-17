import Link from "next/link";
import type { ReactNode } from "react";
import {
  powerUnitDefinitions,
  voltageUnitDefinitions,
} from "../../converter/engineeringCalculatorUnits";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import { voltageUnitNamesUz } from "../../converter/electricalUnitNamesUz";
import { powerUnitNamesUz } from "../../converter/heatConductionUnitNamesUz";
import { formatUzValue } from "../../converter/pressureForceAreaUz";
import KwToAmpCalculatorUz from "./KwToAmpCalculatorUz";

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
      id: "power-units",
      heading: "Quvvat birliklari",
      siSymbol: "W",
      units: powerUnitDefinitions,
      names: powerUnitNamesUz,
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
    { label: "kVt dan Amperga Aylantirgich" },
  ],
  breadcrumbLabel: "Sahifa yo'li",
  title: "kVt dan Amperga Aylantirgich",
  description:
    "Quvvatni bir fazali, uch fazali va DC tizimlar uchun tokka aylantiring. Natija kuchlanish, quvvat koeffitsienti va samaradorlikka asoslangan o'qish uchun qulay tok birligida ko'rsatiladi.",
  heroEyebrow: "ELEKTR HISOBLAGICHI",
  heroResultHeading: "Hat toki natijasi",
  introHeading: "Bu kVt dan Amperga vositasi nima uchun ishlatiladi?",
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
    "Bu vosita bir fazali, uch fazali va DC tizimlar uchun aktiv quvvatdan hat tokini baholaydi.",
    "Avtomat tanlash, dastlabki kabel o'lchamlashi, panel yuk jadvallari va joy tekshiruvlarida dastlabki nazorat uchun foydali.",
  ],
  formulas: [
    "Bir fazali: I = P / (V x cos φ x η)",
    "Uch fazali: I = P / (√3 x V x cos φ x η)",
    "DC: I = P / (V x η)",
  ],
  variables: [
    { term: "P", explanation: "Aktiv yuk quvvati yoki uskuna bilan bog'liq quvvat qiymati." },
    { term: "V", explanation: "Hat kuchlanishi yoki tizim kuchlanish darajasi." },
    { term: "cos φ", explanation: "AC tizimlarda aktiv quvvatni to'liq quvvatga bog'lash uchun ishlatiladigan quvvat koeffitsienti." },
    { term: "η", explanation: "Samaradorlik koeffitsienti; chiqish quvvatini kerakli kirish tokiga aylantirishda hisobga oling." },
    { term: "I", explanation: "Hisoblangan hat toki." },
  ],
  examples: [
    {
      title: "5,5 kVt, 400 V, uch fazali, 0,9 quvvat koeffitsienti va 92 samaradorlik",
      body: "I = 5500 / (1,732 x 400 x 0,9 x 0,92) taxminan 9,59 A beradi.",
    },
    {
      title: "2 kVt, 230 V bir fazali, 0,95 quvvat koeffitsienti va 100 samaradorlik",
      body: "I = 2000 / (230 x 0,95) taxminan 9,15 A beradi.",
    },
  ],
  applications: [
    "Avtomat va sug'urtalarni dastlabki tanlash",
    "Dastlabki kabel o'lchamlashi tekshiruvlari",
    "Yuk jadvalini tasdiqlash",
    "Generator, UPS va kommutatsiya paneli rejalashtirish",
  ],
  limitations: [
    "Bu vosita taxminiy hat tokini beradi va garmonikalar, ishga tushish tokini, atrof-muhit haroratiga bog'liq pasaytirishni yoki kabel tuzatish koeffitsientlarini o'z ichiga olmaydi.",
    "Uch fazali rejimda kiritilgan kuchlanish hat-hatga kuchlanish sifatida talqin qilinadi.",
    "Agar kiritilgan quvvat allaqachon elektr kirish quvvatini ifodalasa, samaradorlikni 1 yoki 100 ga o'rnating.",
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
      label: "Amperdan kVt ga Aylantirgich",
      href: "/uz/amperdan-kvt-ga-aylantirgich",
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

export default function KwToAmpPageUz({
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

      <KwToAmpCalculatorUz
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
