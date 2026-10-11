// İsveççe ve Norveççe "liter per mil", Danca "km pr. liter" yakıt tüketimi sayfası.
import type { Metadata } from "next";
import {
  ENERGY_TABLE,
  formatNumber,
  fromKwh100,
  fromL100,
  FUEL_TABLE,
  NORDIC_FUEL_COPY,
  NORDIC_FUEL_PATHS,
  toKwh100,
  toL100,
  type EnergyUnit,
  type FuelUnit,
} from "../../converter/fuel/nordicFuel";
import { NORDIC_DAYS_PATHS } from "../../converter/time/nordicDays";
import type { NordicLocale } from "../../converter/time/nordicWeek";
import { buildLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";
import { NORDIC_TIME_UI } from "../time/nordicTimeCopy";
import TimeToolPage from "../time/TimeToolPage";
import NordicFuelTool from "./NordicFuelTool";

const MIL_PAGE: Record<NordicLocale, { href: string; label: string }> = {
  sv: { href: "/sv/mil-engelsk-mil", label: "Mil till engelsk mil" },
  no: { href: "/no/kategorier/lengde", label: "Omregning av lengde" },
  da: { href: "/da/kategorier/laengde", label: "Omregning af længde" },
};

const DAYS_LABEL: Record<NordicLocale, string> = { sv: "Dagar mellan datum", no: "Dager mellom datoer", da: "Dage mellem datoer" };

export function nordicFuelAlternates() {
  return buildLanguageAlternates(NORDIC_FUEL_PATHS, "sv");
}

export function nordicFuelMetadata(locale: NordicLocale): Metadata {
  const t = NORDIC_FUEL_COPY[locale];
  const path = NORDIC_FUEL_PATHS[locale];
  return {
    title: t.metaTitle,
    description: t.description,
    alternates: { canonical: path, ...nordicFuelAlternates() },
    openGraph: { title: t.metaTitle, description: t.description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: NORDIC_TIME_UI[locale].ogLocale, type: "website" },
  };
}

export default function NordicFuelPage({ locale }: { locale: NordicLocale }) {
  const t = NORDIC_FUEL_COPY[locale];
  const ui = NORDIC_TIME_UI[locale];
  const path = NORDIC_FUEL_PATHS[locale];
  const fuel = FUEL_TABLE[locale];
  const energy = ENERGY_TABLE[locale];
  const num = (n: number, digits = 2) => formatNumber(locale, n, digits);
  // Tablo sütunları: ülkenin kendi birimi + diğer yaygın birimler.
  const fuelColumns: FuelUnit[] = [fuel.unit, ...(["lmil", "l100", "kml", "mpgUs"] as FuelUnit[]).filter((u) => u !== fuel.unit && !(locale === "da" && u === "lmil"))];
  const energyColumns: EnergyUnit[] = [energy.unit, ...(["kwhMil", "kwh100", "whKm"] as EnergyUnit[]).filter((u) => u !== energy.unit && !(locale === "da" && u === "kwhMil"))];

  return (
    <div lang={locale === "no" ? "nb" : locale}>
      <TimeToolPage
        crumbs={[
          { href: ui.homeHref, label: ui.home },
          { href: path, label: t.crumb },
        ]}
        crumbLabel={ui.crumbLabel}
        title={t.h1}
        intro={t.intro}
        tool={<NordicFuelTool locale={locale} />}
        related={{
          title: ui.relatedTitle,
          links: [MIL_PAGE[locale], { href: NORDIC_DAYS_PATHS[locale], label: DAYS_LABEL[locale] }],
        }}
        tocTitle={ui.tocTitle}
        tocItems={[
          { id: "tabell", label: t.tableTitle },
          ...t.sections.map((s) => ({ id: s.id, label: s.title })),
          { id: "elbil-tabell", label: t.evTableTitle },
          { id: "faq", label: ui.faqTitle },
        ]}
        faqTitle={ui.faqTitle}
        faqItems={t.faq}
      >
        <h2 id="tabell">{t.tableTitle}</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                {fuelColumns.map((u) => (
                  <th scope="col" key={u}>
                    {t.unitLabels[u]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fuel.values.map((v) => {
                const l100 = toL100(v, fuel.unit);
                return (
                  <tr key={v}>
                    {fuelColumns.map((u) => (
                      <td key={u}>{num(fromL100(l100, u), u === "lmil" ? 3 : 1)}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {t.sections.map((section) => (
          <section key={section.id}>
            <h2 id={section.id}>{section.title}</h2>
            {section.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}

        <h2 id="elbil-tabell">{t.evTableTitle}</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                {energyColumns.map((u) => (
                  <th scope="col" key={u}>
                    {t.unitLabels[u]}
                  </th>
                ))}
                <th scope="col">km/kWh</th>
              </tr>
            </thead>
            <tbody>
              {energy.values.map((v) => {
                const kwh100 = toKwh100(v, energy.unit);
                return (
                  <tr key={v}>
                    {energyColumns.map((u) => (
                      <td key={u}>{num(fromKwh100(kwh100, u), 2)}</td>
                    ))}
                    <td>{num(100 / kwh100, 2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TimeToolPage>
    </div>
  );
}
