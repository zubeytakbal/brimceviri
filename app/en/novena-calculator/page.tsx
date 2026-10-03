import type { Metadata } from "next";
import { NovenaCalculator } from "../../components/christian/ChristianTools2";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { feastDate, formatLongDate, NOVENA_FEASTS, novenaFor } from "../../converter/christian/christianCalc";
import { CHRISTIAN_TOOLS_PATH, christianRelated } from "../../i18n/englishChristianTools";
import { buildSiteUrl } from "../../siteConfig";

const path = "/en/novena-calculator";
const year = new Date().getFullYear();
const title = "Novena Calculator: When to Start a Novena for a Feast Day";
const description = "Find the start date of a novena so the ninth day falls on the eve of the feast: St. Jude, St. Michael, St. Joseph, Divine Mercy, Christmas and more.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const start = (id: string, y = year) => novenaFor(feastDate(NOVENA_FEASTS.find((f) => f.id === id)!, y)!).start;

const faqItems: FaqItem[] = [
  {
    question: "When do you start a novena?",
    answer:
      "Count back nine days from the feast: the novena begins nine days before the feast day, and the ninth day is the eve of the feast. For a feast on September 29, start on September 20.",
  },
  {
    question: "When does the Divine Mercy novena start?",
    answer: `The Divine Mercy novena begins on Good Friday and ends on the Saturday before Divine Mercy Sunday. In ${year + 1} it starts on ${formatLongDate(start("divine-mercy", year + 1))}.`,
  },
  {
    question: "When does the St. Jude novena start?",
    answer: `The feast of St. Jude is October 28, so the novena starts on October 19 (${formatLongDate(start("jude"))} in ${year}).`,
  },
  {
    question: "Can I pray a novena at another time?",
    answer: "Yes. A novena can be prayed for any intention at any time; the traditional dates simply let it end just before the feast. Choose “Other feast or intention date” to plan one for any date.",
  },
];

export default function NovenaPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: CHRISTIAN_TOOLS_PATH, label: "Christian Tools" },
        { href: path, label: "Novena Calculator" },
      ]}
      crumbLabel="Breadcrumb"
      title="Novena Start Date Calculator"
      intro="Pick a novena or any feast date: see the day to begin so that the ninth day falls on the eve of the feast, and which novenas are coming up next."
      tool={<NovenaCalculator initialDate={`${year}-01-01`} />}
      related={{ title: "More Christian tools", links: christianRelated(path) }}
      tocTitle="Contents"
      tocItems={[
        { id: "dates", label: `Novena start dates ${year}` },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently asked questions"
      faqItems={faqItems}
    >
      <h2 id="dates">Novena start dates {year}</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Novena</th>
              <th scope="col">Start</th>
              <th scope="col">Feast day</th>
            </tr>
          </thead>
          <tbody>
            {NOVENA_FEASTS.map((f) => {
              const n = novenaFor(feastDate(f, year)!);
              return (
                <tr key={f.id}>
                  <td>{f.name}</td>
                  <td>{formatLongDate(n.start)}</td>
                  <td>{formatLongDate(n.feastDay)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p>
        Fixed feasts follow the General Roman Calendar. Divine Mercy Sunday, Pentecost and the Sacred Heart depend on the date of Easter and move
        every year. Local calendars sometimes keep a feast on a different day.
      </p>
    </TimeToolPage>
  );
}
