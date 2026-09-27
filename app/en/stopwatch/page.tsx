import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import Stopwatch from "../../components/time/Stopwatch";
import TimeToolPage from "../../components/time/TimeToolPage";
import { timeRelated } from "../../components/time/timeRelatedLinks";
import type { FaqItem } from "../../converter/faqSchema";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";

const title = "Online Stopwatch With Laps";
const description =
  "Free online stopwatch accurate to 1/100 second: start, record laps, see your fastest and slowest lap and download results as CSV.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/en/stopwatch", ...timeToolAlternates("stopwatch") },
  openGraph: { title, description, url: buildSiteUrl("/en/stopwatch"), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "How accurate is the stopwatch?",
    answer: "It shows hundredths of a second. Time is measured against the real clock, so it doesn't drift while the tab is in the background.",
  },
  {
    question: "What is a lap?",
    answer: "A lap records a split time without stopping the stopwatch — for example each lap of a track or each length of a pool. The fastest and slowest laps are highlighted.",
  },
  {
    question: "Can I save my results?",
    answer: "Yes. \"Download CSV\" saves lap number, lap time and total time in a file you can open in Excel or Google Sheets.",
  },
  {
    question: "Can I use it with a keyboard?",
    answer: "All buttons are keyboard-focusable: Tab to a button and press Enter or Space.",
  },
];

export default function EnglishStopwatchPage() {
  return (
    <TimeToolPage
      crumbs={[{ href: "/en", label: "Home" }, { href: "/en/stopwatch", label: "Stopwatch" }]}
      crumbLabel="Breadcrumb"
      title="Online Stopwatch"
      intro="Press start and time runs to the hundredth of a second. Record laps, spot your fastest and slowest lap and download the results as CSV."
      tool={<Stopwatch locale="en" />}
      related={{ title: "More time tools", links: timeRelated.en.tools.filter((t) => t.href !== "/en/stopwatch") }}
      tocTitle="Contents"
      tocItems={[
        { id: "how", label: "How to use the stopwatch" },
        { id: "difference", label: "Stopwatch vs. timer" },
        { id: "faq", label: "FAQ" },
      ]}
      faqTitle="Frequently Asked Questions"
      faqItems={faqItems}
    >
      <h2 id="how">How to use the stopwatch</h2>
      <ol>
        <li>Press &quot;Start&quot;; time runs in hours, minutes, seconds and hundredths.</li>
        <li>Press &quot;Lap&quot; to record a split; each lap appears in the list.</li>
        <li>&quot;Stop&quot; pauses, &quot;Resume&quot; continues and &quot;Reset&quot; clears everything.</li>
      </ol>

      <h2 id="difference">Stopwatch vs. timer</h2>
      <p>
        A stopwatch counts up from zero and measures elapsed time — ideal for running, swimming, experiments or tracking a task. A
        timer counts down from a set time and alerts you when it ends. For a countdown, use the{" "}
        <Link href="/en/timer">online timer</Link>.
      </p>
    </TimeToolPage>
  );
}
