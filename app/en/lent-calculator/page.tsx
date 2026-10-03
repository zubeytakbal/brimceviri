import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { LentCalculator } from "../../components/christian/ChristianTools";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { formatLongDate, orthodoxLent, westernEaster, westernLent } from "../../converter/christian/christianCalc";
import { addDaysYmd } from "../../converter/time/dateMath";
import { CHRISTIAN_TOOLS_PATH, christianRelated } from "../../i18n/englishChristianTools";
import { buildSiteUrl } from "../../siteConfig";

const path = "/en/lent-calculator";
const year = new Date().getFullYear();
const title = "Lent Calculator: What Day of Lent Is It Today?";
const description = "Which day of Lent is it? Count the 40 days of Lent without Sundays, see how many days are left until Easter, and find Ash Wednesday and Orthodox Great Lent dates.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const lentFor = (y: number) => westernLent({ year: y, month: 1, day: 1 })!;
const thisYear = lentFor(year);
const nextYear = lentFor(year + 1);
const great = orthodoxLent(year + 1)!;

const faqItems: FaqItem[] = [
  {
    question: `When does Lent start in ${year} and ${year + 1}?`,
    answer: `Lent begins on Ash Wednesday: ${formatLongDate(thisYear.start)} in ${year} and ${formatLongDate(nextYear.start)} in ${year + 1}. Easter ${year + 1} is on ${formatLongDate(westernEaster(year + 1)!)}.`,
  },
  {
    question: "Why are Sundays not counted in Lent?",
    answer:
      "Every Sunday celebrates the Resurrection, so Sundays are not fast days. From Ash Wednesday to Holy Saturday there are 46 days; leaving out the six Sundays gives the 40 days of Lent, recalling Jesus' 40 days of fasting in the desert.",
  },
  {
    question: "When does Lent end?",
    answer:
      "In the traditional count used here, the 40 days run until Holy Saturday, the day before Easter. In the Catholic liturgy, Lent ends on the evening of Holy Thursday, when the Easter Triduum begins.",
  },
  {
    question: "When is Orthodox Great Lent?",
    answer: `Great Lent begins on Clean Monday, seven weeks before Pascha, and lasts 40 days until the Friday before Lazarus Saturday; Holy Week follows. In ${year + 1} it runs from ${formatLongDate(great.start)} to ${formatLongDate(great.end)}.`,
  },
];

export default function LentPage() {
  const holySaturday = addDaysYmd(thisYear.easter, -1);
  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: CHRISTIAN_TOOLS_PATH, label: "Christian Tools" },
        { href: path, label: "Lent Calculator" },
      ]}
      crumbLabel="Breadcrumb"
      title="Lent Calculator"
      intro="Pick a date to see which of the 40 days of Lent it is, how many Lenten days remain and how many days are left until Easter. Sundays are shown but not counted."
      tool={<LentCalculator initialDate={`${year}-01-01`} />}
      related={{ title: "More Christian tools", links: christianRelated(path) }}
      tocTitle="Contents"
      tocItems={[
        { id: "count", label: "How the 40 days are counted" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently asked questions"
      faqItems={faqItems}
    >
      <h2 id="count">How the 40 days are counted</h2>
      <p>
        Lent {year} runs from Ash Wednesday, {formatLongDate(thisYear.start)}, to Holy Saturday, {formatLongDate(holySaturday)}. That is 46
        calendar days. Each Sunday is a little Easter and is not a day of fasting, so the six Sundays are left out and 40 days remain. Ash
        Wednesday is day 1, the Saturday before the first Sunday of Lent is day 4, and Holy Saturday is day 40. The calculator follows this
        count; Easter itself is found with the <Link href="/en/easter-date-calculator">Easter date calculator</Link>.
      </p>
    </TimeToolPage>
  );
}
