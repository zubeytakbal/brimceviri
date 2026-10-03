import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { ReadingPlanCalculator } from "../../components/christian/ChristianTools2";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { BIBLE_TOTALS, formatChapterRange, readingSchedule, scopeChapters, testamentTotals } from "../../converter/christian/christianCalc";
import { BIBLE_BOOKS_PATH, CHRISTIAN_TOOLS_PATH, christianRelated } from "../../i18n/englishChristianTools";
import { buildSiteUrl } from "../../siteConfig";

const path = "/en/bible-reading-plan";
const year = new Date().getFullYear();
const title = "Bible Reading Plan Calculator: Chapters per Day & Catch-Up";
const description = "How many chapters a day to read the Bible in a year, 90 days or any time you choose. Get a day-by-day plan, or catch up if you fell behind.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const fmt = (n: number, d = 2) => n.toLocaleString("en-US", { maximumFractionDigits: d });
const all = BIBLE_TOTALS.chapters;
const nt = testamentTotals("New").chapters;
const year1 = readingSchedule(scopeChapters("bible"), 365);
const lengths = [30, 90, 180, 365, 730];

const faqItems: FaqItem[] = [
  {
    question: "How many chapters a day to read the Bible in a year?",
    answer: `The Bible has ${fmt(all)} chapters, so a one-year plan is ${fmt(all / 365)} chapters a day: ${all % 365} days of 4 chapters and ${365 - (all % 365)} days of 3. Day 1 is ${formatChapterRange(year1[0].from, year1[0].to)}.`,
  },
  {
    question: "How long does it take to read the New Testament?",
    answer: `The New Testament has ${nt} chapters: one chapter a day takes ${nt} days, and about ${Math.ceil(nt / 90)} chapters a day finishes it in three months.`,
  },
  {
    question: "What should I do if I fall behind in my Bible reading plan?",
    answer:
      "Either read a little more each day to finish on time, or keep your usual pace and accept a later finish date. Switch to the “I fell behind” tab, enter when your plan started and the last chapter you read, and the calculator shows both options.",
  },
];

export default function ReadingPlanPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: CHRISTIAN_TOOLS_PATH, label: "Christian Tools" },
        { href: path, label: "Bible Reading Plan" },
      ]}
      crumbLabel="Breadcrumb"
      title="Bible Reading Plan Calculator"
      intro="Choose what to read and in how many days: get the number of chapters per day, the finish date and a day-by-day schedule. Behind on an existing plan? The catch-up tab tells you the new pace."
      tool={<ReadingPlanCalculator initialDate={`${year}-01-01`} />}
      related={{ title: "More Christian tools", links: christianRelated(path) }}
      tocTitle="Contents"
      tocItems={[
        { id: "pace", label: "Chapters per day for common plans" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently asked questions"
      faqItems={faqItems}
    >
      <h2 id="pace">Chapters per day for common plans</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Plan length</th>
              <th scope="col">Whole Bible</th>
              <th scope="col">New Testament</th>
            </tr>
          </thead>
          <tbody>
            {lengths.map((d) => (
              <tr key={d}>
                <td>{d === 365 ? "1 year" : d === 730 ? "2 years" : `${d} days`}</td>
                <td>{fmt(all / d)} chapters/day</td>
                <td>{fmt(nt / d)} chapters/day</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Plans follow the book order of the Protestant Bible and split chapters as evenly as possible; long chapters such as Psalm 119 make some
        days longer than others. Chapter counts per book are listed on the <Link href={BIBLE_BOOKS_PATH}>books of the Bible</Link> page.
      </p>
    </TimeToolPage>
  );
}
