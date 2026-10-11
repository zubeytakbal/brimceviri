// İsveç "röda dagar", Norveç "røde dager" ve Danimarka "helligdage" sayfası.
import type { Metadata } from "next";
import { NORDIC_FUEL_PATHS } from "../../converter/fuel/nordicFuel";
import { todayBerlin } from "../../converter/time/germanDates";
import { easterSunday } from "../../converter/time/germanHolidays";
import { NORDIC_DAYS_PATHS } from "../../converter/time/nordicDays";
import { bridgeDays, NORDIC_HOLIDAY_COPY, NORDIC_HOLIDAY_PATHS, nordicHolidays, weekdayHolidayCount } from "../../converter/time/nordicHolidays";
import { formatNordicDate, formatNordicDayMonth, formatNordicWeekday, NORDIC_WEEK_PATHS, type NordicLocale } from "../../converter/time/nordicWeek";
import { buildLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";
import { NORDIC_TIME_UI } from "../time/nordicTimeCopy";
import TimeToolPage from "../time/TimeToolPage";
import NordicHolidayTool from "./NordicHolidayTool";

const RELATED: Record<NordicLocale, Array<{ key: "days" | "week" | "fuel"; label: string }>> = {
  sv: [
    { key: "days", label: "Dagar mellan datum" },
    { key: "week", label: "Veckonummer" },
    { key: "fuel", label: "Liter per mil" },
  ],
  no: [
    { key: "days", label: "Dager mellom datoer" },
    { key: "week", label: "Ukenummer" },
    { key: "fuel", label: "Liter per mil" },
  ],
  da: [
    { key: "days", label: "Dage mellem datoer" },
    { key: "week", label: "Ugenummer" },
    { key: "fuel", label: "Km pr. liter" },
  ],
};

const RELATED_PATHS = { days: NORDIC_DAYS_PATHS, week: NORDIC_WEEK_PATHS, fuel: NORDIC_FUEL_PATHS };

export function nordicHolidayMetadata(locale: NordicLocale): Metadata {
  const t = NORDIC_HOLIDAY_COPY[locale];
  const year = todayBerlin().year;
  const path = NORDIC_HOLIDAY_PATHS[locale];
  return {
    title: t.metaTitle(year),
    description: t.description(year),
    alternates: { canonical: path, ...buildLanguageAlternates(NORDIC_HOLIDAY_PATHS, "sv") },
    openGraph: { title: t.metaTitle(year), description: t.description(year), url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: NORDIC_TIME_UI[locale].ogLocale, type: "website" },
  };
}

export default function NordicHolidayPage({ locale }: { locale: NordicLocale }) {
  const t = NORDIC_HOLIDAY_COPY[locale];
  const ui = NORDIC_TIME_UI[locale];
  const path = NORDIC_HOLIDAY_PATHS[locale];
  const today = todayBerlin();
  const year = today.year;
  const holidays = nordicHolidays(locale, year).filter((h) => h.kind === "holiday");
  const bridges = bridgeDays(locale, year);
  const nextYear = nordicHolidays(locale, year + 1).filter((h) => h.kind === "holiday");
  const easter = easterSunday(year);

  return (
    <div lang={locale === "no" ? "nb" : locale}>
      <TimeToolPage
        crumbs={[
          { href: ui.homeHref, label: ui.home },
          { href: path, label: t.crumb },
        ]}
        crumbLabel={ui.crumbLabel}
        title={t.h1(year)}
        intro={t.intro}
        tool={<NordicHolidayTool locale={locale} initialToday={today} />}
        related={{ title: ui.relatedTitle, links: RELATED[locale].map((r) => ({ href: RELATED_PATHS[r.key][locale], label: r.label })) }}
        tocTitle={ui.tocTitle}
        tocItems={[
          { id: "tabell", label: t.tableTitle(year) },
          { id: "klamdagar", label: t.bridgeTitle(year) },
          ...t.sections.map((s) => ({ id: s.id, label: s.title })),
          { id: "nasta-ar", label: t.tableTitle(year + 1) },
          { id: "faq", label: ui.faqTitle },
        ]}
        faqTitle={ui.faqTitle}
        faqItems={t.faq(year, formatNordicDate(locale, easter), `${holidays[0].name} (${formatNordicDate(locale, holidays[0].date)})`)}
      >
        <p>{t.summary(year, holidays.length, weekdayHolidayCount(locale, year))}</p>

        <h2 id="klamdagar">{t.bridgeTitle(year)}</h2>
        <p>{t.bridgeIntro}</p>
        {bridges.length ? (
          <ul>
            {bridges.map((b) => (
              <li key={`${b.month}-${b.day}`}>
                {formatNordicWeekday(locale, b)} {formatNordicDate(locale, b)}
              </li>
            ))}
          </ul>
        ) : (
          <p>{t.noBridge}</p>
        )}

        {t.sections.map((section) => (
          <section key={section.id}>
            <h2 id={section.id}>{section.title}</h2>
            {section.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}

        <h2 id="nasta-ar">{t.tableTitle(year + 1)}</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">{t.colDate}</th>
                <th scope="col">{t.colDay}</th>
                <th scope="col">{t.colName}</th>
              </tr>
            </thead>
            <tbody>
              {nextYear.map((h) => (
                <tr key={h.id}>
                  <td>{formatNordicDayMonth(locale, h.date)}</td>
                  <td>{formatNordicWeekday(locale, h.date)}</td>
                  <td>{h.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TimeToolPage>
    </div>
  );
}
