import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { LiturgicalCalendarTool } from "../../components/christian/CatholicLocalized";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { adventSunday, westernEaster } from "../../converter/christian/christianCalc";
import { baptismOfTheLord, liturgicalDay } from "../../converter/christian/liturgicalCalendar";
import { addDaysYmd } from "../../converter/time/dateMath";
import { CATHOLIC_DICT, catholicAlternates, longDate } from "../../i18n/catholicTools";
import { CHRISTIAN_TOOLS_PATH, christianRelated } from "../../i18n/englishChristianTools";
import { buildSiteUrl } from "../../siteConfig";

const path = "/en/liturgical-calendar";
const d = CATHOLIC_DICT.en;
const year = new Date().getFullYear();
const title = "Liturgical Calendar: What Liturgical Season and Color Is Today?";
const description =
  "Today's liturgical season and color, the week of Ordinary Time and the lectionary cycle (Year A, B or C; weekday Year I or II) for any date in the Catholic calendar.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: catholicAlternates("liturgical") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const advent = adventSunday(year);
const easter = westernEaster(year + 1)!;
const ly = liturgicalDay(advent)!;
const rows: Array<[string, { year: number; month: number; day: number }]> = [
  ["First Sunday of Advent", advent],
  [d.celebrations.christmas, { year, month: 12, day: 25 }],
  [d.celebrations.baptism, baptismOfTheLord(year + 1)],
  [d.celebrations["ash-wednesday"], addDaysYmd(easter, -46)],
  [d.celebrations["palm-sunday"], addDaysYmd(easter, -7)],
  [d.celebrations.easter, easter],
  [d.celebrations.pentecost, addDaysYmd(easter, 49)],
  [d.celebrations["christ-the-king"], addDaysYmd(adventSunday(year + 1), -7)],
];

const faqItems: FaqItem[] = [
  {
    question: `Which liturgical year begins in Advent ${year}?`,
    answer: `The liturgical year that begins on ${longDate("en", advent)} is Year ${ly.sundayCycle} for Sunday readings and Year ${ly.weekdayCycle} for weekday readings in Ordinary Time.`,
  },
  {
    question: "What do the liturgical colors mean?",
    answer:
      "Violet: Advent and Lent, waiting and penance. White: Christmas, Easter and feasts of the Lord, of Mary and of saints who were not martyrs. Green: Ordinary Time. Red: Palm Sunday, Good Friday, Pentecost and martyrs. Rose: Gaudete and Laetare Sundays.",
  },
  {
    question: "How are the weeks of Ordinary Time counted?",
    answer:
      "Week 1 begins after the Baptism of the Lord and stops at Ash Wednesday. After Pentecost the count resumes backwards from Christ the King, which is always the 34th week.",
  },
];

export default function LiturgicalCalendarPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: CHRISTIAN_TOOLS_PATH, label: "Christian Tools" },
        { href: path, label: "Liturgical Calendar" },
      ]}
      crumbLabel="Breadcrumb"
      title="Liturgical Calendar"
      intro="Pick a date to see the liturgical season and week, the color of the vestments, any solemnity and the lectionary cycle, together with the next 14 days."
      tool={<LiturgicalCalendarTool lang="en" initialDate={`${year}-01-01`} />}
      related={{ title: "More Christian tools", links: christianRelated(path) }}
      tocTitle="Contents"
      tocItems={[
        { id: "year", label: `Liturgical year ${year}–${year + 1}` },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently asked questions"
      faqItems={faqItems}
    >
      <h2 id="year">
        Liturgical year {year}–{year + 1} (Year {ly.sundayCycle})
      </h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <tbody>
            {rows.map(([name, date]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{longDate("en", date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Dates follow the General Roman Calendar. In the United States and some other countries the Epiphany, the Ascension and Corpus Christi are
        moved to a Sunday. Easter dates for other years are on the <Link href="/en/easter-date-calculator">Easter date calculator</Link>.
      </p>
    </TimeToolPage>
  );
}
