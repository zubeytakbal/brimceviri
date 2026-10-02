// İsveççe, Norveççe ve Danca "iki tarih arası gün" sayfası (Almanca Tagerechner karşılığı).
import type { Metadata } from "next";
import { todayBerlin, ymdInput } from "../../converter/time/germanDates";
import { daysAhead, NORDIC_DAYS_COPY, NORDIC_DAYS_PATHS, upcomingTargets } from "../../converter/time/nordicDays";
import { formatNordicDate, formatNordicLong, NORDIC_WEEK_PATHS, type NordicLocale } from "../../converter/time/nordicWeek";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";
import { NORDIC_TIME_LABELS, NORDIC_TIME_PATHS, NORDIC_TIME_UI } from "../time/nordicTimeCopy";
import TimeToolPage from "../time/TimeToolPage";
import NordicDaysTool from "./NordicDaysTool";

const WEEK_LABEL: Record<NordicLocale, string> = { sv: "Veckonummer", no: "Ukenummer", da: "Ugenummer" };

export function nordicDaysMetadata(locale: NordicLocale): Metadata {
  const t = NORDIC_DAYS_COPY[locale];
  const path = NORDIC_DAYS_PATHS[locale];
  return {
    title: t.metaTitle,
    description: t.description,
    alternates: { canonical: path, ...timeToolAlternates("dateDiff") },
    openGraph: { title: t.metaTitle, description: t.description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: NORDIC_TIME_UI[locale].ogLocale, type: "website" },
  };
}

export default function NordicDaysPage({ locale }: { locale: NordicLocale }) {
  const t = NORDIC_DAYS_COPY[locale];
  const ui = NORDIC_TIME_UI[locale];
  const path = NORDIC_DAYS_PATHS[locale];
  const today = todayBerlin();
  const targets = upcomingTargets(locale, today);
  const ahead = daysAhead(today);
  const christmas = targets.find((x) => x.date.month === 12 && x.date.day === 24)!;
  const in90 = ahead.find((a) => a.n === 90)!;

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
        tool={<NordicDaysTool locale={locale} today={ymdInput(today)} />}
        related={{
          title: ui.relatedTitle,
          links: [
            { href: NORDIC_WEEK_PATHS[locale], label: WEEK_LABEL[locale] },
            { href: NORDIC_TIME_PATHS.timer[locale], label: NORDIC_TIME_LABELS.timer[locale] },
            { href: NORDIC_TIME_PATHS.clock[locale], label: NORDIC_TIME_LABELS.clock[locale] },
          ],
        }}
        tocTitle={ui.tocTitle}
        tocItems={[
          { id: "kvar", label: t.countdownTitle },
          { id: "om-dagar", label: t.aheadTitle(formatNordicDate(locale, today)) },
          { id: "faq", label: ui.faqTitle },
        ]}
        faqTitle={ui.faqTitle}
        faqItems={t.faq({
          christmasName: christmas.name,
          christmasDate: formatNordicDate(locale, christmas.date),
          christmasDays: christmas.days,
          today: formatNordicDate(locale, today),
          in90: formatNordicLong(locale, in90.date),
        })}
      >
        <h2 id="kvar">{t.countdownTitle}</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">{t.occasion}</th>
                <th scope="col">{t.date}</th>
                <th scope="col">{t.daysFromToday}</th>
              </tr>
            </thead>
            <tbody>
              {targets.map((x) => (
                <tr key={x.name}>
                  <td>{x.name}</td>
                  <td>{formatNordicLong(locale, x.date)}</td>
                  <td>{x.days === 0 ? t.today : x.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="om-dagar">{t.aheadTitle(formatNordicDate(locale, today))}</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <tbody>
              {ahead.map((a) => (
                <tr key={a.n}>
                  <td>{t.inDays(a.n)}</td>
                  <td>{formatNordicLong(locale, a.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TimeToolPage>
    </div>
  );
}
