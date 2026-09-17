import Link from "next/link";
import type { ReactNode } from "react";
import {
  currentUnitDefinitions,
  resistanceUnitDefinitions,
  voltageUnitDefinitions,
} from "../../converter/engineeringCalculatorUnits";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import { formatUzValue } from "../../converter/ohmsLawUz";
import OhmsLawCalculatorUz from "./OhmsLawCalculatorUz";

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
      heading: "Kuchlanish birliklari",
      siSymbol: "V",
      units: voltageUnitDefinitions,
    },
    {
      id: "current-units",
      heading: "Tok birliklari",
      siSymbol: "A",
      units: currentUnitDefinitions,
    },
    {
      id: "resistance-units",
      heading: "Qarshilik birliklari",
      siSymbol: "Ω",
      units: resistanceUnitDefinitions,
    },
  ];
}

const uzUnitNames: Record<string, string> = {
  mV: "Milivolt",
  V: "Volt",
  kV: "Kilovolt",
  mA: "Miliamper",
  A: "Amper",
  kA: "Kiloamper",
  "Ω": "Om",
  "kΩ": "Kilo-om",
  "MΩ": "Mega-om",
};

const uzTypicalUse: Record<string, string> = {
  mV: "Sensor va past darajali signallar",
  V: "Asosiy SI kuchlanish birligi",
  kV: "Yuqori kuchlanishli uzatish liniyalari",
  mA: "Elektron sxema toklari",
  A: "Asosiy SI tok birligi",
  kA: "Sanoat energetika tizimlari",
  "Ω": "Asosiy SI qarshilik birligi",
  "kΩ": "Elektron sxema qarshiliklari",
  "MΩ": "Izolyatsiya qarshiligi o'lchovlari",
};

const strings = {
  breadcrumbs: [
    { label: "Bosh sahifa", href: "/uz" },
    { label: "Om Qonuni Hisoblagichi" },
  ],
  breadcrumbLabel: "Sahifa yo'li",
  title: "Om Qonuni Hisoblagichi",
  description:
    "V = I × R bog'lanishi orqali kuchlanishni, tokni yoki qarshilikni hisoblang. Natija o'qish uchun qulay birlikda, SI ekvivalenti va o'rniga qo'yilgan formula bilan birga ko'rsatiladi.",
  heroEyebrow: "MUHANDISLIK HISOBLAGICHI",
  heroResultHeading: "Hisoblash natijasi",
  introHeading: "Bu Om qonuni vositasi nima uchun ishlatiladi?",
  formulasHeading: "Ishlatilgan formulalar",
  variablesHeading: "O'zgaruvchilar va ma'nolari",
  unitsHeading: "Birlik jadvallari",
  examplesHeading: "Yechilgan misollar",
  applicationsHeading: "Odatiy qo'llanish sohalari",
  limitationsHeading: "Taxminlar va cheklovlar",
  sourcesHeading: "Manbalar",
  relatedHeading: "Tegishli havolalar",
  relatedCalculatorsHeading: "Tegishli hisoblagichlar",
  relatedConversionsHeading: "Tegishli aylantirishlar",
  tableColumns: {
    unitName: "Birlik nomi",
    symbol: "Belgi",
    siEquivalent: "SI ekvivalenti",
    typicalUse: "Odatiy qo'llanish",
  },
  intro: [
    "Bu vosita elektr zanjiridagi kuchlanish, tok va qarshilik o'rtasidagi asosiy bog'lanishdan (Om qonuni) foydalanib, ma'lum ikkita qiymatdan uchinchisini hisoblaydi.",
    "Zanjir loyihalash, qarshilik tanlash, sug'urta/kabel o'lchamlarini belgilash va elektronika havaskorlik loyihalarida tezkor tekshiruv vositasi sifatida ishlatilishi mumkin.",
  ],
  formulas: ["V = I × R", "I = V / R", "R = V / I"],
  variables: [
    { term: "V", explanation: "Zanjir bo'ylab kuchlanish (voltaj) farqidir." },
    { term: "I", explanation: "Zanjirdan o'tuvchi elektr tokidir." },
    {
      term: "R",
      explanation: "Zanjir yoki elementning tokka ko'rsatgan qarshiligidir.",
    },
  ],
  examples: [
    {
      title: "10 Ω qarshilikdan 2 A tok o'tsa, kuchlanish qancha bo'ladi?",
      body: "V = I × R = 2 A × 10 Ω = 20 V.",
    },
    {
      title: "12 V manba 4 Ω qarshilikka ulansa, tok qancha bo'ladi?",
      body: "I = V / R = 12 V / 4 Ω = 3 A.",
    },
  ],
  applications: [
    "Qarshilik yorlig'ini tekshirish va sxema platasi loyihalash",
    "LED/sensor zanjirlarida tokni cheklovchi qarshilikni hisoblash",
    "Kabel va sug'urta o'lchamlarini dastlabki tekshirish",
    "Elektronika ta'limi va havaskorlik loyihalari",
  ],
  limitations: [
    "Formula qarshiligi doimiy qoladigan (chiziqli, omik) elementlar uchun amal qiladi; diod, tranzistor kabi chiziqli bo'lmagan elementlarga to'g'ridan-to'g'ri qo'llanilmaydi.",
    "Haroratga bog'liq qarshilik o'zgarishi bu asosiy hisobga kiritilmagan.",
    "Teskari hisoblashlarda (tok yoki qarshilik yechimi) tegishli bo'luvchi qiymat nolga teng bo'lishi mumkin emas.",
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
      label: "Muhandislik Hisoblagichlari markazi",
      href: "/muhendislik-hesaplayicilari",
    },
  ],
  relatedConversions: [
    { label: "Kiloom → Om", href: "/kiloohm-ohm" },
    { label: "Om → Kiloom", href: "/ohm-kiloohm" },
  ],
};

export default function OhmsLawPageUz({
  structuredData,
}: {
  structuredData?: ReactNode;
}) {
  const unitSections = getUnitSections();

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

      <OhmsLawCalculatorUz
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
                          <td>{uzUnitNames[unit.symbol] ?? unit.enName}</td>
                          <td>{unit.symbol}</td>
                          <td>
                            {formatUzValue(unit.factorToSI)} {section.siSymbol}
                          </td>
                          <td>{uzTypicalUse[unit.symbol] ?? unit.typicalUseEn}</td>
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
