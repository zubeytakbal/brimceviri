import Link from "next/link";
import type { ReactNode } from "react";
import {
  diameterUnitDefinitions,
  reynoldsDensityUnitDefinitions,
  speedUnitDefinitions,
  viscosityUnitDefinitions,
} from "../../converter/engineeringCalculatorUnits";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import {
  diameterUnitNamesUz,
  reynoldsDensityUnitNamesUz,
  speedUnitNamesUz,
  viscosityUnitNamesUz,
} from "../../converter/reynoldsNumberUnitNamesUz";
import { fluidPresetsUz } from "../../converter/reynoldsNumberUz";
import { formatUzValue } from "../../converter/pressureForceAreaUz";
import ReynoldsNumberCalculatorUz from "./ReynoldsNumberCalculatorUz";

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
      id: "density-units",
      heading: "Zichlik birliklari",
      siSymbol: "kg/m³",
      units: reynoldsDensityUnitDefinitions,
      names: reynoldsDensityUnitNamesUz,
    },
    {
      id: "speed-units",
      heading: "Tezlik birliklari",
      siSymbol: "m/s",
      units: speedUnitDefinitions,
      names: speedUnitNamesUz,
    },
    {
      id: "diameter-units",
      heading: "Diametr birliklari",
      siSymbol: "m",
      units: diameterUnitDefinitions,
      names: diameterUnitNamesUz,
    },
    {
      id: "viscosity-units",
      heading: "Yopishqoqlik birliklari",
      siSymbol: "Pa·s",
      units: viscosityUnitDefinitions,
      names: viscosityUnitNamesUz,
    },
  ];
}

const strings = {
  breadcrumbs: [
    { label: "Bosh sahifa", href: "/uz" },
    { label: "Reynolds Soni Hisoblagichi" },
  ],
  breadcrumbLabel: "Sahifa yo'li",
  title: "Reynolds Soni Hisoblagichi",
  description:
    "Re = ρ × v × D / μ yordamida Reynolds sonini, tezlikni yoki xarakterli diametrni hisoblang. Natija SI ekvivalenti va quvur ichidagi oqim rejimining taxminiy talqini bilan birga ko'rsatiladi.",
  heroEyebrow: "MUHANDISLIK HISOBLAGICHI",
  heroResultHeading: "Hisoblash natijasi",
  introHeading: "Reynolds soni nega muhim?",
  formulasHeading: "Ishlatilgan formulalar",
  variablesHeading: "O'zgaruvchilar va SI birliklari",
  interpretationHeading: "Oqim rejimi talqini",
  fluidTableHeading: "Suyuqlik Zichligi va Yopishqoqligi Jadvali",
  fluidTableColumns: {
    fluid: "Suyuqlik",
    density: "Zichlik (kg/m³)",
    viscosity: "Dinamik Yopishqoqlik (mPa·s)",
  },
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
    "Reynolds soni oqimdagi inersiya ta'sirlarini yopishqoqlik ta'sirlari bilan solishtiradigan o'lchamsiz nisbatdir.",
    "Quvur ichidagi oqim taxminan laminar, o'tish holatida yoki turbulent ekanligini dastlabki baholash uchun keng qo'llaniladi.",
  ],
  formulas: ["Re = ρ × v × D / μ", "v = Re × μ / (ρ × D)", "D = Re × μ / (ρ × v)"],
  variables: [
    { term: "Re", explanation: "O'lchamsiz Reynolds soni. SI birligi yo'q." },
    { term: "ρ", explanation: "Suyuqlik zichligi. SI birligi: kg/m³." },
    { term: "v", explanation: "O'rtacha oqim tezligi. SI birligi: m/s." },
    { term: "D", explanation: "Xarakterli quvur yoki kanal diametri. SI birligi: m." },
    { term: "μ", explanation: "Dinamik yopishqoqlik. SI birligi: Pa·s." },
  ],
  interpretationNotes: [
    "Re < 2300 odatda taxminan laminar deb hisoblanadi.",
    "2300 va 4000 orasidagi Re odatda o'tish holati deb hisoblanadi.",
    "Re > 4000 odatda taxminan turbulent deb hisoblanadi.",
    "Bu chegaralar quvur ichidagi oqim uchun faqat taxminiy qo'llanma; geometriya va kirish sharoitlari samarali rejim chegaralarini o'zgartirishi mumkin.",
    "Suv va havo andozalari taxminiy xona sharoiti xususiyatlarini beradi; haqiqiy ish ma'lumotlari natijani o'zgartirishi mumkin.",
  ],
  examples: [
    {
      title: "Suv uchun Re hisoblash",
      body: "ρ = 1000 kg/m³, v = 2 m/s, D = 50 mm va μ = 1 mPa·s uchun Reynolds soni 100000 bo'lib, bu turbulent diapazonga to'g'ri keladi.",
    },
    {
      title: "Maqsadli Re uchun kerakli tezlik",
      body: "Re = 2000, ρ = 1000 kg/m³, D = 20 mm va μ = 1 mPa·s uchun tezlik taxminan 0,1 m/s bo'ladi.",
    },
  ],
  applications: [
    "Quvur ichidagi oqim uchun dastlabki rejim tekshiruvlari",
    "Laboratoriya qurilmalarida xarakterli tezliklarni baholash",
    "Kanal va quvur diametrini dastlabki tanlash",
    "Suyuqlik xossalarining oqim rejimiga ta'sirini solishtirish",
  ],
  limitations: [
    "Hisoblash asosiy Reynolds soni ta'rifidan foydalanadi va kirish ta'sirlari, g'adir-budurlik yoki maxsus geometriyalarni alohida modellamaydi.",
    "Oqim rejimi talqini quvur ichidagi taxminiy chegaralardan foydalanadi; ochiq kanallar, qanot profillari va murakkab kanallar boshqa mezonlarni talab qilishi mumkin.",
    "Dinamik yopishqoqlik va zichlik haroratga qarab sezilarli o'zgarishi mumkin, shuning uchun imkon qadar haqiqiy xossalar ma'lumotidan foydalaning.",
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
      label: "Issiqlik O'tkazuvchanligi Hisoblagichi",
      href: "/uz/issiqlik-otkazuvchanligi-hisoblash",
    },
    {
      label: "Gidrostatik Bosim Hisoblagichi",
      href: "/uz/gidrostatik-bosim-hisoblash",
    },
    {
      label: "Muhandislik Hisoblagichlari markazi",
      href: "/muhendislik-hesaplayicilari",
    },
  ],
};

export default function ReynoldsNumberPageUz({
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

      <ReynoldsNumberCalculatorUz
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
          <h2>{strings.interpretationHeading}</h2>
          <div className="engineering-note-box">
            <ul className="calculator-bullet-list">
              {strings.interpretationNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="conversion-section">
          <h2>{strings.fluidTableHeading}</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th scope="col">{strings.fluidTableColumns.fluid}</th>
                  <th scope="col">{strings.fluidTableColumns.density}</th>
                  <th scope="col">{strings.fluidTableColumns.viscosity}</th>
                </tr>
              </thead>
              <tbody>
                {fluidPresetsUz
                  .filter((preset) => preset.id !== "custom")
                  .map((preset) => (
                    <tr key={preset.id}>
                      <td>{preset.label}</td>
                      <td>{preset.densityValue}</td>
                      <td>{preset.viscosityValue}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
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
