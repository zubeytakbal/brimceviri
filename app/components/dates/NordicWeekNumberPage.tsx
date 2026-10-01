// İsveççe, Norveççe ve Danca hafta numarası sayfası (Almanca KW sayfasının
// İskandinav karşılığı). Metinler converter/time/nordicWeek.ts içinde.
import type { Metadata } from "next";
import { addDaysYmd, isoWeeksInYear } from "../../converter/time/dateMath";
import { kalenderwoche, todayBerlin, ymdInput } from "../../converter/time/germanDates";
import {
  formatNordicDate,
  formatNordicLong,
  NORDIC_WEEK_COPY,
  NORDIC_WEEK_PATHS,
  nordicWeekRange,
  type NordicLocale,
} from "../../converter/time/nordicWeek";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";
import TimeToolPage from "../time/TimeToolPage";
import NordicWeekTool from "./NordicWeekTool";

export function nordicWeekMetadata(locale: NordicLocale): Metadata {
  const t = NORDIC_WEEK_COPY[locale];
  const path = NORDIC_WEEK_PATHS[locale];
  const today = todayBerlin();
  const w = kalenderwoche(today);
  const title = t.metaTitle(w.week, w.year, nordicWeekRange(locale, w.monday, w.sunday));
  const description = t.metaDescription(formatNordicLong(locale, today), w.week, w.year);
  return {
    title: seoTitle(title, t.shortTitle(w.week, w.year)),
    description,
    alternates: { canonical: path, ...timeToolAlternates("weekNumber") },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: t.ogLocale, type: "website" },
  };
}

export default function NordicWeekNumberPage({ locale }: { locale: NordicLocale }) {
  const t = NORDIC_WEEK_COPY[locale];
  const path = NORDIC_WEEK_PATHS[locale];
  const today = todayBerlin();
  const w = kalenderwoche(today);
  const year = w.year;
  const weeks = isoWeeksInYear(year);
  const firstMonday = kalenderwoche({ year, month: 1, day: 4 }).monday;
  const rows = Array.from({ length: weeks }, (_, i) => {
    const monday = addDaysYmd(firstMonday, i * 7);
    return { week: i + 1, monday, sunday: addDaysYmd(monday, 6) };
  });
  const nextYear = year + 1;

  const faqItems = t.faq({
    todayLong: formatNordicLong(locale, today),
    week: w.week,
    monday: formatNordicDate(locale, w.monday),
    sunday: formatNordicDate(locale, w.sunday),
    year,
    weeks,
    nextYear,
    nextWeek1: formatNordicDate(locale, kalenderwoche({ year: nextYear, month: 1, day: 4 }).monday),
    weeksNext: isoWeeksInYear(nextYear),
  });

  return (
    <div lang={locale === "no" ? "nb" : locale}>
      <TimeToolPage
        crumbs={[
          { href: t.homeHref, label: t.home },
          { href: path, label: t.toolName },
        ]}
        crumbLabel={t.crumbLabel}
        title={t.h1(w.week)}
        intro={t.intro(formatNordicLong(locale, today), w.week, nordicWeekRange(locale, w.monday, w.sunday))}
        tool={<NordicWeekTool locale={locale} today={ymdInput(today)} />}
        related={{ title: t.relatedTitle, links: t.related }}
        tocTitle={t.tocTitle}
        tocItems={[
          { id: "lista", label: t.tableTitle(year) },
          { id: "regler", label: t.rulesTitle },
          { id: "faq", label: t.faqTitle },
        ]}
        faqTitle={t.faqTitle}
        faqItems={faqItems}
      >
        <h2 id="lista">{t.tableTitle(year)}</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">{t.week}</th>
                <th scope="col">{t.monday}</th>
                <th scope="col">{t.sunday}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.week} className={r.week === w.week ? "is-current" : undefined}>
                  <td>
                    {r.week === w.week ? (
                      <strong>
                        {t.week} {r.week} ({t.current})
                      </strong>
                    ) : (
                      `${t.week} ${r.week}`
                    )}
                  </td>
                  <td>{formatNordicDate(locale, r.monday)}</td>
                  <td>{formatNordicDate(locale, r.sunday)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="regler">{t.rulesTitle}</h2>
        {t.rules.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </TimeToolPage>
    </div>
  );
}
