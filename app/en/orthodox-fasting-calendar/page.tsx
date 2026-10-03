import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { OrthodoxFastingCalendar } from "../../components/christian/OrthodoxFasting";
import { PERIOD_LABEL } from "../../i18n/orthodoxFastingLabels";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { formatLongDate, formatShortDate } from "../../converter/christian/christianCalc";
import { apostlesFastDays, fastDaysInYear, fastingPeriods } from "../../converter/christian/orthodoxFasting";
import { CHRISTIAN_TOOLS_PATH, christianRelated } from "../../i18n/englishChristianTools";
import { buildSiteUrl } from "../../siteConfig";

const path = "/en/orthodox-fasting-calendar";
const year = new Date().getFullYear();
const title = `Orthodox Fasting Calendar ${year}–${year + 1}: Is Today a Fast Day?`;
const description =
  "Is today a fast day? Orthodox fasting calendar for the old (Julian) and new calendar: Great Lent, Apostles' Fast length, Dormition and Nativity Fasts, fast-free weeks.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const get = (y: number, cal: "old" | "new", id: string) => fastingPeriods(y, cal)!.find((p) => p.id === id);
const years = Array.from({ length: 8 }, (_, i) => year - 1 + i);
const zeroYears = Array.from({ length: 30 }, (_, i) => year + i).filter((y) => apostlesFastDays(y, "new") === 0);
const lent = get(year + 1, "old", "great-lent")!;

const faqItems: FaqItem[] = [
  {
    question: `When is the Apostles' Fast (Peter and Paul Fast) in ${year + 1}?`,
    answer: (() => {
      const o = get(year + 1, "old", "apostles");
      const n = get(year + 1, "new", "apostles");
      return `On the old calendar it runs from ${o ? `${formatLongDate(o.start)} to ${formatLongDate(o.end)} (${o.days} days)` : "—"}. On the new calendar ${n ? `it runs from ${formatLongDate(n.start)} to ${formatLongDate(n.end)} (${n.days} days)` : "there is no Apostles' Fast this year"}.`;
    })(),
  },
  {
    question: "Why does the length of the Apostles' Fast change every year?",
    answer: `It starts on the Monday after All Saints' Sunday, eight weeks after Pascha, but always ends on the eve of the feast of Sts Peter and Paul (29 June). A late Pascha makes it short. On the new calendar the end date comes 13 days earlier, so after a very late Pascha the fast disappears completely${zeroYears.length ? `, as in ${zeroYears.slice(0, 4).join(", ")}` : ""}.`,
  },
  {
    question: `When does Great Lent start in ${year + 1}?`,
    answer: `Great Lent begins on Clean Monday, ${formatLongDate(lent.start)}, and Holy Week follows from Palm Sunday. Pascha is on the same day for old- and new-calendar churches.`,
  },
  {
    question: "How many fast days are there in a year?",
    answer: `Counting Wednesdays and Fridays and the four long fasts, about ${fastDaysInYear(year + 1, "new")} days on the new calendar and ${fastDaysInYear(year + 1, "old")} days on the old calendar in ${year + 1}.`,
  },
  {
    question: "Which churches use the old calendar?",
    answer:
      "The Russian, Serbian and Georgian churches, the Patriarchate of Jerusalem and Mount Athos keep the Julian calendar, so their fixed feasts and fasts fall 13 days later. Greek, Romanian, Bulgarian, Antiochian and OCA parishes use the new calendar for fixed feasts. All of them (except the Church of Finland) celebrate Pascha on the same day.",
  },
];

export default function OrthodoxFastingPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: CHRISTIAN_TOOLS_PATH, label: "Christian Tools" },
        { href: path, label: "Orthodox Fasting Calendar" },
      ]}
      crumbLabel="Breadcrumb"
      title="Orthodox Fasting Calendar"
      intro="Choose your church's calendar and a date: see whether it is a fast day, which fast it belongs to and when the next fast begins. Tap any day in the month view; the table lists every fast and fast-free week of the year."
      tool={<OrthodoxFastingCalendar initialDate={`${year}-01-01`} />}
      related={{ title: "More Christian tools", links: christianRelated(path) }}
      tocTitle="Contents"
      tocItems={[
        { id: "apostles", label: "Apostles' Fast by year" },
        { id: "rules", label: "The fasts of the Orthodox year" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently asked questions"
      faqItems={faqItems}
    >
      <h2 id="apostles">Apostles&apos; Fast by year</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Clean Monday</th>
              <th scope="col">Apostles&apos; Fast (old calendar)</th>
              <th scope="col">Apostles&apos; Fast (new calendar)</th>
            </tr>
          </thead>
          <tbody>
            {years.map((y) => {
              const o = get(y, "old", "apostles");
              const n = get(y, "new", "apostles");
              return (
                <tr key={y}>
                  <td>{y}</td>
                  <td>{formatShortDate(get(y, "old", "great-lent")!.start)}</td>
                  <td>{o ? `${formatShortDate(o.start)} – ${formatShortDate(o.end)} (${o.days} days)` : "none"}</td>
                  <td>{n ? `${formatShortDate(n.start)} – ${formatShortDate(n.end)} (${n.days} days)` : "none"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <h2 id="rules">The fasts of the Orthodox year</h2>
      <ul>
        <li>
          <strong>{PERIOD_LABEL["great-lent"]}</strong> from Clean Monday, followed by <strong>{PERIOD_LABEL["holy-week"]}</strong>, the strictest
          week of the year.
        </li>
        <li>
          <strong>{PERIOD_LABEL.apostles}</strong> from the Monday after All Saints&apos; Sunday to 28 June (church calendar).
        </li>
        <li>
          <strong>{PERIOD_LABEL.dormition}</strong> from 1 to 14 August.
        </li>
        <li>
          <strong>{PERIOD_LABEL.nativity}</strong> from 15 November to 24 December, 40 days.
        </li>
        <li>
          Single strict fast days: the Eve of Theophany (5 January), the Beheading of St. John the Baptist (29 August) and the Elevation of the
          Cross (14 September).
        </li>
        <li>
          Wednesdays and Fridays all year, except in the fast-free weeks: Christmastide, the week after the Publican and Pharisee, Bright Week
          and the week after Pentecost. Cheesefare Week before Lent excludes meat only.
        </li>
      </ul>
      <p>
        On the old calendar every fixed date above falls 13 days later in the civil calendar, for example the Nativity Fast runs from 28
        November to 6 January. Pascha itself is calculated by the <Link href="/en/easter-date-calculator">Easter date calculator</Link>; to
        convert church dates, use the <Link href="/en/julian-calendar-converter">Julian calendar converter</Link>.
      </p>
    </TimeToolPage>
  );
}
