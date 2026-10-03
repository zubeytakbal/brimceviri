import type { Metadata } from "next";
import { TitheCalculator } from "../../components/christian/ChristianTools2";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { tithe } from "../../converter/christian/christianCalc";
import { CHRISTIAN_TOOLS_PATH, christianRelated } from "../../i18n/englishChristianTools";
import { buildSiteUrl } from "../../siteConfig";

const path = "/en/tithe-calculator";
const title = "Tithe Calculator: 10% of Gross or Net Pay per Paycheck";
const description = "Calculate a tithe of 10% (or any percentage) per paycheck, month and year, and compare giving on gross pay with giving on take-home pay.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const money = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });
const ex = tithe(2000, "biweekly")!;

const faqItems: FaqItem[] = [
  {
    question: "How do I calculate my tithe?",
    answer: `Multiply your income by 10%. For example, on a paycheck of 2,000 every two weeks the tithe is ${money(ex.perPeriod)} per paycheck, about ${money(ex.monthly)} a month and ${money(ex.annual)} a year.`,
  },
  {
    question: "Should I tithe on gross or net income?",
    answer:
      "Churches and Christians differ. Some give on gross income, before taxes, as the first part of everything earned; others give on take-home pay. Enter both amounts to see the difference, and follow your own conviction and your church's teaching.",
  },
  {
    question: "Is a tithe always 10 percent?",
    answer: "The word tithe means a tenth. Many people give a different percentage, or give in addition to a tithe; change the percentage field to plan any amount.",
  },
];

export default function TithePage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: CHRISTIAN_TOOLS_PATH, label: "Christian Tools" },
        { href: path, label: "Tithe Calculator" },
      ]}
      crumbLabel="Breadcrumb"
      title="Tithe Calculator"
      intro="Enter your pay for one pay period: see a tithe of 10% (or the percentage you choose) per paycheck, per month and per year, on gross and on take-home pay."
      tool={<TitheCalculator />}
      related={{ title: "More Christian tools", links: christianRelated(path) }}
      tocTitle="Contents"
      tocItems={[
        { id: "how", label: "How the calculator works" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently asked questions"
      faqItems={faqItems}
    >
      <h2 id="how">How the calculator works</h2>
      <p>
        The amount for one paycheck is converted to a yearly figure (52 weekly, 26 biweekly, 24 semi-monthly or 12 monthly payments), and the
        percentage is applied. Monthly amounts are the yearly amount divided by 12, so for weekly and biweekly pay they are an average. The
        calculator works in any currency and nothing you enter leaves your browser.
      </p>
    </TimeToolPage>
  );
}
