import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { EasterCalculator } from "../../components/christian/ChristianTools";
import TimeToolPage from "../../components/time/TimeToolPage";
import { diffDays } from "../../converter/time/dateMath";
import type { FaqItem } from "../../converter/faqSchema";
import { formatLongDate, formatShortDate, orthodoxEaster, westernEaster, westernFeasts } from "../../converter/christian/christianCalc";
import { CHRISTIAN_TOOLS_PATH, christianRelated } from "../../i18n/englishChristianTools";
import { catholicAlternates } from "../../i18n/catholicTools";
import { buildSiteUrl } from "../../siteConfig";

const path = "/en/easter-date-calculator";
const year = new Date().getFullYear();
const title = `Easter Date Calculator: When Is Easter ${year} & ${year + 1}?`;
const description = "Find the date of Easter Sunday for any year from 1583 to 4099: Western and Orthodox Easter, plus Ash Wednesday, Good Friday, Ascension and Pentecost.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: catholicAlternates("easter") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const years = Array.from({ length: 21 }, (_, i) => year - 5 + i);
const feast = (y: number, id: string) => westernFeasts(y)!.find((f) => f.id === id)!.date;
const both = years.filter((y) => diffDays(westernEaster(y)!, orthodoxEaster(y)!) === 0);

const faqItems: FaqItem[] = [
  {
    question: `When is Easter ${year}?`,
    answer: `Western Easter (Catholic and Protestant) is on ${formatLongDate(westernEaster(year)!)}. Orthodox Easter is on ${formatLongDate(orthodoxEaster(year)!)}.`,
  },
  {
    question: `When is Easter ${year + 1}?`,
    answer: `Western Easter ${year + 1} is on ${formatLongDate(westernEaster(year + 1)!)}; Orthodox Easter is on ${formatLongDate(orthodoxEaster(year + 1)!)}. Good Friday is ${formatLongDate(feast(year + 1, "good-friday"))}.`,
  },
  {
    question: "How is the date of Easter calculated?",
    answer:
      "Easter is the first Sunday after the Paschal full moon, the church's tabulated full moon on or after March 21. It is not based on the astronomical full moon, so Western Easter always falls between March 22 and April 25.",
  },
  {
    question: "Why is Orthodox Easter on a different date?",
    answer: `Orthodox churches use the same rule but with the Julian calendar and its older lunar tables. Orthodox Easter is therefore either the same day as Western Easter or one to five weeks later. In the years ${years[0]}–${years[years.length - 1]} both fall on the same day in ${both.join(", ")}.`,
  },
];

export default function EasterDatePage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: CHRISTIAN_TOOLS_PATH, label: "Christian Tools" },
        { href: path, label: "Easter Date Calculator" },
      ]}
      crumbLabel="Breadcrumb"
      title="Easter Date Calculator"
      intro="Enter any year to get the date of Easter Sunday for Western (Catholic and Protestant) and Orthodox churches, with every moveable feast that depends on it."
      tool={<EasterCalculator initialYear={year} />}
      related={{ title: "More Christian tools", links: christianRelated(path) }}
      tocTitle="Contents"
      tocItems={[
        { id: "table", label: `Easter dates ${years[0]}–${years[years.length - 1]}` },
        { id: "rule", label: "How Easter is calculated" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently asked questions"
      faqItems={faqItems}
    >
      <h2 id="table">
        Easter dates {years[0]}–{years[years.length - 1]}
      </h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Ash Wednesday</th>
              <th scope="col">Western Easter</th>
              <th scope="col">Orthodox Easter</th>
              <th scope="col">Pentecost</th>
            </tr>
          </thead>
          <tbody>
            {years.map((y) => (
              <tr key={y}>
                <td>{y}</td>
                <td>{formatShortDate(feast(y, "ash-wednesday"))}</td>
                <td>
                  <strong>{formatShortDate(westernEaster(y)!)}</strong>
                </td>
                <td>{formatShortDate(orthodoxEaster(y)!)}</td>
                <td>{formatShortDate(feast(y, "pentecost"))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 id="rule">How Easter is calculated</h2>
      <p>
        Since the Council of Nicaea (325), Easter has been celebrated on the Sunday after the first full moon of spring. The churches fixed the
        spring equinox at March 21 and use tables of the moon instead of observing it, so the date can be calculated exactly for any year. Western
        churches use the Gregorian reform of 1582; Orthodox churches keep the Julian calendar and its lunar cycle, then the date is shown here in
        the Gregorian calendar (13 days later until 2099).
      </p>
      <p>
        Lent starts on Ash Wednesday, 46 days before Easter; Ascension is 39 days and Pentecost 49 days after Easter. To see which day of Lent it
        is today, use the <Link href="/en/lent-calculator">Lent calculator</Link>.
      </p>
    </TimeToolPage>
  );
}
